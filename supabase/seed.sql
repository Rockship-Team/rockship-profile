-- Seed Script: Migrate static blog data to Supabase
-- Feature: 003-supabase-blog-integration
-- Date: 2026-01-21
-- Source: lib/blog-data.ts

-- ============================================
-- Step 1: Insert Tags
-- ============================================
INSERT INTO blog_tags (name, slug) VALUES
  ('Milestones', 'milestones'),
  ('Workshops', 'workshops'),
  ('OCF', 'ocf'),
  ('Grid', 'grid'),
  ('Series', 'series'),
  ('LLM', 'llm'),
  ('Opinion', 'opinion'),
  ('TypeScript', 'typescript')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Step 2: Insert Blog Posts
-- ============================================

-- Post 1: 2025 Year In Review
INSERT INTO blog_posts (
  slug, title, excerpt, content, author, reading_time,
  sections, is_published, published_at
) VALUES (
  '2025-year-in-review',
  '2025 Year In Review',
  'As 2025 comes to an end, I pause to summarize the major Rockship AI milestones of the year.',
  E'# 2025 Year In Review\n\nAs 2025 comes to an end, I pause to summarize the major Rockship AI milestones of the year.\n\n## Q1: Foundation Building\n\nThe first quarter was all about laying the groundwork. We established our core team, refined our methodologies, and started engaging with our first enterprise clients.\n\n## Q2: First Success Stories\n\nBy mid-year, we had several successful deployments under our belt. Our AI-powered document processing solution reduced manual work by 80% for a major financial institution.\n\n## Q3: Platform Evolution\n\nWe launched our unified AI platform, enabling clients to deploy custom models with unprecedented ease. The feedback was overwhelmingly positive.\n\n## Q4: Scaling Up\n\nThe final quarter saw us doubling our client base and expanding into new verticals. Healthcare and logistics emerged as key growth areas.\n\n## Looking Forward\n\n2026 promises even more exciting developments. Stay tuned for announcements about our next-generation platform capabilities.',
  'Rockship Team',
  5,
  '[{"id": "q1-foundation-building", "title": "Q1: Foundation Building", "level": 2}, {"id": "q2-first-success-stories", "title": "Q2: First Success Stories", "level": 2}, {"id": "q3-platform-evolution", "title": "Q3: Platform Evolution", "level": 2}, {"id": "q4-scaling-up", "title": "Q4: Scaling Up", "level": 2}, {"id": "looking-forward", "title": "Looking Forward", "level": 2}]'::jsonb,
  true,
  '2025-12-25T00:00:00Z'
);

-- Post 2: The future of CDKTF
INSERT INTO blog_posts (
  slug, title, excerpt, content, author, reading_time,
  sections, is_published, published_at
) VALUES (
  'future-of-cdktf',
  'The future of CDKTF',
  'An unexpected shockwave, but a clear path forward. Our continued investment into the CDK for Terraform (CDKTF) project.',
  E'# The future of CDKTF\n\nAn unexpected shockwave, but a clear path forward. Our continued investment into the CDK for Terraform (CDKTF) project.\n\n## The Announcement\n\nWhen HashiCorp announced changes to their licensing model, the infrastructure-as-code community faced a pivotal moment. For teams invested in CDKTF, questions arose about the future.\n\n## Our Position\n\nAt Rockship AI, we remain committed to CDKTF as a cornerstone of our infrastructure automation strategy. Here''s why:\n\n### 1. Type Safety Matters\n\nCDKTF brings full type safety to infrastructure definitions. This catches errors before they reach production.\n\n### 2. Familiar Languages\n\nWriting infrastructure in TypeScript, Python, or Go means leveraging existing team skills without learning HCL.\n\n### 3. Composable Constructs\n\nBuilding reusable, shareable infrastructure components accelerates development across projects.\n\n## Moving Forward\n\nWe''re investing in enhanced tooling and best practices documentation. Our clients can rely on continued support and innovation in this space.',
  'Infrastructure Team',
  4,
  '[{"id": "the-announcement", "title": "The Announcement", "level": 2}, {"id": "our-position", "title": "Our Position", "level": 2}, {"id": "1-type-safety-matters", "title": "1. Type Safety Matters", "level": 3}, {"id": "2-familiar-languages", "title": "2. Familiar Languages", "level": 3}, {"id": "3-composable-constructs", "title": "3. Composable Constructs", "level": 3}, {"id": "moving-forward", "title": "Moving Forward", "level": 2}]'::jsonb,
  true,
  '2025-12-12T00:00:00Z'
);

-- Post 3: Introducing: The Grid
INSERT INTO blog_posts (
  slug, title, excerpt, content, author, reading_time,
  sections, is_published, published_at
) VALUES (
  'introducing-the-grid',
  'Introducing: The Grid',
  'The idea of a strongly typed State Backend for real product team support.',
  E'# Introducing: The Grid\n\nThe idea of a strongly typed State Backend for real product team support.\n\n## The Problem\n\nModern applications require complex state management. Traditional approaches either sacrifice type safety or developer experience.\n\n## Enter The Grid\n\nThe Grid is our answer to state management challenges. It provides:\n\n- **Full Type Safety**: Every state mutation is validated at compile time\n- **Time Travel Debugging**: Replay any sequence of state changes\n- **Real-time Collaboration**: Multiple team members can work on state simultaneously\n- **Automatic Persistence**: State is automatically saved and synchronized\n\n## Architecture\n\nThe Grid uses a novel approach combining event sourcing with immutable data structures. This enables both performance and reliability.\n\n## Getting Started\n\nWe''re rolling out The Grid to select partners first. Interested? Reach out to learn more about early access.',
  'Platform Team',
  6,
  '[{"id": "the-problem", "title": "The Problem", "level": 2}, {"id": "enter-the-grid", "title": "Enter The Grid", "level": 2}, {"id": "architecture", "title": "Architecture", "level": 2}, {"id": "getting-started", "title": "Getting Started", "level": 2}]'::jsonb,
  true,
  '2025-11-25T00:00:00Z'
);

-- Post 4: SDD: A Practical Approach
INSERT INTO blog_posts (
  slug, title, excerpt, content, author, reading_time,
  sections, is_published, published_at
) VALUES (
  'sdd-practical-approach',
  'SDD: A Practical Approach',
  'Applying Spec Driven Development for more than toy projects.',
  E'# SDD: A Practical Approach\n\nApplying Spec Driven Development for more than toy projects.\n\n## What is Spec Driven Development?\n\nSpec Driven Development (SDD) is a methodology where specifications drive the entire development lifecycle. Unlike traditional approaches, specifications are executable and always synchronized with code.\n\n## Why SDD?\n\nTraditional documentation becomes outdated quickly. SDD keeps specs and implementation in lockstep.\n\n### Benefits\n\n1. **Always Accurate Documentation**: Specs are the source of truth\n2. **Better Communication**: Stakeholders read specs, not code\n3. **Reduced Bugs**: Specs catch inconsistencies early\n4. **Faster Onboarding**: New team members understand systems through specs\n\n## Practical Implementation\n\nWe use LLMs to help generate and maintain specs. This reduces the overhead of keeping documentation current.\n\n### Tools We Recommend\n\n- Speckit for spec management\n- GitHub Actions for spec validation\n- Custom LLM pipelines for spec generation\n\n## Conclusion\n\nSDD isn''t just for toy projects. With the right tooling, it scales to enterprise applications.',
  'Engineering Team',
  7,
  '[{"id": "what-is-spec-driven-development", "title": "What is Spec Driven Development?", "level": 2}, {"id": "why-sdd", "title": "Why SDD?", "level": 2}, {"id": "benefits", "title": "Benefits", "level": 3}, {"id": "practical-implementation", "title": "Practical Implementation", "level": 2}, {"id": "tools-we-recommend", "title": "Tools We Recommend", "level": 3}, {"id": "conclusion", "title": "Conclusion", "level": 2}]'::jsonb,
  true,
  '2025-11-10T00:00:00Z'
);

-- Post 5: Why Terraform still matters
INSERT INTO blog_posts (
  slug, title, excerpt, content, author, reading_time,
  sections, is_published, published_at
) VALUES (
  'why-terraform-still-matters',
  'Why Terraform still matters',
  'Opinion piece on Terraform''s ubiquity vs ecosystem pain points.',
  E'# Why Terraform still matters\n\nOpinion piece on Terraform''s ubiquity vs ecosystem pain points.\n\n## The Landscape\n\nInfrastructure as Code (IaC) tools have proliferated. Pulumi, AWS CDK, Crossplane, and others compete for mindshare. Yet Terraform maintains its position.\n\n## The Case for Terraform\n\n### 1. Provider Ecosystem\n\nTerraform''s provider ecosystem is unmatched. Over 3,000 providers cover virtually every service and platform.\n\n### 2. State Management\n\nTerraform''s state management, while sometimes criticized, provides a clear view of deployed infrastructure.\n\n### 3. Community Knowledge\n\nThe wealth of community modules, tutorials, and troubleshooting resources is immense.\n\n## Acknowledging Pain Points\n\nTerraform isn''t perfect:\n\n- HCL has a learning curve\n- State file management requires care\n- Testing infrastructure is challenging\n\n## Our Recommendation\n\nUse Terraform with CDKTF. You get the best of both worlds: Terraform''s ecosystem with modern language ergonomics.\n\n## Conclusion\n\nTerraform''s dominance isn''t accidental. Its strengths outweigh its weaknesses for most use cases.',
  'Infrastructure Team',
  5,
  '[{"id": "the-landscape", "title": "The Landscape", "level": 2}, {"id": "the-case-for-terraform", "title": "The Case for Terraform", "level": 2}, {"id": "1-provider-ecosystem", "title": "1. Provider Ecosystem", "level": 3}, {"id": "2-state-management", "title": "2. State Management", "level": 3}, {"id": "3-community-knowledge", "title": "3. Community Knowledge", "level": 3}, {"id": "acknowledging-pain-points", "title": "Acknowledging Pain Points", "level": 2}, {"id": "our-recommendation", "title": "Our Recommendation", "level": 2}, {"id": "conclusion", "title": "Conclusion", "level": 2}]'::jsonb,
  true,
  '2025-11-01T00:00:00Z'
);

-- Post 6: TerraConstructs Overview
INSERT INTO blog_posts (
  slug, title, excerpt, content, author, reading_time,
  sections, is_published, published_at
) VALUES (
  'terraconstructs-overview',
  'TerraConstructs Overview',
  'Learn how to set up your first infrastructure project using TerraConstructs L2 Constructs for AWS with CDK for Terraform.',
  E'# TerraConstructs Overview\n\nLearn how to set up your first infrastructure project using TerraConstructs L2 Constructs for AWS with CDK for Terraform.\n\n## What are TerraConstructs?\n\nTerraConstructs are high-level, opinionated abstractions over Terraform resources. They encode best practices and reduce boilerplate.\n\n## Getting Started\n\n### Prerequisites\n\n- Node.js 18+\n- Terraform CLI\n- AWS credentials configured\n\n### Installation\n\n```bash\nnpm install @terraconstructs/aws\n```\n\n### Your First Construct\n\n```typescript\nimport { TerraformStack } from ''cdktf'';\nimport { Vpc, EcsCluster } from ''@terraconstructs/aws'';\n\nclass MyStack extends TerraformStack {\n  constructor(scope: Construct, name: string) {\n    super(scope, name);\n\n    const vpc = new Vpc(this, ''vpc'', {\n      cidr: ''10.0.0.0/16'',\n      maxAzs: 3,\n    });\n\n    new EcsCluster(this, ''cluster'', {\n      vpc,\n      capacity: {\n        minSize: 2,\n        maxSize: 10,\n      },\n    });\n  }\n}\n```\n\n## Benefits\n\n- **Less Code**: 10x reduction in lines of code\n- **Best Practices**: Security and reliability built-in\n- **Type Safety**: Full TypeScript support\n\n## Next Steps\n\nCheck out our workshops for hands-on tutorials.',
  'Developer Relations',
  8,
  '[{"id": "what-are-terraconstructs", "title": "What are TerraConstructs?", "level": 2}, {"id": "getting-started", "title": "Getting Started", "level": 2}, {"id": "prerequisites", "title": "Prerequisites", "level": 3}, {"id": "installation", "title": "Installation", "level": 3}, {"id": "your-first-construct", "title": "Your First Construct", "level": 3}, {"id": "benefits", "title": "Benefits", "level": 2}, {"id": "next-steps", "title": "Next Steps", "level": 2}]'::jsonb,
  true,
  '2025-10-01T00:00:00Z'
);

-- ============================================
-- Step 3: Link Posts to Tags
-- ============================================

-- Post 1: 2025 Year In Review -> milestones, workshops
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = '2025-year-in-review'
  AND bt.slug IN ('milestones', 'workshops');

-- Post 2: The future of CDKTF -> ocf
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = 'future-of-cdktf'
  AND bt.slug = 'ocf';

-- Post 3: Introducing: The Grid -> grid, series
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = 'introducing-the-grid'
  AND bt.slug IN ('grid', 'series');

-- Post 4: SDD: A Practical Approach -> llm, grid, series
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = 'sdd-practical-approach'
  AND bt.slug IN ('llm', 'grid', 'series');

-- Post 5: Why Terraform still matters -> llm, opinion, series
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = 'why-terraform-still-matters'
  AND bt.slug IN ('llm', 'opinion', 'series');

-- Post 6: TerraConstructs Overview -> workshops, typescript
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = 'terraconstructs-overview'
  AND bt.slug IN ('workshops', 'typescript');

-- ============================================
-- Verification Query (optional)
-- ============================================
-- SELECT bp.slug, bp.title, array_agg(bt.slug) as tags
-- FROM blog_posts bp
-- LEFT JOIN blog_post_tags bpt ON bp.id = bpt.post_id
-- LEFT JOIN blog_tags bt ON bpt.tag_id = bt.id
-- GROUP BY bp.id, bp.slug, bp.title
-- ORDER BY bp.published_at DESC;
