import { ReactNode } from "react";
import { CaseStudyConclusion } from "./CaseStudyConclusion";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyNav } from "./CaseStudyNav";
import {
  CaseStudySidebarCTAs,
  CaseStudySuccessFactors,
} from "./CaseStudySidebar";
import { CaseStudyStats } from "./CaseStudyStats";

interface CaseStudyLayoutProps {
  study: {
    logoText: string;
    title: string;
    industries: string[];
    heroImage?: string;
    content: {
      successFactors?: Array<{ factor: string; points: string[] }>;
      conclusion?: string;
    };
  };
  stats?: {
    mainValue: string;
    mainLabel: string;
    mainDesc: string;
    secondaryStats: Array<{
      icon: "trophy" | "zap" | "target";
      value: string;
      label: string;
    }>;
  };
  children: ReactNode;
}

export function CaseStudyLayout({
  study,
  stats,
  children,
}: CaseStudyLayoutProps) {
  return (
    <main className="min-h-screen bg-rockship-950 text-white selection:bg-rockship-accent/30 overflow-x-hidden relative">
      {/* Enhanced Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-rockship-accent/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] opacity-30" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <CaseStudyNav logoText={study.logoText} />

      <CaseStudyHero
        logoText={study.logoText}
        title={study.title}
        industries={study.industries}
        heroImage={study.heroImage}
      />

      <div className="relative z-10">
        <CaseStudyStats stats={stats} />
      </div>

      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Content Column */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Vertical Decorative Line */}
                <div className="absolute left-[-40px] top-0 bottom-0 w-px bg-gradient-to-b from-rockship-accent/50 via-rockship-accent/10 to-transparent hidden xl:block" />

                <div className="space-y-40">{children}</div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 self-start">
              <div className="sticky top-32 space-y-12">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-rockship-accent/20 to-transparent blur-lg opacity-50" />
                  <div className="relative space-y-12">
                    <CaseStudySidebarCTAs />
                    {study.content.successFactors && (
                      <CaseStudySuccessFactors
                        factors={study.content.successFactors}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {study.content.conclusion && (
        <CaseStudyConclusion conclusion={study.content.conclusion} />
      )}

      {/* Final Footer Spacer */}
      <div className="h-32" />
    </main>
  );
}
