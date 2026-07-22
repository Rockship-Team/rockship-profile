/**
 * Product demos shown in the /demos showcase.
 *
 * Two kinds: interactive prototypes (a self-contained HTML file served from
 * public/demos/, embedded in an iframe) and video-only walkthroughs (a Loom,
 * used when there is no clickable UI — e.g. a backend data platform).
 */
export interface Demo {
  slug: string;
  title: string;
  /** One line, shown on the card and under the title. */
  tagline: string;
  /** Domain badge, e.g. "Manufacturing · FP&A". */
  domain: string;
  /** A short paragraph for the detail page. */
  summary: string;
  /** Loom share id (the bit after /share/). Embedded as /embed/<id>. */
  loomId: string;
  /**
   * Path to the self-contained prototype under public/, or null when the demo
   * is video-only (no interactive UI to embed).
   */
  prototype: string | null;
  /** Prototype UI language. Surfaced as a badge so an EN audience is warned. */
  language?: "English" | "Vietnamese";
  /** Feature bullets. */
  highlights: string[];
  /** Written architecture note — used for video-only demos with no prototype. */
  architecture?: string;
}
