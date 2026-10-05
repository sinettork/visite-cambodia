export type SampleProvince = {
  slug: string;
  name_km: string;
  name_en: string;
};

export type SamplePlace = {
  slug: string;
  category: string;
  image_url: string | null;
  name_km: string;
  name_en: string;
  summary_km: string | null;
  summary_en: string | null;
  ticket_usd: string | null;
  open_hours: string | null;
  lat: string | null;
  lng: string | null;
  province_slug: string;
  province_km: string;
  province_en: string;
  views: number;
};

export const sampleProvinces: SampleProvince[] = [
  { slug: "siem-reap", name_km: "សៀមរាប", name_en: "Siem Reap" },
  { slug: "phnom-penh", name_km: "ភ្នំពេញ", name_en: "Phnom Penh" },
  { slug: "kampot", name_km: "កំពត", name_en: "Kampot" },
  { slug: "kep", name_km: "កែប", name_en: "Kep" },
  { slug: "preah-sihanouk", name_km: "ព្រះសីហនុ", name_en: "Sihanoukville" },
  { slug: "ratanakiri", name_km: "រតនគិរី", name_en: "Ratanakiri" },
];

export const samplePlaces: SamplePlace[] = [
  {
    slug: "angkor-wat",
    category: "history",
    image_url: "/images/angkor-wat.svg",
    name_km: "ប្រាសាទអង្គរវត្ត",
    name_en: "Angkor Wat",
    summary_km: "ប្រាសាទដ៏ធំបំផុតនៅលើពិភពលោក។",
    summary_en: "The largest religious monument in the world.",
    ticket_usd: "37.00",
    open_hours: "05:00-17:30",
    lat: "13.4125",
    lng: "103.8670",
    province_slug: "siem-reap",
    province_km: "សៀមរាប",
    province_en: "Siem Reap",
    views: 100,
  },
  {
    slug: "royal-palace",
    category: "culture",
    image_url: "/images/royal-palace.svg",
    name_km: "រាជវាំង",
    name_en: "Royal Palace",
    summary_km: "ដំណាក់ព្រះមហាក្សត្រនៅរាជធានីភ្នំពេញ។",
    summary_en: "The royal residence in the capital.",
    ticket_usd: "10.00",
    open_hours: "08:00-17:00",
    lat: "11.5636",
    lng: "104.9314",
    province_slug: "phnom-penh",
    province_km: "ភ្នំពេញ",
    province_en: "Phnom Penh",
    views: 80,
  },
  {
    slug: "bokor-national-park",
    category: "nature",
    image_url: "/images/bokor-national-park.svg",
    name_km: "ឧទ្យានជាតិបូកគោ",
    name_en: "Bokor National Park",
    summary_km: "ភ្នំខ្ពស់ដែលមានអាកាសធាតុត្រជាក់។",
    summary_en: "A cool hill station with old colonial ruins.",
    ticket_usd: null,
    open_hours: null,
    lat: "10.6200",
    lng: "104.0500",
    province_slug: "kampot",
    province_km: "កំពត",
    province_en: "Kampot",
    views: 60,
  },
  {
    slug: "kep-crab-market",
    category: "food",
    image_url: "/images/kep-crab-market.svg",
    name_km: "ផ្សារក្តាមកែប",
    name_en: "Kep Crab Market",
    summary_km: "ក្តាមស្រស់ចម្អិនជាមួយម្រេចកំពត។",
    summary_en: "Fresh crab cooked with Kampot pepper.",
    ticket_usd: null,
    open_hours: "07:00-18:00",
    lat: "10.4833",
    lng: "104.3167",
    province_slug: "kep",
    province_km: "កែប",
    province_en: "Kep",
    views: 50,
  },
  {
    slug: "koh-rong",
    category: "beach",
    image_url: "/images/koh-rong.svg",
    name_km: "កោះរ៉ុង",
    name_en: "Koh Rong",
    summary_km: "កោះខ្សាច់ស និងទឹកថ្លា។",
    summary_en: "Island beaches with clear water.",
    ticket_usd: null,
    open_hours: null,
    lat: "10.7000",
    lng: "103.2800",
    province_slug: "preah-sihanouk",
    province_km: "ព្រះសីហនុ",
    province_en: "Sihanoukville",
    views: 70,
  },
  {
    slug: "yeak-laom-lake",
    category: "nature",
    image_url: "/images/yeak-laom-lake.svg",
    name_km: "បឹងយក្សឡោម",
    name_en: "Yeak Laom Lake",
    summary_km: "បឹងភ្នំភ្លើងដ៏ស្អាត។",
    summary_en: "A volcanic crater lake in the forest.",
    ticket_usd: "5.00",
    open_hours: "07:00-17:00",
    lat: "13.9000",
    lng: "106.9800",
    province_slug: "ratanakiri",
    province_km: "រតនគិរី",
    province_en: "Ratanakiri",
    views: 40,
  },
];
