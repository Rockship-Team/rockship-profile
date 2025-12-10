"use client";

import { Clients } from "@/components/landing/Clients";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "../components/Footer";
import { GeminiAssistant } from "../components/GeminiAssistant";
import { BuildAISection } from "../components/landing/BuildAISection";
import CareerCTA from "../components/landing/CareerCTA";
import { CaseStudies } from "../components/landing/CaseStudies";
import { Company } from "../components/landing/Company";
import { Hero } from "../components/landing/Hero";
import { Platform } from "../components/landing/Platform";
import { Research } from "../components/landing/Research";
import { Solutions } from "../components/landing/Solutions";
import { TechStack } from "../components/landing/TechStack";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-rockship-950 text-white font-sans selection:bg-rockship-accent selection:text-rockship-900">
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Platform />
        <Solutions />
        <TechStack />
        <CaseStudies />
        <Research />
        <BuildAISection />
        <Company />
        <Testimonials />
        <CareerCTA />
      </main>
      <Footer />
      <GeminiAssistant />
    </div>
  );
}
