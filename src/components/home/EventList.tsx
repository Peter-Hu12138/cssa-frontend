"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { CalendarDays, ArrowRight, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event, PaginatedResponse } from "@/types/api";
import { motion } from "framer-motion";

// --- Helper Components ---

const BackgroundPattern = ({ className = "", opacity = 0.05 }: { className?: string; opacity?: number }) => (
  <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }}>
    <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" className="text-current" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#pattern-circles)" />
  </svg>
);

// --- Main Component ---

async function fetchEvents(): Promise<PaginatedResponse<Event>> {
  const res = await fetch("http://localhost:8000/api/v1/events/events/?status=SUPER_DEPT_HEAD_APPROVED&ordering=-eventdate");
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
}

export default function EventList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <EventListSkeleton />;
  if (isError) return <div className="text-center py-12 text-red-500">Failed to load events.</div>;

  const events = data?.results || [];
  if (events.length === 0) {
    return (
      <div className="text-center py-20 bg-mist-white rounded-3xl">
        <p className="text-navy/60 font-medium">No upcoming events at the moment.</p>
      </div>
    );
  }

  // Split events: First one is featured, rest are in the list
  const featuredEvent = events[0];
  const listEvents = events.slice(1, 4); // Show next 3 events

  const getDateParts = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    return {
      day: format(date, "dd"),
      month: format(date, "MMM"),
      full: format(date, "MMMM d, yyyy"),
      time: format(date, "h:mm a"),
    };
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-navy font-bold mb-4">
              Upcoming <span className="text-primary">Events</span>
            </h2>
            <p className="text-navy/60 max-w-xl text-lg leading-relaxed">
              Join us for workshops, seminars, and social gatherings designed to connect and inspire.
            </p>
          </div>
          <Link 
            href="/events" 
            className="group inline-flex items-center gap-2 text-navy font-bold uppercase tracking-widest text-xs hover:text-primary transition-colors"
          >
            View All Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Hero Card */}
          <Link href={`/events/${featuredEvent.id}`} className="group block h-full">
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden bg-navy shadow-2xl">
              {/* Background Image */}
              {featuredEvent.cover_image ? (
                <img
                  src={featuredEvent.cover_image}
                  alt={featuredEvent.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-navy" />
              )}
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-navy/40 mix-blend-multiply transition-opacity group-hover:opacity-30" />
              <BackgroundPattern opacity={0.3} className="z-10 text-white" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-10 z-30">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold text-navy text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  {featuredEvent.department_in_charge_detail?.name || "Featured"}
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-white font-bold leading-tight mb-6 drop-shadow-lg">
                  {featuredEvent.name}
                </h3>
                <div className="flex items-center gap-6 text-white/90 mb-8">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-gold" />
                    <span className="text-sm font-medium tracking-wide">{getDateParts(featuredEvent.eventdate).full}</span>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center px-8 py-3 bg-white text-navy rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  View Details
                </span>
              </div>
            </div>
          </Link>

          {/* Interactive List */}
          <div className="flex flex-col gap-6 justify-center">
            {listEvents.map((event) => {
              const { day, month } = getDateParts(event.eventdate);
              return (
                <Link key={event.id} href={`/events/${event.id}`} className="group block">
                  <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gold/30 hover:-translate-y-1">
                    {/* Date Box */}
                    <div className="flex-shrink-0 w-20 h-20 bg-navy rounded-xl flex flex-col items-center justify-center text-white group-hover:bg-primary transition-colors duration-300">
                      <span className="text-2xl font-bold font-serif">{day}</span>
                      <span className="text-xs font-medium uppercase tracking-wider text-white/70">{month}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                          {event.department_in_charge_detail?.name || "Event"}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-navy truncate group-hover:text-primary transition-colors duration-300">
                        {event.name}
                      </h4>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mist-white flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
            
            {/* View All Link (Mobile/Tablet only if needed, but we have it in header) */}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventListSkeleton() {
  return (
    <div className="py-24 container mx-auto px-4">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-[500px] w-full rounded-3xl" />
        <div className="flex flex-col gap-6 justify-center">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}