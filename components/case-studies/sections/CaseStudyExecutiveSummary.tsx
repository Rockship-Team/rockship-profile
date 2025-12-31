import { FadeIn } from "@/components/FadeIn";

interface CaseStudyExecutiveSummaryProps {
  content: string;
}

export function CaseStudyExecutiveSummary({
  content,
}: CaseStudyExecutiveSummaryProps) {
  return (
    <FadeIn>
      <div className="prose prose-invert prose-lg max-w-none">
        <h3 className="text-rockship-accent uppercase tracking-widest font-bold text-sm mb-4">
          Executive Summary
        </h3>
        <p className="text-xl md:text-2xl leading-relaxed font-light text-rockship-100">
          {content}
        </p>
      </div>
    </FadeIn>
  );
}
