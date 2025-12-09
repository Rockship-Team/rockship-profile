import { ArrowUpRight, Globe, Users } from "lucide-react";
import React from "react";
import { FadeIn } from "./FadeIn";

export const Company: React.FC = () => {
  return (
    <section
      id="company"
      className="py-24 md:py-32 bg-rockship-950 relative overflow-hidden"
    >
      {/* Decorative large text */}
      <div className="absolute -left-10 top-20 text-[20rem] font-bold text-white/[0.02] pointer-events-none select-none font-display">
        TEAM
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-rockship-accent mb-6">
              EST. 2024
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              We are builders of the <br />
              <span className="text-white decoration-rockship-accent/50 underline decoration-4 underline-offset-4">
                Intelligence Age
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Rockship AI was founded by a team of ex-DeepMind and OpenAI
              researchers with a singular mission: to democratize access to
              safe, enterprise-grade artificial intelligence. We believe that
              powerful AI should be accessible, transparent, and aligned with
              human progress.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">150+</h4>
                <p className="text-gray-500 text-sm">Enterprise Clients</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">40+</h4>
                <p className="text-gray-500 text-sm">PhD Researchers</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">$50M</h4>
                <p className="text-gray-500 text-sm">Series A Funding</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">3</h4>
                <p className="text-gray-500 text-sm">Global Offices</p>
              </div>
            </div>

            <button className="group flex items-center gap-3 text-white font-bold hover:text-rockship-accent transition-colors">
              Meet the Team{" "}
              <ArrowUpRight
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                size={18}
              />
            </button>
          </FadeIn>

          <FadeIn className="relative" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="aspect-[4/5] bg-gray-800 rounded-2xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                    className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                    alt="Elena Ross - Chief Scientist at Rockship AI"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-white font-bold">Elena Ross</span>
                    <span className="text-xs text-gray-400">
                      Chief Scientist
                    </span>
                  </div>
                </div>
                <div className="aspect-square bg-rockship-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/5 hover:bg-rockship-800/80 transition">
                  <Globe
                    className="text-rockship-accent mb-4"
                    size={32}
                    aria-hidden="true"
                  />
                  <span className="text-white font-bold text-sm">
                    San Francisco HQ
                  </span>
                  <span className="text-gray-500 text-xs mt-1">
                    Foundry St.
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-rockship-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/5 hover:bg-rockship-800/80 transition">
                  <Users
                    className="text-purple-400 mb-4"
                    size={32}
                    aria-hidden="true"
                  />
                  <span className="text-white font-bold text-sm">
                    Open Positions
                  </span>
                  <span className="text-gray-500 text-xs mt-1">
                    We are hiring
                  </span>
                </div>
                <div className="aspect-[4/5] bg-gray-800 rounded-2xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                    className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                    alt="David Chen - CEO & Founder of Rockship AI"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-white font-bold">David Chen</span>
                    <span className="text-xs text-gray-400">CEO & Founder</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
