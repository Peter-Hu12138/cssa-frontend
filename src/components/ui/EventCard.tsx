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
import { useTranslation } from "@/app/i18n/client";

interface EventCardProps {
  event: Event;
  lng?: string;
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
  return html.replace(/<[^>]*>?/gm, "");
};

export default function EventCard({ event, lng }: EventCardProps) {
  const { t, i18n } = useTranslation(lng, "Common", {});
  const locale = lng || i18n.language;
  
  const name = locale === "en" && event.name_en ? event.name_en : event.name;
  const description = locale === "en" && event.description_en ? event.description_en : event.description;
  
  const dateInfo = formatDateBadge(event.eventdate);
  const imageUrl = event.image || FALLBACK_IMAGE;
  // Location is not yet in the API response, using placeholder
  const location = "Location TBA"; 
  const previewText = stripHtml(description);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out h-full border border-gray-100">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
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
              {name}
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
              <span>{t("viewDetails")}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 mt-2">
            <span className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {dateInfo.full}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {dateInfo.time}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose prose-red max-w-none">
            <RichTextRenderer content={description} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
