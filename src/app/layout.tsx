import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingSocials } from "@/components/layout/FloatingSocials";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { useTranslation as getServerTranslation } from './i18n'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

import { getLocale } from './i18n/server-utils'

export const metadata: Metadata = {
  title: "Student Association Portal",
  description: "Official Student Association Portal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  
  return (
    <html lang={locale} dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col bg-page-background`}
        suppressHydrationWarning
      >
          <Providers>
            {/* Top Border / Brand Line */}
            <div className="h-1 w-full bg-primary" />

            <Navbar lng={locale} />

            {/* Main Content - Full Width to allow pages to control their own layout */}
            <div className="flex-grow flex flex-col">
              {children}
            </div>

            <FloatingSocials lng={locale} />

            <Footer lng={locale} />
          </Providers>
      </body>
    </html>
  );
}

async function Footer({ lng }: { lng: string }) {
  const { t } = await getServerTranslation(lng, 'Footer')
  
  return (
    <footer className="relative bg-[#1A1A40] text-white py-16 mt-auto overflow-hidden">
      <BackgroundPattern opacity={0.08} />
      <div className="absolute -top-32 left-10 w-72 h-72 bg-[#CC232A]/30 blur-[140px] rounded-full" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#CC9902]/20 blur-[160px] rounded-full" aria-hidden="true" />
      <div className="container relative mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="text-[12px] tracking-[0.6em] text-[#CC9902] uppercase mb-4">{t("est")}</p>
          <h3 className="font-serif text-3xl leading-tight mb-4">{t("title")}</h3>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            {t("description")}
          </p>
        </div>
        <div>
          <p className="text-[12px] tracking-[0.6em] text-[#CC9902] uppercase mb-4">{t("quickLinks")}</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-[#007FA3] transition-colors">{t("aboutUs")}</a></li>
            <li><a href="#" className="hover:text-[#007FA3] transition-colors">{t("contact")}</a></li>
            <li><a href="#" className="hover:text-[#007FA3] transition-colors">{t("privacyPolicy")}</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[12px] tracking-[0.6em] text-[#CC9902] uppercase mb-4">{t("connect")}</p>
          <p className="text-sm text-white/70 leading-relaxed">
            {t("cta")}
          </p>
        </div>
      </div>
      <div className="container relative mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-xs tracking-[0.4em] text-white/60 uppercase">
        {t("copyright")}
      </div>
    </footer>
  );
}
