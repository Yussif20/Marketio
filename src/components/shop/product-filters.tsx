"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { activeFilterCount, DEFAULT_QUERY, RATING_OPTIONS, type ProductQuery } from "@/lib/product-query";
import { cn } from "@/lib/utils";
import { brands } from "@/data/categories";
import { CATEGORIES, SUBCATEGORIES, type Brand, type Category, type Subcategory } from "@/types/product";
import { useQueryNavigation } from "./use-query-navigation";

interface ProductFiltersProps {
  query: ProductQuery;
  priceBounds: { min: number; max: number };
  /** Distinguishes the sidebar and the mobile sheet copies so input ids stay unique. */
  idPrefix: string;
}

export function ProductFilters({ query, priceBounds, idPrefix }: ProductFiltersProps) {
  const t = useTranslations("listing");
  const categoryLabel = useTranslations("categories");
  const subLabel = useTranslations("subcategories");
  const { update, pending } = useQueryNavigation(query);
  const id = (name: string) => `${idPrefix}-${name}`;

  function toggleCategory(category: Category, checked: boolean) {
    const categories = checked
      ? [...query.categories, category]
      : query.categories.filter((c) => c !== category);
    // Unticking a category also drops its sub-categories.
    const subcategories = checked
      ? query.subcategories
      : query.subcategories.filter((sub) => !(SUBCATEGORIES[category] as readonly string[]).includes(sub));
    update({ categories: CATEGORIES.filter((c) => categories.includes(c)), subcategories });
  }

  function toggleSub(sub: Subcategory, checked: boolean) {
    update({
      subcategories: checked ? [...query.subcategories, sub] : query.subcategories.filter((s) => s !== sub),
    });
  }

  function toggleBrand(brand: Brand, checked: boolean) {
    update({ brands: checked ? [...query.brands, brand] : query.brands.filter((b) => b !== brand) });
  }

  function applyPrice(form: HTMLFormElement) {
    const data = new FormData(form);
    const read = (name: string) => {
      const value = String(data.get(name) ?? "").trim();
      return value === "" || Number.isNaN(Number(value)) ? undefined : Math.max(0, Number(value));
    };
    let minPrice = read("min");
    let maxPrice = read("max");
    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
      [minPrice, maxPrice] = [maxPrice, minPrice];
    }
    update({ minPrice, maxPrice });
  }

  return (
    <div className={cn("space-y-6 transition-opacity", pending && "opacity-60")} aria-busy={pending}>
      <fieldset>
        <legend className="mb-3 font-semibold">{t("category")}</legend>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={id(category)}
                  checked={query.categories.includes(category)}
                  onCheckedChange={(checked) => toggleCategory(category, checked === true)}
                />
                <Label htmlFor={id(category)} className="font-normal">
                  {categoryLabel(category)}
                </Label>
              </div>
              {(query.categories.includes(category) ||
                SUBCATEGORIES[category].some((sub) => query.subcategories.includes(sub))) && (
                <div className="ms-6 mt-2 space-y-2 border-s ps-3">
                  {SUBCATEGORIES[category].map((sub) => (
                    <div key={sub} className="flex items-center gap-2">
                      <Checkbox
                        id={id(sub)}
                        checked={query.subcategories.includes(sub)}
                        onCheckedChange={(checked) => toggleSub(sub, checked === true)}
                      />
                      <Label htmlFor={id(sub)} className="text-muted-foreground font-normal">
                        {subLabel(sub)}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="mb-3 font-semibold">{t("brand")}</legend>
        <div className="grid grid-cols-2 gap-3">
          {brands.map((brand) => (
            <div key={brand.slug} className="flex items-center gap-2">
              <Checkbox
                id={id(`brand-${brand.slug}`)}
                checked={query.brands.includes(brand.slug)}
                onCheckedChange={(checked) => toggleBrand(brand.slug, checked === true)}
              />
              <Label htmlFor={id(`brand-${brand.slug}`)} className="font-normal" dir="ltr">
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <Separator />

      <form
        // Remount when the URL changes so the inputs show the applied values.
        key={`${query.minPrice}-${query.maxPrice}`}
        onSubmit={(event) => {
          event.preventDefault();
          applyPrice(event.currentTarget);
        }}
      >
        <fieldset>
          <legend className="mb-3 font-semibold">{t("price")}</legend>
          <div className="flex items-center gap-2">
            <Label htmlFor={id("min")} className="sr-only">{t("min")}</Label>
            <Input
              id={id("min")}
              name="min"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={`${t("min")} ${priceBounds.min}`}
              defaultValue={query.minPrice}
            />
            <span aria-hidden>–</span>
            <Label htmlFor={id("max")} className="sr-only">{t("max")}</Label>
            <Input
              id={id("max")}
              name="max"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={`${t("max")} ${priceBounds.max}`}
              defaultValue={query.maxPrice}
            />
          </div>
          <Button type="submit" variant="secondary" size="sm" className="mt-3 w-full">
            {t("apply")}
          </Button>
        </fieldset>
      </form>

      <Separator />

      <fieldset>
        <legend className="mb-3 font-semibold">{t("rating")}</legend>
        <RadioGroup
          value={query.minRating ? String(query.minRating) : "any"}
          onValueChange={(value) => update({ minRating: value === "any" ? undefined : Number(value) })}
        >
          {RATING_OPTIONS.map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <RadioGroupItem value={String(rating)} id={id(`rating-${rating}`)} />
              <Label htmlFor={id(`rating-${rating}`)} className="font-normal">
                <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                {t("andUp", { rating })}
              </Label>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <RadioGroupItem value="any" id={id("rating-any")} />
            <Label htmlFor={id("rating-any")} className="font-normal">
              {t("anyRating")}
            </Label>
          </div>
        </RadioGroup>
      </fieldset>

      <Separator />

      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id("stock")} className="font-semibold">
          {t("inStockOnly")}
        </Label>
        <Switch
          id={id("stock")}
          checked={query.inStock}
          onCheckedChange={(inStock) => update({ inStock })}
        />
      </div>

      {activeFilterCount(query) > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => update({ ...DEFAULT_QUERY, q: query.q, sort: query.sort })}
        >
          {t("clearFilters")}
        </Button>
      )}
    </div>
  );
}
