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
    <section className="pt-32 pb-12 lg:pt-48 lg:pb-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rockship-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60 mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none opacity-40 mix-blend-screen" />

      {/* Hero Background Image if available */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-rockship-950/90 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-rockship-950 via-rockship-950/50 to-transparent z-10" />
          <img
            src={heroImage}
            alt="Case Study Hero"
            className="w-full h-full object-cover opacity-20 grayscale brightness-75 scale-105"
          />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <FadeInStagger
          delay={0.1}
          className="flex flex-col gap-8 max-w-5xl mx-auto text-center items-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {industries.map((tag, i) => (
              <FadeIn key={tag} delay={i * 50} direction="up" distance={10}>
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-rockship-100 border border-white/10 uppercase tracking-wider backdrop-blur-sm shadow-sm hover:border-rockship-accent/50 transition-colors cursor-default">
                  {tag}
                </span>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={200} distance={20}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-rockship-300 drop-shadow-sm">
              {logoText}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={400} distance={20}>
            <p className="text-xl md:text-2xl text-rockship-200 leading-relaxed max-w-3xl border-t border-white/10 pt-8">
              {title}
            </p>
          </FadeIn>
        </FadeInStagger>
      </div>
    </section>
  );
}
