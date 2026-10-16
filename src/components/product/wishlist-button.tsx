"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import type { ProductSnapshot } from "@/lib/product-snapshot";
import { cn } from "@/lib/utils";
import { useStoresHydrated } from "@/stores/hydration";
import { useWishlistStore } from "@/stores/wishlist";

interface WishlistButtonProps {
  product: ProductSnapshot;
  variant?: "icon" | "full";
  className?: string;
}

export function WishlistButton({ product, variant = "icon", className }: WishlistButtonProps) {
  const t = useTranslations("product");
  const hydrated = useStoresHydrated();
  const saved = useWishlistStore((state) => state.items.some((item) => item.id === product.id));
  const toggle = useWishlistStore((state) => state.toggle);
  const active = hydrated && saved;
  const label = active ? t("removeFromWishlist") : t("addToWishlist");

  function onClick() {
    const added = toggle(product);
    toast.success(added ? t("addedToWishlist") : t("removedFromWishlist"));
  }

  const icon = <Heart className={cn(active && "fill-primary text-primary")} />;

  if (variant === "full") {
    return (
      <Button variant="outline" size="lg" onClick={onClick} aria-pressed={active} className={className}>
        {icon}
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn("rounded-full bg-background/90 shadow-sm", className)}
    >
      {icon}
    </Button>
  );
}
