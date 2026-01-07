"use client";

import dynamic from "next/dynamic";
import { Clients } from "@/components/landing/Clients";
import { Footer } from "../components/Footer";
import CareerCTA from "../components/landing/CareerCTA";
import { CaseStudies } from "../components/landing/CaseStudies";
import { Company } from "../components/landing/Company";
import { Hero } from "../components/landing/Hero";
import { Platform } from "../components/landing/Platform";
import { Solutions } from "../components/landing/Solutions";
import { WhyUs } from "../components/landing/WhyUs";
import { Navbar } from "../components/Navbar";

// Dynamically import heavy components to improve initial load performance
const GeminiAssistant = dynamic(() => import("../components/GeminiAssistant").then(mod => ({ default: mod.GeminiAssistant })), {
  loading: () => (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="animate-pulse bg-rockship-900/50 w-16 h-16 rounded-full shadow-lg" />
    </div>
  ),
  ssr: false,
});

export default function Home() {
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
