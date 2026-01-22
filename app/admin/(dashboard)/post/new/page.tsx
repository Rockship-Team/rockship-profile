import { ArrowLeft } from "lucide-react"
import { getAllTagsForAdmin } from "@/lib/supabase/queries"
import { PostForm } from "@/components/admin/PostForm"
import { cn } from "@/lib/utils"

// Force dynamic rendering (no pre-rendering at build time)
export const dynamic = "force-dynamic"

export default async function NewPostPage() {
  const tags = await getAllTagsForAdmin()

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <a
          href="/admin"
          className={cn(
            "inline-flex items-center gap-2 text-gray-400 hover:text-white",
            "transition-colors mb-4"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to posts
        </a>
        <h1 className="text-2xl font-bold text-white">Create New Post</h1>
        <p className="text-gray-400 mt-1">
          Write and publish a new blog post.
        </p>
      </div>

      {/* Form */}
      <div className="bg-rockship-900/60 backdrop-blur-md border border-white/8 rounded-xl p-6">
        <PostForm mode="create" availableTags={tags} />
      </div>
    </div>
  )
}
