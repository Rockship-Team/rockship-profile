"use client"

import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/FadeIn"

interface BlogHeroProps {
  title?: string
  description?: string
  className?: string
}

export function BlogHero({
  title = "Blog",
  description = "Technical articles about AI solutions, infrastructure as code, and cloud development.",
  className
}: BlogHeroProps) {
  return (
    <section className={cn("pt-32 pb-12", className)}>
      <div className="container mx-auto px-6">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {title}
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <p className="text-lg text-gray-400 max-w-2xl">
            {description}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
