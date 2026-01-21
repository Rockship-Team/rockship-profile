"use client"

import { cn } from "@/lib/utils"
import { BlogSection } from "@/types/blog"

interface TableOfContentsProps {
  sections: BlogSection[]
  activeSection?: string
  className?: string
}

export function TableOfContents({
  sections,
  activeSection,
  className
}: TableOfContentsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  if (sections.length === 0) {
    return null
  }

  return (
    <nav
      className={cn("", className)}
      aria-label="Table of contents"
    >
      <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        On This Page
      </h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li
            key={section.id}
            style={{
              paddingLeft: section.level > 1 ? `${(section.level - 1) * 12}px` : undefined
            }}
          >
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={cn(
                "block text-sm py-1 transition-colors border-l-2 pl-3 -ml-[2px]",
                activeSection === section.id
                  ? "text-rockship-accent border-rockship-accent"
                  : "text-gray-400 border-transparent hover:text-white hover:border-white/30"
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
