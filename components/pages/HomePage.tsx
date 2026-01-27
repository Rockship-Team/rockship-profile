"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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

// Section loading skeleton
const SectionSkeleton = ({ height = "h-96" }: { height?: string }) => (
  <div className={`${height} w-full animate-pulse bg-rockship-900/30`}>
    <div className="container mx-auto px-6 py-16">
      <div className="h-8 w-48 bg-rockship-800/50 rounded mb-8" />
      <div className="space-y-4">
        <div className="h-4 w-3/4 bg-rockship-800/30 rounded" />
        <div className="h-4 w-1/2 bg-rockship-800/30 rounded" />
      </div>
    </div>
  </div>
);

// Dynamic import các sections below-the-fold để giảm initial bundle size
const Solutions = dynamic(
  () => import("../landing/Solutions").then((mod) => ({ default: mod.Solutions })),
  { loading: () => <SectionSkeleton height="h-[600px]" /> }
);

const Clients = dynamic(
  () => import("@/components/landing/Clients").then((mod) => ({ default: mod.Clients })),
  { loading: () => <SectionSkeleton height="h-80" /> }
);

const CaseStudies = dynamic(
  () => import("../landing/CaseStudies").then((mod) => ({ default: mod.CaseStudies })),
  { loading: () => <SectionSkeleton height="h-[700px]" /> }
);

const WhyUs = dynamic(
  () => import("../landing/WhyUs").then((mod) => ({ default: mod.WhyUs })),
  { loading: () => <SectionSkeleton height="h-[500px]" /> }
);

const Company = dynamic(
  () => import("../landing/Company").then((mod) => ({ default: mod.Company })),
  { loading: () => <SectionSkeleton height="h-96" /> }
);

const CareerCTA = dynamic(
  () => import("../landing/CareerCTA"),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

// Dynamically import heavy components to improve initial load performance
const GroqAssistant = dynamic(
  () =>
    import("../GroqAssistant").then((mod) => ({
      default: mod.GroqAssistant,
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
    // Avoid preloading on mobile/low-end devices to prioritize main thread
    if (window.innerWidth < 768) return;

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

  // Delay loading GroqAssistant on mobile for better initial performance
  const shouldRenderChatbot = useDelayedRender(3000);

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
      {shouldRenderChatbot && <GroqAssistant />}
    </div>
  );
}
