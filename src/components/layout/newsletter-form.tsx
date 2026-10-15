"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Demo signup: validates the address and confirms with a toast; nothing is stored yet. */
export function NewsletterForm() {
  const t = useTranslations("footer");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      noValidate
      className="w-full max-w-md"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = String(new FormData(form).get("email") ?? "").trim();
        if (!EMAIL.test(email)) {
          setError(t("emailInvalid"));
          return;
        }
        setError(null);
        form.reset();
        toast.success(t("subscribed"));
      }}
    >
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("emailPlaceholder")}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="h-11 min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-white/60 focus:border-white/50 focus:ring-3 focus:ring-white/20"
        />
        <Button type="submit" size="lg" className="h-11 rounded-full px-6">
          {t("subscribe")}
        </Button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
