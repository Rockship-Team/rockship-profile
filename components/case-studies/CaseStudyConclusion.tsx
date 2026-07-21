import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import ContactCtaLink from "@/components/ContactCtaLink";
import { Target } from "lucide-react";
import Link from "next/link";

interface CaseStudyConclusionProps {
  conclusion: string;
}

export function CaseStudyConclusion({ conclusion }: CaseStudyConclusionProps) {
  return (
    <section className="py-24 border-t border-black/[0.06] bg-[#F5F5F7]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <FadeIn>
          <div className="w-16 h-16 mx-auto bg-[#FF4D00]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#FF4D00]/20">
            <Target className="w-8 h-8 text-[#FF4D00]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#1D1D1F] mb-8 leading-tight">
            "{conclusion}"
          </h2>
          <div className="flex justify-center gap-4">
            <ContactCtaLink location="case_study_conclusion">
              <Button className="bg-[#FF4D00] hover:opacity-85 text-white rounded-full px-8 py-5 text-base font-normal h-auto">
                Start Your Project
              </Button>
            </ContactCtaLink>
            <Link href="/case-studies">
              <Button
                variant="outline"
                className="bg-white border border-[#D2D2D7] text-[#1D1D1F] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] rounded-full px-8 py-5 text-base font-normal h-auto"
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
