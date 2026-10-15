"use client";

import { Zap } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { toSnapshot } from "@/lib/product-snapshot";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./add-to-cart-button";
import { QuantityInput } from "./quantity-input";
import { WishlistButton } from "./wishlist-button";

interface ProductShowcaseProps {
  product: Product;
  /** Server-rendered title, rating and price. */
  summary: React.ReactNode;
  /** Server-rendered description and delivery info. */
  details: React.ReactNode;
}

/**
 * Gallery plus purchase controls. Colour variants and gallery images share an
 * index: picking the second colour shows the second image.
 */
export function ProductShowcase({ product, summary, details }: ProductShowcaseProps) {
  const t = useTranslations("product");
  const locale = useLocale();
  const router = useRouter();
  const add = useCartStore((state) => state.add);
  const [imageIndex, setImageIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const snapshot = toSnapshot(product);
  const title = product.title[locale];
  const soldOut = product.stock <= 0;

  function selectColor(index: number) {
    setColorIndex(index);
    if (index < product.images.length) setImageIndex(index);
  }

  function buyNow() {
    add(snapshot, colorIndex, quantity);
    router.push("/cart");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex gap-3 sm:flex-col" role="group" aria-label={t("gallery")}>
          {product.images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setImageIndex(index)}
              aria-label={t("showImage", { number: index + 1 })}
              aria-pressed={index === imageIndex}
              className={cn(
                "relative size-16 overflow-hidden rounded-lg border-2 bg-muted sm:size-20",
                index === imageIndex ? "border-primary" : "border-transparent",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="relative aspect-square flex-1 overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.images[imageIndex]}
            alt={t("imageAlt", { title, number: imageIndex + 1 })}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="space-y-6">
        {summary}

        {product.colors.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium">
              {t("color")}: <span className="text-muted-foreground">{product.colors[colorIndex].name[locale]}</span>
            </legend>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => selectColor(index)}
                  aria-label={color.name[locale]}
                  aria-pressed={index === colorIndex}
                  className={cn(
                    "size-8 rounded-full border ring-offset-2 ring-offset-background transition",
                    index === colorIndex ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-muted-foreground/40",
                  )}
                  style={{ backgroundColor: color.hex }}
                />
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
            quantity={quantity}
            size="lg"
            className="flex-1 sm:flex-none"
          />
          {!soldOut && (
            <Button size="lg" variant="secondary" onClick={buyNow}>
              <Zap />
              {t("buyNow")}
            </Button>
          )}
          <WishlistButton product={snapshot} />
        </div>

        {details}
      </div>
    </div>
  );
}
