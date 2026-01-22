import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { CalloutNodeView } from "./CalloutNodeView"

export type CalloutType = "info" | "success" | "warning" | "error" | "mission"

export interface CalloutOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (options?: { type?: CalloutType; title?: string }) => ReturnType
      toggleCallout: (options?: { type?: CalloutType }) => ReturnType
    }
  }
}

export const CalloutExtension = Node.create<CalloutOptions>({
  name: "callout",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: "block",

  content: "block+",

  defining: true,

  addAttributes() {
    return {
      type: {
        default: "info" as CalloutType,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-callout-type") || "info",
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-callout-type": attributes.type,
        }),
      },
      title: {
        default: "",
        parseHTML: (element: HTMLElement) => element.getAttribute("data-callout-title") || "",
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-callout-title": attributes.title,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "callout",
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setCallout:
        (options?: { type?: CalloutType; title?: string }) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: {
                type: options?.type || "info",
                title: options?.title || "",
              },
              content: [
                {
                  type: "paragraph",
                },
              ],
            })
            .run()
        },

      toggleCallout:
        (options?: { type?: CalloutType }) =>
        ({ chain }) => {
          return chain()
            .toggleWrap(this.name, {
              type: options?.type || "info",
            })
            .run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutNodeView)
  },
})
