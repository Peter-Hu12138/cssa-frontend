"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ChevronDown, Building2, Users, FolderTree } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";
import type { Department } from "@/types/api";
import { API_URL } from "@/lib/config";

// Extended type for tree structure
type DepartmentNode = Department & {
  children: DepartmentNode[];
};

async function fetchDepartments(): Promise<Department[]> {
  const res = await fetch(`${API_URL}/api/v1/department/departments/`);
  if (!res.ok) {
    throw new Error("Failed to fetch departments");
  }
  return res.json();
}

function buildDepartmentTree(departments: Department[]): DepartmentNode[] {
  const deptMap = new Map<number, DepartmentNode>();
  const roots: DepartmentNode[] = [];

  // First pass: Create nodes
  departments.forEach((dept) => {
    deptMap.set(dept.id, { ...dept, children: [] });
  });

  // Second pass: Link children to parents
  departments.forEach((dept) => {
    const node = deptMap.get(dept.id)!;
    if (dept.super_department) {
      const parent = deptMap.get(dept.super_department);
      if (parent) {
        parent.children.push(node);
      } else {
        // Handle case where parent might be missing or filtered out
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export default function DepartmentsPage() {
  const { t } = useTranslation(undefined, "DepartmentsPage", {});
  const { data: departments, isLoading, isError } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64 mx-auto mb-8" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !departments) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Failed to load departments</h2>
      </div>
    );
  }

  const tree = buildDepartmentTree(departments);

  const stats = [
    { label: t("statDepartments"), value: departments.length.toString() },
    { label: t("statDivisions"), value: "3" },
    { label: t("statMembers"), value: "200+" },
  ];

  const insights = [
    { title: t("insightOneTitle"), description: t("insightOneDesc") },
    { title: t("insightTwoTitle"), description: t("insightTwoDesc") },
    { title: t("insightThreeTitle"), description: t("insightThreeDesc") },
  ];

  return (
    <main className="min-h-screen bg-canvas">
      <section className="relative overflow-hidden bg-navy text-white py-24">
        <BackgroundPattern opacity={0.1} />
        <div className="absolute -top-20 left-10 w-72 h-72 bg-primary/30 blur-[160px] rounded-full" aria-hidden />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-gold/20 blur-[200px] rounded-full" aria-hidden />
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-[12px] tracking-[0.6em] text-gold uppercase mb-5">{t("tagline")}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-4 flex-wrap">
            <FolderTree className="w-12 h-12 text-gold" />
            {t("title")}
          </h1>
          <p className="font-sans text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-10" asChild>
              <Link href="/team">{t("primaryCta")}</Link>
            </Button>
            <Button size="lg" variant="secondary" className="px-10" asChild>
              <Link href="/events">{t("secondaryCta")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur py-6 px-5 text-left">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">{stat.label}</p>
                <p className="mt-3 font-serif text-4xl text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-canvas to-white pointer-events-none" aria-hidden />
        <div className="container relative mx-auto px-6 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <Card className="border border-white/60 bg-white/80 shadow-2xl backdrop-blur">
            <CardHeader className="pb-6 border-b border-white/60">
              <CardTitle className="flex items-center gap-3 text-navy">
                <Building2 className="w-5 h-5 text-primary" />
                {t("chartTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              {tree.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {t("noDepartments")}
                </div>
              ) : (
                <div className="space-y-3">
                  {tree.map((node) => (
                    <DepartmentTreeItem key={node.id} node={node} level={0} ctaLabel={t("viewDetails")} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-navy text-white border-none shadow-xl relative overflow-hidden">
              <BackgroundPattern opacity={0.08} />
              <div className="absolute -top-16 right-0 w-56 h-56 bg-gold/20 blur-[120px] rounded-full" aria-hidden />
              <CardHeader>
                <CardTitle className="text-white text-2xl font-serif">{t("insightsTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {insights.map((item) => (
                  <div key={item.title} className="border border-white/15 rounded-2xl p-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">{item.title}</p>
                    <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy">
                  <Users className="w-5 h-5 text-primary" />
                  {t("viewDetails")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-600">
                <p>{t("ctaPanel")}</p>
                <Button className="w-full" asChild>
                  <Link href="/members">{t("meetMembers")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

function DepartmentTreeItem({ node, level, ctaLabel }: { node: DepartmentNode; level: number; ctaLabel: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={cn(
          "flex flex-wrap gap-3 items-center py-4 px-5 rounded-2xl transition-all group",
          "border border-transparent bg-white/70 shadow-sm",
          level === 0
            ? "border-primary/20 shadow-lg"
            : "hover:border-primary/20 hover:shadow-md"
        )}
        style={{ marginLeft: `${level * 24}px` }}
      >
        <button
          onClick={() => hasChildren && setIsOpen(!isOpen)}
          className={cn(
            "p-1 rounded-md mr-2 transition-colors",
            hasChildren ? "hover:bg-red-100 text-gray-500 hover:text-primary cursor-pointer" : "opacity-0 cursor-default"
          )}
          disabled={!hasChildren}
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        <div className="flex-grow flex items-center">
          <span className={cn(
            "text-navy",
            level === 0 ? "text-lg font-semibold" : "text-base"
          )}>
            {node.name}
          </span>
          {node.english_name && (
            <span className="ml-2 text-sm text-gray-500 hidden sm:inline-block">
              ({node.english_name})
            </span>
          )}
        </div>

        <Button variant="outline" size="sm" className="text-navy border-navy/20 hover:border-primary hover:text-primary" asChild>
          <Link href={`/departments/${node.id}`}>
            <Users className="h-4 w-4 mr-2" />
            {ctaLabel}
          </Link>
        </Button>
      </div>

      {isOpen && hasChildren && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {node.children.map((child) => (
            <DepartmentTreeItem key={child.id} node={child} level={level + 1} ctaLabel={ctaLabel} />
          ))}
        </div>
      )}
    </div>
  );
}
