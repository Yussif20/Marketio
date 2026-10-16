"use client";

import dynamic from "next/dynamic";

/**
 * Sonner's toaster loads after hydration instead of with the page: toasts only
 * appear after someone does something, so it has no reason to be on the critical path.
 */
export const LazyToaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), { ssr: false });
