import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";

/**
 * firebase-admin app shared by the Next.js server and `scripts/seed.ts`.
 * App code should import from `./admin` instead, which is guarded by `server-only`.
 */
export function getAdminApp(): App {
  if (getApps().length) return getApp();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Hosts may store the key on one line with literal "\n" sequences (and sometimes
  // keep the quotes from the .env file); turn it back into a PEM block.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim()
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing firebase-admin credentials: set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}
