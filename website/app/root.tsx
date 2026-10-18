import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { getLocaleI18n, isLocale } from "~/i18n";
import { localeReviewStatus } from "~/i18n/review-status";

import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const localeSegment = useLocation().pathname.split("/").filter(Boolean)[0];
  const locale = isLocale(localeSegment) ? localeSegment : "en";
  const reviewStatus = localeReviewStatus[locale];
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-locale-review-status={reviewStatus}
      data-arabic-translation-review={locale === "ar" ? reviewStatus : undefined}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const localeSegment = useLocation().pathname.split("/").filter(Boolean)[0];
  const locale = isLocale(localeSegment) ? localeSegment : "en";
  const { t } = useTranslation(undefined, { i18n: getLocaleI18n(locale) });
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="localized-error" lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <p className="section-kicker">MARKAZ ISLAMIC SCHOOLS</p>
      <h1>{t(notFound ? "notFoundTitle" : "errorTitle")}</h1>
      <p>{t(notFound ? "notFoundDescription" : "errorDescription")}</p>
      <Link to={`/${locale}/`}>{t("returnHome")}</Link>
    </main>
  );
}
