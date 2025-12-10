import { solutionsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Brain,
  Eye,
  GitBranch,
  LayoutTemplate,
  LucideIcon,
  Mic,
  Server,
  Zap,
} from "lucide-react";
import React from "react";
import { FadeIn } from "../FadeIn";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Brain,
  Eye,
  GitBranch,
  Mic,
};

const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}> = ({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.15)", // Rockship Accent color
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-rockship-accent/5",
        className
      )}
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

const PlatformFeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  delay?: string;
}> = ({ icon, title, desc, className, delay }) => (
  <SpotlightCard className={cn("h-full flex flex-col", className)}>
    {/* Inner decorative gradient - fills the whole card */}
    <div className="absolute inset-0 bg-gradient-to-br from-rockship-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

    {/* Large Background Icon Faded - fills the whole card area */}
    <div className="absolute -top-4 -right-4 text-white/[0.03] group-hover:text-white/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 pointer-events-none z-0">
      {React.cloneElement(icon as React.ReactElement<any>, {
        size: 160,
        strokeWidth: 0.5,
      })}
    </div>

    {/* Content Container - Padded */}
    <div className="p-8 flex flex-col h-full relative z-10">
      {/* Header */}
      <div className="mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(var(--color-rockship-accent),0.5)] transition-all duration-300">
          <div className="text-rockship-200 group-hover:text-white transition-colors">
            {icon}
          </div>
        </div>

        <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-rockship-100 transition-colors">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="mt-auto">
        <p className="text-rockship-300 leading-relaxed text-sm group-hover:text-rockship-200 transition-colors">
          {desc}
        </p>
      </div>
    </div>
  </SpotlightCard>
);

export const Solutions: React.FC = () => {
  return (
    <section
      id="solutions"
      className="py-16 md:py-32 bg-rockship-950 relative overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-rockship-accent/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <Zap className="text-rockship-accent w-4 h-4" />
            <span className="text-xs font-medium text-rockship-200 tracking-wide uppercase">
              How It Work
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-medium mb-6 leading-tight">
            AI Systems Built for <br />
            <span className="gradient-text">Real Business Operations</span>
          </h3>
          <p className="text-lg text-rockship-300 leading-relaxed max-w-2xl mx-auto">
            We design and deploy <b>end-to-end AI systems</b> tailored to your
            business — from intelligent agents and automation to enterprise
            integration and governance.
          </p>
        </FadeIn>

        {/* Bento Grid */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 md:auto-rows-fr">
            {/* Solution Cards */}
            {solutionsData.solutions.map((solution, index) => {
              const Icon = iconMap[solution.icon] || Brain;
              const cardClass =
                solution.size === "large"
                  ? "md:col-span-4 lg:col-span-4"
                  : "md:col-span-6 lg:col-span-4";

              return (
                <PlatformFeatureCard
                  key={index}
                  className={cardClass}
                  icon={<Icon size={32} />}
                  title={solution.title}
                  desc={solution.desc}
                />
              );
            })}

            {/* Enterprise - Large Card */}
            <SpotlightCard className="md:col-span-6 lg:col-span-8 p-6 md:p-10 relative overflow-hidden group">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-105 duration-700 pointer-events-none">
                <LayoutTemplate size={180} strokeWidth={0.5} />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rockship-accent/20 text-rockship-accent">
                    <Server size={24} />
                  </div>
                  Enterprise-Grade Deployment & Integration
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {solutionsData.enterpriseFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-start p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200 group/feature"
                    >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-rockship-accent shrink-0 group-hover/feature:shadow-[0_0_10px_rgba(var(--color-rockship-accent),0.8)] transition-shadow" />
                      <div>
                        <h4 className="font-bold text-white text-sm tracking-wide">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-rockship-300 mt-1 font-medium">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
            {/* Security - Wide Card at Bottom */}
            {/* <SpotlightCard className="md:col-span-8 border-rockship-accent/20 bg-rockship-900/40">
              <div className="absolute inset-0 bg-gradient-to-r from-rockship-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-8 md:p-12 h-full flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold tracking-wide uppercase shadow-[0_0_15px_-5px_rgba(34,197,94,0.3)]">
                    <ShieldCheck size={14} /> DOD Level Security
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-white">
                    GovCloud & Compliance
                  </h3>
                  <p className="text-rockship-300 max-w-2xl text-lg leading-relaxed">
                    We engineered our platform for the world's most regulated
                    industries. Fully compliant with ISO 27001, SOC2 Type II,
                    HIPAA, and GDPR. Our Defense AI unit provides specialized
                    air-gapped solutions for national security.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {solutionsData.complianceBadges.map((badge) => (
                      <span
                        key={badge}
                        className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-rockship-200 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto flex justify-center shrink-0">
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 border border-green-500/10 rounded-full animate-ping [animation-duration:3s]" />
                    <div className="absolute inset-4 border border-green-500/20 rounded-full animate-spin-slow duration-[10s]" />
                    <div className="absolute inset-12 border-2 border-dashed border-green-500/30 rounded-full animate-spin-slow duration-[20s] reverse" />

                    <div className="relative z-10 bg-rockship-950/80 p-6 rounded-2xl border border-green-500/30 shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)] backdrop-blur-sm">
                      <Lock size={48} className="text-green-400" />
                    </div>

                    <div className="absolute inset-0 bg-green-500/5 blur-[60px] rounded-full pointer-events-none" />
                  </div>
                </div>
              </div>
            </SpotlightCard> */}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
