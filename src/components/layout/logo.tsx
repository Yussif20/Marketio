import { Link } from "@/i18n/navigation";

/** Latin wordmark in both locales, with the brand colour on the middle syllable. */
export function Logo() {
  return (
    <Link
      href="/"
      dir="ltr"
      className="text-xl font-bold tracking-tight sm:text-2xl"
      aria-label="Marketio"
    >
      MAR<span className="text-primary">KET</span>IO
    </Link>
  );
}
