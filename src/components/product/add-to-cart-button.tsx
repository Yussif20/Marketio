"use client";

import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import type { ProductSnapshot } from "@/lib/product-snapshot";
import { useCartStore } from "@/stores/cart";

interface AddToCartButtonProps {
  product: ProductSnapshot;
  colorIndex?: number;
  optionId?: string;
  quantity?: number;
  size?: "sm" | "lg";
  className?: string;
}

export function AddToCartButton({
  product,
  colorIndex = 0,
  optionId,
  quantity = 1,
  size = "sm",
  className,
}: AddToCartButtonProps) {
  const t = useTranslations("product");
  const add = useCartStore((state) => state.add);
  const router = useRouter();
  const soldOut = product.stock <= 0;

  function onClick() {
    add(product, { colorIndex, optionId, quantity });
    toast.success(t("addedToCart"), {
      action: { label: t("viewCart"), onClick: () => router.push("/cart") },
    });
  }

  return (
    <Button size={size} onClick={onClick} disabled={soldOut} className={className}>
      <ShoppingCart />
      {soldOut ? t("outOfStock") : t("addToCart")}
    </Button>
  );
}
