import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { PolicyArticle } from "@/components/content/policy-page";
import { policies } from "@/data/content/pages";

const page = policies.terms;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: page.title[locale], description: page.intro[locale] };
}

export default function Page() {
  return <PolicyArticle page={page} />;
}
