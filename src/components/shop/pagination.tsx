import { ChevronLeft, ChevronRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import { productsHref, type ProductQuery } from "@/lib/product-query";
import { cn } from "@/lib/utils";

interface PaginationProps {
  query: ProductQuery;
  page: number;
  pageCount: number;
}

export async function Pagination({ query, page, pageCount }: PaginationProps) {
  if (pageCount <= 1) return null;
  const t = await getTranslations("listing");
  const rtl = localeDirection[await getLocale()] === "rtl";
  // Arrows point the way the reading direction moves.
  const Previous = rtl ? ChevronRight : ChevronLeft;
  const Next = rtl ? ChevronLeft : ChevronRight;
  const href = (target: number) => productsHref({ ...query, page: target });

  return (
    <nav aria-label={t("pagination")} className="mt-10 flex items-center justify-center gap-1">
      <Button variant="outline" size="icon" asChild={page > 1} disabled={page <= 1} aria-label={t("previous")}>
        {page > 1 ? <Link href={href(page - 1)}><Previous /></Link> : <Previous />}
      </Button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((target) => (
        <Button
          key={target}
          variant={target === page ? "default" : "ghost"}
          size="icon"
          asChild
          className={cn(target === page && "pointer-events-none")}
        >
          <Link href={href(target)} aria-current={target === page ? "page" : undefined}>
            {target}
          </Link>
        </Button>
      ))}
      <Button variant="outline" size="icon" asChild={page < pageCount} disabled={page >= pageCount} aria-label={t("next")}>
        {page < pageCount ? <Link href={href(page + 1)}><Next /></Link> : <Next />}
      </Button>
    </nav>
  );
}
