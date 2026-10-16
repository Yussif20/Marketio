"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      // The theme script only needs to run from the server HTML. Marking it as data on the
      // client stops React warning about script tags when the root layout re-renders.
      scriptProps={{ type: typeof window === "undefined" ? undefined : "application/json" }}
    >
      {children}
    </NextThemesProvider>
  );
}
