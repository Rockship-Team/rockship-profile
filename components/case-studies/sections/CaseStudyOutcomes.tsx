import { FadeIn } from "@/components/FadeIn";
import { Target } from "lucide-react";

interface CaseStudyOutcomesProps {
  outcomes: {
    quantitative: string[];
    qualitative: Array<{
      category: string;
      details: string[];
    }>;
  };
  resultsImage?: string | string[];
}

export function CaseStudyOutcomes({
  outcomes,
  resultsImage,
}: CaseStudyOutcomesProps) {
  const images = Array.isArray(resultsImage)
    ? resultsImage
    : resultsImage
    ? [resultsImage]
    : [];

  return (
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
          {(outcomes.quantitative || []).map((item, i) => (
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

        {images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden border border-white/10 bg-white p-4 lg:p-8 shadow-xl"
          >
            <img
              src={img}
              alt={`Quantitative Outcomes Chart ${idx + 1}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}

        {/* Qualitative Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {outcomes.qualitative.map((item, i) => (
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
  );
}
