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
  locale: string;
}

export default function GuideSection({ title, description, cta, year, locale }: GuideSectionProps) {
  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      <BackgroundPattern />
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-white">
            {title}
          </h2>
          <p className="font-sans text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
            {description}
          </p>
          <Link href={`/${locale}/guides`}>
            <Button className="bg-white text-navy hover:bg-gold hover:text-navy px-8 py-6 text-lg font-bold uppercase tracking-widest rounded-sm transition-colors duration-300">
              {cta} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
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
              <div className="absolute inset-0 opacity-10">
                 <BackgroundPattern />
              </div>
              <span className="font-serif text-6xl font-bold text-gold opacity-80 z-10">CSSA</span>
              <span className="font-sans text-xl font-bold uppercase tracking-widest text-white mt-4 z-10">{year}</span>
              <div className="w-12 h-1 bg-primary mt-6 z-10" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
