import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EventsGrid from "@/components/sections/EventsGrid";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            alt="University Campus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Connecting Chinese Culture with the UofT Community
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Building bridges, fostering growth, and creating a home away from home for students.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg font-bold uppercase tracking-widest rounded-none w-full sm:w-auto">
                Join Us
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-bold uppercase tracking-widest rounded-none w-full sm:w-auto bg-transparent">
                About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <EventsGrid />

      {/* DEPARTMENTS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-gray-900 mb-4">
              Our Departments
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.title} className="group bg-white border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 text-primary flex items-center justify-center">
                  {dept.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {dept.title}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {dept.description}
                </p>
                <Link href={dept.link} className="mt-auto">
                  <Button variant="ghost" className="text-primary border border-primary hover:bg-primary hover:text-white uppercase tracking-widest text-xs font-bold px-6 rounded-none transition-all">
                    View More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

// Mock Data for Departments
const DEPARTMENTS = [
  {
    title: "Arts & Culture",
    description: "Promoting Chinese culture through artistic expression, performances, and cultural exhibitions on campus.",
    link: "/departments/arts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
    )
  },
  {
    title: "Career Development",
    description: "Connecting students with professional opportunities, mentorship programs, and industry leaders.",
    link: "/departments/career",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    )
  },
  {
    title: "External Relations",
    description: "Building strong partnerships with external organizations, sponsors, and the broader community.",
    link: "/departments/external",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )
  },
  {
    title: "Internal Operations",
    description: "Ensuring smooth organizational efficiency, member management, and logistical support.",
    link: "/departments/internal",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    )
  },
  {
    title: "Marketing & Media",
    description: "Creating engaging content, managing social media presence, and promoting our events.",
    link: "/departments/marketing",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18h.01"/><path d="M16 18h.01"/><path d="M20 18h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M20 14h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M20 10h.01"/><path d="m2 2 20 20"/><path d="M2 22 22 2"/></svg>
    )
  },
  {
    title: "Sports & Recreation",
    description: "Organizing tournaments, recreational activities, and promoting a healthy lifestyle.",
    link: "/departments/sports",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    )
  }
];
