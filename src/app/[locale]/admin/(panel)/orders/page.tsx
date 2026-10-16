import { Search } from "lucide-react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { dateFormatter, PageTitle, StatusBadge } from "@/components/admin/ui";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { listOrders } from "@/lib/admin/data";
import { getAdminSession, maskForDemo } from "@/lib/admin/session";
import { formatPrice } from "@/lib/product";
import { cn } from "@/lib/utils";
import { ORDER_STATUSES, type OrderStatus } from "@/types/order";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.orders");
  return { title: t("title") };
}

export default async function AdminOrdersPage({ searchParams }: PageProps<"/[locale]/admin/orders">) {
  const params = await searchParams;
  const status = ORDER_STATUSES.includes(params.status as OrderStatus) ? (params.status as OrderStatus) : undefined;
  const query = typeof params.q === "string" ? params.q.trim().toLowerCase() : "";

  const [t, checkout, locale, session, orders] = await Promise.all([
    getTranslations("admin.orders"),
    getTranslations("checkout"),
    getLocale(),
    getAdminSession(),
    listOrders(),
  ]);
  const dates = dateFormatter(locale, true);

  // Demo viewers only see masked customer details, so they can only search by order number.
  const searchable = (o: (typeof orders)[number]) =>
    session!.role === "admin" ? [o.id, o.customer.name, o.customer.email].join(" ").toLowerCase() : o.id.toLowerCase();
  const filtered = orders.filter((o) => (!status || o.status === status) && (!query || searchable(o).includes(query)));

  const tabHref = (value?: OrderStatus) => ({ pathname: "/admin/orders", query: { ...(value && { status: value }), ...(query && { q: query }) } });

  return (
    <>
      <PageTitle title={t("title")} subtitle={t("count", { count: filtered.length })} />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <nav className="flex gap-1 overflow-x-auto scrollbar-none" aria-label={t("status")}>
          {[undefined, ...ORDER_STATUSES].map((value) => (
            <Link
              key={value ?? "all"}
              href={tabHref(value)}
              aria-current={status === value ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-sm",
                status === value ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted",
              )}
            >
              {value ? checkout(`status.${value}`) : t("all")}
              <span className="ms-1.5 tabular-nums opacity-70">{value ? orders.filter((o) => o.status === value).length : orders.length}</span>
            </Link>
          ))}
        </nav>
        <form className="relative lg:w-80" role="search">
          {status && <input type="hidden" name="status" value={status} />}
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input name="q" defaultValue={query} placeholder={t("search")} aria-label={t("search")} className="h-10 bg-background ps-9" />
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-background">
        <table className="w-full min-w-3xl text-sm">
          <thead className="border-b bg-muted/50 text-start text-xs text-muted-foreground">
            <tr>
              {[t("order"), t("date"), t("customer"), t("payment"), t("status")].map((label) => (
                <th key={label} scope="col" className="px-4 py-3 text-start font-medium">{label}</th>
              ))}
              <th scope="col" className="px-4 py-3 text-end font-medium">{t("total")}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="font-medium text-primary hover:underline" dir="ltr">{order.id}</Link>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{dates.format(new Date(order.createdAt))}</td>
                <td className="px-4 py-3">
                  <p dir="auto">{maskForDemo(order.customer.name, session!)}</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">{maskForDemo(order.customer.email, session!)}</p>
                </td>
                <td className="px-4 py-3">{checkout(`methods.${order.paymentMethod}.title`)}</td>
                <td className="px-4 py-3"><StatusBadge status={order.status} label={checkout(`status.${order.status}`)} /></td>
                <td className="px-4 py-3 text-end font-semibold tabular-nums">{formatPrice(order.totalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-10 text-center text-sm text-muted-foreground">{t("empty")}</p>}
      </div>
    </>
  );
}
