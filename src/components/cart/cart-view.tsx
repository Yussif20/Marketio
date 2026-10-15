"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { QuantityInput } from "@/components/product/quantity-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/product";
import { FREE_SHIPPING_FROM_CENTS, shippingFor } from "@/lib/product-snapshot";
import { selectCartSubtotal, useCartStore } from "@/stores/cart";
import { useStoresHydrated } from "@/stores/hydration";

export function CartView() {
  const t = useTranslations("cart");
  const buttons = useTranslations("buttons");
  const locale = useLocale();
  const hydrated = useStoresHydrated();
  const { items, setQuantity, remove, clear } = useCartStore();
  const subtotal = useCartStore(selectCartSubtotal);
  const shipping = shippingFor(subtotal);
  const price = (cents: number) => formatPrice(cents);

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]" aria-busy>
        <div className="space-y-4">
          {[0, 1].map((i) => <Skeleton key={i} className="h-28" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed px-6 py-16 text-center">
        <ShoppingBag className="size-12 text-muted-foreground" aria-hidden />
        <p className="mt-4 text-lg font-medium">{t("empty")}</p>
        <Button asChild className="mt-6">
          <Link href="/products">{buttons("continueShopping")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
      <div>
        <ul className="divide-y rounded-xl border">
          {items.map((item) => {
            const title = item.product.title[locale];
            const color = item.product.colors[item.colorIndex];
            return (
              <li key={item.key} className="flex gap-4 p-4">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24"
                >
                  <Image src={item.product.images[item.colorIndex] ?? item.product.images[0]} alt={title} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex-1">
                    <Link href={`/products/${item.product.slug}`} className="font-medium hover:underline">
                      {title}
                    </Link>
                    {color && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <span className="size-3 rounded-full border" style={{ backgroundColor: color.hex }} aria-hidden />
                        {color.name[locale]}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">{price(item.product.priceCents)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <QuantityInput
                      value={item.quantity}
                      max={item.product.stock}
                      onChange={(quantity) => setQuantity(item.key, quantity)}
                      label={t("quantityFor", { title })}
                    />
                    <p className="min-w-20 text-end font-semibold tabular-nums">
                      {price(item.product.priceCents * item.quantity)}
                    </p>
                    <Button variant="ghost" size="icon" onClick={() => remove(item.key)} aria-label={t("remove", { title })}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex flex-wrap justify-between gap-3">
          <Button variant="outline" asChild>
            <Link href="/products">{buttons("continueShopping")}</Link>
          </Button>
          <Button variant="ghost" onClick={clear}>
            {t("clear")}
          </Button>
        </div>
      </div>

      <aside className="space-y-4 rounded-xl border p-6 lg:sticky lg:top-32" aria-labelledby="cart-total-title">
        <h2 id="cart-total-title" className="text-lg font-semibold">{t("cartTotal")}</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt>{t("subtotal")}</dt>
            <dd className="tabular-nums">{price(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t("shipping")}</dt>
            <dd className="tabular-nums">{shipping === 0 ? t("free") : price(shipping)}</dd>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-muted-foreground">
              {t("freeShippingHint", { amount: price(FREE_SHIPPING_FROM_CENTS - subtotal) })}
            </p>
          )}
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <dt>{t("total")}</dt>
            <dd className="tabular-nums">{price(subtotal + shipping)}</dd>
          </div>
        </dl>
        <Button size="lg" className="w-full" asChild>
          <Link href="/checkout">{buttons("proceedToCheckout")}</Link>
        </Button>
      </aside>
    </div>
  );
}
