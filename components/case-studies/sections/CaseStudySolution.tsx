import { FadeIn, FadeInStagger } from "@/components/FadeIn";

import { CheckCircle2, ChevronRight } from "lucide-react";

interface CaseStudySolutionProps {
  solution: {
    description: string;
    components: Array<{
      title: string;
      details: string[];
    }>;
  };
  solutionRender?: string;
  architecture?: string;
}

export function CaseStudySolution({
  solution,
  solutionRender,
  architecture,
}: CaseStudySolutionProps) {
  return (
    <FadeIn>
      <div className="relative">
        <div className="absolute -left-4 -top-4 w-20 h-20 bg-black/[0.03] rounded-full blur-2xl" />
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4 relative">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/[0.03] border border-black/10 text-xl text-[#6E6E73]">
            02
          </span>
          The Solution
        </h2>
      </div>

      <div className="space-y-12">
        <p className="text-lg text-[#6E6E73] leading-relaxed">
          {solution.description}
        </p>

        {/* Solution Conceptual Render */}
        {solutionRender && (
          <FadeIn delay={100} direction="up" distance={20}>
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-white/60 shadow-2xl relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <img
                src={solutionRender}
                alt="Solution Concept"
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/70 backdrop-blur text-xs text-black/60 rounded-full border border-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                Solution Concept
              </div>
            </div>
          </FadeIn>
        )}

        {/* Architecture Diagram */}
        {architecture && (
          <FadeIn delay={200} direction="up" distance={20}>
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-white/60 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <img
                src={architecture}
                alt="System Architecture"
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/70 backdrop-blur text-xs text-black/60 rounded-full border border-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                Architecture Diagram
              </div>
            </div>
          </FadeIn>
        )}

        {/* Solution Components Grid */}
        <FadeInStagger className="grid md:grid-cols-2 gap-4">
          {solution.components.map((comp, i) => (
            <FadeIn key={i} delay={300 + i * 100} direction="up" distance={20}>
              <div className="group p-6 rounded-2xl border border-black/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF4D00]/30 transition-all duration-300 h-full">
                <div className="mb-4 w-10 h-10 rounded-lg bg-[#FF4D00]/10 flex items-center justify-center text-[#FF4D00] group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">
                  {comp.title}
                </h3>
                <ul className="space-y-2">
                  {comp.details.map((detail, j) => (
                    <li
                      key={j}
                      className="text-[#86868B] text-sm flex items-start gap-2"
                    >
                      <ChevronRight className="w-3 h-3 mt-1 text-black/20" />
                      <span className="group-hover:text-[#3A3D42] transition-colors">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </FadeIn>
  );
}
