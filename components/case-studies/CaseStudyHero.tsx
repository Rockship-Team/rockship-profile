import { FadeIn, FadeInStagger } from "@/components/FadeIn";

interface CaseStudyHeroProps {
  logoText: string;
  title: string;
  industries: string[];
  heroImage?: string;
}

export function CaseStudyHero({
  logoText,
  title,
  industries,
  heroImage,
}: CaseStudyHeroProps) {
  return (
    <section className="pt-28 pb-12 lg:pt-40 lg:pb-24 relative">
      {/* No background scrim or washed-out artwork: on a white page both
          read as grey haze over the title. The heading carries the section. */}

      <div className="container mx-auto px-6 relative z-10">
        <FadeInStagger
          delay={0.1}
          className="flex flex-col gap-8 max-w-5xl mx-auto text-center items-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {industries.map((tag, i) => (
              <FadeIn key={tag} delay={i * 50} direction="up" distance={10}>
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-black/[0.03] text-[#1D1D1F] border border-black/10 uppercase tracking-wider backdrop-blur-sm shadow-sm hover:border-[#FF4D00]/50 transition-colors cursor-default">
                  {tag}
                </span>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={200} distance={20}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.025em] text-[#1D1D1F]">
              {logoText}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={400} distance={20}>
            <p className="text-xl md:text-2xl text-[#3A3D42] leading-relaxed max-w-3xl border-t border-black/10 pt-8">
              {title}
            </p>
          </FadeIn>
        </FadeInStagger>
      </div>
    </section>
  );
}
