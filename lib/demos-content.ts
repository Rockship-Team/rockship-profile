import type { Demo } from "@/types/demos";

/**
 * The demos we showcase. Interactive prototypes are self-contained HTML files
 * in public/demos/; the data platform is video-only because it has no UI.
 *
 * The prototype files carry illustrative/fictional data — see the note rendered
 * on each detail page.
 */
export const DEMOS: Demo[] = [
  {
    slug: "truecost",
    title: "Truecost",
    tagline: "A costing & FP&A co-pilot for manufacturers.",
    domain: "Manufacturing · FP&A",
    summary:
      "A deterministic costing engine with a conversational layer on top. It builds a fully loaded cost per SKU — material, labour, overhead and special items — then explains, in plain language, why standard cost became actual cost this month.",
    loomId: "c0ef3a1fdea7473b930385ec653e22a6",
    prototype: "/demos/truecost.html",
    language: "English",
    highlights: [
      "Fully loaded cost build-up per SKU — nothing folded silently into overhead",
      "Standard → actual variance as a waterfall, explained in plain language",
      "What-if simulator with live breakeven and cost-volume-profit",
      "Make-vs-buy against a pasted supplier quote",
      "A conversational “why did cost move?” layer over the deterministic engine",
    ],
  },
  {
    slug: "projecthub",
    title: "RE ProjectHub",
    tagline: "Tender & procurement management for construction.",
    domain: "Construction · Quantity surveying",
    summary:
      "A procurement hub for a real-estate build: it tracks every tender package from invitation to signed contract, enforces budget guardrails per category, and rolls all packages up into a single project cost — with an AI assistant and material price forecasting alongside.",
    loomId: "f481fb9952ac452881cb88f662badf63",
    prototype: "/demos/projecthub.html",
    language: "Vietnamese",
    highlights: [
      "Tender pipeline kanban — invitation → quotes → approval → signed",
      "Budget guardrails that flag a quote before it blows the category cap",
      "Material price history with a 3-month AI forecast",
      "Vendor directory with ratings and package history",
      "AI assistant for quote comparison and vendor substitution",
    ],
  },
  {
    slug: "data-lake",
    title: "Trino Data Lake",
    tagline: "A medallion lakehouse for customer banking data.",
    domain: "Data engineering · Analytics",
    summary:
      "An end-to-end data lake built on Trino and MinIO. A silver layer of raw banking data is loaded, then declarative pipelines derive gold-layer customer profiles, spending and high-value segments — all visualised in a workflow UI. Backend infrastructure, so this one is a walkthrough rather than a clickable prototype.",
    loomId: "df80d9f9ba2a4dd883dde6f0585d4a4a",
    prototype: null,
    highlights: [
      "Medallion architecture: silver (raw) → gold (profiles, spend, high-value)",
      "Trino query engine over MinIO object storage (Parquet)",
      "Declarative pipeline runner (SQL → transforms) with a dependency graph",
      "Workflow UI for executions, data catalog and ingestion visibility",
    ],
    architecture:
      "Docker Compose brings up Trino, MinIO and the pipeline services. A silver layer is loaded — roughly 1,000 customers and ~50,000 transactions — then the pipeline runner derives gold-layer customer profiles, spending and high-value customers. The UI visualises layer sizes, pipeline dependencies, the data catalog, and ingestion into MinIO-backed Parquet files, with runs shown in the workflow UI.",
  },
];

export function getDemo(slug: string): Demo | undefined {
  return DEMOS.find((demo) => demo.slug === slug);
}
