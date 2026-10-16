"use client";

import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { MenuData } from "@/lib/catalog";

// The sheet (dialog, accordion and all their code) only loads when someone opens the menu.
const MobileNavSheet = dynamic(() => import("./mobile-nav-sheet").then((m) => m.MobileNavSheet), { ssr: false });
const preload = () => void import("./mobile-nav-sheet");

export function MobileNav({ menu }: { menu: MenuData }) {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={button}
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label={t("menu")}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={preload}
        onFocus={preload}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
      >
        <Menu className="size-5" />
      </Button>
      {requested && <MobileNavSheet menu={menu} open={open} onOpenChange={setOpen} returnFocusTo={button} />}
    </>
  );
}
