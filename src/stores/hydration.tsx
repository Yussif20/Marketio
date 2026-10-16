"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useCartStore } from "./cart";
import { useWishlistStore } from "./wishlist";

const stores = [useCartStore, useWishlistStore];

/** Loads the persisted cart and wishlist once the app has mounted. */
export function StoreHydration() {
  useEffect(() => {
    for (const store of stores) void store.persist.rehydrate();
  }, []);
  return null;
}

/** False on the server and until localStorage has been read, so counts don't flash wrong values. */
export function useStoresHydrated() {
  return useSyncExternalStore(
    (onChange) => {
      const unsubscribers = stores.map((store) => store.persist.onFinishHydration(onChange));
      return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
    },
    () => stores.every((store) => store.persist.hasHydrated()),
    () => false,
  );
}
