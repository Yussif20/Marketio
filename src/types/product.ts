import type { Locale } from "@/i18n/routing";

export const CATEGORIES = [
  "cameras",
  "phones",
  "laptops",
  "clothing",
  "monitors",
  "toys",
  "accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** A string translated into every supported locale. */
export type LocalizedText = Record<Locale, string>;

/** Number of reviews per star value. */
export interface RatingBreakdown {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

export interface ProductRating {
  /** Rounded to one decimal, 0 when there are no reviews. */
  average: number;
  count: number;
  breakdown: RatingBreakdown;
}

export interface ProductColor {
  name: LocalizedText;
  /** CSS colour used for the swatch. */
  hex: string;
}

export interface Product {
  /** Firestore document id; equal to the slug. */
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: Category;
  /** Prices are integers in USD cents, the unit Stripe expects. */
  priceCents: number;
  /** Price before discount, when the product is on sale. */
  oldPriceCents?: number;
  currency: "USD";
  stock: number;
  /** Units sold, used for the best-sellers section. */
  sold: number;
  rating: ProductRating;
  /** Paths under /public or absolute URLs; the first one is the cover image. */
  images: string[];
  colors: ProductColor[];
  featured: boolean;
  /** ISO 8601 date, used for "newest" sorting. */
  createdAt: string;
}
