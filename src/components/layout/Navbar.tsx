import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-primary">
          ASSOCIATION PORTAL
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/departments" className="hover:text-primary transition-colors">Departments</Link>
          <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link href="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
          <Link href="/acknowledgements" className="hover:text-primary transition-colors">About</Link>
          {session && (
             <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button variant="ghost" type="submit">
                Sign Out
              </Button>
            </form>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-primary hover:bg-red-50">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary text-white hover:bg-primary-dark">
                  Join Us
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
