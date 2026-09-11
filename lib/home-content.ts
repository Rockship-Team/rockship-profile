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
  FaqPoint,
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
    body: "High-velocity engineering squads embedded directly within your engineering organization, GitHub/GitLab repositories, CI/CD pipelines, and sprint rituals. We deploy machine learning engineers, systems architects, and full-stack distributed systems engineers to accelerate your core roadmap with production-tested rigor. From custom foundational model fine-tuning (LoRA/QLoRA) to high-throughput data pipelines, we operate as a direct force-multiplier for your technical leadership.",
    terms: "Dedicated technical squads · Contractual 4-hour synchronous overlap · Quarterly roadmap commitment",
  },
  {
    index: "02",
    title: "AI-Native Product Pods",
    body: "Autonomous, cross-functional product organizations led by seasoned Product Managers, Machine Learning Engineers, Cloud Architects, and QA Automation Specialists. We assume complete operational and architectural ownership of your AI product domain — from technical discovery and systems design to continuous post-launch optimization, automated evaluation benchmarking, and compute efficiency scaling. We partner multi-year to continuously scale production throughput and maximize enterprise ROI.",
    terms: "Senior-led multidisciplinary squads · End-to-end product development, latency SLA & delivery ownership · 100% IP assignment",
    highlight: true,
  },
  {
    index: "03",
    title: "Production AI Sprints",
    body: "A mission-critical AI capability, multi-agent orchestration, or cognitive pipeline taken from initial systems architecture to live enterprise production in 4 to 8 weeks. Every deployment includes customized automated evaluation harnesses, deterministic input/output guardrails, low-latency model routing tiers, and complete enterprise compliance validation.",
    terms: "Fixed scope · Guaranteed production acceptance criteria · SOC 2 / HIPAA / GDPR verified",
  },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Production-tested by default",
    body: "Every system is architected, governed, and shipped by proven product and engineering leaders. Zero unvetted talent, zero outsourced staffing.",
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
    body: "Your repositories, your cloud infrastructure. All source code, fine-tuned model weights, proprietary datasets, and agentic workflows assign to you immediately upon delivery.",
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
    body: "Direct application or peer referral. Every candidate is evaluated by our technical directors — never non-technical recruiters. We filter for foundational computer science mastery, memory optimization, concurrency patterns, and production Git history.",
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
    body: "Our engineers and product leads embed directly with your executive stakeholders, analyze regulatory and business constraints in real time, and ship production code. Zero account-manager dilution, zero requirements lost in translation.",
  },
  {
    index: "02",
    title: "AI-native engineering discipline",
    body: "Automated evaluation harnesses, deterministic guardrails, and inference cost governance are foundational engineering standards here — not post-launch afterthoughts.",
  },
  {
    index: "03",
    title: "Institutional mentorship, proven ownership",
    body: "Shipping mission-critical systems and cultivating technical leaders are the same discipline. Emerging engineers and associate PMs execute under seasoned leads — advancing through structured production rubrics before leading client roadmaps.",
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
    question: "How do we engage, and how do we exit?",
    answer:
      "We structure partnerships around validated technical outcomes and production velocity, never commoditized headcount rental. Depending on your operational roadmap, we deploy under two primary engagement models:",
    points: [
      {
        label: "Fixed-Scope AI Delivery Sprints",
        text: "Concentrated 4- to 8-week production milestones designed to take an AI system from initial architecture to staging and live production deployment under contractually guaranteed acceptance criteria, latency thresholds, and evaluation benchmarks.",
      },
      {
        label: "Dedicated AI Product Pods",
        text: "Integrated, cross-functional squads — comprising a dedicated Product Lead, Senior Machine Learning Engineers, Full-Stack Developers, and QA Engineers — deployed on quarterly roadmap commitments to own technical domains end-to-end.",
      },
    ],
    secondaryAnswer:
      "Every engagement begins with a two-week paid discovery sprint embedded directly within your code repositories and communication channels. If we do not demonstrate exceptional technical velocity, architectural rigor, and cultural alignment during this period, you may terminate the engagement immediately with zero ongoing financial commitment and 100% exclusive ownership of all delivered architecture, configurations, and code.",
  },
  {
    question: "Are your systems thin API wrappers, or production-grade AI infrastructure?",
    answer:
      "We build deterministic, production-grade AI systems engineered to survive the scale, edge cases, and compliance audits of enterprise environments. While we leverage frontier foundational models, our primary value lies in the proprietary engineering layer that makes generative AI dependable in production:",
    points: [
      {
        label: "Dynamic Multi-Model Routing",
        text: "Powered by our internal infrastructure, we dynamically route queries across foundational, domain-specialized, and open-source models — optimizing for low latency, reasoning depth, and cost-per-token in real time.",
      },
      {
        label: "Coordinated Multi-Agent Orchestration",
        text: "We architect state-machine-driven multi-agent workflows with explicit task decomposition, deterministic hand-offs, and automated error-recovery loops — replacing brittle, single-shot prompts with verifiable execution graphs.",
      },
      {
        label: "Hybrid Retrieval-Augmented Generation (RAG)",
        text: "We construct multi-stage retrieval pipelines combining dense semantic vector embeddings, sparse lexical retrieval, and relational knowledge graphs to ground model outputs in verifiable enterprise data.",
      },
      {
        label: "Resilient Middleware",
        text: "Every deployment includes automated schema enforcement (Pydantic/Zod), semantic prompt caching to eliminate redundant token consumption, and continuous fallbacks to ensure zero user-facing service disruptions.",
      },
    ],
  },
  {
    question: "How does foundational scientific research inform your product engineering?",
    answer:
      "Unlike traditional development firms that rely entirely on generic public model APIs, Rockship’s technical architecture is grounded in foundational machine learning research.\nOur internal AI R&D Lab enables our engineering teams to:",
    points: [
      {
        text: "Calibrate model confidence scores to mathematically quantify uncertainty before an autonomous agent executes high-stakes decisions.",
      },
      {
        text: "Engineer explainable decision trees and transparent audit trails for mission-critical enterprise workflows.",
      },
      {
        text: 'Keep multi-agent reasoning out of uninterpretable "black-box" failure modes, ensuring provable safety and deterministic reliability in enterprise deployments.',
      },
    ],
  },
  {
    question: "Who owns the intellectual property, model weights, and custom datasets?",
    answer:
      "You retain 100% exclusive ownership of all intellectual property from day one. Because our engineers develop directly within your cloud infrastructure and GitHub/GitLab organizations, IP never resides on Rockship systems:",
    points: [
      {
        label: "Complete Asset Scope",
        text: "Your ownership encompasses all source code, fine-tuned model weights (e.g., LoRA and QLoRA adapters), proprietary vector embeddings, synthetic training datasets, custom data pipelines, and architectural system diagrams.",
      },
      {
        label: "Immediate Legal Assignment",
        text: "All intellectual property rights are assigned to your entity automatically upon creation under bilateral contract. We never retain, claim lien over, or reuse your proprietary domain logic.",
      },
      {
        label: "Clean Decommissioning",
        text: "On the exact date an engagement concludes, all access credentials, cryptographic tokens, and repository permissions are formally revoked and audited.",
      },
    ],
  },
  {
    question: "How do you benchmark accuracy, mitigate hallucinations, and govern token economics?",
    answer:
      "We treat generative AI quality with the same empirical discipline as high-reliability software engineering:",
    points: [
      {
        label: "Automated Evaluation Harnesses",
        text: "Before shipping any system to staging or production, we establish customized golden benchmark datasets. We run automated regression pipelines utilizing multi-metric evaluation frameworks and LLM-as-a-judge scoring to quantify domain-specific accuracy, contextual relevance, factual recall, and latency.",
      },
      {
        label: "Deterministic Production Guardrails",
        text: "We deploy automated input/output guardrail layers that execute strict JSON schema validation, regex PII masking, toxicity filtering, and prompt injection defense prior to model inference and before output rendering.",
      },
      {
        label: "Token Cost Governance & Compute Optimization",
        text: "We continuously profile cost-per-query. By implementing semantic prompt caching, model distillation (distilling large frontier models into high-speed, 8B/70B parameter open-source variants), and context-window optimization, we maintain linear, predictable compute budgets as your user traffic scales.",
      },
    ],
  },
  {
    question: "How do you guarantee enterprise data privacy and regulatory compliance?",
    answer:
      "We engineer AI solutions specifically for enterprises operating under rigorous international security and data protection frameworks, maintaining strict alignment with SOC 2 Type II, ISO 27001, HIPAA, and EU GDPR standards:",
    points: [
      {
        label: "Zero Data Retention (ZDR)",
        text: "For cloud API integrations, we configure and contractually enforce Zero Data Retention agreements, ensuring external model vendors never store, log, or cache your payload data.",
      },
      {
        label: "Zero Training on Enterprise Telemetry",
        text: "Your proprietary data, customer interactions, and system inputs are never used to train public or foundational models.",
      },
      {
        label: "Private VPC & On-Premise Deployments",
        text: "For clients with sovereign data constraints (financial services, healthcare, defense), we deploy state-of-the-art open-source foundational models (such as Llama, Mistral, and DeepSeek) entirely within your private VPC (AWS, GCP, Azure) or bare-metal on-premise clusters using secure containerized endpoints (vLLM/TGI), ensuring zero data egress outside your perimeter.",
      },
    ],
  },
  {
    question: "Can our agentic systems interact safely with existing enterprise databases and legacy APIs?",
    answer:
      "Yes. Deploying production AI requires bridging the gap between probabilistic language models and deterministic enterprise databases (PostgreSQL, MySQL, Snowflake, SAP, Salesforce, and proprietary internal REST/GraphQL endpoints).\nWe engineer safe, enterprise-grade tool-calling architectures that ensure:",
    points: [
      {
        label: "Governed Schema Mapping",
        text: "Dynamic generation of structured SQL queries and API payloads validated against strict data dictionaries before execution.",
      },
      {
        label: "Read/Write Permission Boundaries",
        text: "Autonomous agents are restricted to sandboxed read environments by default. Any write, update, or financial transaction requires deterministic validation rules or an explicit human-in-the-loop (HITL) approval gate.",
      },
      {
        label: "Transactional Rollbacks & Idempotency",
        text: "All state-changing actions are engineered with idempotent execution keys and automated rollback mechanisms, preventing database corruption or duplicated API calls in the event of upstream network failures.",
      },
    ],
  },
  {
    question: "How do you eliminate timezone friction across global teams?",
    answer:
      "We eliminate asynchronous communication bottlenecks by contractually guaranteeing a 4-hour daily synchronous working overlap with your core engineering and product leadership, regardless of your geography:",
    points: [
      {
        label: "Seamless Team Integration",
        text: "Our engineers and product leads integrate directly into your daily sprint rituals — participating in live standups, collaborating in Slack/Teams channels, and conducting real-time GitHub code reviews.",
      },
      {
        label: "Multi-Market Coverage",
        text: "We actively support enterprise partners across Silicon Valley (PST), New York (EST), London (GMT/CET), Singapore (SGT), and Tokyo (JST). Our overlapping sprint schedules ensure that technical blockers, pull requests, and architectural decisions are resolved synchronously within hours, preserving rapid continuous deployment velocity.",
      },
    ],
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
