import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { journalPosts } from "@/data/content/journal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProductsBySlugs } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

const findPost = (slug: string) => journalPosts.find((post) => post.slug === slug);

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const locale = await getLocale();
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/journal/${slug}`])) },
    openGraph: { type: "article", images: [post.cover], publishedTime: post.date },
  };
}

export default function ArticlePage({ params }: PageProps<"/[locale]/journal/[slug]">) {
  return (
    <Suspense fallback={<div className="container max-w-3xl py-10"><Skeleton className="aspect-[16/9] rounded-2xl" /></div>}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: Pick<PageProps<"/[locale]/journal/[slug]">, "params">) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const locale = await getLocale();
  const t = await getTranslations();
  const products = await getProductsBySlugs(post.products);
  const dateFormat = new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en-US", { dateStyle: "long" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    description: post.excerpt[locale],
    image: absoluteUrl(post.cover),
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "Marketio" },
  };

  return (
    <div className="container space-y-14 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <article className="mx-auto max-w-3xl">
        <nav aria-label={t("product.breadcrumb")} className="mb-6 text-sm text-muted-foreground">
          <Link href="/journal" className="hover:text-foreground">{t("journal.title")}</Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time> · {t("journal.minutes", { count: post.readingMinutes })}
        </p>
        <h1 className="mt-2 text-3xl leading-tight font-bold sm:text-5xl">{post.title[locale]}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt[locale]}</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <Image src={post.cover} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
        <div className="mt-10 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading.en}>
              <h2 className="text-2xl font-bold">{section.heading[locale]}</h2>
              <p className="mt-3 text-lg leading-relaxed text-foreground/85">{section.body[locale]}</p>
            </section>
          ))}
        </div>
      </article>

      {products.length > 0 && (
        <section aria-labelledby="article-products">
          <SectionHeading id="article-products" eyebrow={t("journal.title")} title={t("journal.shopThePost")} />
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </section>
      )}
    </div>
  );
}
