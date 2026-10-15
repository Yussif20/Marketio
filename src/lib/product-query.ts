import {
  BRANDS,
  CATEGORIES,
  SUBCATEGORIES,
  type Brand,
  type Category,
  type Subcategory,
} from "@/types/product";

/**
 * Listing filters as they appear in the /products URL. Shared by the server
 * (to filter) and the filter UI (to build links), so both agree on the format.
 */

export const SORTS = ["new", "price-asc", "price-desc", "rating", "discount"] as const;
export type Sort = (typeof SORTS)[number];

export const RATING_OPTIONS = [4, 3, 2] as const;
export const PAGE_SIZE = 12;

export interface ProductQuery {
  q: string;
  categories: Category[];
  subcategories: Subcategory[];
  brands: Brand[];
  /** Whole dollars, inclusive. */
  minPrice?: number;
  maxPrice?: number;
  /** Minimum average rating. */
  minRating?: number;
  inStock: boolean;
  sort: Sort;
  page: number;
}

export const DEFAULT_QUERY: ProductQuery = {
  q: "",
  categories: [],
  subcategories: [],
  brands: [],
  inStock: false,
  sort: "new",
  page: 1,
};

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

function positiveNumber(value: string | undefined) {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

const ALL_SUBCATEGORIES = Object.values(SUBCATEGORIES).flat() as readonly Subcategory[];

/** Reads a comma-separated list param, keeping only known values in their canonical order. */
function list<T extends string>(value: string | undefined, allowed: readonly T[]): T[] {
  const picked = new Set((value ?? "").split(","));
  return allowed.filter((item) => picked.has(item));
}

export function parseProductQuery(params: RawParams): ProductQuery {
  const categories = list(first(params.category), CATEGORIES);
  const subcategories = list(first(params.sub), ALL_SUBCATEGORIES);
  const brands = list(first(params.brand), BRANDS);
  const sort = first(params.sort);
  const minRating = positiveNumber(first(params.rating));
  const page = Math.floor(positiveNumber(first(params.page)) ?? 1);

  return {
    q: (first(params.q) ?? "").trim().slice(0, 100),
    categories,
    subcategories,
    brands,
    minPrice: positiveNumber(first(params.min)),
    maxPrice: positiveNumber(first(params.max)),
    minRating: minRating && minRating <= 5 ? minRating : undefined,
    inStock: first(params.stock) === "1",
    sort: (SORTS as readonly string[]).includes(sort ?? "") ? (sort as Sort) : "new",
    page: Math.max(page, 1),
  };
}

/** Serialises a query back to URL params, leaving out defaults so links stay short. */
export function toSearchParams(query: ProductQuery) {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.categories.length) params.set("category", query.categories.join(","));
  if (query.subcategories.length) params.set("sub", query.subcategories.join(","));
  if (query.brands.length) params.set("brand", query.brands.join(","));
  if (query.minPrice !== undefined) params.set("min", String(query.minPrice));
  if (query.maxPrice !== undefined) params.set("max", String(query.maxPrice));
  if (query.minRating !== undefined) params.set("rating", String(query.minRating));
  if (query.inStock) params.set("stock", "1");
  if (query.sort !== DEFAULT_QUERY.sort) params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  return params;
}

export function productsHref(query: ProductQuery) {
  const search = toSearchParams(query).toString();
  return search ? `/products?${search}` : "/products";
}

/** Number of filters applied, not counting search text, sort or page. */
export function activeFilterCount(query: ProductQuery) {
  return (
    query.categories.length +
    query.subcategories.length +
    query.brands.length +
    (query.minPrice !== undefined || query.maxPrice !== undefined ? 1 : 0) +
    (query.minRating !== undefined ? 1 : 0) +
    (query.inStock ? 1 : 0)
  );
}
