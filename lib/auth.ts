import { headers } from "next/headers"

/**
 * Validate Basic Auth credentials from environment variables
 * Returns true if credentials are valid, false otherwise
 */
export async function validateBasicAuth(): Promise<boolean> {
  const headersList = await headers()
  const authHeader = headersList.get("authorization")

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false
  }

  const expectedUsername = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedUsername || !expectedPassword) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD not set in environment")
    return false
  }

  try {
    // Decode Base64 credentials
    const base64Credentials = authHeader.slice(6) // Remove "Basic "
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8")
    const [username, password] = credentials.split(":")

    return username === expectedUsername && password === expectedPassword
  } catch {
    return false
  }
}

/**
 * Check if the current request is authenticated for admin access
 * Used in server components and API routes
 */
export async function isAuthenticated(): Promise<boolean> {
  return validateBasicAuth()
}

/**
 * Create a 401 Unauthorized response with Basic Auth header
 */
export function createUnauthorizedResponse(realm: string = "Admin Area"): Response {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${realm}"`,
    },
  })
}
