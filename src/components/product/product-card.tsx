import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { brands } from "@/data/categories";
import { Link } from "@/i18n/navigation";
import { discountPercent, formatDiscount } from "@/lib/product";
import { toSnapshot } from "@/lib/product-snapshot";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./add-to-cart-button";
import { Price } from "./price";
import { RatingStars } from "./rating-stars";
import { WishlistButton } from "./wishlist-button";

interface ProductCardProps {
  product: Product;
  /** Set on the first cards of a page so the LCP image isn't lazy-loaded. */
  priority?: boolean;
}

const brandName = Object.fromEntries(brands.map((b) => [b.slug, b.name]));

export async function ProductCard({ product, priority = false }: ProductCardProps) {
  const locale = await getLocale();
  const t = await getTranslations("product");
  const discount = discountPercent(product);
  const snapshot = toSnapshot(product);
  const title = product.title[locale];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute start-2 top-2 flex flex-col gap-1">
          {discount > 0 && <Badge>{formatDiscount(discount, locale)}</Badge>}
          {product.stock <= 0 && <Badge variant="secondary">{t("outOfStock")}</Badge>}
        </div>
        <WishlistButton product={snapshot} className="absolute end-2 top-2 z-10" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase" dir="ltr">
          {brandName[product.brand]}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold sm:text-base">
          {/* The link covers the whole card; buttons sit above it with z-10. */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <Price priceCents={product.priceCents} oldPriceCents={product.oldPriceCents} />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RatingStars
            rating={product.rating.average}
            label={t("ratingLabel", { rating: product.rating.average })}
          />
          <span>({product.rating.count})</span>
        </p>
        <AddToCartButton product={snapshot} className="relative z-10 mt-auto w-full" />
      </div>
    </article>
  );
}

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">{children}</div>;
}
