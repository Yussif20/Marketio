"use client";

import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import { navLinks } from "./nav-links";

export function MobileNav() {
  const t = useTranslations("header");
  // Open from the inline-start edge: right in Arabic, left in English.
  const side = localeDirection[useLocale()] === "rtl" ? "right" : "left";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={t("menu")}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{t("menu")}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.key}>
              <Link href={link.href} className="rounded-md px-3 py-2 text-base hover:bg-muted">
                {t(link.key)}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
