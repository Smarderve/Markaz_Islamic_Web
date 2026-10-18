import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { InstitutionHeader } from "~/components/markaz/institution-header";
import BlurText from "~/components/markaz/motion/BlurText";
import FadeContent from "~/components/markaz/motion/FadeContent";
import { InView } from "~/components/ui/in-view";
import { getLocaleI18n } from "~/i18n";

const learningAreas = ["academics", "islamicEducation", "schoolLife"] as const;

export default function Home() {
  const { locale = "en" } = useParams();
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>
      <div className="preview-ribbon">{t("prototypeRibbon")}</div>
      <InstitutionHeader locale={locale} />

      <main id="main-content" className={`school-home${locale === "ar" ? " school-home-ar" : ""}`}>
        <section className="school-hero" aria-labelledby="hero-title">
          <div className="school-hero-topline">
            <span>{t("heroOverline")}</span>
            <span aria-hidden="true">EN · SW · AR</span>
          </div>
          <div className="school-hero-grid">
            <div className="school-hero-copy">
              <p className="school-hero-kicker">{t("heroKicker")}</p>
              <h1 id="hero-title" className="school-hero-title">
                {reduceMotion ? (
                  t("institutionTitle")
                ) : (
                  <BlurText
                    text={t("institutionTitle")}
                    animateBy="words"
                    delay={18}
                    stepDuration={0.12}
                    blur={3}
                    distance={5}
                    trigger="load"
                    className="hero-blur-text"
                  />
                )}
              </h1>
              <p className="school-hero-intro">{t("heroDescription")}</p>
              <a className="school-hero-link" href="#about">
                {t("discoverMarkaz")} <ArrowDown aria-hidden="true" />
              </a>
            </div>

            <div className="school-hero-index">
              <span className="school-hero-index-label">{t("learningAtMarkaz")}</span>
              <ol>
                {learningAreas.map((area, index) => (
                  <li key={area}>
                    <span className="school-hero-index-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span>{t(area)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="school-hero-baseline">
            <span>{t("independentConcept")}</span>
          </div>
        </section>

        <section id="about" className="school-introduction" aria-labelledby="about-title">
          <InView
            className="school-introduction-inner"
            once
            viewOptions={{ once: true, amount: 0.22 }}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="school-introduction-label">
              <span className="section-kicker">{t("aboutMarkaz")}</span>
              <span className="school-introduction-rule" aria-hidden="true" />
            </div>
            <div className="school-introduction-copy">
              <h2 id="about-title">{t("homeIntroductionTitle")}</h2>
              <p>{t("homeIntroductionCopy")}</p>
              <a className="school-introduction-link" href="#academic-areas">
                {t("exploreAcademics")} <ArrowDown aria-hidden="true" />
              </a>
            </div>
            <motion.ol
              id="academic-areas"
              className="school-introduction-areas"
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
              }}
            >
              {learningAreas.map((area, index) => (
                <motion.li
                  key={area}
                  initial={reduceMotion ? false : { opacity: 0, x: locale === "ar" ? 14 : -14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span aria-hidden="true">0{index + 1}</span>
                  <strong>{t(area)}</strong>
                  {area === "academics" && (
                    <small>
                      <Link to={`/${locale}/primary/`}>{t("primaryPathwayLabel")}</Link>
                      <Link to={`/${locale}/secondary/`}>{t("secondaryPathwayLabel")}</Link>
                    </small>
                  )}
                </motion.li>
              ))}
            </motion.ol>
          </InView>
        </section>

        <section id="results" className="results-story" aria-labelledby="results-title">
          <div className="results-story-intro">
            <p className="section-kicker">{t("verifiedRecordLabel")}</p>
            <h2 id="results-title">{t("resultsTitle")}</h2>
            <p>{t("resultsDescription")}</p>
          </div>
          <FadeContent
            className="results-data"
            effect="fade"
            duration={0.62}
            initialOpacity={0}
            trigger="scroll"
            once
          >
            <div className="result-lead">
              <span className="result-number">47</span>
              <span className="result-label">{t("candidatesSat")}</span>
            </div>
            <div className="result-divisions">
              <div>
                <span className="result-number">14</span>
                <span className="result-label">{t("divisionOne")}</span>
              </div>
              <div>
                <span className="result-number">29</span>
                <span className="result-label">{t("divisionTwo")}</span>
              </div>
              <div>
                <span className="result-number">4</span>
                <span className="result-label">{t("divisionThree")}</span>
              </div>
            </div>
            <div className="result-subject">
              <span className="result-subject-value">31 / 31</span>
              <span className="result-label">{t("islamicEducationResult")}</span>
            </div>
          </FadeContent>
          <div className="results-source">
            <a
              href="https://onlinesys.necta.go.tz/results/2025/csee/results/s4224.htm"
              target="_blank"
              rel="noreferrer"
            >
              {t("resultsSource")} <ArrowUpRight aria-hidden="true" />
            </a>
            <span>{t("resultsSourceNote")}</span>
          </div>
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
