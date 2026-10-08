export type Lang = "en" | "km";

export const copy = {
  en: {
    home: "Home",
    destinations: "Destinations",
    provinces: "Provinces",
    map: "Map",
    plan: "Plan",
    events: "Events",
    itineraries: "Itineraries",
    saved: "Saved Places",
    guides: "Guides & Tools",
    discover: "Discover",
    food: "Food",
    tools: "Travel Tools",
    heroTitle: "Discover Cambodia",
    heroIntro: "Explore heritage, landscapes, food and places worth planning a journey around.",
    explore: "Explore destinations",
    featured: "Popular places",
    regions: "Explore by province",
  },
  km: {
    home: "ទំព័រដើម",
    destinations: "គោលដៅ",
    provinces: "ខេត្ត និងរាជធានី",
    map: "ផែនទី",
    plan: "រៀបចំដំណើរ",
    events: "ព្រឹត្តិការណ៍",
    itineraries: "គម្រោងដំណើរ",
    saved: "កន្លែងដែលបានរក្សាទុក",
    guides: "មគ្គុទ្ទេសក៍ និងឧបករណ៍",
    discover: "ស្វែងយល់",
    food: "ម្ហូប",
    tools: "ឧបករណ៍ធ្វើដំណើរ",
    heroTitle: "ស្វែងយល់ពីកម្ពុជា",
    heroIntro: "ស្វែងយល់ពីបេតិកភណ្ឌ ទេសភាព ម្ហូបអាហារ និងកន្លែងដែលគួររៀបចំដំណើរទៅទស្សនា។",
    explore: "ស្វែងរកគោលដៅ",
    featured: "កន្លែងពេញនិយម",
    regions: "ស្វែងយល់តាមខេត្ត",
  },
} satisfies Record<Lang, Record<string, string>>;

export function normalizeLang(value: string | undefined): Lang {
  return value === "en" ? "en" : "km";
}

export function langHref(lang: Lang, path = "") {
  return `/${lang}${path}`;
}
