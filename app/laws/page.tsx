import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cambodia laws for visitors | Visit Cambodia", description: "Read visitor-friendly guides to Cambodian laws and tourism regulations." };

const guides = {
  km: [
    { slug: "road-traffic", title: "ច្បាប់ស្តីពីចរាចរណ៍ផ្លូវគោក", desc: "ទំព័រណែនាំអ្នកធ្វើដំណើរអំពីប្រភពឯកសារផ្លូវការ និងវិសាលភាពព័ត៌មានចរាចរណ៍ដែលយើងអាចបញ្ជាក់បាន។", source: "សៀវភៅមគ្គុទ្ទេសក៍ទេសចរណ៍ផ្លូវការនៃព្រះរាជាណាចក្រកម្ពុជា · ក្រសួងទេសចរណ៍" },
    { slug: "tourism-law", title: "ច្បាប់ស្តីពីទេសចរណ៍", desc: "ស្វែងយល់ពីក្របខណ្ឌច្បាប់ដែលក្រសួងទេសចរណ៍រៀបចំសម្រាប់វិស័យទេសចរណ៍កម្ពុជា។", source: "បណ្ណសារច្បាប់ និងលិខិតបទដ្ឋានគតិយុត្ត · ក្រសួងទេសចរណ៍" },
    { slug: "ministry-instruments", title: "លិខិតបទដ្ឋាន និងបទប្បញ្ញត្តិទេសចរណ៍", desc: "មគ្គុទ្ទេសក៍អំពីប្រភេទលិខិតបទដ្ឋានដែលក្រសួងទេសចរណ៍ផ្សព្វផ្សាយ និងចំណុចដែលអ្នកទេសចរគួរយល់។", source: "បណ្ណសារច្បាប់ និងលិខិតបទដ្ឋានគតិយុត្ត · ក្រសួងទេសចរណ៍" },
  ],
  en: [
    { slug: "road-traffic", title: "Law on Road Traffic", desc: "A visitor guide to the official source and the limits of traffic information we can currently confirm.", source: "Official Tourism Guidebook of the Kingdom of Cambodia · Ministry of Tourism" },
    { slug: "tourism-law", title: "Law on Tourism", desc: "An introduction to the legal framework the Ministry of Tourism maintains for Cambodia's tourism sector.", source: "Tourism law and legal instruments repository · Ministry of Tourism" },
    { slug: "ministry-instruments", title: "Tourism regulations and legal instruments", desc: "Understand the types of instruments published by the Ministry of Tourism and what visitors should know.", source: "Tourism law and legal instruments repository · Ministry of Tourism" },
  ],
} as const;

export default async function LawsPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = getLang((await searchParams).lang);
  const km = lang === "km";
  return <Shell lang={lang} variant="laws">
    <header className="browse-heading directory-heading">
      <h1>{km ? "ស្គាល់ច្បាប់មុនធ្វើដំណើរ" : "Know the rules before you travel"}</h1>
      <p>{km ? "អានសេចក្តីសង្ខេបជាភាសាសាមញ្ញនៅទីនេះ។ យើងយោងតែឯកសារដែលក្រសួងទេសចរណ៍ផ្សព្វផ្សាយ ហើយបែងចែកឱ្យច្បាស់រវាងច្បាប់សម្រាប់អ្នកទេសចរ និងបទប្បញ្ញត្តិសម្រាប់អាជីវកម្មទេសចរណ៍។" : "Read plain-language guides here. These pages use documents published by the Ministry of Tourism and distinguish visitor information from rules for tourism businesses."}</p>
    </header>
    <div className="law-source-list">
      {guides[lang].map((guide) => <article className="law-source-card" key={guide.slug}>
        <span className="law-source-label">{guide.source}</span>
        <h2>{guide.title}</h2>
        <p>{guide.desc}</p>
        <Link href={`/laws/${guide.slug}?lang=${lang}`}>{km ? "អានមគ្គុទ្ទេសក៍" : "Read this guide"} <span aria-hidden="true">→</span></Link>
      </article>)}
    </div>
    <aside className="law-disclaimer">{km ? "សេចក្តីសង្ខេបទាំងនេះជាព័ត៌មានសម្រាប់អ្នកដំណើរ មិនមែនជាអត្ថបទច្បាប់ផ្លូវការឬការប្រឹក្សាផ្លូវច្បាប់ទេ។ បើមានភាពខុសគ្នា សូមយោងតាមអត្ថបទច្បាប់ខ្មែរដើម និងការផ្សព្វផ្សាយផ្លូវការរបស់អាជ្ញាធរ។" : "These guides are visitor information, not the official legal text or legal advice. Where wording differs, the original Khmer law and official government publications prevail."}</aside>
  </Shell>;
}
