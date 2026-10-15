import { formatPrice } from "@/lib/product";
import { cn } from "@/lib/utils";

interface PriceProps {
  priceCents: number;
  oldPriceCents?: number;
  size?: "sm" | "lg";
  className?: string;
}

export function Price({ priceCents, oldPriceCents, size = "sm", className }: PriceProps) {
  const onSale = oldPriceCents !== undefined && oldPriceCents > priceCents;

  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <span className={cn("font-bold text-primary", size === "lg" ? "text-3xl" : "text-base")}>
        {formatPrice(priceCents)}
      </span>
      {onSale && (
        <del className={cn("text-muted-foreground", size === "lg" ? "text-lg" : "text-sm")}>
          {formatPrice(oldPriceCents)}
        </del>
      )}
    </p>
  );
}
