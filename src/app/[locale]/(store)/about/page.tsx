import { Globe, Headset, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllProducts } from "@/lib/catalog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("title"), description: t("lead") };
}

const photos = ["warehouse", "packing", "support", "delivery"] as const;
const values = [
  { key: "quality", icon: ShieldCheck },
  { key: "delivery", icon: PackageCheck },
  { key: "support", icon: Headset },
  { key: "bilingual", icon: Globe },
] as const;

export default async function AboutPage() {
  const t = await getTranslations("about");
  const productCount = (await getAllProducts()).length;
  // Real numbers from the demo catalogue rather than invented company stats.
  const stats = [
    { value: String(productCount), label: t("stats.products") },
    { value: String(brands.length), label: t("stats.brands") },
    { value: String(routing.locales.length), label: t("stats.languages") },
    { value: "24/7", label: t("stats.support") },
  ];

  return (
    <div className="container space-y-20 py-8 sm:py-10">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-primary">{t("eyebrow")}</p>
          <h1 className="mt-2 text-4xl leading-tight font-bold sm:text-5xl">{t("title")}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("lead")}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("body")}</p>
          <p className="mt-6 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">{t("demoNote")}</p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          <Image src="/collections/store.webp" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section aria-label={t("statsLabel")}>
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse rounded-2xl bg-muted/60 p-6 text-center">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="text-4xl font-bold text-primary" dir="ltr">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="how-title">
        <h2 id="how-title" className="mb-8 text-3xl font-bold">{t("howTitle")}</h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {photos.map((photo, i) => (
            <li key={photo}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
                <Image src={`/about/${photo}.webp`} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                <span className="text-primary">{String(i + 1).padStart(2, "0")}</span> {t(`steps.${photo}.title`)}
              </h3>
              <p className="mt-1 text-muted-foreground">{t(`steps.${photo}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="values-title" className="rounded-2xl bg-neutral-950 p-8 text-white sm:p-12">
        <h2 id="values-title" className="text-3xl font-bold">{t("valuesTitle")}</h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ key, icon: Icon }) => (
            <li key={key}>
              <Icon className="size-8 text-primary" aria-hidden />
              <h3 className="mt-3 font-semibold">{t(`values.${key}.title`)}</h3>
              <p className="mt-1 text-sm text-white/70">{t(`values.${key}.text`)}</p>
            </li>
          ))}
        </ul>
        <Button size="lg" className="mt-10 h-11 px-6" asChild>
          <Link href="/products">{t("cta")}</Link>
        </Button>
      </section>
    </div>
  );
}
