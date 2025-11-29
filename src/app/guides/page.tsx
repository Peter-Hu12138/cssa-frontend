"use client";

import Image from "next/image";
import Link from "next/link";
import { useGuides } from "@/hooks/useGuides";
import { Guide } from "@/types/api";
import { API_URL } from "@/lib/config";
import { Download, BookOpen, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuidesPage() {
  const { t, i18n } = useTranslation(undefined, "Guides", {});
  const locale = i18n.resolvedLanguage || "en";
  const { data: guides, isLoading } = useGuides();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-12 w-72" />
          <Skeleton className="h-6 w-[420px]" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  const highlights = [
    { title: t("highlightOneTitle"), description: t("highlightOneDesc") },
    { title: t("highlightTwoTitle"), description: t("highlightTwoDesc") },
    { title: t("highlightThreeTitle"), description: t("highlightThreeDesc") },
  ];

  const stats = [
    { label: t("primaryCta"), value: guides?.length ? `${guides.length}+` : "--" },
    { label: t("secondaryCta"), value: "24/7" },
    { label: t("tagline"), value: "1982" },
  ];

  return (
    <main className="min-h-screen bg-canvas">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1B2D] via-[#1F253E] to-[#521826] text-white py-28">
        <BackgroundPattern opacity={0.08} />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.6em] text-gold/80 bg-white/10 border border-white/20 rounded-full px-5 py-2">
            <Sparkles className="h-4 w-4" />
            {t("tagline")}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mt-8">{t("title")}</h1>
          <p className="text-lg md:text-2xl text-white/80 mt-6">{t("description")}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-10" asChild>
              <a href="#guides">{t("primaryCta")}</a>
            </Button>
            <Button size="lg" variant="secondary" className="px-10" asChild>
              <Link href="/join">{t("secondaryCta")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur p-5">
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">{stat.label}</p>
                <p className="font-serif text-3xl mt-3">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="font-serif text-3xl text-navy">{t("primaryCta")}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg leading-relaxed">
              {t("highlightTwoDesc")}
            </CardContent>
          </Card>
          <div className="space-y-4">
            {highlights.map((item) => (
              <Card key={item.title} className="border border-gray-200/60 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div id="guides" className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides?.map((guide) => (
            <GuideCard key={guide.id} guide={guide} lng={locale} />
          ))}

          {(!guides || guides.length === 0) && (
            <div className="col-span-full text-center py-16 rounded-[32px] border border-dashed border-gray-300 bg-white/70 backdrop-blur">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t("noGuides")}</p>
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
    ? (guide.cover_image.startsWith("http") 
        ? guide.cover_image 
        : `${API_URL}${guide.cover_image.startsWith("/") ? "" : "/"}${guide.cover_image}`)
    : null;
    
  const fileUrl = guide.file 
    ? (guide.file.startsWith("http") 
        ? guide.file 
        : `${API_URL}${guide.file.startsWith("/") ? "" : "/"}${guide.file}`)
    : "#";

  return (
    <div className="group rounded-[32px] border border-gray-200/60 bg-white/80 backdrop-blur overflow-hidden shadow-lg hover:-translate-y-1 transition-all flex flex-col">
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-gold/20">
        {coverUrl ? (
          <Image 
            src={coverUrl} 
            alt={title} 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 100vw, 33vw" 
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-primary/60">
            <BookOpen className="w-16 h-16 mb-2" />
            <span className="text-sm font-medium uppercase tracking-[0.4em]">{t("noCover")}</span>
          </div>
        )}
        <div className="absolute top-4 right-4 rounded-full border border-white/40 bg-white/20 backdrop-blur px-4 py-1 text-xs font-semibold">
          {guide.year} {t("edition")}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {t("defaultDesc", { year: guide.year })}
        </p>
        <h3 className="text-2xl font-serif text-navy mb-4">{title}</h3>
        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
          {description || t("defaultDesc", { year: guide.year })}
        </p>
        <Button asChild className="w-full">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <Download className="w-4 h-4 mr-2" />
            {t("download")}
          </a>
        </Button>
      </div>
    </div>
  );
}
