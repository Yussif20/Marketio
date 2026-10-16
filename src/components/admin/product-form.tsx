"use client";

import { ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState, useTransition } from "react";
import { toast } from "@/lib/toast";
import { saveProduct, uploadProductImage, type ProductFormInput } from "@/app/[locale]/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { BRANDS, CATEGORIES, SUBCATEGORIES, type Category, type Product } from "@/types/product";
import { actionErrorKey, Panel } from "./ui";

const selectClass =
  "h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";
const textareaClass =
  "min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

/** Local files under /public or Vercel Blob uploads: the only hosts next/image is allowed to load. */
const IMAGE_PATH = /^(\/[\w./-]+|https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/\S+)$/;
const toDollars = (cents?: number) => (cents === undefined ? "" : (cents / 100).toFixed(2));
const toCents = (dollars: string) => (dollars.trim() === "" ? undefined : Math.round(Number(dollars) * 100));

export function ProductForm({ product }: { product?: Product }) {
  const t = useTranslations("admin");
  const f = useTranslations("admin.products.fields");
  const categoryT = useTranslations("categories");
  const subT = useTranslations("subcategories");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState<Category>(product?.category ?? CATEGORIES[0]);
  const [subcategory, setSubcategory] = useState<string>(product?.subcategory ?? SUBCATEGORIES[CATEGORIES[0]][0]);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const idInput = useRef<HTMLInputElement>(null);

  const fail = (error: string) => toast.error(t(`errors.${actionErrorKey(error)}`));

  function onCategoryChange(next: Category) {
    setCategory(next);
    setSubcategory(SUBCATEGORIES[next][0]);
  }

  async function onUpload(file: File) {
    const formData = new FormData();
    formData.set("file", file);
    formData.set("productId", product?.id ?? idInput.current?.value.trim() ?? "");
    setUploading(true);
    try {
      const result = await uploadProductImage(formData);
      if (result.ok) {
        setImages((current) => [...current, result.url]);
        toast.success(t("products.uploaded"));
      } else fail(result.error);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  function addImageUrl() {
    const value = imageUrl.trim();
    if (IMAGE_PATH.test(value)) {
      setImages((current) => [...current, value]);
      setImageUrl("");
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "");
    const input: ProductFormInput = {
      id: product?.id ?? value("id").trim(),
      isNew: !product,
      title: { en: value("titleEn"), ar: value("titleAr") },
      description: { en: value("descriptionEn"), ar: value("descriptionAr") },
      brand: value("brand") as ProductFormInput["brand"],
      category,
      subcategory,
      priceCents: toCents(value("price")) ?? 0,
      oldPriceCents: toCents(value("oldPrice")),
      stock: Number(value("stock")),
      featured,
      images,
    };
    startTransition(async () => {
      const result = await saveProduct(input);
      if (!result.ok) {
        fail(result.error);
        return;
      }
      toast.success(t("products.saved"));
      if (!product) router.replace(`/admin/products/${result.id}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-4 xl:grid-cols-3">
      <div className="space-y-4 xl:col-span-2">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            {!product && (
              <Field id="id" label={f("id")} hint={f("idHint")} className="sm:col-span-2">
                <Input ref={idInput} id="id" name="id" required pattern="[a-z0-9-]{3,80}" dir="ltr" className="h-10" />
              </Field>
            )}
            <Field id="titleEn" label={f("titleEn")}>
              <Input id="titleEn" name="titleEn" required minLength={2} maxLength={200} defaultValue={product?.title.en} dir="ltr" className="h-10" />
            </Field>
            <Field id="titleAr" label={f("titleAr")}>
              <Input id="titleAr" name="titleAr" required minLength={2} maxLength={200} defaultValue={product?.title.ar} dir="rtl" lang="ar" className="h-10" />
            </Field>
            <Field id="descriptionEn" label={f("descriptionEn")}>
              <textarea id="descriptionEn" name="descriptionEn" required minLength={10} maxLength={2000} defaultValue={product?.description.en} dir="ltr" className={textareaClass} />
            </Field>
            <Field id="descriptionAr" label={f("descriptionAr")}>
              <textarea id="descriptionAr" name="descriptionAr" required minLength={10} maxLength={2000} defaultValue={product?.description.ar} dir="rtl" lang="ar" className={textareaClass} />
            </Field>
          </div>
        </Panel>

        <Panel title={f("images")}>
          <p className="-mt-2 mb-4 text-xs text-muted-foreground">{f("imagesHint")}</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((src, index) => (
              <li key={`${src}-${index}`} className={cn("group relative aspect-square overflow-hidden rounded-lg border bg-muted", index === 0 && "ring-2 ring-primary")}>
                <Image src={src} alt="" fill sizes="160px" className="object-cover" />
                <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1">
                  {index > 0 ? (
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      aria-label={f("moveFirst")}
                      title={f("moveFirst")}
                      onClick={() => setImages((current) => [src, ...current.filter((_, i) => i !== index)])}
                    >
                      <Star />
                    </Button>
                  ) : <span />}
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="secondary"
                    aria-label={f("remove")}
                    title={f("remove")}
                    onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            ))}
            {images.length < 8 && (
              <li>
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  disabled={uploading}
                  className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm text-muted-foreground hover:bg-muted"
                >
                  {uploading ? <Loader2 className="size-5 animate-spin" /> : <ImagePlus className="size-5" aria-hidden />}
                  {f("upload")}
                </button>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/webp,image/jpeg,image/png"
                  className="sr-only"
                  tabIndex={-1}
                  aria-label={f("upload")}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void onUpload(file);
                  }}
                />
              </li>
            )}
          </ul>
          <div className="mt-4 flex gap-2">
            <Input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="/products/…/1.webp"
              aria-label={f("imageUrl")}
              dir="ltr"
              className="h-10"
            />
            <Button type="button" variant="outline" className="h-10" onClick={addImageUrl}>{f("add")}</Button>
          </div>
        </Panel>
      </div>

      <div className="space-y-4">
        <Panel>
          <div className="space-y-4">
            <Field id="brand" label={f("brand")}>
              <select id="brand" name="brand" defaultValue={product?.brand ?? BRANDS[0]} className={cn(selectClass, "capitalize")}>
                {BRANDS.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </Field>
            <Field id="category" label={f("category")}>
              <select id="category" value={category} onChange={(event) => onCategoryChange(event.target.value as Category)} className={selectClass}>
                {CATEGORIES.map((value) => <option key={value} value={value}>{categoryT(value)}</option>)}
              </select>
            </Field>
            <Field id="subcategory" label={f("subcategory")}>
              <select id="subcategory" value={subcategory} onChange={(event) => setSubcategory(event.target.value)} className={selectClass}>
                {SUBCATEGORIES[category].map((value) => <option key={value} value={value}>{subT(value)}</option>)}
              </select>
            </Field>
          </div>
        </Panel>

        <Panel>
          <div className="space-y-4">
            <Field id="price" label={f("price")}>
              <Input id="price" name="price" type="number" required min="1" step="0.01" defaultValue={toDollars(product?.priceCents)} dir="ltr" className="h-10" />
            </Field>
            <Field id="oldPrice" label={f("oldPrice")}>
              <Input id="oldPrice" name="oldPrice" type="number" min="1" step="0.01" defaultValue={toDollars(product?.oldPriceCents)} dir="ltr" className="h-10" />
            </Field>
            <Field id="stock" label={f("stock")}>
              <Input id="stock" name="stock" type="number" required min="0" step="1" defaultValue={product?.stock ?? 0} dir="ltr" className="h-10" />
            </Field>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="featured">{f("featured")}</Label>
              <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
            </div>
          </div>
        </Panel>

        <Button type="submit" size="lg" className="h-11 w-full" disabled={pending || uploading || images.length === 0}>
          {pending && <Loader2 className="animate-spin" />}
          {product ? t("products.save") : t("products.create")}
        </Button>
      </div>
    </form>
  );
}

function Field({ id, label, hint, className, children }: { id: string; label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
