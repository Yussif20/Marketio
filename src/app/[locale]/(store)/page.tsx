import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Countdown } from "@/components/home/countdown";
import { HeroSlider } from "@/components/home/hero-slider";
import {
  BrandStrip,
  CategoryTiles,
  CollectionTiles,
  PromoBanners,
  StyleGallery,
  Testimonials,
} from "@/components/home/home-sections";
import { SectionHeading } from "@/components/home/section-heading";
import { TabbedProducts } from "@/components/home/tabbed-products";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import { getBestSellersByCategory, getHomeSections } from "@/lib/catalog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: { absolute: t("title") } };
}

const BEST_SELLER_TABS = ["phones", "laptops", "clothing", "accessories"] as const;

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const [{ flashSale, bestSellers, newArrivals }, byCategory] = await Promise.all([
    getHomeSections(),
    getBestSellersByCategory(4),
  ]);
  const Forward = localeDirection[locale] === "rtl" ? ArrowLeft : ArrowRight;

  const viewAll = (href: string) => (
    <Button variant="outline" asChild>
      <Link href={href}>
        {t("buttons.viewAll")}
        <Forward data-icon="inline-end" />
      </Link>
    </Button>
  );

  const grid = (items: typeof bestSellers, key?: string) => (
    <ProductGrid key={key}>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );

  return (
    <div className="container space-y-16 py-6 sm:space-y-20 sm:py-8">
      <HeroSlider />

      <CategoryTiles />

      <section aria-labelledby="flash-title">
        <SectionHeading id="flash-title" eyebrow={t("home.flashSales.headline")} title={t("home.flashSales.title")}>
          <Countdown />
        </SectionHeading>
        <ul className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
          {flashSale.map((product) => (
            <li key={product.id} className="w-56 shrink-0 snap-start sm:w-64">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center">{viewAll("/products?sort=discount")}</div>
      </section>

      <PromoBanners />

      <section aria-labelledby="best-title">
        <SectionHeading id="best-title" eyebrow={t("home.bestSelling.headline")} title={t("home.bestSelling.title")}>
          {viewAll("/products?sort=rating")}
        </SectionHeading>
        <TabbedProducts
          id="best-sellers"
          tabs={[
            { key: "all", label: t("home.bestSelling.all") },
            ...BEST_SELLER_TABS.map((category) => ({ key: category, label: t(`categories.${category}`) })),
          ]}
          panels={[grid(bestSellers, "all"), ...BEST_SELLER_TABS.map((category) => grid(byCategory[category], category))]}
        />
      </section>

      <BrandStrip />

      <section aria-labelledby="new-title">
        <SectionHeading id="new-title" eyebrow={t("home.newArrival.headline")} title={t("home.newArrival.title")}>
          {viewAll("/products?sort=new")}
        </SectionHeading>
        {grid(newArrivals)}
      </section>

      <CollectionTiles />

      <Testimonials />

      <StyleGallery />
    </div>
  );
}
