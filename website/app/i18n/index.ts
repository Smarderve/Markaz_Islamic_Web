import { createInstance, type i18n } from "i18next";
import { initReactI18next } from "react-i18next";

export const locales = ["en", "sw", "ar"] as const;
export type Locale = (typeof locales)[number];

const resources = {
  en: {
    translation: {
      siteLabel: "MARKAZ ONE · TECHNICAL FOUNDATION",
      sampleNotice: "Technical sample only — not approved school content.",
      homeTitle: "Localized route proof",
      homeCopy:
        "This sample verifies locale routing, page direction, and static rendering. It contains no school claims.",
      primaryRoute: "Primary route sample",
      secondaryRoute: "Secondary route sample",
      routeTitle: "Route rendering sample",
      routeCopy: "Technical demonstration only. No verified school facts or media are used.",
      home: "Home",
      schoolNavigation: "School route samples",
      languageNavigation: "Language navigation",
      motionHeading: "Motion and interaction sample",
      motionCopy:
        "This section demonstrates a small entrance transition and a keyboard-accessible control.",
      action: "Try the interaction",
      actionDone: "Interaction received",
      directionLabel: "Document direction",
      ltr: "Left to right",
      rtl: "Right to left",
    },
  },
  sw: {
    translation: {
      siteLabel: "MARKAZ ONE · MSINGI WA KIUFUNDI",
      sampleNotice: "Mfano wa kiufundi pekee — si maudhui yaliyoidhinishwa na shule.",
      homeTitle: "Uthibitisho wa njia za lugha",
      homeCopy:
        "Mfano huu unathibitisha uelekezaji wa lugha, mwelekeo wa ukurasa na uwasilishaji tuli. Hauna madai kuhusu shule.",
      primaryRoute: "Mfano wa njia ya msingi",
      secondaryRoute: "Mfano wa njia ya sekondari",
      routeTitle: "Mfano wa uwasilishaji wa njia",
      routeCopy: "Maonyesho ya kiufundi pekee. Hakuna ukweli wa shule au picha zilizotumika.",
      home: "Mwanzo",
      schoolNavigation: "Mifano ya njia za shule",
      languageNavigation: "Uchaguzi wa lugha",
      motionHeading: "Mfano wa mwendo na mwingiliano",
      motionCopy:
        "Sehemu hii inaonyesha mwendo mfupi wa kuingia na kitufe kinachoweza kutumiwa kwa kibodi.",
      action: "Jaribu mwingiliano",
      actionDone: "Mwingiliano umepokelewa",
      directionLabel: "Mwelekeo wa hati",
      ltr: "Kushoto kwenda kulia",
      rtl: "Kulia kwenda kushoto",
    },
  },
  ar: {
    translation: {
      siteLabel: "MARKAZ ONE · أساس تقني",
      sampleNotice: "نموذج تقني فقط — ليس محتوى مدرسياً معتمداً.",
      homeTitle: "اختبار المسارات متعددة اللغات",
      homeCopy:
        "يتحقق هذا النموذج من مسارات اللغة واتجاه الصفحة والعرض الثابت. ولا يتضمن ادعاءات عن المدرسة.",
      primaryRoute: "نموذج مسار المرحلة الابتدائية",
      secondaryRoute: "نموذج مسار المرحلة الثانوية",
      routeTitle: "نموذج عرض المسار",
      routeCopy: "عرض تقني فقط. لا تُستخدم فيه حقائق مدرسية موثقة أو صور.",
      home: "الرئيسية",
      schoolNavigation: "نماذج مسارات المدرسة",
      languageNavigation: "التنقل بين اللغات",
      motionHeading: "نموذج الحركة والتفاعل",
      motionCopy: "يعرض هذا القسم حركة دخول بسيطة وعنصراً تفاعلياً يعمل بلوحة المفاتيح.",
      action: "جرّب التفاعل",
      actionDone: "تم استلام التفاعل",
      directionLabel: "اتجاه المستند",
      ltr: "من اليسار إلى اليمين",
      rtl: "من اليمين إلى اليسار",
    },
  },
} as const;

const instances = Object.fromEntries(
  locales.map((locale) => {
    const instance = createInstance();
    void instance.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: false,
      interpolation: { escapeValue: false },
      initAsync: false,
    });
    return [locale, instance];
  }),
) as Record<Locale, i18n>;

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

export function getLocaleI18n(locale: string | undefined): i18n {
  return instances[isLocale(locale) ? locale : "en"];
}
