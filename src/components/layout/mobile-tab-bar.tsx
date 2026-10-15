"use client";

import { House, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { selectCartCount, useCartStore } from "@/stores/cart";
import { useStoresHydrated } from "@/stores/hydration";

const tabs = [
  { href: "/", key: "home", icon: House },
  { href: "/search", key: "search", icon: Search },
  { href: "/products", key: "shop", icon: LayoutGrid },
  { href: "/cart", key: "cart", icon: ShoppingCart },
  { href: "/account", key: "account", icon: User },
] as const;

/** App-style bottom navigation on phones; hidden from the md breakpoint up. */
export function MobileTabBar() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const hydrated = useStoresHydrated();
  const cartCount = useCartStore(selectCartCount);

  return (
    <nav
      aria-label={t("tabBar")}
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ href, key, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={key}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 py-2 text-[11px]",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" aria-hidden />
                {t(key)}
                {key === "cart" && hydrated && cartCount > 0 && (
                  <span className="absolute start-[calc(50%+4px)] top-1 min-w-4 rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
