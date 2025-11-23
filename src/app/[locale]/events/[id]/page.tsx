"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { 
  CalendarDays, 
  MapPin, 
  User, 
  ArrowLeft, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  File, 
  Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Event, EventAttachment } from "@/types/api";

async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`http://localhost:8000/api/v1/events/events/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  return res.json();
}

export default function EventDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = use(params);
  const router = useRouter();

  const { data: event, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
        <Button onClick={() => router.back()} className="mt-4" variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-2 transition-all" 
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Events
      </Button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="h-64 bg-gradient-to-r from-red-600 to-red-800 relative p-8 flex flex-col justify-end text-white">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
            {event.status?.replace(/_/g, ' ')}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2" />
              {event.eventdate ? format(new Date(event.eventdate), "EEEE, MMMM do, yyyy • h:mm a") : "TBA"}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Organized by {event.department_in_charge_detail.name}
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4">About this Event</h3>
              <div className="prose prose-red max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </div>
            </section>

            {event.attachments && event.attachments.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Documents & Resources</h3>
                <div className="grid gap-3">
                  {event.attachments.map((file) => (
                    <AttachmentCard key={file.id} attachment={file} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Leader</span>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-primary font-bold mr-3">
                      {event.leader_detail.short_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{event.leader_detail.short_name}</p>
                      <p className="text-xs text-gray-500">{event.leader_detail.title || "Event Leader"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Date & Time</span>
                  <p className="font-medium">
                    {event.eventdate ? format(new Date(event.eventdate), "MMM dd, yyyy") : "TBA"}
                  </p>
                  <p className="text-gray-500">
                    {event.eventdate ? format(new Date(event.eventdate), "h:mm a") : ""} 
                    {event.eventEndTime ? ` - ${format(new Date(event.eventEndTime), "h:mm a")}` : ""}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Department</span>
                  <p className="font-medium">{event.department_in_charge_detail.name}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttachmentCard({ attachment }: { attachment: EventAttachment }) {
  const getIcon = () => {
    switch (attachment.category) {
      case 'budget': return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case 'proposal': return <FileText className="w-5 h-5 text-blue-600" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <a 
      href={attachment.file_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-red-50/30 transition-all group"
    >
      <div className="mr-3 p-2 bg-gray-50 rounded-md group-hover:bg-white transition-colors">
        {getIcon()}
      </div>
      <div className="flex-grow min-w-0">
        <p className="font-medium text-sm text-gray-900 truncate">
          {attachment.description || "Untitled Document"}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-0.5">
          <span className="capitalize">{attachment.category || "Document"}</span>
          <span className="mx-1">•</span>
          <Clock className="w-3 h-3 mr-1" />
          {format(new Date(attachment.uploaded_at), "MMM d, yyyy")}
        </div>
      </div>
      <Download className="w-4 h-4 text-gray-400 group-hover:text-primary ml-3" />
    </a>
  );
}
