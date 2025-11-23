'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/app/i18n/client";

export function Navbar({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "Navigation", {});

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-bold text-xl rounded-sm">
            C
          </div>
          <span className="font-bold text-xl tracking-wide text-gray-900 group-hover:text-primary transition-colors">
            CSSA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
          >
            {t("home")}
          </Link>
          <Link 
            href="/departments" 
            className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
          >
            {t("departments")}
          </Link>
          <Link 
            href="/events" 
            className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
          >
            {t("events")}
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
          >
            {t("about")}
          </Link>
          <Link 
            href="/team" 
            className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
          >
            {t("team")}
          </Link>
          <Link 
            href="/guides" 
            className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
          >
            {t("guides")}
          </Link>
        </nav>

        {/* Auth Buttons - Removed for static site */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher lng={lng} />
          <Link href="/join">
            <Button className="bg-primary text-white hover:bg-primary-dark text-sm font-bold uppercase tracking-wider px-6 rounded-none">
              {t("join")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
