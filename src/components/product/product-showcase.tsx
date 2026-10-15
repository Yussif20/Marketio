"use client";

import { Check, Zap } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { discountPercent, formatDiscount, formatPrice } from "@/lib/product";
import { toSnapshot, unitPriceCents } from "@/lib/product-snapshot";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./add-to-cart-button";
import { Price } from "./price";
import { QuantityInput } from "./quantity-input";
import { WishlistButton } from "./wishlist-button";

interface ProductShowcaseProps {
  product: Product;
  /** Server-rendered brand, title and rating. */
  summary: React.ReactNode;
  /** Server-rendered delivery and returns info. */
  details: React.ReactNode;
}

/**
 * Gallery plus purchase controls. Colour variants and gallery images share an
 * index: picking the second colour shows the second image. The size/storage
 * option changes the price, so the price lives here rather than in `summary`.
 */
export function ProductShowcase({ product, summary, details }: ProductShowcaseProps) {
  const t = useTranslations("product");
  const optionLabel = useTranslations("options");
  const locale = useLocale();
  const router = useRouter();
  const add = useCartStore((state) => state.add);
  const [imageIndex, setImageIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [optionId, setOptionId] = useState(product.option?.values[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const snapshot = toSnapshot(product);
  const title = product.title[locale];
  const soldOut = product.stock <= 0;

  const price = unitPriceCents(product, optionId);
  const oldPrice = product.oldPriceCents ? product.oldPriceCents + (price - product.priceCents) : undefined;
  const discount = discountPercent({ priceCents: price, oldPriceCents: oldPrice });

  function selectColor(index: number) {
    setColorIndex(index);
    if (index < product.images.length) setImageIndex(index);
  }

  function buyNow() {
    add(snapshot, { colorIndex, optionId, quantity });
    router.push("/cart");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <div className="flex flex-col-reverse gap-3 sm:flex-row lg:sticky lg:top-36 lg:self-start">
        <div className="flex gap-3 overflow-x-auto sm:flex-col" role="group" aria-label={t("gallery")}>
          {product.images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setImageIndex(index)}
              aria-label={t("showImage", { number: index + 1 })}
              aria-pressed={index === imageIndex}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted sm:size-20",
                index === imageIndex ? "border-primary" : "border-transparent hover:border-border",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.images[imageIndex]}
            alt={t("imageAlt", { title, number: imageIndex + 1 })}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          {discount > 0 && (
            <Badge className="absolute start-4 top-4 text-sm">{formatDiscount(discount, locale)}</Badge>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {summary}

        <div className="flex flex-wrap items-center gap-3">
          <Price priceCents={price} oldPriceCents={oldPrice} size="lg" />
          {discount > 0 && oldPrice && (
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {t("youSave", { amount: formatPrice(oldPrice - price) })}
            </span>
          )}
        </div>

        <ul className="space-y-2">
          {product.highlights.map((highlight) => (
            <li key={highlight.en} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {highlight[locale]}
            </li>
          ))}
        </ul>

        {product.colors.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium">
              {t("color")}: <span className="text-muted-foreground">{product.colors[colorIndex].name[locale]}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => selectColor(index)}
                  aria-label={color.name[locale]}
                  aria-pressed={index === colorIndex}
                  className={cn(
                    "size-9 rounded-full border ring-offset-2 ring-offset-background transition",
                    index === colorIndex ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-muted-foreground/40",
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </fieldset>
        )}

        {product.option && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium">{optionLabel(product.option.kind)}</legend>
            <div className="flex flex-wrap gap-2">
              {product.option.values.map((value) => (
                <button
                  key={value.id}
                  type="button"
                  onClick={() => setOptionId(value.id)}
                  aria-pressed={value.id === optionId}
                  className={cn(
                    "min-w-14 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                    value.id === optionId
                      ? "border-primary bg-primary/5 text-primary"
                      : "hover:border-foreground/40",
                  )}
                >
                  <span dir="ltr">{value.label}</span>
                  {value.priceDeltaCents > 0 && (
                    <span className="ms-1.5 text-xs text-muted-foreground" dir="ltr">
                      +{formatPrice(value.priceDeltaCents)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {!soldOut && (
            <QuantityInput value={quantity} max={product.stock} onChange={setQuantity} label={t("quantity")} />
          )}
          <AddToCartButton
            product={snapshot}
            colorIndex={colorIndex}
            optionId={optionId}
            quantity={quantity}
            size="lg"
            className="h-11 flex-1 px-6 sm:flex-none"
          />
          {!soldOut && (
            <Button size="lg" variant="secondary" className="h-11 px-5" onClick={buyNow}>
              <Zap />
              {t("buyNow")}
            </Button>
          )}
          <WishlistButton product={snapshot} className="size-11" />
        </div>

        {details}
      </div>
    </div>
  );
}
