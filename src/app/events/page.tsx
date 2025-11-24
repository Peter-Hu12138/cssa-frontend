"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, PartyPopper, Share2 } from "lucide-react";
import EventCard from "@/components/ui/EventCard";
import EventCardSkeleton from "@/components/ui/EventCardSkeleton";
import { useEvents } from "@/hooks/useEvents";
import { useTranslation } from "@/app/i18n/client";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/api";

type EventCategory = "upcoming" | "ongoing" | "past";

export default function EventsPage() {
  const { data: events, isLoading, isError } = useEvents();
  const [activeCategory, setActiveCategory] = useState<EventCategory>("upcoming");
  const { t, i18n } = useTranslation(undefined, "Events", {});

  const categorizedEvents = React.useMemo<Record<EventCategory, Event[]>>(() => {
    const base: Record<EventCategory, Event[]> = {
      upcoming: [],
      ongoing: [],
      past: [],
    };

    if (!events) return base;

    const now = new Date();

    events.forEach((event) => {
      if (!event.eventdate) return;
      const start = new Date(event.eventdate);
      const end = event.eventEndTime ? new Date(event.eventEndTime) : new Date(start.getTime() + 2 * 60 * 60 * 1000);

      if (start <= now && end >= now) {
        base.ongoing.push(event);
      } else if (start > now) {
        base.upcoming.push(event);
      } else {
        base.past.push(event);
      }
    });

    const asc = (a: Event, b: Event) => new Date(a.eventdate!).getTime() - new Date(b.eventdate!).getTime();
    const desc = (a: Event, b: Event) => new Date(b.eventdate!).getTime() - new Date(a.eventdate!).getTime();

    base.upcoming.sort(asc);
    base.ongoing.sort(asc);
    base.past.sort(desc);

    return base;
  }, [events]);

  const filteredEvents = categorizedEvents[activeCategory] ?? [];

  const uniqueDepartments = React.useMemo(() => {
    if (!events) return 0;
    return new Set(events.map((event) => event.department_in_charge_detail?.name)).size;
  }, [events]);

  const stats = [
    { label: t("statUpcoming"), value: String(categorizedEvents.upcoming?.length ?? 0).padStart(2, "0") },
    { label: t("statDepartments"), value: uniqueDepartments ? uniqueDepartments.toString().padStart(2, "0") : "00" },
    { label: t("statVolunteers"), value: "200+" },
  ];

  const insights = [
    { title: t("insightOneTitle"), description: t("insightOneDesc") },
    { title: t("insightTwoTitle"), description: t("insightTwoDesc") },
    { title: t("insightThreeTitle"), description: t("insightThreeDesc") },
  ];

  const tabs: { id: EventCategory; label: string }[] = [
    { id: "upcoming", label: t("upcoming") },
    { id: "ongoing", label: t("ongoing") },
    { id: "past", label: t("past") },
  ];

  return (
    <main className="flex-grow bg-canvas min-h-screen">
      <section className="relative bg-navy text-white pt-32 pb-20 overflow-hidden">
        <BackgroundPattern opacity={0.08} />
        <div className="absolute -top-24 right-10 w-72 h-72 bg-gold/25 blur-[180px] rounded-full" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-primary/20 blur-[260px] rounded-full" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.6em] text-gold bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-5">
              <Sparkles className="w-4 h-4" />
              {t("tagline")}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              {t("title")}
            </h1>
            <p className="font-sans text-lg text-white/80">
              {t("subtitle")}
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-10" asChild>
              <Link href="/events">{t("primaryCta")}</Link>
            </Button>
            <Button size="lg" variant="secondary" className="px-10" asChild>
              <Link href="/join">{t("secondaryCta")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur py-6 px-5">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">{stat.label}</p>
                <p className="mt-3 font-serif text-4xl text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 grid gap-8 lg:grid-cols-[2.5fr_1fr]">
          <div>
            <div className="flex flex-wrap justify-between items-center gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gold mb-2">Curated timeline</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Select a phase</h2>
              </div>
              <div className="inline-flex rounded-full bg-white shadow-xl border border-gray-100 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.4em] transition-all ${
                      activeCategory === tab.id
                        ? "bg-primary text-white shadow-lg"
                        : "text-navy/60 hover:text-navy"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
              ) : !isError && filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} lng={i18n.language} />
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-dashed border-gray-300 rounded-[32px] bg-white/70">
                  <p className="text-gray-500 text-lg">{t("noEvents")}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-gray-200 bg-white shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <PartyPopper className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{t("insightsTitle")}</p>
                  <h3 className="font-serif text-2xl text-navy">Highlights</h3>
                </div>
              </div>
              <div className="space-y-4">
                {insights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-gold mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] bg-navy text-white p-6 relative overflow-hidden">
              <BackgroundPattern opacity={0.08} />
              <div className="absolute -top-10 right-0 w-48 h-48 bg-gold/20 blur-[120px] rounded-full" aria-hidden />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl">Want to collaborate?</h3>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Pitch a cultural showcase, workshop, or community partnership. We&rsquo;ll pair you with the right department to bring it to life.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/contact">Start a proposal</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
