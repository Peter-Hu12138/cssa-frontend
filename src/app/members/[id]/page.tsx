"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  Building2, 
  Calendar, 
  Award,
  BookOpen,
  School,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MemberPublic } from "@/types/api";

async function fetchMember(id: string): Promise<MemberPublic> {
  const res = await fetch(`http://localhost:8000/api/v1/member/members/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch member");
  }
  return res.json();
}

export default function MemberProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: member, isLoading, isError } = useQuery({
    queryKey: ["member", id],
    queryFn: () => fetchMember(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-4xl space-y-8">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-64 w-full md:col-span-1" />
          <Skeleton className="h-64 w-full md:col-span-2" />
        </div>
      </div>
    );
  }

  if (isError || !member) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Member not found</h2>
        <Button onClick={() => router.back()} className="mt-4" variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'HD': return <Badge className="bg-red-600">Head</Badge>;
      case 'DH': return <Badge variant="secondary" className="bg-red-100 text-red-800">Deputy Head</Badge>;
      default: return <Badge variant="outline">Member</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-2 transition-all" 
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-primary">
          {member.short_name.charAt(0)}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{member.full_name}</h1>
        <div className="flex items-center justify-center gap-2">
          {getRoleBadge(member.role_within_department)}
          {member.title && (
            <Badge variant="outline" className="border-primary text-primary">
              {member.title}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details */}
        <Card className="border-t-4 border-t-primary shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg text-gray-800 flex items-center">
              <User className="mr-2 h-5 w-5 text-primary" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">Display Name</span>
              <span className="font-medium text-gray-900">{member.short_name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">Preferred Name</span>
              <span className="font-medium text-gray-900">
                {member.preferred_name || <span className="text-gray-400 italic">Hidden</span>}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 text-sm">Student Status</span>
              <span className="font-medium text-gray-900">
                {member.student_status || "Unspecified"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card className="border-t-4 border-t-primary shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg text-gray-800 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm flex items-center">
                <School className="w-3 h-3 mr-2" /> Faculty
              </span>
              <span className="font-medium text-gray-900 text-right max-w-[60%]">
                {member.faculty || <span className="text-gray-400 italic">Hidden</span>}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm flex items-center">
                <Building2 className="w-3 h-3 mr-2" /> College
              </span>
              <span className="font-medium text-gray-900">
                {member.college || <span className="text-gray-400 italic">Hidden</span>}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm flex items-center">
                <BookOpen className="w-3 h-3 mr-2" /> Program
              </span>
              <span className="font-medium text-gray-900">
                {member.program || <span className="text-gray-400 italic">Hidden</span>}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 text-sm flex items-center">
                <Clock className="w-3 h-3 mr-2" /> Year
              </span>
              <span className="font-medium text-gray-900">
                {member.year_of_study || <span className="text-gray-400 italic">Hidden</span>}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Association Details */}
        <Card className="md:col-span-2 border-t-4 border-t-primary shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg text-gray-800 flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Association Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Department</span>
                  <span className="font-medium text-gray-900">{member.department_name}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 text-sm">Role</span>
                  <span className="font-medium text-gray-900">
                    {member.role_within_department === 'HD' ? 'Head' : 
                     member.role_within_department === 'DH' ? 'Deputy Head' : 'Member'}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Title</span>
                  <span className="font-medium text-gray-900">{member.title || "None"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 text-sm">Joined</span>
                  <span className="font-medium text-gray-900">
                    {member.date_of_registration ? format(new Date(member.date_of_registration), "MMM d, yyyy") : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
