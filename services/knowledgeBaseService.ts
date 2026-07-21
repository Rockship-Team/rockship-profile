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

export interface KnowledgeMatch {
  /** Total score, used only for ranking. */
  relevance: number;
  /**
   * Score from category-name and keyword hits. Content hits are deliberately
   * excluded: a stray substring inside a serialised blob is not evidence that
   * the question is about us, so it must not be able to open the scope gate on
   * its own. `anchor > 0` is what `isOnTopic` tests.
   */
  anchor: number;
  item: KnowledgeItem;
}

// Tokens shorter than the minimum length that still carry meaning here.
const SHORT_TOKENS = new Set(["ai", "ml", "ui", "ux", "vn"]);
const MIN_TOKEN_LENGTH = 3;

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Count whole-word occurrences of `needle` in `haystack`.
 *
 * `needle` comes from user input, so it is escaped before reaching the RegExp
 * constructor — unescaped it lets `(` throw a SyntaxError and `a{99999}` pin
 * the thread, on every message.
 */
const countWholeWord = (haystack: string, needle: string): number => {
  if (!needle) return 0;
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(needle)}(?![\\p{L}\\p{N}])`, "gu");
  return (haystack.match(pattern) || []).length;
};

/**
 * Lowercase, strip punctuation, collapse whitespace. Keeps Unicode letters so
 * Vietnamese diacritics survive.
 */
const normalize = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Tolerate a two-character suffix difference: office/offices, solution/solutions. */
const looseWordMatch = (a: string, b: string): boolean => {
  if (a === b) return true;
  const [shorter, longer] = a.length < b.length ? [a, b] : [b, a];
  return longer.startsWith(shorter) && longer.length - shorter.length <= 2;
};

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
        "rockship",
        "contact",
        "email",
        "hiring",
        "careers",
        "jobs",
        // Vietnamese — the assistant answers in the user's language, so the
        // retrieval gate has to recognise both or Vietnamese questions get
        // refused as off-topic.
        "công ty",
        "về rockship",
        "văn phòng",
        "địa chỉ",
        "đội ngũ",
        "nhân sự",
        "liên hệ",
        "tuyển dụng",
        "khách hàng",
        "đối tác",
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
        "nền tảng",
        "hạ tầng",
        "triển khai",
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
        "services",
        "llm",
        "ai",
        "ai agents",
        "chatbot",
        "computer vision",
        "workflow",
        "automation",
        "multimodal",
        "giải pháp",
        "dịch vụ",
        "tự động hóa",
        "trí tuệ nhân tạo",
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
        "công nghệ",
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
        "portfolio",
        "projects",
        "loan",
        "dự án",
        "tình huống",
        "câu chuyện",
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
        "nghiên cứu",
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
        "đánh giá",
        "nhận xét",
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

  public searchKnowledge(query: string): KnowledgeMatch[] {
    const normalizedQuery = normalize(query);
    const queryWords = normalizedQuery
      .split(" ")
      .filter(
        (word) => word.length >= MIN_TOKEN_LENGTH || SHORT_TOKENS.has(word)
      );

    const results = this.knowledgeBase.map((item) => {
      let anchor = 0;
      let contentScore = 0;

      // Category name appearing in the question, e.g. "platform", "research".
      if (countWholeWord(normalizedQuery, item.category) > 0) {
        anchor += 3;
      }

      // Keyword hits. Multi-word keywords ("case studies", "văn phòng") must
      // appear as a phrase — matching them word-by-word makes unrelated
      // questions anchor on a shared syllable ("công thức nấu phở" vs
      // "công ty").
      for (const keyword of item.keywords) {
        const normalizedKeyword = normalize(keyword);
        const isPhrase = normalizedKeyword.includes(" ");
        const hit = isPhrase
          ? countWholeWord(normalizedQuery, normalizedKeyword) > 0
          : queryWords.some((word) => looseWordMatch(word, normalizedKeyword));
        if (hit) anchor += 2;
      }

      // Content hits break ties between categories that already anchored. They
      // never contribute to `anchor`, so they cannot make an off-topic
      // question look relevant.
      const contentStr = normalize(JSON.stringify(item.content));
      for (const word of queryWords) {
        contentScore += Math.min(countWholeWord(contentStr, word) * 0.5, 2);
      }

      return { relevance: anchor + contentScore, anchor, item };
    });

    return results
      .filter((result) => result.anchor > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3); // Return top 3 most relevant items
  }

  /**
   * Whether a question is about Rockship at all. Callers use this to refuse
   * off-topic questions in code, before any model call — a scope rule that
   * lives only in the system prompt can be argued away by the user.
   */
  public isOnTopic(query: string): boolean {
    return this.searchKnowledge(query).length > 0;
  }

  public formatKnowledgeForLLM(items: KnowledgeMatch[]): string {
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
    // Return only essential fields for card display
    return items.map((item: any) => {
      const cardData = {
        slug: item.slug,
        type: item.type,
        title: item.title,
        logoText: item.logoText,
        partner: item.partner || "",
        industries: item.industries,
      };
      return JSON.stringify(cardData);
    }).join("\n");
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
