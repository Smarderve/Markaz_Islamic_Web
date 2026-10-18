import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { InstitutionHeader } from "~/components/markaz/institution-header";
import { getLocaleI18n, isLocale, locales } from "~/i18n";
import { localeReviewStatus } from "~/i18n/review-status";
import { LocalizedNotFoundView } from "./not-found";
import type { Route } from "./+types/school";

export const meta: Route.MetaFunction = ({ params }) => {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const isValidLevel = params.level === "primary" || params.level === "secondary";
  const isSecondary = params.level === "secondary";
  const { t } = getLocaleI18n(locale);
  const title = t(
    isValidLevel ? (isSecondary ? "secondaryMetaTitle" : "primaryMetaTitle") : "notFoundTitle",
  );
  const description = t(
    isValidLevel
      ? isSecondary
        ? "secondaryMetaDescription"
        : "primaryMetaDescription"
      : "notFoundDescription",
  );
  const approved = localeReviewStatus[locale] === "approved";
  const publishedLocales = locales.filter(
    (candidate) => localeReviewStatus[candidate] === "approved",
  );
  const path = `/${locale}/${isSecondary ? "secondary" : "primary"}/`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "robots", content: approved ? "index,follow" : "noindex,nofollow" },
    ...(approved
      ? [
          { tagName: "link" as const, rel: "canonical", href: path },
          ...publishedLocales.map((candidate) => ({
            tagName: "link" as const,
            rel: "alternate",
            hrefLang: candidate,
            href: `/${candidate}/${isSecondary ? "secondary" : "primary"}/`,
          })),
        ]
      : []),
  ];
};

export default function EducationLevelPage() {
  const { locale = "en", level = "primary" } = useParams();
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  if (level !== "primary" && level !== "secondary") {
    return <LocalizedNotFoundView locale={isLocale(locale) ? locale : "en"} />;
  }
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
