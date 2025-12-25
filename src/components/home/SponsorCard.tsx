"use client";

import { Sponsor } from "@/types/api";
import Image from "next/image";

interface SponsorCardProps {
  sponsor: Sponsor;
  onClick: () => void;
}

export default function SponsorCard({ sponsor, onClick }: SponsorCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-32 h-36 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-label={`View ${sponsor.name} details`}
      style={{
        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
      }}
    >
      {/* Hexagon shape with background */}
      <div className="absolute inset-0 bg-white"
           style={{
             clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
           }}>
        {/* Inner container for logo */}
        <div className="absolute inset-[8%] flex items-center justify-center"
             style={{
               clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
             }}>
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>
      </div>
    </button>
  );
}
