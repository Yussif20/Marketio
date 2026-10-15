import {
  Camera,
  Gamepad2,
  Laptop,
  Monitor,
  Shirt,
  Smartphone,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { BRANDS, CATEGORIES, SUBCATEGORIES, type Brand, type Category } from "@/types/product";

/** Icon for each category; labels live in messages under `categories.<slug>`. */
export const categoryIcons: Record<Category, LucideIcon> = {
  cameras: Camera,
  phones: Smartphone,
  laptops: Laptop,
  clothing: Shirt,
  monitors: Monitor,
  toys: Gamepad2,
  accessories: Watch,
};

export const categories = CATEGORIES.map((slug) => ({
  slug,
  icon: categoryIcons[slug],
  subcategories: SUBCATEGORIES[slug],
  /** Lifestyle tile used on the home page and in the mega-menu. */
  image: `/categories/${slug}.webp`,
}));

/** Brand wordmark styling; names are invented. Taglines live in messages under `brands.<slug>`. */
export const brands: Array<{ slug: Brand; name: string }> = BRANDS.map((slug) => ({
  slug,
  name: {
    vela: "VELA",
    atlas: "ATLAS",
    lumen: "Lumen",
    clarity: "Clarity",
    kora: "KORA",
    playlab: "PlayLab",
    aurora: "aurora",
    halden: "HALDEN",
  }[slug],
}));
