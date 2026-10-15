import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  /** Accessible text, e.g. "4.5 out of 5 stars". */
  label: string;
  className?: string;
}

/** Five stars; a partial star fills from the inline-start edge, so it reads correctly in RTL too. */
export function RatingStars({ rating, label, className }: RatingStarsProps) {
  return (
    <span role="img" aria-label={label} className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span key={index} className="relative inline-flex size-4" aria-hidden>
            <Star className="size-4 text-muted-foreground/30" strokeWidth={1.5} />
            {fill > 0 && (
              <span className="absolute inset-y-0 start-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="size-4 fill-amber-400 text-amber-400" strokeWidth={1.5} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
