import { BadgeCheck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { ProductReview } from "@/types/product";
import { RatingStars } from "./rating-stars";

export async function ReviewList({ reviews }: { reviews: ProductReview[] }) {
  const locale = await getLocale();
  const t = await getTranslations("product");
  const dateFormat = new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-xl border p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span
                className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-semibold"
                aria-hidden
              >
                {review.author[0]}
              </span>
              <div>
                <p className="text-sm font-semibold" dir="ltr">{review.author}</p>
                <p className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
                  <BadgeCheck className="size-3.5" aria-hidden />
                  {t("verifiedPurchase")}
                </p>
              </div>
            </div>
            <time dateTime={review.date} className="text-xs text-muted-foreground">
              {dateFormat.format(new Date(review.date))}
            </time>
          </div>
          <RatingStars rating={review.rating} label={t("ratingLabel", { rating: review.rating })} className="mt-3" />
          <p className="mt-2 text-sm leading-relaxed">{review.body[locale]}</p>
        </li>
      ))}
    </ul>
  );
}
