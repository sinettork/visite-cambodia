import type { Metadata } from "next";
import "./globals.css";
import "./site.css"; // your UI CSS

export const metadata: Metadata = {
  title: "Visit Cambodia | ទេសចរណ៍កម្ពុជា",
  description: "Find places, food and stays across Cambodia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <body>{children}</body>
    </html>
  );
}
