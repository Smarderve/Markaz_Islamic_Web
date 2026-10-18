import { describe, expect, it } from "vitest";
import { matchesArabicSearch, normalizeArabicForSearch } from "./arabic-search";

describe("Arabic search normalization", () => {
  it("matches vocalized text whether the query includes tashkīl or not", () => {
    const displayText = "التَّرْبِيَةُ الْإِسْلَامِيَّةُ";
    expect(matchesArabicSearch(displayText, "التربية الإسلامية")).toBe(true);
    expect(matchesArabicSearch(displayText, displayText)).toBe(true);
  });

  it("removes tatweel and Arabic vowel/recitation marks for matching only", () => {
    expect(normalizeArabicForSearch("الْحَيَاةُ ـ الْمَدْرَسِيَّةُ")).toBe("الحياة المدرسية");
    expect("الْحَيَاةُ الْمَدْرَسِيَّةُ").not.toBe("الحياة المدرسية");
  });
});
