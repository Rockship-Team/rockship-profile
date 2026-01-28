export function CaseStudySidebarCTAs() {
  return (
    <>
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

    </>
  );
}

interface SuccessFactorsProps {
  factors: Array<{
    factor: string;
    points: string[];
  }>;
}

export function CaseStudySuccessFactors({ factors }: SuccessFactorsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm uppercase tracking-widest font-bold text-rockship-400 px-2">
        Key Success Factors
      </h3>
      {factors.map((factor, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent"
        >
          <h4 className="font-bold text-white mb-3">{factor.factor}</h4>
          <ul className="space-y-2">
            {factor.points.slice(0, 2).map((point, j) => (
              <li key={j} className="text-xs text-rockship-300 flex gap-2">
                <span className="text-rockship-accent">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
