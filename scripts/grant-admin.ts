/**
 * Gives a Firebase Auth user the `admin` custom claim, or takes it away.
 * The user must already exist (sign up once on /account first).
 *
 *   npm run admin:grant -- you@example.com
 *   npm run admin:grant -- you@example.com --revoke
 *
 * The claim reaches the user's ID token on their next sign-in.
 */
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "@/lib/firebase/admin-app";

async function main() {
  const args = process.argv.slice(2);
  const email = args.find((arg) => !arg.startsWith("--"));
  const revoke = args.includes("--revoke");
  if (!email) {
    console.error("Usage: npm run admin:grant -- <email> [--revoke]");
    process.exit(1);
  }

  const auth = getAuth(getAdminApp());
  const user = await auth.getUserByEmail(email);
  const claims = { ...user.customClaims };
  if (revoke) delete claims.admin;
  else claims.admin = true;
  await auth.setCustomUserClaims(user.uid, claims);
  // Ends existing sessions so the change applies right away.
  await auth.revokeRefreshTokens(user.uid);
  console.log(`${revoke ? "Removed" : "Granted"} admin for ${email}. Sign in again to pick it up.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
