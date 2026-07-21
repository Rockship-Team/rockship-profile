import { NextResponse } from "next/server"

// Liveness probe for the Docker HEALTHCHECK and any upstream load balancer.
// Must never touch the database — it reports that the server process is up,
// not that every dependency is reachable.
export const dynamic = "force-dynamic"

export function GET() {
  return NextResponse.json({
    status: "ok",
    uptime: Math.round(process.uptime()),
  })
}
