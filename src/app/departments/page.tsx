"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ChevronDown, Building2, Users, FolderTree } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Department } from "@/types/api";

// Extended type for tree structure
type DepartmentNode = Department & {
  children: DepartmentNode[];
};

async function fetchDepartments(): Promise<Department[]> {
  const res = await fetch("http://localhost:8000/api/v1/department/departments/");
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

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <FolderTree className="mr-3 h-10 w-10 text-primary" />
          Department Structure
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the organizational structure of our student association.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="border-t-4 border-t-primary shadow-lg">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-6">
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-primary" />
              Organization Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            {tree.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No departments found.
              </div>
            ) : (
              <div className="space-y-2">
                {tree.map((node) => (
                  <DepartmentTreeItem key={node.id} node={node} level={0} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DepartmentTreeItem({ node, level }: { node: DepartmentNode; level: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={cn(
          "flex items-center py-3 px-4 rounded-lg transition-colors group",
          "hover:bg-red-50/50 border border-transparent hover:border-red-100",
          level === 0 && "bg-gray-50/50 mb-2 font-semibold"
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
            "text-gray-900",
            level === 0 ? "text-lg" : "text-base"
          )}>
            {node.name}
          </span>
          {node.english_name && (
            <span className="ml-2 text-sm text-gray-500 hidden sm:inline-block">
              ({node.english_name})
            </span>
          )}
        </div>

        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary hover:bg-red-100" asChild>
          <a href={`/departments/${node.id}`}>
            <Users className="h-4 w-4 mr-2" />
            View Details
          </a>
        </Button>
      </div>

      {isOpen && hasChildren && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {node.children.map((child) => (
            <DepartmentTreeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
