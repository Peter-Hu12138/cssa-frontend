import { format } from "date-fns";
import { CalendarDays, MapPin, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Event } from "@/types/api";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden border-gray-100">
      <div className="h-48 bg-gray-50 relative">
        {/* Placeholder Gradient - In real app, use event.image if available */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/10" />
        
        <div className="absolute top-4 right-4">
           <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
             event.status === 'SUPER_DEPT_HEAD_APPROVED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
           }`}>
             {event.status?.replace(/_/g, ' ')}
           </span>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-primary shadow-sm">
          {event.department_in_charge_detail.name}
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 leading-tight">
          <Link href={`/events/${event.id}`} className="hover:text-primary transition-colors">
            {event.name}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-text-muted line-clamp-3">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-500">
            <CalendarDays className="w-4 h-4 mr-2 text-primary shrink-0" />
            <span>
              {event.eventdate ? format(new Date(event.eventdate), "MMM dd, yyyy • h:mm a") : "TBA"}
            </span>
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <User className="w-4 h-4 mr-2 text-primary shrink-0" />
            <span>Leader: {event.leader_detail.short_name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/events/${event.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
