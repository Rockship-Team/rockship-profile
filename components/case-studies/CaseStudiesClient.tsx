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
    <main className="min-h-screen bg-rockship-950 text-white selection:bg-rockship-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-rockship-950/80 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-rockship-950/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-rockship-300 hover:text-white transition-colors group px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-rockship-accent" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-white/50">
              Transforming Enterprises with AI
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rockship-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60 mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none opacity-40 mix-blend-screen" />

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="flex flex-col gap-6 max-w-4xl">
              <span className="text-rockship-accent font-semibold tracking-wider uppercase text-sm">
                Our Work
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white mb-6">
                Proven Impact across <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rockship-accent to-blue-400">
                  Multiple Industries
                </span>
              </h1>
              <p className="text-xl text-rockship-200 leading-relaxed max-w-2xl">
                We don't just build POCs. We deliver production-ready AI systems
                that solve complex operational challenges and drive measurable
                ROI for enterprises.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filter / Category Section */}
      <div className="container mx-auto px-6 mb-12 border-b border-white/5">
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
                      ? "text-white"
                      : "text-rockship-400 hover:text-white"
                  }`}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rockship-accent shadow-[0_0_10px_rgba(var(--rockship-accent-rgb),0.5)]"
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
              <div className="col-span-full py-20 text-center text-rockship-400 flex flex-col items-center">
                <p className="text-lg">
                  No case studies found for this category yet.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Call to Action */}
          <FadeIn>
            <div className="mt-32 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-rockship-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h2 className="text-3xl font-display font-bold text-white mb-6 relative z-10">
                Have a unique challenge?
              </h2>
              <p className="text-rockship-200 max-w-xl mx-auto mb-8 relative z-10">
                Our engineering team specializes in solving novel problems with
                custom AI architectures. Let's discuss your specific needs.
              </p>

              <Link href="/contact" className="relative z-10 inline-block">
                <button className="bg-white text-rockship-950 px-8 py-3 rounded-full font-bold hover:bg-rockship-100 transition-colors shadow-lg shadow-white/10">
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
