import { NextRequest, NextResponse } from "next/server"

// Admin routes that require basic auth
const adminRoutes = ["/admin"]

export const config = {
  matcher: ["/admin/:path*"],
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if this is an admin route
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  // Get authorization header
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    })
  }

  // Validate credentials
  const expectedUsername = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedUsername || !expectedPassword) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD not configured")
    return new Response("Server configuration error", { status: 500 })
  }

  try {
    const base64Credentials = authHeader.slice(6)
    const credentials = atob(base64Credentials)
    const [username, password] = credentials.split(":")

    if (username === expectedUsername && password === expectedPassword) {
      return NextResponse.next()
    }
  } catch {
    // Invalid base64 or format
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  })
}
