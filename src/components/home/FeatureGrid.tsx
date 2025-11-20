import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Briefcase, 
  Shield 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Academic Support",
    description: "Providing academic guidance and resources to help you succeed at UofT.",
    icon: GraduationCap,
  },
  {
    title: "Social Connection",
    description: "Building a vibrant community platform for interaction and friendship.",
    icon: Users,
  },
  {
    title: "Cultural Events",
    description: "Organizing rich cultural activities to celebrate our heritage and diversity.",
    icon: Calendar,
  },
  {
    title: "Career Development",
    description: "Offering career planning, workshops, and networking opportunities.",
    icon: Briefcase,
  },
  {
    title: "Student Rights",
    description: "Advocating for student interests and serving the Chinese community.",
    icon: Shield,
  },
];

export default function FeatureGrid() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-text">Our Mission</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-4 text-primary">
                <feature.icon size={24} />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
