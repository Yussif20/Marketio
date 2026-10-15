import type { LocalizedText, Product, ProductColor } from "@/types/product";

/**
 * The slice of a product the cart and wishlist keep in localStorage, so those
 * pages render without refetching the catalogue. Checkout re-reads real prices
 * on the server, so a stale snapshot can't change what the customer pays.
 */
export interface ProductSnapshot {
  id: string;
  slug: string;
  title: LocalizedText;
  priceCents: number;
  oldPriceCents?: number;
  /** Same order as `colors`, so `images[colorIndex]` shows the chosen variant. */
  images: string[];
  stock: number;
  colors: ProductColor[];
}

export function toSnapshot(product: Product): ProductSnapshot {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    priceCents: product.priceCents,
    oldPriceCents: product.oldPriceCents,
    images: product.images,
    stock: product.stock,
    colors: product.colors,
  };
}

/** Shipping is free from this subtotal, matching the copy in the services strip. */
export const FREE_SHIPPING_FROM_CENTS = 14_000;
export const SHIPPING_CENTS = 999;

export function shippingFor(subtotalCents: number) {
  return subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_FROM_CENTS ? 0 : SHIPPING_CENTS;
}
