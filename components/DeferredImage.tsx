"use client";

import { useEffect, useRef, useState } from "react";

export default function DeferredImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "250px 0px" });

    observer.observe(image);
    return () => observer.disconnect();
  }, []);

  return <img ref={imageRef} src={shouldLoad ? src : undefined} alt={alt} />;
}
