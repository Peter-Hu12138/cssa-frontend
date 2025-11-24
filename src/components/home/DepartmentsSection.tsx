"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Department {
  key: string;
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

interface DepartmentsSectionProps {
  title: string;
  departments: Department[];
}

export default function DepartmentsSection({ title, departments }: DepartmentsSectionProps) {
  return (
    <section className="py-24 bg-canvas text-navy">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[12px] tracking-[0.6em] text-gold uppercase mb-4">OUR STRUCTURE</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={dept.link} className="group block h-full">
                <div className="bg-white rounded-[24px] border border-gray-100 shadow-xl p-8 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:border-gold/30">
                  <div className="mb-6 w-14 h-14 rounded-full bg-canvas flex items-center justify-center text-gold group-hover:text-primary transition-colors duration-300">
                    {dept.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4 text-navy group-hover:text-primary transition-colors duration-300">
                    {dept.title}
                  </h3>
                  <p className="font-sans text-gray-600 mb-8 leading-relaxed">
                    {dept.description}
                  </p>
                  <div className="flex items-center text-xs font-semibold tracking-[0.4em] text-gold uppercase group-hover:text-primary transition-colors duration-300">
                    Learn More <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
