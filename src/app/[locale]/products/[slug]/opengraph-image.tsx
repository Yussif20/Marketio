import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { getProductBySlug, getProductSlugs } from "@/lib/catalog";
import { discountPercent, formatPrice } from "@/lib/product";

export const alt = "Marketio product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

/**
 * Social card with the product image, name and price. Text is English in both
 * locales: the built-in OG font has no Arabic glyphs or shaping.
 */
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Satori can't decode WebP, so hand it a PNG.
  const webp = await readFile(join(process.cwd(), "public", product.images[0]));
  const png = await sharp(webp).resize(630, 630).png().toBuffer();
  const discount = discountPercent(product);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0a0a0a", color: "white" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={`data:image/png;base64,${png.toString("base64")}`} width={630} height={630} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 56, flex: 1 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            MAR<span style={{ color: "#e03e3e" }}>KET</span>IO
          </div>
          <div style={{ fontSize: 54, fontWeight: 700, marginTop: 40, lineHeight: 1.1 }}>{product.title.en}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginTop: 32 }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: "#e03e3e" }}>
              {formatPrice(product.priceCents)}
            </span>
            {product.oldPriceCents && (
              <span style={{ fontSize: 30, color: "#a3a3a3", textDecoration: "line-through" }}>
                {formatPrice(product.oldPriceCents)}
              </span>
            )}
          </div>
          {discount > 0 && (
            <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "#a3a3a3" }}>
              {`Save ${discount}% today`}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
