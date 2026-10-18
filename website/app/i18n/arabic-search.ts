/** Normalize Arabic only for matching; keep source text vocalized for display. */
export function normalizeArabicForSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/\u0640/g, "")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ");
}

export function matchesArabicSearch(text: string, query: string): boolean {
  const normalizedQuery = normalizeArabicForSearch(query);
  return normalizedQuery.length > 0 && normalizeArabicForSearch(text).includes(normalizedQuery);
}
