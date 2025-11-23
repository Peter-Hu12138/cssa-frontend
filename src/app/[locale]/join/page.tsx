"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Star } from "lucide-react";
import { API_URL } from "@/lib/config";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { DEFAULT_LINKS } from "@/lib/links";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";

export default function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const { data: fetchedLinks } = useExternalLinks();
  const { t } = useTranslation(locale, "Join", {});
  
  // Find the join-club link from fetched data, or fallback to default, or fallback to backend redirect
  const joinLinkObj = fetchedLinks?.find(l => l.slug === "join-club") || DEFAULT_LINKS.find(l => l.slug === "join-club");
  const joinLink = joinLinkObj ? ensureAbsoluteUrl(joinLinkObj.url) : `${API_URL}/link/join-club/`;

  return (
    <main className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {t("description")}
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <a 
                href={joinLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-primary hover:bg-primary-dark text-white px-10 py-7 text-xl font-bold uppercase tracking-widest rounded-none shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  {t("button")} <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </a>
              <p className="text-sm text-gray-500 mt-4">
                {t("note")}
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
           <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-wide">{t("benefitsTitle")}</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t("communityTitle")}</h3>
              <p className="text-gray-600">
                {t("communityDesc")}
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t("supportTitle")}</h3>
              <p className="text-gray-600">
                {t("supportDesc")}
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t("eventsTitle")}</h3>
              <p className="text-gray-600">
                {t("eventsDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
