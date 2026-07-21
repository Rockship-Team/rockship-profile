"use client";

import { CaseStudyCard } from "@/components/CaseStudyCard";
import { FadeIn } from "@/components/FadeIn";
import { caseStudiesData } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

export const DefaultMetadata = {
  title: "Case Studies | RockshipAI",
  description:
    "Explore how RockshipAI helps enterprises transform their operations with production-ready AI solutions.",
};

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Industries");

  const categories = [
    "All Industries",
    "Fintech",
    "HealthTech",
    "PropTech",
    "Retail",
  ];

  // Map "Retail" to "E-commerce" or "B2B Sales" implicitly if needed,
  // or checks strictly. Based on user data, "Retail" likely maps to "E-commerce" & "B2B Sales"
  const filteredStudies = useMemo(() => {
    if (selectedCategory === "All Industries") {
      return caseStudiesData;
    }
    return caseStudiesData.filter((study) => {
      // Custom mapping for Retail since it's not explicitly in the data tags
      if (selectedCategory === "Retail") {
        return study.industries.some((ind) =>
          ["Retail", "E-commerce", "B2B Sales", "Food Distribution"].includes(
            ind
          )
        );
      }
      return study.industries.includes(selectedCategory);
    });
  }, [selectedCategory]);

  // Memoize category selection handler
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <main className="rk min-h-screen bg-white text-[#1D1D1F] selection:bg-[#FF4D00]/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-black/[0.06] supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors group px-4 py-2 rounded-lg hover:bg-black/[0.03]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FF4D00]" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-black/45">
              Transforming Enterprises with AI
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Dynamic Background */}

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="flex flex-col gap-6 max-w-4xl">
              <span className="text-[#FF4D00] font-semibold tracking-wider uppercase text-sm">
                Our Work
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-[#1D1D1F] mb-6">
                Proven Impact across <br />
                <span className="text-[#FF4D00]">
                  Multiple Industries
                </span>
              </h1>
              <p className="text-xl text-[#3A3D42] leading-relaxed max-w-2xl">
                We don't just build POCs. We deliver production-ready AI systems
                that solve complex operational challenges and drive measurable
                ROI for enterprises.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filter / Category Section */}
      <div className="container mx-auto px-6 mb-12 border-b border-black/[0.06]">
        <div className="flex gap-8 overflow-x-auto pb-0 no-scrollbar relative min-h-[50px]">
          {categories.map((cat, i) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`relative text-sm font-medium whitespace-nowrap transition-colors pb-4 px-2
                  ${
                    isActive
                      ? "text-[#1D1D1F]"
                      : "text-[#86868B] hover:text-[#1D1D1F]"
                  }`}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D00]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Section */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.slug || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-h-[420px]"
                >
                  <CaseStudyCard item={study} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredStudies.length === 0 && (
              <div className="col-span-full py-20 text-center text-[#86868B] flex flex-col items-center">
                <p className="text-lg">
                  No case studies found for this category yet.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Call to Action */}
          <FadeIn>
            <div className="mt-32 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1D1D1F]/[0.03] to-transparent border border-black/[0.06] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#FF4D00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h2 className="text-3xl font-display font-bold text-[#1D1D1F] mb-6 relative z-10">
                Have a unique challenge?
              </h2>
              <p className="text-[#3A3D42] max-w-xl mx-auto mb-8 relative z-10">
                Our engineering team specializes in solving novel problems with
                custom AI architectures. Let's discuss your specific needs.
              </p>

              <Link href="/contact" className="relative z-10 inline-block">
                <button className="bg-[#FF4D00] text-white px-8 py-3 rounded-full font-medium hover:opacity-85 transition-opacity">
                  Book a Consultation
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
