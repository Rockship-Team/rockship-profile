import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { caseStudiesData } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { CaseStudyCard } from "../CaseStudyCard";
import { FadeIn } from "../FadeIn";

export const CaseStudies: React.FC = () => {
  return (
    <section
      id="case-studies"
      className="py-24 bg-rockship-950 text-white border-t border-white/5 relative overflow-hidden"
    >
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rockship-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-rockship-accent animate-pulse" />
            <span className="text-xs font-medium text-rockship-200 tracking-wide uppercase">
              Proven Results
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
            <span className="gradient-text">Case Studies</span> & Collaboration
          </h2>
          <p className="text-lg text-rockship-300 max-w-2xl mx-auto leading-relaxed">
            We partner with the world&apos;s leading AI research labs and
            enterprises to build the infrastructure for the next generation of
            intelligence.
          </p>
        </FadeIn>

        {/* Carousel */}
        <FadeIn>
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {caseStudiesData.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <CaseStudyCard item={item} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop Arrows */}
            <div className="hidden md:flex justify-end gap-4 mt-8 mr-2">
              <CarouselPrevious className="static translate-y-0 translate-x-0 border-white/10 text-white hover:bg-rockship-accent hover:border-rockship-accent hover:text-white transition-all duration-300" />
              <CarouselNext className="static translate-y-0 translate-x-0 border-white/10 text-white hover:bg-rockship-accent hover:border-rockship-accent hover:text-white transition-all duration-300" />
            </div>

            {/* Mobile Arrows */}
            <div className="flex justify-end gap-4 mt-8 md:hidden">
              <CarouselPrevious className="static translate-y-0 translate-x-0 border-white/10 text-white hover:bg-rockship-accent hover:border-rockship-accent hover:text-white transition-all duration-300" />
              <CarouselNext className="static translate-y-0 translate-x-0 border-white/10 text-white hover:bg-rockship-accent hover:border-rockship-accent hover:text-white transition-all duration-300" />
            </div>
          </Carousel>
        </FadeIn>
      </div>
    </section>
  );
};
