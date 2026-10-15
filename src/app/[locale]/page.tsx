import { getLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { discountPercent, formatDiscount, formatPrice } from "@/lib/product";

// Foundation placeholder: the full home page (hero slider, flash sale, best sellers) comes in the catalogue session.
export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <div className="container mx-auto space-y-16 px-4 py-10">
      <section className="rounded-2xl bg-foreground px-6 py-12 text-background sm:px-12">
        <p className="text-sm opacity-80">{t("home.newArrival.headline")}</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-5xl">{t("home.heroTitle")}</h1>
        <p className="mt-2 text-lg opacity-90">{t("home.heroSubtitle")}</p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/products">{t("buttons.shopNow")}</Link>
        </Button>
      </section>

      <section aria-labelledby="categories-title">
        <p className="mb-1 text-sm font-semibold text-primary">{t("categories.headline")}</p>
        <h2 id="categories-title" className="mb-6 text-2xl font-bold">
          {t("categories.title")}
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map(({ slug, icon: Icon }) => (
            <li key={slug}>
              <Link
                href={`/products?category=${slug}`}
                className="flex flex-col items-center gap-3 rounded-xl border p-5 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-8" aria-hidden />
                <span className="text-sm font-medium">{t(`categories.${slug}`)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-title">
        <p className="mb-1 text-sm font-semibold text-primary">{t("home.bestSelling.headline")}</p>
        <h2 id="featured-title" className="mb-6 text-2xl font-bold">
          {t("home.bestSelling.title")}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => {
            const discount = discountPercent(product);
            return (
              <li key={product.id} className="relative rounded-xl border p-5">
                {discount > 0 && (
                  <Badge className="absolute end-3 top-3">{formatDiscount(discount, locale)}</Badge>
                )}
                <p className="text-xs text-muted-foreground">
                  {t(`categories.${product.category}`)}
                </p>
                <h3 className="mt-1 pe-14 font-semibold">{product.title[locale]}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {product.description[locale]}
                </p>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-bold text-primary">
                    {formatPrice(product.priceCents, locale)}
                  </span>
                  {product.oldPriceCents && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.oldPriceCents, locale)}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  ★ {product.rating.average} · {t("product.reviews", { count: product.rating.count })}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
