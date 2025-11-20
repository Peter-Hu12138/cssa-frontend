"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { 
  ArrowLeft, 
  Briefcase, 
  User, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  Link as LinkIcon,
  FileText,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/types/api";
import Link from "next/link";

async function fetchJob(id: string): Promise<Job> {
  const res = await fetch(`http://localhost:8000/api/v1/job/jobs/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }
  return res.json();
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-5xl space-y-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
        <Button onClick={() => router.back()} className="mt-4" variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return "bg-green-100 text-green-800";
      case 'COMPLETED': return "bg-blue-100 text-blue-800";
      case 'REJECTED': return "bg-red-100 text-red-800";
      case 'PENDING_COMPLETION_APPROVAL': return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle2 className="w-4 h-4 mr-2" />;
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 mr-2" />;
      case 'REJECTED': return <XCircle className="w-4 h-4 mr-2" />;
      case 'PENDING_COMPLETION_APPROVAL': return <Clock className="w-4 h-4 mr-2" />;
      default: return <AlertCircle className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-2 transition-all" 
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Jobs
      </Button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white">
          <div className="flex items-center mb-4">
            <Badge className={`${getStatusColor(job.status)} border-0 mr-3`}>
              {getStatusIcon(job.status)}
              {job.status_display}
            </Badge>
            <span className="text-sm opacity-70 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Created {format(new Date(job.created_at), "MMM d, yyyy")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.name}</h1>
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Created by {job.created_by_detail.full_name}
            </div>
            {job.parent_event_detail && (
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Event: {job.parent_event_detail.name}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Description
            </h3>
            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap bg-white p-6 rounded-lg border border-gray-100">
              {job.description}
            </div>
          </section>

          {job.records && job.records.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Work Records
              </h3>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3">Member</th>
                        <th className="px-4 py-3">Duration</th>
                        <th className="px-4 py-3">Primary Skill</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {job.records.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {record.participant_detail.full_name}
                          </td>
                          <td className="px-4 py-3">{record.duration} hrs</td>
                          <td className="px-4 py-3">{record.primary_skill}</td>
                          <td className="px-4 py-3 text-gray-500">
                            {format(new Date(record.created_at), "MMM d, yyyy")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">
                  Assigned Leaders
                </span>
                {job.leader_details && job.leader_details.length > 0 ? (
                  <div className="space-y-2">
                    {job.leader_details.map((leader) => (
                      <div key={leader.id} className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold mr-2 text-gray-600">
                          {leader.short_name.charAt(0)}
                        </div>
                        <span>{leader.full_name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No leaders assigned</p>
                )}
              </div>

              {job.parent_job && (
                <div className="pt-4 border-t border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">
                    Parent Job
                  </span>
                  <Link 
                    href={`/jobs/${job.parent_job}`}
                    className="flex items-center text-primary hover:underline"
                  >
                    <LinkIcon className="w-3 h-3 mr-1" />
                    View Parent Job
                  </Link>
                </div>
              )}

              {job.sub_jobs && job.sub_jobs.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">
                    Sub Jobs
                  </span>
                  <div className="space-y-2">
                    {job.sub_jobs.map((sub) => (
                      <Link 
                        key={sub.id}
                        href={`/jobs/${sub.id}`}
                        className="block p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary"
                      >
                        <div className="font-medium truncate">{sub.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{sub.status}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
