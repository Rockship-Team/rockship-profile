import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { TimelineNodeView } from "./TimelineNodeView"

export interface TimelineItem {
  id: string
  date: string
  title: string
  description: string
  link?: string
  linkText?: string
  icon?: "rocket" | "star" | "refresh" | "check" | "code"
  position: "left" | "right"
}

export interface TimelineOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    timeline: {
      setTimeline: (items?: TimelineItem[]) => ReturnType
    }
  }
}

export const TimelineExtension = Node.create<TimelineOptions>({
  name: "timeline",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: "block",

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      items: {
        default: [] as TimelineItem[],
        parseHTML: (element: HTMLElement) => {
          const itemsJson = element.getAttribute("data-timeline-items")
          try {
            return itemsJson ? JSON.parse(itemsJson) : []
          } catch {
            return []
          }
        },
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-timeline-items": JSON.stringify(attributes.items),
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="timeline"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "timeline",
      }),
    ]
  },

  addCommands() {
    return {
      setTimeline:
        (items?: TimelineItem[]) =>
        ({ chain }) => {
          const defaultItems: TimelineItem[] = items || [
            {
              id: crypto.randomUUID(),
              date: "January 2025",
              title: "New Event",
              description: "Description of the event",
              icon: "star",
              position: "left",
            },
          ]

          return chain()
            .insertContent({
              type: this.name,
              attrs: { items: defaultItems },
            })
            .run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(TimelineNodeView)
  },
})
