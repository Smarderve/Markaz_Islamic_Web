import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route(":locale", "routes/locale-layout.tsx", [
    index("routes/home.tsx"),
    route(":level", "routes/school.tsx"),
  ]),
] satisfies RouteConfig;
