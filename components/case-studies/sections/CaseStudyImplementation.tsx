import { FadeIn, FadeInStagger } from "@/components/FadeIn";

import { Clock } from "lucide-react";

interface CaseStudyImplementationProps {
  implementation: {
    totalTime: string;
    phases: Array<{
      phase: string;
      details: string[];
    }>;
  };
  images?: string[];
}

export function CaseStudyImplementation({
  implementation,
  images,
}: CaseStudyImplementationProps) {
  return (
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

      {images && images.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1"
            >
              <div className="rounded-xl overflow-hidden relative">
                <img
                  src={img}
                  alt={`Process ${idx === 0 ? "Before" : "After"}`}
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
            {implementation.totalTime} Timeline
          </span>
        </div>

        <FadeInStagger className="relative border-l border-white/10 ml-3 space-y-12">
          {implementation.phases.map((phase, i) => (
            <FadeIn key={i} delay={i * 200} direction="right" distance={20}>
              <div className="relative pl-12 group">
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
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </FadeIn>
  );
}
