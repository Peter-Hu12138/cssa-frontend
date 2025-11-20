import HeroSection from "@/components/home/HeroSection";
import FeatureGrid from "@/components/home/FeatureGrid";
import EventList from "@/components/home/EventList";

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <FeatureGrid />
      <EventList />
    </div>
  );
}
