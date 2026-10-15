import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Countdown } from "@/components/home/countdown";
import { SectionHeading } from "@/components/home/section-heading";
import { Price } from "@/components/product/price";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import { getHomeSections } from "@/lib/catalog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: { absolute: t("title") } };
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const { flashSale, bestSellers, newArrivals, featured } = await getHomeSections();
  const hero = featured.find((p) => p.category === "accessories") ?? featured[0];
  const Forward = localeDirection[locale] === "rtl" ? ArrowLeft : ArrowRight;

  const viewAll = (href: string) => (
    <Button variant="outline" asChild>
      <Link href={href}>
        {t("buttons.viewAll")}
        <Forward data-icon="inline-end" />
      </Link>
    </Button>
  );

  return (
    <div className="container space-y-16 py-8 sm:py-10">
      <section className="grid overflow-hidden rounded-2xl bg-neutral-950 text-white md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
          <p className="text-sm text-white/70">{t("home.heroEyebrow")}</p>
          <h1 className="text-4xl leading-tight font-bold sm:text-5xl">
            {t("home.heroTitle")}
            <span className="block text-primary">{t("home.heroSubtitle")}</span>
          </h1>
          <p className="max-w-md text-white/80">{hero.title[locale]}</p>
          <Price priceCents={hero.priceCents} oldPriceCents={hero.oldPriceCents} size="lg" />
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href={`/products/${hero.slug}`}>{t("buttons.shopNow")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
              <Link href="/products">{t("buttons.browseAll")}</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto md:min-h-96">
          <Image
            src={hero.images[0]}
            alt={hero.title[locale]}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section aria-labelledby="flash-title">
        <SectionHeading id="flash-title" eyebrow={t("home.flashSales.headline")} title={t("home.flashSales.title")}>
          <Countdown />
        </SectionHeading>
        <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
          {flashSale.map((product) => (
            <li key={product.id} className="w-56 shrink-0 snap-start sm:w-64">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">{viewAll("/products?sort=discount")}</div>
      </section>

      <section aria-labelledby="categories-title" className="border-y py-12">
        <SectionHeading id="categories-title" eyebrow={t("categories.headline")} title={t("categories.title")} />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map(({ slug, icon: Icon }) => (
            <li key={slug}>
              <Link
                href={`/products?category=${slug}`}
                className="flex flex-col items-center gap-3 rounded-xl border p-5 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-8" aria-hidden />
                <span className="text-sm font-medium">{t(`categories.${slug}`)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="best-title">
        <SectionHeading id="best-title" eyebrow={t("home.bestSelling.headline")} title={t("home.bestSelling.title")}>
          {viewAll("/products?sort=rating")}
        </SectionHeading>
        <ProductGrid>
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>

      <section aria-labelledby="new-title">
        <SectionHeading id="new-title" eyebrow={t("home.newArrival.headline")} title={t("home.newArrival.title")}>
          {viewAll("/products?sort=new")}
        </SectionHeading>
        <ProductGrid>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>

    </div>
  );
}
