import type { Metadata } from "next";
import { headers } from "next/headers";
import { Battambang, Noto_Sans_Khmer, Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "./site.css";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get("x-site-lang") === "en" ? "en" : "km";
  return (
    <html
      lang={lang}
      className={`${battambang.variable} ${notoSansKhmer.variable} ${roboto.variable} ${robotoCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
