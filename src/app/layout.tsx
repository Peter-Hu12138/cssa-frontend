import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingSocials } from "@/components/layout/FloatingSocials";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Association Portal",
  description: "Official Student Association Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-page-background`}
      >
        <Providers>
          {/* Top Border / Brand Line */}
          <div className="h-1 w-full bg-primary" />

          <Navbar />

          {/* Main Content - Full Width to allow pages to control their own layout */}
          <div className="flex-grow flex flex-col">
            {children}
          </div>

          <FloatingSocials />

          {/* Footer Placeholder */}
          <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Student Association</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Serving the student community with dedication and passion since 1982.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-primary">About Us</a></li>
                  <li><a href="#" className="hover:text-primary">Contact</a></li>
                  <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                </ul>
              </div>
              {/* More columns... */}
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-50 text-center text-sm text-gray-400">
              © 2025 Student Association. All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
