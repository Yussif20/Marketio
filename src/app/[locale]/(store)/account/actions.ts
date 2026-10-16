"use server";

import { adminAuth } from "@/lib/firebase/admin";
import { getOrdersForUser } from "@/lib/orders";
import type { Order } from "@/types/order";

/**
 * Orders placed while signed in to this account. The ID token is verified on
 * the server; orders are matched by uid only, never by email, because email
 * sign-ups aren't verified and anyone could register someone else's address.
 */
export async function getMyOrders(idToken: string): Promise<{ ok: true; orders: Order[] } | { ok: false }> {
  try {
    const { uid } = await adminAuth().verifyIdToken(idToken);
    return { ok: true, orders: await getOrdersForUser(uid) };
  } catch {
    return { ok: false };
  }
}
