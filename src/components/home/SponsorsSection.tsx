"use client";

import { useState } from "react";
import SponsorCard from "./SponsorCard";
import SponsorDialog from "@/components/shared/SponsorDialog";
import { Sponsor } from "@/types/api";

interface SponsorsSectionProps {
  title: string;
  subtitle?: string;
  locale: string;
}

// Hardcoded sponsors
const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Sponsor Company A",
    logo: "/sponsors/CheungKee.png",
    promotional_image: "/img/cssa logo.avif",
    promotional_text: "Get 10% off on all services!",
    promotional_text_en: "Get 10% off on all services!",
    link: "https://example.com",
    order: 1,
  },
  {
    id: 2,
    name: "Sponsor Company B",
    logo: "/img/cssa logo.avif",
    promotional_image: "/img/cssa logo.avif",
    promotional_text: "5% off + one free soft drink",
    promotional_text_en: "5% off + one free soft drink",
    link: "https://example.com",
    order: 2,
  },
  {
    id: 3,
    name: "Sponsor Company C",
    logo: "/img/cssa logo.avif",
    promotional_image: "/img/cssa logo.avif",
    promotional_text: "Special discount for CSSA members!",
    promotional_text_en: "Special discount for CSSA members!",
    link: "https://example.com",
    order: 3,
  },
  {
    id: 4,
    name: "Sponsor Company D",
    logo: "/img/cssa logo.avif",
    promotional_image: "/img/cssa logo.avif",
    promotional_text: "Buy one get one free!",
    promotional_text_en: "Buy one get one free!",
    link: "https://example.com",
    order: 4,
  },
  {
    id: 5,
    name: "Sponsor Company E",
    logo: "/img/cssa logo.avif",
    promotional_image: "/img/cssa logo.avif",
    promotional_text: "Free delivery on first order",
    promotional_text_en: "Free delivery on first order",
    link: "https://example.com",
    order: 5,
  },
  {
    id: 6,
    name: "Sponsor Company F",
    logo: "/img/cssa logo.avif",
    promotional_image: "/img/cssa logo.avif",
    promotional_text: "15% student discount!",
    promotional_text_en: "15% student discount!",
    link: "https://example.com",
    order: 6,
  },
];

export default function SponsorsSection({ title, subtitle, locale }: SponsorsSectionProps) {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden" style={{
      background: `
        radial-gradient(circle at center, transparent 0%, transparent 200px, white 200px, white 260px),
        radial-gradient(circle at center, transparent 0%, transparent 260px, #f9fafb 260px, #f9fafb 320px),
        radial-gradient(circle at center, transparent 0%, transparent 320px, white 320px, white 380px),
        radial-gradient(circle at center, transparent 0%, transparent 380px, #f9fafb 380px, #f9fafb 440px),
        radial-gradient(circle at center, transparent 0%, transparent 440px, white 440px, white 500px),
        radial-gradient(circle at center, transparent 0%, transparent 500px, #f9fafb 500px, #f9fafb 560px),
        radial-gradient(circle at center, transparent 0%, transparent 560px, white 560px, white 620px),
        radial-gradient(circle at center, transparent 0%, transparent 620px, #f9fafb 620px, #f9fafb 680px),
        #f9fafb
      `
    }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
        </div>

        {/* Hexagonal grid layout */}
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div 
              key={sponsor.id}
              className={index % 2 === 1 ? "mt-20" : ""}
            >
              <SponsorCard
                sponsor={sponsor}
                onClick={() => setSelectedSponsor(sponsor)}
              />
            </div>
          ))}
        </div>

        {/* Sponsor details dialog */}
        {selectedSponsor && (
          <SponsorDialog
            sponsor={selectedSponsor}
            open={!!selectedSponsor}
            onOpenChange={(open) => !open && setSelectedSponsor(null)}
            locale={locale}
          />
        )}
      </div>
    </section>
  );
}
