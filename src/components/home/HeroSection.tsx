import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden mb-12">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text mb-6">
          Welcome to the <span className="text-primary">UTCSSA</span> Member Portal
        </h1>
        <p className="text-lg text-text-muted mb-8 leading-relaxed">
          Founded in 1982, UTCSSA is the oldest and largest Chinese student organization at the University of Toronto. 
          We are dedicated to serving the community through academic support, cultural events, and career development.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="font-semibold">
            Explore Events
          </Button>
          <Button variant="outline" size="lg" className="font-semibold">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-20 -mb-12 w-48 h-48 bg-red-100 rounded-full blur-2xl opacity-30 pointer-events-none" />
    </section>
  );
}
