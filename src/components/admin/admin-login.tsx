"use client";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Eye, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "@/lib/toast";
import { signInAdmin, startAdminDemo } from "@/app/[locale]/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@/i18n/navigation";
import { getFirebaseAuth } from "@/lib/firebase/client";

export function AdminLogin() {
  const t = useTranslations("admin.login");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    startTransition(async () => {
      const auth = getFirebaseAuth();
      try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const result = await signInAdmin(await credential.user.getIdToken(true));
        // The admin runs on a server session cookie, so the browser-side Firebase session isn't needed.
        await signOut(auth);
        if (!result.ok) {
          toast.error(t(result.error === "not-admin" ? "errors.notAdmin" : "errors.generic"));
          return;
        }
        router.replace("/admin");
        router.refresh();
      } catch (error) {
        const code = error instanceof FirebaseError ? error.code : "";
        toast.error(t(code === "auth/invalid-credential" || code === "auth/wrong-password" ? "errors.credentials" : "errors.generic"));
      }
    });
  }

  function onDemo() {
    startTransition(async () => {
      const result = await startAdminDemo();
      if (!result.ok) {
        toast.error(t("errors.generic"));
        return;
      }
      router.replace("/admin");
      router.refresh();
    });
  }

  return (
    <div className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
      <p dir="ltr" className="text-center text-xl font-bold tracking-tight">
        MAR<span className="text-primary">KET</span>IO <span className="text-sm font-medium text-muted-foreground">admin</span>
      </p>
      <h1 className="mt-6 text-2xl font-bold">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("text")}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">{t("email")}</Label>
          <Input id="admin-email" name="email" type="email" required autoComplete="email" className="h-11" dir="ltr" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password">{t("password")}</Label>
          <Input id="admin-password" name="password" type="password" required autoComplete="current-password" className="h-11" dir="ltr" />
        </div>
        <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          {t("submit")}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <Separator className="flex-1" /> {t("or")} <Separator className="flex-1" />
      </div>

      <Button type="button" variant="secondary" size="lg" className="h-11 w-full" disabled={pending} onClick={onDemo}>
        <Eye /> {t("demo")}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">{t("demoText")}</p>
    </div>
  );
}
