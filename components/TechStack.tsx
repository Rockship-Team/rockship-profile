import { cn } from "@/lib/utils";
import { Cloud, Cpu, Database, Layers, Layout, Smartphone } from "lucide-react";
import React from "react";
import { FadeIn } from "./FadeIn";

const TechCard = ({
  title,
  icon: Icon,
  items,
  colorClass,
  delay,
}: {
  title: string;
  icon: any;
  items: string[];
  colorClass: string;
  delay?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all duration-500 h-full",
        delay
      )}
    >
      {/* Dynamic Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br blur-xl",
          colorClass
        )}
      />

      {/* Corner Accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-bl-full transition-all duration-500 group-hover:scale-150",
          colorClass
        )}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center gap-5 mb-8">
          <div
            className={cn(
              "p-3.5 rounded-2xl bg-rockship-950/50 border border-white/10 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
              "text-white"
            )}
          >
            <Icon size={26} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white tracking-tight">
              {title}
            </h3>
            <div
              className={cn(
                "h-1 w-0 rounded-full mt-1 transition-all duration-700 group-hover:w-full bg-gradient-to-r",
                colorClass
              )}
            />
          </div>
        </div>

        {/* Tech Items Grid */}
        <div className="flex flex-wrap gap-2.5 content-start">
          {items.map((item, idx) => (
            <div
              key={item}
              style={{ transitionDelay: `${idx * 30}ms` }}
              className={cn(
                "px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-sm font-mono text-rockship-200",
                "hover:text-white hover:bg-white/15 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20",
                "transition-all duration-200 cursor-default flex items-center gap-2 group/item"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full opacity-50 group-hover/item:opacity-100 transition-opacity bg-gradient-to-r",
                  colorClass
                )}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TechStack: React.FC = () => {
  const stack = {
    frameworks: [
      "PyTorch",
      "TensorFlow",
      "JAX",
      "LangChain",
      "YOLO v8",
      "HuggingFace",
      "vLLM",
      "LlamaIndex",
    ],
    backend: [
      "FastAPI",
      "gRPC",
      "Next.js",
      "PostgreSQL",
      "ClickHouse",
      "Redis",
      "Qdrant",
      "ElasticSearch",
    ],
    ops: [
      "Kubernetes",
      "Docker",
      "Terraform",
      "Prometheus",
      "Grafana",
      "AWS SageMaker",
      "MLFlow",
      "Argocd",
    ],
    frontend: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "Framer Motion",
      "Vite",
      "Zustand",
    ],
    mobile: [
      "React Native",
      "Expo",
      "SwiftUI",
      "Kotlin",
      "Flutter",
      "Capacitor",
    ],
  };

  return (
    <section
      id="tech-stack"
      className="py-16 md:py-32 bg-rockship-950 relative border-t border-white/5 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <Layers className="text-rockship-accent w-4 h-4" />
              <span className="text-xs font-medium text-rockship-200 tracking-wide uppercase">
                Architecture
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6 leading-tight">
              Built on <span className="gradient-text">Giant Shoulders</span>
            </h2>
            <p className="text-lg text-rockship-300 max-w-xl leading-relaxed">
              We leverage an ecosystem of battle-tested open source frameworks
              and proprietary optimizations to deliver state-of-the-art
              performance.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <FadeIn delay="100ms" className="lg:col-span-2">
            <TechCard
              title="Models & AI"
              icon={Cpu}
              items={stack.frameworks}
              colorClass="from-indigo-500 to-purple-500"
            />
          </FadeIn>

          <FadeIn delay="200ms" className="lg:col-span-2">
            <TechCard
              title="Data & Backend"
              icon={Database}
              items={stack.backend}
              colorClass="from-blue-500 to-cyan-500"
            />
          </FadeIn>

          <FadeIn delay="300ms" className="lg:col-span-2">
            <TechCard
              title="Infra & Ops"
              icon={Cloud}
              items={stack.ops}
              colorClass="from-emerald-500 to-teal-500"
            />
          </FadeIn>

          <FadeIn delay="400ms" className="lg:col-span-3">
            <TechCard
              title="Frontend Experience"
              icon={Layout}
              items={stack.frontend}
              colorClass="from-pink-500 to-rose-500"
            />
          </FadeIn>

          <FadeIn delay="500ms" className="lg:col-span-3">
            <TechCard
              title="Mobile & Cross-Platform"
              icon={Smartphone}
              items={stack.mobile}
              colorClass="from-orange-500 to-yellow-500"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
