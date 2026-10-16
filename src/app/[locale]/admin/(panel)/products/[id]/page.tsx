import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductForm } from "@/components/admin/product-form";
import { PageTitle } from "@/components/admin/ui";
import { Link } from "@/i18n/navigation";
import { getAllProducts } from "@/lib/catalog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.products");
  return { title: t("editTitle") };
}

export default async function AdminProductPage({ params }: PageProps<"/[locale]/admin/products/[id]">) {
  const { id } = await params;
  const [t, products] = await Promise.all([getTranslations("admin.products"), getAllProducts()]);
  const product = products.find((p) => p.id === id);

  return (
    <>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden /> {t("back")}
      </Link>
      {product ? (
        <>
          <PageTitle title={t("editTitle")} />
          <ProductForm product={product} />
        </>
      ) : (
        <p className="text-muted-foreground">{t("notFound")}</p>
      )}
    </>
  );
}
