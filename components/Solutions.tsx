import { cn } from "@/lib/utils";
import {
  Brain,
  Eye,
  GitBranch,
  LayoutTemplate,
  Lock,
  Mic,
  Server,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { FadeIn } from "./FadeIn";

const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl overflow-hidden bg-rockship-900/40 group", // Removed standard border
        className
      )}
    >
      {/* Base Border (Static) */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "rgba(255, 255, 255, 0.05)", // border-white/5
          maskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Spotlight Border (Dynamic) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          maskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {children}
    </div>
  );
};

const PlatformFeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  delay?: string;
}> = ({ icon, title, desc, className, delay }) => (
  <SpotlightCard
    className={cn(
      "p-8 hover:bg-rockship-800/40 transition-all duration-300",
      className
    )}
  >
    {/* Inner decorative gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-rockship-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none">
      {React.cloneElement(icon as React.ReactElement<any>, { size: 120 })}
    </div>

    <div className="relative z-10 flex flex-col h-full">
      <div className="w-12 h-12 rounded-2xl bg-rockship-800/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rockship-accent/20 transition-all duration-300">
        <div className="text-rockship-300 group-hover:text-rockship-accent transition-colors">
          {icon}
        </div>
      </div>

      <h3 className="text-2xl font-bold font-display text-white mb-3">
        {title}
      </h3>
      <p className="text-rockship-300 leading-relaxed">{desc}</p>
    </div>
  </SpotlightCard>
);

export const Solutions: React.FC = () => {
  return (
    <section
      id="platform"
      className="py-24 md:py-32 bg-rockship-950 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rockship-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rockship-800 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-rockship-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-rockship-accent font-semibold tracking-widest uppercase text-sm mb-4">
            The Rockship Platform
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-rockship-400">
            Everything you need to rockship intelligence
          </h3>
          <p className="text-lg text-rockship-300 leading-relaxed">
            A unified infrastructure designed for the next generation of
            AI-native enterprises. From data ingestion to deployment, we have
            you covered.
          </p>
        </FadeIn>

        {/* Bento Grid */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            {/* Core Engine - Large Card */}
            <PlatformFeatureCard
              className="md:col-span-6 lg:col-span-8 bg-gradient-to-br from-rockship-900/60 to-rockship-900/20"
              icon={<Brain size={32} />}
              title="Rockship LLM Engine"
              desc="Our flagship inference engine. Fine-tune open weights or distill proprietary models on your private data clusters. Includes built-in RAG with vector store management."
            />

            {/* Vision - Standard Card */}
            <PlatformFeatureCard
              className="md:col-span-6 lg:col-span-4"
              icon={<Eye size={32} />}
              title="Computer Vision"
              desc="Real-time object detection and anomaly recognition pipeline. Process video streams at the edge with <100ms latency."
            />

            {/* Orchestrator */}
            <PlatformFeatureCard
              className="md:col-span-6 lg:col-span-4"
              icon={<GitBranch size={32} />}
              title="ML Orchestrator"
              desc="End-to-end pipeline management. Version control for data, models, and experiments in a single dashboard."
            />

            {/* Enterprise - Large Card */}
            <SpotlightCard className="md:col-span-6 lg:col-span-8 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <LayoutTemplate size={120} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Server className="text-rockship-accent" /> Enterprise Ready
              </h3>

              <div className="grid md:grid-cols-2 gap-4 relative z-10">
                {[
                  {
                    title: "Hybrid Deployment",
                    desc: "On-prem, Cloud, or Air-gapped.",
                  },
                  {
                    title: "SSO & RBAC",
                    desc: "Granular access control policies.",
                  },
                  {
                    title: "Legacy Integration",
                    desc: "Connectors for SAP, Salesforce, & Oracle.",
                  },
                  {
                    title: "24/7 Support",
                    desc: "Dedicated engineering response teams.",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rockship-accent shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-rockship-400 mt-0.5">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            {/* Voice - Standard Card */}
            <PlatformFeatureCard
              className="md:col-span-6 lg:col-span-4"
              icon={<Mic size={32} />}
              title="Voice & Multimodal"
              desc="Conversational AI agents with <500ms voice-to-voice latency. Sentiment analysis and speaker diarization included."
            />

            {/* Security - Wide Card at Bottom */}
            <SpotlightCard className="md:col-span-12 p-1 bg-gradient-to-r from-rockship-800 to-rockship-900/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-rockship-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-rockship-950/90 rounded-[22px] p-8 md:p-10 h-full flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold tracking-wide uppercase">
                    <ShieldCheck size={14} /> DOD Level Security
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white">
                    GovCloud & Compliance
                  </h3>
                  <p className="text-rockship-300 max-w-2xl">
                    We engineered our platform for the world's most regulated
                    industries. Fully compliant with ISO 27001, SOC2 Type II,
                    HIPAA, and GDPR. Our Defense AI unit provides specialized
                    air-gapped solutions for national security.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["ISO 27001", "SOC2", "HIPAA", "GDPR", "FedRAMP High"].map(
                      (badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-rockship-300"
                        >
                          {badge}
                        </span>
                      )
                    )}
                  </div>
                </div>
                {/* Visual Security Element */}
                <div className="w-full md:w-auto flex justify-center">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-dashed border-gray-700 rounded-full animate-spin-slow" />
                    <div className="absolute inset-4 border border-green-500/30 rounded-full" />
                    <Lock size={64} className="text-white relative z-10" />
                    <div className="absolute inset-0 bg-green-500/20 blur-[40px] rounded-full" />
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
