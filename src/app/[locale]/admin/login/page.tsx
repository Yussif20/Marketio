import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AdminLogin } from "@/components/admin/admin-login";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.login");
  return { title: t("title") };
}

export default function AdminLoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 py-12">
      <AdminLogin />
    </div>
  );
}
