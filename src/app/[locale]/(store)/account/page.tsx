import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AccountView } from "@/components/account/account-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("account");
  return { title: t("title"), robots: { index: false } };
}

export default function AccountPage() {
  return (
    <div className="container py-8 sm:py-12">
      <AccountView />
    </div>
  );
}
