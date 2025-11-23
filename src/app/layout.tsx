import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingSocials } from "@/components/layout/FloatingSocials";
import { languages } from './i18n/settings'
import { useTranslation } from './i18n'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-page-background`}
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
  const { t } = await useTranslation(lng, 'Footer')
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">{t("title")}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t("description")}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">{t("quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-primary">{t("aboutUs")}</a></li>
            <li><a href="#" className="hover:text-primary">{t("contact")}</a></li>
            <li><a href="#" className="hover:text-primary">{t("privacyPolicy")}</a></li>
          </ul>
        </div>
        {/* More columns... */}
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-50 text-center text-sm text-gray-400">
        {t("copyright")}
      </div>
    </footer>
  );
}
