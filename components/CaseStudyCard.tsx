import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CaseStudyCardData {
  slug?: string;
  type: string;
  title: string;
  logoText: string;
  partner: string;
}

interface CaseStudyCardProps {
  item: CaseStudyCardData;
  index: number;
  compact?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  item,
  index,
  compact = false,
}) => {
  // Compact version for chat
  if (compact) {
    const CompactContent = (
      <div className="group relative w-full flex flex-col bg-[#F5F5F7] backdrop-blur-md border border-black/10 rounded-xl p-3 hover:border-[#FF4D00]/30 transition-all">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#1D1D1F] truncate">{item.logoText}</h4>
            <p className="text-xs text-[#6E6E73] mt-1 line-clamp-2">{item.title}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#86868B] group-hover:text-[#FF4D00] flex-shrink-0" />
        </div>
      </div>
    );

    if (item.slug) {
      return (
        <Link href={`/case-studies/${item.slug}`} className="block">
          {CompactContent}
        </Link>
      );
    }
    return CompactContent;
  }

  // Full version
  const CardContent = (
    <div className="group relative h-full w-full flex flex-col bg-[#F5F5F7] backdrop-blur-md border border-black/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-2xl p-1 card-hover hover:border-black/15 hover:shadow-2xl hover:shadow-[#FF4D00]/10">
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Card Content Wrapper */}
      <div className="h-full flex flex-col p-6 rounded-xl bg-white/70 relative overflow-hidden">
        {/* Top Row: Type & Link */}
        <div className="flex items-center justify-between mb-8">
          <div>{null}</div>
          {/* <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/[0.03] border border-black/10 text-[#6E6E73] group-hover:text-[#FF4D00] transition-colors">
            {item.type}
          </span> */}
          <ArrowUpRight className="w-5 h-5 text-[#86868B] group-hover:text-[#1D1D1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>

        {/* Main Visual/Logo Area */}
        <div className="flex-1 flex flex-col justify-start mb-6">
          <div className="mb-6 min-h-[7rem] flex items-center">
            <h3 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] to-[#1D1D1F] transition-all duration-300">
              {item.logoText}
            </h3>
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FF4D00] to-transparent rounded-full mb-6 group-hover:w-20 transition-all duration-500" />

          <h3 className="text-xl font-medium leading-snug text-[#1D1D1F] group-hover:text-[#1D1D1F] transition-colors">
            {item.title}
          </h3>
        </div>

        {/* Hover "Read More" subtle indicator */}
        <div className="mt-auto pt-4 border-t border-black/[0.06] flex items-center text-sm font-medium text-[#86868B] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <span>Read case study</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  );

  if (item.slug) {
    return (
      <Link
        href={`/case-studies/${item.slug}`}
        className="flex flex-col h-full w-full cursor-pointer"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};
