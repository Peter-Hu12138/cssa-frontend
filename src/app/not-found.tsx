import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertTriangle className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for. It might have been moved or doesn&rsquo;t exist.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <Home className="mr-2 h-5 w-5" />
          Return Home
        </Link>
      </Button>
    </div>
  )
}
