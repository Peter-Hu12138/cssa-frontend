"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/app/i18n/client";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import cssaLogo from "../../../img/cssa logo.avif";

export function Navbar({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "Navigation", {});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/departments", label: t("departments") },
    { href: "/events", label: t("events") },
    { href: "/about", label: t("about") },
    { href: "/team", label: t("team") },
    { href: "/guides", label: t("guides") },
  ];

  const closeMenu = () => setIsMenuOpen(false);

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:text-gold transition"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <LanguageSwitcher lng={lng} />
          <Link href="/join" className="hidden sm:block">
            <Button>{t("join")}</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-out ${
          isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="container mx-auto px-6 pb-6 pt-2">
          <div className="rounded-[32px] border border-white/10 bg-[#1A1A40]/90 backdrop-blur-xl p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block text-sm font-semibold uppercase tracking-[0.35em] text-white/80 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <Link href="/join" onClick={closeMenu}>
                <Button className="w-full">{t("join")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
