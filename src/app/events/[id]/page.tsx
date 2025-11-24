"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import {
  CalendarDays,
  ArrowLeft,
  Download,
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import RichTextRenderer from "@/components/shared/RichTextRenderer";
import { useTranslation } from "@/app/i18n/client";
import type { Event, EventAttachment } from "@/types/api";
import { API_URL } from "@/lib/config";

async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/api/v1/events/events/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  return res.json();
}

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { t } = useTranslation(undefined, "Events", {});

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
          {t("backToEvents")}
        </Button>
      </div>
    );
  }

  const primaryDate = event.eventdate ? new Date(event.eventdate) : null;
  const endDate = event.eventEndTime ? new Date(event.eventEndTime) : null;

  return (
    <main className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <Button
          variant="ghost"
          className="mb-6 pl-0 text-navy hover:text-primary hover:pl-2 transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("backToEvents")}
        </Button>

        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#1A1A40] via-[#2B1A4B] to-[#7A1E2F] text-white p-10 shadow-2xl">
          <BackgroundPattern opacity={0.08} />
          {event.cover_image && (
            <>
              <img
                src={event.cover_image}
                alt={event.name}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A40]/90 via-[#1A1A40]/80 to-[#1A1A40]" />
            </>
          )}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] bg-white/10 border border-white/20 rounded-full px-4 py-2">
              <CalendarDays className="w-4 h-4" />
              {primaryDate ? format(primaryDate, "MMM dd, yyyy") : "TBA"}
            </div>
            <div>
              <p className="text-[12px] tracking-[0.6em] text-gold uppercase mb-3">{event.department_in_charge_detail.name}</p>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">{event.name}</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-1">{t("dateTimeLabel")}</p>
                <p className="font-serif text-2xl">{primaryDate ? format(primaryDate, "MMM dd") : "TBA"}</p>
                <p className="text-sm text-white/70">
                  {primaryDate ? format(primaryDate, "h:mm a") : ""}
                  {endDate ? ` - ${format(endDate, "h:mm a")}` : ""}
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-1">Status</p>
                <p className="font-serif text-2xl">{event.status?.replace(/_/g, " ") || "Scheduled"}</p>
                <p className="text-sm text-white/70">{event.department_in_charge_detail.name}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-1">Location</p>
                <p className="font-serif text-2xl">{event.external_link ? "Hybrid" : "On campus"}</p>
                <p className="text-sm text-white/70">Details shared after RSVP</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-10">
          <div className="space-y-8">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-navy">{t("aboutSection")}</CardTitle>
              </CardHeader>
              <CardContent>
                {event.description ? (
                  <RichTextRenderer content={event.description} />
                ) : (
                  <p className="text-gray-500">More details coming soon.</p>
                )}
              </CardContent>
            </Card>

            {event.attachments && event.attachments.length > 0 && (
              <Card className="border border-gray-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-navy">{t("documentsSection")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.attachments.map((file) => (
                    <AttachmentCard key={file.id} attachment={file} />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90">
              <CardHeader>
                <CardTitle className="text-navy text-xl">{t("detailsCard")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-gray-600">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">{t("leaderLabel")}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif text-xl">
                      {event.leader_detail.short_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{event.leader_detail.short_name}</p>
                      <p className="text-xs text-gray-500">{event.leader_detail.title || "Event Lead"}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">{t("dateTimeLabel")}</p>
                  <p className="text-base font-medium text-navy">
                    {primaryDate ? format(primaryDate, "EEEE, MMM dd") : "TBA"}
                  </p>
                  <p>{primaryDate ? format(primaryDate, "h:mm a") : ""}{endDate ? ` - ${format(endDate, "h:mm a")}` : ""}</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">{t("departmentLabel")}</p>
                  <p className="font-medium">{event.department_in_charge_detail.name}</p>
                </div>

                {event.external_link && (
                  <Button className="w-full mt-2" asChild>
                    <a href={event.external_link} target="_blank" rel="noopener noreferrer">
                      {t("registerCta")}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-navy text-white border-none shadow-xl relative overflow-hidden">
              <BackgroundPattern opacity={0.06} />
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-white">Bring this event to campus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/80">
                <p>
                  Want to partner on logistics, sponsorships, or media coverage? Drop us a line and our operations pod will follow up within 48 hours.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="mailto:events@utcssa.ca">Connect with us</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function AttachmentCard({ attachment }: { attachment: EventAttachment }) {
  const renderIcon = () => {
    switch (attachment.category) {
      case "budget":
        return <FileSpreadsheet className="h-5 w-5" />;
      case "proposal":
        return <FileText className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <a
      href={attachment.file_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-2xl border border-gray-200/60 bg-white/80 px-5 py-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          {renderIcon()}
        </div>
        <div>
          <p className="font-semibold text-navy">{attachment.description || "Untitled Document"}</p>
          {attachment.uploaded_at && (
            <p className="text-[13px] text-gray-500">{format(new Date(attachment.uploaded_at), "MMM dd, yyyy")}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 text-primary text-sm font-medium">
        <Download className="h-4 w-4" />
        {attachment.category?.toUpperCase() || "FILE"}
      </div>
    </a>
  );
}
