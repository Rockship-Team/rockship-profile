import type { LucideIcon } from "lucide-react";

export const companyData = {
  name: "InnovateAI",
  foundingDate: "2018",
  headquarters: "San Francisco, CA",
  field: "Artificial Intelligence",
  size: "150-200 Employees",
  description: "A pioneering force in applied artificial intelligence, transforming industries with data-driven insights and intelligent automation.",
  vision: "To be the catalyst for a new era of human-machine collaboration, making artificial intelligence an accessible and transformative tool for every organization worldwide.",
  mission: "Our mission is to deliver cutting-edge, ethical, and reliable AI solutions that solve complex business challenges, foster innovation, and create sustainable value for our clients, partners, and society.",
  coreValues: [
    { title: "Innovation", description: "We constantly push the boundaries of what's possible, exploring new ideas and technologies to create groundbreaking solutions.", icon: "Lightbulb" },
    { title: "Integrity", description: "We are committed to the highest ethical standards, ensuring transparency, fairness, and accountability in all our actions.", icon: "ShieldCheck" },
    { title: "Collaboration", description: "We believe in the power of partnership, working closely with our clients and each other to achieve shared goals.", icon: "Users" },
    { title: "Excellence", description: "We strive for excellence in everything we do, from the quality of our code to the success of our client engagements.", icon: "Award" },
    { title: "Impact", description: "We are focused on delivering measurable results and making a positive impact on the businesses and industries we serve.", icon: "TrendingUp" },
    { title: "Learning", description: "We foster a culture of continuous learning and curiosity, staying at the forefront of AI research and development.", icon: "BookOpen" }
  ],
  navigation: {
    products: [
      { title: "GenAI Platform", href: "/products/genai-platform", description: "Build and deploy generative AI applications." },
      { title: "Data Engine", href: "/products/data-engine", description: "Curate high-quality data for your models." },
      { title: "Rapid Annotation", href: "/products/rapid-annotation", description: "Annotate data at scale with AI assistance." },
      { title: "Synthetic Data", href: "/products/synthetic-data", description: "Generate high-quality synthetic data." },
      { title: "Model Evaluation", href: "/products/model-evaluation", description: "Evaluate and compare model performance." },
      { title: "Quality Assurance", href: "/products/quality-assurance", description: "Ensure the quality of your AI systems." },
      { title: "RLHF & Alignment", href: "/products/rlhf-alignment", description: "Align your models with human feedback." },
      { title: "Safety Evaluations", href: "/products/safety-evaluations", description: "Evaluate the safety of your AI models." },
    ],
    customers: [
      { title: "Case Studies", href: "/customers/case-studies", description: "See how leading companies are using our platform." },
      { title: "Success Stories", href: "/customers/success-stories", description: "Read stories from our satisfied customers." },
      { title: "Automotive", href: "/customers/industries/automotive", description: "AI solutions for the automotive industry." },
      { title: "Robotics", href: "/customers/industries/robotics", description: "Powering the next generation of robots." },
      { title: "E-commerce", href: "/customers/industries/e-commerce", description: "Enhance online shopping experiences with AI." },
      { title: "Defense", href: "/customers/industries/defense", description: "Advanced AI for defense and security." },
      { title: "Healthcare", href: "/customers/industries/healthcare", description: "Transforming healthcare with AI." },
      { title: "Finance", href: "/customers/industries/finance", description: "AI-driven insights for financial services." },
    ],
    resources: [
      { title: "Blog", href: "/resources/blog", description: "Latest news, updates, and insights." },
      { title: "Docs", href: "/resources/docs", description: "In-depth documentation for our products." },
      { title: "API Documentation", href: "/resources/api-docs", description: "Reference for our APIs." },
      { title: "Guides & Tutorials", href: "/resources/guides", description: "Learn how to use our platform." },
      { title: "Webinars & Events", href: "/resources/events", description: "Join us for live and on-demand events." },
      { title: "Research Publications", href: "/resources/research", description: "Read our latest research papers." },
      { title: "Community", href: "/resources/community", description: "Connect with other users and experts." },
      { title: "Press & Newsroom", href: "/resources/press", description: "Media resources and press releases." },
    ],
    company: [
      { title: "About Us", href: "/company/about", description: "Learn about our mission, vision, and team." },
      { title: "Leadership", href: "/company/leadership", description: "Meet the leaders of our company." },
      { title: "Investors", href: "/company/investors", description: "Information for our investors." },
      { title: "Mission & Vision", href: "/company/mission-vision", description: "Our guiding principles." },
      { title: "Diversity & Inclusion", href: "/company/diversity", description: "Our commitment to a diverse workforce." },
    ],
    legal: [
        { title: "Security", href: "/legal/security", description: ""},
        { title: "Privacy Policy", href: "/legal/privacy", description: ""},
        { title: "Terms of Use", href: "/legal/terms", description: ""},
        { title: "Responsible AI", href: "/legal/responsible-ai", description: ""},
        { title: "Modern Slavery Statement", href: "/legal/modern-slavery-statement", description: ""},
    ]
  },
  aiPlatforms: [
    { name: "Synapse", description: "An end-to-end machine learning operations (MLOps) platform that streamlines the entire ML lifecycle from data prep to model deployment and monitoring." },
    { name: "Cognition", description: "A natural language processing (NLP) and understanding suite for extracting insights from unstructured text, powering chatbots, and enabling sentiment analysis." },
    { name: "Visionary", description: "A comprehensive computer vision and image analysis toolkit for object detection, image recognition, and video analytics at scale." },
    { name: "Predictive Pulse", description: "A powerful predictive analytics and forecasting engine that helps businesses anticipate trends, optimize resources, and make proactive decisions." }
  ],
  industrySolutions: [
    { name: "Retail Automation", description: "Optimizing inventory, supply chain, and personalizing customer experiences for retailers through predictive analytics and computer vision." },
    { name: "Healthcare Intelligence", description: "Enhancing diagnostics, personalizing patient care, and streamlining hospital operations with advanced medical imaging and data analysis." },
    { name: "Financial Risk Analysis", description: "Providing advanced risk modeling, algorithmic trading strategies, and real-time fraud detection for the complex finance sector." },
    { name: "Manufacturing 4.0", description: "Improving production quality, implementing predictive maintenance, and optimizing factory floor operations with IoT and AI." }
  ],
  techStack: {
    "AI & ML": ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "Hugging Face", "OpenCV"],
    "Data & Backend": ["Python", "Go", "Kubernetes", "Docker", "PostgreSQL", "Apache Kafka", "Spark"],
    "Cloud & DevOps": ["Amazon Web Services", "Google Cloud Platform", "Microsoft Azure", "Terraform", "Ansible", "Jenkins"]
  },
  clients: ["QuantumLeap", "DataWeave", "FutureTech", "Synergy", "AlphaInc", "NextGen"],
  partners: ["CloudScale", "Innovate Hub", "AI Alliance", "TechForward"],
  achievements: [
    { value: "50+", label: "Fortune 500 Clients" },
    { value: "97%", label: "Client Satisfaction" },
    { value: "10x", label: "Average ROI Delivered" },
    { value: "Top 5", label: "AI Innovator Award 2023" }
  ],
  testimonials: [
    {
      quote: "InnovateAI's platform revolutionized our data processing pipeline. We've seen a 300% increase in efficiency and can now deliver insights faster than ever before. Their team is a pleasure to work with.",
      author: {
        name: "Jane Doe",
        title: "Head of Data Science",
        imageUrl: "https://picsum.photos/seed/jane/40/40",
      },
      company: "QuantumLeap",
    },
    {
      quote: "The computer vision capabilities of the Visionary toolkit are second to none. We've automated quality control on our manufacturing line, saving thousands of hours and reducing defects by over 80%.",
      author: {
        name: "John Smith",
        title: "CTO",
        imageUrl: "https://picsum.photos/seed/john/40/40",
      },
      company: "FutureTech",
    },
    {
      quote: "As a startup, we needed a scalable and reliable MLOps solution. Synapse provided exactly that, allowing our small team to manage a complex ML lifecycle with ease. It's been a game-changer for us.",
      author: {
        name: "Emily White",
        title: "CEO",
        imageUrl: "https://picsum.photos/seed/emily/40/40",
      },
      company: "Synergy",
    },
  ]
};

export type CoreValue = typeof companyData.coreValues[0];
