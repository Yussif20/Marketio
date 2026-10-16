import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Suspense } from "react";

/**
 * Storefront chrome: header, footer and the phone tab bar (the admin has its own layout).
 * The Suspense boundaries here and in the header are already resolved on the server;
 * they only let React hydrate each part in its own task, which keeps the main thread
 * free on slow phones.
 */
export default function StoreLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="flex min-h-full flex-1 flex-col pb-16 md:pb-0">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Suspense>
        <SiteFooter />
      </Suspense>
      <Suspense>
        <MobileTabBar />
      </Suspense>
    </div>
  );
}
