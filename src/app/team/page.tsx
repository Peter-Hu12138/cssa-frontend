"use client";

import { useTeam } from "@/hooks/useTeam";
import { DepartmentTeam, TeamMember } from "@/types/api";
import Image from "next/image";
import { Mail } from "lucide-react";
import { API_URL } from "@/lib/config";

export default function TeamPage() {
  const { data: departments, isLoading } = useTeam();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-20 bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated individuals who make CSSA possible.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 space-y-24">
        {departments?.map((dept) => (
          <DepartmentSection key={dept.id} department={dept} />
        ))}
        
        {(!departments || departments.length === 0) && (
          <div className="text-center text-gray-500 py-12">
            No team members found. Please check back later.
          </div>
        )}
      </div>
    </main>
  );
}

function DepartmentSection({ department }: { department: DepartmentTeam }) {
  if (department.members.length === 0) return null;

  return (
    <section>
      <div className="flex items-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mr-6">
          {department.english_name || department.name}
        </h2>
        <div className="h-px bg-gray-200 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {department.members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  // Ensure avatar URL is absolute
  const avatarUrl = member.avatar 
    ? (member.avatar.startsWith("http") ? member.avatar : `${API_URL}${member.avatar}`)
    : null;

  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300 border-4 border-white">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={member.full_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
            <span className="text-4xl font-bold text-gray-200">
              {member.short_name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.short_name}</h3>
      <p className="text-primary font-medium text-sm uppercase tracking-wider mb-3">
        {member.title_display || member.role_display}
      </p>
      
      {member.bio && (
        <p className="text-gray-500 text-sm mb-4 line-clamp-3 px-4 leading-relaxed">
          {member.bio}
        </p>
      )}

      {member.email && (
        <a 
          href={`mailto:${member.email}`}
          className="text-gray-400 hover:text-primary transition-colors mt-auto"
          title={member.email}
        >
          <Mail className="w-5 h-5" />
        </a>
      )}
    </div>
  );
}
