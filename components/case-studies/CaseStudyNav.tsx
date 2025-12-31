import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CaseStudyNavProps {
  logoText: string;
}

export function CaseStudyNav({ logoText }: CaseStudyNavProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-rockship-950/80 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-rockship-950/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Left Side: Back Link */}
        <Link
          href="/case-studies"
          className="flex items-center gap-2 text-rockship-300 hover:text-white transition-colors group px-4 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-rockship-accent" />
          <span className="text-sm font-medium">Case Studies</span>
        </Link>

        {/* Center Side: Logo/Text (hidden on mobile) */}
        <div className="text-sm text-rockship-400 font-medium hidden md:block truncate max-w-[200px] lg:max-w-md bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          {logoText}
        </div>

        {/* Right Side: CTA Button */}
        <Link href="/contact" className="ml-0 md:ml-auto">
          <Button
            size="sm"
            className="bg-white text-rockship-950 hover:bg-rockship-100 font-bold px-6 h-10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
          >
            Book a Consultation
          </Button>
        </Link>
      </div>
    </nav>
  );
}
