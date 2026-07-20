export function CaseStudySidebarCTAs() {
  return (
    <>
      {/* Tech Stack Card */}
      <div className="p-8 rounded-3xl border border-black/10 bg-white/[0.02] backdrop-blur-md">
        <h3 className="text-sm uppercase tracking-widest font-bold text-[#86868B] mb-6">
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
              className="px-4 py-2 bg-black/[0.03] rounded-lg text-xs font-semibold text-[#3A3D42] border border-black/[0.06] hover:border-[#FF4D00]/30 hover:bg-black/[0.05] hover:text-[#1D1D1F] transition-all cursor-default"
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
      <h3 className="text-sm uppercase tracking-widest font-bold text-[#86868B] px-2">
        Key Success Factors
      </h3>
      {factors.map((factor, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-black/10 bg-gradient-to-br from-[#1D1D1F]/[0.05] to-transparent"
        >
          <h4 className="font-bold text-[#1D1D1F] mb-3">{factor.factor}</h4>
          <ul className="space-y-2">
            {factor.points.slice(0, 2).map((point, j) => (
              <li key={j} className="text-xs text-[#6E6E73] flex gap-2">
                <span className="text-[#FF4D00]">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
