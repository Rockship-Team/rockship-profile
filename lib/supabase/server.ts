import { createServerClient } from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "./types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createClient(): Promise<ReturnType<typeof createServerClient<any>>> {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Values shipped in the example env files. Treated as "not configured" so a
// half-filled .env never turns into DNS errors at build time.
const PLACEHOLDER_PATTERN = /your-project-ref|xxxx|example\.com/

function isUsable(url?: string, key?: string): boolean {
  if (!url || !key) return false
  if (PLACEHOLDER_PATTERN.test(url)) return false
  return true
}

/**
 * Supabase is optional. When it is not configured the blog degrades to empty —
 * every query short-circuits instead of throwing, and the rest of the site
 * builds and runs normally.
 *
 * Check this before calling `createPublicClient()`; the client constructor
 * asserts its inputs are present and would throw on an unconfigured project.
 */
export function isSupabaseConfigured(): boolean {
  return isUsable(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/** As above, for the service-role client used by admin queries and mutations. */
export function isSupabaseAdminConfigured(): boolean {
  return isUsable(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// `next build` fans out across workers, so an unguarded warn would repeat once
// per worker per query. Emit each distinct message a single time per process.
const warned = new Set<string>()

export function warnOnce(message: string): void {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(message)
}

/**
 * Public read-only client, deliberately cookie-free.
 *
 * `createClient()` above calls `cookies()`, which opts the calling route out of
 * static generation — that silently downgraded /blog from ISR to per-request
 * rendering and logged DYNAMIC_SERVER_USAGE on every build. Public queries only
 * read `is_published` rows, which RLS grants to anon, so there is no session to
 * carry and no reason to touch cookies.
 *
 * Use this for anything rendered for anonymous visitors. Use `createClient()`
 * only where the caller genuinely depends on the user's session.
 */
export function createPublicClient(): ReturnType<typeof createSupabaseClient<any>> { // eslint-disable-line @typescript-eslint/no-explicit-any
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

// Admin client with service role for CRUD operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAdminClient(): ReturnType<typeof createSupabaseClient<any>> {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
