/**
 * Homepage content for the international rebrand.
 *
 * Copy is reviewed in docs/rebrand/copy-v2.md; positioning research in
 * docs/rebrand/research-v1.md and research-v2.md.
 *
 * Anything marked `unverified` or set to `null` is a placeholder awaiting real
 * data. Those render with a visible marker in development so they cannot ship
 * unnoticed. Do not replace them with invented figures.
 */

import type {
  CareerPillar,
  CaseStudy,
  Differentiator,
  FaqItem,
  Market,
  Metric,
  Person,
  RockshipEvent,
  SelectionStage,
  Service,
} from "@/types/home";

export const CONTACT = {
  email: "hans.dang@rockship.co",
  whatsapp: "https://wa.me/84865791311",
  phoneLabel: "+84 865 791 311",
  linkedin: "https://www.linkedin.com/company/rockship",
  city: "Ho Chi Minh City, Vietnam",
} as const;

/** The five markets our clients are actually in. */
export const MARKETS: Market[] = [
  { tz: "America/Los_Angeles", label: "United States" },
  { tz: "Europe/London", label: "Europe" },
  { tz: "Asia/Singapore", label: "Singapore" },
  { tz: "Asia/Tokyo", label: "Japan" },
  { tz: "Asia/Ho_Chi_Minh", label: "Vietnam" },
];

/** Our own working day, local time, used to compute overlap. */
export const OUR_TIMEZONE = "Asia/Ho_Chi_Minh";
export const OUR_HOURS = { start: 9, end: 18 } as const;

export const HERO = {
  eyebrow: "Ho Chi Minh City · Singapore · Working worldwide",
  /** Split so a single phrase can carry the one accent colour. */
  headlineLead: "Senior engineers who",
  headlineAccent: "ship outcomes",
  headlineTail: ", not tickets.",
  sub: "We place vetted senior product engineers with teams in the US, Europe, Singapore and Japan — and stay through production.",
  meta: "30 minutes, with an engineer — not a salesperson.",
} as const;

export const PROOF: Metric[] = [
  { value: "5", label: "Systems in production, all still running" },
  { value: "5", label: "Client markets — US, EU, SG, JP, VN" },
  { value: "92.5%", label: "Manual workload removed, best result" },
  { value: "24", label: "Engineers, avg. 7 years in production", unverified: true },
];

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Team augmentation",
    body: "Senior engineers join your repo, your standups, your on-call.",
    terms: "From one engineer · month to month",
  },
  {
    index: "02",
    title: "Dedicated product teams",
    body: "A pod that owns a product surface from discovery to launch — and keeps operating it.",
    terms: "3–8 people · owns delivery",
  },
  {
    index: "03",
    title: "AI delivery sprints",
    body: "One workflow taken live, with evals, guardrails and handover included.",
    terms: "Fixed scope · fixed price",
  },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Senior by default",
    body: "Everyone we place has taken a system to production and owned it after.",
  },
  {
    title: "We stay after launch",
    body: "Four of five shipped systems still run with our involvement.",
  },
  {
    title: "Your timezone, in writing",
    body: "A fixed overlap window with your working day, agreed before kickoff.",
  },
  {
    title: "Your IP, your repo",
    body: "Your accounts, your controls. IP assigns on delivery.",
  },
];

/**
 * The highest-leverage section on the page. Toptal publishes stage-by-stage
 * pass rates (26.4% → 7.4% → 3.6% → 3.2% → 3%) and builds its whole brand on
 * them. Rates stay null until Ops supplies real ones — if they never arrive we
 * describe the process without numbers, as Turing does, rather than invent any.
 */
export const SELECTION: SelectionStage[] = [
  {
    index: "01",
    title: "Application",
    body: "Referral or direct. Every applicant is screened by an engineer, not a recruiter.",
    rate: null,
  },
  {
    index: "02",
    title: "Technical interview",
    body: "Systems design and production judgment, not algorithm puzzles.",
    rate: null,
  },
  {
    index: "03",
    title: "Paid work sample",
    body: "A scoped piece of real work, reviewed the way we'd review a colleague's pull request.",
    rate: null,
  },
  {
    index: "04",
    title: "Client trial",
    body: "Two weeks on your codebase. Continued placement depends on your assessment, not ours.",
    rate: null,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    href: "/case-studies/ai-resident-support-automation",
    image: "/images/case-studies/ai-resident-support-automation/hero-main.png",
    market: "Property management",
    title: "Resident support automation",
    stat: "92.5%",
    statLabel: "Manual workload removed",
  },
  {
    href: "/case-studies/ai-finance-automation",
    image: "/images/case-studies/ai-finance-automation/hero-main.png",
    market: "Singapore · Healthcare",
    title: "Finance automation for a clinic group",
    stat: "95%",
    statLabel: "Time saved on close",
  },
  {
    href: "/case-studies/ai-conversational-commerce",
    image: "/images/case-studies/ai-conversational-commerce/hero-main.png",
    market: "Vietnam · B2B distribution",
    title: "Conversational commerce",
    stat: "+35%",
    statLabel: "Revenue growth",
  },
  {
    href: "/case-studies/ai-loan-automation",
    image: "/images/case-studies/ai-loan-automation/hero-main.png",
    market: "Indonesia · Microfinance",
    title: "Loan origination automation",
    stat: "2.5×",
    statLabel: "Applications per officer",
  },
];

/**
 * Written as proof of our talent bar, not as recruiting. None of Palantir,
 * Toptal, Turing or sixonefourlabs mixes audiences on a client-facing page —
 * Toptal scrubs "apply" and "join" from its homepage entirely. A client should
 * read this as quality assurance; engineers are attracted as a side effect.
 */
export const CAREER: CareerPillar[] = [
  {
    index: "01",
    title: "Forward-deployed by default",
    body: "Our engineers sit with your stakeholders, gather the requirements themselves, and ship. No translation layer.",
  },
  {
    index: "02",
    title: "AI-native practice",
    body: "Evaluation harnesses, guardrails and cost control are standard practice here, not a specialisation.",
  },
  {
    index: "03",
    title: "Mentored, then trusted",
    body: "Every engineer works under a senior lead before they lead. That's why we can put them in front of you.",
  },
];

export const TEAM: Person[] = [
  {
    name: "Huy Dang",
    role: "Managing Partner",
    photo: "/Huy.png",
    previously: null,
  },
  {
    name: "Son Vo",
    role: "Chief Operating Officer",
    photo: "/Son.png",
    previously: null,
  },
  {
    name: "Ngoc",
    role: "Role to confirm",
    photo: "/Ngoc.png",
    previously: null,
    unverified: true,
  },
  {
    name: "Quan",
    role: "Role to confirm",
    photo: "/Quan.png",
    previously: null,
    unverified: true,
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "How do we engage — and how do we exit?",
    answer:
      "Team augmentation is month-to-month after the first quarter. Dedicated teams run on a quarterly commitment. AI delivery sprints are fixed scope and fixed price. Every engagement starts with a two-week paid trial, and you can end it there.",
    unverified: true,
  },
  {
    question: "Who owns the IP?",
    answer:
      "You do. Work happens in your accounts, under your access controls, and IP assigns on delivery. Access is revoked the day an engagement ends.",
    unverified: true,
  },
  {
    question: "What about the timezone gap?",
    answer:
      "We commit to a fixed daily overlap with your working day, agreed before kickoff and written into the engagement. Our clients are in the United States, Europe, Singapore, Japan and Vietnam — the overlap we offer differs by market.",
    unverified: true,
  },
  {
    question: "What does it cost?",
    answer:
      "Engagements are priced per engineer per month for team augmentation, and fixed for delivery sprints. We'll give you a number on the first call.",
    unverified: true,
  },
  {
    question: "Can we hire your engineers directly?",
    answer:
      "Yes, after twelve months, with a conversion fee agreed up front. We'd rather you keep a great engineer than lose the relationship.",
    unverified: true,
  },
];

/**
 * Placeholder events. Recommendation in research-v2.md Part 5 is a standalone
 * /events page rather than a homepage section — none of the four researched
 * companies puts events on the homepage, and Toptal firewalls theirs off the
 * client funnel entirely. Replace with real events before launch.
 */
export const EVENTS: RockshipEvent[] = [
  {
    status: "upcoming",
    date: "Thu, 13 Aug",
    year: "2026",
    time: "18:30",
    title: "Evals in production: what actually breaks",
    location: "Ho Chi Minh City · District 1",
    description:
      "Building evaluation harnesses for LLM features that already have users, and the failure modes that only appear at scale.",
    href: "https://lu.ma/",
  },
  {
    status: "upcoming",
    date: "Wed, 3 Sep",
    year: "2026",
    time: "17:00",
    title: "Forward-deployed engineering: an open session",
    location: "Online",
    description:
      "How the role works day to day, who it suits, and how we train for it. Open to engineers considering the track.",
    href: "https://lu.ma/",
  },
  {
    status: "past",
    date: "Sat, 21 Jun",
    year: "2026",
    title: "AI-native engineering workshop",
    location: "Ho Chi Minh City · 40 attendees",
    description:
      "A hands-on afternoon taking a prototype to a deployed service with guardrails and monitoring.",
    href: "/events",
  },
  {
    status: "past",
    date: "Thu, 15 May",
    year: "2026",
    title: "Shipping to Singapore: engineering for regulated clients",
    location: "Online · with a guest speaker",
    description:
      "What changes when your client is in a regulated industry — data residency, audit trails and review cycles.",
    href: "/events",
  },
];

/** Every event above is invented. Gates the placeholder banner on /events. */
export const EVENTS_ARE_PLACEHOLDER = true;
