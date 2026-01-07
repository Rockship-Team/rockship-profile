import { cn } from "@/lib/utils";
import React from "react";
import { FadeIn } from "../FadeIn";

import {
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutTemplate,
  LucideIcon,
  Megaphone,
  Plane,
  Rocket,
  ShoppingBag,
  Truck,
  Utensils,
} from "lucide-react";
import { Sparkles } from "../Sparkles";

const industries = [
  "E-commerce & Retail",
  "Tourism & Hospitality",
  "F&B & Distribution",
  "Fintech & Banking",
  "SaaS / Startup",
  "Marketing & Agency",
  "HRTech / Workforce",
  "Logistics & Supply Chain",
  "Manufacturing",
  "PropTech / Real Estate",
  "Education",
  "Study Abroad / Counseling",
  "Healthcare & Wellness",
];

const iconMap: Record<string, LucideIcon> = {
  "E-commerce & Retail": ShoppingBag,
  "Tourism & Hospitality": Plane,
  "F&B & Distribution": Utensils,
  "Fintech & Banking": Landmark,
  "SaaS / Startup": Rocket,
  "Marketing & Agency": Megaphone,
  "HRTech / Workforce": Briefcase,
  "Logistics & Supply Chain": Truck,
  Manufacturing: Factory,
  "PropTech / Real Estate": Building2,
  Education: GraduationCap,
  "Study Abroad / Counseling": LayoutTemplate,
  "Healthcare & Wellness": HeartPulse,
};

const IndustryItem = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = iconMap[name];

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-8 py-4 opacity-50 hover:opacity-100 transition-all duration-300 group cursor-pointer",
        className
      )}
    >
      <div className="p-2 rounded-full border border-rockship-700/50 bg-rockship-900/50 group-hover:bg-rockship-800 group-hover:border-rockship-600 transition-all duration-300">
        {Icon ? (
          <Icon className="w-5 h-5 text-rockship-400 group-hover:text-rockship-accent transition-colors duration-300" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-rockship-400 group-hover:bg-rockship-accent group-hover:shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-300" />
        )}
      </div>
      <span className="text-xl md:text-2xl font-bold font-heading whitespace-nowrap text-rockship-300 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </div>
  );
};

export const Clients = React.memo(function Clients() {
  // Split industries into two rows and duplicate for smooth scrolling loop
  const midPoint = Math.ceil(industries.length / 2);
  const firstHalf = industries.slice(0, midPoint);
  const secondHalf = industries.slice(midPoint);

  const row1 = [...firstHalf, ...firstHalf, ...firstHalf, ...firstHalf]; // Repeat more for smoothness
  const row2 = [...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf];

  return (
    <section
      id="clients"
      className="py-16 md:py-32 bg-rockship-950 relative overflow-hidden flex flex-col items-center justify-center gap-10"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-rockship-800)_0%,_transparent_70%)] opacity-20 pointer-events-none" />

      <FadeIn
        className="container text-center relative z-10 px-4 flex flex-col items-center"
        direction="up"
        distance={50}
        duration={0.8}
      >
        <span className="text-sm md:text-base font-bold tracking-[0.2em] text-indigo-400 uppercase">
          Trusted by Enterprise Teams
        </span>
        <p className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-rockship-400 mt-4 max-w-4xl font-display leading-tight">
          Trusted by Enterprises to Build <br /> Real AI Operations
        </p>
      </FadeIn>

      <FadeIn
        className="relative w-full overflow-hidden mt-8"
        delay={400}
        direction="none"
        duration={1}
      >
        <div
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Row 1: Left to Right (Standard) */}
          <div className="flex w-max animate-scroll hover:[animation-play-state:paused] py-4">
            {row1.map((industry, index) => (
              <IndustryItem key={`${industry}-1-${index}`} name={industry} />
            ))}
          </div>

          {/* Row 2: Right to Left (Reverse) */}
          <div
            className="flex w-max animate-scroll hover:[animation-play-state:paused] py-4 mt-2 md:mt-6"
            style={{ animationDirection: "reverse" }}
          >
            {row2.map((industry, index) => (
              <IndustryItem key={`${industry}-2-${index}`} name={industry} />
            ))}
          </div>
        </div>
        <div className="relative -mb-40 h-80 w-screen overflow-hidden mask-[radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#163474] after:bg-[#08132b]">
          <Sparkles
            density={800}
            speed={1.2}
            size={1.2}
            direction="top"
            opacitySpeed={2}
            color="#32A7FF"
            className="absolute inset-x-0 bottom-0 h-full w-full "
          />
        </div>
      </FadeIn>
    </section>
  );
});
