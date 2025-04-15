import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="mx-auto max-w-md text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="mt-6 text-3xl font-bold">Profile Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The profile you're looking for doesn't exist or may have been removed.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
