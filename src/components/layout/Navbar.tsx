'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/app/i18n/client";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";

export function Navbar({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "Navigation", {});

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A40]/95 text-white backdrop-blur-xl border-b border-white/10">
      <div className="absolute inset-0 opacity-60">
        <BackgroundPattern opacity={0.1} />
      </div>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white/10 border border-white/30 text-white flex items-center justify-center font-serif text-2xl rounded-full shadow-lg">
            C
          </div>
          <span className="font-serif text-2xl tracking-tight text-white group-hover:text-gold transition-colors">
            CSSA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-sans">
          <Link 
            href="/" 
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-gold transition-colors"
          >
            {t("home")}
          </Link>
          <Link 
            href="/departments" 
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-gold transition-colors"
          >
            {t("departments")}
          </Link>
          <Link 
            href="/events" 
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-gold transition-colors"
          >
            {t("events")}
          </Link>
          <Link 
            href="/about" 
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-gold transition-colors"
          >
            {t("about")}
          </Link>
          <Link 
            href="/team" 
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-gold transition-colors"
          >
            {t("team")}
          </Link>
          <Link 
            href="/guides" 
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-gold transition-colors"
          >
            {t("guides")}
          </Link>
        </nav>

        {/* Auth Buttons - Removed for static site */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher lng={lng} />
          <Link href="/join">
            <Button>
              {t("join")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
