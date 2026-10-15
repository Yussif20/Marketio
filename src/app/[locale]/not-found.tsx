import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t("notFound.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("notFound.text")}</p>
      <Button asChild className="mt-8">
        <Link href="/">{t("buttons.goHome")}</Link>
      </Button>
    </div>
  );
}
