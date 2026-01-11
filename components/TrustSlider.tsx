"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

const partners: Partner[] = [
  {
    name: "BDIU",
    logo: "/Trust_Section/Trust_BDIU.png",
    alt: "BDIU - Bundesverband Deutscher Inkasso-Unternehmen",
  },
  {
    name: "Wolters Kluwer",
    logo: "/Trust_Section/Trust_Wolters.svg.png",
    alt: "Wolters Kluwer - Globaler Anbieter für Fachinformationen",
  },
  {
    name: "SCHUFA",
    logo: "/Trust_Section/Trust_Schufa.svg.png",
    alt: "SCHUFA - Schutzgemeinschaft für allgemeine Kreditsicherung",
  },
  {
    name: "GeoTrust",
    logo: "/Trust_Section/Trust_GeoTrust.png",
    alt: "GeoTrust - SSL-Zertifikate und Websicherheit",
  },
  {
    name: "GDD",
    logo: "/Trust_Section/Trust_GDD.png",
    alt: "GDD - Gesellschaft für Datenschutz und Datensicherheit",
  },
];

export default function TrustSlider() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Double the logos for seamless mobile marquee
  const marqueeLogos = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      className={`py-12 sm:py-16 border-t border-border-subtle bg-white transition-all duration-700 ease-out overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="text-center text-xs sm:text-sm font-medium text-neutral-500 mb-8 sm:mb-10 uppercase tracking-widest">
        Unsere Partner
      </p>
      
      {/* Desktop/Tablet: Static single row with uniform containers */}
      <div className="hidden sm:block">
        <div className="flex justify-center items-center">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`
                group flex items-center justify-center flex-shrink-0
                w-[140px] md:w-[160px] lg:w-[180px]
                ${index !== partners.length - 1 ? "mr-8 md:mr-12 lg:mr-16" : ""}
              `}
            >
              {/* Uniform container - height controls visual size, width is flexible */}
              <div className="relative w-full h-10 md:h-12 lg:h-14">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  sizes="180px"
                  className="
                    object-contain
                    grayscale opacity-50
                    lg:group-hover:grayscale-0 lg:group-hover:opacity-100
                    transition-all duration-300 ease-out
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Infinite scrolling marquee with generous spacing */}
      <div className="sm:hidden relative">
        <div className="flex animate-marquee">
          {marqueeLogos.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-32 mx-8"
            >
              {/* Uniform container - height-driven sizing */}
              <div className="relative w-full h-9">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  sizes="128px"
                  className="object-contain grayscale opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
