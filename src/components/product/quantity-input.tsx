"use client";

import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface QuantityInputProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  /** Names the product so screen readers know which line the control belongs to. */
  label: string;
}

export function QuantityInput({ value, max, onChange, label }: QuantityInputProps) {
  const t = useTranslations("product");
  const limit = Math.max(max, 1);

  return (
    <div className="inline-flex items-center rounded-lg border" role="group" aria-label={label}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label={t("decrease")}
      >
        <Minus />
      </Button>
      <output className="min-w-10 text-center font-medium tabular-nums" aria-live="polite">
        {value}
      </output>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(Math.min(limit, value + 1))}
        disabled={value >= limit}
        aria-label={t("increase")}
      >
        <Plus />
      </Button>
    </div>
  );
}
