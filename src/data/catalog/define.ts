import { ratingFromBreakdown } from "@/lib/product";
import {
  SUBCATEGORIES,
  type Brand,
  type Category,
  type LocalizedText,
  type Product,
  type ProductColor,
  type ProductOption,
  type ProductReview,
  type Subcategory,
} from "@/types/product";
import { reviewPool, reviewers } from "./reviews";

/** [english, arabic] — the compact form every text field is written in. */
export type Text = readonly [en: string, ar: string];

const text = ([en, ar]: Text): LocalizedText => ({ en, ar });

const color = (en: string, ar: string, hex: string): ProductColor => ({ name: { en, ar }, hex });

export const C = {
  black: color("Black", "أسود", "#1f1f1f"),
  graphite: color("Graphite", "جرافيت", "#4a4d52"),
  silver: color("Silver", "فضي", "#c7c9cc"),
  white: color("White", "أبيض", "#f4f4f4"),
  navy: color("Navy", "كحلي", "#1e2a4a"),
  blue: color("Blue", "أزرق", "#2f5bd3"),
  sky: color("Sky blue", "أزرق سماوي", "#8cb8e8"),
  green: color("Green", "أخضر", "#2f6b4f"),
  sage: color("Sage", "أخضر مريمي", "#9cad8f"),
  olive: color("Olive", "زيتي", "#6b6b3a"),
  grey: color("Grey", "رمادي", "#8a8d91"),
  sand: color("Sand", "رملي", "#cdb38b"),
  beige: color("Beige", "بيج", "#e3d5bd"),
  brown: color("Brown", "بني", "#6f4e37"),
  red: color("Red", "أحمر", "#c4373b"),
  pink: color("Pink", "وردي", "#e7a6b4"),
  lilac: color("Lilac", "ليلكي", "#b9a6d9"),
  yellow: color("Yellow", "أصفر", "#e8c547"),
  orange: color("Orange", "برتقالي", "#e07b39"),
  gold: color("Gold", "ذهبي", "#c9a24b"),
  rose: color("Rose gold", "ذهبي وردي", "#d8a48f"),
} as const;

const SPEC_LABELS = {
  display: ["Display", "الشاشة"],
  chip: ["Processor", "المعالج"],
  memory: ["Memory", "الذاكرة"],
  storage: ["Storage", "السعة"],
  camera: ["Camera", "الكاميرا"],
  battery: ["Battery", "البطارية"],
  weight: ["Weight", "الوزن"],
  sensor: ["Sensor", "المستشعر"],
  video: ["Video", "الفيديو"],
  lens: ["Lens", "العدسة"],
  size: ["Size", "المقاس"],
  resolution: ["Resolution", "الدقة"],
  refresh: ["Refresh rate", "معدل التحديث"],
  panel: ["Panel", "نوع اللوحة"],
  ports: ["Ports", "المنافذ"],
  material: ["Material", "الخامة"],
  fit: ["Fit", "القَصّة"],
  care: ["Care", "العناية"],
  age: ["Age", "العمر"],
  pieces: ["Pieces", "عدد القطع"],
  range: ["Range", "المدى"],
  connectivity: ["Connectivity", "الاتصال"],
  water: ["Water resistance", "مقاومة الماء"],
  capacity: ["Capacity", "السعة الداخلية"],
  dimensions: ["Dimensions", "الأبعاد"],
  warranty: ["Warranty", "الضمان"],
} as const satisfies Record<string, Text>;

export type SpecKey = keyof typeof SPEC_LABELS;

const categoryOf = Object.fromEntries(
  Object.entries(SUBCATEGORIES).flatMap(([category, subs]) => subs.map((sub) => [sub, category])),
) as Record<Subcategory, Category>;

/** Small deterministic PRNG so the catalogue (and its sample reviews) is identical on every build. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function sampleReviews(slug: string, category: Category, average: number): ProductReview[] {
  const random = seeded(slug);
  const pool = [...reviewPool[category], ...reviewPool.general];
  const count = 3 + Math.floor(random() * 3);
  const used = new Set<number>();
  const reviews: ProductReview[] = [];

  for (let i = 0; i < count; i++) {
    let index = Math.floor(random() * pool.length);
    while (used.has(index)) index = (index + 1) % pool.length;
    used.add(index);
    const entry = pool[index];
    // Follows the product's real average, kept inside the range the text fits.
    const rating = Math.max(entry.min, Math.min(entry.max, Math.round(average + (random() - 0.5)))) as ProductReview["rating"];
    const day = 1 + Math.floor(random() * 27);
    const month = 1 + Math.floor(random() * 9);
    reviews.push({
      id: `${slug}-r${i + 1}`,
      author: reviewers[Math.floor(random() * reviewers.length)],
      rating,
      date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      body: text(entry.body),
    });
  }
  return reviews.sort((a, b) => b.date.localeCompare(a.date));
}

export interface ProductInput {
  slug: string;
  brand: Brand;
  sub: Subcategory;
  title: Text;
  description: Text;
  highlights: Text[];
  specs: Array<readonly [SpecKey, en: string, ar: string]>;
  price: number;
  oldPrice?: number;
  stock: number;
  sold: number;
  /** Review counts for 5, 4, 3, 2 and 1 stars. */
  reviews: readonly [number, number, number, number, number];
  colors: ProductColor[];
  option?: ProductOption;
  /** Detail shots after the per-colour images. */
  extraShots?: number;
  featured?: boolean;
  collections?: Product["collections"];
  createdAt: string;
}

export function defineProduct(input: ProductInput): Product {
  const [five, four, three, two, one] = input.reviews;
  const rating = ratingFromBreakdown({ five, four, three, two, one });
  const category = categoryOf[input.sub];
  const imageCount = input.colors.length + (input.extraShots ?? 1);

  return {
    id: input.slug,
    slug: input.slug,
    brand: input.brand,
    title: text(input.title),
    description: text(input.description),
    highlights: input.highlights.map(text),
    specs: input.specs.map(([key, en, ar]) => ({ label: text(SPEC_LABELS[key]), value: { en, ar } })),
    category,
    subcategory: input.sub,
    priceCents: Math.round(input.price * 100),
    oldPriceCents: input.oldPrice ? Math.round(input.oldPrice * 100) : undefined,
    currency: "USD",
    stock: input.stock,
    sold: input.sold,
    rating,
    reviews: sampleReviews(input.slug, category, rating.average),
    images: Array.from({ length: imageCount }, (_, i) => `/products/${input.slug}/${i + 1}.webp`),
    colors: input.colors,
    option: input.option,
    featured: input.featured ?? false,
    collections: input.collections ?? [],
    createdAt: input.createdAt,
  };
}

/** Option helpers so product files stay short. */
export const sizes = (...labels: string[]): ProductOption => ({
  kind: "size",
  values: labels.map((label) => ({ id: label.toLowerCase(), label, priceDeltaCents: 0 })),
});

export const storage = (...steps: Array<readonly [label: string, extraDollars: number]>): ProductOption => ({
  kind: "storage",
  values: steps.map(([label, extra]) => ({
    id: label.toLowerCase().replace(/\s+/g, ""),
    label,
    priceDeltaCents: extra * 100,
  })),
});

export const memory = (...steps: Array<readonly [label: string, extraDollars: number]>): ProductOption => ({
  ...storage(...steps),
  kind: "memory",
});
