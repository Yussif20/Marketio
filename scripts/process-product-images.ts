/**
 * Splits the downloaded 2×2 product grids into the four gallery images.
 * Reads scripts/raw-images/<slug>.png, finds the white gutters, crops each
 * tile to a centred square and writes public/products/<slug>/<1-4>.webp.
 * Tile order (top-left, top-right, bottom-left, bottom-right) matches the
 * order of `product.images`, so image i shows colour i.
 *
 *   npx tsx scripts/process-product-images.ts [slug ...]
 */
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { products } from "@/data/products";

const RAW = join("scripts", "raw-images");
const SIZE = 900;

/** Longest run of near-white lines in the middle third, i.e. the gutter. Falls back to the exact centre. */
function findGutter(means: number[]) {
  const from = Math.floor(means.length * 0.35);
  const to = Math.ceil(means.length * 0.65);
  let best = { start: Math.floor(means.length / 2), end: Math.floor(means.length / 2) };
  let start = -1;
  for (let i = from; i <= to; i++) {
    const white = i < to && means[i] > 247;
    if (white && start < 0) start = i;
    if (!white && start >= 0) {
      if (i - start > best.end - best.start) best = { start, end: i };
      start = -1;
    }
  }
  return best;
}

async function splitGrid(slug: string) {
  const file = join(RAW, `${slug}.png`);
  const image = sharp(file);
  const { width, height } = await image.metadata();
  if (!width || !height) throw new Error(`${slug}: unreadable image`);

  const { data } = await image.clone().greyscale().raw().toBuffer({ resolveWithObject: true });
  const columnMeans = Array.from({ length: width }, (_, x) => {
    let sum = 0;
    for (let y = 0; y < height; y++) sum += data[y * width + x];
    return sum / height;
  });
  const rowMeans = Array.from({ length: height }, (_, y) => {
    let sum = 0;
    for (let x = 0; x < width; x++) sum += data[y * width + x];
    return sum / width;
  });
  const col = findGutter(columnMeans);
  const row = findGutter(rowMeans);

  // Trim a few pixels inside each tile so no gutter line survives the crop.
  const inset = 6;
  const tiles = [
    { left: 0, top: 0, right: col.start, bottom: row.start },
    { left: col.end, top: 0, right: width, bottom: row.start },
    { left: 0, top: row.end, right: col.start, bottom: height },
    { left: col.end, top: row.end, right: width, bottom: height },
  ];

  const outDir = join("public", "products", slug);
  await mkdir(outDir, { recursive: true });
  await Promise.all(
    tiles.map(async (tile, index) => {
      const w = tile.right - tile.left - inset * 2;
      const h = tile.bottom - tile.top - inset * 2;
      const side = Math.min(w, h);
      await sharp(file)
        .extract({
          left: tile.left + inset + Math.floor((w - side) / 2),
          top: tile.top + inset + Math.floor((h - side) / 2),
          width: side,
          height: side,
        })
        .resize(SIZE, SIZE)
        .webp({ quality: 80 })
        .toFile(join(outDir, `${index + 1}.webp`));
    }),
  );
  return { slug, gutter: { x: [col.start, col.end], y: [row.start, row.end] } };
}

async function main() {
  const wanted = process.argv.slice(2);
  const slugs = wanted.length ? wanted : products.map((p) => p.slug);
  const missing = slugs.filter((slug) => !existsSync(join(RAW, `${slug}.png`)));
  if (missing.length) console.warn(`No grid for: ${missing.join(", ")}`);

  for (const slug of slugs.filter((s) => !missing.includes(s))) {
    const result = await splitGrid(slug);
    const [x0, x1] = result.gutter.x;
    const [y0, y1] = result.gutter.y;
    // A missing gutter usually means the model drew a different layout; flag it for a manual look.
    const flag = x1 - x0 < 4 || y1 - y0 < 4 ? "  <- check gutters" : "";
    console.log(`${slug}: x ${x0}-${x1}, y ${y0}-${y1}${flag}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
