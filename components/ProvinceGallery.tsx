"use client";

import { useEffect, useState } from "react";
import type { ProvinceGallerySlide } from "@/lib/province-gallery";

export default function ProvinceGallery({
  slides,
  title,
  overview,
  disclaimer,
}: {
  slides: ProvinceGallerySlide[];
  title: string;
  overview: string;
  disclaimer: string;
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [count]);

  if (!count) {
    return (
      <div className="province-hero-copy">
        <h1 id="province-title">{title}</h1>
        <p>{overview}</p>
        <p className="province-hero-disclaimer">{disclaimer}</p>
      </div>
    );
  }

  const active = slides[index];

  return (
    <>
      <div className="province-gallery-slides" aria-label={title + " photo gallery"} aria-live="polite">
        {slides.map((slide, slideIndex) => (
          <img
            key={slide.image + "-" + slideIndex}
            className={"province-gallery-slide" + (slideIndex === index ? " is-active" : "")}
            src={slide.image}
            alt={slide.alt}
            aria-hidden={slideIndex !== index}
          />
        ))}
      </div>

      <div className="province-hero-shade" aria-hidden="true" />

      <div className="province-hero-copy">
        <span className="province-gallery-label">{active.label}</span>
        <h1 id="province-title">{title}</h1>
        <p>{overview}</p>
        <p className="province-hero-disclaimer">{disclaimer}</p>
      </div>

      {count > 1 && (
        <div className="province-gallery-dots" aria-label="Choose photo">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.image + "-dot"}
              type="button"
              className={slideIndex === index ? "is-active" : ""}
              onClick={() => setIndex(slideIndex)}
              aria-label={"Show photo " + (slideIndex + 1)}
              aria-current={slideIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      )}

      <div className="province-photo-credit">
        <a href={active.source} target="_blank" rel="noreferrer">Photo: {active.credit}</a>
        <span aria-hidden="true"> · </span>
        <a href={active.source} target="_blank" rel="noreferrer">{active.license}</a>
      </div>
    </>
  );
}
