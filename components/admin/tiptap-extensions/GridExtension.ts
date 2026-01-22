import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { GridNodeView } from "./GridNodeView"

export interface GridCell {
  id: string
  content: string
}

export interface GridRow {
  id: string
  cells: GridCell[]
}

export interface GridOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    grid: {
      setGrid: (columns?: number) => ReturnType
    }
  }
}

export const GridExtension = Node.create<GridOptions>({
  name: "grid",

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
      columns: {
        default: 2,
        parseHTML: (element: HTMLElement) => {
          return parseInt(element.getAttribute("data-grid-columns") || "2", 10)
        },
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-grid-columns": attributes.columns,
        }),
      },
      rows: {
        default: [] as GridRow[],
        parseHTML: (element: HTMLElement) => {
          const rowsJson = element.getAttribute("data-grid-rows")
          try {
            return rowsJson ? JSON.parse(rowsJson) : []
          } catch {
            return []
          }
        },
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-grid-rows": JSON.stringify(attributes.rows),
        }),
      },
      width: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const width = element.getAttribute("data-width")
          return width ? parseInt(width, 10) : null
        },
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes.width) return {}
          return { "data-width": attributes.width }
        },
      },
      height: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const height = element.getAttribute("data-height")
          return height ? parseInt(height, 10) : null
        },
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes.height) return {}
          return { "data-height": attributes.height }
        },
      },
      showBorder: {
        default: true,
        parseHTML: (element: HTMLElement) => {
          const value = element.getAttribute("data-show-border")
          return value !== "false"
        },
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-show-border": attributes.showBorder ? "true" : "false",
        }),
      },
      backgroundColor: {
        default: "#05060B",
        parseHTML: (element: HTMLElement) => {
          return element.getAttribute("data-background-color") || "#05060B"
        },
        renderHTML: (attributes: Record<string, unknown>) => {
          return { "data-background-color": attributes.backgroundColor || "#05060B" }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="grid"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "grid",
      }),
    ]
  },

  addCommands() {
    return {
      setGrid:
        (columns = 2) =>
        ({ chain }) => {
          // Create initial row with cells
          const initialRow: GridRow = {
            id: crypto.randomUUID(),
            cells: Array.from({ length: columns }, () => ({
              id: crypto.randomUUID(),
              content: "",
            })),
          }

          return chain()
            .insertContent({
              type: this.name,
              attrs: {
                columns,
                rows: [initialRow],
                showBorder: true,
                backgroundColor: "#05060B",
              },
            })
            .run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(GridNodeView)
  },
})
