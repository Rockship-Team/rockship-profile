"use client";

import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import {
  Brain,
  Infinity as InfinityIcon,
  Lightbulb,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { testimonialsData } from "@/lib/data";

export function Testimonials() {
  const [activeId, setActiveId] = useState(testimonialsData[0].id);
  const activeTestimonial =
    testimonialsData.find((t) => t.id === activeId) || testimonialsData[0];

  return (
    <section className="py-16 md:py-32 bg-rockship-950 text-center px-6 border-t border-white/10 relative overflow-hidden">
      <FadeIn className="max-w-6xl mx-auto">
        <h2 className="text-rockship-accent font-semibold tracking-widest uppercase text-sm mb-4">
          Customers
        </h2>
        <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-rockship-400">
          We have changed the game of AI data
        </h3>
        <p className="text-lg text-rockship-300 leading-relaxed pb-16">
          Hear it from the experts building the future.
        </p>

        {/* Card Area */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 md:p-16 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group">
          {/* Radial gradient backing for subtle glow - colors adapt to active brand logic roughly */}
          <div
            className={cn(
              "absolute inset-0 opacity-10 transition-colors duration-1000 bg-gradient-to-br to-transparent",
              activeId === "meta"
                ? "from-blue-600"
                : activeId === "deepmind"
                ? "from-red-600"
                : activeId === "eureka"
                ? "from-yellow-600"
                : "from-purple-600"
            )}
          />

          <div
            key={activeId}
            className="relative z-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          >
            <p className="text-xl md:text-3xl leading-relaxed font-light text-white mb-10">
              "{activeTestimonial.quote}"
            </p>
            <div>
              <div className="text-white font-semibold text-lg">
                {activeTestimonial.author}
              </div>
              <div className="text-gray-500">{activeTestimonial.role}</div>
            </div>
          </div>
        </div>

        {/* Logos Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16">
          {testimonialsData.map((t) => {
            const iconMap: Record<string, LucideIcon> = {
              "InfinityIcon": InfinityIcon,
              "Brain": Brain,
              "Lightbulb": Lightbulb,
              "PenTool": PenTool,
            };
            const Icon = iconMap[t.logoIcon as string];

            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={cn(
                  "flex items-center gap-2 text-xl md:text-2xl font-bold transition-all duration-300",
                  activeId === t.id
                    ? "text-white opacity-100 scale-105"
                    : "text-gray-600 opacity-50 hover:opacity-100 hover:text-gray-300 transform hover:scale-105"
                )}
                aria-label={`Show testimonial from ${t.logoName}`}
              >
                {Icon && <Icon className="w-6 h-6 md:w-8 md:h-8" />}
                <span>{t.logoName}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
