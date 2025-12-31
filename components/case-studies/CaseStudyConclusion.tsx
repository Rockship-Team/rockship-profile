import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import Link from "next/link";

interface CaseStudyConclusionProps {
  conclusion: string;
}

export function CaseStudyConclusion({ conclusion }: CaseStudyConclusionProps) {
  return (
    <section className="py-24 border-t border-white/5 bg-gradient-to-b from-rockship-950 to-black">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <FadeIn>
          <div className="w-16 h-16 mx-auto bg-rockship-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-rockship-accent/20">
            <Target className="w-8 h-8 text-rockship-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 leading-tight">
            "{conclusion}"
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-rockship-accent hover:bg-rockship-accent/90 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-rockship-accent/20 h-auto">
                Start Your Project
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 rounded-full px-8 py-6 text-lg h-auto"
              >
                All Case Studies
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
