"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabbedProductsProps {
  tabs: Array<{ key: string; label: string }>;
  /** One server-rendered panel per tab, in the same order. All panels are in the HTML; only one shows. */
  panels: React.ReactNode[];
  id: string;
}

export function TabbedProducts({ tabs, panels, id }: TabbedProductsProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div role="tablist" className="scrollbar-none -mx-4 mb-6 flex gap-2 overflow-x-auto px-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            role="tab"
            type="button"
            id={`${id}-tab-${tab.key}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${tab.key}`}
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              i === active ? "border-foreground bg-foreground text-background" : "hover:border-foreground/40",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div
          key={tabs[i].key}
          role="tabpanel"
          id={`${id}-panel-${tabs[i].key}`}
          aria-labelledby={`${id}-tab-${tabs[i].key}`}
          hidden={i !== active}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
