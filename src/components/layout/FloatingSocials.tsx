"use client";

import React, { useMemo, useState } from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Default fallback links
const DEFAULT_LINKS = [
  {
    name: "Instagram",
    icon_name: "Instagram",
    url: "https://instagram.com/uoftcssa",
    slug: "instagram",
    order: 0,
  },
  {
    name: "WeChat",
    icon_name: "MessageCircle",
    url: "uoftcssa", // Treated as WeChat ID
    slug: "wechat",
    order: 1,
  },
  {
    name: "LinkedIn",
    icon_name: "Linkedin",
    url: "https://www.linkedin.com/company/uoft-cssa",
    slug: "linkedin",
    order: 2,
  },
  {
    name: "Website",
    icon_name: "Globe",
    url: "https://cssa.ca",
    slug: "website",
    order: 3,
  },
  {
    name: "Email",
    icon_name: "Mail",
    url: "mailto:contact@cssa.ca",
    slug: "email",
    order: 4,
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function FloatingSocials() {
  const { data: fetchedLinks } = useExternalLinks();
  const [weChatOpen, setWeChatOpen] = useState(false);
  const [weChatId, setWeChatId] = useState("");

  const activeLinks = useMemo(() => {
    // Start with a map of defaults for easy lookup/replacement
    const linkMap = new Map<string, any>();
    
    DEFAULT_LINKS.forEach(link => {
      if (link.slug) linkMap.set(link.slug, link);
    });

    // Merge fetched links
    if (fetchedLinks) {
      fetchedLinks.forEach(link => {
        // This will replace existing default if slug matches, or add new one
        linkMap.set(link.slug, link);
      });
    }

    // Convert back to array and sort by order
    return Array.from(linkMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [fetchedLinks]);

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.slug === "wechat") {
      e.preventDefault();
      setWeChatId(link.url);
      setWeChatOpen(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-3">
        {activeLinks.map((link) => {
          // Dynamically resolve icon component
          const IconComponent = (LucideIcons as any)[link.icon_name] || LucideIcons.Link;

          return (
            <a
              key={link.slug || link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleLinkClick(e, link)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110",
                "bg-primary hover:bg-primary-dark cursor-pointer"
              )}
              title={link.name}
            >
              <IconComponent className="w-5 h-5" />
            </a>
          );
        })}
      </div>

      <Dialog open={weChatOpen} onOpenChange={setWeChatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Follow us on WeChat</DialogTitle>
            <DialogDescription>
              WeChat is a closed platform. Please open your WeChat app and search for the ID below:
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="text-2xl font-bold text-primary select-all">
              {weChatId}
            </div>
            <p className="text-sm text-muted-foreground">
              (Click text to select)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
