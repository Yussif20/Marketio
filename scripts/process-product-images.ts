/**
 * Splits the downloaded 2×2 product grids into the four gallery images.
 * Reads scripts/raw-images/<slug>.png and writes public/products/<slug>/<1-4>.webp
 * as centred squares. Tile order (top-left, top-right, bottom-left,
 * bottom-right) matches `product.images`, so image i shows colour i.
 *
 *   npm run images:split [-- slug ...]
 */
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { products } from "@/data/products";
import { centredCrop, gridTiles } from "./lib/grid";

const RAW = join("scripts", "raw-images");
const SIZE = 900;

async function splitGrid(slug: string) {
  const file = join(RAW, `${slug}.png`);
  const tiles = await gridTiles(file);
  const outDir = join("public", "products", slug);
  await mkdir(outDir, { recursive: true });
  await Promise.all(
    tiles.map((tile, index) =>
      sharp(file)
        .extract(centredCrop(tile, 1))
        .resize(SIZE, SIZE)
        .webp({ quality: 80 })
        .toFile(join(outDir, `${index + 1}.webp`)),
    ),
  );
}

async function main() {
  const wanted = process.argv.slice(2);
  const slugs = wanted.length ? wanted : products.map((p) => p.slug);
  const missing = slugs.filter((slug) => !existsSync(join(RAW, `${slug}.png`)));
  if (missing.length) console.warn(`No grid for: ${missing.join(", ")}`);

  const ready = slugs.filter((slug) => !missing.includes(slug));
  for (const slug of ready) await splitGrid(slug);
  console.log(`Wrote ${ready.length * 4} images for ${ready.length} products.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
