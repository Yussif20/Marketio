import { ratingFromBreakdown } from "@/lib/product";
import type {
  Category,
  LocalizedText,
  Product,
  ProductColor,
  RatingBreakdown,
} from "@/types/product";

/**
 * Demo catalogue. Every brand and product name here is made up.
 * `scripts/seed.ts` writes these documents to Firestore.
 */

const color = (en: string, ar: string, hex: string): ProductColor => ({
  name: { en, ar },
  hex,
});

const BLACK = color("Black", "أسود", "#1f1f1f");
const SILVER = color("Silver", "فضي", "#c7c9cc");
const WHITE = color("White", "أبيض", "#f4f4f4");
const NAVY = color("Navy", "كحلي", "#1e2a4a");
const GOLD = color("Gold", "ذهبي", "#c9a24b");
const BLUE = color("Blue", "أزرق", "#2f5bd3");
const GREEN = color("Green", "أخضر", "#2f6b4f");
const GREY = color("Grey", "رمادي", "#8a8d91");
const SAND = color("Sand", "رملي", "#cdb38b");
const RED = color("Red", "أحمر", "#c4373b");
const PINK = color("Pink", "وردي", "#e7a6b4");

interface ProductInput {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: Category;
  price: number;
  oldPrice?: number;
  stock: number;
  sold: number;
  reviews: [five: number, four: number, three: number, two: number, one: number];
  colors: ProductColor[];
  imageCount?: number;
  featured?: boolean;
  createdAt: string;
}

function defineProduct(input: ProductInput): Product {
  const [five, four, three, two, one] = input.reviews;
  const breakdown: RatingBreakdown = { five, four, three, two, one };
  const imageCount = input.imageCount ?? 2;

  return {
    id: input.slug,
    slug: input.slug,
    title: input.title,
    description: input.description,
    category: input.category,
    priceCents: Math.round(input.price * 100),
    oldPriceCents: input.oldPrice ? Math.round(input.oldPrice * 100) : undefined,
    currency: "USD",
    stock: input.stock,
    sold: input.sold,
    rating: ratingFromBreakdown(breakdown),
    // Image files are added in the catalogue session; paths are fixed now so the seed is stable.
    images: Array.from(
      { length: imageCount },
      (_, i) => `/products/${input.slug}/${i + 1}.webp`,
    ),
    colors: input.colors,
    featured: input.featured ?? false,
    createdAt: input.createdAt,
  };
}

export const products: Product[] = [
  // Cameras
  defineProduct({
    slug: "lumen-4k-vlog-camera",
    title: { en: "Lumen 4K Vlog Camera", ar: "كاميرا لومن 4K للفلوج" },
    description: {
      en: "Compact 4K camera with a flip screen, built-in stabilisation and a 64 GB card in the box.",
      ar: "كاميرا 4K صغيرة بشاشة قابلة للقلب وتثبيت مدمج للصورة، وبطاقة ذاكرة 64 جيجابايت داخل العلبة.",
    },
    category: "cameras",
    price: 189,
    oldPrice: 239,
    stock: 18,
    sold: 412,
    reviews: [210, 64, 18, 6, 4],
    colors: [BLACK, SILVER],
    featured: true,
    createdAt: "2026-09-02",
  }),
  defineProduct({
    slug: "orbit-mirrorless-camera",
    title: { en: "Orbit Mirrorless Camera", ar: "كاميرا أوربت بدون مرآة" },
    description: {
      en: "24 MP mirrorless body with a 15–45 mm kit lens, fast autofocus and Wi-Fi photo transfer.",
      ar: "كاميرا بدون مرآة بدقة 24 ميجابكسل مع عدسة 15–45 مم، وتركيز تلقائي سريع ونقل الصور عبر الواي فاي.",
    },
    category: "cameras",
    price: 649,
    stock: 7,
    sold: 96,
    reviews: [58, 22, 5, 1, 1],
    colors: [BLACK],
    imageCount: 3,
    createdAt: "2026-07-18",
  }),
  defineProduct({
    slug: "pixie-kids-camera",
    title: { en: "Pixie Kids Camera", ar: "كاميرا بيكسي للأطفال" },
    description: {
      en: "Drop-proof camera for children with a 2-inch screen, fun frames and a rechargeable battery.",
      ar: "كاميرا للأطفال مقاومة للسقوط بشاشة 2 بوصة وإطارات مرحة وبطارية قابلة للشحن.",
    },
    category: "cameras",
    price: 39,
    oldPrice: 55,
    stock: 64,
    sold: 980,
    reviews: [402, 150, 61, 20, 12],
    colors: [BLUE, PINK],
    createdAt: "2026-05-11",
  }),
  defineProduct({
    slug: "trail-action-camera",
    title: { en: "Trail Action Camera", ar: "كاميرا تريل الرياضية" },
    description: {
      en: "Waterproof to 30 m with 5K video, voice control and two batteries for long days outdoors.",
      ar: "مقاومة للماء حتى 30 مترًا وتصوير فيديو 5K وتحكم صوتي، مع بطاريتين ليوم طويل في الخارج.",
    },
    category: "cameras",
    price: 279,
    stock: 0,
    sold: 233,
    reviews: [120, 48, 14, 5, 3],
    colors: [BLACK],
    createdAt: "2026-03-27",
  }),

  // Phones
  defineProduct({
    slug: "nova-x1-phone",
    title: { en: "Nova X1 Phone", ar: "هاتف نوفا X1" },
    description: {
      en: "6.7-inch OLED display, triple 50 MP camera and a 5,000 mAh battery that lasts two days.",
      ar: "شاشة OLED بقياس 6.7 بوصة وثلاث كاميرات بدقة 50 ميجابكسل وبطارية 5000 مللي أمبير تدوم يومين.",
    },
    category: "phones",
    price: 699,
    oldPrice: 799,
    stock: 25,
    sold: 1320,
    reviews: [640, 210, 60, 22, 18],
    colors: [BLACK, GOLD, SILVER],
    imageCount: 3,
    featured: true,
    createdAt: "2026-09-20",
  }),
  defineProduct({
    slug: "nova-lite-phone",
    title: { en: "Nova Lite Phone", ar: "هاتف نوفا لايت" },
    description: {
      en: "Everyday phone with a 6.5-inch screen, 128 GB storage and fast 33 W charging.",
      ar: "هاتف للاستخدام اليومي بشاشة 6.5 بوصة وسعة 128 جيجابايت وشحن سريع بقوة 33 واط.",
    },
    category: "phones",
    price: 249,
    stock: 80,
    sold: 2104,
    reviews: [820, 410, 150, 44, 31],
    colors: [BLUE, BLACK],
    createdAt: "2026-04-03",
  }),
  defineProduct({
    slug: "zephyr-fold-phone",
    title: { en: "Zephyr Fold Phone", ar: "هاتف زفير القابل للطي" },
    description: {
      en: "Folds into your pocket and opens into a 7.6-inch tablet for reading, maps and multitasking.",
      ar: "يُطوى ليدخل جيبك ويُفتح ليصبح جهازًا لوحيًا بقياس 7.6 بوصة للقراءة والخرائط وتعدد المهام.",
    },
    category: "phones",
    price: 1299,
    stock: 4,
    sold: 58,
    reviews: [30, 14, 6, 2, 1],
    colors: [GREEN, BLACK],
    createdAt: "2026-10-01",
  }),
  defineProduct({
    slug: "pulse-mini-phone",
    title: { en: "Pulse Mini Phone", ar: "هاتف بالس ميني" },
    description: {
      en: "A small 5.8-inch phone that fits one hand, with a bright screen and a dual camera.",
      ar: "هاتف صغير بشاشة 5.8 بوصة يناسب اليد الواحدة، بشاشة ساطعة وكاميرا مزدوجة.",
    },
    category: "phones",
    price: 329,
    oldPrice: 379,
    stock: 31,
    sold: 377,
    reviews: [140, 90, 40, 12, 9],
    colors: [PINK, WHITE],
    createdAt: "2026-02-14",
  }),

  // Laptops
  defineProduct({
    slug: "atlas-14-laptop",
    title: { en: "Atlas 14 Laptop", ar: "لابتوب أطلس 14" },
    description: {
      en: "Light 14-inch laptop with 16 GB RAM, 512 GB SSD and an all-day battery for work and study.",
      ar: "لابتوب خفيف بشاشة 14 بوصة وذاكرة 16 جيجابايت وقرص SSD بسعة 512 جيجابايت وبطارية تدوم طوال اليوم.",
    },
    category: "laptops",
    price: 749,
    oldPrice: 899,
    stock: 12,
    sold: 540,
    reviews: [260, 110, 30, 9, 6],
    colors: [SILVER, NAVY],
    featured: true,
    createdAt: "2026-08-08",
  }),
  defineProduct({
    slug: "atlas-16-pro-laptop",
    title: { en: "Atlas 16 Pro Laptop", ar: "لابتوب أطلس 16 برو" },
    description: {
      en: "16-inch 120 Hz display, 32 GB RAM and a dedicated graphics card for editing and design.",
      ar: "شاشة 16 بوصة بتردد 120 هرتز وذاكرة 32 جيجابايت وكرت شاشة منفصل للمونتاج والتصميم.",
    },
    category: "laptops",
    price: 1499,
    stock: 6,
    sold: 141,
    reviews: [90, 30, 8, 2, 2],
    colors: [GREY],
    imageCount: 3,
    createdAt: "2026-06-30",
  }),
  defineProduct({
    slug: "vortex-gaming-laptop",
    title: { en: "Vortex Gaming Laptop", ar: "لابتوب فورتكس للألعاب" },
    description: {
      en: "15.6-inch 165 Hz screen, RGB keyboard and a cooling system built for long gaming sessions.",
      ar: "شاشة 15.6 بوصة بتردد 165 هرتز ولوحة مفاتيح RGB ونظام تبريد مصمم لجلسات اللعب الطويلة.",
    },
    category: "laptops",
    price: 1189,
    oldPrice: 1349,
    stock: 9,
    sold: 302,
    reviews: [150, 80, 25, 10, 7],
    colors: [BLACK],
    createdAt: "2026-05-22",
  }),
  defineProduct({
    slug: "breeze-cloudbook",
    title: { en: "Breeze Cloudbook", ar: "لابتوب بريز السحابي" },
    description: {
      en: "Simple, fast 11.6-inch laptop for school, browsing and video calls, with a spill-proof keyboard.",
      ar: "لابتوب بسيط وسريع بشاشة 11.6 بوصة للدراسة والتصفح ومكالمات الفيديو، بلوحة مفاتيح مقاومة للانسكاب.",
    },
    category: "laptops",
    price: 279,
    stock: 40,
    sold: 615,
    reviews: [210, 160, 70, 25, 20],
    colors: [WHITE, BLUE],
    createdAt: "2026-01-19",
  }),

  // Clothing
  defineProduct({
    slug: "everyday-cotton-hoodie",
    title: { en: "Everyday Cotton Hoodie", ar: "هودي قطني يومي" },
    description: {
      en: "Soft brushed-cotton hoodie with a roomy front pocket and a relaxed fit.",
      ar: "هودي من القطن الناعم بجيب أمامي واسع وقَصّة مريحة.",
    },
    category: "clothing",
    price: 35,
    oldPrice: 49,
    stock: 120,
    sold: 1840,
    reviews: [700, 300, 90, 30, 20],
    colors: [BLACK, BLUE],
    featured: true,
    createdAt: "2026-09-10",
  }),
  defineProduct({
    slug: "puffer-winter-jacket",
    title: { en: "Puffer Winter Jacket", ar: "جاكيت شتوي منفوخ" },
    description: {
      en: "Warm, lightweight puffer with a high collar and water-repellent shell.",
      ar: "جاكيت منفوخ دافئ وخفيف بياقة عالية وطبقة خارجية طاردة للماء.",
    },
    category: "clothing",
    price: 89,
    stock: 45,
    sold: 520,
    reviews: [230, 120, 40, 12, 8],
    colors: [BLACK, GREY],
    createdAt: "2026-10-05",
  }),
  defineProduct({
    slug: "classic-cargo-pants",
    title: { en: "Classic Cargo Pants", ar: "بنطلون كارجو كلاسيكي" },
    description: {
      en: "Durable cotton cargo pants with six pockets and an adjustable waist.",
      ar: "بنطلون كارجو من القطن المتين بستة جيوب وخصر قابل للتعديل.",
    },
    category: "clothing",
    price: 42,
    oldPrice: 58,
    stock: 70,
    sold: 760,
    reviews: [260, 180, 60, 18, 12],
    colors: [BLACK, SAND],
    createdAt: "2026-04-28",
  }),
  defineProduct({
    slug: "knit-turtleneck-sweater",
    title: { en: "Knit Turtleneck Sweater", ar: "كنزة صوف برقبة عالية" },
    description: {
      en: "Textured knit turtleneck that keeps you warm without the bulk.",
      ar: "كنزة محبوكة برقبة عالية تمنحك الدفء من دون أن تكون ثقيلة.",
    },
    category: "clothing",
    price: 39,
    stock: 55,
    sold: 330,
    reviews: [120, 80, 30, 9, 5],
    colors: [NAVY, GREEN],
    createdAt: "2026-08-25",
  }),
  defineProduct({
    slug: "corduroy-overshirt",
    title: { en: "Corduroy Overshirt", ar: "قميص كوردروي خارجي" },
    description: {
      en: "Heavy corduroy shirt-jacket with chest pockets — wear it open or buttoned.",
      ar: "قميص-جاكيت من قماش الكوردروي السميك بجيوب على الصدر، يُلبس مفتوحًا أو مغلقًا.",
    },
    category: "clothing",
    price: 54,
    oldPrice: 69,
    stock: 3,
    sold: 210,
    reviews: [90, 50, 20, 6, 4],
    colors: [GREEN, GREY],
    createdAt: "2026-02-02",
  }),

  // Monitors
  defineProduct({
    slug: "clarity-27-4k-monitor",
    title: { en: "Clarity 27\" 4K Monitor", ar: "شاشة كلاريتي 27 بوصة 4K" },
    description: {
      en: "27-inch 4K IPS panel with accurate colour, USB-C power delivery and a height-adjustable stand.",
      ar: "شاشة IPS بقياس 27 بوصة ودقة 4K بألوان دقيقة وشحن عبر USB-C وحامل قابل لتعديل الارتفاع.",
    },
    category: "monitors",
    price: 379,
    oldPrice: 449,
    stock: 14,
    sold: 288,
    reviews: [150, 60, 15, 4, 3],
    colors: [BLACK],
    featured: true,
    createdAt: "2026-07-07",
  }),
  defineProduct({
    slug: "arc-34-curved-monitor",
    title: { en: "Arc 34\" Curved Monitor", ar: "شاشة آرك المنحنية 34 بوصة" },
    description: {
      en: "Ultrawide 34-inch curved display at 144 Hz — room for two windows side by side.",
      ar: "شاشة منحنية عريضة بقياس 34 بوصة وتردد 144 هرتز، تتسع لنافذتين جنبًا إلى جنب.",
    },
    category: "monitors",
    price: 499,
    stock: 8,
    sold: 167,
    reviews: [80, 40, 12, 5, 2],
    colors: [BLACK],
    createdAt: "2026-06-12",
  }),
  defineProduct({
    slug: "swift-24-office-monitor",
    title: { en: "Swift 24\" Office Monitor", ar: "شاشة سويفت 24 بوصة للمكتب" },
    description: {
      en: "Slim-bezel 24-inch Full HD monitor with eye-care mode, ideal for a home office.",
      ar: "شاشة Full HD بقياس 24 بوصة بإطار نحيف ووضع لراحة العين، مثالية للمكتب المنزلي.",
    },
    category: "monitors",
    price: 119,
    oldPrice: 139,
    stock: 50,
    sold: 905,
    reviews: [380, 220, 70, 20, 15],
    colors: [BLACK, WHITE],
    createdAt: "2026-03-09",
  }),

  // Toys
  defineProduct({
    slug: "builder-robot-kit",
    title: { en: "Builder Robot Kit", ar: "مجموعة بناء روبوت" },
    description: {
      en: "Build and code your own robot — 400 pieces and a free app with step-by-step lessons.",
      ar: "ابنِ روبوتك وبرمجه بنفسك: 400 قطعة وتطبيق مجاني بدروس خطوة بخطوة.",
    },
    category: "toys",
    price: 69,
    oldPrice: 89,
    stock: 28,
    sold: 455,
    reviews: [210, 90, 25, 8, 4],
    colors: [BLUE],
    featured: true,
    createdAt: "2026-09-28",
  }),
  defineProduct({
    slug: "racer-rc-car",
    title: { en: "Racer RC Car", ar: "سيارة ريسر بالتحكم عن بعد" },
    description: {
      en: "Off-road remote-control car with 4-wheel drive and a top speed of 30 km/h.",
      ar: "سيارة للطرق الوعرة بالتحكم عن بعد بدفع رباعي وسرعة قصوى 30 كم/ساعة.",
    },
    category: "toys",
    price: 45,
    stock: 36,
    sold: 610,
    reviews: [240, 130, 45, 15, 10],
    colors: [RED, BLACK],
    createdAt: "2026-05-05",
  }),
  defineProduct({
    slug: "cozy-plush-bear",
    title: { en: "Cozy Plush Bear", ar: "دب محشو ناعم" },
    description: {
      en: "Extra-soft 40 cm teddy bear, machine-washable and safe from birth.",
      ar: "دب محشو فائق النعومة بطول 40 سم، قابل للغسل في الغسالة وآمن منذ الولادة.",
    },
    category: "toys",
    price: 24,
    oldPrice: 32,
    stock: 90,
    sold: 1210,
    reviews: [520, 160, 40, 10, 6],
    colors: [SAND, PINK],
    createdAt: "2026-01-30",
  }),

  // Accessories
  defineProduct({
    slug: "aurora-wireless-headphones",
    title: { en: "Aurora Wireless Headphones", ar: "سماعات أورورا اللاسلكية" },
    description: {
      en: "Over-ear headphones with active noise cancelling and 40 hours of battery life.",
      ar: "سماعات رأس بخاصية إلغاء الضوضاء النشط وبطارية تدوم 40 ساعة.",
    },
    category: "accessories",
    price: 149,
    oldPrice: 199,
    stock: 33,
    sold: 1580,
    reviews: [720, 260, 70, 20, 14],
    colors: [BLACK, WHITE, NAVY],
    imageCount: 3,
    featured: true,
    createdAt: "2026-10-08",
  }),
  defineProduct({
    slug: "meridian-chronograph-watch",
    title: { en: "Meridian Chronograph Watch", ar: "ساعة ميريديان كرونوغراف" },
    description: {
      en: "Stainless-steel chronograph with a sapphire-coated glass and 50 m water resistance.",
      ar: "ساعة كرونوغراف من الفولاذ المقاوم للصدأ بزجاج مطلي بالياقوت ومقاومة للماء حتى 50 مترًا.",
    },
    category: "accessories",
    price: 219,
    stock: 15,
    sold: 274,
    reviews: [130, 70, 18, 6, 3],
    colors: [BLACK, GOLD],
    createdAt: "2026-07-25",
  }),
  defineProduct({
    slug: "sola-square-sunglasses",
    title: { en: "Sola Square Sunglasses", ar: "نظارة شمسية سولا مربعة" },
    description: {
      en: "Oversized square frames with UV400 lenses and a chain-link temple detail.",
      ar: "إطار مربع كبير بعدسات UV400 وتفصيل على شكل سلسلة على الذراعين.",
    },
    category: "accessories",
    price: 29,
    oldPrice: 45,
    stock: 75,
    sold: 890,
    reviews: [300, 210, 80, 25, 15],
    colors: [BLACK, PINK],
    createdAt: "2026-04-16",
  }),
  defineProduct({
    slug: "voyager-laptop-backpack",
    title: { en: "Voyager Laptop Backpack", ar: "حقيبة ظهر فوياجر للابتوب" },
    description: {
      en: "Water-resistant backpack with a padded 16-inch laptop sleeve and a USB charging port.",
      ar: "حقيبة ظهر مقاومة للماء بجيب مبطن للابتوب حتى 16 بوصة ومنفذ USB للشحن.",
    },
    category: "accessories",
    price: 59,
    stock: 48,
    sold: 702,
    reviews: [310, 160, 40, 12, 8],
    colors: [GREY, BLACK],
    createdAt: "2026-08-14",
  }),
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
