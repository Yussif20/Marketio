import "server-only";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "./admin-app";

/** firebase-admin Auth, for ID tokens and admin session cookies (server only). */
export const adminAuth = () => getAuth(getAdminApp());
