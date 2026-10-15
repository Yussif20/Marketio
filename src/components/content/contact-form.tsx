"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validated contact form. In the demo it confirms on screen; storing messages comes with Firebase. */
export function ContactForm() {
  const t = useTranslations("contact");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Partial<Record<Field, string>> = {};
    if (name.length < 2) next.name = t("errors.name");
    if (!EMAIL.test(email)) next.email = t("errors.email");
    if (message.length < 10) next.message = t("errors.message");
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border p-10 text-center" role="status">
        <CheckCircle2 className="size-12 text-emerald-600" aria-hidden />
        <h2 className="mt-4 text-xl font-semibold">{t("sentTitle")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sentText")}</p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  const field = (name: Field) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });
  const error = (name: Field) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className="text-sm text-destructive">
        {errors[name]}
      </p>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-2xl border p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">{t("name")}</Label>
          <Input {...field("name")} autoComplete="name" className="h-11" />
          {error("name")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{t("email")}</Label>
          <Input {...field("email")} type="email" autoComplete="email" className="h-11" dir="ltr" />
          {error("email")}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone">{t("phone")}</Label>
        <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" className="h-11" dir="ltr" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{t("message")}</Label>
        <textarea
          {...field("message")}
          rows={5}
          className={cn(
            "w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            errors.message && "border-destructive",
          )}
        />
        {error("message")}
      </div>
      <Button type="submit" size="lg" className="h-11 w-full px-6 sm:w-auto">
        {t("send")}
      </Button>
    </form>
  );
}
