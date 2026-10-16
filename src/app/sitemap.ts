import type { MetadataRoute } from "next";
import { journalPosts } from "@/data/content/journal";
import { routing } from "@/i18n/routing";
import { getProductSlugs } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";
import { BRANDS, CATEGORIES } from "@/types/product";

const STATIC_PAGES = ["", "/products", "/brands", "/journal", "/about", "/contact", "/faq", "/shipping", "/privacy", "/terms"];

/** Every public page in both locales, each listing its other-language alternate. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    ...STATIC_PAGES,
    ...CATEGORIES.map((c) => `/categories/${c}`),
    ...BRANDS.map((b) => `/brands/${b}`),
    ...(await getProductSlugs()).map((slug) => `/products/${slug}`),
    ...journalPosts.map((post) => `/journal/${post.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(`/${l}${path}`)])),
      },
    })),
  );
}
