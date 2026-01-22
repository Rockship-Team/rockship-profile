import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { SeriesCardNodeView } from "./SeriesCardNodeView"

export interface SeriesItem {
  id: string
  title: string
  slug: string
  isCurrent: boolean
}

export interface SeriesCardOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    seriesCard: {
      setSeriesCard: (options?: {
        title?: string
        items?: SeriesItem[]
        currentIndex?: number
      }) => ReturnType
    }
  }
}

export const SeriesCardExtension = Node.create<SeriesCardOptions>({
  name: "seriesCard",

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
      title: {
        default: "Series Title",
      },
      items: {
        default: [] as SeriesItem[],
        parseHTML: (element: HTMLElement) => {
          const itemsJson = element.getAttribute("data-series-items")
          try {
            return itemsJson ? JSON.parse(itemsJson) : []
          } catch {
            return []
          }
        },
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-series-items": JSON.stringify(attributes.items),
        }),
      },
      currentIndex: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="series-card"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "series-card",
      }),
    ]
  },

  addCommands() {
    return {
      setSeriesCard:
        (options?: { title?: string; items?: SeriesItem[]; currentIndex?: number }) =>
        ({ chain }) => {
          const defaultItems: SeriesItem[] = options?.items || [
            { id: crypto.randomUUID(), title: "Part 1", slug: "#", isCurrent: false },
            { id: crypto.randomUUID(), title: "Part 2", slug: "#", isCurrent: false },
            { id: crypto.randomUUID(), title: "Part 3", slug: "#", isCurrent: true },
          ]

          return chain()
            .insertContent({
              type: this.name,
              attrs: {
                title: options?.title || "Series Title",
                items: defaultItems,
                currentIndex: options?.currentIndex ?? defaultItems.findIndex((i) => i.isCurrent),
              },
            })
            .run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(SeriesCardNodeView)
  },
})
