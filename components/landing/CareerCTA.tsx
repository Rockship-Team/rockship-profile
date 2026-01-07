import Link from "next/link";
import { FadeIn } from "../FadeIn";

export default function CareerCTA() {
  return (
    <section className="py-16 md:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-rockship-accent/5 pointer-events-none"></div>
      <FadeIn className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl font-display font-bold text-white mb-6">
          Ready to transform your operations with AI?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          From strategy to production, we help enterprises design, deploy, and
          scale AI systems that automate workflows and deliver measurable
          business impact.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="animated-border-btn group relative inline-flex items-center justify-center rounded-lg transition-all duration-200"
          >
            <span className="px-8 py-3 text-white text-sm font-bold flex items-center justify-center">
              Schedule an AI Consultation
            </span>
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
