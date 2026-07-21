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

export default function FinanceAutomationPage() {
  const slug = "ai-finance-automation";
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const { content } = study;

  if (!content) {
    return <CaseStudyNotFound logoText={study.logoText} />;
  }

  const stats = {
    mainValue: "95%",
    mainLabel: "Time Savings",
    mainDesc:
      "Monthly reporting cycles reduced from 3–4 days to under 4 hours through end-to-end AI automation.",
    secondaryStats: [
      {
        icon: "zap" as const,
        value: "90%",
        label: "Manual Data Entry Reduction",
      },
      { icon: "target" as const, value: "<1%", label: "Error Rate" },
    ],
  };

  const layoutStudy = {
    ...study,
    heroImage: "/images/case-studies/ai-finance-automation/hero-main.png",
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

        <CaseStudyFigure src="/images/case-studies/ai-finance-automation/hero-main.png" alt="Executive Summary" className="-mt-16" />

        <CaseStudyChallenge challenge={content.challenge} />

        <CaseStudyFigure src="/images/case-studies/ai-finance-automation/challenge.png" alt="Clinic Scaling Challenges" className="-mt-16" />

        <CaseStudySolution
          solution={content.solution}
          solutionRender="/images/case-studies/ai-finance-automation/solution-overview.png"
        />

        {content.implementation && (
          <CaseStudyImplementation implementation={content.implementation} />
        )}

        <CaseStudyOutcomes
          outcomes={content.outcomes!}
          resultsImage="/images/case-studies/ai-finance-automation/impact.png"
        />
      </div>
    </CaseStudyLayout>
  );
}
