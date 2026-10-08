import type { NextConfig } from "next";

const routes = [
  "/",
  "/explore",
  "/discover",
  "/events",
  "/food",
  "/itineraries",
  "/laws",
  "/map",
  "/saved",
  "/tools",
  "/destinations/:slug",
  "/regions/:slug",
  "/laws/:slug",
];

type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  has?: Array<{ type: "query"; key: string; value: string }>;
  missing?: Array<{ type: "query"; key: string }>;
};

const legacyRedirects = routes.flatMap((source) => {
  const targetPath = source === "/" ? "" : source;
  const redirects: LegacyRedirect[] = [
    {
      source,
      destination: `/en${targetPath}`,
      permanent: true,
      has: [{ type: "query" as const, key: "lang", value: "en" }],
    },
    {
      source,
      destination: `/km${targetPath}`,
      permanent: true,
      has: [{ type: "query" as const, key: "lang", value: "km" }],
    },
    {
      source,
      destination: `/km${targetPath}`,
      permanent: true,
      missing: [{ type: "query" as const, key: "lang" }],
    },
  ];

  if (source === "/") {
    for (const lang of ["en", "km"] as const) {
      for (const key of ["q", "province", "category", "type", "page"]) {
        redirects.unshift({
          source,
          destination: `/${lang}/explore`,
          permanent: true,
          has: [
            { type: "query" as const, key: "lang", value: lang },
            { type: "query" as const, key, value: ".+" },
          ],
        });
      }
    }
    for (const key of ["q", "province", "category", "type", "page"]) {
      redirects.unshift({
        source,
        destination: "/km/explore",
        permanent: true,
        missing: [{ type: "query" as const, key: "lang" }],
        has: [{ type: "query" as const, key, value: ".+" }],
      });
    }
  }

  return redirects;
});

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
