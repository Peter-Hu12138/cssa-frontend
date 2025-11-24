"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Building2,
  Users,
  Mail,
  GraduationCap,
  Linkedin,
  Github,
  MessageCircle,
  Sparkles,
  FolderTree,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { API_URL } from "@/lib/config";
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
      <div className="container mx-auto py-24 px-6 text-center">
        <h2 className="text-2xl font-serif text-navy mb-4">Department not found</h2>
        <Button onClick={() => router.back()} variant="secondary">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-canvas pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6 pl-0 text-navy hover:text-primary hover:pl-2 transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Departments
        </Button>

        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1A1A40] via-[#2D1E4F] to-[#7A1E2F] text-white p-8 md:p-12 shadow-2xl">
          <BackgroundPattern opacity={0.12} />
          <div className="absolute -top-10 right-0 w-72 h-72 bg-gold/20 blur-[160px] rounded-full" aria-hidden />
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.5em] text-white/70 mb-4">
              <Building2 className="w-4 h-4" />
              Department Profile
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3">
              {department.name}
            </h1>
            {department.english_name && (
              <p className="text-xl text-white/80 font-light">{department.english_name}</p>
            )}
            {department.super_department_name && (
              <div className="mt-6 inline-flex items-center bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur">
                <span className="text-white/70 mr-2">Part of</span>
                <span className="font-semibold">{department.super_department_name}</span>
              </div>
            )}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">Members</p>
                <p className="font-serif text-3xl mt-3">{members.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">Sub-units</p>
                <p className="font-serif text-3xl mt-3">{subDepartments.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">ID</p>
                <p className="font-serif text-3xl mt-3">#{department.id}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-12">
          <div className="space-y-10">
            {department.description && (
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-navy flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    About this team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {department.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {subDepartments.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-navy flex items-center gap-3">
                    <FolderTree className="w-6 h-6 text-primary" />
                    Sub-departments
                  </h3>
                  <span className="text-xs uppercase tracking-[0.4em] text-gray-500">{subDepartments.length} units</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subDepartments.map((sub) => (
                    <Card key={sub.id} className="border border-gray-200/70 shadow-lg hover:-translate-y-1 hover:border-primary/40 transition-all">
                      <CardContent className="p-5">
                        <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">Division</p>
                        <h4 className="font-serif text-xl text-navy mb-1">{sub.name}</h4>
                        {sub.english_name && (
                          <p className="text-sm text-gray-500 mb-4">{sub.english_name}</p>
                        )}
                        <Button variant="ghost" className="text-primary px-0" asChild>
                          <Link href={`/departments/${sub.id}`}>
                            View details <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Team</p>
                  <h3 className="font-serif text-3xl text-navy">Members</h3>
                </div>
              </div>

              {members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 rounded-3xl p-10 text-center bg-white/60">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No members listed in this department yet.</p>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90">
              <CardHeader>
                <CardTitle className="text-navy">Department Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-gray-600">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">Total Members</p>
                  <p className="text-3xl font-serif text-navy">{members.length}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">Sub-units</p>
                  <p className="text-3xl font-serif text-navy">{subDepartments.length}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">Parent Division</p>
                  <p className="text-base text-gray-700">{department.super_department_name || "Independent"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy text-white border-none shadow-xl overflow-hidden relative">
              <BackgroundPattern opacity={0.06} />
              <CardHeader>
                <CardTitle className="text-white font-serif text-2xl">Need to collaborate?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/80">
                <p>Reach out to department leads to co-host events or request project support.</p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/events">View Initiatives</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function MemberCard({ member }: { member: Member }) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'HD':
        return <Badge className="bg-primary text-white">Head</Badge>;
      case 'DH':
        return <Badge variant="secondary" className="bg-gold/20 text-gold">Deputy Head</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-500 border-gray-200">Member</Badge>;
    }
  };

  const avatarUrl = member.avatar 
    ? (member.avatar.startsWith("http") ? member.avatar : `${API_URL}${member.avatar}`)
    : null;

  return (
    <div className="flex items-start gap-4 p-5 rounded-[24px] border border-gray-200/80 bg-white/90 backdrop-blur hover:-translate-y-0.5 transition-all">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 text-navy flex items-center justify-center font-serif text-xl flex-shrink-0 overflow-hidden border border-white">
        {avatarUrl ? (
          <img src={avatarUrl} alt={member.short_name} className="w-full h-full object-cover" />
        ) : (
          member.short_name.charAt(0)
        )}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="font-serif text-xl text-navy truncate">{member.short_name}</h4>
          {getRoleBadge(member.role_within_department || "")}
        </div>
        {member.title && (
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-2">{member.title}</p>
        )}
        <p className="text-sm text-gray-500 font-medium mb-2">{member.full_name}</p>

        {(member.program || member.year_of_study || member.faculty) && (
          <div className="flex items-center text-gray-500 text-xs mb-1">
            <GraduationCap className="w-3 h-3 mr-1.5" />
            <span className="truncate">
              {[
                member.year_of_study ? `Year ${member.year_of_study}` : null,
                member.program,
                member.faculty,
              ]
                .filter(Boolean)
                .join(" • ")}
            </span>
          </div>
        )}

        {member.email && (
          <div className="flex items-center text-gray-500 text-xs mb-1">
            <Mail className="w-3 h-3 mr-1.5" />
            <a href={`mailto:${member.email}`} className="truncate hover:text-primary transition-colors">
              {member.email}
            </a>
          </div>
        )}

        <div className="flex items-center gap-3 mt-3 text-gray-400">
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0a66c2] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.github_url && (
            <a
              href={member.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
          )}
          {member.wechat_id && (
            <span className="hover:text-[#07c160] transition-colors cursor-help" title={`WeChat: ${member.wechat_id}`}>
              <MessageCircle className="w-4 h-4" />
            </span>
          )}
        </div>

        {member.bio && (
          <p className="text-xs text-gray-500 italic mt-3 line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}
