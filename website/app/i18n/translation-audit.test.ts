import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { auditTranslationSource } from "../../scripts/translation-audit.mjs";

const dictionaryPath = resolve("app/i18n/index.ts");

describe("translation dictionary audit", () => {
  it("accepts matching EN, SW and AR keys with matching placeholders", async () => {
    const source = await readFile(dictionaryPath, "utf8");
    expect(auditTranslationSource(source)).toEqual({ errors: [], keyCount: expect.any(Number) });
  });

  it("reports missing keys and mismatched interpolation placeholders", async () => {
    const source = await readFile(dictionaryPath, "utf8");
    const missingKey = source.replace('      primaryRoute: "Mfano wa njia ya msingi",\n', "");
    const placeholderMismatch = missingKey.replace(
      'localReviewFigure: "Chanzo cha Instagram · {{id}} · kipande, si faili asili ya kamera",',
      'localReviewFigure: "Chanzo cha Instagram · {{post}} · kipande, si faili asili ya kamera",',
    );

    const { errors } = auditTranslationSource(placeholderMismatch);
    expect(errors).toContain('sw: missing key "primaryRoute".');
    expect(errors).toContain('sw: interpolation placeholders differ for "localReviewFigure".');
  });
});
