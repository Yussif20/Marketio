import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { journalPosts } from "@/data/content/journal";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("journal");
  return { title: t("title"), description: t("intro") };
}

export default async function JournalPage() {
  const t = await getTranslations("journal");
  const locale = await getLocale();
  const dateFormat = new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en-US", { dateStyle: "long" });
  const [lead, ...rest] = journalPosts;

  return (
    <div className="container space-y-12 py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("intro")}</p>
      </header>

      <Link href={`/journal/${lead.slug}`} className="group grid overflow-hidden rounded-2xl border md:grid-cols-2">
        <span className="relative block aspect-[16/9] md:aspect-auto md:min-h-80">
          <Image src={lead.cover} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="flex flex-col justify-center p-6 sm:p-10">
          <span className="text-sm text-muted-foreground">
            {dateFormat.format(new Date(lead.date))} · {t("minutes", { count: lead.readingMinutes })}
          </span>
          <span className="mt-2 text-2xl font-bold sm:text-3xl group-hover:underline">{lead.title[locale]}</span>
          <span className="mt-3 text-muted-foreground">{lead.excerpt[locale]}</span>
          <span className="mt-5 font-semibold text-primary">{t("readMore")}</span>
        </span>
      </Link>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <li key={post.slug}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <span className="relative block aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
                <Image src={post.cover} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </span>
              <span className="mt-3 block text-sm text-muted-foreground">
                {dateFormat.format(new Date(post.date))} · {t("minutes", { count: post.readingMinutes })}
              </span>
              <span className="mt-1 block text-lg font-semibold group-hover:underline">{post.title[locale]}</span>
              <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{post.excerpt[locale]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
