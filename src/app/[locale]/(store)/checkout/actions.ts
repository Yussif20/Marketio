"use server";

import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { checkoutSchema } from "@/lib/checkout-schema";
import { adminAuth } from "@/lib/firebase/admin-auth";
import { CheckoutError, couponPercent, createOrder, priceCart, updateOrder } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";

export type PlaceOrderResult =
  /** `redirectUrl` is Stripe's hosted page for card payments, otherwise the success path. */
  | { ok: true; orderId: string; redirectUrl: string; external?: boolean }
  | { ok: false; error: "invalid" | "empty" | "unavailable" | "stock" | "coupon" | "card-unavailable" | "server" };

/** Origin of the current request, so Stripe returns shoppers to the host they came from. */
async function requestOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** Validates the checkout, prices it on the server, stores the order and starts payment. */
export async function placeOrder(raw: unknown, localeRaw: string): Promise<PlaceOrderResult> {
  const locale = hasLocale(routing.locales, localeRaw) ? localeRaw : routing.defaultLocale;
  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const input = parsed.data;

  try {
    let userId: string | undefined;
    if (input.idToken) {
      // An invalid or expired token just means a guest order.
      userId = await adminAuth()
        .verifyIdToken(input.idToken)
        .then((token) => token.uid)
        .catch(() => undefined);
    }

    const stripe = input.paymentMethod === "card" ? getStripe() : null;
    if (input.paymentMethod === "card" && !stripe) return { ok: false, error: "card-unavailable" };

    const priced = await priceCart(input.items, input.coupon);
    const order = await createOrder({
      customer: input.customer,
      priced,
      paymentMethod: input.paymentMethod,
      locale,
      userId,
    });
    const successPath = `/checkout/success?order=${order.id}`;
    const origin = await requestOrigin();

    if (stripe) {
      // One Stripe line per cart line at server prices, shipping as its own line, and the
      // coupon as a one-off amount-off discount so Stripe's total equals ours exactly.
      const lineItems = order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.priceCents,
          product_data: {
            name: [item.title[locale], item.color?.[locale], item.option].filter(Boolean).join(" · "),
          },
        },
      }));
      if (order.shippingCents > 0) {
        lineItems.push({
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: order.shippingCents,
            product_data: { name: locale === "ar" ? "الشحن" : "Shipping" },
          },
        });
      }
      const discounts = order.discountCents
        ? [
            {
              coupon: (
                await stripe.coupons.create({
                  amount_off: order.discountCents,
                  currency: "usd",
                  duration: "once",
                  name: order.coupon,
                  max_redemptions: 1,
                })
              ).id,
            },
          ]
        : undefined;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        discounts,
        customer_email: order.customer.email,
        client_reference_id: order.id,
        metadata: { orderId: order.id },
        locale: locale === "ar" ? "auto" : "en",
        success_url: `${origin}/${locale}${successPath}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/${locale}/checkout?cancelled=1`,
      });
      await updateOrder(order.id, { stripeSessionId: session.id });
      return { ok: true, orderId: order.id, redirectUrl: session.url!, external: true };
    }

    return {
      ok: true,
      orderId: order.id,
      // Locale-less path for the i18n router; `new=1` tells the page to clear the cart.
      redirectUrl: `${successPath}&new=1`,
    };
  } catch (error) {
    if (error instanceof CheckoutError) return { ok: false, error: error.code };
    console.error("placeOrder failed", error);
    return { ok: false, error: "server" };
  }
}

/** Checks a coupon code for the form; the order total is still computed in placeOrder. */
export async function checkCoupon(code: string): Promise<{ ok: true; percent: number } | { ok: false }> {
  try {
    const percent = couponPercent(code.trim());
    return percent ? { ok: true, percent } : { ok: false };
  } catch {
    return { ok: false };
  }
}

/** Whether card payment can be offered (a Stripe test key is configured). */
export async function cardAvailable() {
  return getStripe() !== null;
}
