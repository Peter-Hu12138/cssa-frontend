"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapleLeaf } from "@/components/ui/MapleLeaf";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  locale?: string;
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary, locale }: HeroSectionProps) {
  const localePrefix = locale ? `/${locale}` : "";

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="University Campus"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
        <BackgroundPattern opacity={0.12} />
      </div>

      {/* Ambient Orbs */}
      <div className="absolute -top-10 left-10 w-80 h-80 bg-primary/25 blur-[160px] rounded-full" aria-hidden="true" />
      <div className="absolute bottom-0 right-10 w-[420px] h-[420px] bg-gold/20 blur-[180px] rounded-full" aria-hidden="true" />

      {/* Animated Maple Leaf */}
      <div className="absolute top-1/4 right-[10%] z-10 opacity-20 hidden lg:block">
        <MapleLeaf className="w-64 h-64" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[12px] tracking-[0.6em] text-gold uppercase mb-6 block">
            UTCSSA // LEADERSHIP
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-tight text-white drop-shadow-lg">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="font-sans text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light tracking-wide">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" className="px-12" asChild>
            <Link href={`${localePrefix}/events`}>
              {ctaPrimary}
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="px-12" asChild>
            <Link href={`${localePrefix}/about`}>
              {ctaSecondary}
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
