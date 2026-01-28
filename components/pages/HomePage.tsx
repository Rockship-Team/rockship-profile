"use client";

import { useScrollTarget } from "@/hooks/useSmoothScroll";
import dynamic from "next/dynamic";
import { useEffect, useState, memo } from "react";
import { Footer } from "../Footer";
import { Hero } from "../landing/Hero";
import { Platform } from "../landing/Platform";
import { Navbar } from "../Navbar";

// Hook to detect mobile and delay non-critical components
const useDelayedRender = (delay: number = 3000) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      setShouldRender(true);
      return;
    }

    // Delay render on mobile to prioritize initial page load
    const timer = setTimeout(() => setShouldRender(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRender;
};

// Minimal loading skeleton - using CSS only, no JS overhead
const SectionSkeleton = memo(({ height = "h-96" }: { height?: string }) => (
  <div className={`${height} w-full bg-rockship-900/30`} />
));
SectionSkeleton.displayName = "SectionSkeleton";

// Dynamic import các sections below-the-fold để giảm initial bundle size
// Using ssr: false for below-fold content to reduce server render time
const Solutions = dynamic(
  () => import("../landing/Solutions").then((mod) => ({ default: mod.Solutions })),
  { loading: () => <SectionSkeleton height="h-[600px]" />, ssr: false }
);

const Clients = dynamic(
  () => import("@/components/landing/Clients").then((mod) => ({ default: mod.Clients })),
  { loading: () => <SectionSkeleton height="h-80" />, ssr: false }
);

const CaseStudies = dynamic(
  () => import("../landing/CaseStudies").then((mod) => ({ default: mod.CaseStudies })),
  { loading: () => <SectionSkeleton height="h-[700px]" />, ssr: false }
);

const WhyUs = dynamic(
  () => import("../landing/WhyUs").then((mod) => ({ default: mod.WhyUs })),
  { loading: () => <SectionSkeleton height="h-[500px]" />, ssr: false }
);

const Company = dynamic(
  () => import("../landing/Company").then((mod) => ({ default: mod.Company })),
  { loading: () => <SectionSkeleton height="h-96" />, ssr: false }
);

const CareerCTA = dynamic(
  () => import("../landing/CareerCTA"),
  { loading: () => <SectionSkeleton height="h-64" />, ssr: false }
);

// Dynamically import heavy components to improve initial load performance
const GroqAssistant = dynamic(
  () =>
    import("../GroqAssistant").then((mod) => ({
      default: mod.GroqAssistant,
    })),
  {
    loading: () => null, // No visible loader for chatbot
    ssr: false,
  },
);

export default function HomePage() {
  const shouldRenderChatbot = useDelayedRender(5000);

  // Handle scroll to section when navigating from other pages
  useScrollTarget();

  return (
    <div className="min-h-screen bg-rockship-950 text-white font-sans selection:bg-rockship-accent selection:text-rockship-900">
      <Navbar />
      <main>
        <Hero />
        <Platform />
        <Solutions />
        <Clients />
        <CaseStudies />
        <WhyUs />
        <Company />
        <CareerCTA />
      </main>
      <Footer />
      {shouldRenderChatbot && <GroqAssistant />}
    </div>
  );
}
