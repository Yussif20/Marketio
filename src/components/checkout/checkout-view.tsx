"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, CreditCard, Loader2, Lock, MessageCircle, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { checkCoupon, placeOrder } from "@/app/[locale]/checkout/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRouter } from "@/i18n/navigation";
import { customerSchema, type CustomerInput } from "@/lib/checkout-schema";
import { useAuthUser } from "@/lib/firebase/use-auth";
import { formatPrice } from "@/lib/product";
import { shippingFor, unitPriceCents } from "@/lib/product-snapshot";
import { cn } from "@/lib/utils";
import { selectCartSubtotal, useCartStore } from "@/stores/cart";
import { useStoresHydrated } from "@/stores/hydration";
import type { PaymentMethod } from "@/types/order";

const METHODS = [
  { key: "card", icon: CreditCard },
  { key: "cod", icon: Banknote },
  { key: "whatsapp", icon: MessageCircle },
] as const;

export function CheckoutView({ cardEnabled, cancelled }: { cardEnabled: boolean; cancelled: boolean }) {
  const t = useTranslations("checkout");
  const cartT = useTranslations("cart");
  const locale = useLocale();
  const router = useRouter();
  const hydrated = useStoresHydrated();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const subtotal = useCartStore(selectCartSubtotal);
  const { user } = useAuthUser();
  const [method, setMethod] = useState<PaymentMethod>(cardEnabled ? "card" : "cod");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [pending, startTransition] = useTransition();

  const form = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", city: "", notes: "" },
    mode: "onTouched",
  });

  // Prefill from the signed-in account without overwriting anything typed.
  useEffect(() => {
    if (!user) return;
    if (!form.getValues("email") && user.email) form.setValue("email", user.email);
    if (!form.getValues("name") && user.displayName) form.setValue("name", user.displayName);
  }, [user, form]);

  useEffect(() => {
    if (cancelled) toast.info(t("cancelled"));
  }, [cancelled, t]);

  // Display estimate only: the server re-prices everything when the order is placed.
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const shipping = shippingFor(subtotal - discount);
  const total = subtotal - discount + shipping;

  async function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const result = await checkCoupon(code);
    if (result.ok) {
      setCoupon({ code, percent: result.percent });
      toast.success(t("couponApplied", { percent: result.percent }));
    } else {
      setCoupon(null);
      toast.error(t("errors.coupon"));
    }
  }

  const onSubmit = form.handleSubmit((customer) => {
    startTransition(async () => {
      const idToken = user ? await user.getIdToken() : undefined;
      const result = await placeOrder(
        {
          customer,
          paymentMethod: method,
          coupon: coupon?.code,
          idToken,
          items: items.map((item) => ({
            productId: item.product.id,
            colorIndex: item.colorIndex,
            optionId: item.optionId,
            quantity: item.quantity,
          })),
        },
        locale,
      );

      if (!result.ok) {
        toast.error(t(`errors.${result.error}`));
        return;
      }
      if (result.external) {
        // The cart is cleared on the success page, once Stripe confirms the payment.
        window.location.assign(result.redirectUrl);
        return;
      }
      // WhatsApp orders get a "send on WhatsApp" button on the success page: opening it
      // here would be blocked as a popup, since the click's user activation has expired.
      clear();
      router.push(result.redirectUrl);
    });
  });

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]" aria-busy>
        <Skeleton className="h-[32rem]" />
        <Skeleton className="h-80" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed px-6 py-16 text-center">
        <ShoppingBag className="size-12 text-muted-foreground" aria-hidden />
        <p className="mt-4 text-lg font-medium">{cartT("empty")}</p>
        <Button asChild className="mt-6">
          <Link href="/products">{t("browse")}</Link>
        </Button>
      </div>
    );
  }

  const field = (name: keyof CustomerInput, options: { type?: string; autoComplete?: string; ltr?: boolean } = {}) => {
    const error = form.formState.errors[name];
    return (
      <div className="space-y-2">
        <Label htmlFor={`checkout-${name}`}>{t(`fields.${name}`)}</Label>
        <Input
          id={`checkout-${name}`}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          dir={options.ltr ? "ltr" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `checkout-${name}-error` : undefined}
          className="h-11"
          {...form.register(name)}
        />
        {error?.message && (
          <p id={`checkout-${name}-error`} className="text-sm text-destructive">
            {t(`errors.${error.message as "name"}`)}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-8">
        <section aria-labelledby="contact-title" className="rounded-2xl border p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 id="contact-title" className="text-lg font-semibold">{t("contactTitle")}</h2>
            {!user && (
              <Link href="/account" className="text-sm font-medium text-primary hover:underline">
                {t("signInPrompt")}
              </Link>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("name", { autoComplete: "name" })}
            {field("email", { type: "email", autoComplete: "email", ltr: true })}
            {field("phone", { type: "tel", autoComplete: "tel", ltr: true })}
            {field("city", { autoComplete: "address-level2" })}
          </div>
          <div className="mt-5 space-y-5">
            {field("address", { autoComplete: "street-address" })}
            {field("notes")}
          </div>
        </section>

        <section aria-labelledby="payment-title" className="rounded-2xl border p-6">
          <h2 id="payment-title" className="mb-5 text-lg font-semibold">{t("paymentMethod")}</h2>
          <div role="radiogroup" aria-labelledby="payment-title" className="grid gap-3 sm:grid-cols-3">
            {METHODS.map(({ key, icon: Icon }) => {
              const disabled = key === "card" && !cardEnabled;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={method === key}
                  disabled={disabled}
                  onClick={() => setMethod(key)}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-xl border p-4 text-start transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                    method === key ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-foreground/40",
                  )}
                >
                  <Icon className={cn("size-6", method === key ? "text-primary" : "text-muted-foreground")} aria-hidden />
                  <span className="font-semibold">{t(`methods.${key}.title`)}</span>
                  <span className="text-xs text-muted-foreground">
                    {disabled ? t("methods.card.unavailable") : t(`methods.${key}.text`)}
                  </span>
                </button>
              );
            })}
          </div>
          {method === "card" && (
            <p className="mt-4 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">{t("testCardHint")}</p>
          )}
        </section>
      </div>

      <aside aria-labelledby="summary-title" className="space-y-5 rounded-2xl border p-6 lg:sticky lg:top-36">
        <h2 id="summary-title" className="text-lg font-semibold">{t("summary")}</h2>
        <ul className="max-h-72 space-y-4 overflow-y-auto pe-1">
          {items.map((item) => {
            const option = item.product.option?.values.find((v) => v.id === item.optionId);
            return (
              <li key={item.key} className="flex gap-3">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={item.product.images[item.colorIndex] ?? item.product.images[0]} alt="" fill sizes="64px" className="object-cover" />
                  <span className="absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                    {item.quantity}
                  </span>
                </span>
                <span className="flex-1 text-sm">
                  <span className="line-clamp-2 font-medium">{item.product.title[locale]}</span>
                  <span className="block text-muted-foreground">
                    {item.product.colors[item.colorIndex]?.name[locale]}
                    {option && <> · <bdi dir="ltr">{option.label}</bdi></>}
                  </span>
                </span>
                <span className="text-sm font-semibold tabular-nums">
                  {formatPrice(unitPriceCents(item.product, item.optionId) * item.quantity)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2">
          <Label htmlFor="coupon" className="sr-only">{t("coupon")}</Label>
          <div className="relative flex-1">
            <Tag className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="coupon"
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void applyCoupon();
                }
              }}
              placeholder={t("couponPlaceholder")}
              className="h-10 ps-9 uppercase"
              dir="ltr"
            />
          </div>
          <Button type="button" variant="secondary" className="h-10" onClick={applyCoupon}>
            {t("applyCoupon")}
          </Button>
        </div>

        <Separator />
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>{cartT("subtotal")}</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          {coupon && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
              <dt>{t("discount", { code: coupon.code })}</dt>
              <dd className="tabular-nums">−{formatPrice(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>{cartT("shipping")}</dt>
            <dd className="tabular-nums">{shipping === 0 ? cartT("free") : formatPrice(shipping)}</dd>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <dt>{cartT("total")}</dt>
            <dd className="tabular-nums">{formatPrice(total)}</dd>
          </div>
        </dl>

        <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" /> : method === "card" ? <Lock /> : null}
          {t(`submit.${method}`)}
        </Button>
        <p className="text-center text-xs text-muted-foreground">{t("demoNotice")}</p>
      </aside>
    </form>
  );
}
