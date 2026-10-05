export type Lang = "km" | "en";
export const getLang = (v?: string): Lang => (v === "en" ? "en" : "km");

export const T = {
  km: { search: "ស្វែងរកកន្លែង...", provinces: "ខេត្ត/ក្រុង", all: "ទាំងអស់", popular: "កន្លែងពេញនិយម",
        destinations: "គោលដៅទេសចរណ៍", none: "រកមិនឃើញលទ្ធផល។ សូមសាកល្បងពាក្យផ្សេង។",
        ticket: "តម្លៃសំបុត្រ", hours: "ម៉ោងបើក", province: "ខេត្ត", category: "ប្រភេទ",
        map: "មើលលើផែនទី", free: "ឥតគិតថ្លៃ/មិនបញ្ជាក់", home: "ទំព័រដើម",
        cats: { history: "ប្រវត្តិសាស្ត្រ", nature: "ធម្មជាតិ", beach: "មាត់សមុទ្រ", adventure: "ផ្សងព្រេង", culture: "វប្បធម៌", food: "ម្ហូប" } },
  en: { search: "Search places...", provinces: "Provinces", all: "All", popular: "Popular places",
        destinations: "Destinations", none: "No results. Try another keyword.",
        ticket: "Ticket", hours: "Opening hours", province: "Province", category: "Category",
        map: "View on map", free: "Free / not listed", home: "Home",
        cats: { history: "History", nature: "Nature", beach: "Beach", adventure: "Adventure", culture: "Culture", food: "Food" } },
} as const;

export const pick = (r: Record<string, any>, key: string, lang: Lang): string =>
  r[`${key}_${lang}`] ?? r[`${key}_en`] ?? "";
