import Link from "next/link";
import { T, type Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const t = T[lang];
  const copy = lang === "km"
    ? {
        intro: "ស្វែងយល់ពីបេតិកភណ្ឌ វប្បធម៌រស់រវើក ទេសភាព និងរសជាតិរបស់កម្ពុជា ហើយរៀបចំដំណើរដោយគោរពប្រជាជន និងទីកន្លែងដែលអ្នកបានជួប។",
        explore: "ស្វែងយល់",
        plan: "រៀបចំដំណើរ",
        note: "ព័ត៌មានអាចផ្លាស់ប្តូរ។ សូមបញ្ជាក់ព័ត៌មានជាមួយប្រភពមូលដ្ឋានមុនចេញដំណើរ។",
      }
    : {
        intro: "Discover Cambodia through its heritage, living culture, landscapes and flavours—then plan a journey that respects the people and places you meet.",
        explore: "Explore",
        plan: "Plan your trip",
        note: "Details can change. Confirm information with local sources before travelling.",
      };

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href={`/${lang}`} className="footer-wordmark">Visit Cambodia<span>.</span></Link>
          <p>{copy.intro}</p>
        </div>
        <nav className="footer-group" aria-label={copy.explore}>
          <h2>{copy.explore}</h2>
          <Link href={`/${lang}/explore`}>{t.destinations}</Link>
          <Link href={`/${lang}/discover`}>{t.discover}</Link>
          <Link href={`/${lang}/events`}>{t.events}</Link>
          <Link href={`/${lang}/food`}>{t.cats.food}</Link>
          <Link href={`/${lang}/map`}>{lang === "km" ? "ផែនទីកន្លែងទេសចរណ៍" : "Places map"}</Link>
        </nav>
        <nav className="footer-group" aria-label={copy.plan}>
          <h2>{copy.plan}</h2>
          <Link href={`/${lang}/itineraries`}>{t.itineraries}</Link>
          <Link href={`/${lang}/saved`}>{t.savedPlaces}</Link>
          <Link href={`/${lang}/tools`}>{t.tools}</Link>
          <Link href={`/${lang}/laws`}>{lang === "km" ? "ច្បាប់សម្រាប់អ្នកទេសចរណ៍" : "Travel laws"}</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>{copy.note}</p>
        <span>© {new Date().getFullYear()} Visit Cambodia</span>
      </div>
    </footer>
  );
}
