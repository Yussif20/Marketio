import { notFound } from "next/navigation";

// This route only ever renders not-found, so there's no shell for instant-navigation checks to validate.
export const instant = false;

// Sends unknown paths inside a locale to the localised not-found page.
export default function CatchAllPage() {
  notFound();
}
