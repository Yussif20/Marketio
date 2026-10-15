import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ProductSnapshot } from "@/lib/product-snapshot";

interface WishlistState {
  items: ProductSnapshot[];
  toggle: (product: ProductSnapshot) => boolean;
  remove: (id: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      /** Returns true when the product was added, false when it was removed. */
      toggle: (product) => {
        const exists = get().items.some((item) => item.id === product.id);
        set((state) => ({
          items: exists
            ? state.items.filter((item) => item.id !== product.id)
            : [...state.items, product],
        }));
        return !exists;
      },
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "marketio-wishlist",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
