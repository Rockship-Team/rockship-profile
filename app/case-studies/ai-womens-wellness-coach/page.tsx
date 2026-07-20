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

export default function WomensWellnessPage() {
  const slug = "ai-womens-wellness-coach";
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const { content } = study;

  if (!content) {
    return <CaseStudyNotFound logoText={study.logoText} />;
  }

  const stats = {
    mainValue: "92%",
    mainLabel: "User Satisfaction",
    mainDesc:
      "High satisfaction driven by culturally-aware, female-focused guidance and personalized wellness journey.",
    secondaryStats: [
      { icon: "zap" as const, value: "84%", label: "Goal Improvement" },
      { icon: "trophy" as const, value: "96%", label: "Cultural Score" },
    ],
  };

  const layoutStudy = {
    ...study,
    heroImage: "/images/case-studies/ai-womens-wellness-coach/hero-main.png",
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

        <CaseStudyFigure src="/images/case-studies/ai-womens-wellness-coach/hero-main.png" alt="Executive Summary" className="-mt-16" />

        <CaseStudyChallenge challenge={content.challenge} />

        <CaseStudyFigure src="/images/case-studies/ai-womens-wellness-coach/challenge.png" alt="Vietnamese Women's Wellness Challenges" className="-mt-16" />

        <CaseStudySolution solution={content.solution} />

        {content.implementation && (
          <CaseStudyImplementation implementation={content.implementation} />
        )}

        <CaseStudyOutcomes
          outcomes={content.outcomes!}
          resultsImage="/images/case-studies/ai-womens-wellness-coach/results.png"
        />
      </div>
    </CaseStudyLayout>
  );
}
