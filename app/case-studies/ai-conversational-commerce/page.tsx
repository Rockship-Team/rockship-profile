import { caseStudiesData } from "@/lib/data";
import { notFound } from "next/navigation";

// Sub-components
import { CaseStudyLayout } from "@/components/case-studies/CaseStudyLayout";
import { CaseStudyNotFound } from "@/components/case-studies/CaseStudyNotFound";

// Sections
import { CaseStudyChallenge } from "@/components/case-studies/sections/CaseStudyChallenge";
import { CaseStudyExecutiveSummary } from "@/components/case-studies/sections/CaseStudyExecutiveSummary";
import { CaseStudyImplementation } from "@/components/case-studies/sections/CaseStudyImplementation";
import { CaseStudyOutcomes } from "@/components/case-studies/sections/CaseStudyOutcomes";
import { CaseStudySolution } from "@/components/case-studies/sections/CaseStudySolution";
import CaseStudyFigure from "@/components/case-studies/CaseStudyFigure";

export default function ConversationalCommercePage() {
  const slug = "ai-conversational-commerce";
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const { content } = study;

  if (!content) {
    return <CaseStudyNotFound logoText={study.logoText} />;
  }

  const stats = {
    mainValue: "+35%",
    mainLabel: "Revenue Growth",
    mainDesc:
      "Driving 24/7 ordering, smarter product discovery, and significant revenue growth through conversational AI.",
    secondaryStats: [
      { icon: "trophy" as const, value: "140%", label: "First-Year ROI" },
      { icon: "zap" as const, value: "-55%", label: "Ops Cost Reduction" },
    ],
  };

  const layoutStudy = {
    ...study,
    heroImage: "/images/case-studies/ai-conversational-commerce/hero-main.png",
    content: {
      ...content,
      successFactors: content.successFactors || [],
      conclusion: content.conclusion || "",
    },
  };

  return (
    <CaseStudyLayout study={layoutStudy} stats={stats}>
      <div className="space-y-32">
        <CaseStudyExecutiveSummary content={content.executiveSummary} />

        <CaseStudyFigure src="/images/case-studies/ai-conversational-commerce/hero-main.png" alt="Executive Summary" className="-mt-16" />

        <CaseStudyChallenge challenge={content.challenge} />

        <CaseStudyFigure src="/images/case-studies/ai-conversational-commerce/challenge.png" alt="Challenge" className="-mt-16" />

        <CaseStudySolution
          solution={content.solution}
          solutionRender="/images/case-studies/ai-conversational-commerce/solution-overview.png"
          architecture={content.images?.architecture}
        />

        {content.implementation && (
          <CaseStudyImplementation
            implementation={content.implementation}
            images={content.images?.implementation}
          />
        )}

        {content.outcomes && <CaseStudyOutcomes outcomes={content.outcomes} />}
      </div>
    </CaseStudyLayout>
  );
}
