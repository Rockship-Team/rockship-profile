"use client";

import { Clients } from "@/components/Clients";
import { Testimonials } from "@/components/Testimonials";
import { BuildAISection } from "../components/BuildAISection";
import CareerCTA from "../components/CareerCTA";
import { CaseStudies } from "../components/CaseStudies";
import { Company } from "../components/Company";
import { Footer } from "../components/Footer";
import { GeminiAssistant } from "../components/GeminiAssistant";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Platform } from "../components/Platform";
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
        <Platform />
        <Solutions />
        <BuildAISection />
        <CaseStudies />
        <Research />
        <TechStack />
        <Company />
        <Testimonials />
        <CareerCTA />
      </main>
      <Footer />
      <GeminiAssistant />
    </div>
  );
}
