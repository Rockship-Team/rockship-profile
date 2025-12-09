import {
  BookOpen,
  GraduationCap,
  Microscope,
  Network,
  Sparkles,
} from "lucide-react";
import React from "react";
import { FadeIn } from "./FadeIn";

const ResearchCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
}> = ({ icon, title, category, description }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-rockship-900 border border-white/10 p-8 hover:border-rockship-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-rockship-accent/10">
    <div className="absolute inset-0 bg-gradient-to-br from-rockship-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/5 rounded-lg text-rockship-accent group-hover:bg-rockship-accent group-hover:text-black transition-colors duration-300">
          {icon}
        </div>
        <span className="text-xs font-mono text-gray-400 border border-white/10 px-2 py-1 rounded full uppercase tracking-wider">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-rockship-accent transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {description}
      </p>
      <a
        href="#"
        className="inline-flex items-center text-sm font-bold text-white/70 hover:text-white transition group-hover:translate-x-1 duration-200"
      >
        Read Paper <span className="ml-2">→</span>
      </a>
    </div>
  </div>
);

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-24 bg-rockship-950 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-rockship-accent w-5 h-5" />
              <span className="text-rockship-accent font-mono text-sm uppercase tracking-widest">
                R&D Labs
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Inventing the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rockship-accent to-purple-400">
                Unseen
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Our research division publishes top-tier work in generative
              models, reinforcement learning, and ethical AI alignment.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
            <BookOpen size={18} />
            <span>View All Publications</span>
          </button>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          <ResearchCard
            icon={<Network size={24} />}
            category="Architecture"
            title="Liquid Neural Networks"
            description="A new class of adaptive neural networks that can change their underlying structure during inference, reducing compute by 60%."
          />
          <ResearchCard
            icon={<Microscope size={24} />}
            category="Healthcare"
            title="Protein Folding at Scale"
            description="Using diffusion models to predict protein structure variations in real-time for rapid drug discovery pipelines."
          />
          <ResearchCard
            icon={<GraduationCap size={24} />}
            category="Alignment"
            title="Constitutional AI Safety"
            description="Frameworks for self-supervising AI models to ensure adherence to human values without massive human labeling."
          />
        </div>
      </div>
    </section>
  );
};
