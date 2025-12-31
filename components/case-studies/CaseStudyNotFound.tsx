import { Button } from "@/components/ui/button";
import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";

interface CaseStudyNotFoundProps {
  logoText: string;
}

export function CaseStudyNotFound({ logoText }: CaseStudyNotFoundProps) {
  return (
    <div className="min-h-screen bg-rockship-950 text-white flex items-center justify-center p-6 bg-[grid-slate-900] bg-[size:40px_40px]">
      <div className="text-center max-w-lg p-8 rounded-3xl bg-rockship-900/50 border border-white/5 backdrop-blur-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rockship-accent/20 to-transparent mb-8 border border-white/5 shadow-inner">
          <Target className="w-10 h-10 text-rockship-accent" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4 text-white">
          {logoText}
        </h1>
        <p className="text-rockship-300 mb-8 leading-relaxed">
          Detailed case study content is being prepared. Please check back
          shortly to see how we delivered impact for this project.
        </p>
        <Link href="/">
          <Button
            variant="outline"
            className="border-rockship-accent/30 text-rockship-accent hover:bg-rockship-accent/10 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
