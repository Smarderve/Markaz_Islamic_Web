import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
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
