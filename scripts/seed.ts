/**
 * Loads the demo catalogue and a few fake orders into Firestore.
 * Re-running it resets both collections to the demo state.
 *
 *   npm run seed
 */
import { getFirestore } from "firebase-admin/firestore";
import { products } from "@/data/products";
import { getAdminApp } from "@/lib/firebase/admin-app";
import { shippingFor, unitPriceCents } from "@/lib/product-snapshot";
import type { Order, OrderItem, OrderStatus, PaymentMethod } from "@/types/order";

// Fictional customers only.
const customers = [
  { name: "Layla Hassan", email: "layla@example.com", phone: "+20 100 000 0001", address: "12 Nile St", city: "Cairo" },
  { name: "Omar Khaled", email: "omar@example.com", phone: "+20 100 000 0002", address: "4 Garden Rd", city: "Giza" },
  { name: "Sara Mahmoud", email: "sara@example.com", phone: "+20 100 000 0003", address: "8 Sea View", city: "Alexandria" },
  { name: "Youssef Adel", email: "youssef@example.com", phone: "+20 100 000 0004", address: "21 Palm Ave", city: "Mansoura" },
  { name: "Nour Ali", email: "nour@example.com", phone: "+20 100 000 0005", address: "3 Market Sq", city: "Tanta" },
];

const orderPlans: Array<{
  items: Array<[slug: string, quantity: number]>;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
}> = [
  { items: [["vela-x1-phone", 1], ["aurora-wireless-headphones", 1]], paymentMethod: "card", status: "delivered", createdAt: "2026-09-21T10:15:00Z" },
  { items: [["everyday-cotton-hoodie", 2]], paymentMethod: "cod", status: "shipped", createdAt: "2026-09-30T14:02:00Z" },
  { items: [["atlas-14-laptop", 1], ["voyager-laptop-backpack", 1]], paymentMethod: "card", status: "paid", createdAt: "2026-10-03T09:40:00Z" },
  { items: [["builder-robot-kit", 1], ["cozy-plush-bear", 1]], paymentMethod: "whatsapp", status: "pending", createdAt: "2026-10-06T18:25:00Z" },
  { items: [["clarity-27-4k-monitor", 2]], paymentMethod: "card", status: "delivered", createdAt: "2026-10-08T11:05:00Z" },
  { items: [["sola-square-sunglasses", 1], ["meridian-chronograph-watch", 1]], paymentMethod: "cod", status: "cancelled", createdAt: "2026-10-10T16:50:00Z" },
  { items: [["lumen-4k-vlog-camera", 1]], paymentMethod: "whatsapp", status: "pending", createdAt: "2026-10-12T20:30:00Z" },
  { items: [["puffer-winter-jacket", 1], ["classic-cargo-pants", 1]], paymentMethod: "card", status: "paid", createdAt: "2026-10-14T08:12:00Z" },
];

function buildOrders(): Order[] {
  return orderPlans.map((plan, index) => {
    const items: OrderItem[] = plan.items.map(([slug, quantity]) => {
      const product = products.find((p) => p.slug === slug);
      if (!product) throw new Error(`Unknown product in seed order: ${slug}`);
      const option = product.option?.values[0];
      return {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: product.images[0],
        color: product.colors[0]?.name,
        option: option?.label,
        priceCents: unitPriceCents(product, option?.id),
        quantity,
      };
    });
    const subtotalCents = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
    const shippingCents = shippingFor(subtotalCents);

    return {
      id: `demo-${String(index + 1).padStart(3, "0")}`,
      customer: customers[index % customers.length],
      items,
      subtotalCents,
      discountCents: 0,
      shippingCents,
      totalCents: subtotalCents + shippingCents,
      currency: "USD",
      paymentMethod: plan.paymentMethod,
      status: plan.status,
      locale: index % 2 ? "en" : "ar",
      createdAt: plan.createdAt,
    };
  });
}

/** Firestore rejects `undefined` fields, so drop them before writing. */
function withoutUndefined<T extends object>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function replaceCollection(name: string, docs: Array<{ id: string }>) {
  const db = getFirestore(getAdminApp());
  const collection = db.collection(name);
  const existing = await collection.listDocuments();

  const writer = db.bulkWriter();
  for (const ref of existing) writer.delete(ref);
  await writer.flush();
  for (const doc of docs) writer.set(collection.doc(doc.id), withoutUndefined(doc));
  await writer.close();

  console.log(`${name}: removed ${existing.length}, wrote ${docs.length}`);
}

async function main() {
  await replaceCollection("products", products);
  await replaceCollection("orders", buildOrders());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
