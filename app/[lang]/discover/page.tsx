import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import { getLang, T } from "@/lib/i18n";

const guide = {
  km: {
    eyebrow: "មគ្គុទេសក៍ទូទៅ",
    title: "ស្វែងយល់ពីកម្ពុជា",
    intro: "កម្ពុជាជាប្រទេសដែលមានប្រវត្តិសាស្ត្រយូរអង្វែង វប្បធម៌រស់រវើក និងទេសភាពចម្រុះ ចាប់ពីប្រាសាទបុរាណរហូតដល់ឆ្នេរសមុទ្រ និងតំបន់ធម្មជាតិ។",
    sections: [
      {
        title: "ប្រវត្តិសាស្ត្រ",
        paragraphs: [
          "អរិយធម៌ខ្មែរបានរីកចម្រើនជាបន្តបន្ទាប់អស់រយៈពេលជាច្រើនសតវត្សរ៍។ សម័យអង្គរ ដែលមានមជ្ឈមណ្ឌលនៅតំបន់អង្គរ បានបន្សល់ទុកនូវសំណង់ប្រាសាទ និងស្នាដៃសិល្បៈដ៏អស្ចារ្យ។",
          "បន្ទាប់ពីសម័យអង្គរ មជ្ឈមណ្ឌលនយោបាយបានផ្លាស់ប្តូរតាមសម័យកាល។ កម្ពុជាបានទទួលឯករាជ្យពីបារាំងនៅឆ្នាំ ១៩៥៣ ហើយប្រជាជន និងប្រទេសបានឆ្លងកាត់រយៈពេលដ៏លំបាកនៅទសវត្សរ៍ ១៩៧០ មុនពេលចាប់ផ្តើមការស្តារនិងអភិវឌ្ឍឡើងវិញ។",
          "ការទស្សនាប្រាសាទ សារមន្ទីរ និងទីតាំងប្រវត្តិសាស្ត្រផ្សេងៗ អាចជួយឱ្យយល់កាន់តែច្បាស់ពីសម័យកាលនីមួយៗ និងបទពិសោធន៍របស់ប្រជាជនកម្ពុជា។",
        ],
      },
      {
        title: "ភូមិសាស្ត្រ និងធម្មជាតិ",
        paragraphs: [
          "ទន្លេមេគង្គ និងបឹងទន្លេសាបមានតួនាទីសំខាន់ចំពោះជីវភាព ការនេសាទ និងកសិកម្ម។ តំបន់ទាំងនេះក៏បង្កើតជាជម្រកសត្វ និងទេសភាពទឹកដែលប្រែប្រួលតាមរដូវ។",
          "ក្រៅពីវាលទំនាបកណ្ដាល កម្ពុជាមានជួរភ្នំ ព្រៃឈើ ទឹកជ្រោះ និងឆ្នេរសមុទ្រនៅភាគនិរតី។ តំបន់នីមួយៗមានលក្ខណៈខុសៗគ្នា ដូច្នេះគួររៀបចំពេលវេលាធ្វើដំណើរឱ្យសមស្របនឹងផ្លូវ និងរដូវ។",
        ],
      },
      {
        title: "វប្បធម៌ និងប្រពៃណី",
        paragraphs: [
          "ភាសាខ្មែរជាភាសាផ្លូវការ ហើយព្រះពុទ្ធសាសនាថេរវាទមានឥទ្ធិពលយ៉ាងសំខាន់លើជីវិតសហគមន៍ និងពិធីបុណ្យនានា។ របាំ តន្ត្រី សិប្បកម្ម និងម្ហូបអាហារក៏ជាផ្នែកសំខាន់នៃអត្តសញ្ញាណវប្បធម៌ខ្មែរ។",
          "បុណ្យចូលឆ្នាំខ្មែរ បុណ្យភ្ជុំបិណ្ឌ និងបុណ្យអុំទូក គឺជាពិធីបុណ្យដែលមានប្រជាប្រិយភាព។ កាលបរិច្ឆេទ និងព្រឹត្តិការណ៍អាចប្រែប្រួលតាមឆ្នាំ និងទីតាំង។",
          "ពេលចូលវត្ត ឬប្រាសាទ សូមស្លៀកពាក់សមរម្យ គោរពតំបន់សក្ការៈ និងសួរអនុញ្ញាតមុនថតរូបអ្នកដទៃ។",
        ],
      },
      {
        title: "គន្លឹះមុនចេញដំណើរ",
        paragraphs: [
          "រៀបចំផែនការតាមតំបន់ និងទុកពេលសម្រាប់ការធ្វើដំណើរតាមផ្លូវ។ អាកាសធាតុ និងស្ថានភាពផ្លូវអាចមានឥទ្ធិពលលើការធ្វើដំណើរ ជាពិសេសនៅតំបន់ជនបទ។",
          "ប្រាក់រៀលជារូបិយប័ណ្ណជាតិ ហើយប្រាក់ដុល្លារអាមេរិកក៏ត្រូវបានប្រើប្រាស់នៅកន្លែងជាច្រើន។ ត្រៀមប្រាក់រៀលសម្រាប់ការចំណាយតូចៗ និងពិនិត្យមើលលក្ខខណ្ឌទូទាត់នៅកន្លែងដែលអ្នកទៅ។",
          "សូមពិនិត្យព័ត៌មានទិដ្ឋាការ សុវត្ថិភាព សុខភាព កាលវិភាគធ្វើដំណើរ និងម៉ោងបើកពីប្រភពផ្លូវការឬប្រភពមូលដ្ឋានដែលទាន់សម័យ មុនពេលចេញដំណើរ។",
        ],
      },
    ],
    placesTitle: "កន្លែងគួរចាប់ផ្តើមស្វែងយល់",
    placesIntro: "ស្វែងរកព័ត៌មាន និងគោលដៅបន្ថែមតាមតំបន់។ ព័ត៌មានជាក់លាក់ដូចជាម៉ោងបើក និងតម្លៃអាចផ្លាស់ប្តូរ។",
    places: [
      { slug: "angkor-wat", name: "ប្រាសាទអង្គរវត្ត", detail: "ស្វែងយល់ពីស្ថាបត្យកម្ម និងកេរ្តិ៍ដំណែលសម័យអង្គរ។" },
      { slug: "royal-palace", name: "រាជវាំង", detail: "ស្គាល់ទីតាំងសំខាន់មួយនៅកណ្ដាលរាជធានីភ្នំពេញ។" },
      { slug: "bokor-national-park", name: "ឧទ្យានជាតិបូកគោ", detail: "ស្វែងរកទេសភាពភ្នំ និងតំបន់ធម្មជាតិនៅខេត្តកំពត។" },
      { slug: "kep-crab-market", name: "ផ្សារក្តាមកែប", detail: "សាកស្វែងយល់ពីម្ហូបសមុទ្រ និងរសជាតិប្រចាំតំបន់។" },
      { slug: "koh-rong", name: "កោះរ៉ុង", detail: "ស្គាល់តំបន់កោះ និងឆ្នេរសមុទ្រនៅខេត្តព្រះសីហនុ។" },
      { slug: "yeak-laom-lake", name: "បឹងយក្សឡោម", detail: "ស្វែងយល់ពីបឹងភ្នំភ្លើង និងទេសភាពធម្មជាតិនៅរតនគិរី។" },
    ],
    regionsLink: "ស្វែងរកគោលដៅទេសចរណ៍ទាំងអស់",
  },
  en: {
    eyebrow: "Travel guide",
    title: "Discover Cambodia",
    intro: "Cambodia is a country of long history, living traditions and varied landscapes, from ancient temples to coastlines and natural areas.",
    sections: [
      {
        title: "History",
        paragraphs: [
          "Khmer civilization developed across many centuries. The Angkorian period, centered in the Angkor region, left remarkable temples and works of art.",
          "After Angkor, political centers shifted over time. Cambodia gained independence from France in 1953. The country and its people endured a devastating period in the 1970s before beginning a long process of recovery and development.",
          "Visiting temples, museums and other historic sites can help put these different periods and the experiences of Cambodians into context.",
        ],
      },
      {
        title: "Geography and nature",
        paragraphs: [
          "The Mekong River and Tonle Sap Lake are central to livelihoods, fishing and agriculture. They also support wildlife and waterscapes that change with the seasons.",
          "Beyond the central plains, Cambodia has mountain ranges, forests, waterfalls and a southwestern coastline. Each area is different, so allow time for local distances, road conditions and the season.",
        ],
      },
      {
        title: "Culture and traditions",
        paragraphs: [
          "Khmer is the official language, and Theravada Buddhism has a significant place in community life and ceremonies. Dance, music, crafts and food are also important parts of Khmer cultural identity.",
          "Khmer New Year, Pchum Ben and the Water Festival are widely celebrated. Dates and events can vary by year and location.",
          "When visiting pagodas or temples, dress respectfully, follow site guidance and ask before photographing people.",
        ],
      },
      {
        title: "Before you travel",
        paragraphs: [
          "Plan by region and allow enough time for road journeys. Weather and road conditions can affect travel, particularly in rural areas.",
          "The Cambodian riel is the national currency, and US dollars are also used in many places. Keep riel available for small purchases and check payment options at your destination.",
          "Check current visa, safety, health, transport and opening-hour information with official or reliable local sources before travelling.",
        ],
      },
    ],
    placesTitle: "Places to start exploring",
    placesIntro: "Find more information and destinations by region. Details such as opening hours and prices may change.",
    places: [
      { slug: "angkor-wat", name: "Angkor Wat", detail: "Explore the architecture and legacy of the Angkorian period." },
      { slug: "royal-palace", name: "Royal Palace", detail: "Discover an important landmark in the heart of Phnom Penh." },
      { slug: "bokor-national-park", name: "Bokor National Park", detail: "Find mountain scenery and nature in Kampot Province." },
      { slug: "kep-crab-market", name: "Kep Crab Market", detail: "Discover local seafood and regional flavors." },
      { slug: "koh-rong", name: "Koh Rong", detail: "Learn about the islands and coastline of Preah Sihanouk Province." },
      { slug: "yeak-laom-lake", name: "Yeak Laom Lake", detail: "Explore a volcanic lake and natural scenery in Ratanakiri." },
    ],
    regionsLink: "Browse all destinations",
  },
} as const;

export async function generateMetadata({ params }: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = getLang((await params).lang);
  const content = guide[lang];
  return {
    title: content.title,
    description: content.intro,
    alternates: { canonical: `/${lang}/discover` },
    openGraph: { title: `${content.title} | Visit Cambodia`, description: content.intro },
  };
}

export default async function DiscoverPage({ params }: {
  params: Promise<{ lang: string }>;
}) {
  const lang = getLang((await params).lang);
  const t = T[lang];
  const content = guide[lang];
  return (
    <Shell lang={lang} variant="discover">
      <nav className="detail-breadcrumb" aria-label={lang === "km" ? "ទីតាំងបច្ចុប្បន្ន" : "Breadcrumb"}>
        <Link href={`/${lang}/`}>{t.home}</Link><span aria-hidden="true">›</span>
        <span aria-current="page">{t.discover}</span>
      </nav>
      <header className="discover-page-heading">
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </header>

      <nav className="discover-actions" aria-label={lang === "km" ? "ជំហានបន្ទាប់" : "Next steps"}>
        <Link href={`/${lang}/explore#province-list`}>{t.discoverActionRegions} <span aria-hidden="true">›</span></Link>
        <Link href={`/${lang}/food`}>{t.discoverActionFood} <span aria-hidden="true">›</span></Link>
        <Link href={`/explore?type=attraction&lang=${lang}`}>{t.discoverActionPlaces} <span aria-hidden="true">›</span></Link>
      </nav>

      <div className="discover-sections">
        {content.sections.map((section, index) => (
          <section className="discover-section" key={section.title}>
            <span className="discover-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </div>

      <section className="region-section">
        <div className="section-head"><h2>{content.placesTitle}</h2></div>
        <p className="region-section-intro">{content.placesIntro}</p>
        <div className="discover-places">
          {content.places.map((place) => (
            <Link className="discover-place" href={`/${lang}/destinations/${place.slug}`} key={place.slug}>
              <strong>{place.name}</strong>
              <span>{place.detail}</span>
              <span className="discover-place-link">{t.destinations} ›</span>
            </Link>
          ))}
        </div>
        <p className="discover-regions"><Link href={`/${lang}/explore`}>{content.regionsLink} ›</Link></p>
      </section>
    </Shell>
  );
}
