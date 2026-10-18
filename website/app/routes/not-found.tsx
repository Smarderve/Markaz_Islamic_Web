import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { getLocaleI18n, isLocale } from "~/i18n";
import type { Locale } from "~/i18n";
import type { Route } from "./+types/not-found";

function localeFromPath(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : "en";
}

export const meta: Route.MetaFunction = ({ location }) => {
  const locale = localeFromPath(location.pathname);
  const { t } = getLocaleI18n(locale);
  return [
    { title: t("notFoundTitle") },
    { name: "description", content: t("notFoundDescription") },
    { name: "robots", content: "noindex,nofollow" },
  ];
};

export function LocalizedNotFoundView({ locale }: { locale: Locale }) {
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  return (
    <main className="localized-error" lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <p className="section-kicker">MARKAZ ISLAMIC SCHOOLS</p>
      <h1>{t("notFoundTitle")}</h1>
      <p>{t("notFoundDescription")}</p>
      <Link to={`/${locale}/`}>{t("returnHome")}</Link>
    </main>
  );
}

export default function NotFound() {
  return <LocalizedNotFoundView locale={localeFromPath(useLocation().pathname)} />;
}
