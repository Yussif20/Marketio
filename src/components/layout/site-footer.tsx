import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const header = await getTranslations("header");
  const contact = await getTranslations("contact");

  const columns = [
    {
      title: t("account"),
      links: [
        { href: "/account", label: t("myAccount") },
        { href: "/cart", label: header("cart") },
        { href: "/wishlist", label: header("wishlist") },
      ],
    },
    {
      title: t("quickLinks"),
      links: [
        { href: "/products", label: header("products") },
        { href: "/about", label: header("about") },
        { href: "/contact", label: header("contact") },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t bg-muted/40">
      <div className="container mx-auto grid gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="mb-3 font-semibold">{column.title}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-3 font-semibold">{t("support")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{contact("available")}</li>
            <li dir="ltr" className="text-start">
              hello@marketio.example
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>{t("rights", { year: 2026 })}</p>
          <p>{t("demoNotice")}</p>
        </div>
      </div>
    </footer>
  );
}
