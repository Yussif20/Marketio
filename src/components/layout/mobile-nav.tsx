"use client";

import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categoryIcons } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import type { MenuData } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";
import { navLinks, pageLinks } from "./nav-links";
import { ThemeSwitcher } from "./theme-switcher";

export function MobileNav({ menu }: { menu: MenuData }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  // Open from the inline-start edge: right in Arabic, left in English.
  const side = localeDirection[useLocale()] === "rtl" ? "right" : "left";
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("header.menu")}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-[85%] max-w-sm gap-0 overflow-y-auto p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle asChild>
            <div onClick={close}>
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>

        <nav className="p-2">
          <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t("header.categories")}
          </p>
          <Accordion type="single" collapsible>
            {menu.map(({ category, subcategories }) => {
              const Icon = categoryIcons[category];
              return (
                <AccordionItem key={category} value={category} className="border-0">
                  <AccordionTrigger className="rounded-md px-3 py-2.5 text-base hover:bg-muted hover:no-underline">
                    <span className="flex items-center gap-3">
                      <Icon className="size-5 text-muted-foreground" aria-hidden />
                      {t(`categories.${category}`)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1">
                    <ul className="ms-11 border-s">
                      {subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            href={`/products?category=${category}&sub=${sub}`}
                            onClick={close}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {t(`subcategories.${sub}`)}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={`/categories/${category}`}
                          onClick={close}
                          className="block px-3 py-2 text-sm font-semibold text-primary"
                        >
                          {t("header.shopAll", { category: t(`categories.${category}`) })}
                        </Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <Separator className="my-2" />

          {[...navLinks, ...pageLinks].map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={close}
              className={cn(
                "block rounded-md px-3 py-2.5 text-base hover:bg-muted",
                "highlight" in link && link.highlight && "font-semibold text-primary",
              )}
            >
              {t(`header.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t p-4">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
