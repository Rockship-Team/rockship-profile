"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { cn } from "@/lib/utils"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function BlogError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Blog page error:", error)
  }, [error])

  return (
    <main className="min-h-screen bg-rockship-950">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h1>

            <p className="text-gray-400 max-w-md mb-6">
              We encountered an error while loading the blog posts. This might be
              a temporary issue with our database connection.
            </p>

            <button
              onClick={reset}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                "bg-rockship-accent hover:bg-rockship-accent/90",
                "text-white font-medium",
                "transition-colors duration-200"
              )}
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>

            {error.digest && (
              <p className="mt-4 text-xs text-gray-500">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
