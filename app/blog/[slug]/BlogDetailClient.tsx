"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import { FadeIn } from "@/components/FadeIn"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { BlogPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"

interface BlogDetailClientProps {
  post: BlogPost
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    if (!post.sections || post.sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0
      }
    )

    post.sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [post.sections])

  const htmlContent = markdownToHtml(post.content)

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
              <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-300 prose-a:text-rockship-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-rockship-accent prose-code:bg-rockship-900/60 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-rockship-900/60 prose-pre:border prose-pre:border-white/10 prose-blockquote:border-l-rockship-accent prose-blockquote:text-gray-400 prose-li:text-gray-300">
                <div
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </article>
            </FadeIn>

            {/* Sidebar - Table of Contents */}
            {post.sections && post.sections.length > 0 && (
              <FadeIn direction="left" delay={300} className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <div className="bg-rockship-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6">
                    <TableOfContents
                      sections={post.sections}
                      activeSection={activeSection}
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

// Simple markdown to HTML converter with section IDs for TOC navigation
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers with IDs
    .replace(/^### (.*$)/gim, (_, title) => {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return `<h3 id="${id}">${title}</h3>`
    })
    .replace(/^## (.*$)/gim, (_, title) => {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return `<h2 id="${id}">${title}</h2>`
    })
    .replace(/^# (.*$)/gim, (_, title) => {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return `<h1 id="${id}">${title}</h1>`
    })
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    // Paragraphs
    .replace(/\n\n/gim, '</p><p>')
    // Line breaks
    .replace(/\n/gim, '<br>')
    // Wrap in paragraph
    .replace(/^(.*)$/s, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/gim, '')
    // Clean up list items
    .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/gim, '')
}
