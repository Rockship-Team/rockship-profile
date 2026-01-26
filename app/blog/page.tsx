import { Metadata } from "next"
import { Suspense } from "react"
import { BlogPageClient } from "./BlogPageClient"
import { BlogListSkeleton } from "@/components/blog/BlogListSkeleton"
import { getPublishedPosts, getAllTags } from "@/lib/supabase/queries"

export const metadata: Metadata = {
  title: "Blog | Rockship AI",
  description: "Technical articles about AI solutions, infrastructure as code, and cloud development from the Rockship AI team.",
  openGraph: {
    title: "Blog | Rockship AI",
    description: "Technical articles about AI solutions, infrastructure as code, and cloud development.",
    type: "website",
  },
}

// Revalidate every 15 minutes (900 seconds) - reduces database hits
// Content is cached at build time and regenerated in background
export const revalidate = 900

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    getPublishedPosts(),
    getAllTags(),
  ])

  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogPageClient initialPosts={posts} initialTags={tags} />
    </Suspense>
  )
}
