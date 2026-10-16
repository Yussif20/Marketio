import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { dateFormatter, Panel, StatusBadge } from "@/components/admin/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getAdminSession, maskForDemo } from "@/lib/admin/session";
import { getOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/product";

export async function generateMetadata({ params }: PageProps<"/[locale]/admin/orders/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: id };
}

export default async function AdminOrderPage({ params }: PageProps<"/[locale]/admin/orders/[id]">) {
  const { id } = await params;
  await connection();
  const [t, checkout, cart, locale, session, order] = await Promise.all([
    getTranslations("admin.orders"),
    getTranslations("checkout"),
    getTranslations("cart"),
    getLocale() as Promise<Locale>,
    getAdminSession(),
    /^[A-Za-z0-9-]{3,40}$/.test(id) ? getOrder(id) : null,
  ]);

  const back = (
    <Link href="/admin/orders" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden /> {t("back")}
    </Link>
  );
  if (!order) return <>{back}<p className="text-muted-foreground">{t("notFound")}</p></>;

  const mask = (value: string) => maskForDemo(value, session!);
  const rows = [
    [t("subtotal"), formatPrice(order.subtotalCents)],
    ...(order.discountCents ? [[`${t("discount")}${order.coupon ? ` (${order.coupon})` : ""}`, `-${formatPrice(order.discountCents)}`]] : []),
    [t("shipping"), order.shippingCents ? formatPrice(order.shippingCents) : cart("free")],
  ];

  return (
    <>
      {back}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold" dir="ltr">{order.id}</h1>
        <StatusBadge status={order.status} label={checkout(`status.${order.status}`)} />
        <span className="text-sm text-muted-foreground">
          {dateFormatter(locale, true).format(new Date(order.createdAt))} · {checkout(`methods.${order.paymentMethod}.title`)}
        </span>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel title={t("items")}>
            <ul className="divide-y">
              {order.items.map((item) => (
                <li key={`${item.productId}-${item.color?.en ?? ""}-${item.option ?? ""}`} className="flex items-center gap-3 py-3">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/products/${item.productId}`} className="font-medium hover:underline">{item.title[locale]}</Link>
                    <p className="text-xs text-muted-foreground">
                      {[item.color?.[locale], item.option].filter(Boolean).map((part, i) => (
                        <span key={i}><bdi dir={part === item.option ? "ltr" : undefined}>{part}</bdi> · </span>
                      ))}
                      {t("quantity")}: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums">{formatPrice(item.priceCents * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-2 border-t pt-3 text-sm">
              {rows.map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="tabular-nums" dir="ltr">{value}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2 text-base font-semibold">
                <dt>{t("total")}</dt>
                <dd className="tabular-nums">{formatPrice(order.totalCents)}</dd>
              </div>
            </dl>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel title={t("changeStatus")}>
            <OrderStatusSelect orderId={order.id} status={order.status} />
          </Panel>
          <Panel title={t("details")}>
            <dl className="space-y-3 text-sm">
              {[
                [t("customer"), mask(order.customer.name)],
                [checkout("fields.email"), mask(order.customer.email), "ltr"],
                [t("phone"), mask(order.customer.phone), "ltr"],
                [t("address"), [mask(order.customer.address), mask(order.customer.city)].filter(Boolean).join("، ")],
                ...(order.customer.notes ? [[t("notes"), mask(order.customer.notes)]] : []),
              ].map(([label, value, dir]) => (
                <div key={label}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-0.5 break-words" dir={(dir as "ltr" | undefined) ?? "auto"}>{value}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>
    </>
  );
}
