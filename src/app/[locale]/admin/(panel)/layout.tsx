import { getLocale } from "next-intl/server";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "@/i18n/navigation";
import { getAdminSession } from "@/lib/admin/session";

/** Every page under the panel needs a session; without one the visitor goes to the login page. */
export default function AdminPanelLayout({ children }: LayoutProps<"/[locale]/admin">) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Guard>{children}</Guard>
    </Suspense>
  );
}

async function Guard({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect({ href: "/admin/login", locale: await getLocale() });
  return <AdminShell session={session!}>{children}</AdminShell>;
}

function PanelSkeleton() {
  return (
    <div className="flex flex-1">
      <Skeleton className="hidden w-64 rounded-none md:block" />
      <div className="flex-1 space-y-4 p-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  );
}
