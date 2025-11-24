"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
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
import { useTranslation } from "@/app/i18n/client";
import { API_URL } from "@/lib/config";

async function fetchMember(id: string): Promise<MemberPublic> {
  const res = await fetch(`${API_URL}/api/v1/member/members/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch member");
  }
  return res.json();
}

export default function MemberProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { t } = useTranslation(undefined, "MemberProfile", {});

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
        <h2 className="text-2xl font-bold text-gray-900">{t("notFound")}</h2>
        <Button onClick={() => router.back()} className="mt-4" variant="outline">
          {t("goBack")}
        </Button>
      </div>
    );
  }

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "HD": return <Badge className="bg-red-600">{t("roles.HD")}</Badge>;
      case "DH": return <Badge variant="secondary" className="bg-red-100 text-red-800">{t("roles.DH")}</Badge>;
      default: return <Badge variant="outline">{t("roles.Member")}</Badge>;
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
        {t("back")}
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
              {t(`titles.${member.title}`)}
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
              {t("personalDetails")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">{t("displayName")}</span>
              <span className="font-medium text-gray-900">{member.short_name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">{t("preferredName")}</span>
              <span className="font-medium text-gray-900">
                {member.preferred_name || <span className="text-gray-400 italic">{t("hidden")}</span>}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 text-sm">{t("labels.status")}</span>
              <span className="font-medium text-gray-900">
                {member.student_status || t("unspecified")}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card className="border-t-4 border-t-primary shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg text-gray-800 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
              {t("academicInfo")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm flex items-center">
                <School className="w-3 h-3 mr-2" /> {t("labels.faculty")}
              </span>
              <span className="font-medium text-gray-900 text-right max-w-[60%]">
                {member.faculty || <span className="text-gray-400 italic">{t("hidden")}</span>}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm flex items-center">
                <Building2 className="w-3 h-3 mr-2" /> {t("labels.college")}
              </span>
              <span className="font-medium text-gray-900">
                {member.college || <span className="text-gray-400 italic">{t("hidden")}</span>}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm flex items-center">
                <BookOpen className="w-3 h-3 mr-2" /> {t("labels.program")}
              </span>
              <span className="font-medium text-gray-900">
                {member.program || <span className="text-gray-400 italic">{t("hidden")}</span>}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 text-sm flex items-center">
                <Clock className="w-3 h-3 mr-2" /> {t("labels.year")}
              </span>
              <span className="font-medium text-gray-900">
                {member.year_of_study || <span className="text-gray-400 italic">{t("hidden")}</span>}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Association Details */}
        <Card className="md:col-span-2 border-t-4 border-t-primary shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg text-gray-800 flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              {t("associationDetails")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 text-sm">{t("labels.department")}</span>
                  <span className="font-medium text-gray-900">{member.department_name}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 text-sm">{t("labels.role")}</span>
                  <span className="font-medium text-gray-900">
                    {member.role_within_department === "HD" ? t("roles.HD") : 
                     member.role_within_department === "DH" ? t("roles.DH") : t("roles.Member")}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 text-sm">{t("titles.P")}</span>
                  <span className="font-medium text-gray-900">{member.title ? t(`titles.${member.title}`) : t("none")}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 text-sm">{t("labels.joined")}</span>
                  <span className="font-medium text-gray-900">
                    {member.date_of_registration ? format(new Date(member.date_of_registration), "MMM d, yyyy") : t("unknown")}
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
