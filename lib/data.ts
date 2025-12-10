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
    { value: "40+", label: "PhD Researchers" },
    { value: "$50M", label: "Series A Funding" },
    { value: "3", label: "Global Offices" }
  ],

  teamMembers: [
    {
      name: "Elena Ross",
      role: "Chief Scientist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "David Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
    }
  ],

  offices: [
    {
      city: "San Francisco HQ",
      street: "Foundry St."
    }
  ]
};

// Landing page data
export const heroData = {
  stats: [
    { label: "Enterprises", val: "150+" },
    { label: "Data Points", val: "500M+" },
    { label: "Accuracy", val: "40%+" },
    { label: "Uptime", val: "99.9%" }
  ]
};

export const platformData = {
  features: [
    {
      icon: "Cpu",
      title: "High Performance Computing",
      desc: "Leverage GPU clusters and distributed computing for faster model training and inference."
    },
    {
      icon: "Database",
      title: "Data Management",
      desc: "Unified data lake with automated pipelines for preprocessing, versioning, and governance."
    },
    {
      icon: "Globe",
      title: "Global Deployment",
      desc: "Deploy models across multiple regions with built-in CDN and edge computing capabilities."
    },
    {
      icon: "Layers",
      title: "Model Registry",
      desc: "Centralized repository for model versioning, metadata tracking, and lifecycle management."
    },
    {
      icon: "Settings",
      title: "AutoML & Tuning",
      desc: "Automated hyperparameter optimization and neural architecture search for optimal performance."
    },
    {
      icon: "Rocket",
      title: "Real-time APIs",
      desc: "Scalable REST and GraphQL APIs with sub-second latency and built-in rate limiting."
    }
  ],
  uptimeSLA: "99.9%"
};

export const solutionsData = {
  solutions: [
    {
      icon: "Brain",
      title: "Custom LLM & AI Agent Deployment",
      desc: "Design and deploy custom LLM-powered agents, RAG systems, and enterprise AI workflows — optimized for your data, security, and operations.",
      size: "large"
    },
    {
      icon: "Eye",
      title: "Computer Vision & Document AI Systems",
      desc: "Implement computer vision solutions for document processing, inspection, and anomaly detection — integrated directly into enterprise workflows.",
      size: "standard"
    },
    {
      icon: "GitBranch",
      title: "AI Workflow Orchestration & Automation",
      desc: "Orchestrate AI agents, models, and business logic into end-to-end automated workflows across sales, operations, and internal systems.",
      size: "standard"
    },
    {
      icon: "Mic",
      title: "Conversational & Multimodal AI Solutions",
      desc: "Deploy voice, chat, and multimodal AI assistants for customer support, internal operations, and decision support.",
      size: "standard"
    }
  ],

  enterpriseFeatures: [
    {
      title: "Hybrid Deployment",
      desc: "On-prem, Cloud, or Air-gapped."
    },
    {
      title: "SSO & RBAC",
      desc: "Granular access control policies."
    },
    {
      title: "Legacy Integration",
      desc: "Connectors for SAP, Salesforce, & Oracle."
    },
    {
      title: "24/7 Support",
      desc: "Dedicated engineering response teams."
    }
  ],

  complianceBadges: ["ISO 27001", "SOC2", "HIPAA", "GDPR", "FedRAMP High"]
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
    "LlamaIndex"
  ],
  backend: [
    "FastAPI",
    "gRPC",
    "Next.js",
    "PostgreSQL",
    "ClickHouse",
    "Redis",
    "Qdrant",
    "ElasticSearch"
  ],
  ops: [
    "Kubernetes",
    "Docker",
    "Terraform",
    "Prometheus",
    "Grafana",
    "AWS SageMaker",
    "MLFlow",
    "Argocd"
  ],
  frontend: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Three.js",
    "Framer Motion",
    "Vite",
    "Zustand"
  ],
  mobile: [
    "React Native",
    "Expo",
    "SwiftUI",
    "Kotlin",
    "Flutter",
    "Capacitor"
  ]
};

export const caseStudiesData = [
  {
    type: "Partner",
    title: "Anthropic Partners with Rockship to Bring Generative AI to Enterprises",
    logoText: "ANTHROPIC",
    partner: "Anthropic"
  },
  {
    type: "Partner",
    title: "Meta and Rockship Partner to Drive Enterprise Adoption of Llama",
    logoText: "Meta",
    partner: "Meta"
  },
  {
    type: "Case Studies",
    title: "Customer Case Study: Cohere - Scaling Fine-tuning Infrastructure",
    logoText: "cohere",
    partner: "Cohere"
  },
  {
    type: "Blog",
    title: "Rockship's Expert-in-the-Loop Platform for LLM Evaluation",
    logoText: "OpenAI",
    partner: "OpenAI"
  },
  {
    type: "Research",
    title: "Advancing State-of-the-Art in RLHF with PPO and DPO",
    logoText: "Google",
    partner: "Google"
  }
];

export const researchData = [
  {
    icon: "Network",
    category: "Architecture",
    title: "Liquid Neural Networks",
    description: "A new class of adaptive neural networks that can change their underlying structure during inference, reducing compute by 60%."
  },
  {
    icon: "Microscope",
    category: "Healthcare",
    title: "Protein Folding at Scale",
    description: "Using diffusion models to predict protein structure variations in real-time for rapid drug discovery pipelines."
  },
  {
    icon: "GraduationCap",
    category: "Alignment",
    title: "Constitutional AI Safety",
    description: "Frameworks for self-supervising AI models to ensure adherence to human values without massive human labeling."
  }
];

export const buildAIData = {
  script: [
    { role: "user", text: "Why is human feedback essential for LLMs?" },
    {
      role: "ai",
      text: "RLHF (Reinforcement Learning from Human Feedback) aligns models with human intent, ensuring they are helpful, harmless, and honest."
    },
    { role: "user", text: "How does Rockship help with this?" },
    {
      role: "ai",
      text: "We provide enterprise-grade data generation and expert human feedback loops to fine-tune your models effectively."
    }
  ]
};

export const testimonialsData = [
  {
    id: "meta",
    logoName: "Meta",
    logoIcon: "InfinityIcon",
    quote: "We partnered with RockshipAI to work with Enterprises to adopt Llama and train custom models with their own data. We are excited to collectively make Llama the industry standard and bring the benefits of AI to everyone.",
    author: "Mark Zuckerberg",
    role: "Founder and CEO, Meta"
  },
  {
    id: "deepmind",
    logoName: "DeepMind",
    logoIcon: "Brain",
    quote: "RockshipAI's data engine has been instrumental in refining our reinforcement learning models, accelerating our path to AGI safely and efficiently.",
    author: "Demis Hassabis",
    role: "CEO, Google DeepMind"
  },
  {
    id: "eureka",
    logoName: "Eureka Labs",
    logoIcon: "Lightbulb",
    quote: "The quality of data labeling from RockshipAI is unmatched. It's the high-octane fuel that powers our educational models to reasoning capabilities we didn't think possible yet.",
    author: "Andrej Karpathy",
    role: "Founder, Eureka Labs"
  },
  {
    id: "nfdg",
    logoName: "nfdg",
    logoIcon: "PenTool",
    quote: "Speed and precision are everything in design. RockshipAI delivers the generative assets we need with a level of fidelity that creates entirely new creative workflows.",
    author: "Nat Friedman",
    role: "Partner, nfdg"
  }
];

