import {
  caseStudiesData,
  companyData,
  heroData,
  platformData,
  researchData,
  solutionsData,
  techStackData,
  testimonialsData,
} from "../lib/data";

export interface KnowledgeItem {
  category: string;
  content: any;
  keywords: string[];
}

class KnowledgeBaseService {
  private knowledgeBase: KnowledgeItem[] = [];

  constructor() {
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase() {
    // Company Information
    this.knowledgeBase.push({
      category: "company",
      content: {
        ...companyData,
        description:
          "RockshipAI is an enterprise AI solutions company with 150+ clients, $50M Series A funding, and 40+ PhD researchers.",
      },
      keywords: [
        "company",
        "about",
        "team",
        "founding",
        "funding",
        "offices",
        "clients",
        "partners",
      ],
    });

    // Platform Features
    this.knowledgeBase.push({
      category: "platform",
      content: {
        ...platformData,
        description:
          "Our platform offers high-performance computing, data management, global deployment, model registry, AutoML, and real-time APIs with 99.9% uptime.",
      },
      keywords: [
        "platform",
        "features",
        "infrastructure",
        "computing",
        "data",
        "deployment",
        "api",
        "uptime",
      ],
    });

    // Solutions
    this.knowledgeBase.push({
      category: "solutions",
      content: {
        ...solutionsData,
        description:
          "We provide custom LLM deployment, computer vision, workflow orchestration, and conversational AI solutions for enterprises.",
      },
      keywords: [
        "solutions",
        "llm",
        "ai agents",
        "computer vision",
        "workflow",
        "automation",
        "multimodal",
      ],
    });

    // Technology Stack
    this.knowledgeBase.push({
      category: "tech",
      content: {
        ...techStackData,
        description:
          "Our tech stack includes PyTorch, TensorFlow, FastAPI, Kubernetes, React, and other cutting-edge technologies.",
      },
      keywords: [
        "technology",
        "tech stack",
        "frameworks",
        "backend",
        "frontend",
        "devops",
        "tools",
      ],
    });

    // Case Studies
    this.knowledgeBase.push({
      category: "case-studies",
      content: {
        items: caseStudiesData,
        description:
          "Partnered with Anthropic, Meta, Google, OpenAI, and Cohere on various AI initiatives and enterprise deployments.",
      },
      keywords: [
        "case studies",
        "partners",
        "anthropic",
        "meta",
        "google",
        "openai",
        "cohere",
        "success stories",
        "healthcare",
        "finance",
        "enterprise",
        "technology",
        "infrastructure",
        "generative ai",
      ],
    });

    // Research
    this.knowledgeBase.push({
      category: "research",
      content: {
        items: researchData,
        description:
          "Our research includes liquid neural networks, protein folding, and constitutional AI safety frameworks.",
      },
      keywords: [
        "research",
        "innovation",
        "liquid neural networks",
        "protein folding",
        "ai safety",
        "rlhf",
      ],
    });

    // Testimonials
    this.knowledgeBase.push({
      category: "testimonials",
      content: {
        items: testimonialsData,
        description:
          "Trusted by industry leaders from Meta, Google DeepMind, Eureka Labs, and nfdg.",
      },
      keywords: [
        "testimonials",
        "reviews",
        "customers",
        "mark zuckerberg",
        "demis hassabis",
        "andrej karpathy",
      ],
    });

    // Metrics
    this.knowledgeBase.push({
      category: "metrics",
      content: {
        heroStats: heroData.stats,
        companyStats: companyData.companyStats,
        description:
          "Processing 500M+ data points with 40% average accuracy improvement across 150+ enterprise clients.",
      },
      keywords: [
        "metrics",
        "stats",
        "numbers",
        "achievements",
        "performance",
        "results",
      ],
    });
  }

  public searchKnowledge(
    query: string
  ): { relevance: number; item: KnowledgeItem }[] {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower
      .split(/\s+/)
      .filter((word) => word.length > 2);

    const results = this.knowledgeBase.map((item) => {
      let relevanceScore = 0;

      // Check category match
      if (queryLower.includes(item.category)) {
        relevanceScore += 3;
      }

      // Check keyword matches
      queryWords.forEach((word) => {
        if (
          item.keywords.some((keyword) => keyword.toLowerCase().includes(word))
        ) {
          relevanceScore += 2;
        }
      });

      // Check content matches
      const contentStr = JSON.stringify(item.content).toLowerCase();
      queryWords.forEach((word) => {
        const occurrences = (contentStr.match(new RegExp(word, "g")) || [])
          .length;
        relevanceScore += Math.min(occurrences * 0.5, 2);
      });

      return {
        relevance: relevanceScore,
        item,
      };
    });

    // Sort by relevance and filter out irrelevant results
    return results
      .filter((result) => result.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3); // Return top 3 most relevant items
  }

  public formatKnowledgeForLLM(
    items: { relevance: number; item: KnowledgeItem }[]
  ): string {
    if (items.length === 0) return "";

    let formatted = "\n\nRelevant Knowledge Base Information:\n";

    items.forEach(({ item }, index) => {
      formatted += `\n${index + 1}. ${item.category.toUpperCase()}:\n`;

      switch (item.category) {
        case "company":
          formatted += this.formatCompanyInfo(item.content);
          break;
        case "platform":
          formatted += this.formatPlatformInfo(item.content);
          break;
        case "solutions":
          formatted += this.formatSolutionsInfo(item.content);
          break;
        case "tech":
          formatted += this.formatTechInfo(item.content);
          break;
        case "case-studies":
          formatted += this.formatCaseStudiesInfo(item.content);
          break;
        case "research":
          formatted += this.formatResearchInfo(item.content);
          break;
        case "testimonials":
          formatted += this.formatTestimonialsInfo(item.content);
          break;
        case "metrics":
          formatted += this.formatMetricsInfo(item.content);
          break;
        default:
          formatted += JSON.stringify(item.content, null, 2);
      }
    });

    return formatted;
  }

  private formatCompanyInfo(data: any): string {
    return `- Clients: ${data.clients.join(", ")}
- Partners: ${data.partners.join(", ")}
- Team: ${data.teamMembers.length} key members including ${data.teamMembers
      .map((m: any) => m.name)
      .join(", ")}
- Offices: ${data.offices.map((o: any) => o.city).join(", ")}
- Stats: ${data.companyStats
      .map((s: any) => `${s.value} ${s.label}`)
      .join(", ")}`;
  }

  private formatPlatformInfo(data: any): string {
    return `- Features: ${data.features.map((f: any) => f.title).join(", ")}
- Uptime SLA: ${data.uptimeSLA}`;
  }

  private formatSolutionsInfo(data: any): string {
    return `- Solutions: ${data.solutions.map((s: any) => s.title).join(", ")}
- Enterprise Features: ${data.enterpriseFeatures
      .map((f: any) => f.title)
      .join(", ")}
- Compliance: ${data.complianceBadges.join(", ")}`;
  }

  private formatTechInfo(data: any): string {
    return `- Frameworks: ${data.frameworks.join(", ")}
- Backend: ${data.backend.join(", ")}
- DevOps: ${data.ops.join(", ")}
- Frontend: ${data.frontend.join(", ")}`;
  }

  private formatCaseStudiesInfo(data: any): string {
    const items = data.items || [];
    // Return raw JSON so the LLM can copy the exact structure
    return items.map((item: any) => JSON.stringify(item)).join("\n");
  }

  private formatResearchInfo(data: any): string {
    const items = data.items || [];
    return `- Focus Areas: ${items.map((r: any) => r.title).join(", ")}`;
  }

  private formatTestimonialsInfo(data: any): string {
    const items = data.items || [];
    return `- From leaders at: ${items.map((t: any) => t.logoName).join(", ")}`;
  }

  private formatMetricsInfo(data: any): string {
    const parts = [];
    if (data.heroStats) {
      parts.push(
        `- Performance: ${data.heroStats
          .map((s: any) => `${s.val} ${s.label}`)
          .join(", ")}`
      );
    }
    if (data.companyStats) {
      parts.push(
        `- Company Growth: ${data.companyStats
          .map((s: any) => `${s.value} ${s.label}`)
          .join(", ")}`
      );
    }
    return parts.join("\n");
  }
}

export const knowledgeBase = new KnowledgeBaseService();
