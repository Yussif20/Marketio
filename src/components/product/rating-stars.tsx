import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  /** Accessible text, e.g. "4.5 out of 5 stars". */
  label: string;
  className?: string;
}

/**
 * Five stars drawn with one CSS mask (see `rating-stars` in globals.css); the
 * amber layer is as wide as the rating, so a partial star fills from the
 * inline-start edge and reads correctly in RTL too.
 */
export function RatingStars({ rating, label, className }: RatingStarsProps) {
  const filled = Math.max(0, Math.min(5, rating));
  return (
    <span role="img" aria-label={label} className={cn("relative inline-block h-4 w-[88px] shrink-0", className)}>
      <span aria-hidden className="rating-stars absolute inset-0 bg-muted-foreground/25" />
      <span aria-hidden className="rating-stars absolute inset-y-0 start-0 bg-amber-400" style={{ width: `${filled * 18}px` }} />
    </span>
  );
}
