import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // Product photos uploaded from the admin live in Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  partialPrefetching: true,
  // Bundle firebase-admin instead of loading it from node_modules at runtime. Its
  // auth module pulls in jwks-rsa, which require()s the ESM-only jose 6; that works
  // locally but fails in Vercel's function runtime (ERR_REQUIRE_ESM).
  transpilePackages: ["firebase-admin"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
