import { Button } from "@/components/ui/button";
import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";

interface CaseStudyNotFoundProps {
  logoText: string;
}

export function CaseStudyNotFound({ logoText }: CaseStudyNotFoundProps) {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] flex items-center justify-center p-6 bg-[grid-slate-900] bg-[size:40px_40px]">
      <div className="text-center max-w-lg p-8 rounded-3xl bg-[#F5F5F7] border border-black/[0.06] backdrop-blur-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF4D00]/20 to-transparent mb-8 border border-black/[0.06] shadow-inner">
          <Target className="w-10 h-10 text-[#FF4D00]" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4 text-[#1D1D1F]">
          {logoText}
        </h1>
        <p className="text-[#6E6E73] mb-8 leading-relaxed">
          Detailed case study content is being prepared. Please check back
          shortly to see how we delivered impact for this project.
        </p>
        <Link href="/">
          <Button
            variant="outline"
            className="border-[#FF4D00]/30 text-[#FF4D00] hover:bg-[#FF4D00]/10 hover:text-[#1D1D1F]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
