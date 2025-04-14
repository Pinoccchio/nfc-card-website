import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // This will refresh the session if it exists and is expired
  await supabase.auth.getSession()

  // Get the pathname
  const path = req.nextUrl.pathname

  // Only apply auth protection to dashboard routes
  // Allow public access to profile pages
  if (path.startsWith("/dashboard")) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session and trying to access dashboard, redirect to home
    if (!session && path.startsWith("/dashboard")) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/"
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

// Only run middleware on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/:username*"],
}
