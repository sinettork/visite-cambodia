"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 19V5M6.5 11.5 12 6l5.5 5.5" />
      </svg>
    </button>
  );
}
