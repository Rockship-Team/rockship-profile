import { whyUsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  LucideIcon,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import React from "react";
import { FadeIn, FadeInStagger } from "../FadeIn";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  BrainCircuit,
  Rocket,
  ShieldCheck,
  Zap,
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  delay?: string;
}> = ({ icon, title, desc, className }) => {
  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group transform-gpu backface-hidden",
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-rockship-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform transform-gpu">
        <div className="text-rockship-accent">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-rockship-300 leading-relaxed text-sm md:text-base">
        {desc}
      </p>
    </div>
  );
};

export const WhyUs: React.FC = () => {
  return (
    <section
      id="why-us"
      className="py-24 bg-rockship-950 text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-rockship-accent animate-pulse" />
            <span className="text-xs font-medium text-rockship-200 tracking-wide uppercase">
              The Rockship Advantage
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
            Why Partner With <span className="gradient-text">Rockship</span>
          </h2>
          <p className="text-lg text-rockship-300">
            We bridge the gap between AI potential and enterprise reality,
            delivering solutions that are impactful, scalable, and secure.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsData.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Rocket;
            return (
              <FadeIn
                key={index}
                direction="up"
                distance={20}
                delay={index * 50}
                className="h-full"
              >
                <FeatureCard
                  className="h-full"
                  icon={<Icon size={24} />}
                  title={feature.title}
                  desc={feature.description}
                />
              </FadeIn>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
};
