export const companyData = {
  clients: [
    "QuantumLeap",
    "DataWeave",
    "FutureTech",
    "Synergy",
    "AlphaInc",
    "NextGen",
  ],
  partners: ["CloudScale", "Innovate Hub", "AI Alliance", "TechForward"],

  companyStats: [
    { value: "150+", label: "Enterprise Clients" },
    { value: "10+ Years", label: "Combined AI & Engineering Experience" },
    { value: "Multi-Industry", label: "Enterprise Deployments" },
  ],

  teamMembers: [
    {
      name: "Ngoc Tran",
      role: "CEO & Founder",
      image: "Ngoc.png",
    },
    {
      name: "Quan Do",
      role: "Head of Engineering",
      image: "Quan.png",
    },
  ],

  offices: [
    {
      city: "Rockship AI",
      street: "Asia-Pacific Operations",
    },
  ],
};

// Landing page data
export const heroData = {
  title: "Proven AI Impact",
  stats: [
    { label: "Workflow Automation", val: "60–70%" },
    { label: "System Uptime", val: "99.9%" },
    { label: "Enterprise Clients", val: "150+" },
  ],
};

export const platformData = {
  features: [
    {
      icon: "ClipboardList",
      title: "Manual-Heavy Operational Workflows",
      desc: "Core operational processes rely heavily on manual, repetitive tasks, slowing execution and increasing operational risk and cost.",
    },
    {
      icon: "FileStack",
      title: "Fragmented Systems & Data Silos",
      desc: "Operational data lives across disconnected systems, preventing end-to-end automation and creating delays in decision-making.",
    },
    {
      icon: "Hourglass",
      title: "Slow Internal Support & Operations Response",
      desc: "Internal support and operations teams struggle with growing request volumes due to manual triage and inefficient handoffs.",
    },
    {
      icon: "ScanEye",
      title: "Limited Real-Time Operational Visibility",
      desc: "Leaders lack real-time visibility into operations, resulting in reactive decisions instead of proactive control.",
    },
    {
      icon: "Coins",
      title: "High Operational Cost with Low Automation",
      desc: "Operations scale by adding headcount rather than systems, driving higher costs without proportional efficiency gains.",
    },
    {
      icon: "Users",
      title: "Scaling Operations Without Scaling Headcount",
      desc: "Enterprises face difficulty expanding operations while maintaining consistency, quality, and control across teams.",
    },
  ],
  uptimeSLA: "99.9%",
};

export const solutionsData = {
  solutions: [
    {
      icon: "ScanSearch",
      title: "Discover & Prioritize Operational Problems",
      desc: "We work with your stakeholders to understand real workflows, constraints, and operational bottlenecks — and identify where automation can create the highest business impact.",
      size: "large",
    },
    {
      icon: "DraftingCompass",
      title: "Design AI Systems Around Your Operations",
      desc: "We design AI systems that fit your existing processes, data, and governance model — ensuring reliability, compliance, and adoption from day one.",
      size: "standard",
    },
    {
      icon: "Network",
      title: "Build, Integrate, and Deploy in Production",
      desc: "We build production-ready systems and integrate them into your enterprise environment — with security, monitoring, and operational ownership clearly defined.",
      size: "standard",
    },
    {
      icon: "Gauge",
      title: "Operate, Optimize, and Scale",
      desc: "After deployment, we continuously monitor performance, expand automation coverage, and support scaling across teams, regions, and use cases.",
      size: "standard",
    },
  ],

  enterpriseFeatures: [
    {
      title: "Hybrid Deployment",
      desc: "On-prem, Cloud, or Air-gapped.",
    },
    {
      title: "Identity & Access Control",
      desc: "Enterprise SSO and role-based access.",
    },
    {
      title: "Legacy Integration",
      desc: "Works with existing enterprise systems.",
    },
    {
      title: "Operational Ownership",
      desc: "Clear ownership, monitoring, and ongoing support.",
    },
  ],

  complianceBadges: ["ISO 27001", "SOC2", "HIPAA", "GDPR", "FedRAMP High"],
};

export const techStackData = {
  frameworks: [
    "PyTorch",
    "TensorFlow",
    "JAX",
    "LangChain",
    "YOLO v8",
    "HuggingFace",
    "vLLM",
    "LlamaIndex",
  ],
  backend: [
    "FastAPI",
    "gRPC",
    "Next.js",
    "PostgreSQL",
    "ClickHouse",
    "Redis",
    "Qdrant",
    "ElasticSearch",
  ],
  ops: [
    "Kubernetes",
    "Docker",
    "Terraform",
    "Prometheus",
    "Grafana",
    "AWS SageMaker",
    "MLFlow",
    "Argocd",
  ],
  frontend: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Three.js",
    "Framer Motion",
    "Vite",
    "Zustand",
  ],
  mobile: ["React Native", "Expo", "SwiftUI", "Kotlin", "Flutter", "Capacitor"],
};

export const caseStudiesData = [
  {
    slug: "ai-loan-automation",
    type: "Case Studies",
    title:
      "Automated borrower engagement, document validation, and credit assessment — cutting loan approval time by up to 70%.",
    logoText: "AI Loan Automation for Microfinance",
    partner: "",
    industries: ["AI", "Fintech", "Microfinance", "Lending"],
    content: {
      executiveSummary:
        "Rockship partnered with a FinTech company in Indonesia to revolutionize their loan application process through AI-powered document processing and customer interaction systems. The solution increased loan officer productivity by 150%, reducing processing time from several weeks to just one week while maintaining quality standards.",
      challenge: {
        description:
          "The company faced significant operational inefficiencies in their loan application process:",
        painPoints: [
          "Limited Processing Capacity: Each loan officer could only handle 20 applications per week",
          "Extensive Documentation Requirements: Complex document submission processes",
          "Communication Bottlenecks: Continuous back-and-forth with applicants for missing information",
          "Manual Data Extraction: Time-intensive document review and data entry",
          "Delayed Approvals: Processing times stretched across several weeks",
        ],
        businessImpact: [
          "Reduced customer satisfaction due to lengthy approval times",
          "Limited growth potential due to processing constraints",
          "High operational costs relative to loan volume",
          "Missed opportunities for new product offerings",
        ],
      },
      solution: {
        description:
          "Rockship implemented an AI-driven loan processing system featuring:",
        components: [
          {
            title: "Intelligent Document Processing",
            details: [
              "Automated extraction and indexing of loan documents",
              "Data validation and verification systems",
              "Integration with existing company documentation standards",
            ],
          },
          {
            title: "AI-Powered Customer Interaction",
            details: [
              "Conversational AI agents with pre-configured question sets",
              "Proactive document collection prompts",
              "Real-time application status updates",
              "QR code accessibility for mobile-first experience",
            ],
          },
          {
            title: "CRM Integration & Product Recommendations",
            details: [
              "Seamless connection with the client's existing CRM system",
              "Intelligent loan product matching based on customer profiles",
              "Automated cross-selling and upselling opportunities",
            ],
          },
          {
            title: "Streamlined Officer Portal",
            details: [
              "Real-time application streaming to loan officers",
              "Pre-processed data packages for faster decision-making",
              "Integrated approval workflows",
            ],
          },
        ],
      },
      results:
        "The 150% increase in processing capacity, combined with dramatic time savings, positions the client for sustained growth while maintaining quality service standards.",
      implementation: {
        totalTime: "5 weeks",
        phases: [
          {
            phase: "Phase 1: Foundation (2 weeks)",
            details: [
              "Document extraction and indexing system deployment",
              "Integration with the client's existing loan document repository",
              "AI model training on company-specific requirements",
            ],
          },
          {
            phase: "Phase 2: Customer Interface (1 week)",
            details: [
              "Chatbot development and testing",
              "QR code deployment for easy customer access",
              "User experience optimization",
            ],
          },
          {
            phase: "Phase 3: System Integration (2 weeks)",
            details: [
              "CRM connectivity establishment",
              "Loan product recommendation engine configuration",
              "Officer portal integration and testing",
            ],
          },
        ],
      },
      outcomes: {
        quantitative: [
          "Applications per officer: Increased from 20 to 50+ → 2.5× productivity",
          "Processing time: Reduced from several weeks to 1 week → 70–85% faster",
          "Document collection: Shifted from manual follow-ups to automated prompts → 90% automation",
        ],
        qualitative: [
          {
            category: "Operational Excellence",
            details: [
              "Reduced manual workload for loan officers",
              "Improved data accuracy through automated extraction",
              "Enhanced compliance through consistent documentation",
            ],
          },
          {
            category: "Customer Experience",
            details: [
              "Faster application processing and approval times",
              "24/7 availability for document submission",
              "Transparent application status tracking",
              "Mobile-optimized interaction through QR codes",
            ],
          },
          {
            category: "Business Growth",
            details: [
              "Increased loan processing capacity",
              "Enhanced ability to serve new customer segments",
              "Improved cross-selling capabilities through AI recommendations",
              "Better resource allocation and staff productivity",
            ],
          },
        ],
      },
      successFactors: [
        {
          factor: "Technology Integration",
          points: [
            "Seamless integration with existing CRM systems",
            "Robust document processing capabilities",
            "User-friendly interface design",
            "Real impact if not resolved: Disjointed systems slow processing and reduce lead conversion.",
          ],
        },
        {
          factor: "Change Management",
          points: [
            "Comprehensive staff training on new systems",
            "Gradual rollout to ensure smooth transition",
            "Continuous support and optimization",
            "Real impact if not resolved: Low staff adoption causes delays, errors, and failed implementation.",
          ],
        },
        {
          factor: "Customer Adoption",
          points: [
            "Simple QR code access method",
            "Intuitive chatbot interactions",
            "Clear communication about process improvements",
            "Real impact if not resolved: Poor engagement leads to missed conversions and weak ROI.",
          ],
        },
      ],
      conclusion:
        "The partnership between Rockship and a FinTech company in Indonesia demonstrates the transformative potential of AI in microfinance operations. By automating document processing and customer interactions, the solution not only improved operational efficiency but also enhanced customer experience and business growth potential.",
      images: {
        hero: "/images/case-studies/ai-loan-automation/hero-main.png",
        solutionRender:
          "/images/case-studies/ai-loan-automation/microfinance-hub.png",
        architecture:
          "/images/case-studies/ai-loan-automation/architecture-diagram.png",
        implementation: [
          "/images/case-studies/ai-loan-automation/process-before.png",
          "/images/case-studies/ai-loan-automation/process-after.png",
        ],
        results: "/images/case-studies/ai-loan-automation/results-chart.png",
      },
    },
  },
  {
    slug: "ai-conversational-commerce",
    type: "Case Studies",
    title:
      "24/7 AI chatbot enabled product discovery, instant ordering, and automated support — driving 35% revenue growth and 140% ROI within 6 months.",
    logoText: "AI Conversational Commerce for B2B Food Distribution",
    partner: "B2B Food",
    industries: ["AI", "E-commerce", "Food Distribution", "B2B Sales"],
  },
  {
    slug: "ai-womens-wellness-coach",
    type: "Case Studies",
    title:
      "Culturally-aware AI coaching for female health, fitness, and lifestyle — improving goal achievement by up to 84% with privacy-first, 24/7 support.",
    logoText: "AI Women’s Wellness Coach Platform",
    partner: "",
    industries: ["AI", "HealthTech", "Wellness", "Lifestyle"],
  },
  {
    slug: "ai-finance-automation",
    type: "Case Studies",
    title:
      "Automated invoice processing, consolidated financial reporting, and settlement workflows — reducing manual operations by over 60% across clinic networks.",
    logoText: "AI Finance Automation for Multi-Branch Dental Clinics",
    partner: "",
    industries: ["AI", "HealthTech", "Dental Clinics", "Finance Automation"],
  },
  {
    slug: "ai-resident-support-automation",
    type: "Case Studies",
    title:
      "Centralized knowledge chatbot handling resident inquiries in real time — reducing manual workload by 92.5% and boosting response accuracy to 98%.",
    logoText: "AI Resident Support Automation for Property Management",
    partner: "",
    industries: ["AI", "PropTech", "Property Management", "Customer Support"],
  },
];

export const researchData = [
  {
    icon: "Network",
    category: "Architecture",
    title: "Liquid Neural Networks",
    description:
      "A new class of adaptive neural networks that can change their underlying structure during inference, reducing compute by 60%.",
  },
  {
    icon: "Microscope",
    category: "Healthcare",
    title: "Protein Folding at Scale",
    description:
      "Using diffusion models to predict protein structure variations in real-time for rapid drug discovery pipelines.",
  },
  {
    icon: "GraduationCap",
    category: "Alignment",
    title: "Constitutional AI Safety",
    description:
      "Frameworks for self-supervising AI models to ensure adherence to human values without massive human labeling.",
  },
];

export const buildAIData = {
  script: [
    { role: "user", text: "Why is human feedback essential for LLMs?" },
    {
      role: "ai",
      text: "RLHF (Reinforcement Learning from Human Feedback) aligns models with human intent, ensuring they are helpful, harmless, and honest.",
    },
    { role: "user", text: "How does Rockship help with this?" },
    {
      role: "ai",
      text: "We provide enterprise-grade data generation and expert human feedback loops to fine-tune your models effectively.",
    },
  ],
};

export const testimonialsData = [
  {
    id: "meta",
    logoName: "Meta",
    logoIcon: "InfinityIcon",
    quote:
      "We partnered with RockshipAI to work with Enterprises to adopt Llama and train custom models with their own data. We are excited to collectively make Llama the industry standard and bring the benefits of AI to everyone.",
    author: "Mark Zuckerberg",
    role: "Founder and CEO, Meta",
  },
  {
    id: "deepmind",
    logoName: "DeepMind",
    logoIcon: "Brain",
    quote:
      "RockshipAI's data engine has been instrumental in refining our reinforcement learning models, accelerating our path to AGI safely and efficiently.",
    author: "Demis Hassabis",
    role: "CEO, Google DeepMind",
  },
  {
    id: "eureka",
    logoName: "Eureka Labs",
    logoIcon: "Lightbulb",
    quote:
      "The quality of data labeling from RockshipAI is unmatched. It's the high-octane fuel that powers our educational models to reasoning capabilities we didn't think possible yet.",
    author: "Andrej Karpathy",
    role: "Founder, Eureka Labs",
  },
  {
    id: "nfdg",
    logoName: "nfdg",
    logoIcon: "PenTool",
    quote:
      "Speed and precision are everything in design. RockshipAI delivers the generative assets we need with a level of fidelity that creates entirely new creative workflows.",
    author: "Nat Friedman",
    role: "Partner, nfdg",
  },
];

export const whyUsData = [
  {
    title: "AI Native",
    description:
      "We don't just add AI to existing software. We rebuild workflows from the ground up with AI as the core engine.",
    icon: "BrainCircuit",
  },
  {
    title: "Production Ready",
    description:
      "Our solutions are not POCs. We build robust, scalable systems designed for high-availability enterprise environments.",
    icon: "Rocket",
  },
  {
    title: "Data Secure",
    description:
      "Your data is your IP. We deploy private models within your infrastructure with banking-grade security and compliance.",
    icon: "ShieldCheck",
  },
  {
    title: "Fast Implementation",
    description:
      "We move fast. From discovery to deployment in weeks, not months, delivering immediate ROI.",
    icon: "Zap",
  },
];
