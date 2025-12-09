import { cn } from "@/lib/utils"; // Assuming cn utility is available
import { ArrowRight } from "lucide-react";
import React from "react";
import { FadeIn } from "./FadeIn";

export const BuildAISection: React.FC = () => {
  /*
   * Enhanced Chat Simulation Logic
   * Now supporting multi-turn conversations and message history
   */
  type Message = {
    id: string;
    role: "user" | "ai";
    text: string;
  };

  const [messages, setMessages] = React.useState<Message[]>([]);
  // currentTyping stores the text currently being animated/typed
  const [currentTyping, setCurrentTyping] = React.useState<string>("");
  // typingRole tracks who is currently typing (or if we are thinking)
  const [typingRole, setTypingRole] = React.useState<
    "user" | "ai" | "thinking" | "idle"
  >("idle");

  const script = React.useMemo(
    () => [
      { role: "user", text: "Why is human feedback essential for LLMs?" },
      {
        role: "ai",
        text: "RLHF (Reinforcement Learning from Human Feedback) aligns models with human intent, ensuring they are helpful, harmless, and honest.",
      },
      { role: "user", text: "How does Rockship help with this?" },
      {
        role: "ai",
        text: "We provide enterprise-grade data generation and expert human feedback loops to fine-tune your models effectively.",
      },
    ],
    []
  );

  React.useEffect(() => {
    let isMounted = true;

    const typeText = async (text: string, role: "user" | "ai") => {
      setTypingRole(role);
      setCurrentTyping("");

      const chars = text.split("");
      let currentBuf = "";

      // Typing setup
      const baseDelay = role === "user" ? 60 : 20;
      const randomVar = role === "user" ? 40 : 10;

      for (const char of chars) {
        if (!isMounted) return;
        currentBuf += char;
        setCurrentTyping(currentBuf);
        // Random typing delay
        await new Promise((r) =>
          setTimeout(r, baseDelay + Math.random() * randomVar)
        );
      }
    };

    const runSimulation = async () => {
      while (isMounted) {
        setMessages([]);
        setTypingRole("idle");
        setCurrentTyping("");

        // Initial pause
        await new Promise((r) => setTimeout(r, 1000));

        for (const line of script) {
          if (!isMounted) break;

          const role = line.role as "user" | "ai";

          // If AI is about to reply, show thinking state first
          if (role === "ai") {
            setTypingRole("thinking");
            await new Promise((r) => setTimeout(r, 800 + Math.random() * 500));
            if (!isMounted) break;
          }

          // Type out the message
          await typeText(line.text, role);
          if (!isMounted) break;

          // Commit message to history
          setMessages((prev) => [
            ...prev,
            { id: Math.random().toString(36).slice(2), role, text: line.text },
          ]);
          setCurrentTyping("");
          setTypingRole("idle");

          // Pause between messages
          await new Promise((r) => setTimeout(r, 1200));
        }

        // Long pause before restarting
        if (!isMounted) break;
        await new Promise((r) => setTimeout(r, 5000));
      }
    };

    runSimulation();

    return () => {
      isMounted = false;
    };
  }, [script]);

  const renderMessageContent = (
    role: "user" | "ai",
    text: string,
    isTyping = false
  ) => {
    const isUser = role === "user";
    return (
      <div
        className={cn(
          "flex items-end gap-3 mb-4",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-rockship-accent/20 flex items-center justify-center shrink-0 border border-rockship-accent/30">
            <div className="w-4 h-4 rounded-sm bg-rockship-accent" />
          </div>
        )}

        <div
          className={cn(
            "py-3 px-5 text-sm max-w-[85%] border",
            isUser
              ? "bg-[#1A1A1A] border-white/10 rounded-2xl rounded-br-sm text-gray-200"
              : "bg-rockship-900/80 border-rockship-accent/20 rounded-2xl rounded-bl-sm text-gray-300"
          )}
        >
          {text}
          {isTyping && (
            <span className="w-1.5 h-4 bg-rockship-accent inline-block align-middle ml-1 animate-pulse" />
          )}
        </div>

        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 overflow-hidden shrink-0 border border-white/10">
            <img
              src="https://picsum.photos/seed/user/100/100"
              className="w-full h-full object-cover opacity-80"
              alt="User Avatar"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-32 bg-rockship-950 text-white border-t border-white/5">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <h2 className="text-rockship-accent font-semibold tracking-widest uppercase text-sm mb-4">
            Build AI
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-rockship-400">
            Powering Frontier AI
          </h3>
          <p className="text-lg text-rockship-300 leading-relaxed">
            Next Generation AI powered by world-class data.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Chat UI Mockup */}
            <div className="w-full relative group top-0 lg:sticky lg:top-24">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-1000"></div>

              <div className="relative bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[4/3] flex flex-col">
                {/* Window Controls */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="text-xs font-mono text-gray-500">
                    AI Text Generator
                  </div>
                  <div className="w-12" /> {/* Spacer */}
                </div>

                {/* Chat Area - Scrollable */}
                <div className="flex-1 p-6 relative font-sans flex flex-col overflow-y-auto no-scrollbar">
                  <div className="space-y-4">
                    {/* Render History */}
                    {messages.map((msg) => (
                      <React.Fragment key={msg.id}>
                        {renderMessageContent(msg.role, msg.text)}
                      </React.Fragment>
                    ))}
                    {/* Render Content Currently Being Typed */}
                    {(typingRole === "user" || typingRole === "ai") &&
                      renderMessageContent(typingRole, currentTyping, true)}
                    {/* Thinking Indicator */}
                    {typingRole === "thinking" && (
                      <div className="flex items-end gap-3 justify-start mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="w-8 h-8 rounded-full bg-rockship-accent/20 flex items-center justify-center shrink-0 border border-rockship-accent/30">
                          <div className="w-4 h-4 rounded-sm bg-rockship-accent" />
                        </div>
                        <div className="bg-rockship-900/80 border border-rockship-accent/20 rounded-2xl rounded-bl-sm py-3 px-5 text-sm text-gray-300">
                          <div className="flex gap-1 h-5 items-center">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <h3 className="text-3xl md:text-5xl font-display font-normal">
                Generative AI
              </h3>
              <p className="text-gray-500 font-medium text-lg">
                Powering the next generation of Generative AI
              </p>
              <p className="text-gray-400 leading-relaxed max-w-lg">
                Rockship Generative AI Data Engine powers many of the most
                advanced LLMs and generative models in the world through
                world-class RLHF, data generation, model evaluation, safety, and
                alignment.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 duration-200 flex items-center gap-2">
                  Book a Demo <ArrowRight size={16} />
                </button>
                <button className="group px-4 py-3 text-white font-bold rounded-lg hover:text-rockship-accent transition-colors flex items-center gap-2">
                  Build AI{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
