import { FadeIn, FadeInStagger } from "@/components/FadeIn";

import { Target, Trophy, Zap } from "lucide-react";

interface CaseStudyStatsProps {
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
}

export function CaseStudyStats({ stats }: CaseStudyStatsProps) {
  // Default values to maintain backward compatibility with other pages
  const displayStats = stats || {
    mainValue: "+150%",
    mainLabel: "Productivity",
    mainDesc:
      "Increase in productivity through AI automation, reducing processing time significantly.",
    secondaryStats: [
      { icon: "trophy", value: "70-85%", label: "Faster Processing" },
      { icon: "zap", value: "90%", label: "Automation Rate" },
    ],
  };

  return (
    <section className="relative z-20 -mt-12 mb-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Highlight Stats */}
          <FadeIn
            delay={200}
            className="lg:col-span-2 p-4 rounded-3xl bg-rockship-900/50 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden h-full"
          >
            <div className="p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-rockship-accent/20 to-transparent rounded-2xl border border-white/5 h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-rockship-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-rockship-200 font-medium mb-1 relative">
                Key Impact
              </h3>
              <div className="text-5xl lg:text-6xl font-display font-bold text-white mb-2 relative tracking-tight">
                {displayStats.mainValue}
                <span className="text-lg font-sans font-normal text-rockship-300 ml-2 align-middle">
                  {displayStats.mainLabel}
                </span>
              </div>
              <p className="text-sm text-rockship-300 leading-relaxed max-w-sm relative">
                {displayStats.mainDesc}
              </p>
            </div>
          </FadeIn>

          {/* Secondary Stats */}
          <FadeInStagger className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayStats.secondaryStats.map((stat, i) => (
              <FadeIn
                key={i}
                delay={300 + i * 100}
                direction="up"
                distance={20}
                className="h-full"
              >
                <div className="p-6 lg:p-8 flex flex-col justify-center bg-rockship-900/50 border border-white/10 backdrop-blur-2xl rounded-2xl hover:bg-white/[0.04] transition-colors gap-2 h-full">
                  {stat.icon === "trophy" ? (
                    <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                  ) : stat.icon === "zap" ? (
                    <Zap className="w-6 h-6 text-green-500 mb-2" />
                  ) : (
                    <Target className="w-6 h-6 text-rockship-accent mb-2" />
                  )}
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-rockship-400 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
