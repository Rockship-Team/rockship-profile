import { FadeIn } from "../FadeIn";
import Link from "next/link";

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
            className="px-8 py-3 bg-transparent border border-gray-600 text-white font-bold rounded-lg hover:border-white transition hover:scale-105 active:scale-95 duration-200 w-full sm:w-auto"
          >
            Schedule an AI Consultation
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
