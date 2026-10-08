import { Battambang, Noto_Sans_Khmer, Roboto, Roboto_Condensed } from "next/font/google";
import "../globals.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "../site.css";
import "../admin.css";

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${battambang.variable} ${notoSansKhmer.variable} ${roboto.variable} ${robotoCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
