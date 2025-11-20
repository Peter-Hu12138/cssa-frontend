import { format } from "date-fns";
import { 
  Calendar, 
  User, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types/api";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'COMPLETED': return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'REJECTED': return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'PENDING_COMPLETION_APPROVAL': return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case 'COMPLETED': return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case 'REJECTED': return <XCircle className="w-3 h-3 mr-1" />;
      case 'PENDING_COMPLETION_APPROVAL': return <Clock className="w-3 h-3 mr-1" />;
      default: return <AlertCircle className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary group">
      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${getStatusColor(job.status)} border-0`}>
            {getStatusIcon(job.status)}
            {job.status_display}
          </Badge>
          <span className="text-xs text-gray-400 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(job.created_at), "MMM d, yyyy")}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
          {job.name}
        </h3>
      </CardHeader>
      
      <CardContent className="p-5 pt-2 pb-4">
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {job.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">Created by {job.created_by_detail.full_name}</span>
          </div>
          
          {job.parent_event_detail && (
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">Event: {job.parent_event_detail.name}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button className="w-full bg-gray-50 text-gray-900 hover:bg-primary hover:text-white border border-gray-200 hover:border-primary transition-all" asChild>
          <Link href={`/jobs/${job.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
