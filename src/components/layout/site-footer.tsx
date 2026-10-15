import { Banknote, CreditCard, Headset, Mail, MapPin, MessageCircle, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/types/product";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

const perks = [
  { key: "freeDelivery", icon: Truck },
  { key: "returns", icon: RotateCcw },
  { key: "securePayment", icon: ShieldCheck },
  { key: "support", icon: Headset },
] as const;

const payments = [
  { key: "card", icon: CreditCard },
  { key: "cod", icon: Banknote },
  { key: "whatsapp", icon: MessageCircle },
] as const;

export async function SiteFooter() {
  const t = await getTranslations();

  const columns = [
    {
      title: t("footer.shop"),
      links: CATEGORIES.map((category) => ({
        href: `/categories/${category}`,
        label: t(`categories.${category}`),
      })),
    },
    {
      title: t("footer.help"),
      links: [
        { href: "/faq", label: t("footer.faq") },
        { href: "/shipping", label: t("footer.shippingReturns") },
        { href: "/contact", label: t("header.contact") },
        { href: "/account", label: t("footer.trackOrder") },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { href: "/about", label: t("header.about") },
        { href: "/journal", label: t("footer.journal") },
        { href: "/privacy", label: t("footer.privacy") },
        { href: "/terms", label: t("footer.terms") },
      ],
    },
  ];

  return (
    <footer className="mt-20">
      <ul className="container grid grid-cols-2 gap-6 border-t py-8 lg:grid-cols-4">
        {perks.map(({ key, icon: Icon }) => (
          <li key={key} className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted">
              <Icon className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-semibold">{t(`footer.perks.${key}.title`)}</span>
              <span className="block text-xs text-muted-foreground">{t(`footer.perks.${key}.text`)}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="bg-neutral-950 text-white">
        <div className="container flex flex-col items-start justify-between gap-6 border-b border-white/10 py-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">{t("footer.newsletterTitle")}</h2>
            <p className="mt-1 text-sm text-white/70">{t("footer.subscribeText")}</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="[&_a]:text-white">
              <Logo />
            </div>
            <p className="max-w-xs text-sm text-white/70">{t("footer.tagline")}</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {t("footer.address")}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden />
                <span dir="ltr">hello@marketio.example</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                <span dir="ltr">+20 100 000 0000</span>
              </li>
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 font-semibold">{column.title}</h2>
              <ul className="space-y-2.5 text-sm text-white/70">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="container flex flex-col gap-4 py-5 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <p>{t("footer.rights", { year: 2026 })} · {t("footer.demoNotice")}</p>
            <ul className="flex flex-wrap gap-2" aria-label={t("footer.paymentMethods")}>
              {payments.map(({ key, icon: Icon }) => (
                <li key={key} className="flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1">
                  <Icon className="size-3.5" aria-hidden />
                  {t(`footer.payments.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
