import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/language-entry.tsx"),
  route(":locale", "routes/locale-layout.tsx", [
    index("routes/home.tsx"),
    route(":level", "routes/school.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
