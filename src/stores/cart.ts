import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ProductSnapshot } from "@/lib/product-snapshot";

export interface CartItem {
  /** `${productId}:${colorIndex}` — the same product in two colours is two lines. */
  key: string;
  product: ProductSnapshot;
  colorIndex: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: ProductSnapshot, colorIndex?: number, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const clampQuantity = (quantity: number, stock: number) =>
  Math.max(1, Math.min(Math.floor(quantity), Math.max(stock, 1)));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, colorIndex = 0, quantity = 1) =>
        set((state) => {
          const key = `${product.id}:${colorIndex}`;
          const existing = state.items.find((item) => item.key === key);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? { ...item, product, quantity: clampQuantity(item.quantity + quantity, product.stock) }
                  : item,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { key, product, colorIndex, quantity: clampQuantity(quantity, product.stock) },
            ],
          };
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, quantity: clampQuantity(quantity, item.product.stock) } : item,
          ),
        })),
      remove: (key) => set((state) => ({ items: state.items.filter((item) => item.key !== key) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "marketio-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Rehydrated by <StoreHydration /> after mount, so server and first client render match.
      skipHydration: true,
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0);
