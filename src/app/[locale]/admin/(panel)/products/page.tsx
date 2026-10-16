import { Plus, Search } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { PageTitle } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getAllProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/product";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.products");
  return { title: t("title") };
}

export default async function AdminProductsPage({ searchParams }: PageProps<"/[locale]/admin/products">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().toLowerCase() : "";
  const [t, categories, locale, products] = await Promise.all([
    getTranslations("admin.products"),
    getTranslations("categories"),
    getLocale() as Promise<Locale>,
    getAllProducts(),
  ]);
  const filtered = query
    ? products.filter((p) => [p.id, p.title.en, p.title.ar, p.brand].join(" ").toLowerCase().includes(query))
    : products;

  return (
    <>
      <PageTitle
        title={t("title")}
        subtitle={t("count", { count: filtered.length })}
        action={
          <Button asChild>
            <Link href="/admin/products/new"><Plus /> {t("new")}</Link>
          </Button>
        }
      />

      <form className="relative mb-4 sm:w-80" role="search">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input name="q" defaultValue={query} placeholder={t("search")} aria-label={t("search")} className="h-10 bg-background ps-9" />
      </form>

      <div className="overflow-x-auto rounded-xl border bg-background">
        <table className="w-full min-w-2xl text-sm">
          <thead className="border-b bg-muted/50 text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 text-start font-medium">{t("product")}</th>
              <th scope="col" className="px-4 py-3 text-start font-medium">{t("category")}</th>
              <th scope="col" className="px-4 py-3 text-end font-medium">{t("price")}</th>
              <th scope="col" className="px-4 py-3 text-end font-medium">{t("stock")}</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">{t("edit")}</span></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-muted/40">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={product.images[0]} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{product.title[locale]}</p>
                      <p className="text-xs capitalize text-muted-foreground">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{categories(product.category)}</td>
                <td className="px-4 py-2.5 text-end tabular-nums">
                  {formatPrice(product.priceCents)}
                  {product.oldPriceCents && <span className="ms-2 text-xs text-muted-foreground line-through">{formatPrice(product.oldPriceCents)}</span>}
                </td>
                <td className={cn("px-4 py-2.5 text-end tabular-nums", product.stock <= 5 && "font-semibold text-destructive")}>{product.stock}</td>
                <td className="px-4 py-2.5 text-end">
                  <Link href={`/admin/products/${product.id}`} className="font-medium text-primary hover:underline">{t("edit")}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
