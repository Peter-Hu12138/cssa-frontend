"use client";

import React from "react";
import EventCard from "@/components/ui/EventCard";
import { useEvents } from "@/hooks/useEvents";
import EventCardSkeleton from "@/components/ui/EventCardSkeleton";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

export default function EventsGrid({ lng }: { lng: string }) {
  const { data: events, isLoading, isError } = useEvents();
  const { t } = useTranslation(lng, "EventsGrid", {});

  // Slice to show only the latest 3 events for the homepage
  const displayedEvents = events ? events.slice(0, 3) : [];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 mb-4">
              {t("upcomingEvents")}
            </h2>
            <div className="w-20 h-1 bg-primary" />
          </div>
          <Link 
            href="/events" 
            className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors flex items-center gap-2"
          >
            {t("viewAllEvents")}
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show 3 skeletons while loading
            Array.from({ length: 3 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))
          ) : isError ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>{t("loadError")}</p>
            </div>
          ) : displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} lng={lng} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>{t("noEvents")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
