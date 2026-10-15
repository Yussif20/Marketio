"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Price } from "@/components/product/price";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categoryIcons } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import type { MenuData } from "@/lib/catalog";

/** Desktop category navigation: each category opens a panel with its sub-categories and two best sellers. */
export function MegaMenu({ menu }: { menu: MenuData }) {
  const t = useTranslations();
  const locale = useLocale();
  const Forward = localeDirection[locale] === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <NavigationMenu className="max-w-none justify-start">
      <NavigationMenuList className="justify-start gap-1">
        {menu.map(({ category, subcategories, featured }) => {
          const Icon = categoryIcons[category];
          return (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger className="h-10 bg-transparent px-3 font-medium">
                {t(`categories.${category}`)}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(60rem,calc(100vw-4rem))] grid-cols-[1fr_1.4fr] gap-6 p-6">
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Icon className="size-4 text-primary" aria-hidden />
                      {t(`categories.${category}`)}
                    </p>
                    <ul className="space-y-1">
                      {subcategories.map((sub) => (
                        <li key={sub}>
                          <NavigationMenuLink asChild>
                            <Link href={`/products?category=${category}&sub=${sub}`}>
                              {t(`subcategories.${sub}`)}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                    <NavigationMenuLink asChild className="mt-3 font-semibold text-primary">
                      <Link href={`/products?category=${category}`}>
                        {t("header.shopAll", { category: t(`categories.${category}`) })}
                        <Forward className="size-4" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <ul className="grid grid-cols-2 gap-4">
                    {featured.map((product) => (
                      <li key={product.slug}>
                        <NavigationMenuLink asChild className="flex-col items-stretch gap-2 p-0 hover:bg-transparent">
                          <Link href={`/products/${product.slug}`} className="group">
                            <span className="relative block aspect-square overflow-hidden rounded-lg bg-muted">
                              <Image
                                src={product.image}
                                alt=""
                                fill
                                sizes="240px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </span>
                            <span className="line-clamp-1 text-sm font-medium">{product.title[locale]}</span>
                            <Price priceCents={product.priceCents} oldPriceCents={product.oldPriceCents} className="text-sm" />
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
