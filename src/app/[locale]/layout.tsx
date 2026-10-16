import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/sonner";
import { localeDirection, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { StoreHydration } from "@/stores/hydration";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Not preloaded: the CSS unicode-range means English pages never download it, and on
// Arabic pages it would compete with the hero image for bandwidth. Medium (500)
// text uses the 400 file, which saves a whole extra weight.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

/**
 * Namespaces that client components read. The rest (page copy, policies, the
 * admin) is only used on the server, so it isn't serialized into every page.
 * The admin layout passes the full set to its own provider.
 */
const CLIENT_NAMESPACES = [
  "account", "buttons", "cart", "categories", "checkout", "contact", "countdown", "footer",
  "header", "home", "language", "listing", "options", "product", "subcategories", "theme", "wishlist",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: "%s | Marketio" },
    description: t("description"),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, `/${locale}`])),
    },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const dir = localeDirection[locale];
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((key) => [key, messages[key]]));

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${plexArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={clientMessages}>
          <ThemeProvider>
            <DirectionProvider dir={dir}>
              {children}
              <Toaster dir={dir} position={dir === "rtl" ? "bottom-left" : "bottom-right"} />
              <StoreHydration />
            </DirectionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
