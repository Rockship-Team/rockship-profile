import { FadeIn } from "@/components/FadeIn";

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
          {challenge.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pain Points */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20">
            <h3 className="text-red-400 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Operational Pain Points
            </h3>
            <ul className="space-y-4">
              {challenge.painPoints.map((point, i) => (
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
              {challenge.businessImpact.map((point, i) => (
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
  );
}
