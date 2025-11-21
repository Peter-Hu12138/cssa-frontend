"use client";

import React from "react";
import EventCard from "@/components/ui/EventCard";
import EventCardSkeleton from "@/components/ui/EventCardSkeleton";
import { useEvents } from "@/hooks/useEvents";

export default function EventsPage() {
  const { data: events, isLoading, isError } = useEvents();

  return (
    <main className="flex-grow bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-gray-900 mb-4">
            All Events
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Discover what's happening in our community. Join us for workshops, celebrations, and networking opportunities.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Show 6 skeletons while loading
              Array.from({ length: 6 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
            ) : isError ? (
              <div className="col-span-full text-center py-24">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to load events</h3>
                <p className="text-gray-500">Please check your connection and try again.</p>
              </div>
            ) : events && events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No upcoming events</h3>
                <p className="text-gray-500 max-w-md">
                  We don't have any events scheduled right now. Stay tuned for updates!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
