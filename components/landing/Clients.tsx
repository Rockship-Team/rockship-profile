import { cn } from "@/lib/utils";
import { FadeIn } from "../FadeIn";

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

const IndustryItem = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-8 py-4 opacity-50 hover:opacity-100 transition-all duration-300 group cursor-pointer",
        className
      )}
    >
      <div className="p-2 rounded-full border border-rockship-700/50 bg-rockship-900/50 group-hover:bg-rockship-800 group-hover:border-rockship-600 transition-all duration-300">
        <div className="w-2 h-2 rounded-full bg-rockship-400 group-hover:bg-rockship-accent group-hover:shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-300" />
      </div>
      <span className="text-xl md:text-2xl font-bold font-heading whitespace-nowrap text-rockship-300 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </div>
  );
};

export function Clients() {
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

      <FadeIn className="container text-center relative z-10 px-4 flex flex-col items-center">
        <span className="text-sm md:text-base font-bold tracking-[0.2em] text-indigo-400 uppercase">
          Trusted by Enterprise Teams
        </span>
        <p className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-rockship-400 mt-4 max-w-3xl">
          Trusted by Enterprises to Build Real AI Operations
        </p>
      </FadeIn>

      <div
        className="relative w-full overflow-hidden mt-8"
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
    </section>
  );
}
