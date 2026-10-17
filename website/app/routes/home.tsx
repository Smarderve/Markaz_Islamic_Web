import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { LocaleNav } from "~/components/markaz/locale-nav";
import { FoundationDemo } from "~/components/markaz/foundation-demo";
import { getLocaleI18n } from "~/i18n";

export default function Home() {
  const { locale = "en" } = useParams();
  const localeI18n = getLocaleI18n(locale);
  const { t } = useTranslation(undefined, { i18n: localeI18n });
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">{t("siteLabel")}</p>
        <LocaleNav />
      </header>
      <p className="sample-notice">{t("sampleNotice")}</p>
      <h1>{t("homeTitle")}</h1>
      <p className="lead">{t("homeCopy")}</p>
      <nav aria-label={t("schoolNavigation")} className="school-links">
        <Link to={`/${locale}/primary/`}>{t("primaryRoute")}</Link>
        <Link to={`/${locale}/secondary/`}>{t("secondaryRoute")}</Link>
      </nav>
      <FoundationDemo localeI18n={localeI18n} />
    </main>
  );
}
