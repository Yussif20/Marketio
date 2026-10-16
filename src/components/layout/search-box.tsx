"use client";

import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { formatPrice } from "@/lib/product";
import { cn } from "@/lib/utils";

interface Suggestion {
  slug: string;
  title: string;
  image: string;
  priceCents: number;
  oldPriceCents?: number;
}

interface SearchBoxProps {
  autoFocus?: boolean;
  size?: "md" | "lg";
  className?: string;
}

/** Search field with live product suggestions (combobox pattern). Enter searches the full catalogue. */
export function SearchBox({ autoFocus, size = "md", className }: SearchBoxProps) {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Suggestion[]>([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(q)}&locale=${locale}`, { signal: controller.signal });
        const data: { items: Suggestion[]; total: number } = await response.json();
        setItems(data.items);
        setTotal(data.total);
        setActive(-1);
      } catch {
        // Aborted by a newer keystroke, or offline; keep the last suggestions.
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, locale]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const showList = open && query.trim().length >= 2;
  // Short queries never fetch, so ignore whatever the last real search returned.
  const suggestions = showList ? items : [];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setOpen(false);
    if (active >= 0 && suggestions[active]) {
      router.push(`/products/${suggestions[active].slug}`);
      return;
    }
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <form ref={boxRef} role="search" onSubmit={submit} className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        name="q"
        value={query}
        autoFocus={autoFocus}
        autoComplete="off"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        aria-label={t("searchPlaceholder")}
        placeholder={t("searchPlaceholder")}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className={cn(
          "w-full rounded-full border border-input bg-muted/60 ps-11 pe-28 text-sm outline-none transition focus:border-ring focus:bg-background focus:ring-3 focus:ring-ring/30",
          size === "lg" ? "h-14 text-base" : "h-11",
        )}
      />
      <Button type="submit" size="sm" className={cn("absolute end-1.5 top-1/2 -translate-y-1/2 rounded-full px-4", size === "lg" ? "h-11" : "h-8")}>
        {t("search")}
      </Button>

      {showList && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-popover shadow-lg">
          {loading && suggestions.length === 0 ? (
            <p className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> {t("searching")}
            </p>
          ) : suggestions.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">{t("noSuggestions")}</p>
          ) : (
            <>
              <ul id={listId} role="listbox" aria-label={t("suggestions")}>
                {suggestions.map((item, i) => (
                  <li key={item.slug} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className={cn("flex items-center gap-3 px-4 py-2.5 hover:bg-muted", i === active && "bg-muted")}
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
                      </span>
                      <span className="line-clamp-1 flex-1 text-sm font-medium">{item.title}</span>
                      <span className="text-sm font-semibold text-primary">{formatPrice(item.priceCents)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button type="submit" className="block w-full border-t px-4 py-3 text-start text-sm font-semibold text-primary hover:bg-muted">
                {t("seeAllResults", { count: total, q: query.trim() })}
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}
