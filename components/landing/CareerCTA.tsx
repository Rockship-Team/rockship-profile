import Link from "next/link";
import { FadeIn } from "../FadeIn";

export default function CareerCTA() {
  return (
    <section className="py-16 md:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-rockship-accent/5 pointer-events-none"></div>
      <FadeIn
        className="container mx-auto px-6 text-center relative z-10"
        direction="up"
        distance={40}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
          Ready to transform your <br />
          <span className="gradient-text">operations with AI?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          From strategy to production, we help enterprises design, deploy, and
          scale AI systems that automate workflows and deliver measurable
          business impact.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="animated-border-btn group relative inline-flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
          >
            <span className="px-10 py-5 text-white font-bold flex items-center justify-center text-lg">
              Schedule an AI Consultation
            </span>
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
