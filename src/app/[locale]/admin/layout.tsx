import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: { default: t("title"), template: `%s | ${t("panel")}` }, robots: { index: false, follow: false } };
}

/** The admin has no storefront header or footer; the panel layout adds its own sidebar. Its client components get every message namespace. */
export default async function AdminRootLayout({ children }: LayoutProps<"/[locale]/admin">) {
  return (
    <NextIntlClientProvider messages={await getMessages()}>
      <div className="flex min-h-full flex-1 flex-col bg-muted/40">{children}</div>
    </NextIntlClientProvider>
  );
}
