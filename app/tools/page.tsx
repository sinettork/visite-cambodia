import type { Metadata } from "next";
import Shell from "@/components/Shell";
import CurrencyConverter from "@/components/CurrencyConverter";
import PhrasebookSection from "@/components/PhrasebookSection";
import { emergencyContacts } from "@/lib/data/tools-data";
import { getLang, pick, T } from "@/lib/i18n";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];
  return {
    title: `${t.tools} | Visit Cambodia`,
    description: t.toolsIntro,
    alternates: { canonical: `/tools?lang=${lang}` },
  };
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];

  return (
    <Shell lang={lang} variant="tools">
      <div className="tools-page-container">
        <header className="page-header-block">
          <h1>{t.toolsTitle}</h1>
          <p className="page-header-intro">{t.toolsIntro}</p>
        </header>

        {/* Currency Converter */}
        <section className="tools-section" id="currency">
          <CurrencyConverter lang={lang} />
        </section>

        {/* Phrasebook */}
        <section className="tools-section" id="phrasebook">
          <PhrasebookSection lang={lang} />
        </section>

        {/* Emergency Contacts */}
        <section className="tools-section emergency-contacts-section" id="emergency">
          <div className="section-head">
            <h2><i className="fa-solid fa-phone-volume" aria-hidden="true" /> {lang === "km" ? "លេខទូរស័ព្ទសង្គ្រោះបន្ទាន់សំខាន់ៗ" : "Essential Emergency Contacts"}</h2>
          </div>
          <p className="emergency-intro-text">
            {lang === "km"
              ? "សូមរក្សាទុក ឬកត់ចំណាំលេខទូរស័ព្ទទាំងនេះ សម្រាប់ករណីត្រូវការជំនួយជាបន្ទាន់អំឡុងពេលស្នាក់នៅ ឬធ្វើដំណើរកម្សាន្តនៅកម្ពុជា។"
              : "Keep these contacts handy for any urgent assistance, tourist police inquiries, or medical emergencies while in Cambodia."}
          </p>

          <div className="emergency-cards-grid">
            {emergencyContacts.map((contact, idx) => {
              const name = pick(contact, "name", lang);
              const desc = pick(contact, "description", lang);
              const cleanNumber = contact.number.replace(/\s+/g, "");

              return (
                <div key={idx} className={`emergency-card emergency-${contact.category}`}>
                  <div className="emergency-icon-badge">
                    <i
                      className={
                        contact.category === "police"
                          ? "fa-solid fa-shield-halved"
                          : contact.category === "medical"
                          ? "fa-solid fa-truck-medical"
                          : "fa-solid fa-fire-extinguisher"
                      }
                      aria-hidden="true"
                    />
                  </div>
                  <div className="emergency-card-info">
                    <h3>{name}</h3>
                    <p>{desc}</p>
                    <a href={`tel:${cleanNumber}`} className="emergency-call-btn">
                      <i className="fa-solid fa-phone" aria-hidden="true" /> {contact.number}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Shell>
  );
}
