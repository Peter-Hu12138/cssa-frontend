"use client";

import { useGuides } from "@/hooks/useGuides";
import { Guide } from "@/types/api";
import { API_URL } from "@/lib/config";
import { Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuidesPage() {
  const { data: guides, isLoading } = useGuides();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-20 bg-white">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
            Freshman Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For years, CSSA has dedicated itself to compiling the most comprehensive survival guide for new students. 
            From course selection to finding the best food in Toronto, our Freshman Guide is your essential companion 
            for starting your journey at UofT.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides?.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
          
          {(!guides || guides.length === 0) && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No guides available at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  // Ensure URLs are absolute
  const coverUrl = guide.cover_image 
    ? (guide.cover_image.startsWith("http") ? guide.cover_image : `${API_URL}${guide.cover_image}`)
    : null;
    
  const fileUrl = guide.file 
    ? (guide.file.startsWith("http") ? guide.file : `${API_URL}${guide.file}`)
    : "#";

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Cover Image Area */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={guide.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <BookOpen className="w-16 h-16 mb-2 opacity-50" />
            <span className="text-sm font-medium uppercase tracking-widest">No Cover</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {guide.year} Edition
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          {guide.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {guide.description || `The official CSSA Freshman Guide for the year ${guide.year}. Packed with essential information for new students.`}
        </p>

        <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto"
        >
          <Button className="w-full bg-gray-900 hover:bg-primary text-white transition-colors duration-300 flex items-center justify-center gap-2 py-6">
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
        </a>
      </div>
    </div>
  );
}
