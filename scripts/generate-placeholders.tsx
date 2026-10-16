/**
 * Generates neutral product images: a tinted studio backdrop with a line icon,
 * one image per colour variant. No photos, brands or licences involved.
 * Output goes to the paths in `product.images` (public/products/<slug>/<n>.webp).
 *
 *   npm run images
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  Backpack,
  Bot,
  Camera,
  CarFront,
  Gamepad2,
  Glasses,
  Headphones,
  Laptop,
  Monitor,
  PawPrint,
  Shirt,
  Smartphone,
  TabletSmartphone,
  Video,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { products } from "@/data/products";
import type { Category } from "@/types/product";

const SIZE = 800;

const categoryIcon: Record<Category, LucideIcon> = {
  cameras: Camera,
  phones: Smartphone,
  laptops: Laptop,
  clothing: Shirt,
  monitors: Monitor,
  toys: Gamepad2,
  accessories: Watch,
};

// Closer matches than the category icon for a few products.
const productIcon: Record<string, LucideIcon> = {
  "trail-action-camera": Video,
  "zephyr-fold-phone": TabletSmartphone,
  "builder-robot-kit": Bot,
  "racer-rc-car": CarFront,
  "cozy-plush-bear": PawPrint,
  "aurora-wireless-headphones": Headphones,
  "sola-square-sunglasses": Glasses,
  "voyager-laptop-backpack": Backpack,
};

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255] as const;
}

function mix(hex: string, target: string, amount: number) {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  const channel = (i: number) => Math.round(a[i] + (b[i] - a[i]) * amount);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Each image index gets its own framing so a gallery doesn't look like copies. */
const framings = [
  { scale: 0.5, rotate: 0, dx: 0, dy: -10 },
  { scale: 0.62, rotate: -12, dx: 30, dy: 0 },
  { scale: 0.4, rotate: 8, dx: -40, dy: -20 },
];

function placeholderSvg(Icon: LucideIcon, hex: string, index: number) {
  // Very light colours (white, silver) would vanish on their own tint, so draw them darker.
  const stroke = luminance(hex) > 0.75 ? mix(hex, "#2a2a2a", 0.55) : hex;
  const framing = framings[index % framings.length];
  const iconSize = SIZE * framing.scale;
  const icon = renderToStaticMarkup(
    createElement(Icon, { size: iconSize, color: stroke, strokeWidth: 1.25 }),
  );
  const x = (SIZE - iconSize) / 2 + framing.dx;
  const y = (SIZE - iconSize) / 2 + framing.dy;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${mix(hex, "#ffffff", 0.9)}"/>
      <stop offset="1" stop-color="${mix(hex, "#ffffff", 0.74)}"/>
    </linearGradient>
    <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#000" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
  <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 20}" r="${SIZE * 0.34}" fill="#ffffff" fill-opacity="0.55"/>
  <ellipse cx="${SIZE / 2 + framing.dx}" cy="${SIZE * 0.8}" rx="${iconSize * 0.42}" ry="${SIZE * 0.035}" fill="url(#shadow)"/>
  <g transform="translate(${x} ${y}) rotate(${framing.rotate} ${iconSize / 2} ${iconSize / 2})">${icon}</g>
</svg>`;
}

async function main() {
  let written = 0;
  for (const product of products) {
    const Icon = productIcon[product.slug] ?? categoryIcon[product.category];
    for (const [index, path] of product.images.entries()) {
      const color = product.colors[index % product.colors.length];
      const file = join("public", path);
      await mkdir(dirname(file), { recursive: true });
      await sharp(Buffer.from(placeholderSvg(Icon, color.hex, index)))
        .webp({ quality: 82 })
        .toFile(file);
      written++;
    }
  }
  console.log(`Wrote ${written} images for ${products.length} products.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
