import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EventsGrid from "@/components/sections/EventsGrid";
import { useTranslation } from "@/app/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t } = await useTranslation(locale, "Home");

  const departments = [
    {
      key: "internal",
      title: t("internalDivision"),
      description: t("internalDesc"),
      link: `/${locale}/about`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      )
    },
    {
      key: "external",
      title: t("externalDivision"),
      description: t("externalDesc"),
      link: `/${locale}/about`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
      )
    },
    {
      key: "executive",
      title: t("executiveDivision"),
      description: t("executiveDesc"),
      link: `/${locale}/about`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
      )
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            alt="University Campus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/events`}>
              <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg font-bold uppercase tracking-widest rounded-none w-full sm:w-auto">
                {t("viewEvents")}
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-bold uppercase tracking-widest rounded-none w-full sm:w-auto bg-transparent">
                {t("aboutUs")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FRESHMAN GUIDE SECTION */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">
              {t("newToUofT")}
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              {t("guideDescription")}
            </p>
            <Link href={`/${locale}/guides`}>
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg font-bold uppercase tracking-widest rounded-none">
                {t("downloadGuide")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-80 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-white/5 flex items-center justify-center border border-white/10">
                <span className="text-2xl font-bold uppercase tracking-widest opacity-50">{t("guideYear")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <EventsGrid lng={locale} />

      {/* DEPARTMENTS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 mb-4">
              {t("ourDepartments")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div key={dept.key} className="group bg-white border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 text-primary flex items-center justify-center">
                  {dept.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {dept.title}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {dept.description}
                </p>
                <Link href={dept.link} className="mt-auto">
                  <Button variant="ghost" className="text-primary border border-primary hover:bg-primary hover:text-white uppercase tracking-widest text-xs font-bold px-6 rounded-none transition-all">
                    {t("viewMore")}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
