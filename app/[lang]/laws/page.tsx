import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cambodia laws for visitors | Visit Cambodia", description: "Read visitor-friendly guides to Cambodian laws and tourism regulations." };

const guides = {
  km: [
    { slug: "road-traffic", title: "ច្បាប់ចរាចរណ៍", desc: "ព័ត៌មានសម្រាប់អ្នកដំណើរ និងប្រភពផ្លូវការ។", source: "សៀវភៅមគ្គុទ្ទេសក៍ទេសចរណ៍ផ្លូវការនៃព្រះរាជាណាចក្រកម្ពុជា · ក្រសួងទេសចរណ៍" },
    { slug: "tourism-law", title: "ច្បាប់ទេសចរណ៍", desc: "សេចក្តីសង្ខេប និងប្រភពច្បាប់ផ្លូវការ។", source: "បណ្ណសារច្បាប់ និងលិខិតបទដ្ឋានគតិយុត្ត · ក្រសួងទេសចរណ៍" },
    { slug: "ministry-instruments", title: "បទប្បញ្ញត្តិទេសចរណ៍", desc: "ប្រភេទឯកសារ និងចំណុចសំខាន់សម្រាប់អ្នកទេសចរ។", source: "បណ្ណសារច្បាប់ និងលិខិតបទដ្ឋានគតិយុត្ត · ក្រសួងទេសចរណ៍" },
  ],
  en: [
    { slug: "road-traffic", title: "Road Traffic", desc: "Visitor information and official sources.", source: "Official Tourism Guidebook of the Kingdom of Cambodia · Ministry of Tourism" },
    { slug: "tourism-law", title: "Tourism Law", desc: "Summary information and official sources.", source: "Tourism law and legal instruments repository · Ministry of Tourism" },
    { slug: "ministry-instruments", title: "Tourism Regulations", desc: "Key instruments and visitor guidance.", source: "Tourism law and legal instruments repository · Ministry of Tourism" },
  ],
} as const;

export default async function LawsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = getLang((await params).lang);
  const km = lang === "km";
  return <Shell lang={lang} variant="laws">
    <header className="browse-heading directory-heading">
      <h1>{km ? "ច្បាប់សម្រាប់អ្នកដំណើរ" : "Travel rules"}</h1>
      <p>{km ? "សេចក្តីសង្ខេប និងប្រភពផ្លូវការ។" : "Plain-language summaries with official sources."}</p>
    </header>
    <div className="law-source-list">
      {guides[lang].map((guide) => <article className="law-source-card" key={guide.slug}>
        <span className="law-source-label">{guide.source}</span>
        <h2>{guide.title}</h2>
        <p>{guide.desc}</p>
        <Link href={`/${lang}/laws/${guide.slug}`}>{km ? "អានមគ្គុទ្ទេសក៍" : "Read this guide"} <span aria-hidden="true">→</span></Link>
      </article>)}
    </div>
    <aside className="law-disclaimer">{km ? "សេចក្តីសង្ខេបទាំងនេះជាព័ត៌មានសម្រាប់អ្នកដំណើរ មិនមែនជាអត្ថបទច្បាប់ផ្លូវការឬការប្រឹក្សាផ្លូវច្បាប់ទេ។ បើមានភាពខុសគ្នា សូមយោងតាមអត្ថបទច្បាប់ខ្មែរដើម និងការផ្សព្វផ្សាយផ្លូវការរបស់អាជ្ញាធរ។" : "These guides are visitor information, not the official legal text or legal advice. Where wording differs, the original Khmer law and official government publications prevail."}</aside>
  </Shell>;
}
