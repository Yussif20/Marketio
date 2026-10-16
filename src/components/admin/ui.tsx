import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  paid: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  shipped: "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200",
  delivered: "bg-primary/10 text-primary",
  cancelled: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, label }: { status: OrderStatus; label: string }) {
  return <Badge className={cn("border-transparent", STATUS_STYLES[status])}>{label}</Badge>;
}

export function Panel({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border bg-background p-4 sm:p-5", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** Dates in admin tables: Latin digits in both locales, like prices. */
export function dateFormatter(locale: string, withTime = false) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en-US", {
    dateStyle: "medium",
    ...(withTime ? { timeStyle: "short" } : {}),
  });
}

/** Maps a failed admin action to its message key under `admin.errors`. */
export function actionErrorKey(error: string) {
  const keys = { demo: "demo", unauthorised: "unauthorised", invalid: "invalid", "not-admin": "notAdmin", "no-storage": "noStorage" } as const;
  return keys[error as keyof typeof keys] ?? "server";
}
