import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { Pagination } from "@/components/shop/pagination";
import { ProductFilters } from "@/components/shop/product-filters";
import { SortSelect } from "@/components/shop/sort-select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { getPriceBounds, searchProducts } from "@/lib/catalog";
import { parseProductQuery } from "@/lib/product-query";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("listing");
  return { title: t("title"), alternates: { languages: { ar: "/ar/products", en: "/en/products" } } };
}

// The page shell is static; only the results read the URL, inside Suspense.
export default function ProductsPage({ searchParams }: PageProps<"/[locale]/products">) {
  return (
    <div className="container py-8 sm:py-10">
      <Suspense fallback={<ResultsSkeleton />}>
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ProductResults({ searchParams }: Pick<PageProps<"/[locale]/products">, "searchParams">) {
  const t = await getTranslations("listing");
  const query = parseProductQuery(await searchParams);
  const [{ items, total, page, pageCount }, priceBounds] = await Promise.all([
    searchProducts(query),
    getPriceBounds(),
  ]);

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {query.q ? t("resultsFor", { q: query.q }) : t("title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
          {t("count", { count: total })}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block" aria-label={t("filters")}>
          <ProductFilters query={query} priceBounds={priceBounds} idPrefix="aside" />
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <MobileFilters query={query} priceBounds={priceBounds} />
            <div className="ms-auto">
              <SortSelect query={query} />
            </div>
          </div>

          {items.length > 0 ? (
            <>
              {/* Cards use <h3>, so the grid gets a visually hidden <h2> to keep the heading order. */}
              <h2 className="sr-only">{t("gridHeading")}</h2>
              <ProductGrid>
                {items.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 4} />
                ))}
              </ProductGrid>
            </>
          ) : (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <p className="font-medium">{t("empty")}</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/products">{t("clearAll")}</Link>
              </Button>
            </div>
          )}

          <Pagination query={query} page={page} pageCount={pageCount} />
        </div>
      </div>
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div aria-hidden>
      <Skeleton className="mb-2 h-8 w-48" />
      <Skeleton className="mb-6 h-4 w-24" />
      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <Skeleton className="hidden h-96 lg:block" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="aspect-[3/4]" />
          ))}
        </div>
      </div>
    </div>
  );
}
