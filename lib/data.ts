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
      name: "Son Vo",
      role: "Chief Operating Officer",
      image: "Son.png",
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
    content: {
      executiveSummary:
        "Rockship partnered with a premium Vietnamese food distributor to design and deploy a Vietnamese-language AI chatbot across web and messaging channels. This conversational commerce solution transformed their operations by automating product discovery, 24/7 support, and order placement, resulting in a 35% revenue increase and 140% ROI in the first year.",
      challenge: {
        description:
          "The organization, an 18-year-old premium food distributor, faced significant growth bottlenecks despite a strong market position:",
        painPoints: [
          "Limited Support Hours: Customer support was unavailable during peak late-night ordering times (8 PM – 8 AM), leading to $60K in annual lost revenue.",
          "Inefficient Product Discovery: 68% of users struggled to find products in a 1,200+ item catalog, resulting in a 45% cart abandonment rate.",
          "Manual Order Processing: Human resource limits capped order capacity at 75/day, causing delays and cancellations during peak demand.",
          "Friction-Heavy Ordering: Digital-first competitors were outperforming on responsiveness and ease of use.",
        ],
        businessImpact: [
          "$60,000 lost annual revenue from unserved after-hours demand",
          "$28,000 estimated monthly loss from abandoned carts",
          "Frequent order cancellations due to manual processing delays",
          "Competitive disadvantage against faster digital-native distributors",
        ],
      },
      solution: {
        description:
          "A comprehensive Vietnamese-language AI chatbot tailored for B2B food distribution workflows, structured into four core modules:",
        components: [
          {
            title: "Intelligent Product Discovery",
            details: [
              "Natural-language search supporting both Vietnamese and English",
              "Recipe-based queries allowing customers to find ingredients by dish names",
              "Advanced attributes filtering: origin, dietary requirements, and allergen specifications",
            ],
          },
          {
            title: "24/7 Automated Support",
            details: [
              "Instant AI-driven responses for product specs, pricing, and delivery logistics",
              "Seamless fallback to human agents for complex or high-value inquiries",
              "100% coverage of after-hours customer engagement",
            ],
          },
          {
            title: "Conversational Commerce Engine",
            details: [
              "End-to-end in-chat order placement with automated confirmation",
              "Real-time inventory validation to prevent backorders",
              "Integrated payment gateway for frictionless transactions",
            ],
          },
          {
            title: "Personalized Customer Experience",
            details: [
              "Recommendation engine based on individual purchase history",
              "Targeted promotions triggered by customer behavior and buying patterns",
              "Automated reorder reminders for high-frequency B2B customers",
            ],
          },
        ],
      },
      results:
        "Within six months, the AI chatbot successfully converted missed inquiries into revenue, removed manual bottlenecks, and enabled scalable growth, delivering a 140% ROI within the first year.",
      implementation: {
        totalTime: "6 months",
        phases: [
          {
            phase: "Months 1-2: Foundation & Sync",
            details: [
              "Basic chatbot architecture development",
              "Real-time product and inventory data synchronization",
              "Initial channel deployment (Web & Messaging)",
            ],
          },
          {
            phase: "Months 3-4: Intelligence & Commerce",
            details: [
              "AI search implementation and NLP fine-tuning for Vietnamese",
              "Conversational ordering workflow integration",
              "Payment gateway and inventory validation logic",
            ],
          },
          {
            phase: "Months 5-6: Refinement & Scale",
            details: [
              "Automation logic refinement based on real-world usage",
              "Advanced analytics and performance tracking setup",
              "Expansion of personalized recommendation features",
            ],
          },
        ],
      },
      outcomes: {
        quantitative: [
          "Revenue Growth: 35% increase ($192K → $259K per month)",
          "Conversion Rate: Increased from 23% → 34.5% (+50%)",
          "Response Time: Reduced from 4.2 hours → 23 seconds (99.4% faster)",
          "Automated Handling: 0% → 78% of queries handled without human intervention",
          "Staffing Efficiency: Support team reduced from 3 FTEs → 1 FTE",
          "Cart Abandonment: 45% → 18% (60% reduction)",
        ],
        qualitative: [
          {
            category: "Operational Efficiency",
            details: [
              "Removal of human resource bottlenecks in order processing",
              "100% coverage for after-hours demand and international clients",
              "Significant reduction in manual data entry and triage errors",
            ],
          },
          {
            category: "Customer Experience",
            details: [
              "Satisfaction score rose from 3.2/5 to 4.6/5",
              "Product discovery time reduced 77% (12 min → 2.8 min)",
              "Frictionless ordering experience similar to modern B2C platforms",
            ],
          },
          {
            category: "Business Strategy",
            details: [
              "Customer retention increased 8 percentage points (87% → 94%)",
              "Scalable growth path without linear headcount increases",
              "Improved competitiveness in the $3.2B food distribution market",
            ],
          },
        ],
      },
      successFactors: [
        {
          factor: "Localization & NLP",
          points: [
            "High-accuracy Vietnamese NLP tuned for industry-specific terminology",
            "Handling of colloquialisms and recipe-based search intents",
          ],
        },
        {
          factor: "Deep Integration",
          points: [
            "Seamless connection to existing inventory and CRM systems",
            "Real-time data parity across multiple chat channels",
          ],
        },
        {
          factor: "Automated Commerce",
          points: [
            "Complete order-to-payment cycle within the chat interface",
            "Automated validation rules ensuring data quality and order accuracy",
          ],
        },
      ],
      conclusion:
        "This case demonstrates how conversational AI can transform traditional food distribution by converting missed inquiries into revenue and enabling scalable growth. The results are definitive: +35% revenue growth, -55% operational cost, and 140% ROI within the first year.",
      images: {
        hero: "/images/case-studies/ai-conversational-commerce/hero-main.png",
        challenge:
          "/images/case-studies/ai-conversational-commerce/challenge.png",
        solutionRender:
          "/images/case-studies/ai-conversational-commerce/solution-overview.png",
        results:
          "/images/case-studies/ai-conversational-commerce/results-metrics.png",
      },
    },
  },
  {
    slug: "ai-womens-wellness-coach",
    type: "Case Studies",
    title:
      "Culturally-aware AI coaching for female health, fitness, and lifestyle — improving goal achievement by up to 84% with privacy-first, 24/7 support.",
    logoText: "AI Women’s Wellness Coach Platform",
    partner: "",
    industries: ["AI", "HealthTech", "Wellness", "Lifestyle", "Women's Health"],
    content: {
      executiveSummary:
        "Vietnam's women's health market is booming, valued at $187 million in 2023 and projected to reach $512 million by 2030 (15.8% CAGR). Rockship partnered to design and build a female-exclusive, AI-powered wellness coaching platform that addresses the unique barriers Vietnamese women face: limited access to female fitness trainers (1 per 4,200 women), cultural constraints around mixed-gender environments (73% report discomfort), and the lack of culturally-sensitive health guidance.",
      challenge: {
        description:
          "Vietnamese women faced significant barriers to culturally-appropriate fitness guidance:",
        painPoints: [
          "Female-Specific Health Ignorance: Generic platforms ignored women's unique physiological needs, hormonal cycles, pregnancy considerations, and post-childbirth recovery within Vietnamese cultural context",
          "Cultural Sensitivity Void: International fitness platforms failed to understand Vietnamese women's cultural constraints around exercise clothing, family expectations, and traditional beauty standards",
          "Safe Space Absence: Women needed judgment-free environments for sensitive discussions about body image and intimate health topics, but existing platforms lacked necessary privacy and cultural understanding",
          "Work-Life Balance Integration: Busy Vietnamese women juggling careers, family duties, and social expectations needed fitness solutions that fit into their complex schedules, but existing platforms offered rigid programs",
        ],
        businessImpact: [
          "Female-Specific Trainer Shortage: Only 1 female certified fitness trainer per 4,200 women in major cities",
          "Cultural Constraints: 73% of Vietnamese women report discomfort with mixed-gender gym environments",
          "Economic Barriers: Premium personal training costs (1.2M VND/session) remain beyond reach for most women",
          "Knowledge Gap: Fitness content rarely addresses female-specific concerns within Vietnamese cultural context",
        ],
      },
      solution: {
        description:
          "Rockship partnered to design and build a female-exclusive, AI-powered wellness coaching platform, structured around three core AI capabilities:",
        components: [
          {
            title: "Female-Centric Personal Assessment Engine",
            details: [
              "Problem Solved: Lack of personalized fitness guidance addressing Vietnamese women's unique physiological and cultural needs",
              "Advanced conversational AI conducts comprehensive female-specific assessments, gathering data including menstrual cycle patterns, pregnancy status, body image concerns, family responsibilities, and cultural constraints",
              "Empathetic Vietnamese-language processing ensures culturally-appropriate communication",
              "Assessment data feeds into female-specific plan generation that adapts to hormonal cycles, life stages, and Vietnamese women's lifestyle realities",
            ],
          },
          {
            title: "Vietnamese Women's Lifestyle Integration AI",
            details: [
              "Problem Solved: Western-centric fitness advice that ignores Vietnamese women's cultural roles and available resources",
              "Maintains extensive databases of Vietnamese dietary preferences, home-based exercise solutions, and cultural wellness practices",
              "Generates meal plans using familiar ingredients while considering women's dual role as family nutritionists",
              "Adapts recommendations based on family schedules, cultural festivals, traditional Vietnamese women's health practices, and seasonal lifestyle changes",
            ],
          },
          {
            title: "24/7 Empathetic Support & Female Community Building",
            details: [
              "Problem Solved: Lack of accessible, judgment-free support for women's intimate health and fitness concerns",
              "Conversational AI provides round-the-clock emotional support and answers sensitive women's health questions with cultural sensitivity",
              "Tracks progress through female-specific metrics beyond just weight",
              "Connects with women's natural cycles, family events, and cultural celebrations to provide contextually-appropriate support and motivation",
            ],
          },
        ],
      },
      results:
        "The AI-driven platform delivered tangible improvements in women's wellness outcomes, achieving 92% user satisfaction through culturally-aware, female-focused guidance and creating a 24/7 safe space for confidential health discussions.",
      implementation: {
        totalTime: "8 weeks",
        phases: [
          {
            phase: "Phase 1: Assessment Engine Development (3 weeks)",
            details: [
              "Female-specific assessment questionnaire design with Vietnamese cultural considerations",
              "Vietnamese-language NLP model training for empathetic communication",
              "Integration of hormonal cycle tracking and life stage adaptation logic",
            ],
          },
          {
            phase: "Phase 2: Lifestyle Integration AI (3 weeks)",
            details: [
              "Vietnamese dietary database creation with female-specific nutritional guidance",
              "Home-based exercise library development suitable for Vietnamese living environments",
              "Cultural calendar integration for festivals and family events",
            ],
          },
          {
            phase: "Phase 3: Support System & Launch (2 weeks)",
            details: [
              "24/7 empathetic chatbot deployment with sensitive topic handling",
              "Female community features and privacy-first architecture implementation",
              "User testing with Vietnamese women focus groups and platform optimization",
            ],
          },
        ],
      },
      outcomes: {
        quantitative: [],
        qualitative: [
          {
            category: "Privacy-First Women's Health",
            details: [
              "Confidential chatbot format for exploring sensitive topics like postpartum fitness and body confidence",
              "Judgment-free environment for intimate health concerns discussions",
              "Cultural sensitivity in addressing Vietnamese women's specific health questions",
            ],
          },
          {
            category: "Family-Integrated Wellness",
            details: [
              "Sustainable routines that enhance women's roles as family health leaders",
              "Balance between personal well-being and family responsibilities",
              "Meal planning that serves both individual fitness goals and family nutrition needs",
            ],
          },
          {
            category: "Cultural Relevance",
            details: [
              "Respect for traditional Vietnamese beauty standards and health practices",
              "Adaptation to family expectations and social norms",
              "Integration with cultural festivals and seasonal lifestyle changes",
            ],
          },
        ],
      },
      successFactors: [
        {
          factor: "Cultural Intelligence",
          points: [
            "Deep understanding of Vietnamese women's cultural constraints and expectations",
            "Empathetic Vietnamese-language processing for sensitive topics",
            "Integration of traditional wellness practices with modern fitness science",
            "Real impact if not resolved: Platform rejection due to cultural misalignment and insensitivity",
          ],
        },
        {
          factor: "Female-Centric Design",
          points: [
            "Comprehensive consideration of women's physiological needs including hormonal cycles",
            "Life stage adaptation from young professionals to postpartum mothers",
            "Privacy-first architecture for sensitive health discussions",
            "Real impact if not resolved: Generic advice fails to address women's unique health requirements",
          ],
        },
        {
          factor: "Accessibility & Convenience",
          points: [
            "24/7 availability replacing expensive personal training sessions",
            "Home-based exercise solutions suitable for Vietnamese living spaces",
            "Mobile-first design for busy women juggling multiple responsibilities",
            "Real impact if not resolved: Low adoption due to inconvenience and inaccessibility",
          ],
        },
      ],
      conclusion:
        "The partnership between Rockship and the wellness platform demonstrates the transformative potential of culturally-intelligent AI in addressing underserved market needs. By creating a female-exclusive, privacy-first wellness solution that respects Vietnamese cultural values while delivering personalized health guidance, the platform has successfully bridged the gap between modern fitness science and traditional expectations, achieving exceptional user satisfaction and goal achievement rates.",
      images: {
        hero: "/images/case-studies/ai-womens-wellness-coach/hero-main.png",
        challenge:
          "/images/case-studies/ai-womens-wellness-coach/challenge.png",
        results: "/images/case-studies/ai-womens-wellness-coach/results.png",
        solutionRender:
          "/images/case-studies/ai-womens-wellness-coach/platform-overview.png",
        architecture:
          "/images/case-studies/ai-womens-wellness-coach/architecture-diagram.png",
        implementation: [
          "/images/case-studies/ai-womens-wellness-coach/assessment-flow.png",
          "/images/case-studies/ai-womens-wellness-coach/lifestyle-integration.png",
        ],
      },
    },
  },
  {
    slug: "ai-finance-automation",
    type: "Case Studies",
    title:
      "Automated invoice processing, consolidated financial reporting, and settlement workflows — reducing manual operations by over 60% across clinic networks.",
    logoText: "AI Finance Automation for Multi-Branch Dental Clinics",
    partner: "",
    industries: ["AI", "HealthTech", "Dental Clinics", "Finance Automation"],
    content: {
      executiveSummary:
        "Every month, a multi-branch dental clinic group in Singapore spent 3–4 days manually consolidating financial data from WhatsApp messages into Excel. Rockship designed an AI-powered system that kept WhatsApp as the front door and automated everything downstream, transforming a messy, error-prone process into a structured data pipeline.",
      challenge: {
        description:
          "The clinic was caught in a classic scale trap where manual processes that worked for three branches were breaking under the weight of eight:",
        painPoints: [
          "Manual Consolidation: 3–4 days spent monthly on manual data entry from chat messages",
          "Deciphering Obstacles: Staff had to download and decipher handwriting from photos of deposit slips",
          "Error-Prone Entry: Double-digit error rates from misread handwriting and duplicate entries",
          "Audit Blindness: Zero audit trail with documents buried in chat threads",
          "Scaling Friction: Each new branch multiplied the operational chaos",
        ],
        businessImpact: [
          "Delayed financial visibility for leadership",
          "Increased operational risk from data inaccuracies",
          "Finance teams buried in admin work instead of strategic analysis",
          "Inability to scale the business without adding significant overhead",
        ],
      },
      solution: {
        description:
          "Rockship built an end-to-end AI workflow that transformed WhatsApp into a structured data pipeline without changing staff behavior:",
        components: [
          {
            title: "Frictionless Data Capture",
            details: [
              "Staff continue using WhatsApp as their primary interface",
              "Messages flow automatically into the system via WhatsApp Business API",
              "Zero adoption friction for branch teams",
            ],
          },
          {
            title: "Intelligent OCR & LLM Parsing",
            details: [
              "OCR extracts text from images of deposit slips and invoices",
              "LLM-based parser classifies documents (Deposit, Deduction, Invisalign, Implant)",
              "Context-aware validation flags anomalies and recognizes handwritten transaction types",
            ],
          },
          {
            title: "Automated Routing & Compliance",
            details: [
              "Original documents automatically archived to Google Drive for audit compliance",
              "Extracted data routes to the correct Google Sheets templates based on classification",
              "Established clear digital audit trails for every transaction",
            ],
          },
          {
            title: "Consolidated Master Reporting",
            details: [
              "Sub-branch files feed into a master Settlement Sheet automatically",
              "System auto-generates month-end PDF reports",
              "Automated drafting of settlement emails via Gmail API for final approval",
            ],
          },
        ],
      },
      results:
        "The system transformed monthly reporting from a 4-day ordeal into a sub-4-hour automated process, achieving 95% time savings and near-perfect accuracy while enabling instant scalability for new branches.",
      implementation: {
        totalTime: "4 weeks",
        phases: [
          {
            phase: "Phase 1: Ingestion & Extraction",
            details: [
              "WhatsApp Business API integration for data flow",
              "OCR engine setup for document image text extraction",
              "Implementation of document archival to Google Drive",
            ],
          },
          {
            phase: "Phase 2: Intelligent Logic",
            details: [
              "LLM parser training for document classification",
              "Field validation and anomaly detection logic",
              "Mapping data extraction to Google Sheets templates",
            ],
          },
          {
            phase: "Phase 3: Automation & Reporting",
            details: [
              "Automation of master settlement sheet consolidation",
              "PDF report generation and Gmail API integration",
              "Final decision-point dashboard for human oversight",
            ],
          },
        ],
      },
      outcomes: {
        quantitative: [
          "Reduction in manual entry: 90% time savings",
          "Error rate: Reduced from double digits to <1%",
          "Reporting speed: 3–4 days → <4 hours (95% improvement)",
          "Scalability: New branches onboarded in minutes, not days",
        ],
        qualitative: [
          {
            category: "Strategic Shift",
            details: [
              "Finance teams moved from data entry to strategic analysis",
              "Leadership gained a single source of truth for decision-making",
            ],
          },
          {
            category: "Operational Visibility",
            details: [
              "Branch managers gained real-time performance visibility",
              "Full audit readiness with 100% structured data",
            ],
          },
        ],
      },
      successFactors: [
        {
          factor: "Workflow Preservation",
          points: [
            "Kept WhatsApp as the 'front door' to eliminate adoption friction",
            "Automated everything downstream without changing staff habits",
          ],
        },
        {
          factor: "AI Intelligence",
          points: [
            "Handled messy, real-world data and handwritten notes effectively",
            "Used LLMs for complex classification that traditional OCR can't handle",
          ],
        },
      ],
      conclusion:
        "By meeting teams where they already work (WhatsApp) and applying intelligent automation, the clinic group turned operational chaos into a competitive advantage. Adding new branches no longer means adding chaos; it now means adding predictable, automated growth.",
      images: {
        hero: "/images/case-studies/ai-finance-automation/hero-main.png",
        challenge: "/images/case-studies/ai-finance-automation/challenge.png",
        solutionRender:
          "/images/case-studies/ai-finance-automation/pipeline.png",
        results: "/images/case-studies/ai-finance-automation/impact.png",
      },
    },
  },
  {
    slug: "ai-resident-support-automation",
    type: "Case Studies",
    title:
      "Centralized knowledge chatbot handling resident inquiries in real time — reducing manual workload by 92.5% and boosting response accuracy to 98%.",
    logoText: "AI Resident Support Automation for Property Management",
    partner: "",
    industries: ["AI", "PropTech", "Property Management", "Customer Support"],
    content: {
      executiveSummary:
        "Modern residential buildings increasingly rely on digital channels to communicate with residents. However, most property management teams still handle inquiries manually through fragmented tools such as messaging apps, phone calls, and spreadsheets. To address these challenges, an AI-powered chatbot solution was designed to centralize knowledge, automate routine inquiries, and provide residents with instant, accurate information around the clock.",
      challenge: {
        description:
          "Like many residential property management firms in Vietnam, the organization faced a systemic and recurring problem: residents struggled to access clear, timely information, while management teams were overwhelmed by avoidable, repetitive inquiries.",
        painPoints: [
          "Fragmented Information Sources: Residents relied on scattered and often outdated information from notice boards, chat histories, PDFs, and verbal instructions.",
          "Operational Overload on Management Teams: Property staff spent a disproportionate amount of time answering the same routine questions, resulting in inefficiencies and higher costs.",
          "Lack of Centralized Data Infrastructure: Without a single source of truth, internal tools and processes became fragmented and inconsistent, limiting scalability.",
        ],
        businessImpact: [
          "Reduced resident satisfaction due to delayed responses and inconsistent information",
          "Higher operational costs and increased risk of disputes",
          "Increased staff burnout due to repetitive, low-value workload",
          "Limited long-term service quality and scaling potential",
        ],
      },
      solution: {
        description:
          "Rockship partnered to design and deploy an AI-powered chatbot for residential property management, purpose-built to address information access and communication challenges. The solution is an intelligent, conversational interface powered by Natural Language Processing (NLP) connected to a centralized, verified knowledge base.",
        components: [
          {
            title: "Instant Access & Real-time Support",
            details: [
              "Residents receive real-time answers to common questions about building regulations and policies.",
              "24/7 availability eliminates waiting times and meets modern expectations for speed.",
              "Provides immediate guidance on amenity booking procedures and service guidelines.",
            ],
          },
          {
            title: "Centralized Knowledge Base",
            details: [
              "Single source of truth containing all apartment-specific data and FAQs.",
              "Reduces human error and ensuring consistent, reliable information across all resident touchpoints.",
              "Improves clarity around rules and procedures, strengthening trust between residents and management.",
            ],
          },
          {
            title: "Rapid Deployment Engine",
            details: [
              "Typically completed within two weeks, allowing quick realization of value.",
              "Scalable architecture designed for rapid rollout across multiple residential properties.",
              "Minimal disruption to existing property management workflows during implementation.",
            ],
          },
        ],
      },
      results:
        "The AI chatbot transformed resident communication, delivering a 92.5% reduction in routine workload and saving 560 hours of staff time monthly, while elevating information accuracy to a verifiable 98%.",
      implementation: {
        totalTime: "2 weeks",
        phases: [
          {
            phase: "Week 1: Knowledge Consolidation",
            details: [
              "Gathering and centralizing all building regulations, FAQs, and policies",
              "Cleaning and structuring data for AI knowledge base integration",
              "Initial NLP model configuration for apartment-specific terminology",
            ],
          },
          {
            phase: "Week 2: Deployment & Optimization",
            details: [
              "Chatbot interface integration with building communication channels",
              "Testing for accuracy and response consistency",
              "Staff training and final rollout to residents",
            ],
          },
        ],
      },
      outcomes: {
        quantitative: [
          "Staff Time Saved: 560 hours/month (92.5% reduction in routine workload)",
          "Manual Intervention: Reduced from 100% to only 15% of queries",
          "Information Accuracy: Elevated from ~70% to a verifiable 98%",
          "Resident Time Saved: 2,190+ hours/month through instant self-service",
        ],
        qualitative: [
          {
            category: "Resident Experience",
            details: [
              "Instant, transparent access to building rules and amenities",
              "Reduced frustration through 24/7 availability and zero waiting times",
              "Enhanced trust in management through consistent, accurate information",
            ],
          },
          {
            category: "Operational Excellence",
            details: [
              "Teams focus on complex cases and proactive property maintenance",
              "Improved staff morale and reduced burnout from repetitive questions",
              "Stronger operational foundation for scaling property management services",
            ],
          },
        ],
      },
      successFactors: [
        {
          factor: "Knowledge Centralization",
          points: [
            "Creating a verified 'single source of truth' for all building information",
            "Ensuring data is kept updated and consistent across all channels",
          ],
        },
        {
          factor: "Ease of Access",
          points: [
            "Meeting residents where they are (mobile-first, instant interfaces)",
            "Reducing friction in booking and information retrieval",
          ],
        },
      ],
      conclusion:
        "This case demonstrates how AI chatbots can fundamentally transform residential property management by replacing fragmented, staff-dependent communication with centralized, system-driven resident support. The result is a scalable, efficient operation that delivers faster responses and a significantly improved resident experience without increasing headcount.",
      images: {
        hero: "/images/case-studies/ai-resident-support-automation/hero-main.png",
        challenge:
          "/images/case-studies/ai-resident-support-automation/challenge.png",
        solutionRender:
          "/images/case-studies/ai-resident-support-automation/solution-overview.png",
        results:
          "/images/case-studies/ai-resident-support-automation/impact.png",
      },
    },
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
    title: "Data Security",
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
