"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { localeDirection } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const slides = [
  { key: "audio", image: "/banners/hero-audio.webp", href: "/products?category=accessories&sub=audio" },
  { key: "fashion", image: "/banners/hero-fashion.webp", href: "/products?category=clothing" },
  { key: "workspace", image: "/banners/hero-workspace.webp", href: "/products?collection=work-from-home" },
] as const;

const INTERVAL_MS = 6000;

/**
 * Full-bleed hero carousel. The photos keep their subject on the right, so in
 * Arabic they are mirrored and the copy sits on the reading-start side.
 */
export function HeroSlider() {
  const t = useTranslations("home.hero");
  const rtl = localeDirection[useLocale()] === "rtl";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  const Previous = rtl ? ChevronRight : ChevronLeft;
  const Next = rtl ? ChevronLeft : ChevronRight;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("label")}
      className="relative overflow-hidden rounded-2xl bg-neutral-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/8]">
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={t("slideOf", { current: i + 1, total: slides.length })}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1408px) 1344px, 100vw"
              className={cn("object-cover object-[75%_50%] sm:object-center", rtl && "-scale-x-100")}
            />
            {/* Fade from the copy side so the text stays readable over any photo. */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent sm:bg-linear-to-r sm:from-black/55 sm:via-black/10 rtl:sm:bg-linear-to-l" />
            <div className="absolute inset-0 flex items-end p-6 sm:items-center sm:p-12 lg:p-16">
              <div className="max-w-md text-white">
                <p className="text-sm font-medium tracking-wide text-white/80 uppercase">{t(`${slide.key}.eyebrow`)}</p>
                <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-5xl">{t(`${slide.key}.title`)}</h2>
                <p className="mt-3 text-base text-white/85 sm:text-lg">{t(`${slide.key}.text`)}</p>
                <Button size="lg" className="mt-6 h-11 px-6" asChild tabIndex={i === index ? 0 : -1}>
                  <Link href={slide.href}>{t(`${slide.key}.cta`)}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute end-4 bottom-4 flex items-center gap-2 sm:end-6 sm:bottom-6">
        <Button variant="secondary" size="icon" className="rounded-full bg-white/85 hover:bg-white" onClick={() => go(index - 1)} aria-label={t("previous")}>
          <Previous />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full bg-white/85 hover:bg-white" onClick={() => go(index + 1)} aria-label={t("next")}>
          <Next />
        </Button>
      </div>
      <div className="absolute start-1/2 bottom-5 hidden -translate-x-1/2 gap-2 sm:flex rtl:translate-x-1/2">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => go(i)}
            aria-label={t("goTo", { number: i + 1 })}
            aria-current={i === index}
            className={cn("h-2 rounded-full bg-white/60 transition-all", i === index ? "w-8 bg-white" : "w-2")}
          />
        ))}
      </div>
    </section>
  );
}
