import { Eye, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { AdminSession } from "@/lib/admin/session";
import { AdminNav, SignOutButton } from "./admin-nav";

export async function AdminShell({ session, children }: { session: AdminSession; children: React.ReactNode }) {
  const t = await getTranslations("admin");

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="flex flex-col border-b bg-background md:sticky md:top-0 md:h-dvh md:w-64 md:shrink-0 md:border-e md:border-b-0">
        <div className="flex h-16 items-center justify-between gap-2 px-4 md:px-6">
          <Link href="/admin" dir="ltr" className="text-lg font-bold tracking-tight" aria-label={t("panel")}>
            MAR<span className="text-primary">KET</span>IO
            <span className="ms-2 text-xs font-medium text-muted-foreground">admin</span>
          </Link>
          <div className="flex items-center md:hidden">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
        <AdminNav />
        <div className="mt-auto hidden space-y-3 border-t p-4 md:block">
          <Badge variant={session.role === "admin" ? "default" : "secondary"} className="gap-1">
            {session.role === "admin" ? <ShieldCheck aria-hidden /> : <Eye aria-hidden />}
            {t(`role.${session.role}`)}
          </Badge>
          {session.role === "admin" && (
            <p className="truncate text-xs text-muted-foreground" dir="ltr">{session.email}</p>
          )}
          <div className="flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
          <SignOutButton />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {session.role === "demo" && (
          <p role="status" className="flex items-center gap-2 border-b bg-amber-100 px-4 py-2.5 text-sm text-amber-950 md:px-8 dark:bg-amber-950 dark:text-amber-100">
            <Eye className="size-4 shrink-0" aria-hidden /> {t("demoBanner")}
          </p>
        )}
        <main id="main" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
