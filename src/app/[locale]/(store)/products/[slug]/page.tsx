import { RotateCcw, Truck } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { ProductShowcase } from "@/components/product/product-showcase";
import { RatingBreakdown } from "@/components/product/rating-breakdown";
import { ReviewList } from "@/components/product/review-list";
import { RatingStars } from "@/components/product/rating-stars";
import { brands } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProductBySlug, getProductSlugs, getRelatedProducts } from "@/lib/catalog";
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

// Every known slug is prerendered, so the page is static HTML with no Suspense
// boundary (a boundary would make the browser wait for a reveal script).
export default async function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const locale = await getLocale();
  const t = await getTranslations();
  const related = await getRelatedProducts(product);
  const title = product.title[locale];
  const brand = brands.find((b) => b.slug === product.brand);

  const summary = (
    <div className="space-y-3">
      <Link
        href={`/brands/${product.brand}`}
        className="text-sm font-semibold tracking-wide text-primary uppercase hover:underline"
      >
        {brand?.name}
      </Link>
      <h1 className="text-2xl leading-tight font-bold sm:text-4xl">{title}</h1>
      <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <RatingStars rating={product.rating.average} label={t("product.ratingLabel", { rating: product.rating.average })} />
        <span className="font-medium text-foreground">{product.rating.average}</span>
        <a href="#reviews" className="hover:text-foreground hover:underline">
          ({t("product.reviews", { count: product.rating.count })})
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
    </div>
  );

  const details = (
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
  );

  return (
    <div className="container space-y-16 py-8 sm:py-10">
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
              <Link href={`/categories/${product.category}`} className="hover:text-foreground">
                {t(`categories.${product.category}`)}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/products?sub=${product.subcategory}`} className="hover:text-foreground">
                {t(`subcategories.${product.subcategory}`)}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="line-clamp-1 text-foreground">{title}</li>
          </ol>
        </nav>

        <ProductShowcase product={product} summary={summary} details={details} />
      </div>

      <section aria-labelledby="details-title" className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 id="details-title" className="mb-4 text-2xl font-bold">{t("product.description")}</h2>
          <p className="leading-relaxed text-muted-foreground">{product.description[locale]}</p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">{t("product.specifications")}</h2>
          <dl className="divide-y rounded-xl border">
            {product.specs.map((spec) => (
              <div key={spec.label.en} className="grid grid-cols-[minmax(7rem,40%)_1fr] gap-4 px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{spec.label[locale]}</dt>
                <dd className="font-medium">{spec.value[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-36">
        <SectionHeading id="reviews-title" eyebrow={t("product.reviewsEyebrow")} title={t("product.ratingsTitle")} />
        <div className="grid gap-10 lg:grid-cols-[22rem_1fr]">
          <RatingBreakdown rating={product.rating} />
          <ReviewList reviews={product.reviews} />
        </div>
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
