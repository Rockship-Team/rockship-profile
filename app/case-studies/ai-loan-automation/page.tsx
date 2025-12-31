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

export default function LoanAutomationPage() {
  const slug = "ai-loan-automation";
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const { content } = study;

  if (!content) {
    return <CaseStudyNotFound logoText={study.logoText} />;
  }

  const layoutStudy = {
    ...study,
    heroImage: content.images?.hero,
    content: {
      ...content,
      successFactors: content.successFactors || [],
      conclusion: content.conclusion || "",
    },
  };

  return (
    <CaseStudyLayout study={layoutStudy}>
      <div className="space-y-32">
        <CaseStudyExecutiveSummary content={content.executiveSummary} />

        <CaseStudyChallenge challenge={content.challenge} />

        <CaseStudySolution
          solution={content.solution}
          solutionRender={(content.images as any).solutionRender}
          architecture={content.images?.architecture}
        />

        {content.implementation && (
          <CaseStudyImplementation
            implementation={content.implementation}
            images={content.images?.implementation}
          />
        )}

        {content.outcomes && (
          <CaseStudyOutcomes
            outcomes={content.outcomes}
            resultsImage={content.images?.results}
          />
        )}
      </div>
    </CaseStudyLayout>
  );
}
