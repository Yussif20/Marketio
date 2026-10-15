import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { brands } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getBrandProducts } from "@/lib/catalog";
import { BRANDS, type Brand } from "@/types/product";

const isBrand = (value: string): value is Brand => (BRANDS as readonly string[]).includes(value);

export function generateStaticParams() {
  return BRANDS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/brands/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isBrand(slug)) return {};
  const t = await getTranslations("brands");
  const name = brands.find((b) => b.slug === slug)?.name;
  return {
    title: name,
    description: t(slug),
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/brands/${slug}`])) },
  };
}

export default function BrandPage({ params }: PageProps<"/[locale]/brands/[slug]">) {
  return (
    <Suspense fallback={<div className="container py-10"><Skeleton className="h-48 rounded-2xl" /></div>}>
      <BrandContent params={params} />
    </Suspense>
  );
}

async function BrandContent({ params }: Pick<PageProps<"/[locale]/brands/[slug]">, "params">) {
  const { slug } = await params;
  if (!isBrand(slug)) notFound();

  const t = await getTranslations();
  const products = await getBrandProducts(slug);
  const name = brands.find((b) => b.slug === slug)?.name;

  return (
    <div className="container space-y-10 py-6 sm:py-8">
      <nav aria-label={t("product.breadcrumb")} className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-foreground">{t("header.home")}</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/brands" className="hover:text-foreground">{t("brands.title")}</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground" dir="ltr">{name}</li>
        </ol>
      </nav>

      <header className="rounded-2xl bg-neutral-950 px-8 py-14 text-center text-white sm:py-20">
        <h1 className="text-5xl font-bold tracking-wide sm:text-6xl" dir="ltr">{name}</h1>
        <p className="mt-3 text-lg text-white/75">{t(`brands.${slug}`)}</p>
        <p className="mt-1 text-sm text-white/60">{t("listing.count", { count: products.length })}</p>
      </header>

      <ProductGrid>
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </ProductGrid>
    </div>
  );
}
