import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CaseStudyNavProps {
  logoText: string;
}

export function CaseStudyNav({ logoText }: CaseStudyNavProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-rockship-950/80 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-rockship-950/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/case-studies"
          className="flex items-center gap-2 text-rockship-300 hover:text-white transition-colors group px-4 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-rockship-accent" />
          <span className="text-sm font-medium">All Case Studies</span>
        </Link>
        <div className="text-sm text-rockship-400 font-medium hidden md:block truncate max-w-md bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          {logoText}
        </div>
      </div>
    </nav>
  );
}
