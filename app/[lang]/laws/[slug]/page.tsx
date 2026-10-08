import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import { getLang } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ slug: "road-traffic" }, { slug: "tourism-law" }, { slug: "ministry-instruments" }];
}

export const metadata: Metadata = { title: "Cambodia travel law guide | Visit Cambodia" };

const pages = {
  "road-traffic": {
    km: {
      title: "ច្បាប់ស្តីពីចរាចរណ៍ផ្លូវគោក",
      intro: "ទំព័រនេះបង្ហាញថាឯកសារដែលក្រសួងទេសចរណ៍ផ្សព្វផ្សាយអាចផ្ទៀងផ្ទាត់អ្វីខ្លះអំពីច្បាប់ចរាចរណ៍ផ្លូវគោក។",
      sections: [
        { title: "ឯកសារដែលមានក្នុងប្រភពក្រសួង", body: "បណ្ណសារក្រសួងទេសចរណ៍បង្ហាញសៀវភៅមគ្គុទ្ទេសក៍ទេសចរណ៍ផ្លូវការនៃព្រះរាជាណាចក្រកម្ពុជា ប៉ុន្តែមិនបង្ហាញអត្ថបទច្បាប់ចរាចរណ៍ផ្លូវគោកនៅក្នុងបញ្ជីឯកសារដែលអាចផ្ទៀងផ្ទាត់បានទេ។" },
        { title: "វិសាលភាពទំព័រនេះ", body: "ដើម្បីរក្សាភាពត្រឹមត្រូវ យើងមិនបញ្ចូលកម្រិតល្បឿន កម្រិតអាល់កុល កាតព្វកិច្ចបើកបរ ឬទោសពិន័យឡើយ ព្រោះមិនអាចផ្ទៀងផ្ទាត់ព័ត៌មានទាំងនោះពីឯកសារដែលក្រសួងទេសចរណ៍បានបង្ហាញ។" },
      ],
      source: "ឯកសារយោងរបស់ក្រសួងទេសចរណ៍៖ សៀវភៅមគ្គុទ្ទេសក៍ទេសចរណ៍ផ្លូវការនៃព្រះរាជាណាចក្រកម្ពុជា (បង្ហាញក្នុងបណ្ណសារច្បាប់/ឯកសារផ្លូវការរបស់ក្រសួង)។ ក្នុងឯកសារដែលអាចផ្ទៀងផ្ទាត់បាននៅពេលរៀបចំទំព័រនេះ មិនទាន់មានអត្ថបទច្បាប់ចរាចរណ៍សម្រាប់ដកស្រង់ទេ។",
    },
    en: {
      title: "Law on Road Traffic",
      intro: "This page shows what the Ministry of Tourism's published material can verify about the Law on Road Traffic.",
      sections: [
        { title: "Material in the Ministry source", body: "The Ministry of Tourism repository lists the Official Tourism Guidebook of the Kingdom of Cambodia, but the road traffic law text is not shown among the documents that could be verified." },
        { title: "Scope of this page", body: "To keep this guide accurate, it does not state speed limits, alcohol limits, driving obligations or penalties because these details could not be verified from material published by the Ministry of Tourism." },
      ],
      source: "Ministry of Tourism reference: Official Tourism Guidebook of the Kingdom of Cambodia, listed in the Ministry's legal and official documents repository. The traffic law text was not available in the Ministry material verified for this page.",
    },
  },
  "tourism-law": {
    km: {
      title: "ច្បាប់ស្តីពីទេសចរណ៍",
      intro: "ក្រសួងទេសចរណ៍ចាត់ទុកច្បាប់ស្តីពីទេសចរណ៍ និងលិខិតបទដ្ឋានពាក់ព័ន្ធ ជាក្របខណ្ឌស្នូលសម្រាប់រៀបចំ និងគ្រប់គ្រងវិស័យទេសចរណ៍កម្ពុជា។",
      sections: [
        { title: "តើច្បាប់នេះគ្របដណ្តប់អ្វី?", body: "តាមការពិពណ៌នារបស់ក្រសួង ច្បាប់ និងលិខិតបទដ្ឋានទេសចរណ៍ពាក់ព័ន្ធនឹងការគ្រប់គ្រងវិស័យទេសចរណ៍ និងការរៀបចំវិជ្ជាជីវៈទេសចរណ៍។ បណ្ណសាររបស់ក្រសួងកំពុងចងក្រងច្បាប់ស្តីពីទេសចរណ៍ ព្រះរាជក្រឹត្យ អនុក្រឹត្យ និងប្រកាស។" },
        { title: "អត្ថន័យសម្រាប់អ្នកដំណើរ", body: "ក្របខណ្ឌនេះសំខាន់ចំពោះសេវាកម្មទេសចរណ៍ និងអ្នកប្រកបវិជ្ជាជីវៈក្នុងវិស័យ។ សម្រាប់អ្នកទេសចរ វាជួយឱ្យយល់ថាសេវាកម្មទេសចរណ៍ដំណើរការក្រោមបទប្បញ្ញត្តិជាតិ។ ទំព័រនេះមិនបង្កើតកាតព្វកិច្ចបន្ថែមលើភ្ញៀវទេ។" },
      ],
      source: "ឯកសារយោង៖ បណ្ណសារច្បាប់ និងលិខិតបទដ្ឋានគតិយុត្តរបស់ក្រសួងទេសចរណ៍ និងទំព័របណ្ណសារក្របខណ្ឌគតិយុត្តទេសចរណ៍របស់ក្រសួង។",
    },
    en: {
      title: "Law on Tourism",
      intro: "The Ministry of Tourism describes the Tourism Law and related instruments as part of the core framework for Cambodia's tourism sector.",
      sections: [
        { title: "What does it cover?", body: "The Ministry describes tourism laws and instruments as relating to the management of tourism and tourism professions. Its repository is compiling the Tourism Law, Royal Decrees, Sub-Decrees and Ministerial Prakas." },
        { title: "What visitors should know", body: "This framework matters to tourism services and professionals. For visitors, it explains that tourism services operate under national regulations. This guide does not create additional obligations for visitors." },
      ],
      source: "References: Ministry of Tourism law and legal instruments repository and its tourism policy and legal framework archive.",
    },
  },
  "ministry-instruments": {
    km: {
      title: "លិខិតបទដ្ឋាន និងបទប្បញ្ញត្តិទេសចរណ៍",
      intro: "ក្រៅពីច្បាប់ ក្រសួងទេសចរណ៍ក៏រៀបចំឯកសារច្បាប់ជាច្រើនកម្រិត ដើម្បីបញ្ជាក់ការអនុវត្ត និងការគ្រប់គ្រងវិស័យ។",
      sections: [
        { title: "ប្រភេទឯកសារដែលក្រសួងចងក្រង", body: "បណ្ណសារក្រសួងរាយប្រភេទឯកសាររួមមាន ច្បាប់ និងព្រះរាជក្រឹត្យ អនុក្រឹត្យ ប្រកាសក្រសួង សេចក្តីណែនាំ និងឯកសារពាក់ព័ន្ធនឹងការទទួលស្គាល់ជំនាញទេសចរណ៍អាស៊ាន (ASEAN MRA-TP)។" },
        { title: "ឧទាហរណ៍ឯកសារដែលបានចុះផ្សាយ", body: "បញ្ជីក្រសួងមានប្រកាសអន្តរក្រសួងលេខ ៥៣៧ ចុះថ្ងៃទី ២៩ ខែសីហា ឆ្នាំ ២០២៤ ស្តីពីការផាកពិន័យដែលស្ថិតក្រោមសមត្ថកិច្ចក្រសួងទេសចរណ៍។ ឯកសារនេះបង្ហាញពីសមត្ថកិច្ចលើវិស័យទេសចរណ៍ មិនមែនជាតារាងពិន័យសម្រាប់អ្នកទេសចរទូទៅទេ។" },
        { title: "ការអានឯកសារឱ្យត្រឹមត្រូវ", body: "ពិនិត្យឈ្មោះឯកសារ កាលបរិច្ឆេទ និងវិសាលភាពរបស់វា។ ឯកសារខ្លះមានគោលដៅលើអាជីវកម្ម ឬអ្នកផ្តល់សេវាទេសចរណ៍ ជាជាងអ្នកដំណើរ។ ក្រសួងកំពុងបន្ថែមឯកសារឌីជីថលទៅក្នុងបណ្ណសាររបស់ខ្លួន។" },
      ],
      source: "ឯកសារយោង៖ ក្រសួងទេសចរណ៍ · ច្បាប់ និងលិខិតបទដ្ឋានគតិយុត្ត · ប្រកាសអន្តរក្រសួងលេខ ៥៣៧ សហវ.ប្រក.អទច ចុះថ្ងៃទី ២៩ ខែសីហា ឆ្នាំ ២០២៤។",
    },
    en: {
      title: "Tourism regulations and legal instruments",
      intro: "Alongside laws, the Ministry of Tourism maintains instruments that guide implementation and oversight of the sector.",
      sections: [
        { title: "Types of documents in the Ministry repository", body: "The Ministry lists laws and Royal Decrees, Sub-Decrees, Ministerial Prakas, guidelines and documents related to ASEAN tourism professional recognition (ASEAN MRA-TP)." },
        { title: "Example of a published instrument", body: "The Ministry list includes Inter-Ministerial Prakas No. 537 dated 29 August 2024 on penalties within the jurisdiction of the Ministry of Tourism. It concerns the Ministry's tourism-sector authority; it is not a general fine schedule for visitors." },
        { title: "How to read these documents", body: "Check each document's title, date and scope. Some instruments concern tourism businesses and service providers rather than travelers. The Ministry says its digital archive is still being expanded." },
      ],
      source: "Reference: Ministry of Tourism · Law and legal instruments · Inter-Ministerial Prakas No. 537 S.H.V.Prak.A.T.Ch dated 29 August 2024.",
    },
  },
} as const;

export default async function LawGuidePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug, lang: routeLang } = await params;
  const lang = getLang(routeLang);
  const entry = pages[slug as keyof typeof pages];
  if (!entry) notFound();
  const page = entry[lang];
  return <Shell lang={lang} variant="editorial">
    <nav className="detail-breadcrumb" aria-label={lang === "km" ? "ទីតាំងទំព័រ" : "Breadcrumb"}>
      <Link href={`/${lang}/`}>{lang === "km" ? "ទំព័រដើម" : "Home"}</Link><span aria-hidden="true">›</span>
      <Link href={`/${lang}/laws`}>{lang === "km" ? "ច្បាប់សម្រាប់អ្នកដំណើរ" : "Travel laws"}</Link><span aria-hidden="true">›</span>
      <span aria-current="page">{page.title}</span>
    </nav>
    <header className="browse-heading directory-heading law-guide-heading">
      <h1>{page.title}</h1>
      <p>{page.intro}</p>
    </header>
    <div className="law-guide-sections">
      {page.sections.map((section) => <section key={section.title} className="law-guide-section"><h2>{section.title}</h2><p>{section.body}</p></section>)}
    </div>
    <aside className="law-disclaimer"><strong>{lang === "km" ? "ប្រភពឯកសារ" : "Source material"}</strong><br />{page.source}</aside>
    <p className="law-back-link"><Link href={`/${lang}/laws`}>← {lang === "km" ? "ត្រឡប់ទៅមគ្គុទ្ទេសក៍ច្បាប់" : "Back to travel law guides"}</Link></p>
  </Shell>;
}
