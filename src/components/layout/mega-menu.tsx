import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Price } from "@/components/product/price";
import { categoryIcons } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { localeDirection, type Locale } from "@/i18n/routing";
import type { MenuData } from "@/lib/catalog";

/**
 * Desktop category navigation: each category opens a panel with its sub-categories
 * and two best sellers. Pure CSS (hover and keyboard focus), so it ships no JavaScript.
 * The panels are positioned against the header's nav bar, which is `relative`.
 */
export async function MegaMenu({ menu }: { menu: MenuData }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const Forward = localeDirection[locale] === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <ul className="flex items-center gap-1">
      {menu.map(({ category, subcategories, featured }) => {
        const Icon = categoryIcons[category];
        const name = t(`categories.${category}`);
        return (
          <li key={category} className="group">
            <Link
              href={`/categories/${category}`}
              className="flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors group-focus-within:bg-muted group-hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {name}
              <ChevronDown className="size-3.5 opacity-60 transition-transform group-hover:rotate-180" aria-hidden />
            </Link>
            <div className="invisible absolute inset-x-0 top-full z-50 pt-1 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="mx-auto grid w-[min(60rem,calc(100vw-4rem))] grid-cols-[1fr_1.4fr] gap-6 rounded-xl border bg-popover p-6 text-popover-foreground shadow-lg">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <Icon className="size-4 text-primary" aria-hidden />
                    {name}
                  </p>
                  <ul className="space-y-1">
                    {subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`/products?category=${category}&sub=${sub}`}
                          className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                        >
                          {t(`subcategories.${sub}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/categories/${category}`}
                    className="mt-3 flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-semibold text-primary hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  >
                    {t("header.shopAll", { category: name })}
                    <Forward className="size-4" aria-hidden />
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-4">
                  {featured.map((product) => (
                    <li key={product.slug}>
                      <Link href={`/products/${product.slug}`} className="group/card flex flex-col gap-2 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
                        <span className="relative block aspect-square overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="240px"
                            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                          />
                        </span>
                        <span className="line-clamp-1 text-sm font-medium">{product.title[locale]}</span>
                        <Price priceCents={product.priceCents} oldPriceCents={product.oldPriceCents} className="text-sm" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
