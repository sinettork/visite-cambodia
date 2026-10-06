import type { Metadata } from "next";
import Link from "next/link";
import PlaceCard from "@/components/PlaceCard";
import Shell from "@/components/Shell";
import { getLang, T } from "@/lib/i18n";
import { getPlaces } from "@/lib/queries";

const foodGuide = {
  en: {
    eyebrow: "Food guide",
    title: "Taste the flavours of Cambodia",
    intro: "Khmer food brings together fresh herbs, fragrant spices, rice, freshwater fish, vegetables and carefully layered flavours. Start at a morning market, try a regional speciality, and learn the story behind every shared plate.",
    heroImageAlt: "Pepper and spices for sale at Kep Crab Market in Cambodia",
    heroPhotoCredit: "PsamatheM",
    heroPhotoSource: "https://commons.wikimedia.org/wiki/File:06-Kep_Crab_Market_Cambodia-nX-3.jpg",
    heroPhotoLicense: "CC BY-SA 4.0",
    heroPhotoLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    dishesTitle: "Dishes to discover",
    dishes: [
      { name: "Fish amok", localName: "Amok trey", description: "A gently steamed Khmer curry, often made with fish, coconut and fragrant kroeung paste, traditionally served in a banana-leaf cup.", tags: "Fish · Coconut", image: "/images/food/fish-amok.jpg", imageAlt: "Fish amok served with rice in banana-leaf cups", photoCredit: "Ben Yapp", photoSource: "https://commons.wikimedia.org/wiki/File:Fish_Amok-_Khmer_specialty.jpg", photoLicense: "CC BY 2.0", photoLicenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
      { name: "Beef lok lak", localName: "Lok lak sach ko", description: "Tender stir-fried beef with fresh vegetables and a bright lime-and-pepper dipping sauce, often served with rice and a fried egg.", tags: "Beef · Main dish", image: "/images/food/beef-lok-lak.jpg", imageAlt: "A serving of Cambodian beef lok lak", photoCredit: "James Antrobus", photoSource: "https://commons.wikimedia.org/wiki/File:Beef_Lok_Lak.jpg", photoLicense: "CC BY 2.0", photoLicenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
      { name: "Nom banh chok", localName: "Nom banh chok", description: "Fresh rice noodles served with a light fish-based curry and crisp herbs—a much-loved breakfast across Cambodia.", tags: "Breakfast · Fish", image: "/images/food/nom-banh-chok.jpg", imageAlt: "Nom banh chok rice noodles with fish curry and fresh herbs", photoCredit: "Stefan Fussan", photoSource: "https://commons.wikimedia.org/wiki/File:Cambodian_Num_Pachok.jpg", photoLicense: "CC BY-SA 3.0", photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
      { name: "Bai sach chrouk", localName: "Bai sach chrouk", description: "Grilled pork and rice, commonly enjoyed in the morning with pickles, broth or a fried egg.", tags: "Breakfast · Pork" },
      { name: "Samlor korkor", localName: "Samlor korkor", description: "A hearty Khmer soup with vegetables, herbs and a deeply savoury base; recipes vary by family and region.", tags: "Soup · Seasonal" },
      { name: "Kampot pepper crab", localName: "Kdam meric Kampot", description: "Fresh crab cooked with locally celebrated green pepper, a signature dish of Cambodia’s southern coast.", tags: "Kep · Seafood", image: "/images/food/kampot-pepper-crab.jpg", imageAlt: "Crab cooked with green pepper", photoCredit: "eric yeargan", photoSource: "https://commons.wikimedia.org/wiki/File:Fried_crab_with_green_pepper.jpg", photoLicense: "CC BY 2.0", photoLicenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
    ],
    placesTitle: "Eat by place",
    places: [
      { slug: "phnom-penh", name: "Phnom Penh", detail: "Explore market breakfasts, riverside dining and contemporary Khmer cuisine." },
      { slug: "siem-reap", name: "Siem Reap", detail: "Find local markets, Khmer cooking classes and regional dishes." },
      { slug: "kep", name: "Kep", detail: "Discover seafood and the local crab-market culture." },
      { slug: "kampot", name: "Kampot", detail: "Explore pepper, riverside dining and countryside producers." },
    ],
    marketTitle: "A few market tips",
    marketTips: [
      "Go early to experience the morning market at its liveliest.",
      "Ask before photographing vendors or food preparation.",
      "For street food, look for busy stalls where food is cooked hot and served on clean surfaces.",
      "Ask what is seasonal and confirm prices before ordering.",
    ],
    cookingTitle: "Cooking classes",
    cookingText: "A class can be a lovely way to learn about Khmer ingredients and home cooking. Before booking, check the location, length, dishes, language, group size, dietary options and whether a market visit is included.",
    dietaryTitle: "Dietary needs",
    dietaryText: "Recipes and ingredients vary. Tell the restaurant about your dietary needs and confirm ingredients directly; we cannot guarantee that any dish is allergen-free.",
    listingsTitle: "Food places",
    listingsIntro: "Browse the food and restaurant places currently listed in our guide. Confirm opening hours and details directly before visiting.",
    browseAll: "Browse all food & restaurants",
    empty: "We’re adding more food places. Browse restaurants across Cambodia or explore the regional food guide above.",
    viewPlace: "View place",
    titleTemplate: "Cambodian Food: Dishes, Markets & Regional Flavours",
    description: "Discover Khmer dishes, market tips and regional food experiences in Phnom Penh, Siem Reap, Kep and Kampot.",
  },
  km: {
    eyebrow: "មគ្គុទ្ទេសក៍ម្ហូបអាហារ",
    title: "ស្វែងយល់ពីរសជាតិម្ហូបកម្ពុជា",
    intro: "ម្ហូបខ្មែររួមបញ្ចូលឱសថស្រស់ គ្រឿងទេស អង្ករ ត្រីទឹកសាប និងបន្លែ។ ចាប់ផ្តើមពីផ្សារពេលព្រឹក សាកម្ហូបប្រចាំតំបន់ និងស្វែងយល់ពីរឿងរ៉ាវនៅពីក្រោយម្ហូបនីមួយៗ។",
    heroImageAlt: "ម្រេច និងគ្រឿងទេសដាក់លក់នៅផ្សារក្តាមកែប",
    heroPhotoCredit: "PsamatheM",
    heroPhotoSource: "https://commons.wikimedia.org/wiki/File:06-Kep_Crab_Market_Cambodia-nX-3.jpg",
    heroPhotoLicense: "CC BY-SA 4.0",
    heroPhotoLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    dishesTitle: "ម្ហូបគួរសាក",
    dishes: [
      { name: "អាម៉ុកត្រី", localName: "Fish amok", description: "ម្ហូបការីខ្មែរចំហុយ ដែលជាទូទៅធ្វើពីត្រី ខ្ទិះដូង និងគ្រឿងបុក ហើយអាចដាក់ក្នុងស្លឹកចេក។", tags: "ត្រី · ដូង", image: "/images/food/fish-amok.jpg", imageAlt: "អាម៉ុកត្រីបម្រើជាមួយបាយក្នុងស្លឹកចេក", photoCredit: "Ben Yapp", photoSource: "https://commons.wikimedia.org/wiki/File:Fish_Amok-_Khmer_specialty.jpg", photoLicense: "CC BY 2.0", photoLicenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
      { name: "ឡុកឡាក់សាច់គោ", localName: "Beef lok lak", description: "សាច់គោឆាជាមួយបន្លែស្រស់ និងទឹកជ្រលក់ម្រេចក្រូចឆ្មារ ជាញឹកញាប់ញ៉ាំជាមួយបាយ និងស៊ុតចៀន។", tags: "សាច់គោ · ម្ហូបចម្បង", image: "/images/food/beef-lok-lak.jpg", imageAlt: "ម្ហូបឡុកឡាក់សាច់គោបម្រើក្នុងចាន", photoCredit: "James Antrobus", photoSource: "https://commons.wikimedia.org/wiki/File:Beef_Lok_Lak.jpg", photoLicense: "CC BY 2.0", photoLicenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
      { name: "នំបញ្ចុក", localName: "Nom banh chok", description: "នំបញ្ចុកស្រស់ញ៉ាំជាមួយសម្លការីត្រីស្រាល និងបន្លែឱសថ ដែលពេញនិយមសម្រាប់អាហារពេលព្រឹក។", tags: "អាហារពេលព្រឹក · ត្រី", image: "/images/food/nom-banh-chok.jpg", imageAlt: "នំបញ្ចុកជាមួយសម្លការីត្រី និងឱសថស្រស់", photoCredit: "Stefan Fussan", photoSource: "https://commons.wikimedia.org/wiki/File:Cambodian_Num_Pachok.jpg", photoLicense: "CC BY-SA 3.0", photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
      { name: "បាយសាច់ជ្រូក", localName: "Bai sach chrouk", description: "សាច់ជ្រូកអាំងជាមួយបាយ ដែលគេនិយមញ៉ាំពេលព្រឹកជាមួយបន្លែជ្រក់ ឬទឹកស៊ុប។", tags: "អាហារពេលព្រឹក · សាច់ជ្រូក" },
      { name: "សម្លកកូរ", localName: "Samlor korkor", description: "សម្លខ្មែរដែលមានបន្លែ និងឱសថជាច្រើន។ របៀបធ្វើអាចខុសគ្នាតាមគ្រួសារ និងតំបន់។", tags: "សម្ល · តាមរដូវ" },
      { name: "ក្តាមម្រេចកំពត", localName: "Kampot pepper crab", description: "ក្តាមស្រស់ចម្អិនជាមួយម្រេចបៃតងដែលល្បីនៅក្នុងតំបន់ ជាម្ហូបពិសេសមួយនៃឆ្នេរភាគខាងត្បូង។", tags: "កែប · គ្រឿងសមុទ្រ", image: "/images/food/kampot-pepper-crab.jpg", imageAlt: "ក្តាមចម្អិនជាមួយម្រេចបៃតង", photoCredit: "eric yeargan", photoSource: "https://commons.wikimedia.org/wiki/File:Fried_crab_with_green_pepper.jpg", photoLicense: "CC BY 2.0", photoLicenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
    ],
    placesTitle: "ស្វែងរកម្ហូបតាមតំបន់",
    places: [
      { slug: "phnom-penh", name: "ភ្នំពេញ", detail: "ស្វែងរកអាហារពេលព្រឹកតាមផ្សារ ភោជនីយដ្ឋានមាត់ទន្លេ និងម្ហូបខ្មែរសម័យថ្មី។" },
      { slug: "siem-reap", name: "សៀមរាប", detail: "ស្វែងរកផ្សារក្នុងតំបន់ ថ្នាក់រៀនធ្វើម្ហូបខ្មែរ និងម្ហូបប្រចាំតំបន់។" },
      { slug: "kep", name: "កែប", detail: "ស្វែងយល់ពីគ្រឿងសមុទ្រ និងវប្បធម៌ផ្សារក្តាមក្នុងតំបន់។" },
      { slug: "kampot", name: "កំពត", detail: "ស្វែងយល់ពីម្រេចកំពត អាហារមាត់ទន្លេ និងផលិតផលពីស្រែចម្ការ។" },
    ],
    marketTitle: "គន្លឹះពេលទៅផ្សារ",
    marketTips: [
      "ទៅផ្សារពេលព្រឹក ដើម្បីទទួលបានបរិយាកាសសកម្ម។",
      "សូមសួរមុនពេលថតរូបអ្នកលក់ ឬការរៀបចំម្ហូប។",
      "ពេលជ្រើសរើសអាហារតាមផ្លូវ សង្កេតមើលកន្លែងដែលមានអ្នកទិញច្រើន និងចម្អិនក្តៅៗ។",
      "សួរអំពីម្ហូបតាមរដូវ និងបញ្ជាក់តម្លៃមុនកុម្ម៉ង់។",
    ],
    cookingTitle: "ថ្នាក់រៀនធ្វើម្ហូប",
    cookingText: "ថ្នាក់រៀនអាចជួយឱ្យស្គាល់គ្រឿងផ្សំ និងការធ្វើម្ហូបខ្មែរ។ មុនកក់ សូមពិនិត្យទីតាំង រយៈពេល មុខម្ហូប ភាសា ចំនួនអ្នកចូលរួម ជម្រើសអាហារ និងថាតើមានដំណើរទៅផ្សារឬអត់។",
    dietaryTitle: "តម្រូវការអាហារ",
    dietaryText: "រូបមន្ត និងគ្រឿងផ្សំអាចខុសគ្នា។ សូមប្រាប់ភោជនីយដ្ឋានអំពីតម្រូវការរបស់អ្នក និងបញ្ជាក់គ្រឿងផ្សំដោយផ្ទាល់។ យើងមិនអាចធានាថាម្ហូបណាមួយគ្មានសារធាតុបង្កអាឡែស៊ីបានទេ។",
    listingsTitle: "ទីកន្លែងទទួលទានអាហារ",
    listingsIntro: "ស្វែងរកទីកន្លែងម្ហូប និងភោជនីយដ្ឋានដែលមានក្នុងមគ្គុទ្ទេសក៍។ សូមបញ្ជាក់ម៉ោងបើក និងព័ត៌មានជាមួយទីកន្លែងដោយផ្ទាល់មុនទៅ។",
    browseAll: "ស្វែងរកអាហារ និងភោជនីយដ្ឋានទាំងអស់",
    empty: "យើងកំពុងបន្ថែមទីកន្លែងម្ហូបបន្ថែម។ អ្នកអាចស្វែងរកភោជនីយដ្ឋានទូទាំងកម្ពុជា ឬមើលមគ្គុទ្ទេសក៍ម្ហូបតាមតំបន់ខាងលើ។",
    viewPlace: "មើលព័ត៌មានទីតាំង",
    titleTemplate: "ម្ហូបកម្ពុជា៖ មុខម្ហូប ផ្សារ និងរសជាតិតាមតំបន់",
    description: "ស្វែងយល់ពីម្ហូបខ្មែរ គន្លឹះទៅផ្សារ និងបទពិសោធន៍ម្ហូបតាមតំបន់នៅភ្នំពេញ សៀមរាប កែប និងកំពត។",
  },
} as const;

export async function generateMetadata({ searchParams }: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = getLang((await searchParams).lang);
  const copy = foodGuide[lang];
  return {
    title: copy.titleTemplate,
    description: copy.description,
    alternates: { canonical: `/food?lang=${lang}` },
  };
}

export default async function FoodPage({ searchParams }: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = getLang((await searchParams).lang);
  const copy = foodGuide[lang];
  const places = await getPlaces({ type: "restaurant" });

  return (
    <Shell lang={lang} variant="food">
      <nav className="detail-breadcrumb" aria-label={lang === "km" ? "ទីតាំងបច្ចុប្បន្ន" : "Breadcrumb"}>
        <Link href={`/explore?lang=${lang}`}>{T[lang].destinations}</Link><span aria-hidden="true">›</span>
        <span aria-current="page">{copy.title}</span>
      </nav>
      <header className="discover-page-heading">
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </header>

      <figure className="food-hero-photo">
        <img src="/images/food/kep-crab-market.jpg" alt={copy.heroImageAlt} fetchPriority="high" />
        <figcaption>
          <a href={copy.heroPhotoSource} target="_blank" rel="noreferrer">Photo: {copy.heroPhotoCredit}</a>
          <span aria-hidden="true"> · </span>
          <a href={copy.heroPhotoLicenseUrl} target="_blank" rel="noreferrer">{copy.heroPhotoLicense}</a>
        </figcaption>
      </figure>

      <section className="food-section" aria-labelledby="food-dishes-title">
        <div className="section-head"><h2 id="food-dishes-title">{copy.dishesTitle}</h2></div>
        <div className="food-dish-grid food-photo-grid">
          {copy.dishes.filter((dish) => "image" in dish).map((dish) => (
            <article className="food-dish food-dish-with-image" key={dish.name}>
              <img className="food-dish-image" src={dish.image} alt={dish.imageAlt} loading="lazy" />
              <div className="food-photo-credit">
                <a href={dish.photoSource} target="_blank" rel="noreferrer">Photo: {dish.photoCredit}</a>
                <a href={dish.photoLicenseUrl} target="_blank" rel="noreferrer">{dish.photoLicense}</a>
              </div>
              <div className="food-dish-heading">
                <h3>{dish.name}</h3>
                <span>{dish.localName}</span>
              </div>
              <p>{dish.description}</p>
              <span className="food-tag">{dish.tags}</span>
            </article>
          ))}
        </div>
        <div className="food-text-grid">
          {copy.dishes.filter((dish) => !("image" in dish)).map((dish) => (
            <article className="food-dish food-text-dish" key={dish.name}>
              <div className="food-dish-heading">
                <h3>{dish.name}</h3>
                <span>{dish.localName}</span>
              </div>
              <p>{dish.description}</p>
              <span className="food-tag">{dish.tags}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="food-section" aria-labelledby="food-places-title">
        <div className="section-head"><h2 id="food-places-title">{copy.placesTitle}</h2></div>
        <div className="discover-places">
          {copy.places.map((place) => (
            <Link className="discover-place" href={`/regions/${place.slug}?lang=${lang}`} key={place.slug}>
              <strong>{place.name}</strong>
              <span>{place.detail}</span>
              <span className="discover-place-link">{copy.viewPlace} ›</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="food-tips-grid" aria-label={copy.marketTitle}>
        <article className="food-tips-card">
          <h2>{copy.marketTitle}</h2>
          <ul>{copy.marketTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
        </article>
        <article className="food-tips-card">
          <h2>{copy.cookingTitle}</h2>
          <p>{copy.cookingText}</p>
        </article>
      </section>
      <aside className="food-dietary-note">
        <h2>{copy.dietaryTitle}</h2>
        <p>{copy.dietaryText}</p>
      </aside>

      <section className="food-section" aria-labelledby="food-listings-title">
        <div className="section-head">
          <h2 id="food-listings-title">{copy.listingsTitle}</h2>
          <Link href={`/explore?type=restaurant&lang=${lang}`}>{copy.browseAll} ›</Link>
        </div>
        <p className="region-section-intro">{copy.listingsIntro}</p>
        {places.length ? (
          <div className="review-grid">
            {places.slice(0, 9).map((place) => (
              <PlaceCard key={place.slug} place={place} lang={lang} />
            ))}
          </div>
        ) : <p className="region-empty">{copy.empty}</p>}
      </section>
    </Shell>
  );
}
