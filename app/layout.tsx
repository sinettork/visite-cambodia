import type { Metadata } from "next";
import "./globals.css";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <body>{children}</body>
    </html>
  );
};