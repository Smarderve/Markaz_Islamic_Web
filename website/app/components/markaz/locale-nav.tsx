import { Check, ChevronDown } from "lucide-react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getLocaleI18n, locales } from "~/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const labels = { en: "English", sw: "Kiswahili", ar: "الْعَرَبِيَّةُ" } as const;

export function LocaleNav({
  educationLevel,
  mode = "menu",
}: {
  educationLevel?: "primary" | "secondary";
  mode?: "menu" | "links";
}) {
  const { locale } = useParams();
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  const suffix = educationLevel ? `/${educationLevel}/` : "/";
  if (mode === "links") {
    return (
      <nav className="locale-link-list" aria-label={t("languageNavigation")}>
        {locales.map((nextLocale) => (
          <Link
            key={nextLocale}
            className="locale-option"
            lang={nextLocale}
            to={`/${nextLocale}${suffix}`}
            aria-current={locale === nextLocale ? "page" : undefined}
          >
            {labels[nextLocale]}
          </Link>
        ))}
      </nav>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="locale-trigger" aria-label={t("languageNavigation")}>
        {locale?.toUpperCase()} <ChevronDown aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="locale-menu" align="end">
        {locales.map((nextLocale) => (
          <DropdownMenuItem key={nextLocale} asChild>
            <Link
              className="locale-option"
              lang={nextLocale}
              to={`/${nextLocale}${suffix}`}
              aria-current={locale === nextLocale ? "page" : undefined}
            >
              <span>{labels[nextLocale]}</span>
              {locale === nextLocale && <Check aria-hidden="true" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
