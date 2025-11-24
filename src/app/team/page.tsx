"use client";

import Link from "next/link";
import { useTeam } from "@/hooks/useTeam";
import { DepartmentTeam, TeamMember } from "@/types/api";
import Image from "next/image";
import { Mail, Linkedin, Github, MessageCircle, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { API_URL } from "@/lib/config";
import { useTranslation } from "@/app/i18n/client";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamPage() {
  const { t, i18n } = useTranslation(undefined, "Team", {});
  const locale = i18n.resolvedLanguage || "en";
  const { data: departments, isLoading } = useTeam();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-96" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: t("coPresidents"), value: "2" },
    { label: t("vpInternal"), value: "4" },
    { label: t("vpExternal"), value: "4" },
    { label: t("vpExecutive"), value: "5" },
  ];

  const highlights = [
    { title: t("highlightOneTitle"), description: t("highlightOneDesc") },
    { title: t("highlightTwoTitle"), description: t("highlightTwoDesc") },
    { title: t("highlightThreeTitle"), description: t("highlightThreeDesc") },
  ];

  return (
    <main className="min-h-screen bg-canvas">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#111132] via-[#371139] to-[#5C1227] text-white py-28">
        <BackgroundPattern opacity={0.08} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" aria-hidden />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.6em] text-gold/80 bg-white/10 border border-white/20 rounded-full px-5 py-2">
            <Sparkles className="h-4 w-4" />
            {t("tagline")}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mt-8">{t("title")}</h1>
          <p className="text-lg md:text-2xl text-white/80 mt-6">{t("subtitle")}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-10" asChild>
              <Link href="/departments">{t("primaryCta")}</Link>
            </Button>
            <Button size="lg" variant="secondary" className="px-10" asChild>
              <Link href="/join">{t("secondaryCta")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur p-5">
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">{stat.label}</p>
                <p className="font-serif text-3xl mt-3">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="font-serif text-3xl text-navy">{t("meetTheTeam")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("highlightOneDesc")}
              </p>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {highlights.map((item) => (
              <Card key={item.title} className="border border-gray-200/60 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-2">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-24 space-y-24">
        {departments?.map((dept) => (
          <DepartmentSection key={dept.id} department={dept} lng={locale} />
        ))}

        {(!departments || departments.length === 0) && (
          <div className="text-center text-gray-500 py-12">
            {t("noMembers")}
          </div>
        )}
      </div>
    </main>
  );
}

function DepartmentSection({ department, lng }: { department: DepartmentTeam; lng: string }) {
  const locale = lng;
  const description = locale === "en" && department.description_en ? department.description_en : department.description;

  if (department.members.length === 0) return null;

  return (
    <section className="p-8 rounded-[32px] bg-white/90 border border-gray-100 shadow-xl backdrop-blur">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-primary mb-3">{department.name}</p>
          <h2 className="text-3xl font-serif text-navy">{department.english_name || department.name}</h2>
          {description && <p className="text-gray-600 mt-4 max-w-2xl">{description}</p>}
        </div>
        <Button variant="outline" className="self-start lg:self-auto" asChild>
          <Link href={`/departments/${department.id}`} className="inline-flex items-center gap-2">
            <Users className="h-4 w-4" />
            Learn More
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {department.members.map((member) => (
          <MemberCard key={member.id} member={member} lng={lng} />
        ))}
      </div>
    </section>
  );
}

function MemberCard({ member, lng }: { member: TeamMember; lng: string }) {
  const locale = lng;
  const bio = locale === "en" && member.bio_en ? member.bio_en : member.bio;

  // Ensure avatar URL is absolute
  const avatarUrl = member.avatar 
    ? (member.avatar.startsWith("http") 
        ? member.avatar 
        : `${API_URL}${member.avatar.startsWith("/") ? "" : "/"}${member.avatar}`)
    : null;

  return (
    <div className="group flex flex-col items-center text-center rounded-[28px] border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-xl transition-all">
      <div className="relative w-40 h-40 mb-5 overflow-hidden rounded-[24px] bg-gradient-to-br from-primary/20 to-gold/20">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={member.full_name}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/60 font-serif text-4xl">
            {member.short_name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold text-navy">{member.short_name}</h3>
      <p className="text-primary font-medium text-xs uppercase tracking-[0.4em] mt-1">
        {member.title_display || member.role_display}
      </p>

      {bio && (
        <p className="text-sm text-gray-500 mt-4 line-clamp-3 leading-relaxed">
          {bio}
        </p>
      )}

      <div className="flex items-center justify-center gap-3 mt-5 text-gray-400">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="hover:text-primary"
            title={member.email}
          >
            <Mail className="w-5 h-5" />
          </a>
        )}
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0077b5]"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {member.github_url && (
          <a
            href={member.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        )}
        {member.wechat_id && (
          <span className="hover:text-[#07c160] cursor-help" title={`WeChat: ${member.wechat_id}`}>
            <MessageCircle className="w-5 h-5" />
          </span>
        )}
      </div>
    </div>
  );
}
