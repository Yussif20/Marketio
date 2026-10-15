/**
 * Turns the downloaded lifestyle images in scripts/raw-images/lifestyle/
 * into the banners, tiles and covers used by the home, journal and about pages.
 * Single images are resized; 2×2 grids are split into four named tiles.
 *
 *   npx tsx scripts/process-lifestyle-images.ts
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp, { type Sharp } from "sharp";
import { centredCrop, gridTiles } from "./lib/grid";

const RAW = join("scripts", "raw-images", "lifestyle");
const OUT = "public";

/** Whole images, written at the given width. */
const singles: Record<string, { out: string; width: number }> = {
  "hero-audio": { out: "banners/hero-audio.webp", width: 1920 },
  "hero-fashion": { out: "banners/hero-fashion.webp", width: 1920 },
  "hero-workspace": { out: "banners/hero-workspace.webp", width: 1920 },
  "promo-wearables": { out: "banners/promo-wearables.webp", width: 1400 },
  "promo-kids": { out: "banners/promo-kids.webp", width: 1400 },
};

/** 2×2 grids: tile paths in reading order, the tile aspect ratio and output width. */
const grids: Record<string, { tiles: string[]; aspect: number; width: number }> = {
  "categories-1": {
    tiles: ["categories/phones.webp", "categories/laptops.webp", "categories/cameras.webp", "categories/monitors.webp"],
    aspect: 1,
    width: 800,
  },
  "categories-2": {
    tiles: ["categories/clothing.webp", "categories/toys.webp", "categories/accessories.webp", "categories/gifts.webp"],
    aspect: 1,
    width: 800,
  },
  collections: {
    tiles: ["collections/work-from-home.webp", "collections/travel-light.webp", "collections/gift-ideas.webp", "collections/store.webp"],
    aspect: 1,
    width: 800,
  },
  "journal-1": {
    tiles: ["journal/choose-headphones.webp", "journal/laptop-buying-guide.webp", "journal/capsule-wardrobe.webp", "journal/gifts-for-kids.webp"],
    aspect: 16 / 9,
    width: 1200,
  },
  "journal-2": {
    tiles: ["journal/home-office-setup.webp", "journal/pack-light.webp", "journal/travel-photography.webp", "journal/choose-a-watch.webp"],
    aspect: 16 / 9,
    width: 1200,
  },
  about: {
    tiles: ["about/warehouse.webp", "about/packing.webp", "about/support.webp", "about/delivery.webp"],
    aspect: 16 / 9,
    width: 1200,
  },
};

async function write(input: Sharp, out: string, width: number) {
  const file = join(OUT, out);
  await mkdir(dirname(file), { recursive: true });
  await input.resize({ width }).webp({ quality: 78 }).toFile(file);
}

async function main() {
  for (const [name, { out, width }] of Object.entries(singles)) {
    await write(sharp(join(RAW, `${name}.png`)), out, width);
  }
  for (const [name, { tiles, aspect, width }] of Object.entries(grids)) {
    const file = join(RAW, `${name}.png`);
    const cells = await gridTiles(file);
    await Promise.all(
      cells.map((cell, i) => write(sharp(file).extract(centredCrop(cell, aspect)), tiles[i], width)),
    );
  }
  const count = Object.keys(singles).length + Object.values(grids).reduce((n, g) => n + g.tiles.length, 0);
  console.log(`Wrote ${count} lifestyle images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
