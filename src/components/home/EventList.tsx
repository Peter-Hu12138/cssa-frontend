"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { Event, PaginatedResponse } from "@/types/api";

async function fetchEvents(): Promise<PaginatedResponse<Event>> {
  const res = await fetch("http://localhost:8000/api/v1/events/events/?status=SUPER_DEPT_HEAD_APPROVED&ordering=-eventdate");
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
}

export default function EventList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", "latest"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <EventListSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg border border-red-100 text-red-600">
        Failed to load events. Please try again later.
      </div>
    );
  }

  const events = data?.results.slice(0, 3) || [];

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
        No upcoming events found.
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-navy">Latest Events</h2>
        <Button variant="link" className="text-gold font-bold uppercase tracking-wider hover:text-navy transition-colors">View All Events &rarr;</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-gray-100 group rounded-sm overflow-hidden">
            <div className="h-56 bg-gray-100 relative overflow-hidden">
               {event.cover_image ? (
                 <img 
                   src={event.cover_image} 
                   alt={event.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
               ) : (
                 <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light opacity-90" />
               )}
               <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-bold text-navy uppercase tracking-wider shadow-sm">
                 {event.department_in_charge_detail.name}
               </div>
            </div>
            <CardHeader className="pb-3 pt-6">
              <CardTitle className="font-serif text-xl line-clamp-2 text-navy group-hover:text-primary transition-colors duration-300">{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-sans text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                {event.description}
              </p>
              <div className="flex items-center text-xs text-gray-500 space-x-4 border-t border-gray-100 pt-4">
                <div className="flex items-center text-gold font-medium">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {event.eventdate ? format(new Date(event.eventdate), "MMM dd, yyyy") : "TBA"}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-6">
              <Button className="w-full bg-navy text-white hover:bg-primary rounded-sm uppercase tracking-widest font-bold text-xs py-6 transition-colors duration-300">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EventListSkeleton() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-gray-100 bg-white p-0 overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
