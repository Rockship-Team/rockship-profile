import { companyData } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Activity,
  Box,
  Cloud,
  Cpu,
  Globe,
  Hexagon,
  Infinity,
  Layers,
  LucideIcon,
  Share2,
  Triangle,
  Zap,
} from "lucide-react";
import { FadeIn } from "../FadeIn";

// Map client names to icons for a more polished look
const iconMap: Record<string, LucideIcon> = {
  QuantumLeap: Zap,
  DataWeave: Share2,
  FutureTech: Cpu,
  Synergy: Infinity,
  AlphaInc: Hexagon,
  NextGen: Activity,
  CloudScale: Cloud,
  "Innovate Hub": Box,
  "AI Alliance": Globe,
  TechForward: Layers,
};

const ClientLogo = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = iconMap[name] || Triangle;
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-8 py-4 opacity-50 hover:opacity-100 transition-all duration-300 group cursor-pointer grayscale hover:grayscale-0",
        className
      )}
    >
      <div className="p-2 rounded-lg bg-rockship-800/50 group-hover:bg-rockship-800 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-rockship-300 group-hover:text-rockship-accent transition-colors duration-300" />
      </div>
      <span className="text-xl md:text-2xl font-bold font-heading traling-wide text-rockship-400 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </div>
  );
};

export function Clients() {
  // Combine and duplicate to ensure we have enough items for a smooth loop
  const allClients = [...companyData.clients, ...companyData.partners];
  const row1 = [...allClients, ...allClients];
  const row2 = [...allClients.reverse(), ...allClients]; // Reverse for variety

  return (
    <section
      id="clients"
      className="py-16 md:py-32 bg-rockship-950 relative overflow-hidden flex flex-col items-center justify-center gap-10"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-rockship-800)_0%,_transparent_70%)] opacity-20 pointer-events-none" />

      <FadeIn className="container text-center relative z-10 px-4">
        <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-rockship-accent mb-3">
          TRUSTED BY ENTERPRISE TEAMS
        </h2>
        <p className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-rockship-400">
          Trusted by Enterprises to Deploy AI into Real Operations
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
          {row1.map((client, index) => (
            <ClientLogo key={`${client}-1-${index}`} name={client} />
          ))}
        </div>

        {/* Row 2: Right to Left (Reverse) */}
        <div
          className="flex w-max animate-scroll hover:[animation-play-state:paused] py-4 mt-2 md:mt-6"
          style={{ animationDirection: "reverse" }}
        >
          {row2.map((client, index) => (
            <ClientLogo key={`${client}-2-${index}`} name={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
