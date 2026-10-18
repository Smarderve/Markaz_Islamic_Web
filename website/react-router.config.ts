import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
  prerender: [
    "/en",
    "/sw",
    "/ar",
    "/en/primary",
    "/sw/primary",
    "/ar/primary",
    "/en/secondary",
    "/sw/secondary",
    "/ar/secondary",
  ],
} satisfies Config;
