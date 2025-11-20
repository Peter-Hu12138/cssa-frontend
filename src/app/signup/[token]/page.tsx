"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

// Define types for our form data
interface FormData {
  given_name: string;
  surname: string;
  preferred_name: string;
  student_number: string;
  faculty: string;
  college: string;
  program: string;
  year_of_study: string;
  personal_goal: string;
  student_status: string;
  password: string;
  confirm_password: string;
}

const INITIAL_DATA: FormData = {
  given_name: "",
  surname: "",
  preferred_name: "",
  student_number: "",
  faculty: "",
  college: "",
  program: "",
  year_of_study: "",
  personal_goal: "",
  student_status: "",
  password: "",
  confirm_password: "",
};

export default function CompleteRegistrationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [tokenData, setTokenData] = useState<{ email: string; department: string } | null>(null);
  
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function validateToken() {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/member/members/validate-token/${token}/`);
        if (res.ok) {
          const data = await res.json();
          setValidToken(true);
          setTokenData(data);
        } else {
          setValidToken(false);
        }
      } catch (e) {
        setValidToken(false);
      } finally {
        setLoading(false);
      }
    }
    validateToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/member/members/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        // Handle DRF error format
        const firstError = Object.values(data).flat()[0] as string;
        setError(firstError || "Registration failed. Please check your inputs.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  if (!validToken) {
    return (
      <div className="flex justify-center py-20">
        <Card className="w-full max-w-md border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center text-red-800">
            <AlertCircle className="mx-auto h-12 w-12 mb-4 text-red-600" />
            <h2 className="text-lg font-bold mb-2">Invalid or Expired Link</h2>
            <p>This registration link is invalid. Please request a new invitation.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Complete Registration</CardTitle>
          <CardDescription>
            Creating account for <strong>{tokenData?.email}</strong>
            {tokenData?.department && <span> in <strong>{tokenData.department}</strong></span>}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Given Name</label>
                <Input name="given_name" value={formData.given_name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Surname</label>
                <Input name="surname" value={formData.surname} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Name</label>
              <Input name="preferred_name" value={formData.preferred_name} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Student Number</label>
                <Input name="student_number" value={formData.student_number} onChange={handleChange} required maxLength={11} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year of Study</label>
                <Input name="year_of_study" type="number" min="1" max="10" value={formData.year_of_study} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Faculty</label>
                <select 
                  name="faculty" 
                  value={formData.faculty} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select Faculty</option>
                  <option value="ENG">Applied Science and Engineering</option>
                  <option value="FAS">Arts and Science</option>
                  <option value="MGMT">Rotman Commerce</option>
                  <option value="UTM">UTM</option>
                  <option value="UTSC">UTSC</option>
                  {/* Add other options as needed */}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">College</label>
                <select 
                  name="college" 
                  value={formData.college} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select College</option>
                  <option value="UC">University College</option>
                  <option value="Trinity">Trinity College</option>
                  <option value="Victoria">Victoria College</option>
                  <option value="Innis">Innis College</option>
                  <option value="New">New College</option>
                  <option value="Woodsworth">Woodsworth College</option>
                  <option value="SMC">St. Michael's College</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Program</label>
              <Input name="program" value={formData.program} onChange={handleChange} required placeholder="e.g. Computer Science" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Student Status</label>
              <select 
                  name="student_status" 
                  value={formData.student_status} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="UG">Undergraduate</option>
                  <option value="GD">Graduate</option>
                  <option value="DR">Doctor</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Personal Goal</label>
              <textarea 
                name="personal_goal" 
                value={formData.personal_goal} 
                onChange={handleChange} 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input name="password" type="password" value={formData.password} onChange={handleChange} required minLength={8} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input name="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange} required minLength={8} />
              </div>
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Creating Account..." : "Create Account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
