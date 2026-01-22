"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Rocket,
  Star,
  RefreshCw,
  Check,
  Code,
  ExternalLink,
} from "lucide-react"

interface BlogContentRendererProps {
  content: string
  className?: string
}

// Check if content is HTML (starts with < tag)
function isHtmlContent(content: string): boolean {
  const trimmed = content.trim()
  return trimmed.startsWith("<") || trimmed.includes("<div") || trimmed.includes("<p>")
}

// Simple markdown to HTML converter for backward compatibility
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
    .replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
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

// Callout icons map
const calloutIcons: Record<string, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  mission: Lightbulb,
}

// Callout styles map
const calloutStyles: Record<string, { bg: string; border: string; icon: string; title: string }> = {
  info: {
    bg: "bg-blue-500/10",
    border: "border-l-blue-500",
    icon: "text-blue-500",
    title: "text-blue-400",
  },
  success: {
    bg: "bg-green-500/10",
    border: "border-l-green-500",
    icon: "text-green-500",
    title: "text-green-400",
  },
  warning: {
    bg: "bg-yellow-500/10",
    border: "border-l-yellow-500",
    icon: "text-yellow-500",
    title: "text-yellow-400",
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-l-red-500",
    icon: "text-red-500",
    title: "text-red-400",
  },
  mission: {
    bg: "bg-green-500/5",
    border: "border-l-green-500",
    icon: "text-green-500",
    title: "text-green-400",
  },
}

// Timeline icons map
const timelineIcons: Record<string, typeof Star> = {
  rocket: Rocket,
  star: Star,
  refresh: RefreshCw,
  check: Check,
  code: Code,
}

interface CalloutData {
  type: string
  title: string
  content: string
}

interface TimelineItem {
  date: string
  title: string
  description: string
  link?: string
  linkText?: string
  icon?: string
  position: string
}

interface SeriesItem {
  title: string
  slug: string
  isCurrent: boolean
}

interface GridCell {
  id: string
  content: string
}

interface GridRow {
  id: string
  cells: GridCell[]
}

// Parse callout from HTML
function parseCallout(html: string): CalloutData | null {
  const typeMatch = html.match(/data-callout-type="([^"]+)"/)
  const titleMatch = html.match(/data-callout-title="([^"]*)"/)
  const contentMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)

  if (!typeMatch) return null

  return {
    type: typeMatch[1] || "info",
    title: titleMatch?.[1] || "",
    content: contentMatch?.[1] || "",
  }
}

// Render a callout component
function CalloutComponent({ type, title, content }: CalloutData) {
  const Icon = calloutIcons[type] || Info
  const styles = calloutStyles[type] || calloutStyles.info
  const displayTitle = title || type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div className={cn("rounded-lg border-l-4 p-4 my-4", styles.bg, styles.border)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-5 h-5 flex-shrink-0", styles.icon)} />
        <span className={cn("font-semibold text-sm", styles.title)}>
          {displayTitle}
        </span>
      </div>
      <div
        className="text-gray-300 text-sm"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

// Parse timeline from HTML
function parseTimeline(html: string): TimelineItem[] {
  const itemsMatch = html.match(/data-timeline-items="([^"]+)"/)
  if (!itemsMatch) return []

  try {
    const decoded = itemsMatch[1].replace(/&quot;/g, '"')
    return JSON.parse(decoded)
  } catch {
    return []
  }
}

// Render a timeline component
function TimelineComponent({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative my-8">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 -translate-x-1/2" />

      {/* Items */}
      <div className="space-y-8">
        {items.map((item, index) => {
          const Icon = timelineIcons[item.icon || "star"] || Star
          const isLeft = item.position === "left"

          return (
            <div
              key={index}
              className={cn(
                "relative flex items-center gap-4 group cursor-pointer",
                isLeft ? "flex-row" : "flex-row-reverse"
              )}
            >
              {/* Content */}
              <div
                className={cn(
                  "w-[calc(50%-2rem)] p-4 rounded-lg relative",
                  "bg-rockship-900/50 border border-white/10",
                  "transition-all duration-300 ease-out",
                  "group-hover:border-rockship-accent/50 group-hover:bg-rockship-900/70",
                  isLeft ? "text-right" : "text-left"
                )}
              >
                {/* Left/Right border highlight on hover */}
                {/* Left/Right border highlight on hover */}
                <div
                  className={cn(
                    "absolute top-0 bottom-0 w-1 rounded-full",
                    "bg-gradient-to-b from-rockship-accent via-rockship-accent to-rockship-accent/50",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    isLeft ? "right-0 translate-x-0.5" : "left-0 -translate-x-0.5"
                  )}
                />
                <span className="text-sm text-rockship-accent">{item.date}</span>
                <h4 className="font-semibold text-white mt-1 group-hover:text-rockship-accent transition-colors duration-300">{item.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-rockship-accent hover:underline mt-2"
                  >
                    {item.linkText || "Learn more"}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Icon */}
              <div className="z-10">
                <div className="w-10 h-10 rounded-full bg-rockship-accent flex items-center justify-center border-4 border-rockship-950 transition-transform duration-300 group-hover:scale-125">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Spacer */}
              <div className="w-[calc(50%-2rem)]" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Parse series card from HTML
function parseSeriesCard(html: string): { title: string; items: SeriesItem[]; currentIndex: number } | null {
  const titleMatch = html.match(/data-type="series-card"[^>]*>/)
  const itemsMatch = html.match(/data-series-items="([^"]+)"/)

  if (!itemsMatch) return null

  try {
    const decoded = itemsMatch[1].replace(/&quot;/g, '"')
    const items = JSON.parse(decoded) as SeriesItem[]
    const currentIndex = items.findIndex(i => i.isCurrent)

    // Extract title - look for it in a different way
    const titleTextMatch = html.match(/<h3[^>]*>([^<]+)<\/h3>/i)

    return {
      title: titleTextMatch?.[1] || "Series",
      items,
      currentIndex: currentIndex >= 0 ? currentIndex : 0,
    }
  } catch {
    return null
  }
}

// Render a series card component
function SeriesCardComponent({ title, items, currentIndex }: { title: string; items: SeriesItem[]; currentIndex: number }) {
  const completedCount = currentIndex + 1
  const totalCount = items.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="rounded-xl border border-white/10 bg-rockship-900/50 overflow-hidden my-6">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-rockship-accent uppercase tracking-wider">
            SERIES
          </span>
          <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
        </div>

        {/* Items list */}
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                  item.isCurrent
                    ? "bg-rockship-accent text-white"
                    : index <= currentIndex
                    ? "bg-rockship-accent/20 text-rockship-accent"
                    : "bg-white/5 text-gray-500"
                )}
              >
                {index + 1}
              </span>
              <a
                href={item.slug}
                className={cn(
                  "flex-1 text-sm transition-colors",
                  item.isCurrent
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {item.title}
              </a>
              {item.isCurrent && (
                <span className="text-xs text-rockship-accent">(Current)</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Part {completedCount} of {totalCount}</span>
            <span>{Math.round(progressPercent)}% Complete</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-rockship-accent rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Parse custom image from HTML
function parseCustomImage(html: string): { src: string; caption: string; alignment: string } | null {
  const srcMatch = html.match(/src="([^"]+)"/)
  const captionMatch = html.match(/<figcaption[^>]*>([^<]*)<\/figcaption>/i)
  const alignmentMatch = html.match(/data-alignment="([^"]+)"/)

  if (!srcMatch) return null

  return {
    src: srcMatch[1],
    caption: captionMatch?.[1] || "",
    alignment: alignmentMatch?.[1] || "center",
  }
}

// Render custom image component
function CustomImageComponent({ src, caption, alignment, width }: { src: string; caption: string; alignment: string; width: number | null }) {
  const alignmentClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  }

  return (
    <figure
      className={cn("my-6", alignmentClasses[alignment as keyof typeof alignmentClasses] || "mx-auto")}
      style={width ? { maxWidth: `${width}px` } : undefined}
    >
      <img
        src={src}
        alt={caption || ""}
        className={cn("max-w-full h-auto rounded-lg w-full", alignmentClasses[alignment as keyof typeof alignmentClasses])}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Render grid component
function GridComponent({
  rows,
  columns,
  width,
  height,
  showBorder = true,
  backgroundColor = "#05060B"
}: {
  rows: GridRow[]
  columns: number
  width: number | null
  height: number | null
  showBorder?: boolean
  backgroundColor?: string | null
}) {
  const getGridColsClass = (cols: number) => {
    // Responsive: on mobile (< md) use fewer columns
    switch (cols) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      default:
        return "grid-cols-1 sm:grid-cols-2"
    }
  }

  // Get border class based on responsive column changes
  const getCellBorderClass = (cellIndex: number, cols: number) => {
    if (!showBorder) return ""
    if (cellIndex === 0) return ""

    switch (cols) {
      case 1:
        return ""
      case 2:
        return "sm:border-l border-t sm:border-t-0 border-white/10"
      case 3:
        return cellIndex % 2 === 1
          ? "sm:border-l border-t sm:border-t-0 border-white/10"
          : "md:border-l border-t md:border-t-0 border-white/10"
      case 4:
        return cellIndex % 2 === 1
          ? "sm:border-l border-t sm:border-t-0 border-white/10"
          : "md:border-l border-t md:border-t-0 border-white/10"
      default:
        return "sm:border-l border-t sm:border-t-0 border-white/10"
    }
  }

  return (
    <div
      className={cn(
        "my-6 rounded-lg overflow-hidden max-w-full",
        showBorder && "border border-white/10"
      )}
      style={{
        width: width ? `min(${width}px, 100%)` : undefined,
        height: height ? `${height}px` : undefined,
        backgroundColor: backgroundColor || "#05060B",
      }}
    >
      <div
        className="h-full"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={row.id}
            className={cn(
              "grid gap-0 flex-1",
              getGridColsClass(columns),
              rowIndex > 0 && showBorder && "border-t border-white/10"
            )}
          >
            {row.cells.map((cell, cellIndex) => (
              <div
                key={cell.id}
                className={cn(
                  "p-4 min-h-[80px]",
                  getCellBorderClass(cellIndex, columns)
                )}
              >
                <div className="text-gray-300 text-sm whitespace-pre-wrap">
                  {cell.content}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Add IDs to HTML headings that don't have them
function addIdsToHeadings(html: string): string {
  return html.replace(/<h([1-3])([^>]*)>([^<]+)<\/h\1>/gi, (match, level, attrs, text) => {
    // Check if already has an id
    if (attrs.includes('id="')) {
      return match
    }
    const id = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`
  })
}

export function BlogContentRenderer({ content, className }: BlogContentRendererProps) {
  const renderedContent = useMemo(() => {
    // Check if content is HTML or markdown
    let htmlContent = isHtmlContent(content) ? content : markdownToHtml(content)

    // Add IDs to headings for anchor links
    htmlContent = addIdsToHeadings(htmlContent)

    // Parse and replace custom components
    let processedContent = htmlContent

    // Find and replace callouts - using flexible regex that doesn't depend on attribute order
    const calloutRegex = /<div[^>]*data-type="callout"[^>]*>([\s\S]*?)<\/div>/gi
    const callouts: { match: string; data: CalloutData }[] = []

    processedContent = processedContent.replace(calloutRegex, (match, innerContent) => {
      // Extract type and title from the match regardless of attribute order
      const typeMatch = match.match(/data-callout-type="([^"]+)"/)
      const titleMatch = match.match(/data-callout-title="([^"]*)"/)

      const type = typeMatch?.[1] || "info"
      const title = titleMatch?.[1] || ""

      callouts.push({
        match,
        data: {
          type,
          title,
          content: innerContent.replace(/<p[^>]*>([\s\S]*?)<\/p>/i, '$1'),
        }
      })
      return `<div data-component="callout" data-index="${callouts.length - 1}"></div>`
    })

    // Find and replace timelines - using flexible regex
    const timelineRegex = /<div[^>]*data-type="timeline"[^>]*>[\s\S]*?<\/div>/gi
    const timelines: TimelineItem[][] = []

    processedContent = processedContent.replace(timelineRegex, (match) => {
      try {
        const itemsMatch = match.match(/data-timeline-items="([^"]+)"/)
        if (!itemsMatch) return match

        const decoded = itemsMatch[1].replace(/&quot;/g, '"')
        const items = JSON.parse(decoded)
        timelines.push(items)
        return `<div data-component="timeline" data-index="${timelines.length - 1}"></div>`
      } catch {
        return match
      }
    })

    // Find and replace series cards - using flexible regex
    const seriesRegex = /<div[^>]*data-type="series-card"[^>]*>[\s\S]*?<\/div>/gi
    const seriesCards: { title: string; items: SeriesItem[]; currentIndex: number }[] = []

    processedContent = processedContent.replace(seriesRegex, (match) => {
      try {
        const itemsMatch = match.match(/data-series-items="([^"]+)"/)
        if (!itemsMatch) return match

        const decoded = itemsMatch[1].replace(/&quot;/g, '"')
        const items = JSON.parse(decoded)
        const currentIndex = items.findIndex((i: SeriesItem) => i.isCurrent)
        seriesCards.push({
          title: "Series",
          items,
          currentIndex: currentIndex >= 0 ? currentIndex : 0,
        })
        return `<div data-component="seriesCard" data-index="${seriesCards.length - 1}"></div>`
      } catch {
        return match
      }
    })

    // Find and replace custom images - using flexible regex that doesn't depend on attribute order
    const imageRegex = /<figure[^>]*data-type="custom-image"[^>]*>[\s\S]*?<\/figure>/gi
    const images: { src: string; caption: string; alignment: string; width: number | null }[] = []

    processedContent = processedContent.replace(imageRegex, (match) => {
      // Extract attributes regardless of order
      const alignmentMatch = match.match(/data-alignment="([^"]*)"/)
      const srcMatch = match.match(/<img[^>]*src="([^"]+)"/)
      const captionMatch = match.match(/<figcaption[^>]*>([^<]*)<\/figcaption>/i)
      const widthMatch = match.match(/width="(\d+)"/)

      const src = srcMatch?.[1] || ""

      // Skip images without src (empty upload placeholders)
      if (!src) {
        return ""
      }

      images.push({
        src,
        caption: captionMatch?.[1] || "",
        alignment: alignmentMatch?.[1] || "center",
        width: widthMatch ? parseInt(widthMatch[1]) : null,
      })
      return `<div data-component="customImage" data-index="${images.length - 1}"></div>`
    })

    // Find and replace grids
    const gridRegex = /<div[^>]*data-type="grid"[^>]*>[\s\S]*?<\/div>/gi
    const grids: { rows: GridRow[]; columns: number; width: number | null; height: number | null; showBorder: boolean; backgroundColor: string | null }[] = []

    processedContent = processedContent.replace(gridRegex, (match) => {
      try {
        const columnsMatch = match.match(/data-grid-columns="(\d+)"/)
        const rowsMatch = match.match(/data-grid-rows="([^"]+)"/)
        const widthMatch = match.match(/data-width="(\d+)"/)
        const heightMatch = match.match(/data-height="(\d+)"/)
        const showBorderMatch = match.match(/data-show-border="([^"]+)"/)
        const backgroundColorMatch = match.match(/data-background-color="([^"]+)"/)

        if (!rowsMatch) return match

        const decoded = rowsMatch[1].replace(/&quot;/g, '"')
        const rows = JSON.parse(decoded) as GridRow[]

        grids.push({
          rows,
          columns: columnsMatch ? parseInt(columnsMatch[1]) : 2,
          width: widthMatch ? parseInt(widthMatch[1]) : null,
          height: heightMatch ? parseInt(heightMatch[1]) : null,
          showBorder: showBorderMatch ? showBorderMatch[1] !== "false" : true,
          backgroundColor: backgroundColorMatch ? backgroundColorMatch[1] : "#05060B",
        })
        return `<div data-component="grid" data-index="${grids.length - 1}"></div>`
      } catch {
        return match
      }
    })

    return {
      html: processedContent,
      callouts,
      timelines,
      seriesCards,
      images,
      grids,
    }
  }, [content])

  // Split content by component placeholders and render
  const parts = renderedContent.html.split(/(<div data-component="[^"]*" data-index="\d+"><\/div>)/g)


  return (
    <article
      className={cn(
        "prose prose-invert prose-lg max-w-none",
        "prose-headings:font-display prose-headings:font-semibold",
        "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
        "prose-p:text-gray-300",
        "prose-a:text-rockship-accent prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-white",
        "prose-code:text-rockship-accent prose-code:bg-rockship-900/60 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']",
        "prose-pre:bg-rockship-900/60 prose-pre:border prose-pre:border-white/10",
        "prose-blockquote:border-l-rockship-accent prose-blockquote:text-gray-400",
        "prose-li:text-gray-300",
        className
      )}
    >
      {parts.map((part, index) => {
        // Check if this is a component placeholder
        const calloutMatch = part.match(/data-component="callout" data-index="(\d+)"/)
        if (calloutMatch) {
          const idx = parseInt(calloutMatch[1])
          const data = renderedContent.callouts[idx]?.data
          if (data) {
            return <CalloutComponent key={`callout-${index}`} {...data} />
          }
        }

        const timelineMatch = part.match(/data-component="timeline" data-index="(\d+)"/)
        if (timelineMatch) {
          const idx = parseInt(timelineMatch[1])
          const items = renderedContent.timelines[idx]
          if (items) {
            return <TimelineComponent key={`timeline-${index}`} items={items} />
          }
        }

        const seriesMatch = part.match(/data-component="seriesCard" data-index="(\d+)"/)
        if (seriesMatch) {
          const idx = parseInt(seriesMatch[1])
          const data = renderedContent.seriesCards[idx]
          if (data) {
            return <SeriesCardComponent key={`series-${index}`} {...data} />
          }
        }

        const imageMatch = part.match(/data-component="customImage" data-index="(\d+)"/)
        if (imageMatch) {
          const idx = parseInt(imageMatch[1])
          const data = renderedContent.images[idx]
          if (data) {
            return <CustomImageComponent key={`image-${index}`} {...data} />
          }
        }

        const gridMatch = part.match(/data-component="grid" data-index="(\d+)"/)
        if (gridMatch) {
          const idx = parseInt(gridMatch[1])
          const data = renderedContent.grids[idx]
          if (data) {
            return <GridComponent key={`grid-${index}`} {...data} />
          }
        }

        // Regular HTML content
        if (part.trim()) {
          return (
            <div
              key={`html-${index}`}
              dangerouslySetInnerHTML={{ __html: part }}
            />
          )
        }

        return null
      })}
    </article>
  )
}
