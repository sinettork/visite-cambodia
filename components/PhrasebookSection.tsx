"use client";

import { useState } from "react";
import { phrasebookCategories } from "@/lib/data/tools-data";
import type { Lang } from "@/lib/i18n";

export default function PhrasebookSection({ lang }: { lang: Lang }) {
  const [selectedCat, setSelectedCat] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const currentCat = phrasebookCategories[selectedCat];

  const filteredCategories = phrasebookCategories.map((cat) => ({
    ...cat,
    phrases: cat.phrases.filter(
      (p) =>
        !search.trim() ||
        p.km.toLowerCase().includes(search.toLowerCase()) ||
        p.phonetic.toLowerCase().includes(search.toLowerCase()) ||
        p.en.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const activePhrases = search.trim()
    ? filteredCategories.flatMap((c) => c.phrases)
    : currentCat.phrases;

  return (
    <div className="phrasebook-card">
      <div className="phrasebook-header">
        <div>
          <h3><i className="fa-solid fa-comments" aria-hidden="true" /> {lang === "km" ? "ឃ្លាសន្ទនាភាសាខ្មែរសំខាន់ៗ" : "Essential Khmer Phrasebook"}</h3>
          <p className="phrasebook-intro">
            {lang === "km"
              ? "ពាក្យនិងឃ្លាសាមញ្ញដែលមានការបញ្ចេញសំឡេងជាអក្សរឡាតាំង សម្រាប់ភ្ញៀវទេសចរប្រើប្រាស់ក្នុងការធ្វើដំណើរ។"
              : "Practical daily phrases with phonetic romanization and English translations for travelers in Cambodia."}
          </p>
        </div>
        <div className="phrasebook-search">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "km" ? "ស្វែងរកពាក្យ..." : "Search phrases..."}
          />
        </div>
      </div>

      {!search.trim() && (
        <div className="phrase-category-tabs">
          {phrasebookCategories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              className={`cat-tab-btn ${selectedCat === idx ? "active" : ""}`}
              onClick={() => setSelectedCat(idx)}
            >
              {lang === "km" ? cat.category_km : cat.category_en}
            </button>
          ))}
        </div>
      )}

      <div className="phrases-grid">
        {activePhrases.length > 0 ? (
          activePhrases.map((phrase, idx) => (
            <div key={idx} className="phrase-item">
              <div className="phrase-km">{phrase.km}</div>
              <div className="phrase-phonetic"><i className="fa-solid fa-volume-high" aria-hidden="true" style={{ fontSize: "0.85em", opacity: 0.7 }} /> <em>{phrase.phonetic}</em></div>
              <div className="phrase-en">{phrase.en}</div>
            </div>
          ))
        ) : (
          <p className="phrase-empty">{lang === "km" ? "រកមិនឃើញពាក្យដែលអ្នកស្វែងរកទេ។" : "No phrases matched your search."}</p>
        )}
      </div>
    </div>
  );
}
