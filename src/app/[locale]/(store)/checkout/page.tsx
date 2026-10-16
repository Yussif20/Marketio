import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { Skeleton } from "@/components/ui/skeleton";
import { getStripe } from "@/lib/stripe";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("checkout");
  return { title: t("title"), robots: { index: false } };
}

export default async function CheckoutPage({ searchParams }: PageProps<"/[locale]/checkout">) {
  const t = await getTranslations("checkout");

  return (
    <div className="container py-8 sm:py-10">
      <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>
      <Suspense fallback={<Skeleton className="h-[32rem] rounded-2xl" />}>
        <Checkout searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Checkout({ searchParams }: Pick<PageProps<"/[locale]/checkout">, "searchParams">) {
  const { cancelled } = await searchParams;
  return <CheckoutView cardEnabled={getStripe() !== null} cancelled={cancelled === "1"} />;
}
