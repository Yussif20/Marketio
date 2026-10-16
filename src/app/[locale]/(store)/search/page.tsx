import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SearchBox } from "@/components/layout/search-box";
import { categories } from "@/data/categories";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("searchPage");
  return { title: t("title"), robots: { index: false } };
}

const POPULAR = ["headphones", "laptop", "hoodie", "watch", "camera", "sneakers"] as const;

/** Full-page search, used by the phone header and tab bar. */
export default async function SearchPage() {
  const t = await getTranslations();

  return (
    <div className="container max-w-3xl py-8 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold">{t("searchPage.title")}</h1>
      <SearchBox autoFocus size="lg" />

      <section className="mt-10">
        <h2 className="mb-3 font-semibold">{t("searchPage.popular")}</h2>
        <ul className="flex flex-wrap gap-2">
          {POPULAR.map((term) => (
            <li key={term}>
              <Link
                href={`/products?q=${encodeURIComponent(t(`searchPage.terms.${term}`))}`}
                className="block rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary"
              >
                {t(`searchPage.terms.${term}`)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-semibold">{t("categories.title")}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map(({ slug, icon: Icon }) => (
            <li key={slug}>
              <Link href={`/categories/${slug}`} className="flex items-center gap-3 rounded-xl border p-3 hover:border-primary">
                <Icon className="size-5 text-muted-foreground" aria-hidden />
                <span className="text-sm font-medium">{t(`categories.${slug}`)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
