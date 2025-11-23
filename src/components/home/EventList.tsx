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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-text">Latest Events</h2>
        <Button variant="link" className="text-primary">View All Events &rarr;</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-100 relative overflow-hidden rounded-t-lg">
               {event.cover_image ? (
                 <img 
                   src={event.cover_image} 
                   alt={event.name} 
                   className="w-full h-full object-cover"
                 />
               ) : (
                 <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-10" />
               )}
               <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-primary shadow-sm">
                 {event.department_in_charge_detail.name}
               </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-text-muted line-clamp-3 mb-4">
                {event.description}
              </p>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1.5 text-primary" />
                  {event.eventdate ? format(new Date(event.eventdate), "MMM dd, yyyy") : "TBA"}
                </div>
                {/* Location is not in the main Event model in the schema provided, so omitting */}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" variant="outline">View Details</Button>
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
