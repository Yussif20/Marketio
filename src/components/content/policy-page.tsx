import { getLocale, getTranslations } from "next-intl/server";
import type { PolicyPage } from "@/data/content/pages";

export async function PolicyArticle({ page }: { page: PolicyPage }) {
  const locale = await getLocale();
  const t = await getTranslations("policies");
  const updated = new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en-US", { dateStyle: "long" }).format(
    new Date(page.updated),
  );

  return (
    <article className="container max-w-3xl py-8 sm:py-12">
      <h1 className="text-4xl font-bold">{page.title[locale]}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{page.intro[locale]}</p>
      <p className="mt-2 text-sm text-muted-foreground">{t("updated", { date: updated })}</p>
      <div className="mt-10 space-y-8">
        {page.sections.map((section, i) => (
          <section key={section.heading.en} className="border-t pt-6">
            <h2 className="text-xl font-semibold">
              <span className="text-primary">{i + 1}.</span> {section.heading[locale]}
            </h2>
            <p className="mt-2 leading-relaxed text-foreground/85">{section.body[locale]}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
