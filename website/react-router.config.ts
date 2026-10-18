import type { Config } from "@react-router/dev/config";
import { localeReviewStatus } from "./app/i18n/review-status";

const reviewPages = ["", "primary", "secondary"] as const;
const publicApprovedPrerenderPaths = Object.entries(localeReviewStatus)
  .filter(([, status]) => status === "approved")
  .flatMap(([locale]) => reviewPages.map((page) => `/${locale}${page ? `/${page}` : ""}`));
const privatePreviewPrerenderPaths = ["en", "sw", "ar"].flatMap((locale) =>
  reviewPages.map((page) => `/${locale}${page ? `/${page}` : ""}`),
);

export default {
  ssr: false,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
  // Draft translations are prerendered only in an explicitly private preview build.
  prerender:
    process.env.MARKAZ_PRIVATE_PREVIEW === "1"
      ? privatePreviewPrerenderPaths
      : publicApprovedPrerenderPaths,
} satisfies Config;
