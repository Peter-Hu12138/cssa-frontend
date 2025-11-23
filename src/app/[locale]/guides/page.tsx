"use client";

import { use } from "react";
import { useGuides } from "@/hooks/useGuides";
import { Guide } from "@/types/api";
import { API_URL } from "@/lib/config";
import { Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";

export default function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const { data: guides, isLoading } = useGuides();
  const { t } = useTranslation(locale, "Guides", {});

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-20 bg-white">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides?.map((guide) => (
            <GuideCard key={guide.id} guide={guide} lng={locale} />
          ))}
          
          {(!guides || guides.length === 0) && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {t("noGuides")}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function GuideCard({ guide, lng }: { guide: Guide; lng: string }) {
  const { t } = useTranslation(lng, "Guides", {});
  const locale = lng;
  
  const title = locale === "en" && guide.title_en ? guide.title_en : guide.title;
  const description = locale === "en" && guide.description_en ? guide.description_en : guide.description;

  // Ensure URLs are absolute
  const coverUrl = guide.cover_image 
    ? (guide.cover_image.startsWith("http") ? guide.cover_image : `${API_URL}${guide.cover_image}`)
    : null;
    
  const fileUrl = guide.file 
    ? (guide.file.startsWith("http") ? guide.file : `${API_URL}${guide.file}`)
    : "#";

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Cover Image Area */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <BookOpen className="w-16 h-16 mb-2 opacity-50" />
            <span className="text-sm font-medium uppercase tracking-widest">{t("noCover")}</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {guide.year} {t("edition")}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {description || t("defaultDesc", { year: guide.year })}
        </p>

        <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto"
        >
          <Button className="w-full bg-gray-900 hover:bg-primary text-white transition-colors duration-300">
            <Download className="w-4 h-4 mr-2" />
            {t("download")}
          </Button>
        </a>
      </div>
    </div>
  );
}
