export type PhraseCategory = {
  category_km: string;
  category_en: string;
  phrases: Array<{
    km: string;
    phonetic: string;
    en: string;
  }>;
};

export const phrasebookCategories: PhraseCategory[] = [
  {
    category_km: "ការគួរសម និងការសន្ទនាទូទៅ",
    category_en: "Greetings & Polite Essentials",
    phrases: [
      { km: "សួស្ដី", phonetic: "Sour Sdei", en: "Hello (Informal)" },
      { km: "ជំរាបសួរ", phonetic: "Chom Reap Sour", en: "Hello (Formal with Sampeah)" },
      { km: "អរគុណ", phonetic: "Orkun", en: "Thank you" },
      { km: "អរគុណច្រើន", phonetic: "Orkun Chran", en: "Thank you very much" },
      { km: "សូមទោស", phonetic: "Soum Tou", en: "Excuse me / Sorry" },
      { km: "ជំរាបលា", phonetic: "Chom Reap Lea", en: "Goodbye (Formal)" },
      { km: "បាទ / ចាស", phonetic: "Baht (Male) / Chaas (Female)", en: "Yes" },
      { km: "ទេ / អត់ទេ", phonetic: "Te / Ot Te", en: "No" },
      { km: "សុខសប្បាយជាទេ?", phonetic: "Sok Sabay Te?", en: "How are you?" },
      { km: "សុខសប្បាយ", phonetic: "Sok Sabay", en: "I am fine" },
    ],
  },
  {
    category_km: "ការកុម្ម៉ង់ម្ហូប និងភេសជ្ជៈ",
    category_en: "Dining & Ordering Food",
    phrases: [
      { km: "សូមគិតលុយ", phonetic: "Soum Kit Luy", en: "Check / Bill please" },
      { km: "ឆ្ងាញ់ណាស់", phonetic: "Chnganh Nas", en: "Very delicious!" },
      { km: "សូមទឹកបរិសុទ្ធមួយ", phonetic: "Soum Teuk Borisoth Mouy", en: "One bottle of pure water please" },
      { km: "កុំដាក់ស្ករ", phonetic: "Kom Dak Skor", en: "No sugar please" },
      { km: "កុំដាក់ម្ទេស / អត់ហឹរ", phonetic: "Kom Dak Mteh / Ot Houl", en: "Not spicy / No chili" },
      { km: "ខ្ញុំហូបបួស (ម្ហូបបួស)", phonetic: "Knhom Houb Buos (Mhoub Buos)", en: "I am vegetarian" },
      { km: "សូមមីនុយមួយ", phonetic: "Soum Menu Mouy", en: "Can I see the menu please?" },
      { km: "កាហ្វេទឹកដោះគោទឹកកក", phonetic: "Cafe Teuk Doh Kou Teuk Kork", en: "Iced milk coffee" },
    ],
  },
  {
    category_km: "ការទិញឥវ៉ាន់ និងតថ្លៃនៅផ្សារ",
    category_en: "Shopping & Market Bargaining",
    phrases: [
      { km: "ថ្លៃប៉ុន្មាន?", phonetic: "Tlay Ponman?", en: "How much is this?" },
      { km: "ថ្លៃពេកហើយ", phonetic: "Tlay Pek Haey", en: "Too expensive" },
      { km: "ចុះថ្លៃបន្តិចបានទេ?", phonetic: "Choh Tlay Bonteh Ban Te?", en: "Can you give a small discount?" },
      { km: "ខ្ញុំយកមួយនេះ", phonetic: "Knhom Yok Mouy Nih", en: "I will take this one" },
      { km: "មានទំហំធំជាងនេះទេ?", phonetic: "Mean Tomhom Thom Cheang Nih Te?", en: "Do you have a larger size?" },
      { km: "មួយ ពីរ បី បួន ប្រាំ", phonetic: "Mouy, Pi, Bei, Buon, Pram", en: "1, 2, 3, 4, 5" },
      { km: "ដប់ ម្ភៃ ហាសិប មួយរយ", phonetic: "Dop, Mphay, Hahsib, Mouy Roy", en: "10, 20, 50, 100" },
    ],
  },
  {
    category_km: "ទិសដៅ និងការធ្វើដំណើរ",
    category_en: "Directions & Getting Around",
    phrases: [
      { km: "ទៅ...ថ្លៃប៉ុន្មាន?", phonetic: "Tov [Destination] Tlay Ponman?", en: "How much to go to [Destination]?" },
      { km: "បត់ឆ្វេង", phonetic: "Bot Chhveng", en: "Turn left" },
      { km: "បត់ស្តាំ", phonetic: "Bot Sdam", en: "Turn right" },
      { km: "ទៅត្រង់", phonetic: "Tov Trang", en: "Go straight" },
      { km: "ឈប់នៅទីនេះ", phonetic: "Chhob Nov Tinhe", en: "Stop here please" },
      { km: "បន្ទប់ទឹកនៅឯណា?", phonetic: "Bantob Teuk Nov E Na?", en: "Where is the restroom?" },
      { km: "ឆ្ងាយទេ?", phonetic: "Chhngay Te?", en: "Is it far?" },
      { km: "ជិត", phonetic: "Chit", en: "Near / Close" },
    ],
  },
  {
    category_km: "ស្ថានភាពសង្គ្រោះបន្ទាន់",
    category_en: "Emergencies & Help",
    phrases: [
      { km: "ជួយផង!", phonetic: "Chuoy Phorng!", en: "Help!" },
      { km: "ខ្ញុំត្រូវការជួបគ្រូពេទ្យ", phonetic: "Knhom Trovkar Chuob Kruu Pet", en: "I need to see a doctor" },
      { km: "មន្ទីរពេទ្យនៅឯណា?", phonetic: "Montir Pet Nov E Na?", en: "Where is the nearest hospital?" },
      { km: "ខ្ញុំវង្វេងផ្លូវហើយ", phonetic: "Knhom Vongveng Plov Haey", en: "I am lost" },
      { km: "សូមទូរស័ព្ទទៅប៉ូលិស", phonetic: "Soum Tourasap Tov Police", en: "Please call the police" },
    ],
  },
];

export type EmergencyContact = {
  name_km: string;
  name_en: string;
  number: string;
  description_km: string;
  description_en: string;
  category: "police" | "medical" | "fire" | "hotline";
};

export const emergencyContacts: EmergencyContact[] = [
  {
    name_km: "នគរបាលជាតិ (ប៉ូលិស)",
    name_en: "National Police",
    number: "117",
    description_km: "សេវាសង្គ្រោះបន្ទាន់របស់នគរបាលជាតិទូទាំងប្រទេស (ឥតគិតថ្លៃ)",
    description_en: "Nationwide emergency police dispatch (Toll-free)",
    category: "police",
  },
  {
    name_km: "រថយន្តសង្គ្រោះបន្ទាន់ (ពេទ្យ)",
    name_en: "Medical Ambulance Emergency",
    number: "119",
    description_km: "សេវាសង្គ្រោះបន្ទាន់វេជ្ជសាស្ត្រ និងរថយន្តគិលានសង្គ្រោះជាតិ",
    description_en: "National public ambulance and emergency medical dispatch",
    category: "medical",
  },
  {
    name_km: "កងពន្លត់អគ្គិភ័យ",
    name_en: "Fire Department",
    number: "118",
    description_km: "សេវាពន្លត់អគ្គិភ័យ និងសង្គ្រោះគ្រោះមហន្តរាយ",
    description_en: "Nationwide fire and disaster rescue services",
    category: "fire",
  },
  {
    name_km: "នគរបាលទេសចរណ៍ រាជធានីភ្នំពេញ",
    name_en: "Phnom Penh Tourist Police",
    number: "+855 23 724 793",
    description_km: "ការិយាល័យជំនួយ និងការពារសុវត្ថិភាពអ្នកទេសចរនៅភ្នំពេញ",
    description_en: "Dedicated assistance and safety reporting for tourists in Phnom Penh",
    category: "police",
  },
  {
    name_km: "នគរបាលទេសចរណ៍ ខេត្តសៀមរាប (អង្គរ)",
    name_en: "Siem Reap Tourist Police",
    number: "+855 63 760 215",
    description_km: "ការិយាល័យនគរបាលទេសចរណ៍ប្រចាំតំបន់ប្រាសាទអង្គរ និងខេត្តសៀមរាប",
    description_en: "Siem Reap & Angkor Archaeological Park tourist safety office",
    category: "police",
  },
  {
    name_km: "មន្ទីរពេទ្យកាល់ម៉ែត (Calmette Hospital)",
    name_en: "Calmette Hospital Emergency",
    number: "+855 23 426 948",
    description_km: "មន្ទីរពេទ្យធំកម្រិតជាតិ មានសេវាសង្គ្រោះបន្ទាន់ ២៤ ម៉ោង នៅភ្នំពេញ",
    description_en: "Major national tertiary hospital with 24/7 trauma & emergency services in Phnom Penh",
    category: "medical",
  },
  {
    name_km: "មន្ទីរពេទ្យរ៉ូយ៉ាល់ភ្នំពេញ (Royal Phnom Penh Hospital)",
    name_en: "Royal Phnom Penh Hospital",
    number: "+855 23 991 000",
    description_km: "មន្ទីរពេទ្យឯកជនលំដាប់អន្តរជាតិ មានបុគ្គលិកនិយាយច្រើនភាសា",
    description_en: "International-standard hospital (BDMS network) with multilingual emergency care",
    category: "medical",
  },
  {
    name_km: "មន្ទីរពេទ្យរ៉ូយ៉ាល់អង្គរ សៀមរាប (Royal Angkor Hospital)",
    name_en: "Royal Angkor International Hospital",
    number: "+855 63 761 888",
    description_km: "មន្ទីរពេទ្យអន្តរជាតិធំជាងគេនៅខេត្តសៀមរាប",
    description_en: "Leading international hospital in Siem Reap with emergency ambulance services",
    category: "medical",
  },
];
