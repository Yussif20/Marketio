"use client";

import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { Loader2, LogOut, Package } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { getMyOrders } from "@/app/[locale]/(store)/account/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { useAuthUser } from "@/lib/firebase/use-auth";
import { formatPrice } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/order";

export function AccountView() {
  const { user, ready } = useAuthUser();
  if (!ready) return <Skeleton className="mx-auto h-96 max-w-md rounded-2xl" />;
  return user ? <Profile user={user} /> : <AuthForms />;
}

/** Maps Firebase error codes to message keys under `account.errors`. */
function errorKey(error: unknown) {
  const code = error instanceof FirebaseError ? error.code : "";
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") return "credentials";
  if (code === "auth/email-already-in-use") return "inUse";
  if (code === "auth/weak-password") return "weak";
  if (code === "auth/invalid-email") return "email";
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return null;
  if (code === "auth/unauthorized-domain") return "domain";
  return "generic";
}

function AuthForms() {
  const t = useTranslations("account");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [pending, startTransition] = useTransition();

  function run(task: () => Promise<unknown>) {
    startTransition(async () => {
      try {
        await task();
        toast.success(t("welcome"));
      } catch (error) {
        const key = errorKey(error);
        if (key) toast.error(t(`errors.${key}`));
      }
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "").trim();
    const auth = getFirebaseAuth();
    run(async () => {
      if (mode === "signin") return signInWithEmailAndPassword(auth, email, password);
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(credential.user, { displayName: name });
    });
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border p-6 sm:p-8">
      <div role="tablist" className="mb-6 grid grid-cols-2 rounded-lg bg-muted p-1">
        {(["signin", "signup"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            onClick={() => setMode(key)}
            className={cn("rounded-md py-2 text-sm font-medium", mode === key && "bg-background shadow-sm")}
          >
            {t(`tabs.${key}`)}
          </button>
        ))}
      </div>

      <h1 className="text-2xl font-bold">{t(`${mode}Title`)}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t(`${mode}Text`)}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="account-name">{t("name")}</Label>
            <Input id="account-name" name="name" autoComplete="name" className="h-11" />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="account-email">{t("email")}</Label>
          <Input id="account-email" name="email" type="email" required autoComplete="email" className="h-11" dir="ltr" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="account-password">{t("password")}</Label>
          <Input
            id="account-password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="h-11"
            dir="ltr"
          />
        </div>
        <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          {t(`${mode}Button`)}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <Separator className="flex-1" /> {t("or")} <Separator className="flex-1" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 w-full"
        disabled={pending}
        onClick={() => run(() => signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider()))}
      >
        <GoogleMark /> {t("google")}
      </Button>
      <p className="mt-6 text-center text-xs text-muted-foreground">{t("demoNotice")}</p>
    </div>
  );
}

function Profile({ user }: { user: User }) {
  const t = useTranslations("account");
  const checkoutT = useTranslations("checkout");
  const locale = useLocale();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const dateFormat = new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en-US", { dateStyle: "medium" });

  useEffect(() => {
    let active = true;
    user
      .getIdToken()
      .then(getMyOrders)
      .then((result) => {
        if (active) setOrders(result.ok ? result.orders : []);
      });
    return () => {
      active = false;
    };
  }, [user]);

  const name = user.displayName || user.email || "";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[18rem_1fr]">
      <aside className="rounded-2xl border p-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground" aria-hidden>
          {name[0]?.toUpperCase()}
        </span>
        <p className="mt-4 font-semibold">{user.displayName || t("customer")}</p>
        <p className="text-sm text-muted-foreground" dir="ltr">{user.email}</p>
        <Button variant="outline" className="mt-6 w-full" onClick={() => signOut(getFirebaseAuth())}>
          <LogOut /> {t("signOut")}
        </Button>
      </aside>

      <section aria-labelledby="orders-title">
        <h1 id="orders-title" className="mb-4 text-2xl font-bold">{t("myOrders")}</h1>
        {orders === null ? (
          <div className="space-y-3">{[0, 1].map((i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}</div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed px-6 py-14 text-center">
            <Package className="size-10 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-medium">{t("noOrders")}</p>
            <Button className="mt-5" asChild><Link href="/products">{checkoutT("keepShopping")}</Link></Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="rounded-2xl border p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold" dir="ltr">{order.id}</p>
                  <Badge variant={order.status === "paid" || order.status === "delivered" ? "default" : "secondary"}>
                    {checkoutT(`status.${order.status}`)}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {dateFormat.format(new Date(order.createdAt))} · {checkoutT(`methods.${order.paymentMethod}.title`)}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {order.items.map((item) => (
                    <span key={`${item.productId}-${item.option}`} className="relative size-12 overflow-hidden rounded-lg bg-muted" title={item.title[locale]}>
                      <Image src={item.image} alt={item.title[locale]} fill sizes="48px" className="object-cover" />
                    </span>
                  ))}
                  <span className="ms-auto font-semibold tabular-nums">{formatPrice(order.totalCents)}</span>
                </div>
                <Link href={`/checkout/success?order=${order.id}`} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                  {t("viewOrder")}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9h-4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6h-4a12 12 0 0 0 0 10.9l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  );
}
