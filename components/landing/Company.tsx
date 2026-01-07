import { companyData } from "@/lib/data";
import { ArrowUpRight, Globe, Users } from "lucide-react";
import React from "react";
import { FadeIn } from "../FadeIn";

export const Company: React.FC = () => {
  return (
    <section
      id="company"
      className="py-16 md:py-32 bg-rockship-950 relative overflow-hidden"
    >
      {/* Decorative large text */}
      <div className="absolute -left-10 top-20 text-[20rem] font-bold text-white/[0.02] pointer-events-none select-none font-display">
        TEAM
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right" distance={40}>
            {/* <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-rockship-accent mb-6">
              EST. 2024
            </div> */}
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              We build and operate
              <br />
              <span className="text-white decoration-rockship-accent/50 underline decoration-4 underline-offset-4">
                enterprise AI systems.
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Rockship partners with enterprises to design, deploy, and scale AI
              systems that automate real business workflows.
              <br />
              We work end-to-end — from problem definition and system
              architecture, to production deployment and ongoing operations —
              helping organizations turn AI into measurable operational impact.
            </p>

            <div className="grid grid-cols-3 gap-8 mb-10">
              {companyData.companyStats.map((stat, index) => (
                <div key={index}>
                  <h4 className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </h4>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <button className="group flex items-center gap-3 text-white font-bold hover:text-rockship-accent transition-colors">
              Meet the Team{" "}
              <ArrowUpRight
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                size={18}
              />
            </button>
          </FadeIn>

          <FadeIn
            className="relative"
            delay={300}
            direction="left"
            distance={40}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4 sm:translate-y-8">
                {/* First team member */}
                <div className="aspect-[4/5] bg-gray-800 rounded-2xl overflow-hidden relative group">
                  <img
                    src={companyData.teamMembers[0].image}
                    className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                    alt={`${companyData.teamMembers[0].name} - ${companyData.teamMembers[0].role} at Rockship AI`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-white font-bold">
                      {companyData.teamMembers[0].name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {companyData.teamMembers[0].role}
                    </span>
                  </div>
                </div>
                {/* Office */}
                <div className="aspect-square bg-rockship-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/5 hover:bg-rockship-800/80 transition shadow-lg">
                  <Globe
                    className="text-rockship-accent mb-4"
                    size={32}
                    aria-hidden="true"
                  />
                  <span className="text-white font-bold text-sm">
                    {companyData.offices[0].city}
                  </span>
                  <span className="text-gray-500 text-xs mt-1">
                    {companyData.offices[0].street}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-rockship-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/5 hover:bg-rockship-800/80 transition shadow-lg">
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
                {/* Second team member */}
                <div className="aspect-[4/5] bg-gray-800 rounded-2xl overflow-hidden relative group">
                  <img
                    src={companyData.teamMembers[1].image}
                    className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                    alt={`${companyData.teamMembers[1].name} - ${companyData.teamMembers[1].role} of Rockship AI`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-white font-bold">
                      {companyData.teamMembers[1].name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {companyData.teamMembers[1].role}
                    </span>
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
