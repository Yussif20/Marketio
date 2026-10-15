"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { selectCartCount, useCartStore } from "@/stores/cart";
import { useStoresHydrated } from "@/stores/hydration";
import { useWishlistStore } from "@/stores/wishlist";

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -end-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function HeaderStoreLinks() {
  const t = useTranslations("header");
  const hydrated = useStoresHydrated();
  const cartCount = useCartStore(selectCartCount);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <>
      {/* On phones the bottom tab bar already links to the wishlist. */}
      <Button variant="ghost" size="icon" className="relative hidden size-10 md:inline-flex" asChild>
        <Link href="/wishlist" aria-label={t("wishlistCount", { count: hydrated ? wishlistCount : 0 })}>
          <Heart className="size-5" />
          {hydrated && <CountBadge count={wishlistCount} />}
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="relative size-10" asChild>
        <Link href="/cart" aria-label={t("cartCount", { count: hydrated ? cartCount : 0 })}>
          <ShoppingCart className="size-5" />
          {hydrated && <CountBadge count={cartCount} />}
        </Link>
      </Button>
    </>
  );
}
