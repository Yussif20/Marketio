import type { Locale } from "@/i18n/routing";
import type { Product, RatingBreakdown } from "@/types/product";

export function ratingFromBreakdown(breakdown: RatingBreakdown) {
  const { five, four, three, two, one } = breakdown;
  const count = five + four + three + two + one;
  const total = five * 5 + four * 4 + three * 3 + two * 2 + one;
  const average = count === 0 ? 0 : Math.round((total / count) * 10) / 10;
  return { average, count, breakdown };
}

/** Discount as a whole percentage, or 0 when the product isn't on sale. */
export function discountPercent(product: Pick<Product, "priceCents" | "oldPriceCents">) {
  const { priceCents, oldPriceCents } = product;
  if (!oldPriceCents || oldPriceCents <= priceCents) return 0;
  return Math.round(((oldPriceCents - priceCents) / oldPriceCents) * 100);
}

// Latin digits in both locales, matching how most Arabic stores show prices and ratings.
const numberLocale = (locale: Locale) => (locale === "ar" ? "ar-u-nu-latn" : "en-US");

/**
 * "$35.00" in both locales. Arabic number formatting writes "US$", whose
 * letters get reordered by the bidi algorithm inside RTL text ("$US 35.00").
 */
export function formatPrice(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
}

/**
 * A price for use inside a translated sentence. The Unicode isolate marks keep
 * "$100.00" in one piece in Arabic text, where it would otherwise show as "100.00$".
 */
export function formatPriceInline(cents: number) {
  return `\u2066${formatPrice(cents)}\u2069`;
}

/** Discount badge text, e.g. "-25%". */
export function formatDiscount(percent: number, locale: Locale) {
  return new Intl.NumberFormat(numberLocale(locale), { style: "percent" }).format(-percent / 100);
}
