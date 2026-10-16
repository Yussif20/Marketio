import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { localeDirection, routing } from "@/i18n/routing";
import { getCategoryPage } from "@/lib/catalog";
import { CATEGORIES, type Category } from "@/types/product";

const isCategory = (value: string): value is Category => (CATEGORIES as readonly string[]).includes(value);

export function generateStaticParams() {
  return CATEGORIES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategory(slug)) return {};
  const t = await getTranslations();
  return {
    title: t(`categories.${slug}`),
    description: t(`categoryIntro.${slug}`),
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/categories/${slug}`])) },
  };
}

export default function CategoryPage({ params }: PageProps<"/[locale]/categories/[slug]">) {
  return (
    <Suspense fallback={<div className="container py-10"><Skeleton className="h-72 rounded-2xl" /></div>}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Pick<PageProps<"/[locale]/categories/[slug]">, "params">) {
  const { slug } = await params;
  if (!isCategory(slug)) notFound();

  const t = await getTranslations();
  const locale = await getLocale();
  const Forward = localeDirection[locale] === "rtl" ? ArrowLeft : ArrowRight;
  const { count, subcategories, bestSellers } = await getCategoryPage(slug);
  const category = categories.find((c) => c.slug === slug)!;
  const name = t(`categories.${slug}`);

  return (
    <div className="container space-y-14 py-6 sm:py-8">
      <nav aria-label={t("product.breadcrumb")} className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-foreground">{t("header.home")}</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground">{name}</li>
        </ol>
      </nav>

      <section className="grid items-center gap-8 overflow-hidden rounded-2xl bg-muted/60 md:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-sm font-semibold text-primary">{t("listing.count", { count })}</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{name}</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">{t(`categoryIntro.${slug}`)}</p>
          <Button size="lg" className="mt-6 h-11 px-6" asChild>
            <Link href={`/products?category=${slug}`}>
              {t("header.shopAll", { category: name })}
              <Forward data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className="relative aspect-square md:aspect-auto md:h-full md:min-h-80">
          <Image src={category.image} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section aria-labelledby="subs-title">
        <SectionHeading id="subs-title" eyebrow={name} title={t("categoryPage.shopBy")} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {subcategories.map(({ sub, count: subCount, image }) => (
            <li key={sub}>
              <Link
                href={`/products?category=${slug}&sub=${sub}`}
                className="group flex items-center gap-3 rounded-2xl border p-3 transition-colors hover:border-primary"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-20">
                  {image && <Image src={image} alt="" fill sizes="80px" className="object-cover transition-transform group-hover:scale-105" />}
                </span>
                <span>
                  <span className="block font-semibold">{t(`subcategories.${sub}`)}</span>
                  <span className="block text-xs text-muted-foreground">{t("listing.count", { count: subCount })}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="category-best-title">
        <SectionHeading id="category-best-title" eyebrow={t("home.bestSelling.headline")} title={t("categoryPage.bestIn", { category: name })} />
        <ProductGrid>
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </ProductGrid>
      </section>
    </div>
  );
}
