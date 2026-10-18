import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { LocaleNav } from "~/components/markaz/locale-nav";
import { getLocaleI18n } from "~/i18n";

const levels = ["primary", "secondary"] as const;
const plannedSections = [
  "islamicEducation",
  "schoolLife",
  "newsEvents",
  "admissions",
  "contact",
] as const;

export function InstitutionHeader({
  locale,
  educationLevel,
}: {
  locale: string;
  educationLevel?: "primary" | "secondary";
}) {
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-lockup" to={`/${locale}/`} aria-label={t("brandHome")}>
          <span className="brand-name-stack">
            <span className="brand-wordmark">MARKAZ</span>
            <span className="brand-caption">{t("brandCaption")}</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={t("mainNavigation")}>
          <Link className="header-anchor" to={`/${locale}/`}>
            {t("home")}
          </Link>
          <Link className="header-anchor" to={`/${locale}/#about`}>
            {t("aboutMarkaz")}
          </Link>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("schools")}</NavigationMenuTrigger>
                <NavigationMenuContent className="academics-menu-content">
                  <div className="academics-menu-grid">
                    {levels.map((level, index) => (
                      <NavigationMenuLink asChild key={level}>
                        <Link className="academics-menu-link" to={`/${locale}/${level}/`}>
                          <span className="academics-menu-link-copy">
                            <span className="academics-menu-index">
                              0{index + 1} ·{" "}
                              {t(
                                level === "primary"
                                  ? "primaryPathwayLabel"
                                  : "secondaryPathwayLabel",
                              )}
                            </span>
                            <span className="academics-menu-title">
                              {t(
                                level === "primary"
                                  ? "primaryPathwayLabel"
                                  : "secondaryPathwayLabel",
                              )}
                            </span>
                          </span>
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      </NavigationMenuLink>
                    ))}
                    <NavigationMenuLink asChild>
                      <Link className="academics-menu-results" to={`/${locale}/#results`}>
                        {t("academicResults")} <ArrowUpRight aria-hidden="true" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("more")}</NavigationMenuTrigger>
                <NavigationMenuContent className="more-menu-content">
                  <p className="more-menu-label">{t("inPreparation")}</p>
                  {plannedSections.map((key) => (
                    <span className="more-menu-item" key={key} aria-disabled="true">
                      {t(key)} <small>{t("inPreparation")}</small>
                    </span>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="header-actions">
          <div className="locale-switcher">
            <LocaleNav educationLevel={educationLevel} />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="mobile-menu-trigger"
                variant="outline"
                size="icon"
                aria-label={t("openMenu")}
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="mobile-sheet" side={locale === "ar" ? "left" : "right"}>
              <SheetHeader>
                <SheetTitle>{t("mainNavigation")}</SheetTitle>
                <SheetDescription>{t("prototypeRibbon")}</SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label={t("mainNavigation")}>
                <Link to={`/${locale}/`}>
                  {t("home")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link to={`/${locale}/#about`}>
                  {t("aboutMarkaz")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <p className="mobile-nav-section-label">{t("schools")}</p>
                {levels.map((level) => (
                  <Link key={level} to={`/${locale}/${level}/`}>
                    {t(level === "primary" ? "primaryPathwayLabel" : "secondaryPathwayLabel")}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
                <Link to={`/${locale}/#results`}>
                  {t("academicResults")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <p className="mobile-nav-section-label">{t("inPreparation")}</p>
                {plannedSections.map((key) => (
                  <span className="mobile-nav-planned" key={key} aria-disabled="true">
                    <span aria-hidden="true">—</span>
                    {t(key)}
                    <small>{t("inPreparation")}</small>
                  </span>
                ))}
              </nav>
              <div className="mobile-languages">
                <LocaleNav educationLevel={educationLevel} mode="links" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
