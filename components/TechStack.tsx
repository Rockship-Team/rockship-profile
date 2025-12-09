import { cn } from "@/lib/utils";
import { Cloud, Cpu, Database, Layout, Smartphone } from "lucide-react";
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
        "group relative p-8 rounded-3xl border border-white/5 bg-rockship-900/20 backdrop-blur-sm overflow-hidden hover:bg-rockship-900/40 transition-all duration-500 h-full",
        delay
      )}
    >
      {/* Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br",
          colorClass
        )}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-8">
          <div
            className={cn(
              "p-3 rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300",
              "text-white"
            )}
          >
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold font-display text-white">{title}</h3>
        </div>

        <div className="flex flex-wrap gap-3 content-start">
          {items.map((item) => (
            <div
              key={item}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm font-mono text-rockship-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
            >
              <span className="opacity-50 mr-2">$</span>
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
      "HuggingFace Transformers",
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
      className="py-24 md:py-32 bg-rockship-950/80 relative border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="mb-16 md:mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-rockship-accent font-semibold tracking-widest uppercase text-sm mb-4">
              Our Technology
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
              Built on{" "}
              <span className="text-rockship-400">Giant Shoulders</span>
            </h3>
            <p className="text-lg text-rockship-300">
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
              colorClass="from-green-500 to-emerald-500"
            />
          </FadeIn>

          <FadeIn delay="400ms" className="lg:col-span-3">
            <TechCard
              title="Frontend"
              icon={Layout}
              items={stack.frontend}
              colorClass="from-pink-500 to-rose-500"
            />
          </FadeIn>

          <FadeIn delay="500ms" className="lg:col-span-3">
            <TechCard
              title="Mobile"
              icon={Smartphone}
              items={stack.mobile}
              colorClass="from-orange-500 to-red-500"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
