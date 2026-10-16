"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/**
 * One button that flips between light and dark. A plain toggle instead of a
 * dropdown keeps the menu library out of every page's JavaScript.
 */
export function ThemeSwitcher() {
  const t = useTranslations("theme");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("label")}
      title={t("label")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Both icons render on the server; CSS picks one so there is no hydration flash. */}
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
}
