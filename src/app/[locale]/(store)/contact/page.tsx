import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/content/contact-form";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("title"), description: t("intro") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const channels = [
    { key: "whatsapp", icon: MessageCircle, value: "+20 100 000 0000", ltr: true },
    { key: "email", icon: Mail, value: "hello@marketio.example", ltr: true },
    { key: "address", icon: MapPin, value: t("channels.address.value"), ltr: false },
    { key: "hours", icon: Clock, value: t("channels.hours.value"), ltr: false },
  ] as const;

  return (
    <div className="container py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("intro")}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[22rem_1fr]">
        <ul className="space-y-3">
          {channels.map(({ key, icon: Icon, value, ltr }) => (
            <li key={key} className="flex items-start gap-4 rounded-2xl border p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">{t(`channels.${key}.label`)}</span>
                <span className="block text-sm text-muted-foreground" dir={ltr ? "ltr" : undefined}>{value}</span>
              </span>
            </li>
          ))}
          <li className="rounded-2xl bg-muted/60 p-5 text-sm">
            {t("faqPrompt")}{" "}
            <Link href="/faq" className="font-semibold text-primary hover:underline">{t("faqLink")}</Link>
          </li>
        </ul>
        <ContactForm />
      </div>
    </div>
  );
}
