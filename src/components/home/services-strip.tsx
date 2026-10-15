import { Headset, ShieldCheck, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";

const services = [
  { key: "freeDelivery", icon: Truck },
  { key: "customerService", icon: Headset },
  { key: "moneyBack", icon: ShieldCheck },
] as const;

export async function ServicesStrip() {
  const t = await getTranslations("services");

  return (
    <ul className="grid gap-8 sm:grid-cols-3">
      {services.map(({ key, icon: Icon }) => (
        <li key={key} className="flex flex-col items-center text-center">
          <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted ring-8 ring-muted/50">
            <Icon className="size-7" aria-hidden />
          </span>
          <h3 className="font-semibold">{t(`${key}.title`)}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t(`${key}.description`)}</p>
        </li>
      ))}
    </ul>
  );
}
