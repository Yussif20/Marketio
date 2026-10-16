import { AlertTriangle, CircleDollarSign, Clock, ShoppingBag, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { dateFormatter, PageTitle, Panel, StatusBadge } from "@/components/admin/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getDashboardData } from "@/lib/admin/data";
import { getAdminSession, maskForDemo } from "@/lib/admin/session";
import { formatPrice } from "@/lib/product";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.dashboard");
  return { title: t("title") };
}

export default async function AdminDashboardPage() {
  const [t, checkout, locale, session, data] = await Promise.all([
    getTranslations("admin.dashboard"),
    getTranslations("checkout"),
    getLocale() as Promise<Locale>,
    getAdminSession(),
    getDashboardData(),
  ]);
  const dates = dateFormatter(locale);
  const dayLabel = new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en-US", { day: "numeric", month: "short", timeZone: "UTC" });
  const maxDaily = Math.max(...data.daily.map((d) => d.cents), 1);
  const totalMethods = Math.max(data.byMethod.reduce((sum, m) => sum + m.count, 0), 1);

  const kpis = [
    { label: t("revenue"), value: formatPrice(data.revenueCents), hint: t("revenueHint"), icon: CircleDollarSign },
    { label: t("orders"), value: String(data.orderCount), icon: ShoppingBag },
    { label: t("average"), value: formatPrice(data.averageCents), icon: TrendingUp },
    { label: t("pending"), value: String(data.pendingCount), icon: Clock },
  ];

  return (
    <>
      <PageTitle title={t("title")} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, hint, icon: Icon }) => (
          <div key={label} className="rounded-xl border bg-background p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {label}
              <Icon className="size-4" aria-hidden />
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums" dir="ltr">{value}</p>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Panel title={t("sales")} className="xl:col-span-2">
          <ol className="flex h-56 items-end gap-1.5 sm:gap-2" aria-label={t("sales")}>
            {data.daily.map((day) => {
              const label = dayLabel.format(new Date(`${day.day}T00:00:00Z`));
              return (
                <li key={day.day} className="group relative flex h-full flex-1 flex-col justify-end">
                  <span
                    className="block rounded-t-md bg-primary/80 transition-colors group-hover:bg-primary"
                    style={{ height: `${Math.max((day.cents / maxDaily) * 100, day.cents ? 4 : 1)}%` }}
                  />
                  <span className="sr-only">{`${label}: ${day.cents ? formatPrice(day.cents) : t("noSales")}`}</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-full start-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block rtl:translate-x-1/2"
                    dir="ltr"
                  >
                    {label} · {formatPrice(day.cents)}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground" aria-hidden>
            <span>{dayLabel.format(new Date(`${data.daily[0].day}T00:00:00Z`))}</span>
            <span>{dayLabel.format(new Date(`${data.daily.at(-1)!.day}T00:00:00Z`))}</span>
          </div>
        </Panel>

        <Panel title={t("methods")}>
          <ul className="space-y-4">
            {data.byMethod.map(({ method, count }) => (
              <li key={method}>
                <div className="flex justify-between text-sm">
                  <span>{checkout(`methods.${method}.title`)}</span>
                  <span className="tabular-nums text-muted-foreground">{count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(count / totalMethods) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Panel
          title={t("latest")}
          className="xl:col-span-2"
          action={<Link href="/admin/orders" className="text-sm font-medium text-primary hover:underline">{t("viewAll")}</Link>}
        >
          <ul className="divide-y">
            {data.latest.map((order) => (
              <li key={order.id}>
                <Link href={`/admin/orders/${order.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 hover:bg-muted/50">
                  <span className="font-medium" dir="ltr">{order.id}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                    {maskForDemo(order.customer.name, session!)} · {dates.format(new Date(order.createdAt))}
                  </span>
                  <StatusBadge status={order.status} label={checkout(`status.${order.status}`)} />
                  <span className="w-20 text-end font-semibold tabular-nums">{formatPrice(order.totalCents)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel title={t("lowStock")}>
            {data.lowStock.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noLowStock")}</p>
            ) : (
              <ProductList
                locale={locale}
                items={data.lowStock.map((p) => ({ product: p, meta: t("inStock", { count: p.stock }), warn: p.stock <= 2 }))}
              />
            )}
          </Panel>
          <Panel title={t("topProducts")}>
            <ProductList locale={locale} items={data.topProducts.map((p) => ({ product: p, meta: t("sold", { count: p.sold }) }))} />
          </Panel>
        </div>
      </div>
    </>
  );
}

function ProductList({
  items,
  locale,
}: {
  items: Array<{ product: Awaited<ReturnType<typeof getDashboardData>>["topProducts"][number]; meta: string; warn?: boolean }>;
  locale: Locale;
}) {
  return (
    <ul className="space-y-3">
      {items.map(({ product, meta, warn }) => (
        <li key={product.id}>
          <Link href={`/admin/products/${product.id}`} className="flex items-center gap-3 hover:opacity-80">
            <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">{product.title[locale]}</span>
            <span className={warn ? "flex items-center gap-1 text-xs font-medium text-destructive" : "text-xs text-muted-foreground"}>
              {warn && <AlertTriangle className="size-3.5" aria-hidden />}
              {meta}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
