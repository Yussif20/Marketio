import { NextResponse, type NextRequest } from "next/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { searchProducts } from "@/lib/catalog";
import { DEFAULT_QUERY } from "@/lib/product-query";

/** Search-as-you-type suggestions for the header: the top five products for `q`. */
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 100);
  const localeParam = request.nextUrl.searchParams.get("locale") ?? "";
  const locale = hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale;

  if (q.length < 2) return NextResponse.json({ items: [], total: 0 });

  const { items, total } = await searchProducts({ ...DEFAULT_QUERY, q, sort: "rating" });
  return NextResponse.json({
    total,
    items: items.slice(0, 5).map((product) => ({
      slug: product.slug,
      title: product.title[locale],
      image: product.images[0],
      priceCents: product.priceCents,
      oldPriceCents: product.oldPriceCents,
    })),
  });
}
