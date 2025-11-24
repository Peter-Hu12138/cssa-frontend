"use client";

import React from "react";
import { 
  Users, 
  Megaphone, 
  PieChart, 
  FileText, 
} from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

// --- Components ---

function DepartmentCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="w-14 h-14 bg-red-50 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}

function ExecutiveCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-gray-50 shadow-inner group-hover:border-primary/20 transition-colors duration-300">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-primary font-medium uppercase tracking-wider text-xs">{role}</p>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation(undefined, "About", {});
  const { t: tTeam } = useTranslation(undefined, "Team", {});

  const departments = [
    {
      id: "internal",
      title: t("internalTitle"),
      description: t("internalDesc"),
      icon: <Users className="w-8 h-8" />,
    },
    {
      id: "external",
      title: t("externalTitle"),
      description: t("externalDesc"),
      icon: <Megaphone className="w-8 h-8" />,
    },
    {
      id: "executive",
      title: t("executiveTitle"),
      description: t("executiveDesc"),
      icon: <PieChart className="w-8 h-8" />,
    },
    {
      id: "general",
      title: t("generalTitle"),
      description: t("generalDesc"),
      icon: <FileText className="w-8 h-8" />,
    },
  ];

  const executives = [
    {
      id: 1,
      name: "Nathan Jia & Mikaela Zhang",
      role: tTeam("coPresidents"),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop", // Placeholder
    },
    {
      id: 2,
      name: "Marcos Chang",
      role: tTeam("vpInternal"),
      image: "https://images.unsplash.com/photo-1573496359-136d47552640?q=80&w=1000&auto=format&fit=crop", // Placeholder
    },
    {
      id: 3,
      name: "Zane Huang",
      role: tTeam("vpExternal"),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop", // Placeholder
    },
    {
      id: 4,
      name: "Esther Wang",
      role: tTeam("vpExecutive"),
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop", // Placeholder
    },
    {
      id: 5,
      name: "Brian Guo",
      role: tTeam("vpGeneral"),
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop", // Placeholder
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      
      {/* Section 1: Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
            alt="University Campus"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Bridging Cultures,<br />
            Building Community.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Section 2: Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-block mb-8">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">{t("missionTitle")}</h2>
            <div className="h-1 w-full bg-primary/20 rounded-full" />
          </div>
          
          <blockquote className="text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed italic">
            &ldquo;{t("missionText")}&rdquo;
          </blockquote>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-500 uppercase tracking-wider text-xs font-bold">Members</div>
            </div>
            <div className="p-6 border-l border-r border-gray-100">
              <div className="text-4xl font-bold text-primary mb-2">42</div>
              <div className="text-gray-500 uppercase tracking-wider text-xs font-bold">Years of History</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">1982</div>
              <div className="text-gray-500 uppercase tracking-wider text-xs font-bold">Established</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Departments */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("departmentsTitle")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <DepartmentCard 
                key={dept.id}
                title={dept.title}
                description={dept.description}
                icon={dept.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Executive Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{tTeam("meetTheTeam")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {executives.map((exec) => (
              <ExecutiveCard 
                key={exec.id}
                name={exec.name}
                role={exec.role}
                image={exec.image}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-6">{tTeam("joinTeam")}</p>
            <Link href={`/team`}>
              <button className="bg-white text-primary border-2 border-primary px-8 py-3 font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300">
                {tTeam("meetTheTeam")}
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
