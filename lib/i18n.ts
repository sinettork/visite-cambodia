export type Lang = "km" | "en";
export const getLang = (v?: string): Lang => (v === "en" ? "en" : "km");

export const T = {
  km: { search: "ស្វែងរកកន្លែង...", provinces: "ខេត្ត/ក្រុង", all: "ទាំងអស់", popular: "កន្លែងពេញនិយម",
        destinations: "គោលដៅទេសចរណ៍", none: "រកមិនឃើញលទ្ធផល។ សូមសាកល្បងពាក្យផ្សេង។",
        discover: "ស្វែងយល់ពីកម្ពុជា",
        ticket: "តម្លៃសំបុត្រ", hours: "ម៉ោងបើក", province: "ខេត្ត", category: "ប្រភេទ",
        map: "មើលលើផែនទី", free: "ឥតគិតថ្លៃ/មិនបញ្ជាក់", home: "ទំព័រដើម",
        thingsToDo: "កន្លែងគួរទៅលេង", whereToStay: "កន្លែងស្នាក់នៅ", whereToEat: "កន្លែងញ៉ាំអាហារ",
        nearby: "កន្លែងនៅជិតនេះ", browseByType: "ស្វែងរកតាមប្រភេទ", noListings: "មិនទាន់មានទីតាំងបានចុះបញ្ជីក្នុងប្រភេទនេះទេ។",
        sources: "ប្រភពព័ត៌មាន",
        guideDisclaimer: "ព័ត៌មានអាចផ្លាស់ប្តូរ។ សូមបញ្ជាក់ម៉ោងបើក តម្លៃ កាលវិភាគធ្វើដំណើរ និងការកក់ជាមួយប្រភពមូលដ្ឋានមុនចេញដំណើរ។",
        placeTypes: { attraction: "កម្សាន្ត និងទស្សនា", accommodation: "ស្នាក់នៅ", restaurant: "អាហារ និងភោជនីយដ្ឋាន" },
        cats: { history: "ប្រវត្តិសាស្ត្រ", nature: "ធម្មជាតិ", beach: "មាត់សមុទ្រ", adventure: "ផ្សងព្រេង", culture: "វប្បធម៌", food: "ម្ហូប" } },
  en: { search: "Search places...", provinces: "Provinces", all: "All", popular: "Popular places",
        destinations: "Destinations", none: "No results. Try another keyword.",
        discover: "Discover Cambodia",
        ticket: "Ticket", hours: "Opening hours", province: "Province", category: "Category",
        map: "View on map", free: "Free / not listed", home: "Home",
        thingsToDo: "Things to do", whereToStay: "Where to stay", whereToEat: "Where to eat",
        nearby: "Nearby places", browseByType: "Browse by type", noListings: "No places have been listed in this category yet.",
        sources: "Sources",
        guideDisclaimer: "Details can change. Confirm opening hours, prices, transport schedules and bookings with local sources before travelling.",
        placeTypes: { attraction: "Things to do", accommodation: "Stays", restaurant: "Food & restaurants" },
        cats: { history: "History", nature: "Nature", beach: "Beach", adventure: "Adventure", culture: "Culture", food: "Food" } },
} as const;

export const pick = (r: Record<string, any>, key: string, lang: Lang): string =>
  r[`${key}_${lang}`] ?? r[`${key}_en`] ?? "";
