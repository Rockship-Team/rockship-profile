"use server"

import { cookies } from "next/headers"

const ADMIN_COOKIE_NAME = "admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AuthResult {
  success: boolean
  error?: string
}

/**
 * Login action - validates credentials and sets session cookie
 */
export async function login(
  username: string,
  password: string
): Promise<AuthResult> {
  const expectedUsername = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedUsername || !expectedPassword) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD not configured")
    return { success: false, error: "Server configuration error" }
  }

  if (username === expectedUsername && password === expectedPassword) {
    // Create a simple session token (hash of credentials + timestamp)
    const sessionToken = Buffer.from(
      `${username}:${Date.now()}:${process.env.ADMIN_PASSWORD}`
    ).toString("base64")

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Invalid credentials" }
}

/**
 * Logout action - removes session cookie
 */
export async function logout(): Promise<AuthResult> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  return { success: true }
}

/**
 * Check if user is authenticated (for server components)
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)

  if (!sessionCookie?.value) {
    return false
  }

  try {
    // Verify the session token contains valid username
    const decoded = Buffer.from(sessionCookie.value, "base64").toString()
    const [username] = decoded.split(":")
    return username === process.env.ADMIN_USERNAME
  } catch {
    return false
  }
}
