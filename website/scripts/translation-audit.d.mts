export function auditTranslationSource(
  sourceText: string,
  usageSources?: Array<{ fileName: string; source: string }>,
): {
  errors: string[];
  keyCount: number;
};

export function auditTranslationFile(filePath?: string): Promise<{
  errors: string[];
  keyCount: number;
}>;
