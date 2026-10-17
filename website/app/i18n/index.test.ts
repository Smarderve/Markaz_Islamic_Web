import { describe, expect, it } from "vitest";
import { getLocaleI18n, isLocale, locales } from "./index";

describe("locale foundation", () => {
  it("accepts only the three planned locale identifiers", () => {
    expect(locales).toEqual(["en", "sw", "ar"]);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("provides distinct technical sample labels for each locale", () => {
    const notices = locales.map((locale) => getLocaleI18n(locale).t("sampleNotice"));
    expect(new Set(notices).size).toBe(3);
    expect(notices.every((notice) => notice.length > 10)).toBe(true);
  });
});
