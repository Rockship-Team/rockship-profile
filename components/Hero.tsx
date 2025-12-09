import { ArrowRight, Play } from "lucide-react";
import React from "react";
import { FadeIn } from "./FadeIn";
import { Hero3D } from "./Hero3D";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-rockship-950"
    >
      {/* 3D Background Layer - Full Screen */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Static Background Decor (Behind 3D) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rockship-purple/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rockship-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse-slow" />

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-20 md:pt-0 relative z-10 pointer-events-none">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content - Enable pointer events for buttons/text */}
          <div className="text-left pointer-events-auto">
            <FadeIn className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rockship-900/80 border border-white/10 text-rockship-accent text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-rockship-accent animate-pulse"></span>
              Rockship GenAI Engine v2.5 Live
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight drop-shadow-2xl">
                Rockship Intelligence <br />
                <span className="gradient-text">For The Enterprise</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed drop-shadow-md">
                We build the cognitive infrastructure for the next generation of
                business. From custom LLMs to computer vision pipelines,
                RockshipAI delivers secure, compliant, and rockship AI
                solutions.
              </p>
            </FadeIn>

            <FadeIn
              delay={300}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="relative px-8 py-4 bg-gradient-to-r from-rockship-accent to-rockship-accent-secondary text-white rounded-lg font-bold hover:brightness-110 transition hover:scale-105 active:scale-95 duration-200 flex items-center gap-2 justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-white/20 overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Platform <ArrowRight size={20} />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <button className="px-8 py-4 bg-rockship-900/50 backdrop-blur-sm border border-white/20 text-white rounded-lg font-bold hover:bg-white/10 transition hover:scale-105 active:scale-95 duration-200 flex items-center gap-2 justify-center">
                <Play size={20} className="fill-current" /> Watch Showreel
              </button>
            </FadeIn>

            {/* Stats Strip */}
            {/* Stats Strip */}
            <FadeIn
              delay={400}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8"
            >
              {[
                { label: "Enterprises", val: "150+" },
                { label: "Data Points", val: "500M+" },
                { label: "Accuracy", val: "40%+" },
                { label: "Uptime", val: "99.9%" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col text-left">
                  <span className="text-2xl font-display font-bold text-white">
                    {stat.val}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Empty column to maintain grid layout, but 3D is behind everything now */}
          <div className="hidden md:block h-[600px] w-full pointer-events-none">
            {/* The rocket lives in the absolute background, but visually occupies this space initially */}
          </div>
        </div>
      </div>
    </section>
  );
};
