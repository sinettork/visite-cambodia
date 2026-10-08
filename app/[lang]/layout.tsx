import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Battambang, Noto_Sans_Khmer, Roboto, Roboto_Condensed } from "next/font/google";
import "../globals.css";
import "leaflet/dist/leaflet.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "../site.css";
import { getLang } from "@/lib/i18n";

const battambang = Battambang({
  weight: ["400", "700"],
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-battambang",
});

const notoSansKhmer = Noto_Sans_Khmer({
  weight: ["400", "500", "700"],
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-noto-sans-khmer",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
});

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
    <html
      lang={lang}
      className={`${battambang.variable} ${notoSansKhmer.variable} ${roboto.variable} ${robotoCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
