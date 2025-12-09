"use client";

import { Clients } from "@/components/Clients";
import { FadeIn } from "@/components/FadeIn";
import { BuildAISection } from "../components/BuildAISection";
import { Company } from "../components/Company";
import { Footer } from "../components/Footer";
import { GeminiAssistant } from "../components/GeminiAssistant";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Research } from "../components/Research";
import { Solutions } from "../components/Solutions";
import { TechStack } from "../components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen bg-rockship-950 text-white font-sans selection:bg-rockship-accent selection:text-rockship-900">
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Solutions />
        <BuildAISection />
        <Research />
        <TechStack />
        <Company />

        {/* Case Study Teaser / Quote */}
        <section className="py-24 bg-gradient-to-b from-rockship-900 to-black text-center px-6">
          <FadeIn className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-8">
              "RockshipAI transformed our logistics operations, improving
              routing efficiency by 35% in just three months."
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden">
                <img
                  src="https://picsum.photos/100/100?grayscale"
                  alt="Director"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-white font-bold">Sarah Chen</div>
                <div className="text-gray-500 text-sm">
                  CTO, Global Logistics Corp
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Careers / CTA */}
        <section className="py-20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-rockship-accent/5 pointer-events-none"></div>
          <FadeIn className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              Ready to Rockship Intelligence?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Whether you need a custom LLM or a full-scale digital
              transformation, our team is ready to deploy.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-white text-rockship-900 font-bold rounded-lg hover:bg-gray-100 transition hover:scale-105 active:scale-95 duration-200">
                Contact Sales
              </button>
              <button className="px-8 py-3 bg-transparent border border-gray-600 text-white font-bold rounded-lg hover:border-white transition hover:scale-105 active:scale-95 duration-200">
                Join Our Team
              </button>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
      <GeminiAssistant />
    </div>
  );
}
