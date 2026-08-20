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
  Advisor,
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
  email: "info@rockship.co",
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
  headlineLead: "AI-Native Engineering Team who",
  headlineAccent: "ship outcomes",
  headlineTail: ", not tickets.",
  sub: "We place AI-native senior product engineers — fluent in Spec-Driven Development, Harness Engineering, and the rest of the modern AI toolchain — to build your production-ready idea in weeks, not months.",
  meta: "30 minutes, with an engineer — not a salesperson.",
} as const;

export const PROOF: Metric[] = [
  { value: "5", label: "Systems in production, all still running" },
  { value: "5", label: "Client markets — US, EU, SG, JP, VN" },
  { value: "92.5%", label: "Manual workload removed, best result" },
  { value: "100+", label: "Engineers, avg. 7 years in production" },
];

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Team augmentation",
    body: "Our AI-Native Engineering Team joins your repo, your standups, your on-call.",
    terms: "From one engineer · month to month",
  },
  {
    index: "02",
    title: "Dedicated product teams",
    body: "Cross-functional teams (AI engineers, data scientists, product managers) that own your AI product end-to-end, from discovery and build to launch and continuous optimization. We usually partner long-term (1+ years) with most clients to continuously scale your product and maximize ROI.",
    terms: "3–15 people · own delivery",
    highlight: true,
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
    thumb: "/images/case-studies/ai-resident-support-automation/thumb.jpg",
    market: "Property management",
    title: "Resident support automation",
    stat: "92.5%",
    statLabel: "Manual workload removed",
  },
  {
    href: "/case-studies/ai-finance-automation",
    image: "/images/case-studies/ai-finance-automation/hero-main.png",
    thumb: "/images/case-studies/ai-finance-automation/thumb.jpg",
    market: "Singapore · Healthcare",
    title: "Finance automation for a clinic group",
    stat: "95%",
    statLabel: "Time saved on close",
  },
  {
    href: "/case-studies/ai-conversational-commerce",
    image: "/images/case-studies/ai-conversational-commerce/hero-main.png",
    thumb: "/images/case-studies/ai-conversational-commerce/thumb.jpg",
    market: "Vietnam · B2B distribution",
    title: "Conversational commerce",
    stat: "+35%",
    statLabel: "Revenue growth",
  },
  {
    href: "/case-studies/ai-loan-automation",
    image: "/images/case-studies/ai-loan-automation/hero-main.png",
    thumb: "/images/case-studies/ai-loan-automation/thumb.jpg",
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

/** Ordered for a 3-per-row grid: rows read left to right, top to bottom. */
export const TEAM: Person[] = [
  {
    name: "Son Vo",
    role: "Chief Operating Officer",
    photo: "/Son.png",
    previously: null,
  },
  {
    name: "Quan Do",
    role: "Chief Technology Officer",
    photo: "/Quan.png",
    previously: null,
  },
  {
    name: "Mimi Nguyen",
    role: "Chief Marketing Officer",
    photo: "/MimiNguyen.jpeg",
    previously: null,
  },
  {
    name: "Huy Dang",
    role: "Managing Partner",
    photo: "/Huy.png",
    previously: null,
  },
  {
    name: "Hung Tran",
    role: "VP of Engineering",
    photo: "/Hung.png",
    previously: null,
  },
  {
    name: "An Nguyen",
    role: "Head of Product",
    photo: "/AnNguyen.jpg",
    photoPosition: "right top",
    previously: null,
  },
];

export const ADVISORS: Advisor[] = [
  {
    name: "Dr. Wray Buntine",
    role: "Chief AI Advisor",
    photo: "/WrayBuntine.jpg",
    subtext:
      "Full Professor of Data Science and AI at Monash University, top 0.75% most-cited AI researchers globally",
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
 * Real events, most recent first. Recommendation in research-v2.md Part 5 is a
 * standalone /events page rather than a homepage section — none of the four
 * researched companies puts events on the homepage, and Toptal firewalls theirs
 * off the client funnel entirely.
 *
 * No upcoming events are listed for now; when the next one is scheduled, add it
 * with status "upcoming" and the /events page surfaces the Upcoming section
 * automatically.
 */
export const EVENTS: RockshipEvent[] = [
  {
    status: "past",
    date: "Tue, 14 Apr",
    year: "2026",
    time: "20:00",
    title: "OpenClaw — AI agents thực chiến cho Solo Founder & SME",
    location: "Online · Zoom",
    description:
      "A 90-minute session on putting AI agents to work for solo founders and small teams — inbound leads, support, internal reporting and workflow automation, with live demos and a 30-day rollout plan.",
    href: "https://luma.com/fl0bhbdp",
  },
  {
    status: "past",
    date: "Sun, 12 Apr",
    year: "2026",
    time: "14:00",
    title: "Raise Your Lobster: The OpenClaw Setup Day",
    location: "The Joi Factory, Ho Chi Minh City · 25 attendees",
    description:
      "An intimate, hands-on afternoon: a small group installing and configuring OpenClaw and leaving with a working AI agent wired to their own workflow — install, API keys and one real integration each.",
    href: "https://luma.com/ubpqor38",
  },
  {
    status: "past",
    date: "Sat, 4 Apr",
    year: "2026",
    time: "09:30",
    title: "Raise Your Lobster: The OpenClaw Setup Day",
    location: "The Joi Factory, Ho Chi Minh City · 99 attendees",
    description:
      "A hands-on setup morning with AI Builders Vietnam — no talks, no slides, just building. Attendees left with a working outreach, research or content agent running on their own laptop.",
    href: "https://luma.com/2ygp3sqn",
  },
];

/** All events above are real. Keeps the /events placeholder banner hidden. */
export const EVENTS_ARE_PLACEHOLDER = false;
