import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faq } from "@/data/content/pages";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("faqPage");
  return { title: t("title"), description: t("intro") };
}

export default async function FaqPage() {
  const t = await getTranslations("faqPage");
  const locale = await getLocale();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q[locale],
        acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
      })),
    ),
  };

  return (
    <div className="container max-w-3xl py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{t("intro")}</p>

      <div className="mt-10 space-y-10">
        {faq.map((group) => (
          <section key={group.title.en}>
            <h2 className="mb-2 text-xl font-semibold">{group.title[locale]}</h2>
            <Accordion type="single" collapsible className="rounded-2xl border px-5">
              {group.items.map((item) => (
                <AccordionItem key={item.q.en} value={item.q.en}>
                  <AccordionTrigger className="text-base">{item.q[locale]}</AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">{item.a[locale]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-muted/60 p-6 text-center">
        <p className="font-semibold">{t("stillNeedHelp")}</p>
        <Button className="mt-4" asChild>
          <Link href="/contact">{t("contactUs")}</Link>
        </Button>
      </div>
    </div>
  );
}
