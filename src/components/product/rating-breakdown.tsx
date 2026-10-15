import { getTranslations } from "next-intl/server";
import type { ProductRating } from "@/types/product";
import { RatingStars } from "./rating-stars";

const ROWS = [
  [5, "five"],
  [4, "four"],
  [3, "three"],
  [2, "two"],
  [1, "one"],
] as const;

export async function RatingBreakdown({ rating }: { rating: ProductRating }) {
  const t = await getTranslations("product");

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <div className="text-center">
        <p className="text-5xl font-bold">{rating.average}</p>
        <RatingStars rating={rating.average} label={t("ratingLabel", { rating: rating.average })} className="mt-2" />
        <p className="mt-1 text-sm text-muted-foreground">{t("reviews", { count: rating.count })}</p>
      </div>
      <ul className="space-y-2">
        {ROWS.map(([stars, key]) => {
          const count = rating.breakdown[key];
          const percent = rating.count ? Math.round((count / rating.count) * 100) : 0;
          return (
            <li key={key} className="flex items-center gap-3 text-sm">
              <span className="w-14 shrink-0">{t("starsCount", { stars })}</span>
              <span
                className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
                role="meter"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t("starsShare", { stars, percent })}
              >
                <span className="block h-full rounded-full bg-amber-400" style={{ width: `${percent}%` }} />
              </span>
              <span className="w-10 shrink-0 text-end text-muted-foreground tabular-nums">{percent}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
