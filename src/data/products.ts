import type { Product } from "@/types/product";
import { accessories } from "./catalog/accessories";
import { cameras } from "./catalog/cameras";
import { clothing } from "./catalog/clothing";
import { laptops } from "./catalog/laptops";
import { monitors } from "./catalog/monitors";
import { phones } from "./catalog/phones";
import { toys } from "./catalog/toys";

/**
 * Demo catalogue. Every brand, product and reviewer name is made up.
 * Pages read it through `src/lib/catalog.ts`; `scripts/seed.ts` writes it to Firestore.
 */
export const products: Product[] = [
  ...phones,
  ...laptops,
  ...cameras,
  ...monitors,
  ...clothing,
  ...toys,
  ...accessories,
];
