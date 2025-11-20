"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  User, 
  Mail, 
  GraduationCap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Department, MemberPublic as Member, PaginatedResponse } from "@/types/api";

async function fetchDepartments(): Promise<Department[]> {
  const res = await fetch("http://localhost:8000/api/v1/department/departments/");
  if (!res.ok) {
    throw new Error("Failed to fetch departments");
  }
  return res.json();
}

async function fetchDepartmentMembers(deptId: string): Promise<PaginatedResponse<Member>> {
  const res = await fetch(`http://localhost:8000/api/v1/member/members/?department=${deptId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }
  return res.json();
}

export default function DepartmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Fetch all departments to find current and children
  const { data: departments, isLoading: isLoadingDepts } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  // Fetch members for this department
  const { data: membersData, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["department-members", id],
    queryFn: () => fetchDepartmentMembers(id),
    enabled: !!id,
  });

  const members = membersData?.results || [];

  if (isLoadingDepts || isLoadingMembers) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-5xl space-y-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const department = departments?.find(d => d.id.toString() === id);
  const subDepartments = departments?.filter(d => d.super_department?.toString() === id) || [];

  if (!department) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Department not found</h2>
        <Button onClick={() => router.back()} className="mt-4" variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-2 transition-all" 
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Departments
      </Button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-8 text-white">
          <div className="flex items-center mb-2 opacity-80 text-sm font-medium uppercase tracking-wider">
            <Building2 className="w-4 h-4 mr-2" />
            Department
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{department.name}</h1>
          {department.english_name && (
            <p className="text-xl opacity-90 font-light">{department.english_name}</p>
          )}
          {department.super_department_name && (
            <div className="mt-4 inline-flex items-center bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              <span className="opacity-70 mr-2">Part of:</span>
              <span className="font-medium">{department.super_department_name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sub-departments Section */}
        <div className="lg:col-span-2 space-y-8">
          {subDepartments.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FolderTreeIcon className="w-5 h-5 mr-2 text-primary" />
                Sub-Departments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subDepartments.map(sub => (
                  <a 
                    key={sub.id} 
                    href={`/departments/${sub.id}`}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white group"
                  >
                    <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {sub.name}
                    </h4>
                    {sub.english_name && (
                      <p className="text-sm text-gray-500 mt-1">{sub.english_name}</p>
                    )}
                    <div className="mt-3 flex items-center text-xs text-gray-400 font-medium uppercase tracking-wide">
                      View Details <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Members Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Team Members
            </h3>
            
            {members && members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center border border-dashed border-gray-200">
                <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No members listed in this department.</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Department Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                  Total Members
                </span>
                <p className="font-medium text-lg">{members?.length || 0}</p>
              </div>
              
              {subDepartments.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                    Sub-units
                  </span>
                  <p className="font-medium text-lg">{subDepartments.length}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'HD': return <Badge className="bg-red-600 hover:bg-red-700">Head</Badge>;
      case 'DH': return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">Deputy Head</Badge>;
      default: return <Badge variant="outline" className="text-gray-500 border-gray-200">Member</Badge>;
    }
  };

  return (
    <div className="flex items-start p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold mr-4 flex-shrink-0">
        {member.short_name.charAt(0)}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-gray-900 truncate pr-2">{member.short_name}</h4>
          {getRoleBadge(member.role_within_department || "")}
        </div>
        {member.title && (
          <p className="text-xs text-primary font-medium mb-1">{member.title}</p>
        )}
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="truncate">{member.full_name}</p>
        </div>
      </div>
    </div>
  );
}

function FolderTreeIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.5.4 2.9 1.1 4.1l-5.1 8.9h22l-5.1-8.9c.7-1.2 1.1-2.6 1.1-4.1z" />
    </svg>
  );
}
