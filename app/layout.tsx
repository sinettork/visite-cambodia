import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "./site.css";

export const metadata: Metadata = {
  title: { default: "Visit Cambodia | ទេសចរណ៍កម្ពុជា", template: "%s | Visit Cambodia" },
  description: "Discover places to visit, food, stays and travel ideas across Cambodia.",
  keywords: [
    "Cambodia travel", "Cambodia tourism", "Cambodia destinations",
    "ទេសចរណ៍កម្ពុជា", "កន្លែងដើរលេង",
  ],
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get("x-site-lang") === "en" ? "en" : "km";
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
