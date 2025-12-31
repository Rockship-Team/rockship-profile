import { caseStudiesData } from "@/lib/data";
import { notFound } from "next/navigation";

// Sub-components
import { CaseStudyConclusion } from "@/components/case-studies/CaseStudyConclusion";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudyNav } from "@/components/case-studies/CaseStudyNav";
import { CaseStudyNotFound } from "@/components/case-studies/CaseStudyNotFound";
import {
  CaseStudySidebarCTAs,
  CaseStudySuccessFactors,
} from "@/components/case-studies/CaseStudySidebar";
import { CaseStudyStats } from "@/components/case-studies/CaseStudyStats";

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

  return (
    <main className="min-h-screen bg-rockship-950 text-white selection:bg-rockship-accent/30 overflow-x-hidden">
      <CaseStudyNav logoText={study.logoText} />

      <CaseStudyHero
        logoText={study.logoText}
        title={study.title}
        industries={study.industries}
        heroImage={content.images?.hero}
      />

      <CaseStudyStats />

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-32">
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

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-32 space-y-8">
                <CaseStudySidebarCTAs />
                {content.successFactors && (
                  <CaseStudySuccessFactors factors={content.successFactors} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {content.conclusion && (
        <CaseStudyConclusion conclusion={content.conclusion} />
      )}
    </main>
  );
}
