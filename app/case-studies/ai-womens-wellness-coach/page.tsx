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

  return (
    <main className="min-h-screen bg-rockship-950 text-white selection:bg-rockship-accent/30 overflow-x-hidden">
      <CaseStudyNav logoText={study.logoText} />

      <CaseStudyHero
        logoText={study.logoText}
        title={study.title}
        industries={study.industries}
        heroImage="/images/case-studies/ai-womens-wellness-coach/hero-main.png"
      />

      <CaseStudyStats
        stats={{
          mainValue: "92%",
          mainLabel: "User Satisfaction",
          mainDesc:
            "High satisfaction driven by culturally-aware, female-focused guidance and personalized wellness journey.",
          secondaryStats: [
            { icon: "zap", value: "84%", label: "Goal Improvement" },
            { icon: "trophy", value: "96%", label: "Cultural Score" },
          ],
        }}
      />

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-32">
              <CaseStudyExecutiveSummary content={content.executiveSummary} />

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative group mb-12 -mt-16">
                <img
                  src="/images/case-studies/ai-womens-wellness-coach/hero-main.png"
                  alt="Executive Summary"
                  className="w-full h-auto"
                />
              </div>

              <CaseStudyChallenge challenge={content.challenge} />

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative group mb-12 -mt-16">
                <img
                  src="/images/case-studies/ai-womens-wellness-coach/challenge.png"
                  alt="Vietnamese Women's Wellness Challenges"
                  className="w-full h-auto"
                />
              </div>

              <CaseStudySolution solution={content.solution} />

              {content.implementation && (
                <CaseStudyImplementation
                  implementation={content.implementation}
                />
              )}

              <CaseStudyOutcomes
                outcomes={content.outcomes!}
                resultsImage="/images/case-studies/ai-womens-wellness-coach/results.png"
              />
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
