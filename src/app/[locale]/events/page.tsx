"use client";

import React, { useState, use } from "react";
import EventCard from "@/components/ui/EventCard";
import EventCardSkeleton from "@/components/ui/EventCardSkeleton";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/api";
import { useTranslation } from "@/app/i18n/client";

type EventCategory = "upcoming" | "ongoing" | "past";

export default function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const { data: events, isLoading, isError } = useEvents();
  const [activeCategory, setActiveCategory] = useState<EventCategory>("upcoming");
  const { t } = useTranslation(locale, "Events", {});

  // Filter events based on category
  const filteredEvents = React.useMemo(() => {
    if (!events) return [];
    
    const now = new Date();
    
    return events.filter((event) => {
      if (!event.eventdate) return false;
      
      const start = new Date(event.eventdate);
      // If no end time, assume it ends 2 hours after start for categorization purposes, 
      // or just treat it as a point in time.
      // Let's assume if no end time, it's a point in time event.
      const end = event.eventEndTime ? new Date(event.eventEndTime) : new Date(start.getTime() + 2 * 60 * 60 * 1000);

      if (activeCategory === "ongoing") {
        return start <= now && end >= now;
      } else if (activeCategory === "upcoming") {
        return start > now;
      } else {
        // past
        return end < now;
      }
    }).sort((a, b) => {
      // Sort upcoming/ongoing by start date ascending (soonest first)
      // Sort past by start date descending (most recent first)
      const dateA = new Date(a.eventdate!).getTime();
      const dateB = new Date(b.eventdate!).getTime();
      
      if (activeCategory === "past") {
        return dateB - dateA;
      }
      return dateA - dateB;
    });
  }, [events, activeCategory]);

  const tabs: { id: EventCategory; label: string }[] = [
    { id: "upcoming", label: t("upcoming") },
    { id: "ongoing", label: t("ongoing") },
    { id: "past", label: t("past") },
  ];

  return (
    <main className="flex-grow bg-gray-50 min-h-screen pt-20">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-gray-900 mb-4">
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Tabs & Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeCategory === tab.id
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Show 6 skeletons while loading
              Array.from({ length: 6 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} lng={locale} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">{t("noEvents")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
