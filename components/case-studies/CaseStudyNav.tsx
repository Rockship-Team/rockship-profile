import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CaseStudyNavProps {
  logoText: string;
}

export function CaseStudyNav({ logoText }: CaseStudyNavProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-black/[0.06] supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Left Side: Back Link */}
        <Link
          href="/case-studies"
          className="flex items-center gap-2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors group px-4 py-2 rounded-lg hover:bg-black/[0.03]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FF4D00]" />
          <span className="text-sm font-medium">Case Studies</span>
        </Link>

        {/* Center Side: Logo/Text (hidden on mobile) */}
        <div className="text-sm text-[#86868B] font-medium hidden md:block truncate max-w-[200px] lg:max-w-md bg-black/[0.03] px-4 py-1.5 rounded-full border border-black/[0.06]">
          {logoText}
        </div>

        {/* Right Side: CTA Button */}
        <Link href="/contact" className="ml-0 md:ml-auto">
          <Button
            size="sm"
            className="bg-[#FF4D00] text-white hover:opacity-85 font-medium px-6 h-10 rounded-full transition-all duration-300 active:scale-[0.98]"
          >
            Book a Consultation
          </Button>
        </Link>
      </div>
    </nav>
  );
}
