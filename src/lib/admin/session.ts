import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { cache } from "react";
import { adminAuth } from "@/lib/firebase/admin";

/** Firebase session cookie for real admins (users with the `admin` custom claim). */
export const ADMIN_COOKIE = "mk_admin";
/** Signed, expiring cookie for the public read-only demo. */
export const DEMO_COOKIE = "mk_admin_demo";

export const ADMIN_SESSION_DAYS = 5;
export const DEMO_SESSION_HOURS = 2;

export type AdminSession = { role: "admin"; email: string } | { role: "demo" };

function demoSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters).");
  return secret;
}

const sign = (value: string) => createHmac("sha256", demoSecret()).update(value).digest("base64url");

/** `demo.<expiry ms>.<signature>` */
export function createDemoToken(now = Date.now()) {
  const payload = `demo.${now + DEMO_SESSION_HOURS * 3600_000}`;
  return `${payload}.${sign(payload)}`;
}

function verifyDemoToken(token: string) {
  const [role, expiry, signature] = token.split(".");
  if (role !== "demo" || !expiry || !signature) return false;
  const expected = Buffer.from(sign(`${role}.${expiry}`));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given) && Number(expiry) > Date.now();
}

/** The current admin session from cookies, or null. Real admin sessions take priority over demo ones. */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  // Sessions expire, so they're always checked at request time (verifyDemoToken reads the clock).
  await connection();
  const store = await cookies();

  const adminCookie = store.get(ADMIN_COOKIE)?.value;
  if (adminCookie) {
    try {
      const claims = await adminAuth().verifySessionCookie(adminCookie, true);
      if (claims.admin === true) return { role: "admin", email: claims.email ?? "" };
    } catch {
      // Expired or revoked: fall through to the demo cookie or no session.
    }
  }

  const demoCookie = store.get(DEMO_COOKIE)?.value;
  if (demoCookie) {
    try {
      if (verifyDemoToken(demoCookie)) return { role: "demo" };
    } catch {
      return null;
    }
  }
  return null;
});

export class DemoReadOnlyError extends Error {
  constructor() {
    super("demo");
  }
}

/**
 * Guard for every admin write. Demo visitors get DemoReadOnlyError, so nothing
 * they do in the public demo is saved; no session at all is an auth error.
 */
export async function requireAdminWrite() {
  const session = await getAdminSession();
  if (!session) throw new Error("unauthorised");
  if (session.role === "demo") throw new DemoReadOnlyError();
  return session;
}

/** Hides most of a customer detail for demo viewers, who must not see what real shoppers typed. */
export function maskForDemo(value: string, session: AdminSession) {
  if (session.role === "admin" || !value) return value;
  if (value.includes("@")) {
    const [user, domain] = value.split("@");
    return `${user.slice(0, 1)}•••@${domain}`;
  }
  return value.length <= 3 ? "•••" : `${value.slice(0, 2)}${"•".repeat(Math.min(8, value.length - 2))}`;
}
