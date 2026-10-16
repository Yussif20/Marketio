"use client";

import { LayoutDashboard, LogOut, Package, ShoppingBag, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { signOutAdmin } from "@/app/[locale]/admin/actions";
import { Button } from "@/components/ui/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", key: "orders", icon: ShoppingBag },
  { href: "/admin/products", key: "products", icon: Package },
] as const;

export function AdminNav() {
  const t = useTranslations("admin.nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("dashboard")} className="flex gap-1 overflow-x-auto px-2 pb-2 scrollbar-none md:flex-col md:px-3 md:pb-0">
      {LINKS.map(({ href, key, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              active && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
            )}
          >
            <Icon className="size-4" aria-hidden /> {t(key)}
          </Link>
        );
      })}
      <Link
        href="/"
        className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Store className="size-4" aria-hidden /> {t("store")}
      </Link>
      <SignOutButton className="shrink-0 md:hidden" />
    </nav>
  );
}

export function SignOutButton({ className }: { className?: string }) {
  const t = useTranslations("admin.nav");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("w-full md:w-full", className)}
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await signOutAdmin();
          router.replace("/admin/login");
        })
      }
    >
      <LogOut /> {t("signOut")}
    </Button>
  );
}
