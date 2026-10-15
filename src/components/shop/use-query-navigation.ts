"use client";

import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { productsHref, type ProductQuery } from "@/lib/product-query";

/** Pushes a new listing query into the URL; the server re-renders the results. */
export function useQueryNavigation(query: ProductQuery) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function update(changes: Partial<ProductQuery>) {
    // Any filter or sort change starts again from page 1.
    const next = { ...query, page: 1, ...changes };
    startTransition(() => router.push(productsHref(next), { scroll: false }));
  }

  return { update, pending };
}
