import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import React from "react";
import { FadeIn } from "./FadeIn";

const caseBoardData = [
  {
    type: "Partner",
    title:
      "Anthropic Partners with Rockship to Bring Generative AI to Enterprises",
    logoText: "ANTHROPIC",
    partner: "Anthropic",
  },
  {
    type: "Partner",
    title: "Meta and Rockship Partner to Drive Enterprise Adoption of Llama",
    logoText: "Meta",
    partner: "Meta",
  },
  {
    type: "Case Studies",
    title: "Customer Case Study: Cohere - Scaling Fine-tuning Infrastructure",
    logoText: "cohere",
    partner: "Cohere",
  },
  {
    type: "Blog",
    title: "Rockship's Expert-in-the-Loop Platform for LLM Evaluation",
    logoText: "OpenAI",
    partner: "OpenAI",
  },
  {
    type: "Research",
    title: "Advancing State-of-the-Art in RLHF with PPO and DPO",
    logoText: "Google",
    partner: "Google",
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 bg-rockship-950 text-white border-t border-white/5 relative overflow-hidden">
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
              {caseBoardData.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative h-full flex flex-col glass rounded-2xl p-1 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-rockship-accent/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                    {/* Card Content Wrapper */}
                    <div className="h-full flex flex-col p-6 rounded-xl bg-rockship-950/40 relative overflow-hidden">
                      {/* Top Row: Type & Link */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-rockship-300 group-hover:text-rockship-accent transition-colors">
                          {item.type}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-rockship-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </div>

                      {/* Main Visual/Logo Area */}
                      <div className="flex-1 flex flex-col justify-end mb-6">
                        <div className="mb-6 h-16 flex items-center">
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
