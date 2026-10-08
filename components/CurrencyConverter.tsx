"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

const rielBanknotes = [
  { amount: 100, image: "/images/riel-100.jpg", side: "front" },
  { amount: 500, image: "/images/riel-500.jpg", side: "front" },
  { amount: 1000, image: "/images/riel-1000.jpg", side: "front" },
  { amount: 2000, image: "/images/riel-2000.jpg", side: "front" },
  { amount: 5000, image: "/images/riel-5000.jpg", side: "back" },
  { amount: 10000, image: "/images/riel-10000.jpg", side: "back" },
  { amount: 20000, image: "/images/riel-20000.jpg", side: "back" },
  { amount: 50000, image: "/images/riel-50000.jpg", side: "back" },
] as const;

export default function CurrencyConverter({ lang }: { lang: Lang }) {
  const [rate, setRate] = useState<number>(4100);
  const [usdAmount, setUsdAmount] = useState<string>("10");
  const [khrAmount, setKhrAmount] = useState<string>("41000");
  const [lastEdited, setLastEdited] = useState<"usd" | "khr">("usd");

  const handleUsdChange = (val: string) => {
    setUsdAmount(val);
    setLastEdited("usd");
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setKhrAmount((num * rate).toLocaleString("en-US", { maximumFractionDigits: 0 }));
    } else {
      setKhrAmount("");
    }
  };

  const handleKhrChange = (val: string) => {
    const clean = val.replace(/,/g, "");
    setKhrAmount(clean);
    setLastEdited("khr");
    const num = parseFloat(clean);
    if (!isNaN(num) && num >= 0 && rate > 0) {
      setUsdAmount((num / rate).toFixed(2));
    } else {
      setUsdAmount("");
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (lastEdited === "usd") {
      const num = parseFloat(usdAmount);
      if (!isNaN(num)) setKhrAmount((num * newRate).toLocaleString("en-US", { maximumFractionDigits: 0 }));
    } else {
      const num = parseFloat(khrAmount.replace(/,/g, ""));
      if (!isNaN(num)) setUsdAmount((num / newRate).toFixed(2));
    }
  };

  const setPresetUsd = (amount: number) => {
    handleUsdChange(amount.toString());
  };

  const formatRiel = (amount: number) => {
    const formatted = amount.toLocaleString("en-US");
    return lang === "km"
      ? formatted.replace(/\d/g, (digit) => "០១២៣៤៥៦៧៨៩"[Number(digit)])
      : formatted;
  };

  return (
    <div className="currency-converter-card">
      <div className="converter-header">
        <h3><i className="fa-solid fa-money-bill-transfer" aria-hidden="true" /> {lang === "km" ? "ឧបករណ៍ប្តូរប្រាក់ ដុល្លារ (USD) ↔ រៀល (KHR)" : "Currency Converter (USD ↔ KHR)"}</h3>
        <p className="converter-rate-note">
          {lang === "km" ? "អត្រាប្តូរប្រាក់គោល៖" : "Benchmark Rate:"} <strong>1 USD = {rate.toLocaleString()} KHR</strong>
        </p>
      </div>

      <div className="converter-inputs-grid">
        <div className="converter-field">
          <label htmlFor="usd-input">{lang === "km" ? "ប្រាក់ដុល្លារ (USD)" : "US Dollar (USD)"}</label>
          <div className="input-with-symbol">
            <span className="symbol">$</span>
            <input
              id="usd-input"
              type="number"
              min="0"
              step="any"
              value={usdAmount}
              onChange={(e) => handleUsdChange(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="converter-switch-icon" aria-hidden="true">
          <i className="fa-solid fa-right-left" />
        </div>

        <div className="converter-field">
          <label htmlFor="khr-input">{lang === "km" ? "ប្រាក់រៀល (KHR)" : "Cambodian Riel (KHR)"}</label>
          <div className="input-with-symbol">
            <span className="symbol">៛</span>
            <input
              id="khr-input"
              type="text"
              value={khrAmount}
              onChange={(e) => handleKhrChange(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="quick-amount-chips">
        <span>{lang === "km" ? "តម្លៃរហ័ស៖" : "Quick Presets:"}</span>
        {[1, 5, 10, 20, 50, 100].map((amt) => (
          <button
            key={amt}
            type="button"
            className="chip-btn"
            onClick={() => setPresetUsd(amt)}
          >
            ${amt}
          </button>
        ))}
      </div>

      <div className="custom-rate-toggle">
        <details>
          <summary><i className="fa-solid fa-sliders" aria-hidden="true" /> {lang === "km" ? "កែប្រែអត្រាប្តូរប្រាក់ដោយខ្លួនឯង" : "Customize exchange rate"}</summary>
          <div className="custom-rate-form">
            <label htmlFor="custom-rate">
              1 USD =
              <input
                id="custom-rate"
                type="number"
                value={rate}
                onChange={(e) => handleRateChange(Number(e.target.value) || 4100)}
                className="rate-input"
              />
              KHR
            </label>
            <button type="button" onClick={() => handleRateChange(4100)} className="btn-reset-rate">
              {lang === "km" ? "កំណត់អត្រាដើម (4,100)" : "Reset to 4,100"}
            </button>
          </div>
        </details>
      </div>

      <section className="riel-notes-guide" aria-labelledby="riel-notes-title">
        <div className="riel-notes-copy">
          <h4 id="riel-notes-title">
            {lang === "km" ? "ស្គាល់ក្រដាសប្រាក់រៀល" : "Recognize Cambodian Riel Notes"}
          </h4>
          <p>
            {lang === "km"
              ? "មើលរូបក្រដាសប្រាក់តាមតម្លៃនីមួយៗ។ រូបខ្លះបង្ហាញផ្នែកខាងមុខ និងរូបខ្លះបង្ហាញផ្នែកខាងក្រោយ។ ពណ៌ និងរូបរាងអាចខុសគ្នាតាមស៊េរី—សូមពិនិត្យលេខតម្លៃលើក្រដាសប្រាក់។"
              : "Compare notes by denomination. Some photos show the front and others the reverse. Colors and designs vary by series, so always check the printed value."}
          </p>
          <p className="riel-notes-tip">
            {lang === "km"
              ? "អត្រាប្តូរប្រាក់ និងប្រភេទក្រដាសប្រាក់អាចខុសគ្នា។ សូមពិនិត្យតម្លៃ និងចំនួនប្រាក់អាប់មុនចាកចេញពីហាង។"
              : "Exchange rates and note designs can vary. Check the amount and your change before leaving a shop."}
          </p>
        </div>
        <ul className="riel-banknote-grid" aria-label={lang === "km" ? "រូបក្រដាសប្រាក់រៀលតាមតម្លៃ" : "Cambodian riel notes by denomination"}>
          {rielBanknotes.map((note) => (
            <li className="riel-banknote-card" key={note.amount}>
              <figure>
                <img
                  src={note.image}
                  alt={lang === "km"
                    ? `ក្រដាសប្រាក់ ${formatRiel(note.amount)} រៀល ផ្នែក${note.side === "front" ? "ខាងមុខ" : "ខាងក្រោយ"}`
                    : `${formatRiel(note.amount)} riel banknote, ${note.side}`}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <strong>{formatRiel(note.amount)} ៛</strong>
                  <span>{lang === "km" ? (note.side === "front" ? "ខាងមុខ" : "ខាងក្រោយ") : note.side === "front" ? "Front" : "Reverse"}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
