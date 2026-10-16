import "server-only";
import { connection } from "next/server";
import { getAllProducts } from "@/lib/catalog";
import { adminDb } from "@/lib/firebase/admin";
import type { Order, OrderStatus } from "@/types/order";

/** Statuses that count as revenue. */
const EARNING: OrderStatus[] = ["paid", "shipped", "delivered"];

/** Most recent orders first. Orders are live data, so this always runs at request time. */
export async function listOrders(limit = 300) {
  await connection();
  const snapshot = await adminDb().collection("orders").orderBy("createdAt", "desc").limit(limit).get();
  return snapshot.docs.map((doc) => doc.data() as Order);
}

export async function getDashboardData() {
  const [orders, products] = await Promise.all([listOrders(), getAllProducts()]);
  const earning = orders.filter((o) => EARNING.includes(o.status));
  const revenueCents = earning.reduce((sum, o) => sum + o.totalCents, 0);

  // Daily revenue for the last 14 days, oldest first (UTC days).
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(date.getUTCDate() - (13 - i));
    return date.toISOString().slice(0, 10);
  });
  const daily = days.map((day) => ({
    day,
    cents: earning.filter((o) => o.createdAt.slice(0, 10) === day).reduce((sum, o) => sum + o.totalCents, 0),
    orders: orders.filter((o) => o.createdAt.slice(0, 10) === day).length,
  }));

  const byMethod = (["card", "cod", "whatsapp"] as const).map((method) => ({
    method,
    count: orders.filter((o) => o.paymentMethod === method).length,
  }));

  return {
    revenueCents,
    orderCount: orders.length,
    averageCents: earning.length ? Math.round(revenueCents / earning.length) : 0,
    pendingCount: orders.filter((o) => o.status === "pending").length,
    daily,
    byMethod,
    latest: orders.slice(0, 6),
    lowStock: products.filter((p) => p.stock <= 5).sort((a, b) => a.stock - b.stock).slice(0, 6),
    topProducts: [...products].sort((a, b) => b.sold - a.sold).slice(0, 5),
    productCount: products.length,
  };
}
