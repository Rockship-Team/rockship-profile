import { researchData } from "@/lib/data";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Microscope,
  Network,
  Sparkles,
} from "lucide-react";
import React from "react";
import { FadeIn } from "../FadeIn";

const ResearchCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  delay: number;
}> = ({ icon, title, category, description, delay }) => (
  <FadeIn delay={delay} className="h-full">
    <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent hover:from-rockship-accent/50 hover:to-rockship-accent/10 transition-all duration-500">
      {/* Inner Content Wrapper for border effect */}
      <div className="relative h-full bg-rockship-950/80 rounded-[22px] p-8 flex flex-col overflow-hidden backdrop-blur-md transition-colors duration-500 group-hover:bg-rockship-950/60">
        {/* Decorative background glow on hover */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rockship-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-white/5 rounded-xl text-rockship-accent border border-white/10 group-hover:scale-110 group-hover:bg-rockship-accent group-hover:text-white transition-all duration-300 shadow-[0_0_20px_-10px_rgba(var(--color-rockship-accent),0.5)]">
              {icon}
            </div>
            <span className="text-[10px] font-bold text-rockship-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider group-hover:text-white transition-colors">
              {category}
            </span>
          </div>

          <h3 className="text-2xl font-display font-medium text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-rockship-200 transition-all">
            {title}
          </h3>

          <p className="text-rockship-300 text-sm leading-relaxed mb-8 flex-grow">
            {description}
          </p>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
            <span className="text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
              Read Paper
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-rockship-accent group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);

export const Research: React.FC = () => {
  return (
    <section
      id="research"
      className="py-16 md:py-32 bg-rockship-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <Sparkles className="text-rockship-accent w-4 h-4" />
              <span className="text-xs font-medium text-rockship-200 tracking-wide uppercase">
                Rockship R&D Labs
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-tight">
              Inventing the <br />
              <span className="gradient-text">Unseen Future</span>
            </h2>
            <p className="text-rockship-300 text-lg leading-relaxed max-w-xl">
              Our research division publishes top-tier work in generative
              models, reinforcement learning, and ethical AI alignment, pushing
              the boundaries of what's possible.
            </p>
          </div>

          <button className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all duration-300 backdrop-blur-md">
            <BookOpen
              size={18}
              className="text-rockship-400 group-hover:text-white transition-colors"
            />
            <span className="font-medium">View All Publications</span>
            <ArrowRight
              size={16}
              className="text-rockship-400 group-hover:text-white group-hover:translate-x-1 transition-all"
            />
          </button>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {researchData.map((item, index) => {
            const iconMap: Record<string, React.ReactNode> = {
              Network: <Network size={24} />,
              Microscope: <Microscope size={24} />,
              GraduationCap: <GraduationCap size={24} />,
            };

            return (
              <ResearchCard
                key={index}
                delay={0.1 * (index + 1)}
                icon={iconMap[item.icon as string] || <Network size={24} />}
                category={item.category}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
