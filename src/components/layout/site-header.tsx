import { Search, Truck, User } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getMenuData } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { HeaderStoreLinks } from "./header-store-links";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { navLinks } from "./nav-links";
import { ThemeSwitcher } from "./theme-switcher";

export async function SiteHeader() {
  const t = await getTranslations("header");
  const banner = await getTranslations("topBanner");
  const locale = await getLocale();
  const menu = await getMenuData();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {t("skipToContent")}
      </a>

      <div className="bg-neutral-950 text-white">
        <div className="container flex h-9 items-center justify-between gap-4 text-xs">
          <p className="flex min-w-0 items-center gap-2 truncate">
            <Truck className="hidden size-4 shrink-0 sm:block" aria-hidden />
            <span className="truncate">{banner("text")}</span>
            <Link href="/products?sort=discount" className="hidden shrink-0 font-semibold underline underline-offset-4 sm:inline">
              {banner("cta")}
            </Link>
          </p>
          <div className="flex shrink-0 items-center gap-1 [&_button]:text-white [&_button]:hover:bg-white/10 [&_button]:hover:text-white">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="container flex h-16 items-center gap-2 sm:gap-4 lg:h-20">
          <MobileNav menu={menu} />
          <Logo />

          <form action={`/${locale}/products`} role="search" className="relative mx-auto hidden w-full max-w-2xl md:block">
            <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="h-11 w-full rounded-full border border-input bg-muted/60 ps-11 pe-28 text-sm outline-none transition focus:border-ring focus:bg-background focus:ring-3 focus:ring-ring/30"
            />
            <Button type="submit" size="sm" className="absolute end-1.5 top-1/2 h-8 -translate-y-1/2 rounded-full px-4">
              {t("search")}
            </Button>
          </form>

          <div className="ms-auto flex items-center gap-1 md:ms-0">
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/products" aria-label={t("search")}>
                <Search className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" className="hidden h-10 gap-2 px-3 lg:inline-flex" asChild>
              <Link href="/account">
                <User className="size-5" />
                <span className="text-start leading-tight">
                  <span className="block text-[11px] text-muted-foreground">{t("hello")}</span>
                  <span className="block text-sm font-semibold">{t("signIn")}</span>
                </span>
              </Link>
            </Button>
            <HeaderStoreLinks />
          </div>
        </div>
      </div>

      <div className="hidden border-b lg:block">
        <nav aria-label={t("categories")} className="container flex h-12 items-center gap-2">
          <MegaMenu menu={menu} />
          <div className="ms-auto flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  "highlight" in link && link.highlight && "text-primary",
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
