"use client"

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

function SkeletonCard() {
  return (
    <div className="bg-rockship-900/60 backdrop-blur-md border border-white/8 rounded-xl p-6 animate-pulse">
      {/* Tags skeleton */}
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-rockship-800/50 rounded-full" />
        <div className="h-5 w-20 bg-rockship-800/50 rounded-full" />
      </div>

      {/* Title skeleton */}
      <div className="h-7 bg-rockship-800/50 rounded mb-3 w-3/4" />

      {/* Excerpt skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-rockship-800/30 rounded w-full" />
        <div className="h-4 bg-rockship-800/30 rounded w-5/6" />
      </div>

      {/* Meta skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-4 w-24 bg-rockship-800/30 rounded" />
        <div className="h-4 w-20 bg-rockship-800/30 rounded" />
      </div>
    </div>
  )
}

export function BlogListSkeleton() {
  return (
    <main className="min-h-screen bg-rockship-950">
      <Navbar />

      {/* Hero skeleton */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="h-12 bg-rockship-800/50 rounded mb-4 w-1/3 animate-pulse" />
            <div className="h-6 bg-rockship-800/30 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Search skeleton */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <div className="h-4 w-24 bg-rockship-800/30 rounded mb-3 animate-pulse" />
            <div className="h-12 max-w-xl bg-rockship-800/50 rounded-lg animate-pulse" />
          </div>

          {/* Filter skeleton */}
          <div className="mb-6">
            <div className="h-4 w-28 bg-rockship-800/30 rounded mb-3 animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-20 bg-rockship-800/50 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
