export type ItineraryDay = {
  day: number;
  title_km: string;
  title_en: string;
  description_km: string;
  description_en: string;
  highlights_km: string[];
  highlights_en: string[];
};

export type Itinerary = {
  id: string;
  slug: string;
  title_km: string;
  title_en: string;
  subtitle_km: string;
  subtitle_en: string;
  duration_km: string;
  duration_en: string;
  region_km: string;
  region_en: string;
  best_time_km: string;
  best_time_en: string;
  budget_level: "$" | "$$" | "$$$";
  estimated_cost_usd: string;
  image_url: string;
  overview_km: string;
  overview_en: string;
  days: ItineraryDay[];
  transport_km: string;
  transport_en: string;
};

export const sampleItineraries: Itinerary[] = [
  {
    id: "1",
    slug: "siem-reap-angkor-odyssey",
    title_km: "ដំណើរស្វែងយល់អច្ឆរិយៈអង្គរ ៣ថ្ងៃ ២យប់",
    title_en: "Siem Reap & Angkor Wonder (3 Days / 2 Nights)",
    subtitle_km: "ទស្សនាប្រាសាទបុរាណល្បីៗ ថ្ងៃរះអង្គរវត្ត និងវប្បធម៌រស់រវើក",
    subtitle_en: "Classic temples, Angkor Wat sunrise, local cuisine and cultural circus",
    duration_km: "៣ ថ្ងៃ / ២ យប់",
    duration_en: "3 Days / 2 Nights",
    region_km: "សៀមរាប",
    region_en: "Siem Reap",
    best_time_km: "ខែវិច្ឆិកា ដល់ ខែកុម្ភៈ (រដូវត្រជាក់ស្រួល)",
    best_time_en: "November to February (Pleasant and cool)",
    budget_level: "$$",
    estimated_cost_usd: "$120 - $220 / ម្នាក់",
    image_url: "/images/angkor-wat-header.jpg",
    overview_km: "គម្រោងដំណើរកម្សាន្តដ៏ល្អឥតខ្ចោះសម្រាប់អ្នកដែលចង់ទស្សនាប្រាសាទសំខាន់ៗនៃតំបន់រមណីយដ្ឋានអង្គរ ភ្លក់រសជាតិម្ហូបខ្មែរឆ្ងាញ់ៗ និងស្វែងយល់ពីជីវភាពរស់នៅតាមដងស្ទឹងសៀមរាប។",
    overview_en: "An unforgettable classic itinerary covering Angkor Wat at sunrise, the ancient faces of Bayon, Ta Prohm jungle temple, and Siem Reap's vibrant dining scene.",
    transport_km: "ជិះរ៉ឺម៉កកង់បី (Tuk-Tuk), PassApp ឬកង់ជួលសម្រាប់ជិះកម្សាន្ត",
    transport_en: "Traditional Remork (Tuk-Tuk), PassApp ride-hailing, or rental bicycle",
    days: [
      {
        day: 1,
        title_km: "ថ្ងៃទី ១៖ រង្វង់តូច និងថ្ងៃរះនៅអង្គរវត្ត",
        title_en: "Day 1: Angkor Wat Sunrise & Angkor Thom",
        description_km: "ក្រោកពីព្រលឹមដើម្បីទស្សនាថ្ងៃរះដ៏អស្ចារ្យនៅមុខស្រះស្រង់អង្គរវត្ត។ បន្ទាប់មកទស្សនាប្រាសាទបាយ័ន ខ្លោងទ្វារទន្លេអុំ និងប្រាសាទតាព្រហ្ម។",
        description_en: "Wake up early for the iconic sunrise behind Angkor Wat. Continue to Angkor Thom's Bayon Temple and the iconic jungle-clad Ta Prohm.",
        highlights_km: ["ទស្សនាថ្ងៃរះអង្គរវត្ត", "ប្រាសាទបាយ័នមុខបួន", "ប្រាសាទតាព្រហ្មឫសឈើ", "ញ៉ាំអាហារពេលល្ងាចនៅ Pub Street"],
        highlights_en: ["Angkor Wat reflecting pool sunrise", "Bayon smiling faces", "Ta Prohm tree roots", "Dinner along Pub Street / Old Market"],
      },
      {
        day: 2,
        title_km: "ថ្ងៃទី ២៖ ប្រាសាទបន្ទាយស្រី និងភ្នំបាខែង",
        title_en: "Day 2: Banteay Srei & Sunset at Phnom Bakheng",
        description_km: "ធ្វើដំណើរទៅទស្សនាប្រាសាទបន្ទាយស្រីដែលល្បីល្បាញខាងក្បូរក្បាច់ចម្លាក់ថ្មភក់ពណ៌ផ្កាឈូកយ៉ាងល្អិតល្អន់។ ពេលល្ងាចឡើងភ្នំបាខែងមើលថ្ងៃលិច។",
        description_en: "Travel out to Banteay Srei, the jewel of Khmer art with intricate pink sandstone carvings, followed by a panoramic sunset atop Phnom Bakheng.",
        highlights_km: ["ប្រាសាទបន្ទាយស្រី", "សារមន្ទីរមីន", "មើលថ្ងៃលិចលើភ្នំបាខែង", "ទស្សនាសៀកហ្វារ (Phare Circus)"],
        highlights_en: ["Intricate carvings of Banteay Srei", "Cambodia Landmine Museum", "Phnom Bakheng hill sunset", "Phare Circus live performance"],
      },
      {
        day: 3,
        title_km: "ថ្ងៃទី ៣៖ ភូមិបណ្តែតទឹកបឹងទន្លេសាប និងទិញវត្ថុអនុស្សាវរីយ៍",
        title_en: "Day 3: Tonle Sap Floating Village & Artisans",
        description_km: "ជិះទូកទស្សនាភូមិបណ្តែតទឹកកំពង់ភ្លុកលើបឹងទន្លេសាប និងព្រៃលិចទឹក។ រសៀលចូលទស្សនាសិប្បកម្មអង្គរ (Artisans Angkor) និងផ្សារចាស់។",
        description_en: "Take a scenic boat excursion through the stilted and floating villages of Kampong Phluk on Tonle Sap Lake, then explore local crafts at Artisans Angkor.",
        highlights_km: ["ភូមិបណ្តែតទឹកកំពង់ភ្លុក", "ទូកកម្សាន្តព្រៃលិចទឹក", "សិប្បកម្មអង្គរ", "ទិញវត្ថុអនុស្សាវរីយ៍នៅផ្សារចាស់"],
        highlights_en: ["Kampong Phluk stilt village", "Mangrove canoe ride", "Artisans Angkor silk & stone workshops", "Old Market souvenir shopping"],
      },
    ],
  },
  {
    id: "2",
    slug: "coastal-bliss-kep-kampot-kohrong",
    title_km: "ដំណើរកម្សាន្តតំបន់ឆ្នេរ កែប-កំពត-កោះរ៉ុង ៤ថ្ងៃ ៣យប់",
    title_en: "Southern Coast & Islands: Kep, Kampot & Koh Rong (4 Days / 3 Nights)",
    subtitle_km: "ភ្លក់រសជាតិក្តាមម្រេចកំពត ឡើងភ្នំបូកគោ និងលម្ហែកាយលើកោះខ្សាច់ស",
    subtitle_en: "Seafood feasts, Kampot pepper farms, misty Bokor Mountain and turquoise island waters",
    duration_km: "៤ ថ្ងៃ / ៣ យប់",
    duration_en: "4 Days / 3 Nights",
    region_km: "កែប - កំពត - ព្រះសីហនុ",
    region_en: "Kep - Kampot - Sihanoukville",
    best_time_km: "ខែវិច្ឆិកា ដល់ ខែឧសភា (អាកាសធាតុរលកស្ងប់ និងមេឃស្រឡះ)",
    best_time_en: "November to May (Calm seas and sunny beach days)",
    budget_level: "$$",
    estimated_cost_usd: "$150 - $280 / ម្នាក់",
    image_url: "/images/bokor-national-park.svg",
    overview_km: "ដំណើរកម្សាន្តតាមបណ្តោយឆ្នេរសមុទ្រភាគខាងត្បូងកម្ពុជា រួមបញ្ចូលទាំងការស្រូបយកខ្យល់អាកាសបរិសុទ្ធ ភ្នំបូកគោ ចម្ការម្រេច អាហារសមុទ្រស្រស់ៗ និងកោះធម្មជាតិដ៏ស្រស់ត្រកាល។",
    overview_en: "Discover the relaxed charms of Cambodia's southern coast: historic riverside Kampot, seafood capital Kep, and the tranquil white beaches of Koh Rong.",
    transport_km: "រថយន្តឈ្នួល/តាក់ស៊ី, ម៉ូតូជួល, និងកប៉ាល់ល្បឿនលឿនទៅកោះ (Speed Ferry)",
    transport_en: "Private taxi / minibus, scooter rental, and high-speed island ferries",
    days: [
      {
        day: 1,
        title_km: "ថ្ងៃទី ១៖ ក្រុងកែប និងផ្សារក្តាម",
        title_en: "Day 1: Kep Seafood & Colonial Villas",
        description_km: "ធ្វើដំណើរដល់ក្រុងកែប ញ៉ាំក្តាមសមុទ្រស្រស់ឆាម្រេចខ្ចីនៅផ្សារក្តាម ដើរលេងឆ្នេរកែប និងទស្សនាវីឡាបារាំងបុរាណ។",
        description_en: "Arrive in Kep, indulge in world-famous stir-fried crab with green pepper at the Crab Market, and explore abandoned mid-century villas.",
        highlights_km: ["ញ៉ាំក្តាមស្រស់នៅផ្សារក្តាមកែប", "រូបសំណាកស្រីស្អាត និងក្តាមសមុទ្រ", "ដើរព្រៃឧទ្យានជាតិកែប"],
        highlights_en: ["Kep Crab Market lunch", "Sailing Club sunset drinks", "Kep National Park sunset ridge trail"],
      },
      {
        day: 2,
        title_km: "ថ្ងៃទី ២៖ ឧទ្យានជាតិភ្នំបូកគោ និងក្រុងកំពត",
        title_en: "Day 2: Bokor Hill Station & Kampot Riverside",
        description_km: "ឡើងលើកំពូលភ្នំបូកគោដើម្បីទទួលអារម្មណ៍ត្រជាក់ ទស្សនាសំណង់អគារបារាំងបុរាណ វត្តសំពៅប្រាំ និងទឹកធ្លាក់ពពកវិល។ ពេលល្ងាចជិះទូកមើលអំពិលអំពែកតាមស្ទឹងកំពត។",
        description_en: "Ascend Bokor Mountain to explore the historic French hill station, Sampov Pram pagoda, and cool highland vistas. In the evening, enjoy a firefly cruise on Kampot River.",
        highlights_km: ["ភ្នំបូកគោ និងអាកាសធាតុត្រជាក់", "ចម្ការម្រេចឡាផ្លានតាសិន", "ជិះទូកមើលថ្ងៃលិច និងអំពិលអំពែកស្ទឹងកំពត"],
        highlights_en: ["Bokor Palace & misty lookout", "La Plantation pepper tour", "Kampot riverside sunset and firefly boat"],
      },
      {
        day: 3,
        title_km: "ថ្ងៃទី ៣៖ ឆ្ពោះទៅកាន់ឋានសួគ៌កោះរ៉ុង",
        title_en: "Day 3: Island Escape to Koh Rong",
        description_km: "ជិះរថយន្តទៅកាន់ខេត្តព្រះសីហនុ និងបន្តជិះកប៉ាល់ល្បឿនលឿនទៅកាន់កោះរ៉ុង។ សម្រាកលើឆ្នេរខ្សាច់ស និងមុជទឹកមើលផ្កាថ្ម។",
        description_en: "Transfer to Sihanoukville and catch the fast ferry to Koh Rong. Check into a beachside bungalow and spend the day swimming and snorkeling in clear waters.",
        highlights_km: ["ជិះកប៉ាល់ល្បឿនលឿន", "ឆ្នេរខ្សាច់សកោះរ៉ុង", "មុជទឹកមើលផ្កាថ្ម (Snorkeling)"],
        highlights_en: ["Speedboat crossing", "Powder white sands of Sok San / Koh Touch", "Snorkeling and coral reef boat trip"],
      },
      {
        day: 4,
        title_km: "ថ្ងៃទី ៤៖ ហែលទឹកសមុទ្រព្រលឹម និងត្រឡប់មកវិញ",
        title_en: "Day 4: Morning Swim & Return",
        description_km: "ស្រូបខ្យល់អាកាសបរិសុទ្ធពេលព្រឹកលើកោះ ហែលទឹក និងធ្វើដំណើរត្រឡប់មកកាន់រាជធានីភ្នំពេញតាមផ្លូវល្បឿនលឿន។",
        description_en: "Enjoy a final sunrise swim and beachside breakfast before boarding the return ferry and taking the expressway back to Phnom Penh.",
        highlights_km: ["ហែលទឹកពេលព្រឹកព្រលឹម", "កាហ្វេមាត់ឆ្នេរ", "ធ្វើដំណើរតាមផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ"],
        highlights_en: ["Peaceful morning beach dip", "Expressway journey back to Phnom Penh"],
      },
    ],
  },
  {
    id: "3",
    slug: "phnom-penh-heritage-culture",
    title_km: "រាជធានីភ្នំពេញ៖ បេតិកភណ្ឌ និងវប្បធម៌ ២ថ្ងៃ ១យប់",
    title_en: "Phnom Penh: Capital Heritage & River Culture (2 Days / 1 Night)",
    subtitle_km: "ព្រះបរមរាជវាំង សារមន្ទីរជាតិ និងទេសភាពទន្លេបួនមុខ",
    subtitle_en: "Royal Palace, National Museum, riverside dining, and living history",
    duration_km: "២ ថ្ងៃ / ១ យប់",
    duration_en: "2 Days / 1 Night",
    region_km: "ភ្នំពេញ",
    region_en: "Phnom Penh",
    best_time_km: "ពេញមួយឆ្នាំ (អាកាសធាតុល្អពេញមួយឆ្នាំ)",
    best_time_en: "All year round",
    budget_level: "$",
    estimated_cost_usd: "$60 - $140 / ម្នាក់",
    image_url: "/images/royal-palace.svg",
    overview_km: "ស្វែងយល់ពីរាជធានីភ្នំពេញ «គុជនៃអាស៊ី» តាមរយៈសំណង់ស្ថាបត្យកម្មព្រះបរមរាជវាំង សារមន្ទីរប្រវត្តិសាស្ត្រ និងជីវិតរស់រវើកតាមបណ្តោយមាត់ទន្លេចតុមុខ។",
    overview_en: "A rich cultural city break showcasing Cambodia's vibrant capital, from royal architectural masterpieces to evocative historical landmarks and lively riverside promenades.",
    transport_km: "PassApp / Grab, រ៉ឺម៉កកង់បី ឬដើរថ្មើរជើងតាមមាត់ទន្លេ",
    transport_en: "PassApp / Grab taxi, traditional Tuk-Tuks, and riverside walking",
    days: [
      {
        day: 1,
        title_km: "ថ្ងៃទី ១៖ ព្រះបរមរាជវាំង សារមន្ទីរជាតិ និងទូកកម្សាន្តទន្លេចតុមុខ",
        title_en: "Day 1: Royal Grandeur & Sunset River Cruise",
        description_km: "ទស្សនាព្រះបរមរាជវាំង ព្រះវិហារព្រះកែវមរកត និងសារមន្ទីរជាតិកម្ពុជា។ ពេលល្ងាចជិះទូកកម្សាន្តមើលថ្ងៃលិចលើទន្លេមេគង្គ និងទន្លេសាប។",
        description_en: "Explore the glittering Throne Hall and Silver Pagoda inside the Royal Palace, discover Khmer art at the National Museum, and take an evening Mekong sunset boat ride.",
        highlights_km: ["ព្រះបរមរាជវាំង និងព្រះវិហារប្រាក់", "សារមន្ទីរជាតិកម្ពុជា", "ទូកកម្សាន្តមើលថ្ងៃលិចទន្លេចតុមុខ"],
        highlights_en: ["Royal Palace & Silver Pagoda", "National Museum masterpieces", "Mekong & Tonle Sap sunset boat cruise"],
      },
      {
        day: 2,
        title_km: "ថ្ងៃទី ២៖ ស្វែងយល់ប្រវត្តិសាស្ត្រ និងផ្សារធំថ្មី",
        title_en: "Day 2: Historical Insights & Central Market",
        description_km: "ទស្សនាសារមន្ទីរប្រល័យពូជសាសន៍ទួលស្លែង វត្តភ្នំជាប្រវត្តិសាស្ត្រ និងទិញវត្ថុអនុស្សាវរីយ៍នៅផ្សារធំថ្មី (Central Market)។",
        description_en: "Visit the Tuol Sleng Genocide Museum for profound historical reflection, pay homage at historic Wat Phnom, and admire Art Deco architecture at Central Market.",
        highlights_km: ["វត្តភ្នំ", "សារមន្ទីរទួលស្លែង", "ផ្សារធំថ្មី (Art Deco)", "ភ្លក់នំបញ្ចុក និងកាហ្វេខ្មែរ"],
        highlights_en: ["Wat Phnom hilltop shrine", "Tuol Sleng Genocide Museum", "Central Market shopping", "Local street food tasting"],
      },
    ],
  },
  {
    id: "4",
    slug: "wild-east-mondulkiri-ratanakiri",
    title_km: "ផ្សងព្រេងភាគឦសាន មណ្ឌលគិរី-រតនគិរី ៤ថ្ងៃ ៣យប់",
    title_en: "Wild East Eco-Trek: Mondulkiri & Ratanakiri (4 Days / 3 Nights)",
    subtitle_km: "មើលដំរីក្នុងព្រៃធម្មជាតិ ទឹកធ្លាក់ប៊ូស្រា និងបឹងភ្នំភ្លើងយក្សឡោម",
    subtitle_en: "Ethical elephant trekking, volcanic crater lakes, pine hills and indigenous traditions",
    duration_km: "៤ ថ្ងៃ / ៣ យប់",
    duration_en: "4 Days / 3 Nights",
    region_km: "មណ្ឌលគិរី - រតនគិរី",
    region_en: "Mondulkiri - Ratanakiri",
    best_time_km: "ខែតុលា ដល់ ខែកុម្ភៈ (ព្រៃបៃតងស្រស់ ទឹកធ្លាក់ហូរខ្លាំង និងអាកាសធាតុត្រជាក់)",
    best_time_en: "October to February (Lush green landscapes and full waterfalls)",
    budget_level: "$$$",
    estimated_cost_usd: "$180 - $320 / ម្នាក់",
    image_url: "/images/yeak-laom-lake.svg",
    overview_km: "ដំណើរកម្សាន្តបែបផ្សងព្រេង និងអេកូទេសចរណ៍នៅតំបន់ខ្ពង់រាបភាគឦសាន ជួបជាមួយជនជាតិដើមភាគតិច ដើរមើលដំរីក្នុងជម្រកធម្មជាតិ និងហែលទឹកក្នុងបឹងភ្នំភ្លើងបុរាណ។",
    overview_en: "Immerse yourself in Cambodia's highlands: roll through pine-clad hills, support ethical elephant conservation in Mondulkiri, and swim in the emerald waters of Yeak Laom.",
    transport_km: "រថយន្ត 4WD ឬ Minivan ទេសចរណ៍ និងជួលម៉ូតូសម្រាប់ផ្លូវជនបទ",
    transport_en: "4WD / private minivan and local guided transport",
    days: [
      {
        day: 1,
        title_km: "ថ្ងៃទី ១៖ ឆ្ពោះទៅក្រុងសែនមនោរម្យ និងភ្នំដោះក្រមុំ",
        title_en: "Day 1: Journey to Sen Monorom & Sea Forest Lookout",
        description_km: "ធ្វើដំណើរឡើងទៅកាន់ខេត្តមណ្ឌលគិរ�� ស្រូបយកខ្យល់អាកាសត្រជាក់ ទស្សនាព្រៃស្រល់ និងមើលថ្ងៃលិចនៅសមុទ្រឈើ (Sea Forest)។",
        description_en: "Drive into the rolling highlands of Mondulkiri, take in the crisp mountain air, and watch the sunset over the vast canopy at the Sea Forest viewpoint.",
        highlights_km: ["ទស្សនាទេសភាពសមុទ្រឈើ", "ភ្នំដោះក្រមុំ", "ភ្លក់កាហ្វេមណ្ឌលគិរី"],
        highlights_en: ["Sea Forest panoramic viewpoint", "Phnom Doh Kromom sunset", "Authentic Mondulkiri coffee"],
      },
      {
        day: 2,
        title_km: "ថ្ងៃទី ២៖ ដើរព្រៃជាមួយដំរី និងទឹកធ្លាក់ប៊ូស្រា",
        title_en: "Day 2: Ethical Elephant Walk & Bou Sra Waterfall",
        description_km: "ចំណាយពេលមួយថ្ងៃពេញក្នុងជម្រកដំរីធម្មជាតិ ដើរតាមដំរីក្នុងព្រៃដោយសេរី និងបន្តទៅទស្សនាទឹកធ្លាក់ប៊ូស្រាដ៏អស្ចារ្យ។",
        description_en: "Spend a respectful day trekking alongside rescued elephants with the Elephant Valley Project, followed by a visit to the roaring multi-tiered Bou Sra Waterfall.",
        highlights_km: ["ដើរមើលដំរីក្នុងព្រៃធម្មជាតិ", "ទឹកធ្លាក់ប៊ូស្រា ៣ ជាន់", "ភ្លក់ម្ហូបជនជាតិដើមព្នង"],
        highlights_en: ["Ethical elephant observation in jungle", "Bou Sra Waterfall", "Indigenous Bunong cultural encounter"],
      },
      {
        day: 3,
        title_km: "ថ្ងៃទី ៣៖ ធ្វើដំណើរទៅរតនគិរី និងបឹងយក្សឡោម",
        title_en: "Day 3: Journey to Banlung & Yeak Laom Lake",
        description_km: "បន្តដំណើរទៅកាន់ក្រុងបានលុង ខេត្តរតនគិរី និងចុះហែលទឹកក្នុងបឹងភ្នំភ្លើងយក្សឡោមដ៏ពិសិដ្ឋ និងថ្លាឈ្វេង។",
        description_en: "Travel northward to Banlung, Ratanakiri. Spend the afternoon swimming and walking the serene forest circuit around the emerald Yeak Laom volcanic lake.",
        highlights_km: ["បឹងភ្នំភ្លើង���ក្សឡោម", "ហែលទឹកបឹងធម្មជាតិ", "ទស្សនាសិប្បកម្មជនជាតិដើមទំពួន"],
        highlights_en: ["Yeak Laom volcanic crater lake", "Emerald water swim", "Indigenous Tampuan crafts"],
      },
      {
        day: 4,
        title_km: "ថ្ងៃទី ៤៖ ទឹកធ្លាក់កាចាញ និងត្រឡប់មកវិញ",
        title_en: "Day 4: Ka Choung Waterfall & Return Journey",
        description_km: "ទស្សនាទឹកធ្លាក់កាចាញ ឬកាចាង មុនពេលចាប់ផ្តើមធ្វើដំណើរត្រឡប់មកវិញដោយសុវត្ថិភាព។",
        description_en: "Visit Ka Choung or Ka Chang Waterfall and pick up local roasted cashews before heading on your return journey.",
        highlights_km: ["ទឹកធ្លាក់កាចាញ", "ទិញគ្រាប់ស្វាយចន្ទីរតនគិរី"],
        highlights_en: ["Ka Choung cascade", "Fresh roasted cashew nuts"],
      },
    ],
  },
];
