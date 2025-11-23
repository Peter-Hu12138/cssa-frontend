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
  locale: string;
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary, locale }: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-navy text-white">
      {/* Background Image with Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy/80 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy z-10" />
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="University Campus"
          className="w-full h-full object-cover opacity-60"
        />
        <BackgroundPattern />
      </div>

      {/* Animated Maple Leaf */}
      <div className="absolute top-1/4 right-[10%] z-10 opacity-20 hidden lg:block">
        <MapleLeaf className="w-64 h-64 text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
          <Link href={`/${locale}/events`}>
            <Button className="bg-primary hover:bg-primary-dark text-white px-10 py-7 text-lg font-bold uppercase tracking-widest rounded-sm shadow-lg hover:shadow-primary/50 transition-all duration-300 border-2 border-transparent">
              {ctaPrimary}
            </Button>
          </Link>
          <Link href={`/${locale}/about`}>
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy px-10 py-7 text-lg font-bold uppercase tracking-widest rounded-sm bg-transparent transition-all duration-300">
              {ctaSecondary}
            </Button>
          </Link>
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
