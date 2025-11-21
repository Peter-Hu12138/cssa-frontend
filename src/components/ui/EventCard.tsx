"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RichTextRenderer from "@/components/shared/RichTextRenderer";
import { Event } from "@/types/api";

interface EventCardProps {
  event: Event;
}

// --- Helper: Date Formatter ---
const formatDateBadge = (dateStr?: string) => {
  if (!dateStr) return { month: "TBA", day: "--", full: "Date TBA", time: "Time TBA" };
  try {
    const date = new Date(dateStr);
    return {
      month: format(date, "MMM"),
      day: format(date, "dd"),
      full: format(date, "MMMM d, yyyy"),
      time: format(date, "h:mm a"),
    };
  } catch (e) {
    return { month: "TBA", day: "--", full: "Date TBA", time: "Time TBA" };
  }
};

// --- Helper: Fallback Image ---
// A nice abstract geometric pattern in Red/Grey
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1000&auto=format&fit=crop";

// --- Helper: Strip HTML for Preview ---
const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
};

export default function EventCard({ event }: EventCardProps) {
  const dateInfo = formatDateBadge(event.eventdate);
  const imageUrl = event.image || FALLBACK_IMAGE;
  // Location is not yet in the API response, using placeholder
  const location = "Location TBA"; 
  const previewText = stripHtml(event.description);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out h-full border border-gray-100">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={event.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Date Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 text-center shadow-md min-w-[60px]">
              <div className="text-xs font-bold text-primary uppercase tracking-wider">
                {dateInfo.month}
              </div>
              <div className="text-xl font-black text-gray-900 leading-none">
                {dateInfo.day}
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {event.name}
            </h3>
            
            <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-primary/70" />
                <span>{dateInfo.time}</span>
              </div>
            </div>

            {/* Description Preview */}
            <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
              {previewText}
            </p>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm font-medium text-primary">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* --- Modal Content --- */}
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white border-none shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto md:overflow-visible">
          
          {/* Left: Hero Image */}
          <div className="relative h-64 md:h-full min-h-[300px]">
            <img
              src={imageUrl}
              alt={event.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            <div className="absolute bottom-4 left-4 text-white md:hidden">
              <div className="font-bold text-lg">{dateInfo.full}</div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-8 flex flex-col h-full overflow-y-auto">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-2">
                <Calendar className="w-4 h-4" />
                <span>Upcoming Event</span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
                {event.name}
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-2 text-gray-500 mt-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-gray-700">{dateInfo.full} at {dateInfo.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium text-gray-700">{location}</span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="flex-grow mb-8">
               <RichTextRenderer content={event.description} className="prose-sm" />
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-6 text-lg uppercase tracking-widest rounded-none shadow-lg hover:shadow-xl transition-all">
                Register Now
              </Button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Registration closes 24 hours before the event.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
