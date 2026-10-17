import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getLocaleI18n, locales } from "~/i18n";

export function LocaleNav({ school }: { school?: string }) {
  const { locale } = useParams();
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  const suffix = school ? `/${school}/` : "/";

  return (
    <nav aria-label={t("languageNavigation")} className="locale-nav">
      {locales.map((nextLocale) => (
        <Link
          key={nextLocale}
          lang={nextLocale}
          to={`/${nextLocale}${suffix}`}
          aria-current={locale === nextLocale ? "page" : undefined}
        >
          {nextLocale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
