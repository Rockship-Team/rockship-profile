import { FadeIn, FadeInStagger } from "@/components/FadeIn";


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
        <div className="absolute -left-4 -top-4 w-20 h-20 bg-black/[0.03] rounded-full blur-2xl" />
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4 relative">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/[0.03] border border-black/10 text-xl text-[#6E6E73]">
            04
          </span>
          Results & Impact
        </h2>
      </div>

      <div className="space-y-12">
        {/* Quantitative results.
            Each entry is authored as "Label: detail → outcome", so it is parsed
            into a three-part row rather than dropped into an icon card: the
            metric name reads as a label, the movement as the detail, and the
            outcome carries the emphasis. */}
        {(outcomes.quantitative || []).length > 0 && (
          <FadeInStagger className="overflow-hidden rounded-2xl border border-[#D2D2D7] bg-white">
            {(outcomes.quantitative || []).map((item, i) => {
              const [label, ...restParts] = item.split(":");
              const rest = restParts.join(":").trim();
              const hasLabel = restParts.length > 0;
              const [detail, outcome] = rest.split("\u2192").map((part) => part.trim());

              return (
                <FadeIn key={i} delay={i * 80} direction="up" distance={12}>
                  <div
                    className={`grid grid-cols-1 gap-2 p-6 md:grid-cols-[minmax(160px,1fr)_1.4fr_auto] md:items-baseline md:gap-8 ${
                      i > 0 ? "border-t border-[#D2D2D7]" : ""
                    }`}
                  >
                    <span className="text-sm font-medium tracking-[-0.01em] text-[#6E6E73]">
                      {hasLabel ? label.trim() : "Result"}
                    </span>
                    <span className="text-base leading-snug text-[#1D1D1F]">
                      {hasLabel ? detail : item}
                    </span>
                    {outcome ? (
                      <span className="text-lg font-semibold tracking-[-0.01em] text-[#FF4D00] md:text-right">
                        {outcome}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </FadeInStagger>
        )}

        {images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden border border-black/10 bg-white p-4 lg:p-8 shadow-xl"
          >
            <img
              src={img}
              alt={`Quantitative Outcomes Chart ${idx + 1}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}

        {/* Qualitative Cards */}
        <FadeInStagger className="grid md:grid-cols-3 gap-6">
          {outcomes.qualitative.map((item, i) => (
            <FadeIn key={i} delay={i * 150} direction="up" distance={20}>
              <div className="p-6 md:p-8 bg-white/[0.02] border border-black/[0.06] rounded-2xl hover:bg-white/[0.04] transition-all duration-300 h-full">
                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-6 pb-4 border-b border-black/[0.06] relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-px after:bg-[#FF4D00]">
                  {item.category}
                </h3>
                <ul className="space-y-4">
                  {item.details.map((detail, j) => (
                    <li
                      key={j}
                      className="text-sm text-[#6E6E73] leading-relaxed pl-2 border-l border-black/10 hover:border-[#FF4D00]/50 hover:text-[#1D1D1F] transition-colors"
                    >
                      {detail}
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
