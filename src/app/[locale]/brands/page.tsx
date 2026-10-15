import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { brands } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { getBrandSummaries } from "@/lib/catalog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("brands");
  return { title: t("title") };
}

export default async function BrandsPage() {
  const t = await getTranslations();
  const summaries = await getBrandSummaries();
  const nameOf = Object.fromEntries(brands.map((b) => [b.slug, b.name]));

  return (
    <div className="container py-8 sm:py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">{t("brands.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("brands.intro")}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaries.map(({ brand, count, image }) => (
          <li key={brand}>
            <Link href={`/brands/${brand}`} className="group block overflow-hidden rounded-2xl border transition-shadow hover:shadow-md">
              <span className="relative block aspect-[4/3] bg-muted">
                {image && <Image src={image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
              </span>
              <span className="block p-4">
                <span className="block text-xl font-bold" dir="ltr">{nameOf[brand]}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{t(`brands.${brand}`)}</span>
                <span className="mt-2 block text-xs font-medium text-primary">{t("listing.count", { count })}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
