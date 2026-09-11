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
  AiLab,
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
  headlineLead: "AI-Native Engineering and Product-Led Growth Team who",
  headlineAccent: "ship outcomes",
  headlineTail: ", not tickets.",
  sub: "We deploy elite AI engineers and product leaders — fluent in state-of-the-art AI — to build and ship your production-ready product in weeks, not months. Trusted by early-stage startups to major enterprises, we build AI systems that generate millions (and soon billions) in revenue.",
  meta: "30 minutes, with an engineer — not a salesperson.",
} as const;

export const PROOF: Metric[] = [
  { value: "80+", label: "Client projects delivered" },
  { value: "5", label: "Client markets — US, EU, SG, JP, VN" },
  { value: "92.5%", label: "Manual workload removed, best result" },
  { value: "100+", label: "Engineers (external in network)" },
];

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Engineering Squads",
    body: "Senior engineering squads embedded directly in your repositories, CI/CD pipelines, and sprint cadence. We deploy machine learning engineers, systems architects, and distributed systems specialists to accelerate your core roadmap. From custom model fine-tuning (LoRA/QLoRA) to high-throughput data infrastructure, we operate as an immediate force-multiplier for your technical leadership.",
    terms: "Dedicated squads · Contractual 4-hour sync overlap · Quarterly commitment",
  },
  {
    index: "02",
    title: "AI-Native Product Pods",
    body: "Autonomous, cross-functional squads led by seasoned Product Managers, ML Engineers, and Systems Architects. We take complete ownership of your AI product domain: technical discovery, system architecture, automated evaluation benchmarking, and compute efficiency at scale. We partner multi-year to scale production throughput and maximize enterprise ROI.",
    terms: "4–15+ senior specialists · Full SLA & delivery ownership · 100% IP assignment",
    highlight: true,
  },
  {
    index: "03",
    title: "Production AI Sprints",
    body: "A mission-critical AI capability, multi-agent orchestration, or cognitive pipeline taken from architecture to live production in 4 to 8 weeks. Every sprint ships production-ready with custom evaluation harnesses, deterministic schema guardrails, low-latency routing tiers, and complete enterprise compliance validation.",
    terms: "Fixed scope · Guaranteed acceptance criteria · SOC 2 / HIPAA / GDPR verified",
  },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Production-tested by default",
    body: "Every engineer and product leader has architected, shipped, and scaled mission-critical AI systems in enterprise production. Zero junior bench, zero outsourced staffing.",
  },
  {
    title: "We scale what we ship",
    body: "A large percentage of our production deployments evolve into multi-year product partnerships, continuously optimizing inference latency, cost-per-query, and model accuracy as your traffic scales.",
  },
  {
    title: "Contractual timezone overlap",
    body: "A guaranteed 4-hour daily synchronous working window with your core engineering team, written directly into our master services agreement.",
  },
  {
    title: "Complete asset sovereignty",
    body: "Your repositories, your cloud infrastructure. All source code, fine-tuned model weights, proprietary datasets, and agentic workflows assigned to you immediately upon delivery.",
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
    title: "Architectural & Algorithmic Screening",
    body: "Direct applications are strictly selective; the vast majority of our engineers are sourced through closed referrals and our vetted network of proven technical talent. Every candidate is evaluated directly by our technical directors — never non-technical recruiters. We filter for foundational computer science mastery, memory optimization, concurrency patterns, and production Git history.",
    rate: null,
  },
  {
    index: "02",
    title: "Distributed Systems & Cognitive Architecture",
    body: "A live architectural defense under enterprise production constraints. Candidates design resilient, distributed systems: dynamic multi-model routing, low-latency execution, agentic workflows — not memorized LeetCode puzzles.",
    rate: null,
  },
  {
    index: "03",
    title: "Production-Grade Work Trial",
    body: "A compensated, high-intensity technical sprint inside an isolated sandbox. Candidates architect a production capability, build automated evaluation harnesses (LLM-as-a-judge), implement strict schema guardrails (Pydantic/Zod), and submit pull requests reviewed against our highest code standards.",
    rate: null,
  },
  {
    index: "04",
    title: "Two-Week Production Discovery Sprint",
    body: "Embedded directly within your engineering repositories, CI/CD pipelines, and daily sprint cadence. Continued partnership is governed entirely by your technical leadership's evaluation of velocity, code maintainability, and delivery excellence.",
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
 * The R&D section. Source copy: docs/rebrand/ai-rd-lab.md (from the AI R&D Lab
 * brief). The five capabilities mirror the labels on the platform diagram, so
 * the same claims are readable to a screen reader and to search — the diagram
 * carries them as pixels only.
 */
export const AI_RD_LAB: AiLab = {
  intro:
    "A proprietary Agentic AI & Data Platform that closes the gap between static enterprise data and proactive, goal-driven autonomy.",
  body: [
    "Rather than simple chatbots or isolated models, the platform deploys coordinated multi-agent workflows that safely query data silos, reason through high-stakes constraints, and execute mission-critical tasks in real time.",
    "We are rolling out structured access and early-adopter deployments for global enterprise partners who want to automate domain-specific operations without compromising security or data sovereignty.",
  ],
  diagram: {
    src: "/images/ai-rd-lab.png",
    alt: "The AI R&D Lab platform: agentic workflows, data silo integration, goal-driven autonomy, security and data sovereignty, and enterprise operations arranged around the Rockship innovation engine.",
    width: 1936,
    height: 1437,
  },
  capabilities: [
    {
      title: "Agentic workflows",
      body: "Coordinated multi-agent runs with hand-offs and guardrails, not single-shot prompts.",
    },
    {
      title: "Data silo integration",
      body: "Governed queries across systems that were never built to talk to each other.",
    },
    {
      title: "Goal-driven autonomy",
      body: "Agents work towards a stated outcome and reason through the constraints on the way.",
    },
    {
      title: "Security & data sovereignty",
      body: "Deployed inside your boundary, so the data stays where your regulator expects it.",
    },
    {
      title: "Enterprise operations",
      body: "Built for the domain-specific, mission-critical work that runs the business.",
    },
  ],
  advisor: {
    name: "Dr. Wray Buntine",
    role: "Chief AI Advisor",
    photo: "/WrayBuntine.jpg",
    body:
      "Long before large language models captured global attention, Dr. Buntine's research at NASA Ames, UC Berkeley and Monash University established the frameworks for machine learning, nonparametric topic modelling and Bayesian inference that foundational models rely on today. With over 17,000 citations and a place in the top 0.75% of the most-cited scientists in AI, his ongoing work on reasoning calibration, reward modelling and explainability keeps our agentic systems out of black-box territory — grounded in provable safety and explainable logic.",
  },
};

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
    role: "Chief People Officer",
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
    question: "How do you ensure data privacy and security in projects?",
    answer:
      "We protect your sensitive data using strong encryption and strict access controls, ensuring only authorized team members can reach your systems. Our team follows proven cloud security practices and adheres strictly to top international standards like SOC 2, ISO 27001, HIPAA, and GDPR. By isolating project environments and actively monitoring risks, we keep your data safe at every step.",
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
