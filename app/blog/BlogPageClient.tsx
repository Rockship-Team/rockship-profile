"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { BlogHero } from "@/components/blog/BlogHero"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { TopicFilter } from "@/components/blog/TopicFilter"
import { BlogSearch } from "@/components/blog/BlogSearch"
import { EmptyBlogState } from "@/components/blog/EmptyBlogState"
import { FadeIn } from "@/components/FadeIn"
import { useDebounce } from "@/hooks/useDebounce"
import { useFeatureFlag } from "@/hooks/useFeatureFlag"
import { searchAndFilterPosts } from "@/actions/blog"
import type { BlogPost, TopicTag } from "@/types/blog"

interface BlogPageClientProps {
  initialPosts: BlogPost[]
  initialTags: TopicTag[]
}

export function BlogPageClient({ initialPosts, initialTags }: BlogPageClientProps) {
  const router = useRouter()
  const { isEnabled, isInitialized } = useFeatureFlag()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [isPending, startTransition] = useTransition()

  const debouncedSearch = useDebounce(searchQuery, 300)

  // Redirect to home if blog feature flag is not enabled
  useEffect(() => {
    if (isInitialized && !isEnabled("blog")) {
      router.replace("/")
    }
  }, [isInitialized, isEnabled, router])

  // Fetch filtered posts when search or filter changes
  useEffect(() => {
    // Skip if no filters applied and we already have initial posts
    if (!debouncedSearch && !selectedTopic) {
      setPosts(initialPosts)
      return
    }

    startTransition(async () => {
      const filteredPosts = await searchAndFilterPosts(debouncedSearch, selectedTopic)
      setPosts(filteredPosts)
    })
  }, [debouncedSearch, selectedTopic, initialPosts])

  const handleTopicSelect = (topic: string | null) => {
    setSelectedTopic(topic)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  // Don't render content until feature flag is checked
  if (!isInitialized || !isEnabled("blog")) {
    return (
      <main className="min-h-screen bg-rockship-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-rockship-950">
      <Navbar />

      <BlogHero />

      {/* Search and Filters Section */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          {/* Search */}
          <FadeIn direction="up" delay={150}>
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-400 mb-3">Search Posts</h2>
              <BlogSearch
                value={searchQuery}
                onChange={handleSearchChange}
                className="max-w-xl"
              />
            </div>
          </FadeIn>

          {/* Topic Filter */}
          <FadeIn direction="up" delay={200}>
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-400 mb-3">Filter by Topic</h2>
              <TopicFilter
                tags={initialTags}
                selectedTopic={selectedTopic}
                onSelectTopic={handleTopicSelect}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          {isPending ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-rockship-900/60 backdrop-blur-md border border-white/8 rounded-xl p-6 animate-pulse"
                >
                  <div className="flex gap-2 mb-4">
                    <div className="h-5 w-16 bg-rockship-800/50 rounded-full" />
                    <div className="h-5 w-20 bg-rockship-800/50 rounded-full" />
                  </div>
                  <div className="h-7 bg-rockship-800/50 rounded mb-3 w-3/4" />
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-rockship-800/30 rounded w-full" />
                    <div className="h-4 bg-rockship-800/30 rounded w-5/6" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-24 bg-rockship-800/30 rounded" />
                    <div className="h-4 w-20 bg-rockship-800/30 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <EmptyBlogState
              hasFilters={!!searchQuery || !!selectedTopic}
              onClearFilters={() => {
                setSearchQuery("")
                setSelectedTopic(null)
              }}
            />
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
