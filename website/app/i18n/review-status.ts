import type { Locale } from "./index";

/** Human review state. Change only after the matching editorial review is recorded. */
export const localeReviewStatus: Record<Locale, "draft" | "reviewed" | "approved"> = {
  en: "draft",
  sw: "draft",
  ar: "draft",
};

export function isLocalePublicationApproved(locale: Locale): boolean {
  return localeReviewStatus[locale] === "approved";
}
