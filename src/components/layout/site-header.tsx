import { Search, User } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { HeaderStoreLinks } from "./header-store-links";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { navLinks } from "./nav-links";
import { ThemeSwitcher } from "./theme-switcher";

export async function SiteHeader() {
  const t = await getTranslations("header");
  const banner = await getTranslations("topBanner");
  const locale = await getLocale();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {t("skipToContent")}
      </a>

      <div className="bg-foreground text-background">
        <p className="container mx-auto px-4 py-2 text-center text-xs sm:text-sm">
          {banner("text")}{" "}
          <Link href="/products" className="font-semibold underline underline-offset-4">
            {banner("cta")}
          </Link>
        </p>
      </div>

      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
        <MobileNav />
        <Logo />

        <nav className="ms-6 hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <form
          action={`/${locale}/products`}
          role="search"
          className="relative ms-auto hidden w-full max-w-xs lg:block"
        >
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            name="q"
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="ps-9"
          />
        </form>

        <div className="ms-auto flex items-center gap-1 lg:ms-2">
          <LocaleSwitcher />
          <ThemeSwitcher />
          <HeaderStoreLinks />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account" aria-label={t("signIn")}>
              <User />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
