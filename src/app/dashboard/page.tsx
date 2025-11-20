import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function getProfile(token: string) {
  const res = await fetch("http://localhost:8000/api/v1/member/members/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const profile = await getProfile(session.accessToken as string);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Welcome, {profile?.given_name || session.user?.name || "Member"}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
            <dl className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="font-medium text-gray-900">Email</dt>
                <dd>{profile?.email}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="font-medium text-gray-900">Department</dt>
                <dd>{profile?.department?.name || "N/A"}</dd>
              </div>
               <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="font-medium text-gray-900">Role</dt>
                <dd>{profile?.role_within_department || "Member"}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="font-medium text-gray-900">Student Number</dt>
                <dd>{profile?.student_number || "N/A"}</dd>
              </div>
            </dl>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-2">Quick Actions</h4>
                <div className="space-y-2">
                    <p className="text-sm text-blue-700">Coming soon: Submit Event Proposal</p>
                    <p className="text-sm text-blue-700">Coming soon: Apply for Jobs</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
