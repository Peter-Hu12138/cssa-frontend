"use client";

import { Sponsor } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface SponsorDialogProps {
  sponsor: Sponsor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
}

export default function SponsorDialog({ sponsor, open, onOpenChange, locale }: SponsorDialogProps) {
  
  const promotionalText = locale === "zh" && sponsor.promotional_text_en 
    ? sponsor.promotional_text_en 
    : sponsor.promotional_text;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{sponsor.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Sponsor details and promotional offer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Promotional Image */}
          {sponsor.promotional_image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={sponsor.promotional_image}
                alt={`${sponsor.name} promotional image`}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Promotional Text */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-500">
            <p className="text-lg font-semibold text-gray-900">
              {promotionalText}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8"
            >
              <a
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
