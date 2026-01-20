"use client";

import { Clients } from "@/components/landing/Clients";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Footer } from "../Footer";
import CareerCTA from "../landing/CareerCTA";
import { CaseStudies } from "../landing/CaseStudies";
import { Company } from "../landing/Company";
import { Hero } from "../landing/Hero";
import { Platform } from "../landing/Platform";
import { Solutions } from "../landing/Solutions";
import { WhyUs } from "../landing/WhyUs";
import { Navbar } from "../Navbar";

// Dynamically import heavy components to improve initial load performance
const GeminiAssistant = dynamic(
  () =>
    import("../GeminiAssistant").then((mod) => ({
      default: mod.GeminiAssistant,
    })),
  {
    loading: () => (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="animate-pulse bg-rockship-900/50 w-16 h-16 rounded-full shadow-lg" />
      </div>
    ),
    ssr: false,
  },
);

// Preload 3D module khi browser idle
const preload3DModule = () => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(
      () => {
        import("../landing/Hero3D").catch(() => {
          // Silently fail - component will load on demand
        });
      },
      { timeout: 2000 },
    );
  }
};

export default function HomePage() {
  // Preload 3D khi component mount
  useEffect(() => {
    preload3DModule();
  }, []);

  return (
    <div className="min-h-screen bg-rockship-950 text-white font-sans selection:bg-rockship-accent selection:text-rockship-900">
      <Navbar />
      <main>
        <Hero />
        <Platform />
        <Solutions />
        <Clients />
        {/* <TechStack /> */}
        <CaseStudies />
        {/* <Research /> */}
        {/* <BuildAISection /> */}
        <WhyUs />
        <Company />
        {/* <Testimonials /> */}
        <CareerCTA />
      </main>
      <Footer />
      <GeminiAssistant />
    </div>
  );
}
