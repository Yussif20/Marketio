import { NextResponse, type NextRequest } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";

/** Marks orders paid when Stripe confirms the Checkout payment. */
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event;
  try {
    // The signature covers the raw body, so read it as text before parsing.
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (orderId && session.payment_status === "paid") {
      const order = await getOrder(orderId);
      if (order && order.status === "pending") await updateOrder(orderId, { status: "paid" });
    }
  }

  return NextResponse.json({ received: true });
}
