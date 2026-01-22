"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import { FadeIn } from "@/components/FadeIn"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { BlogPost, BlogSection } from "@/types/blog"
import { formatDate } from "@/lib/utils"
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer"

interface BlogDetailClientProps {
  post: BlogPost
}

// Check if content is HTML
function isHtmlContent(content: string): boolean {
  const trimmed = content.trim()
  return trimmed.startsWith("<") || trimmed.includes("<div") || trimmed.includes("<p>") || trimmed.includes("<h")
}

// Extract sections from HTML content
function extractSectionsFromHtml(content: string): BlogSection[] {
  const sections: BlogSection[] = []
  const seenIds = new Set<string>()

  // Match all h1, h2, h3 headings - with or without id
  const headingRegex = /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1])
    const attrs = match[2]
    // Remove any nested HTML tags from title
    const title = match[3].replace(/<[^>]+>/g, '').trim()

    if (!title) continue

    // Try to get id from attributes
    const idMatch = attrs.match(/id="([^"]+)"/)
    const id = idMatch
      ? idMatch[1]
      : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    // Skip duplicates
    if (seenIds.has(id)) continue
    seenIds.add(id)

    if (level === 1 || level === 2 || level === 3) {
      sections.push({ id, title, level: level as 1 | 2 | 3 })
    }
  }

  return sections
}

// Extract sections from markdown content
function extractSectionsFromMarkdown(content: string): BlogSection[] {
  const sections: BlogSection[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    // Match markdown headings (## and ###)
    const h3Match = line.match(/^### (.+)$/)
    const h2Match = line.match(/^## (.+)$/)
    const h1Match = line.match(/^# ([^#].*)$/)

    // Match bold text as section headers (common pattern: **Title**)
    const boldMatch = line.match(/^\*\*([^*]+)\*\*\s*$/)

    if (h3Match) {
      const title = h3Match[1].trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      sections.push({ id, title, level: 3 as const })
    } else if (h2Match) {
      const title = h2Match[1].trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      sections.push({ id, title, level: 2 as const })
    } else if (h1Match) {
      const title = h1Match[1].trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      // Skip h1 as it's usually the main title
      if (sections.length > 0) {
        sections.push({ id, title, level: 1 as const })
      }
    } else if (boldMatch) {
      // Treat standalone bold lines as h2 sections
      const title = boldMatch[1].trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      sections.push({ id, title, level: 2 as const })
    }
  }

  return sections
}

// Extract sections from content (auto-detect HTML or markdown)
function extractSectionsFromContent(content: string): BlogSection[] {
  if (isHtmlContent(content)) {
    return extractSectionsFromHtml(content)
  }
  return extractSectionsFromMarkdown(content)
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const isClickScrolling = useRef(false)

  // Use provided sections or auto-extract from content
  const sections = useMemo(() => {
    if (post.sections && post.sections.length > 0) {
      return post.sections
    }
    return extractSectionsFromContent(post.content)
  }, [post.sections, post.content])

  // Handle section click - disable observer temporarily
  const handleSectionClick = useCallback((sectionId: string) => {
    isClickScrolling.current = true
    setActiveSection(sectionId)

    // Re-enable observer after scroll animation completes
    setTimeout(() => {
      isClickScrolling.current = false
    }, 1000)
  }, [])

  useEffect(() => {
    if (sections.length === 0) return

    // Delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          // Skip if we're doing a click-triggered scroll
          if (isClickScrolling.current) return

          // Find the entry that is most visible / closest to top
          const visibleEntries = entries.filter(entry => entry.isIntersecting)
          if (visibleEntries.length > 0) {
            // Get the one closest to the top of viewport
            const topEntry = visibleEntries.reduce((prev, curr) => {
              return prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
            })
            setActiveSection(topEntry.target.id)
          }
        },
        {
          rootMargin: "-120px 0px -60%",
          threshold: [0, 0.25, 0.5]
        }
      )

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          observer.observe(element)
        }
      })

      // Store observer for cleanup
      ;(window as unknown as { __tocObserver?: IntersectionObserver }).__tocObserver = observer
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      const obs = (window as unknown as { __tocObserver?: IntersectionObserver }).__tocObserver
      if (obs) {
        obs.disconnect()
      }
    }
  }, [sections])

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-rockship-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 max-w-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-rockship-400" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rockship-400" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rockship-400" />
                  <span>{post.readingTime} min read</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-rockship-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Section with Two-Column Layout */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <FadeIn direction="up" delay={200} className="flex-1 min-w-0">
              <BlogContentRenderer content={post.content} />
            </FadeIn>

            {/* Sidebar - Table of Contents */}
            {sections.length > 0 && (
              <FadeIn direction="left" delay={300} className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <div className="bg-rockship-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6">
                    <TableOfContents
                      sections={sections}
                      activeSection={activeSection}
                      onSectionClick={handleSectionClick}
                    />
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
