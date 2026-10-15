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
import { CATEGORIES, type Category } from "@/types/product";

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
}));
