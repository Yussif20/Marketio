import type { Locale } from "@/i18n/routing";

export const CATEGORIES = [
  "phones",
  "laptops",
  "cameras",
  "monitors",
  "clothing",
  "toys",
  "accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Sub-categories per category, in display order. Labels live in messages under `subcategories.<slug>`. */
export const SUBCATEGORIES = {
  phones: ["smartphones", "tablets", "phone-gear"],
  laptops: ["ultrabooks", "gaming-laptops", "everyday-laptops"],
  cameras: ["compact-cameras", "mirrorless", "action-cameras", "kids-cameras"],
  monitors: ["office-monitors", "gaming-monitors", "creator-monitors"],
  clothing: ["tops", "outerwear", "bottoms", "footwear"],
  toys: ["building", "remote-control", "plush", "games"],
  accessories: ["audio", "watches", "bags", "eyewear"],
} as const satisfies Record<Category, readonly string[]>;

export type Subcategory = (typeof SUBCATEGORIES)[Category][number];

export const BRANDS = [
  "vela",
  "atlas",
  "lumen",
  "clarity",
  "kora",
  "playlab",
  "aurora",
  "halden",
] as const;

export type Brand = (typeof BRANDS)[number];

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

/** A second variant axis next to colour, e.g. clothing sizes or phone storage. */
export interface ProductOption {
  kind: "size" | "storage" | "memory";
  values: Array<{
    id: string;
    /** Shown as-is in both locales ("M", "256 GB"). */
    label: string;
    /** Added to the base price, in cents. */
    priceDeltaCents: number;
  }>;
}

export interface ProductSpec {
  label: LocalizedText;
  value: LocalizedText;
}

/** A sample review with an invented author, shown under the rating breakdown. */
export interface ProductReview {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO 8601 date. */
  date: string;
  body: LocalizedText;
}

export interface Product {
  /** Firestore document id; equal to the slug. */
  id: string;
  slug: string;
  brand: Brand;
  title: LocalizedText;
  description: LocalizedText;
  /** Three or four short selling points shown next to the price. */
  highlights: LocalizedText[];
  specs: ProductSpec[];
  category: Category;
  subcategory: Subcategory;
  /** Prices are integers in USD cents, the unit Stripe expects. Base price for the first option value. */
  priceCents: number;
  /** Price before discount, when the product is on sale. */
  oldPriceCents?: number;
  currency: "USD";
  stock: number;
  /** Units sold, used for the best-sellers section. */
  sold: number;
  rating: ProductRating;
  reviews: ProductReview[];
  /**
   * Paths under /public. Image i shows colour i; any extra image after the
   * colours is a detail shot. The first one is the cover image.
   */
  images: string[];
  colors: ProductColor[];
  option?: ProductOption;
  featured: boolean;
  /** Curated collections the product appears in on the home page. */
  collections: Array<"work-from-home" | "travel-light" | "gift-ideas">;
  /** ISO 8601 date, used for "newest" sorting. */
  createdAt: string;
}
