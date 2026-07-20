import { FadeIn, FadeInStagger } from "@/components/FadeIn";

interface CaseStudyChallengeProps {
  challenge: {
    description: string;
    painPoints: string[];
    businessImpact: string[];
  };
}

export function CaseStudyChallenge({ challenge }: CaseStudyChallengeProps) {
  return (
    <FadeIn>
      <div className="relative">
        <div className="absolute -left-4 -top-4 w-20 h-20 bg-black/[0.03] rounded-full blur-2xl" />
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4 relative">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/[0.03] border border-black/10 text-xl text-[#6E6E73]">
            01
          </span>
          The Challenge
        </h2>
      </div>

      <div className="space-y-8">
        <p className="text-lg text-[#6E6E73] leading-relaxed border-l-2 border-[#FF4D00]/30 pl-6">
          {challenge.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pain Points */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20">
            <h3 className="text-red-400 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Operational Pain Points
            </h3>
            <FadeInStagger className="space-y-4">
              {challenge.painPoints.map((point, i) => (
                <FadeIn key={i} delay={i * 100} direction="right" distance={10}>
                  <li className="flex items-start gap-3 text-[#3A3D42] text-sm leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>

          {/* Business Impact */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20">
            <h3 className="text-orange-400 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Business Impact
            </h3>
            <FadeInStagger className="space-y-4">
              {challenge.businessImpact.map((point, i) => (
                <FadeIn key={i} delay={i * 100} direction="right" distance={10}>
                  <li className="flex items-start gap-3 text-[#3A3D42] text-sm leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
