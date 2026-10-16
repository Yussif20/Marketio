import "server-only";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "./admin-app";

/**
 * Firestore only. Auth lives in `./admin-auth` so pages that just read products
 * or orders never load firebase-admin/auth and its JWT dependencies.
 */
export const adminDb = () => getFirestore(getAdminApp());
