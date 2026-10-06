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
          <Link href={`/?lang=${lang}`} className="footer-wordmark">Visit Cambodia<span>.</span></Link>
          <p>{copy.intro}</p>
        </div>
        <nav className="footer-group" aria-label={copy.explore}>
          <h2>{copy.explore}</h2>
          <Link href={`/explore?lang=${lang}`}>{t.destinations}</Link>
          <Link href={`/discover?lang=${lang}`}>{t.discover}</Link>
          <Link href={`/events?lang=${lang}`}>{t.events}</Link>
          <Link href={`/food?lang=${lang}`}>{t.cats.food}</Link>
          <Link href={`/map?lang=${lang}`}>{lang === "km" ? "ផែនទីកន្លែងទេសចរណ៍" : "Places map"}</Link>
        </nav>
        <nav className="footer-group" aria-label={copy.plan}>
          <h2>{copy.plan}</h2>
          <Link href={`/itineraries?lang=${lang}`}>{t.itineraries}</Link>
          <Link href={`/saved?lang=${lang}`}>{t.savedPlaces}</Link>
          <Link href={`/tools?lang=${lang}`}>{t.tools}</Link>
          <Link href={`/laws?lang=${lang}`}>{lang === "km" ? "ច្បាប់សម្រាប់អ្នកទេសចរណ៍" : "Travel laws"}</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>{copy.note}</p>
        <span>© {new Date().getFullYear()} Visit Cambodia</span>
      </div>
    </footer>
  );
}
