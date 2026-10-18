import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { InstitutionHeader } from "~/components/markaz/institution-header";
import { getLocaleI18n } from "~/i18n";

export default function EducationLevelPage() {
  const { locale = "en", level = "primary" } = useParams();
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  const isSecondary = level === "secondary";
  const title = t(isSecondary ? "secondaryLevelTitle" : "primaryLevelTitle");

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>
      <div className="preview-ribbon">{t("prototypeRibbon")}</div>
      <InstitutionHeader
        locale={locale}
        educationLevel={level === "secondary" ? "secondary" : "primary"}
      />
      <main id="main-content" className="education-level-page">
        <section className="education-level-hero" aria-labelledby="level-title">
          <p className="education-level-note">{t("schools")}</p>
          <h1 id="level-title">{title}</h1>
          <p className="education-level-description">
            {t(isSecondary ? "secondaryPathwayDetail" : "primaryPathwayDetail")}
          </p>
          {isSecondary && (
            <Link className="education-level-results-link" to={`/${locale}/#results`}>
              {t("academicResults")} <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        </section>
      </main>
      <footer className="site-footer">
        <Link to={`/${locale}/`} className="footer-wordmark">
          MARKAZ ISLAMIC SCHOOLS
        </Link>
        <span>{t("footerDisclosure")}</span>
        <span>EN · SW · AR</span>
      </footer>
    </>
  );
}
