import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CartView } from "@/components/cart/cart-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cart");
  return { title: t("title"), robots: { index: false } };
}

export default async function CartPage() {
  const t = await getTranslations("cart");

  return (
    <div className="container mx-auto px-4 py-8 sm:py-10">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">{t("title")}</h1>
      <CartView />
    </div>
  );
}
