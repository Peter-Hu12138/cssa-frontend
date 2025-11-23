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
    <section className="py-24 bg-white text-navy">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-navy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

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
                <div className="bg-white border border-gray-100 p-8 h-full rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2">
                  <div className="absolute top-0 left-0 w-full h-1 bg-navy group-hover:bg-primary transition-colors duration-300" />
                  
                  <div className="mb-6 text-navy group-hover:text-primary transition-colors duration-300">
                    {dept.icon}
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold mb-4 text-navy group-hover:text-primary transition-colors duration-300">
                    {dept.title}
                  </h3>
                  
                  <p className="font-sans text-gray-600 mb-6 leading-relaxed">
                    {dept.description}
                  </p>
                  
                  <div className="flex items-center text-gold font-bold uppercase tracking-wider text-sm group-hover:text-primary transition-colors duration-300">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
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
