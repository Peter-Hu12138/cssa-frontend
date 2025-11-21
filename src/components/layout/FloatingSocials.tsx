"use client";

import React from "react";
import { Mail, Instagram, Globe, MessageCircle, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingSocials() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/uoftcssa",
      color: "bg-primary hover:bg-primary-dark",
    },
    {
      name: "WeChat",
      icon: <MessageCircle className="w-5 h-5" />,
      href: "#",
      color: "bg-primary hover:bg-primary-dark",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/uoft-cssa",
      color: "bg-primary hover:bg-primary-dark",
    },
    {
      name: "Website",
      icon: <Globe className="w-5 h-5" />,
      href: "https://cssa.ca",
      color: "bg-primary hover:bg-primary-dark",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:contact@cssa.ca",
      color: "bg-primary hover:bg-primary-dark",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-3">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110",
            link.color
          )}
          title={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
