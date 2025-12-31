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

export default function AiResidentSupportAutomationPage() {
  const slug = "ai-resident-support-automation";
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const { content } = study;

  if (!content) {
    return <CaseStudyNotFound logoText={study.logoText} />;
  }

  const stats = {
    mainValue: "92.5%",
    mainLabel: "Workload Reduction",
    mainDesc:
      "Property staff time handling resident inquiries was slashed from 620 hours to 148 hours monthly through AI centralization.",
    secondaryStats: [
      {
        icon: "zap" as const,
        value: "560h",
        label: "Monthly Staff Time Saved",
      },
      { icon: "target" as const, value: "98%", label: "Response Accuracy" },
    ],
  };

  const layoutStudy = {
    ...study,
    heroImage:
      "/images/case-studies/ai-resident-support-automation/hero-main.png",
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

        <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative group -mt-16 ring-1 ring-white/20">
          <img
            src="/images/case-studies/ai-resident-support-automation/hero-main.png"
            alt="Executive Summary"
            className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        <CaseStudyChallenge challenge={content.challenge} />

        <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative group -mt-16 ring-1 ring-white/20">
          <img
            src="/images/case-studies/ai-resident-support-automation/challenge.png"
            alt="PropTech Challenges"
            className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        <CaseStudySolution
          solution={content.solution}
          solutionRender="/images/case-studies/ai-resident-support-automation/solution-overview.png"
        />

        {content.implementation && (
          <CaseStudyImplementation implementation={content.implementation} />
        )}

        <CaseStudyOutcomes
          outcomes={content.outcomes!}
          resultsImage={[
            "/images/case-studies/ai-resident-support-automation/resident-savings.png",
            "/images/case-studies/ai-resident-support-automation/accuracy.png",
          ]}
        />
      </div>
    </CaseStudyLayout>
  );
}
