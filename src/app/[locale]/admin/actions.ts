"use server";

import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_DAYS,
  createDemoToken,
  DEMO_COOKIE,
  DEMO_SESSION_HOURS,
  DemoReadOnlyError,
  requireAdminWrite,
} from "@/lib/admin/session";
import { adminDb } from "@/lib/firebase/admin";
import { adminAuth } from "@/lib/firebase/admin-auth";
import { updateOrder } from "@/lib/orders";
import { ratingFromBreakdown } from "@/lib/product";
import { BRANDS, CATEGORIES, SUBCATEGORIES, type Product } from "@/types/product";
import { ORDER_STATUSES } from "@/types/order";

type ActionResult<T = object> = ({ ok: true } & T) | { ok: false; error: "demo" | "unauthorised" | "invalid" | "not-admin" | "no-storage" | "server" };

const cookieOptions = (maxAgeSeconds: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: maxAgeSeconds,
});

function fail(error: unknown): { ok: false; error: "demo" | "unauthorised" | "server" } {
  if (error instanceof DemoReadOnlyError) return { ok: false, error: "demo" };
  if (error instanceof Error && error.message === "unauthorised") return { ok: false, error: "unauthorised" };
  console.error("admin action failed", error);
  return { ok: false, error: "server" };
}

/** Exchanges a Firebase ID token for an admin session cookie, if the user has the `admin` claim. */
export async function signInAdmin(idToken: string): Promise<ActionResult> {
  try {
    const decoded = await adminAuth().verifyIdToken(idToken);
    if (decoded.admin !== true) return { ok: false, error: "not-admin" };
    const expiresIn = ADMIN_SESSION_DAYS * 24 * 3600 * 1000;
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
    (await cookies()).set(ADMIN_COOKIE, sessionCookie, cookieOptions(expiresIn / 1000));
    return { ok: true };
  } catch {
    return { ok: false, error: "unauthorised" };
  }
}

/** Starts the public read-only demo: no account, nothing it does is saved. */
export async function startAdminDemo(): Promise<ActionResult> {
  try {
    (await cookies()).set(DEMO_COOKIE, createDemoToken(), cookieOptions(DEMO_SESSION_HOURS * 3600));
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function signOutAdmin() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  store.delete(DEMO_COOKIE);
}

export async function setOrderStatus(orderId: string, status: string): Promise<ActionResult> {
  const parsed = z.object({ orderId: z.string().regex(/^[A-Za-z0-9-]{3,40}$/), status: z.enum(ORDER_STATUSES) }).safeParse({ orderId, status });
  if (!parsed.success) return { ok: false, error: "invalid" };
  try {
    await requireAdminWrite();
    await updateOrder(parsed.data.orderId, { status: parsed.data.status });
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

const text = z.object({ en: z.string().trim().min(2).max(200), ar: z.string().trim().min(2).max(200) });
const longText = z.object({ en: z.string().trim().min(10).max(2000), ar: z.string().trim().min(10).max(2000) });
const allSubcategories = Object.values(SUBCATEGORIES).flat() as string[];

const productSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]{3,80}$/),
    isNew: z.boolean(),
    title: text,
    description: longText,
    brand: z.enum(BRANDS),
    category: z.enum(CATEGORIES),
    subcategory: z.string().refine((value) => allSubcategories.includes(value)),
    priceCents: z.number().int().min(100).max(10_000_000),
    oldPriceCents: z.number().int().min(100).max(10_000_000).optional(),
    stock: z.number().int().min(0).max(100_000),
    featured: z.boolean(),
    images: z.array(z.string().max(500).regex(/^(\/[\w./-]+|https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/\S+)$/)).min(1).max(8),
  })
  .refine((p) => (SUBCATEGORIES[p.category] as readonly string[]).includes(p.subcategory), { path: ["subcategory"] })
  .refine((p) => p.oldPriceCents === undefined || p.oldPriceCents > p.priceCents, { path: ["oldPriceCents"] });

export type ProductFormInput = z.infer<typeof productSchema>;

/**
 * Creates or updates a product in Firestore and refreshes the cached catalogue.
 * Fields the form doesn't edit (colours, options, specs, reviews) are kept.
 */
export async function saveProduct(input: ProductFormInput): Promise<ActionResult<{ id: string }>> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  try {
    await requireAdminWrite();
    const { isNew, ...data } = parsed.data;
    const ref = adminDb().collection("products").doc(data.id);
    const existing = (await ref.get()).data() as Product | undefined;
    if (isNew && existing) return { ok: false, error: "invalid" };
    if (!isNew && !existing) return { ok: false, error: "invalid" };

    const product: Product = existing
      ? { ...existing, ...data, slug: data.id, subcategory: data.subcategory as Product["subcategory"], oldPriceCents: data.oldPriceCents }
      : {
          ...data,
          slug: data.id,
          subcategory: data.subcategory as Product["subcategory"],
          highlights: [],
          specs: [],
          currency: "USD",
          sold: 0,
          rating: ratingFromBreakdown({ five: 0, four: 0, three: 0, two: 0, one: 0 }),
          reviews: [],
          colors: [],
          collections: [],
          createdAt: new Date().toISOString().slice(0, 10),
        };
    await ref.set(JSON.parse(JSON.stringify(product)));
    updateTag("products");
    return { ok: true, id: data.id };
  } catch (error) {
    return fail(error);
  }
}

const IMAGE_TYPES = ["image/webp", "image/jpeg", "image/png"];

/** Uploads a product photo to Vercel Blob and returns its public URL. */
export async function uploadProductImage(formData: FormData): Promise<ActionResult<{ url: string }>> {
  try {
    await requireAdminWrite();
    if (!process.env.BLOB_READ_WRITE_TOKEN) return { ok: false, error: "no-storage" };
    const file = formData.get("file");
    const productId = String(formData.get("productId") ?? "");
    if (!(file instanceof File) || !IMAGE_TYPES.includes(file.type) || file.size > 4 * 1024 * 1024 || !/^[a-z0-9-]{3,80}$/.test(productId)) {
      return { ok: false, error: "invalid" };
    }
    const extension = file.type.split("/")[1];
    const blob = await put(`products/${productId}/${Date.now()}.${extension}`, file, { access: "public", contentType: file.type });
    return { ok: true, url: blob.url };
  } catch (error) {
    return fail(error);
  }
}
