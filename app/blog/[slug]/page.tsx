import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { getPostBySlug, getAllSlugs } from "@/lib/supabase/queries"
import BlogDetailClient from "./BlogDetailClient"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Revalidate every 60 seconds
export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found | Rockship AI",
    }
  }

  return {
    title: `${post.title} | Rockship AI Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-rockship-950">
      <Navbar />
      <BlogDetailClient post={post} />
      <Footer />
    </main>
  )
}
