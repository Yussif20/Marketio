import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { RatingStars } from "@/components/product/rating-stars";
import { Button } from "@/components/ui/button";
import { brands, categories } from "@/data/categories";
import { testimonials } from "@/data/testimonials";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import { COLLECTIONS } from "@/types/product";
import { SectionHeading } from "./section-heading";

async function forwardIcon() {
  return localeDirection[await getLocale()] === "rtl" ? ArrowLeft : ArrowRight;
}

/** Image tiles for every category plus a gift-ideas tile. */
export async function CategoryTiles() {
  const t = await getTranslations();
  const tiles = [
    ...categories.map((c) => ({ key: c.slug, href: `/categories/${c.slug}`, image: c.image, label: t(`categories.${c.slug}`) })),
    { key: "gifts", href: "/products?collection=gift-ideas", image: "/categories/gifts.webp", label: t("home.collections.gift-ideas.title") },
  ];

  return (
    <section aria-labelledby="categories-title">
      <SectionHeading id="categories-title" eyebrow={t("categories.headline")} title={t("categories.title")} />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {tiles.map((tile) => (
          <li key={tile.key}>
            <Link href={tile.href} className="group relative block aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-3 bottom-3 rounded-xl bg-background/90 px-3 py-2 text-center text-sm font-semibold shadow-sm backdrop-blur sm:text-base">
                {tile.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Two side-by-side promotional banners. */
export async function PromoBanners() {
  const t = await getTranslations("home.promos");
  const rtl = localeDirection[await getLocale()] === "rtl";
  const promos = [
    { key: "wearables", image: "/banners/promo-wearables.webp", href: "/products?category=accessories&sub=watches,audio" },
    { key: "kids", image: "/banners/promo-kids.webp", href: "/products?category=toys" },
  ] as const;

  return (
    <section className="grid gap-4 md:grid-cols-2" aria-label={t("label")}>
      {promos.map((promo) => (
        <Link key={promo.key} href={promo.href} className="group relative block aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={promo.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${rtl ? "-scale-x-100" : ""}`}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/45 to-transparent rtl:bg-linear-to-l" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 text-white sm:p-10">
            <p className="text-sm font-medium tracking-wide text-white/85 uppercase">{t(`${promo.key}.eyebrow`)}</p>
            <h3 className="mt-2 max-w-[14rem] text-2xl font-bold sm:text-3xl">{t(`${promo.key}.title`)}</h3>
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900">
              {t(`${promo.key}.cta`)}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}

/** Invented brand wordmarks linking to each brand page. */
export async function BrandStrip() {
  const t = await getTranslations("brands");
  return (
    <section aria-labelledby="brands-title" className="rounded-2xl bg-muted/60 px-4 py-10 sm:px-8">
      <h2 id="brands-title" className="mb-6 text-center text-2xl font-bold">{t("title")}</h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {brands.map((brand) => (
          <li key={brand.slug}>
            <Link
              href={`/brands/${brand.slug}`}
              className="flex h-20 flex-col items-center justify-center rounded-xl bg-background px-2 text-center shadow-xs transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-lg font-bold tracking-wide" dir="ltr">{brand.name}</span>
              <span className="line-clamp-1 text-[11px] text-muted-foreground">{t(brand.slug)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Curated collections with lifestyle photos. */
export async function CollectionTiles() {
  const t = await getTranslations("home.collections");
  const Forward = await forwardIcon();
  return (
    <section aria-labelledby="collections-title">
      <SectionHeading id="collections-title" eyebrow={t("eyebrow")} title={t("title")} />
      <ul className="grid gap-4 md:grid-cols-3">
        {COLLECTIONS.map((key) => (
          <li key={key}>
            <Link href={`/products?collection=${key}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-square">
              <Image
                src={`/collections/${key}.webp`}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{t(`${key}.title`)}</h3>
                <p className="mt-1 text-sm text-white/85">{t(`${key}.text`)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                  {t("shop")} <Forward className="size-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function Testimonials() {
  const t = await getTranslations("home.testimonials");
  const product = await getTranslations("product");
  const locale = await getLocale();
  return (
    <section aria-labelledby="testimonials-title">
      <SectionHeading id="testimonials-title" eyebrow={t("eyebrow")} title={t("title")} />
      <ul className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <li key={item.author} className="flex flex-col rounded-2xl border bg-card p-6">
            <Quote className="size-8 text-primary/30" aria-hidden />
            <p className="mt-3 flex-1 leading-relaxed">{item.body[locale]}</p>
            <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
              <div>
                <p className="font-semibold" dir="ltr">{item.author}</p>
                <p className="text-xs text-muted-foreground">{item.city[locale]}</p>
              </div>
              <RatingStars rating={item.rating} label={product("ratingLabel", { rating: item.rating })} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Instagram-style photo grid made from product and lifestyle shots. */
export async function StyleGallery() {
  const t = await getTranslations("home.gallery");
  const photos = [
    { src: "/products/kora-trench-coat/1.webp", href: "/products/kora-trench-coat" },
    { src: "/collections/travel-light.webp", href: "/products?collection=travel-light" },
    { src: "/products/aurora-wireless-headphones/2.webp", href: "/products/aurora-wireless-headphones" },
    { src: "/products/halden-minimal-watch/4.webp", href: "/products/halden-minimal-watch" },
    { src: "/collections/work-from-home.webp", href: "/products?collection=work-from-home" },
    { src: "/products/kora-runner-sneakers/1.webp", href: "/products/kora-runner-sneakers" },
  ];
  return (
    <section aria-labelledby="gallery-title" className="text-center">
      <p className="text-sm font-semibold text-primary" dir="ltr">{t("eyebrow")}</p>
      <h2 id="gallery-title" className="mt-1 text-2xl font-bold sm:text-3xl">{t("title")}</h2>
      <p className="mt-2 text-muted-foreground">{t("text")}</p>
      <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {photos.map((photo) => (
          <li key={photo.src}>
            <Link href={photo.href} className="group relative block aspect-square overflow-hidden rounded-xl bg-muted">
              <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 16vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </Link>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="mt-6" asChild>
        <Link href="/journal">{t("cta")}</Link>
      </Button>
    </section>
  );
}
