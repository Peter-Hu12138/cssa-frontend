"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ lng }: { lng: string }) {
  const router = useRouter();

  const writeLocaleCookie = (newLocale: string) => {
    if (typeof document === "undefined") return;
    const cookieSetter = Object.getOwnPropertyDescriptor(Document.prototype, "cookie")?.set;
    const cookieValue = `i18next=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    cookieSetter?.call(document, cookieValue);
  };

  const switchLanguage = (newLocale: string) => {
    if (lng === newLocale) return;
    writeLocaleCookie(newLocale);
    router.refresh();
  };

  return (
    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-sm">
      <button
        onClick={() => switchLanguage('en')}
        className={cn(
          "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300",
          lng === 'en' 
            ? "bg-white text-navy shadow-lg transform scale-105" 
            : "text-white/60 hover:text-white"
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('zh')}
        className={cn(
          "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300",
          lng === 'zh' 
            ? "bg-white text-navy shadow-lg transform scale-105" 
            : "text-white/60 hover:text-white"
        )}
      >
        中
      </button>
    </div>
  );
}