export type FestivalEvent = {
  id: string;
  slug: string;
  title_km: string;
  title_en: string;
  month_km: string;
  month_en: string;
  typical_dates_km: string;
  typical_dates_en: string;
  location_km: string;
  location_en: string;
  type: "traditional" | "national" | "cultural";
  image_url: string;
  summary_km: string;
  summary_en: string;
  highlights_km: string[];
  highlights_en: string[];
  visitor_tips_km: string;
  visitor_tips_en: string;
};

export const sampleEvents: FestivalEvent[] = [
  {
    id: "1",
    slug: "khmer-new-year",
    title_km: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិខ្មែរ",
    title_en: "Khmer New Year (Choul Chnam Thmey)",
    month_km: "មេសា",
    month_en: "April",
    typical_dates_km: "១៣ - ១៦ មេសា",
    typical_dates_en: "April 13 - 16",
    location_km: "ទូទាំងប្រទេសកម្ពុជា (ពិសេស អង្គរសង្ក្រាន្ត ខេត្តសៀមរាប និងវត្តអារាមនានា)",
    location_en: "Nationwide (Especially Angkor Sankranta in Siem Reap and local pagodas)",
    type: "traditional",
    image_url: "/images/angkor-wat-header.jpg",
    summary_km: "ពិធីបុណ្យប្រពៃណីធំបំផុតប្រចាំឆ្នាំរបស់ប្រជាជនកម្ពុជា ដើម្បីស្វាគមន៍ទេវតាឆ្នាំថ្មី ជួបជុំគ្រួសារ លេងល្បែងប្រជាប្រិយខ្មែរ និងស្រង់ព្រះ។",
    summary_en: "Cambodia's greatest annual celebration marking the end of harvest season with family reunions, temple blessings, traditional folk games, and vibrant street water splashing.",
    highlights_km: [
      "ការទទួលទេវតាឆ្នាំថ្មី និងពូនភ្នំខ្សាច់នៅតាមវត្តអារាម",
      "ការលេងល្បែងប្រជាប្រិយ៖ ទាញព្រ័ត្រ បោះអង្គញ់ ចោលឈូង លាក់កន្សែង",
      "ពិធីស្រង់ព្រះ និងស្រង់ទឹកមាតាបិតាដើម្បីសុំពរជ័យ",
      "ព្រឹត្តិការណ៍អង្គរសង្ក្រាន្ត និងការប្រគំតន្ត្រីកម្សាន្ត",
    ],
    highlights_en: [
      "Welcoming the New Year angel and building sand stupas at pagodas",
      "Traditional folk games: Tug of war (Teanh Proat), Angkunh throwing, Bos Chhung",
      "Sacred Buddha and elder bathing ceremonies for blessings and forgiveness",
      "Angkor Sankranta cultural festivities and live music",
    ],
    visitor_tips_km: "សូមរៀបចំកក់សណ្ឋាគារ និងសំបុត្ររថយន្តទុកជាមុន ព្រោះជាពេលវេលាដែលមានការធ្វើដំណើរច្រើនបំផុត។ ត្រៀមខោអាវផ្លាស់ប្តូរពេលចូលរួមលេងទឹក។",
    visitor_tips_en: "Book accommodations and transport weeks in advance. Carry waterproof bags for phones and electronics if participating in street festivities.",
  },
  {
    id: "2",
    slug: "water-festival-bon-om-touk",
    title_km: "ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក",
    title_en: "Royal Water & Moon Festival (Bon Om Touk)",
    month_km: "វិច្ឆិកា",
    month_en: "November",
    typical_dates_km: "ខែវិច្ឆិកា (ថ្ងៃពេញបូណ៌មី ខែកត្តិក)",
    typical_dates_en: "November (Full moon of Kadeuk lunar month)",
    location_km: "មុខព្រះបរមរាជវាំង មាត់ទន្លេចតុមុខ រាជធានីភ្នំពេញ",
    location_en: "Riverfront in front of the Royal Palace, Phnom Penh",
    type: "national",
    image_url: "/images/angkor-wat-header.jpg",
    summary_km: "ពិធីបុណ្យជាតិដ៏មហោឡារិក ដើម្បីរំលឹកដល់កងទ័ពជើងទឹកខ្មែរបុរាណ និងអបអរសាទរបាតុភូតធម្មជាតិដ៏កម្រនៃការប្តូរទិសដៅចរន្តទឹកទន្លេសាប។",
    summary_en: "Spectacular multi-day boat racing extravaganza commemorating ancient naval victories and celebrating the unique reversal of the Tonle Sap River flow.",
    highlights_km: [
      "ការប្រណាំងទូកងវែងៗរាប់រយគូនៅមុខព្រះពន្លាជ័យ",
      "ការបណ្តែតប្រទីបបំភ្លឺផ្ទៃទឹកទន្លេចតុមុខយ៉ាងត្រចះត្រចង់នៅពេលរាត្រី",
      "ពិធីសំពះព្រះខែ និងអកអំបុកជាមួយចេកទុំ",
      "ការបាញ់កាំជ្រួចអបអរសាទរដ៏ស្រស់ស្អាត",
    ],
    highlights_en: [
      "Hundreds of colourful traditional longboats competing before the King",
      "Illuminated barge procession gliding across the four rivers at nightfall",
      "Midnight Moon Salutation ritual eating Ak Ambok (flattened rice with banana)",
      "Vibrant fireworks displays lighting the Phnom Penh night sky",
    ],
    visitor_tips_km: "តំបន់មាត់ទន្លេភ្នំពេញនឹងមានមនុស្សកុះករ។ គួរធ្វើដំណើរដោយថ្មើរជើង ឬម៉ូតូកង់បី និងប្រយ័ត្នរបស់របរផ្ទាល់ខ្លួន។",
    visitor_tips_en: "Riverfront streets are pedestrianized and draw millions of visitors. Great vantage points fill early—consider hotel balconies along Sisowath Quay.",
  },
  {
    id: "3",
    slug: "pchum-ben-festival",
    title_km: "ពិធីបុណ្យភ្ជុំបិណ្ឌ (បុណ្យកាន់បិណ្ឌ)",
    title_en: "Pchum Ben (Ancestors' Day)",
    month_km: "កញ្ញា / តុលា",
    month_en: "September / October",
    typical_dates_km: "១៥ ថ្ងៃ (រោច ខែភទ្របទ)",
    typical_dates_en: "15 Days (September / October lunar cycle)",
    location_km: "វត្តអារាមទូទាំងប្រទេសកម្ពុជា",
    location_en: "Buddhist pagodas nationwide",
    type: "traditional",
    image_url: "/images/angkor-wat-header.jpg",
    summary_km: "ពិធីបុណ្យសាសនាដ៏ពិសិដ្ឋបំផុត ដែលប្រជាជនខ្មែរទៅវត្តអារាម ដើម្បីវេរចង្ហាន់ដល់ព្រះសង្ឃ ឧទ្ទិសកុសលផលបុណ្យជូនដល់វិញ្ញាណក្ខន្ធបុព្វការីជន និងញាតិការ ៧ សន្តាន។",
    summary_en: "Deeply spiritual 15-day religious period where families visit pagodas at dawn to offer food and transfer merits to departed ancestors and relatives.",
    highlights_km: [
      "ពិធីបោះបាយបិណ្ឌនៅម៉ោង ៤ ព្រឹកព្រលឹមជុំវិញព្រះវិហារ",
      "ការជួបជុំគ្រួសារ និងការរៀបចំម្ហូបខ្មែរប្រពៃណី (នំអន្សមជ្រូក អន្សមចេក)",
      "ការស្តាប់ព្រះធម៌ទេសនា និងវេរភត្តាហារដល់ព្រះសង្ឃ",
    ],
    highlights_en: [
      "Bay Ben pre-dawn ritual offering rice parcels around pagoda sanctuaries",
      "Traditional family feasts with freshly steamed Num Ansom sticky rice cakes",
      "Buddhist chanting, merit-making, and quiet cultural reverence",
    ],
    visitor_tips_km: "សូមស្លៀកពាក់សមរម្យ (អាវមានដៃ មិនខ្លីលើជង្គង់ អាវពណ៌ស) ពេលចូលទៅកាន់វត្តអារាម។",
    visitor_tips_en: "Dress respectfully with covered shoulders and knees (white shirts preferred) when visiting temples during this sacred period.",
  },
  {
    id: "4",
    slug: "sea-festival-cambodia",
    title_km: "ពិធីបុណ្យសមុទ្រ",
    title_en: "Cambodia Sea Festival",
    month_km: "ធ្នូ",
    month_en: "December",
    typical_dates_km: "ពាក់កណ្តាលខែធ្នូ (ឆ្លាស់គ្នាតាមខេត្តតំបន់ឆ្នេរទាំង ៤)",
    typical_dates_en: "Mid-December (Rotates between Kep, Kampot, Koh Kong, Sihanoukville)",
    location_km: "ខេត្តតំបន់ឆ្នេរសមុទ្រកម្ពុជា",
    location_en: "Coastal provinces (Sihanoukville, Kep, Kampot, Koh Kong)",
    type: "cultural",
    image_url: "/images/food/kep-crab-market.jpg",
    summary_km: "ព្រឹត្តិការណ៍ទេសចរណ៍ និងកីឡាប្រចាំឆ្នាំ ដើម្បីលើកកម្ពស់តំបន់ឆ្នេរសមុទ្រកម្ពុជាដែលជាសមាជិកក្លឹបឆ្នេរសមុទ្រដែលស្អាតបំផុតនៅលើពិភពលោក។",
    summary_en: "Annual coastal tourism festival featuring marine sports, seafood exhibitions, live concerts, and beach fireworks.",
    highlights_km: [
      "ការប្រកួត���ីឡាលើទឹក និងការរត់ម៉ារ៉ាតុងតាមមាត់ឆ្នេរ",
      "ពិព័រណ៍ម្ហូបអាហារសមុទ្រស្រស់ៗ និងផលិតផលកសិទេសចរណ៍",
      "ការសម្តែងសិល្បៈវប្បធម៌ និងការប្រគំតន្ត្រីមាត់ឆ្នេរ",
    ],
    highlights_en: [
      "Water sports competitions, beach volleyball, and coastal mini-marathons",
      "Massive seafood street food stalls and artisanal product fairs",
      "Live music concerts and nightly beach fire shows",
    ],
    visitor_tips_km: "ជាឱកាសល្អបំផុតដើម្បីរីករាយជាមួយម្ហូបសមុទ្រស្រស់ៗក្នុងតម្លៃសមរម្យ និងបរិយាកាសរីករាយ។",
    visitor_tips_en: "A vibrant time to experience coastal Cambodia's culinary scene and enjoy lively evening beach atmospheres.",
  },
  {
    id: "5",
    slug: "river-festival-cambodia",
    title_km: "ពិធីបុណ្យទន្លេ",
    title_en: "Cambodia River Festival",
    month_km: "មីនា",
    month_en: "March",
    typical_dates_km: "ខែមីនា (ឆ្លាស់គ្នាតាមបណ្តាខេត្តជាប់ដងទន្លេ)",
    typical_dates_en: "March (Rotates across riparian provinces along Mekong / Tonle Sap)",
    location_km: "បណ្តាខេត្តជាប់ដងទន្លេ (កំពង់ចាម, ក្រចេះ, ស្ទឹងត្រែង, កណ្ដាល, សៀមរាប...)",
    location_en: "Riverine provinces along the Mekong and Tonle Sap",
    type: "cultural",
    image_url: "/images/food/kampot-pepper-crab.jpg",
    summary_km: "ព្រឹត្តិការណ៍អបអរសាទរធនធានធម្មជាតិ និងជីវភាពរស់នៅតាមដងទន្លេមេគង្គ និងទន្លេសាប ដោយមានការតាំងពិព័រណ៍ម្ហូប និងសិល្បៈ។",
    summary_en: "Eco-tourism celebration highlighting the ecological value of Cambodia's waterways, local freshwater gastronomy, and river heritage.",
    highlights_km: [
      "ពិព័រណ៍ផលិតផលក្នុងស្រុក និងម្ហូបត្រីទន្លេធម្មជាតិ",
      "ការប្រណាំងទូក និងការហែលទឹកកម្សាន���ត",
      "ការសម្តែងរបាំប្រពៃណី និងភ្លេងប្រគំ",
    ],
    highlights_en: [
      "Local freshwater fish culinary exhibitions",
      "Traditional boat races and river eco-tours",
      "Folk dance and contemporary Khmer performances",
    ],
    visitor_tips_km: "ឱកាសល្អសម្រាប់អ្នកចូលចិត្តស្វែងយល់ពីរបៀបរស់នៅតាមមាត់ទឹក និងភ្លក់រសជាតិត្រីទន្លេស្រស់ៗ។",
    visitor_tips_en: "Great opportunity to explore provincial towns off the beaten path and sample authentic regional freshwater cuisine.",
  },
];
