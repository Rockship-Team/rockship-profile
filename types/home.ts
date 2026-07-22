/** Content model for the international homepage. See docs/rebrand/copy-v2.md */

export interface Market {
  /** IANA timezone, used for the live working-overlap strip */
  tz: string;
  label: string;
}

export interface Metric {
  value: string;
  label: string;
  /** True when the figure is not yet verified. Rendered with a review marker. */
  unverified?: boolean;
}

export interface Service {
  index: string;
  title: string;
  body: string;
  terms: string;
}

export interface Differentiator {
  title: string;
  body: string;
}

export interface SelectionStage {
  index: string;
  title: string;
  body: string;
  /** Pass rate. Null until Ops supplies the real figure. */
  rate: string | null;
}

export interface CaseStudy {
  href: string;
  /** Hero artwork from public/images/case-studies/<slug>/ */
  image: string;
  /** Real-world 16:9 card thumbnail from public/images/case-studies/<slug>/thumb.jpg */
  thumb: string;
  market: string;
  title: string;
  stat: string;
  statLabel: string;
}

export interface Person {
  name: string;
  role: string;
  photo: string;
  /** "Previously at X" — the credential line. Null until supplied. */
  previously: string | null;
  /** True when the name or role itself is still a placeholder. */
  unverified?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  unverified?: boolean;
}

export interface CareerPillar {
  index: string;
  title: string;
  body: string;
}

export type EventStatus = "upcoming" | "past";

export interface RockshipEvent {
  status: EventStatus;
  date: string;
  year: string;
  time?: string;
  title: string;
  location: string;
  description: string;
  href: string;
}
