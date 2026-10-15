import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { products as demoProducts } from "@/data/products";
import { discountPercent } from "@/lib/product";
import { PAGE_SIZE, type ProductQuery } from "@/lib/product-query";
import type { Product } from "@/types/product";

/**
 * The only place pages read products from. It serves the local demo catalogue
 * today; switching to Firestore means changing `getAllProducts` alone.
 * Results are cached for an hour and tagged "products" so an admin edit can
 * call revalidateTag("products").
 */
export async function getAllProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  return demoProducts;
}

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductSlugs() {
  const products = await getAllProducts();
  return products.map((product) => product.slug);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const products = await getAllProducts();
  const others = products.filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => p.category === product.category);
  // Top up with best sellers from other categories when the category is small.
  const fillers = others
    .filter((p) => p.category !== product.category)
    .sort((a, b) => b.sold - a.sold);
  return [...sameCategory, ...fillers].slice(0, limit);
}

const byNewest = (a: Product, b: Product) => b.createdAt.localeCompare(a.createdAt);

export async function getHomeSections() {
  const products = await getAllProducts();
  const inStock = products.filter((p) => p.stock > 0);

  return {
    flashSale: inStock
      .filter((p) => discountPercent(p) > 0)
      .sort((a, b) => discountPercent(b) - discountPercent(a))
      .slice(0, 8),
    bestSellers: [...products].sort((a, b) => b.sold - a.sold).slice(0, 4),
    newArrivals: [...products].sort(byNewest).slice(0, 8),
    featured: products.filter((p) => p.featured),
  };
}

/** Lower-cases and folds Arabic letter variants and diacritics so search is forgiving. */
function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

const sorters: Record<ProductQuery["sort"], (a: Product, b: Product) => number> = {
  new: byNewest,
  "price-asc": (a, b) => a.priceCents - b.priceCents,
  "price-desc": (a, b) => b.priceCents - a.priceCents,
  rating: (a, b) => b.rating.average - a.rating.average || b.rating.count - a.rating.count,
  discount: (a, b) => discountPercent(b) - discountPercent(a),
};

export async function searchProducts(query: ProductQuery) {
  const products = await getAllProducts();
  const terms = normalize(query.q).split(/\s+/).filter(Boolean);

  const matches = products.filter((product) => {
    if (query.categories.length && !query.categories.includes(product.category)) return false;
    if (query.minPrice !== undefined && product.priceCents < query.minPrice * 100) return false;
    if (query.maxPrice !== undefined && product.priceCents > query.maxPrice * 100) return false;
    if (query.minRating !== undefined && product.rating.average < query.minRating) return false;
    if (query.inStock && product.stock <= 0) return false;
    if (terms.length) {
      const haystack = normalize(
        [product.title.ar, product.title.en, product.description.ar, product.description.en].join(" "),
      );
      if (!terms.every((term) => haystack.includes(term))) return false;
    }
    return true;
  });

  matches.sort(sorters[query.sort]);

  const total = matches.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(query.page, pageCount);
  const items = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return { items, total, page, pageCount };
}

/** Cheapest and dearest price in whole dollars, for the price filter placeholders. */
export async function getPriceBounds() {
  const prices = (await getAllProducts()).map((p) => p.priceCents / 100);
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
}
