import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "leaflet/dist/leaflet.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "../site.css";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { default: "Visit Cambodia | ទេសចរណ៍កម្ពុជា", template: "%s | Visit Cambodia" },
  description: "Discover places to visit, food, stays and travel ideas across Cambodia.",
  keywords: [
    "Cambodia travel", "Cambodia tourism", "Cambodia destinations",
    "ទេសចរណ៍កម្ពុជា", "កន្លែងដើរលេង",
  ],
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

export function generateStaticParams() {
  return [{ lang: "km" }, { lang: "en" }];
}

export default async function RootLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (rawLang !== "km" && rawLang !== "en") notFound();
  const lang = getLang(rawLang);
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
