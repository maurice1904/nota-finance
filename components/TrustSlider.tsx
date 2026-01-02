"use client";

import { useEffect, useRef, useState } from "react";

export default function TrustSlider() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-12 border-t border-border-subtle bg-white transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <p className="text-center text-sm font-medium text-neutral-500 mb-6 uppercase tracking-wide">
        Unsere Partner
      </p>
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale">
        <div className="text-2xl font-bold text-text-900/70">BDIU</div>
        <div className="text-2xl font-bold text-text-900/70">SCHUFA</div>
        <div className="text-2xl font-bold text-text-900/70">Wolters Kluwer</div>
        <div className="text-2xl font-bold text-text-900/70">GeoTrust</div>
        <div className="text-2xl font-bold text-text-900/70">GDD</div>
      </div>
    </section>
  );
}

