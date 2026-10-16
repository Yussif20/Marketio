import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: { default: t("title"), template: `%s | ${t("panel")}` }, robots: { index: false, follow: false } };
}

/** The admin has no storefront header or footer; the panel layout adds its own sidebar. */
export default function AdminRootLayout({ children }: LayoutProps<"/[locale]/admin">) {
  return <div className="flex min-h-full flex-1 flex-col bg-muted/40">{children}</div>;
}
