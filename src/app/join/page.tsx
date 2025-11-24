"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Star } from "lucide-react";
import { API_URL } from "@/lib/config";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { DEFAULT_LINKS } from "@/lib/links";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";

export default function JoinPage() {
  const { t } = useTranslation(undefined, "Join", {});
  const { data: fetchedLinks } = useExternalLinks();
  
  // Find the join-club link from fetched data, or fallback to default, or fallback to backend redirect
  const joinLinkObj = fetchedLinks?.find(l => l.slug === "join-club") || DEFAULT_LINKS.find(l => l.slug === "join-club");
  const joinLink = joinLinkObj ? ensureAbsoluteUrl(joinLinkObj.url) : `${API_URL}/link/join-club/`;

  const benefits: { key: string; title: string; desc: string; icon: ReactNode }[] = [
    {
      key: "community",
      title: t("communityTitle"),
      desc: t("communityDesc"),
      icon: <Users className="w-7 h-7" />,
    },
    {
      key: "support",
      title: t("supportTitle"),
      desc: t("supportDesc"),
      icon: <Heart className="w-7 h-7" />,
    },
    {
      key: "events",
      title: t("eventsTitle"),
      desc: t("eventsDesc"),
      icon: <Star className="w-7 h-7" />,
    },
  ];

  return (
    <main className="flex flex-col min-h-screen pt-20 bg-canvas">
      <section className="relative py-24 overflow-hidden bg-navy text-white">
        <BackgroundPattern opacity={0.12} />
        <div className="absolute -top-20 left-0 w-80 h-80 bg-primary/25 blur-[160px] rounded-full" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-gold/20 blur-[200px] rounded-full" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] tracking-[0.6em] text-gold uppercase mb-6">Join CSSA</p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              {t("title")}
            </h1>
            <p className="font-sans text-xl text-white/80 mb-10 leading-relaxed">
              {t("description")}
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button asChild size="lg">
                <a href={joinLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  {t("button")}
                  <ArrowRight className="ml-3 w-6 h-6" />
                </a>
              </Button>
              <p className="text-sm text-white/60 max-w-md">
                {t("note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[12px] tracking-[0.6em] text-gold uppercase mb-4">Why Join</p>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">{t("benefitsTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((benefit) => (
              <div key={benefit.key} className="bg-white rounded-[24px] border border-gray-100 shadow-xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-gold/30">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-canvas text-gold flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="font-serif text-2xl text-navy mb-4">
                  {benefit.title}
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
