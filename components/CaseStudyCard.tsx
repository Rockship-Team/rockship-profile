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
      <div className="group relative w-full flex flex-col bg-rockship-900/60 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:border-rockship-accent/30 transition-all">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white truncate">{item.logoText}</h4>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.title}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-rockship-400 group-hover:text-rockship-accent flex-shrink-0" />
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
    <div className="group relative h-full w-full flex flex-col bg-rockship-900/60 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-2xl p-1 card-hover hover:border-white/20 hover:shadow-2xl hover:shadow-rockship-accent/10">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Card Content Wrapper */}
      <div className="h-full flex flex-col p-6 rounded-xl bg-rockship-950/40 relative overflow-hidden">
        {/* Top Row: Type & Link */}
        <div className="flex items-center justify-between mb-8">
          <div>{null}</div>
          {/* <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-rockship-300 group-hover:text-rockship-accent transition-colors">
            {item.type}
          </span> */}
          <ArrowUpRight className="w-5 h-5 text-rockship-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>

        {/* Main Visual/Logo Area */}
        <div className="flex-1 flex flex-col justify-start mb-6">
          <div className="mb-6 min-h-[7rem] flex items-center">
            <h3 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 group-hover:from-white group-hover:to-white transition-all duration-300">
              {item.logoText}
            </h3>
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-rockship-accent to-transparent rounded-full mb-6 group-hover:w-20 transition-all duration-500" />

          <h3 className="text-xl font-medium leading-snug text-rockship-100 group-hover:text-white transition-colors">
            {item.title}
          </h3>
        </div>

        {/* Hover "Read More" subtle indicator */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-sm font-medium text-rockship-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
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
