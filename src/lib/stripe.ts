import "server-only";
import Stripe from "stripe";

let client: Stripe | null | undefined;

/** Stripe client, or null when STRIPE_SECRET_KEY isn't set (card payment is then hidden). */
export function getStripe() {
  if (client === undefined) {
    const key = process.env.STRIPE_SECRET_KEY;
    // Test mode only: a live key here would charge real cards from a demo store.
    client = key && key.startsWith("sk_test_") ? new Stripe(key) : null;
  }
  return client;
}
