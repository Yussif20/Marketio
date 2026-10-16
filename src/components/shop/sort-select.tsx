"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORTS, type ProductQuery, type Sort } from "@/lib/product-query";
import { useQueryNavigation } from "./use-query-navigation";

export function SortSelect({ query }: { query: ProductQuery }) {
  const t = useTranslations("listing");
  const { update } = useQueryNavigation(query);

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort" className="shrink-0 text-muted-foreground">
        {t("sortBy")}
      </Label>
      <Select value={query.sort} onValueChange={(sort) => update({ sort: sort as Sort })}>
        <SelectTrigger id="sort" className="min-w-40">
          <SelectValue>{t(`sort.${query.sort}`)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SORTS.map((sort) => (
            <SelectItem key={sort} value={sort}>
              {t(`sort.${sort}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
