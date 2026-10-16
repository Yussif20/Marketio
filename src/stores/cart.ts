import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { unitPriceCents, type ProductSnapshot } from "@/lib/product-snapshot";

export interface CartItem {
  /** `${productId}:${colorIndex}:${optionId}` — each colour and size/storage combination is its own line. */
  key: string;
  product: ProductSnapshot;
  colorIndex: number;
  /** Chosen value of `product.option` (size, storage…), when the product has one. */
  optionId?: string;
  quantity: number;
}

export interface AddToCartInput {
  colorIndex?: number;
  optionId?: string;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  add: (product: ProductSnapshot, input?: AddToCartInput) => void;
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
      add: (product, { colorIndex = 0, optionId = product.option?.values[0]?.id, quantity = 1 } = {}) =>
        set((state) => {
          const key = `${product.id}:${colorIndex}:${optionId ?? ""}`;
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
              { key, product, colorIndex, optionId, quantity: clampQuantity(quantity, product.stock) },
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
  state.items.reduce((sum, item) => sum + unitPriceCents(item.product, item.optionId) * item.quantity, 0);
