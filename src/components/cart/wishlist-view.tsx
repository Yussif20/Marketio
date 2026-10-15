"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Price } from "@/components/product/price";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import type { ProductSnapshot } from "@/lib/product-snapshot";
import { useCartStore } from "@/stores/cart";
import { useStoresHydrated } from "@/stores/hydration";
import { useWishlistStore } from "@/stores/wishlist";

export function WishlistView() {
  const t = useTranslations("wishlist");
  const product = useTranslations("product");
  const buttons = useTranslations("buttons");
  const locale = useLocale();
  const hydrated = useStoresHydrated();
  const { items, remove } = useWishlistStore();
  const addToCart = useCartStore((state) => state.add);
  const available = items.filter((item) => item.stock > 0);

  function moveToCart(item: ProductSnapshot) {
    addToCart(item);
    remove(item.id);
  }

  function moveAll() {
    available.forEach(moveToCart);
    toast.success(t("movedAll", { count: available.length }));
  }

  if (!hydrated) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" aria-busy>
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="aspect-[3/4]" />)}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed px-6 py-16 text-center">
        <Heart className="size-12 text-muted-foreground" aria-hidden />
        <p className="mt-4 text-lg font-medium">{t("empty")}</p>
        <Button asChild className="mt-6">
          <Link href="/products">{buttons("continueShopping")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">{t("count", { count: items.length })}</p>
        {available.length > 0 && (
          <Button variant="outline" onClick={moveAll}>
            <ShoppingCart />
            {buttons("moveAllToBag")}
          </Button>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item) => {
          const title = item.title[locale];
          return (
            <li key={item.id} className="flex flex-col overflow-hidden rounded-xl border">
              <Link href={`/products/${item.slug}`} className="relative aspect-square bg-muted">
                <Image src={item.images[0]} alt={title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <Link href={`/products/${item.slug}`} className="line-clamp-2 text-sm font-semibold hover:underline">
                  {title}
                </Link>
                <Price priceCents={item.priceCents} oldPriceCents={item.oldPriceCents} />
                <div className="mt-auto flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => moveToCart(item)} disabled={item.stock <= 0}>
                    <ShoppingCart />
                    {item.stock > 0 ? t("moveToCart") : product("outOfStock")}
                  </Button>
                  <Button size="icon-sm" variant="outline" onClick={() => remove(item.id)} aria-label={t("remove", { title })}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
