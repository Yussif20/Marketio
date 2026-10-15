import { RotateCcw, Truck } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/home/section-heading";
import { Price } from "@/components/product/price";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { ProductShowcase } from "@/components/product/product-showcase";
import { RatingBreakdown } from "@/components/product/rating-breakdown";
import { RatingStars } from "@/components/product/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProductBySlug, getProductSlugs, getRelatedProducts } from "@/lib/catalog";
import { discountPercent, formatDiscount } from "@/lib/product";
import { absoluteUrl } from "@/lib/site";
import type { Product } from "@/types/product";

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const locale = await getLocale();
  const path = (l: Locale) => `/${l}/products/${slug}`;

  return {
    title: product.title[locale],
    description: product.description[locale],
    alternates: {
      canonical: path(locale),
      languages: Object.fromEntries(routing.locales.map((l) => [l, path(l)])),
    },
    openGraph: {
      title: product.title[locale],
      description: product.description[locale],
      url: path(locale),
      locale: locale === "ar" ? "ar_AR" : "en_US",
    },
  };
}

function productJsonLd(product: Product, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title[locale],
    description: product.description[locale],
    sku: product.id,
    category: product.category,
    image: product.images.map((src) => absoluteUrl(src)),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/${locale}/products/${product.slug}`),
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: product.currency,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(product.rating.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.average,
        reviewCount: product.rating.count,
      },
    }),
  };
}

// Every known slug is prerendered; the Suspense boundary gives unknown or new
// slugs an instant skeleton while the page renders on demand.
export default function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Pick<PageProps<"/[locale]/products/[slug]">, "params">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const locale = await getLocale();
  const t = await getTranslations();
  const related = await getRelatedProducts(product);
  const discount = discountPercent(product);
  const title = product.title[locale];

  const summary = (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <RatingStars rating={product.rating.average} label={t("product.ratingLabel", { rating: product.rating.average })} />
        <a href="#reviews" className="hover:text-foreground hover:underline">
          {t("product.reviews", { count: product.rating.count })}
        </a>
        <span aria-hidden>·</span>
        {product.stock > 0 ? (
          <span className={product.stock <= 5 ? "font-medium text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}>
            {product.stock <= 5 ? t("product.onlyLeft", { count: product.stock }) : t("product.inStock")}
          </span>
        ) : (
          <span className="text-destructive">{t("product.outOfStock")}</span>
        )}
      </p>
      <div className="flex items-center gap-3">
        <Price priceCents={product.priceCents} oldPriceCents={product.oldPriceCents} size="lg" />
        {discount > 0 && <Badge>{formatDiscount(discount, locale)}</Badge>}
      </div>
    </div>
  );

  const details = (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-semibold">{t("product.description")}</h2>
        <p className="leading-relaxed text-muted-foreground">{product.description[locale]}</p>
      </div>
      <ul className="divide-y rounded-xl border">
        <li className="flex gap-4 p-4">
          <Truck className="size-6 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">{t("product.freeDelivery.title")}</p>
            <p className="text-sm text-muted-foreground">{t("product.freeDelivery.text")}</p>
          </div>
        </li>
        <li className="flex gap-4 p-4">
          <RotateCcw className="size-6 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">{t("product.returns.title")}</p>
            <p className="text-sm text-muted-foreground">{t("product.returns.text")}</p>
          </div>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto space-y-16 px-4 py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product, locale)).replace(/</g, "\\u003c") }}
      />

      <div className="space-y-6">
        <nav aria-label={t("product.breadcrumb")} className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-foreground">{t("header.home")}</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/products" className="hover:text-foreground">{t("header.products")}</Link></li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
                {t(`categories.${product.category}`)}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-foreground">{title}</li>
          </ol>
        </nav>

        <ProductShowcase product={product} summary={summary} details={details} />
      </div>

      <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-28">
        <SectionHeading id="reviews-title" eyebrow={t("product.reviewsEyebrow")} title={t("product.ratingsTitle")} />
        <RatingBreakdown rating={product.rating} />
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title">
          <SectionHeading id="related-title" eyebrow={t("product.relatedEyebrow")} title={t("product.related")} />
          <ProductGrid>
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </ProductGrid>
        </section>
      )}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-10" aria-hidden>
      <Skeleton className="mb-6 h-4 w-64" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Skeleton className="aspect-square" />
        <div className="space-y-4">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-24" />
        </div>
      </div>
    </div>
  );
}
