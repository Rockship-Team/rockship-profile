import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE_NAME = "admin_session"

// Admin routes that require authentication
const protectedRoutes = ["/admin"]
const publicRoutes = ["/admin/login"]

export const config = {
  matcher: ["/admin/:path*"],
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow public routes (like login page)
  if (publicRoutes.some((route) => path === route)) {
    return NextResponse.next()
  }

  // Check if this is a protected admin route
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)

  if (!sessionCookie?.value) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // Validate session
  if (!isValidSession(sessionCookie.value)) {
    // Invalid session, redirect to login
    const response = NextResponse.redirect(new URL("/admin/login", request.url))
    response.cookies.delete(ADMIN_COOKIE_NAME)
    return response
  }

  return NextResponse.next()
}

/**
 * Validate the session token
 */
function isValidSession(sessionToken: string): boolean {
  try {
    const decoded = Buffer.from(sessionToken, "base64").toString()
    const [username] = decoded.split(":")
    return username === process.env.ADMIN_USERNAME
  } catch {
    return false
  }
}
