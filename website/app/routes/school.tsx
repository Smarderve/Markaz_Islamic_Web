import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { LocaleNav } from "~/components/markaz/locale-nav";
import { getLocaleI18n } from "~/i18n";

export default function School() {
  const { locale = "en", school = "primary" } = useParams();
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  const title = school === "secondary" ? t("secondaryRoute") : t("primaryRoute");
  return (
    <main className="page-shell">
      <header className="page-header">
        <Link to={`/${locale}/`}>{t("home")}</Link>
        <LocaleNav school={school} />
      </header>
      <p className="eyebrow">{t("siteLabel")}</p>
      <p className="sample-notice">{t("sampleNotice")}</p>
      <h1>{title}</h1>
      <p className="lead">{t("routeTitle")}</p>
      <p>{t("routeCopy")}</p>
    </main>
  );
}
