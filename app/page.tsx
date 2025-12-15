"use client";

import { Clients } from "@/components/landing/Clients";
import { Footer } from "../components/Footer";
import { GeminiAssistant } from "../components/GeminiAssistant";
import CareerCTA from "../components/landing/CareerCTA";
import { CaseStudies } from "../components/landing/CaseStudies";
import { Company } from "../components/landing/Company";
import { Hero } from "../components/landing/Hero";
import { Platform } from "../components/landing/Platform";
import { Solutions } from "../components/landing/Solutions";
import { WhyUs } from "../components/landing/WhyUs";
import { Navbar } from "../components/Navbar";

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
