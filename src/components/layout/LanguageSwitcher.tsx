"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ lng }: { lng: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: string) => {
    if (lng === newLocale) {
      setIsOpen(false);
      return;
    }
    
    // Set cookie
    document.cookie = `i18next=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Refresh the page to apply the new locale
    router.refresh();
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' }, // Using emoji flags for simplicity and reliability
    { code: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase font-medium">{lng}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors",
                lng === language.code ? "text-primary font-medium" : "text-gray-600"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{language.flag}</span>
                {language.label}
              </span>
              {lng === language.code && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}