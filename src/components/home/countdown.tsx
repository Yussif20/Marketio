"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

function nextMidnight() {
  const date = new Date();
  date.setHours(24, 0, 0, 0);
  return date.getTime();
}

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Counts down to the end of the visitor's day, when the daily flash sale "resets". */
export function Countdown() {
  const t = useTranslations("countdown");
  // Null until mounted: the server can't know the visitor's clock or time zone.
  const [remaining, setRemaining] = useState<ReturnType<typeof split> | null>(null);

  useEffect(() => {
    let deadline = nextMidnight();
    const tick = () => {
      if (Date.now() >= deadline) deadline = nextMidnight();
      setRemaining(split(deadline - Date.now()));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-3" role="timer" aria-label={t("label")}>
      {UNITS.map((unit, index) => (
        <div key={unit} className="flex items-end gap-3">
          {index > 0 && <span className="pb-1 text-xl font-bold text-primary" aria-hidden>:</span>}
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground">{t(unit)}</p>
            <p className="min-w-9 text-2xl font-bold tabular-nums" dir="ltr">
              {remaining ? String(remaining[unit]).padStart(2, "0") : "--"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
