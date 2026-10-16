import { CheckCircle2, Clock, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ClearCart } from "@/components/checkout/clear-cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { getOrder, updateOrder, whatsAppLink } from "@/lib/orders";
import { formatPrice } from "@/lib/product";
import { getStripe } from "@/lib/stripe";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("checkout");
  return { title: t("successTitle"), robots: { index: false } };
}

export default function SuccessPage({ searchParams }: PageProps<"/[locale]/checkout/success">) {
  return (
    <div className="container max-w-3xl py-10 sm:py-14">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <OrderConfirmation searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function OrderConfirmation({ searchParams }: Pick<PageProps<"/[locale]/checkout/success">, "searchParams">) {
  const params = await searchParams;
  // Orders are live data: always read them at request time.
  await connection();
  const orderId = typeof params.order === "string" ? params.order : "";
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;
  let order = await getOrder(orderId);
  if (!order) notFound();

  // Confirm card payments directly with Stripe, so the page is right even if the webhook is late.
  const stripe = getStripe();
  if (order.paymentMethod === "card" && order.status === "pending" && sessionId && stripe) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.orderId === order.id && session.payment_status === "paid") {
      await updateOrder(order.id, { status: "paid" });
      order = { ...order, status: "paid" };
    }
  }

  const t = await getTranslations("checkout");
  const cartT = await getTranslations("cart");
  const locale = await getLocale();
  const paid = order.status === "paid";
  const awaitingCard = order.paymentMethod === "card" && !paid;
  // Only clear the cart straight after placing the order, not when revisiting it from the account page.
  const justPlaced = params.new === "1" || (sessionId !== undefined && paid);

  return (
    <div className="space-y-8">
      {justPlaced && <ClearCart />}

      <header className="text-center">
        {awaitingCard ? (
          <Clock className="mx-auto size-14 text-amber-500" aria-hidden />
        ) : (
          <CheckCircle2 className="mx-auto size-14 text-emerald-600" aria-hidden />
        )}
        <h1 className="mt-4 text-3xl font-bold">{awaitingCard ? t("awaitingTitle") : t("successTitle")}</h1>
        <p className="mt-2 text-muted-foreground">{t(`successText.${order.paymentMethod}`)}</p>
        <p className="mt-4 inline-block rounded-full bg-muted px-4 py-1.5 text-sm">
          {t("orderNumber")} <span className="font-semibold" dir="ltr">{order.id}</span>
        </p>
      </header>

      {order.paymentMethod === "whatsapp" && (
        <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 p-6 text-center dark:bg-emerald-950/30">
          <p className="font-medium">{t("whatsappStep")}</p>
          <Button size="lg" className="mt-4 h-11 bg-emerald-600 px-6 hover:bg-emerald-700" asChild>
            <a href={whatsAppLink(order)} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> {t("whatsappButton")}
            </a>
          </Button>
        </div>
      )}

      <section aria-labelledby="order-items" className="rounded-2xl border p-6">
        <h2 id="order-items" className="mb-4 text-lg font-semibold">{t("summary")}</h2>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.color?.en}-${item.option}`} className="flex gap-3">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="flex-1 text-sm">
                <Link href={`/products/${item.slug}`} className="font-medium hover:underline">{item.title[locale]}</Link>
                <span className="block text-muted-foreground">
                  {item.color?.[locale]}
                  {item.option && <> · <bdi dir="ltr">{item.option}</bdi></>} · × {item.quantity}
                </span>
              </span>
              <span className="text-sm font-semibold tabular-nums">{formatPrice(item.priceCents * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between"><dt>{cartT("subtotal")}</dt><dd className="tabular-nums">{formatPrice(order.subtotalCents)}</dd></div>
          {order.discountCents > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
              <dt>{t("discount", { code: order.coupon ?? "" })}</dt>
              <dd className="tabular-nums">−{formatPrice(order.discountCents)}</dd>
            </div>
          )}
          <div className="flex justify-between"><dt>{cartT("shipping")}</dt><dd className="tabular-nums">{order.shippingCents ? formatPrice(order.shippingCents) : cartT("free")}</dd></div>
          <div className="flex justify-between text-base font-semibold"><dt>{cartT("total")}</dt><dd className="tabular-nums">{formatPrice(order.totalCents)}</dd></div>
        </dl>
        <Separator className="my-4" />
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div><dt className="text-muted-foreground">{t("paymentMethod")}</dt><dd className="font-medium">{t(`methods.${order.paymentMethod}.title`)}</dd></div>
          <div><dt className="text-muted-foreground">{t("statusLabel")}</dt><dd className="font-medium">{t(`status.${order.status}`)}</dd></div>
        </dl>
      </section>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild><Link href="/products">{t("keepShopping")}</Link></Button>
        <Button variant="outline" asChild><Link href="/account">{t("viewOrders")}</Link></Button>
      </div>
    </div>
  );
}
