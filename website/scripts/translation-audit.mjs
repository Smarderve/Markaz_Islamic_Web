import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localeIds = ["en", "sw", "ar"];

function propertyName(property) {
  if (ts.isIdentifier(property.name) || ts.isStringLiteralLike(property.name)) {
    return property.name.text;
  }
  return undefined;
}

function objectProperty(object, name) {
  return object.properties.find(
    (property) => ts.isPropertyAssignment(property) && propertyName(property) === name,
  );
}

function propertyValue(property) {
  if (!property || !ts.isPropertyAssignment(property)) return undefined;
  const value = property.initializer;
  if (ts.isStringLiteralLike(value)) return value.text;
  if (ts.isNoSubstitutionTemplateLiteral(value)) return value.text;
  return undefined;
}

function unwrapExpression(expression) {
  let current = expression;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function translationDictionary(localeObject) {
  if (!localeObject || !ts.isObjectLiteralExpression(localeObject)) return undefined;
  const translation = objectProperty(localeObject, "translation");
  if (!translation || !ts.isPropertyAssignment(translation)) return undefined;
  const dictionary = translation.initializer;
  if (!ts.isObjectLiteralExpression(dictionary)) return undefined;

  return new Map(
    dictionary.properties
      .filter(ts.isPropertyAssignment)
      .map((property) => [propertyName(property), propertyValue(property)]),
  );
}

function translationKeysInSource(sourceText, fileName) {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);
  const keys = new Set();
  const collectLiteralKeys = (node) => {
    if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      keys.add(node.text);
      return;
    }
    if (ts.isConditionalExpression(node)) {
      collectLiteralKeys(node.whenTrue);
      collectLiteralKeys(node.whenFalse);
    }
  };
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      const isTranslationCall =
        (ts.isIdentifier(expression) && expression.text === "t") ||
        (ts.isPropertyAccessExpression(expression) && expression.name.text === "t");
      if (isTranslationCall && node.arguments[0]) collectLiteralKeys(node.arguments[0]);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return keys;
}

export function auditTranslationSource(sourceText, usageSources = []) {
  const sourceFile = ts.createSourceFile(
    "app/i18n/index.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const declaration = sourceFile.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => statement.declarationList.declarations)
    .find((item) => ts.isIdentifier(item.name) && item.name.text === "resources");
  const resources = unwrapExpression(declaration?.initializer);
  if (!resources || !ts.isObjectLiteralExpression(resources)) {
    return { errors: ["Could not find the resources dictionary object."], keyCount: 0 };
  }

  const dictionaries = new Map(
    localeIds.map((locale) => {
      const entry = objectProperty(resources, locale);
      const object =
        entry && ts.isPropertyAssignment(entry) ? unwrapExpression(entry.initializer) : undefined;
      return [locale, translationDictionary(object)];
    }),
  );
  const errors = [];
  const english = dictionaries.get("en");
  if (!english) return { errors: ["English translation dictionary is missing."], keyCount: 0 };

  for (const locale of localeIds) {
    const dictionary = dictionaries.get(locale);
    if (!dictionary) {
      errors.push(`${locale}: translation dictionary is missing or is not an object.`);
      continue;
    }
    for (const [key, reference] of english) {
      if (!dictionary.has(key)) {
        errors.push(`${locale}: missing key "${key}".`);
        continue;
      }
      const value = dictionary.get(key);
      if (typeof value !== "string" || !value.trim()) {
        errors.push(`${locale}: key "${key}" must have non-empty literal text.`);
        continue;
      }
      const referencePlaceholders = [...(reference ?? "").matchAll(/\{\{\s*([\w.]+)\s*\}\}/gu)]
        .map((match) => match[1])
        .sort();
      const actualPlaceholders = [...value.matchAll(/\{\{\s*([\w.]+)\s*\}\}/gu)]
        .map((match) => match[1])
        .sort();
      if (referencePlaceholders.join("|") !== actualPlaceholders.join("|")) {
        errors.push(`${locale}: interpolation placeholders differ for "${key}".`);
      }
    }
    for (const key of dictionary.keys()) {
      if (!english.has(key)) errors.push(`${locale}: extra key "${key}" is not in English.`);
    }
  }

  const usedKeys = new Set(
    usageSources.flatMap(({ fileName, source }) => [...translationKeysInSource(source, fileName)]),
  );
  for (const key of usedKeys) {
    if (!english.has(key)) errors.push(`Application uses missing translation key "${key}".`);
  }

  return { errors, keyCount: english.size };
}

async function findAppSources(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return findAppSources(entryPath);
      if (/\.(?:ts|tsx)$/u.test(entry.name) && !entry.name.endsWith(".d.ts")) {
        return [{ fileName: entryPath, source: await readFile(entryPath, "utf8") }];
      }
      return [];
    }),
  );
  return files.flat();
}

export async function auditTranslationFile(filePath = path.join(projectRoot, "app/i18n/index.ts")) {
  return auditTranslationSource(
    await readFile(filePath, "utf8"),
    await findAppSources(path.join(projectRoot, "app")),
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { errors, keyCount } = await auditTranslationFile();
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Locale dictionaries complete: ${keyCount} matching keys in en, sw, and ar.`);
  }
}
