"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setOrderStatus } from "@/app/[locale]/admin/actions";
import { useRouter } from "@/i18n/navigation";
import { ORDER_STATUSES, type OrderStatus } from "@/types/order";
import { actionErrorKey } from "./ui";

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const t = useTranslations("admin");
  const checkout = useTranslations("checkout");
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  function onChange(next: OrderStatus) {
    const previous = value;
    setValue(next);
    startTransition(async () => {
      const result = await setOrderStatus(orderId, next);
      if (result.ok) {
        toast.success(t("orders.statusSaved"));
        router.refresh();
      } else {
        setValue(previous);
        toast.error(t(`errors.${actionErrorKey(result.error)}`));
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        aria-label={t("orders.changeStatus")}
        value={value}
        disabled={pending}
        onChange={(event) => onChange(event.target.value as OrderStatus)}
        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {ORDER_STATUSES.map((option) => (
          <option key={option} value={option}>{checkout(`status.${option}`)}</option>
        ))}
      </select>
      {pending && <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden />}
    </div>
  );
}
