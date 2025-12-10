import { platformData } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Cpu,
  Database,
  Globe,
  Layers,
  LucideIcon,
  Rocket,
  Settings,
} from "lucide-react";
import React from "react";
import { FadeIn } from "../FadeIn";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Database,
  Globe,
  Layers,
  Rocket,
  Settings,
};

const PlatformCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  delay?: string;
}> = ({ icon, title, desc, className }) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rockship-accent/20 to-rockship-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <div className="text-rockship-accent">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-rockship-300 leading-relaxed">{desc}</p>
    </div>
  );
};

export const Platform: React.FC = () => {
  return (
    <section
      id="platform"
      className="py-16 md:py-32 bg-gradient-to-b from-rockship-950 to-rockship-900/50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute left-1/4 top-1/3 w-[800px] h-[800px] bg-rockship-accent/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rockship-accent/10 border border-rockship-accent/20 mb-8">
            <Rocket className="text-rockship-accent w-5 h-5" />
            <span className="text-sm font-semibold text-rockship-accent">
              What We Build
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Built for <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-xl text-rockship-300 max-w-2xl mx-auto">
            Our platform handles everything from data ingestion to model
            deployment, so you can focus on building intelligent solutions.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformData.features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Cpu;
              return (
                <PlatformCard
                  key={index}
                  icon={<Icon size={28} />}
                  title={feature.title}
                  desc={feature.desc}
                />
              );
            })}
          </div>
        </FadeIn>

        <FadeIn className="mt-20">
          <div className="text-center">
            <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-rockship-accent/10 to-transparent border border-white/10 backdrop-blur-sm">
              <div className="text-5xl font-bold gradient-text mb-2">
                {platformData.uptimeSLA}
              </div>
              <div className="text-rockship-300 font-medium">Uptime SLA</div>
              <div className="text-sm text-rockship-400 mt-1">
                Enterprise-grade reliability
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
