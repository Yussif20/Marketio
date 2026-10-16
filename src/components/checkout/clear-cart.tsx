"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/cart";
import { useStoresHydrated } from "@/stores/hydration";

/** Empties the cart once the stored cart has loaded (after a confirmed card payment). */
export function ClearCart() {
  const hydrated = useStoresHydrated();
  const clear = useCartStore((state) => state.clear);
  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);
  return null;
}
