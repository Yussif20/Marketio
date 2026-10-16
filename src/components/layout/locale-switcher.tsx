"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * With two languages a single button that switches to the other one is enough,
 * and it keeps the dropdown library out of every page's JavaScript.
 */
export function LocaleSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = routing.locales.find((option) => option !== locale) as Locale;

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`${t("label")}: ${t(other)}`}
      onClick={() =>
        // Keep filters and search: read the query at click time instead of useSearchParams,
        // which would need a Suspense boundary around the header.
        router.replace(`${pathname}${window.location.search}`, { locale: other })
      }
    >
      <Languages />
      <span className="hidden sm:inline" lang={other}>{t(other)}</span>
    </Button>
  );
}
