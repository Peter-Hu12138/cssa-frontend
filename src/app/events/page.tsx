"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // We need to create this
import { Search } from "lucide-react";
import type { Event, PaginatedResponse } from "@/types/api";

async function fetchEvents(search: string): Promise<PaginatedResponse<Event>> {
  const params = new URLSearchParams();
  params.append("ordering", "-eventdate");
  // In a real app, we might filter by status=SUPER_DEPT_HEAD_APPROVED for public view
  // params.append("status", "SUPER_DEPT_HEAD_APPROVED"); 
  if (search) {
    params.append("search", search);
  }

  const res = await fetch(`http://localhost:8000/api/v1/events/events/?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
}

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("upcoming");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", search],
    queryFn: () => fetchEvents(search),
  });

  const events = data?.results || [];
  const now = new Date();

  const filteredEvents = events.filter((event) => {
    if (!event.eventdate) return false;
    const eventDate = new Date(event.eventdate);
    
    if (activeTab === "upcoming") {
      return eventDate >= now;
    } else if (activeTab === "past") {
      return eventDate < now;
    }
    return true;
  });

  // Sort upcoming ascending (soonest first), past descending (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.eventdate || 0).getTime();
    const dateB = new Date(b.eventdate || 0).getTime();
    return activeTab === "upcoming" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Events</h1>
          <p className="text-text-muted mt-1">
            Discover what's happening in the CSSA community.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "upcoming"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "past"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Past Events
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "all"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            All Events
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[400px] rounded-lg border border-gray-100 bg-white p-4">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-100 text-red-600">
          Failed to load events.
        </div>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-gray-500">No events found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
