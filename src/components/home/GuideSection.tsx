"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";

interface GuideSectionProps {
  title: string;
  description: string;
  cta: string;
  year: string;
}

export default function GuideSection({ title, description, cta, year }: GuideSectionProps) {
  const guideYearLabel = String(year);
  const guideLabel = `${guideYearLabel.toUpperCase()} // GUIDEBOOK`;

  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      <BackgroundPattern />
      <div className="absolute -top-16 right-12 w-64 h-64 bg-gold/20 blur-[140px] rounded-full" aria-hidden="true" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary/25 blur-[160px] rounded-full" aria-hidden="true" />
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[12px] tracking-[0.6em] text-gold uppercase mb-4">{guideLabel}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-8 text-white">
            {title}
          </h2>
          <p className="font-sans text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
            {description}
          </p>
          <Button size="lg" className="px-12" asChild>
            <Link href="/guides">
              {cta} <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative w-72 h-96 bg-navy-light border border-gold/30 rounded-sm p-6 shadow-2xl"
            whileHover={{ rotate: 0, scale: 1.02 }}
            initial={{ rotate: 3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-gold opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-gold opacity-50" />
            
            <div className="w-full h-full bg-navy flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
              <BackgroundPattern opacity={0.08} />
              <span className="font-serif text-6xl font-bold text-gold opacity-80 z-10">CSSA</span>
              <span className="font-sans text-xl font-bold uppercase tracking-widest text-white mt-4 z-10">{guideYearLabel}</span>
              <div className="w-12 h-1 bg-primary mt-6 z-10" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
