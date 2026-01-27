import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { ImageNodeView } from "./ImageNodeView"

export type ImageAlignment = "left" | "center" | "right"

export interface ImageOptions {
  HTMLAttributes: Record<string, unknown>
  allowBase64: boolean
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customImage: {
      setImage: (options: {
        src: string
        alt?: string
        caption?: string
        alignment?: ImageAlignment
      }) => ReturnType
      setImageAlignment: (alignment: ImageAlignment) => ReturnType
      setImageCaption: (caption: string) => ReturnType
    }
  }
}

export const ImageExtension = Node.create<ImageOptions>({
  name: "customImage",

  addOptions() {
    return {
      HTMLAttributes: {},
      allowBase64: true,
    }
  },

  group: "block",

  content: "",

  draggable: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const img = element.querySelector("img")
          return img?.getAttribute("src") || null
        },
      },
      alt: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const img = element.querySelector("img")
          return img?.getAttribute("alt") || null
        },
        // Don't define renderHTML - handled at node level
      },
      caption: {
        default: "",
        parseHTML: (element: HTMLElement) => {
          const figcaption = element.querySelector("figcaption")
          return figcaption?.textContent || ""
        },
        // Don't define renderHTML - handled at node level
      },
      alignment: {
        default: "center" as ImageAlignment,
        parseHTML: (element: HTMLElement) => {
          return element.getAttribute("data-alignment") || "center"
        },
      },
      width: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const img = element.querySelector("img")
          const width = img?.getAttribute("width")
          return width ? parseInt(width) : null
        },
        // Don't define renderHTML - handled at node level
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="custom-image"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    const { src, alt, caption, alignment, width, ...rest } = HTMLAttributes

    // Build img attributes
    const imgAttrs: Record<string, unknown> = {
      draggable: false,
      contenteditable: false,
    }
    if (src) imgAttrs.src = src
    if (alt) imgAttrs.alt = alt
    if (width) imgAttrs.width = width

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, rest, {
        "data-type": "custom-image",
        "data-alignment": alignment || "center",
      }),
      ["img", imgAttrs],
      caption ? ["figcaption", {}, caption as string] : "",
    ]
  },

  addCommands() {
    return {
      setImage:
        (options: { src: string; alt?: string; caption?: string; alignment?: ImageAlignment }) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: options,
            })
            .run()
        },

      setImageAlignment:
        (alignment: ImageAlignment) =>
        ({ chain }) => {
          return chain()
            .updateAttributes(this.name, { alignment })
            .run()
        },

      setImageCaption:
        (caption: string) =>
        ({ chain }) => {
          return chain()
            .updateAttributes(this.name, { caption })
            .run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },
})
