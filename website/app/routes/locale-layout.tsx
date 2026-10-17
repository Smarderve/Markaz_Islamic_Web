import { Outlet, useParams } from "react-router";
import { I18nextProvider } from "react-i18next";
import { getLocaleI18n, isLocale } from "~/i18n";

export default function LocaleLayout() {
  const { locale } = useParams();
  if (!isLocale(locale)) {
    throw new Response("Unsupported locale", { status: 404 });
  }
  return (
    <I18nextProvider i18n={getLocaleI18n(locale)}>
      <Outlet />
    </I18nextProvider>
  );
}
