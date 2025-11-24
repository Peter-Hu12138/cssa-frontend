'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/app/i18n/client";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import cssaLogo from "../../../img/cssa logo.avif";

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
          <Image
            src={cssaLogo}
            alt="UTCSSA logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="font-serif text-2xl tracking-tight text-white group-hover:text-gold transition-colors">
            UTCSSA
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
