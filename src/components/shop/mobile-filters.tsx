"use client";

import { SlidersHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { localeDirection } from "@/i18n/routing";
import { activeFilterCount, type ProductQuery } from "@/lib/product-query";
import { ProductFilters } from "./product-filters";

interface MobileFiltersProps {
  query: ProductQuery;
  priceBounds: { min: number; max: number };
}

export function MobileFilters({ query, priceBounds }: MobileFiltersProps) {
  const t = useTranslations("listing");
  const side = localeDirection[useLocale()] === "rtl" ? "right" : "left";
  const count = activeFilterCount(query);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal />
          {t("filters")}
          {count > 0 && <Badge className="ms-1">{count}</Badge>}
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t("filters")}</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-6">
          <ProductFilters query={query} priceBounds={priceBounds} idPrefix="sheet" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
