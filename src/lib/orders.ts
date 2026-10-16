import "server-only";
import { randomBytes } from "node:crypto";
import type { Locale } from "@/i18n/routing";
import { getAllProducts } from "@/lib/catalog";
import { COUPONS, type CheckoutInput, type CustomerInput } from "@/lib/checkout-schema";
import { adminDb } from "@/lib/firebase/admin";
import { formatPrice } from "@/lib/product";
import { shippingFor, unitPriceCents } from "@/lib/product-snapshot";
import type { Order, OrderItem, OrderStatus, PaymentMethod } from "@/types/order";

export class CheckoutError extends Error {
  constructor(public code: "empty" | "unavailable" | "stock" | "coupon") {
    super(code);
  }
}

export function couponPercent(code?: string) {
  if (!code) return 0;
  const percent = COUPONS[code.toUpperCase()];
  if (!percent) throw new CheckoutError("coupon");
  return percent;
}

/**
 * Re-prices the cart from the catalogue. Prices, names and stock always come
 * from the server, never from what the browser sent.
 */
export async function priceCart(items: CheckoutInput["items"], coupon?: string) {
  if (items.length === 0) throw new CheckoutError("empty");
  const products = await getAllProducts();

  const lines: OrderItem[] = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product || item.colorIndex >= Math.max(product.colors.length, 1)) throw new CheckoutError("unavailable");
    const option = product.option?.values.find((v) => v.id === item.optionId);
    if (product.option && !option) throw new CheckoutError("unavailable");
    if (product.stock < item.quantity) throw new CheckoutError("stock");

    return {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: product.images[item.colorIndex] ?? product.images[0],
      color: product.colors[item.colorIndex]?.name,
      option: option?.label,
      priceCents: unitPriceCents(product, option?.id),
      quantity: item.quantity,
    };
  });

  const subtotalCents = lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
  const percent = couponPercent(coupon);
  const discountCents = Math.round((subtotalCents * percent) / 100);
  const shippingCents = shippingFor(subtotalCents - discountCents);

  return {
    lines,
    subtotalCents,
    discountCents,
    shippingCents,
    totalCents: subtotalCents - discountCents + shippingCents,
    coupon: percent ? coupon?.toUpperCase() : undefined,
  };
}

/** Short, readable order numbers like MK-7Q4K2D. */
function newOrderId() {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = randomBytes(6);
  return "MK-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export async function createOrder(params: {
  customer: CustomerInput;
  priced: Awaited<ReturnType<typeof priceCart>>;
  paymentMethod: PaymentMethod;
  locale: Locale;
  userId?: string;
}) {
  const { customer, priced, paymentMethod, locale, userId } = params;
  const order: Order = {
    id: newOrderId(),
    customer,
    items: priced.lines,
    subtotalCents: priced.subtotalCents,
    discountCents: priced.discountCents,
    shippingCents: priced.shippingCents,
    totalCents: priced.totalCents,
    coupon: priced.coupon,
    currency: "USD",
    paymentMethod,
    status: "pending",
    locale,
    userId,
    createdAt: new Date().toISOString(),
  };
  // Firestore rejects undefined fields.
  await adminDb().collection("orders").doc(order.id).set(JSON.parse(JSON.stringify(order)));
  return order;
}

export async function getOrder(id: string) {
  if (!/^[A-Za-z0-9-]{3,40}$/.test(id)) return null;
  const snapshot = await adminDb().collection("orders").doc(id).get();
  return snapshot.exists ? (snapshot.data() as Order) : null;
}

export async function updateOrder(id: string, changes: Partial<Pick<Order, "status" | "stripeSessionId">>) {
  await adminDb().collection("orders").doc(id).update(changes);
}

export async function getOrdersForUser(userId: string) {
  const snapshot = await adminDb().collection("orders").where("userId", "==", userId).get();
  return snapshot.docs
    .map((doc) => doc.data() as Order)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const isFinal = (status: OrderStatus) => status === "delivered" || status === "cancelled";

/** wa.me link with a localised order summary the shop can confirm by chat. */
export function whatsAppLink(order: Order) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  const ar = order.locale === "ar";
  const lines = [
    ar ? `طلب جديد ${order.id}` : `New order ${order.id}`,
    "",
    ...order.items.map((item) => {
      const variant = [item.color?.[order.locale], item.option].filter(Boolean).join(" / ");
      return `• ${item.quantity} × ${item.title[order.locale]}${variant ? ` (${variant})` : ""} — ${formatPrice(item.priceCents * item.quantity)}`;
    }),
    "",
    ...(order.discountCents
      ? [`${ar ? "الخصم" : "Discount"} (${order.coupon}): −${formatPrice(order.discountCents)}`]
      : []),
    `${ar ? "الشحن" : "Shipping"}: ${order.shippingCents ? formatPrice(order.shippingCents) : ar ? "مجاني" : "Free"}`,
    `${ar ? "الإجمالي" : "Total"}: ${formatPrice(order.totalCents)}`,
    `${ar ? "الاسم" : "Name"}: ${order.customer.name}`,
    `${ar ? "الهاتف" : "Phone"}: ${order.customer.phone}`,
    `${ar ? "العنوان" : "Address"}: ${order.customer.address}, ${order.customer.city}`,
  ];
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
