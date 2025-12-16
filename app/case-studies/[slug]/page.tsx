import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { caseStudiesData } from "@/lib/data";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return caseStudiesData
    .filter((study) => study.slug)
    .map((study) => ({
      slug: study.slug,
    }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const { content } = study;

  if (!content) {
    return (
      <div className="min-h-screen bg-rockship-950 text-white flex items-center justify-center p-6 bg-[grid-slate-900] bg-[size:40px_40px]">
        <div className="text-center max-w-lg p-8 rounded-3xl bg-rockship-900/50 border border-white/5 backdrop-blur-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rockship-accent/20 to-transparent mb-8 border border-white/5 shadow-inner">
            <Target className="w-10 h-10 text-rockship-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4 text-white">
            {study.logoText}
          </h1>
          <p className="text-rockship-300 mb-8 leading-relaxed">
            Detailed case study content is being prepared. Please check back
            shortly to see how we delivered impact for this project.
          </p>
          <Link href="/">
            <Button
              variant="outline"
              className="border-rockship-accent/30 text-rockship-accent hover:bg-rockship-accent/10 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-rockship-950 text-white selection:bg-rockship-accent/30 overflow-x-hidden">
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-50 bg-rockship-950/80 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-rockship-950/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-rockship-300 hover:text-white transition-colors group px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-rockship-accent" />
            <span className="text-sm font-medium">All Case Studies</span>
          </Link>
          <div className="text-sm text-rockship-400 font-medium hidden md:block truncate max-w-md bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            {study.logoText}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-48 lg:pb-32 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rockship-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60 mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none opacity-40 mix-blend-screen" />

        {/* Hero Background Image if available */}
        {content.images?.hero && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-rockship-950/90 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-rockship-950 via-rockship-950/50 to-transparent z-10" />
            <img
              src={content.images.hero}
              alt="Case Study Hero"
              className="w-full h-full object-cover opacity-20 grayscale brightness-75 scale-105"
            />
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="flex flex-col gap-8 max-w-5xl mx-auto text-center items-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {study.industries.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-rockship-100 border border-white/10 uppercase tracking-wider backdrop-blur-sm shadow-sm hover:border-rockship-accent/50 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-rockship-300 drop-shadow-sm">
                {study.logoText}
              </h1>
              <p className="text-xl md:text-2xl text-rockship-200 leading-relaxed max-w-3xl border-t border-white/10 pt-8">
                {study.title}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats / Executive Summary Highlight */}
      <section className="relative z-20 -mt-12 mb-20">
        <div className="container mx-auto px-6">
          <FadeIn delay={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl bg-rockship-900/50 border border-white/10 backdrop-blur-2xl shadow-2xl">
              {/* Highlight Stats */}
              <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-rockship-accent/20 to-transparent rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-rockship-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-rockship-200 font-medium mb-1 relative">
                  Key Impact
                </h3>
                <div className="text-5xl lg:text-6xl font-display font-bold text-white mb-2 relative tracking-tight">
                  +150%
                  <span className="text-lg font-sans font-normal text-rockship-300 ml-2 align-middle">
                    Productivity
                  </span>
                </div>
                <p className="text-sm text-rockship-300 leading-relaxed max-w-sm relative">
                  Increase in loan officer productivity, reducing processing
                  time from weeks to days.
                </p>
              </div>

              {/* Secondary Stats */}
              <div className="p-6 lg:p-8 flex flex-col justify-center bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-colors gap-2">
                <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-white">70-85%</div>
                <div className="text-xs text-rockship-400 uppercase tracking-wider font-semibold">
                  Faster Processing
                </div>
              </div>

              <div className="p-6 lg:p-8 flex flex-col justify-center bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-colors gap-2">
                <Zap className="w-6 h-6 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-white">90%</div>
                <div className="text-xs text-rockship-400 uppercase tracking-wider font-semibold">
                  Automation Rate
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-32">
              {/* Executive Summary */}
              <FadeIn>
                <div className="prose prose-invert prose-lg max-w-none">
                  <h3 className="text-rockship-accent uppercase tracking-widest font-bold text-sm mb-4">
                    Executive Summary
                  </h3>
                  <p className="text-xl md:text-2xl leading-relaxed font-light text-rockship-100">
                    {content.executiveSummary}
                  </p>
                </div>
              </FadeIn>

              {/* Challenge */}
              <FadeIn>
                <div className="relative">
                  <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4 relative">
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-xl text-rockship-300">
                      01
                    </span>
                    The Challenge
                  </h2>
                </div>

                <div className="space-y-8">
                  <p className="text-lg text-rockship-300 leading-relaxed border-l-2 border-rockship-accent/30 pl-6">
                    {content.challenge.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pain Points */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20">
                      <h3 className="text-red-400 font-semibold mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Operational Pain Points
                      </h3>
                      <ul className="space-y-4">
                        {content.challenge.painPoints.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-rockship-200 text-sm leading-relaxed"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Business Impact */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20">
                      <h3 className="text-orange-400 font-semibold mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        Business Impact
                      </h3>
                      <ul className="space-y-4">
                        {content.challenge.businessImpact.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-rockship-200 text-sm leading-relaxed"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Solution */}
              <FadeIn>
                <div className="relative">
                  <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4 relative">
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-xl text-rockship-300">
                      02
                    </span>
                    The Solution
                  </h2>
                </div>

                <div className="space-y-12">
                  <p className="text-lg text-rockship-300 leading-relaxed">
                    {content.solution.description}
                  </p>

                  {/* Solution Conceptual Render */}
                  {(content.images as any).solutionRender && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative group mb-8">
                      <div className="absolute inset-0 bg-gradient-to-t from-rockship-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <img
                        src={(content.images as any).solutionRender}
                        alt="Microfinance Hub Concept"
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur text-xs text-white/70 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Microfinance Hub Concept
                      </div>
                    </div>
                  )}

                  {/* Architecture Diagram */}
                  {content.images?.architecture && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative group">
                      <div className="absolute inset-0 bg-gradient-to-t from-rockship-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <img
                        src={content.images.architecture}
                        alt="System Architecture"
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur text-xs text-white/70 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Architecture Diagram
                      </div>
                    </div>
                  )}

                  {/* Solution Components Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.solution.components.map((comp, i) => (
                      <div
                        key={i}
                        className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-rockship-accent/30 transition-all duration-300"
                      >
                        <div className="mb-4 w-10 h-10 rounded-lg bg-rockship-accent/10 flex items-center justify-center text-rockship-accent group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          {comp.title}
                        </h3>
                        <ul className="space-y-2">
                          {comp.details.map((detail, j) => (
                            <li
                              key={j}
                              className="text-rockship-400 text-sm flex items-start gap-2"
                            >
                              <ChevronRight className="w-3 h-3 mt-1 text-white/20" />
                              <span className="group-hover:text-rockship-200 transition-colors">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Implementation */}
              {content.implementation && (
                <FadeIn>
                  <div className="relative">
                    <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4 relative">
                      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-xl text-rockship-300">
                        03
                      </span>
                      Implementation
                    </h2>
                  </div>

                  {content.images?.implementation &&
                    content.images.implementation.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {content.images.implementation.map((img, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1"
                          >
                            <div className="rounded-xl overflow-hidden relative">
                              <img
                                src={img}
                                alt={`Process ${
                                  idx === 0 ? "Before" : "After"
                                }`}
                                className="w-full h-auto transition-transform duration-700 hover:scale-105"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-16">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white backdrop-blur-md">
                                  {idx === 0 ? "Before AI" : "After AI"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Clock className="w-24 h-24 text-white" />
                    </div>
                    <div className="flex items-center gap-3 mb-10 text-rockship-accent border border-rockship-accent/20 bg-rockship-accent/10 w-fit px-4 py-1.5 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono text-sm font-bold">
                        {content.implementation.totalTime} Timeline
                      </span>
                    </div>

                    <div className="relative border-l border-white/10 ml-3 space-y-12">
                      {content.implementation.phases.map((phase, i) => (
                        <div key={i} className="relative pl-12 group">
                          {/* Timeline Dot */}
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-rockship-800 ring-2 ring-white/20 group-hover:bg-rockship-accent group-hover:ring-rockship-accent/50 transition-all" />

                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-rockship-accent transition-colors">
                            {phase.phase}
                          </h3>
                          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-3">
                            {phase.details.map((detail, j) => (
                              <div
                                key={j}
                                className="flex items-center gap-3 text-rockship-300 text-sm bg-black/20 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Results & Outcomes */}
              {content.outcomes && (
                <FadeIn>
                  <div className="relative">
                    <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4 relative">
                      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-xl text-rockship-300">
                        04
                      </span>
                      Results & Impact
                    </h2>
                  </div>

                  <div className="space-y-12">
                    {/* Quantitative Stats Grid */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      {content.outcomes.quantitative.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col justify-between p-6 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-2xl hover:border-rockship-accent/20 transition-colors"
                        >
                          <Target className="w-8 h-8 text-rockship-accent mb-4 opacity-80" />
                          <span className="text-lg md:text-xl font-medium text-white leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {content.images?.results && (
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white p-4 lg:p-8 shadow-xl">
                        <img
                          src={content.images.results}
                          alt="Quantitative Outcomes Chart"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )}

                    {/* Qualitative Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {content.outcomes.qualitative.map((item, i) => (
                        <div
                          key={i}
                          className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all duration-300"
                        >
                          <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-white/5 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-px after:bg-rockship-accent">
                            {item.category}
                          </h3>
                          <ul className="space-y-4">
                            {item.details.map((detail, j) => (
                              <li
                                key={j}
                                className="text-sm text-rockship-300 leading-relaxed pl-2 border-l border-white/10 hover:border-rockship-accent/50 hover:text-rockship-100 transition-colors"
                              >
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-32 space-y-8">
                {/* Tech Stack Card */}
                <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-rockship-400 mb-6">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Python",
                      "OCR",
                      "LLMs",
                      "NLP",
                      "React",
                      "PostgreSQL",
                      "Docker",
                      "Node.js",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/5 rounded-lg text-xs font-semibold text-rockship-200 border border-white/5 hover:border-rockship-accent/30 hover:bg-white/10 hover:text-white transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Success Factors using Accordion-like visual */}
                {content.successFactors && (
                  <div className="space-y-4">
                    <h3 className="text-sm uppercase tracking-widest font-bold text-rockship-400 px-2">
                      Key Success Factors
                    </h3>
                    {content.successFactors.map((factor, i) => (
                      <div
                        key={i}
                        className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent"
                      >
                        <h4 className="font-bold text-white mb-3">
                          {factor.factor}
                        </h4>
                        <ul className="space-y-2">
                          {factor.points.slice(0, 2).map((point, j) => (
                            <li
                              key={j}
                              className="text-xs text-rockship-300 flex gap-2"
                            >
                              <span className="text-rockship-accent">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Call To Action */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-rockship-accent to-purple-600 text-white relative overflow-hidden group shadow-2xl shadow-rockship-accent/20">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 delay-100" />

                  <h3 className="text-2xl font-display font-bold mb-4 relative z-10">
                    Ready to Transform?
                  </h3>
                  <p className="text-white/90 mb-8 relative z-10 text-sm leading-relaxed">
                    Let's discuss how RockshipAI can automate your critical
                    workflows and drive efficiency similar to this case study.
                  </p>
                  <Link href="/contact" className="relative z-10 block">
                    <Button
                      variant="secondary"
                      className="w-full bg-white text-rockship-900 hover:bg-white/90 font-semibold shadow-lg h-12 text-base border-none"
                    >
                      Book a Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion / Footer Area */}
      {content.conclusion && (
        <section className="py-24 border-t border-white/5 bg-gradient-to-b from-rockship-950 to-black">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <FadeIn>
              <div className="w-16 h-16 mx-auto bg-rockship-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-rockship-accent/20">
                <Target className="w-8 h-8 text-rockship-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 leading-tight">
                "{content.conclusion}"
              </h2>
              <div className="flex justify-center gap-4">
                <Link href="/contact">
                  <Button className="bg-rockship-accent hover:bg-rockship-accent/90 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-rockship-accent/20 h-auto">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/5 rounded-full px-8 py-6 text-lg h-auto"
                  >
                    All Case Studies
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </main>
  );
}
