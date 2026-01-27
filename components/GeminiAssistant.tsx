import { Send, Sparkles, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChatResponse, initGemini } from "../services/geminiService";
import { ChatMessage, ChatRole } from "../types";
import { CaseStudyCard } from "./CaseStudyCard";

// Memoized markdown component definitions - moved outside component to prevent recreation
const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-gray-200">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="bg-rockship-900/50 px-1.5 py-0.5 rounded text-xs font-mono text-cyan-300">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-rockship-900/80 p-2 rounded-lg overflow-x-auto mb-2 text-xs font-mono">
      {children}
    </pre>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-rockship-accent hover:text-cyan-300 underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-rockship-accent/50 pl-3 italic text-gray-300 mb-2">
      {children}
    </blockquote>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-lg font-bold text-white mb-2">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-base font-bold text-white mb-2">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-sm font-bold text-white mb-1">{children}</h3>
  ),
};

// Memoized Markdown renderer component
const MarkdownRenderer = React.memo(({ content }: { content: string }) => (
  <div className="markdown-content">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  </div>
));
MarkdownRenderer.displayName = "MarkdownRenderer";

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: ChatRole.MODEL,
      text: "Hello! I'm Rockship, your AI guide. Ask me anything about our solutions, tech stack, or case studies.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGemini();
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      role: ChatRole.USER,
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const responseText = await getChatResponse(input);

    const botMsg: ChatMessage = {
      role: ChatRole.MODEL,
      text: responseText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  }, [input]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  }, [handleSend]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] glass-panel rounded-2xl flex flex-col shadow-2xl border border-rockship-accent/30 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-rockship-900 to-rockship-800 p-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="bg-rockship-accent/20 p-1.5 rounded-lg">
                <Sparkles size={16} className="text-rockship-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  Rockship Assistant
                </h3>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rockship-900/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === ChatRole.USER ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === ChatRole.USER
                      ? "bg-rockship-accent text-rockship-900 rounded-br-none font-medium"
                      : "bg-rockship-800 text-gray-200 rounded-bl-none border border-white/5"
                  }`}
                >
                  {msg.role === ChatRole.MODEL
                    ? (() => {
                        try {
                          let text = msg.text.trim();
                          // Handle markdown code blocks
                          const jsonMatch = text.match(
                            /```(?:json)?\s*([\s\S]*?)\s*```/
                          );
                          if (jsonMatch) {
                            text = jsonMatch[1].trim();
                          }

                          // Try to find the JSON object boundaries if it's not wrapped in code blocks but has noise
                          const firstBrace = text.indexOf("{");
                          const lastBrace = text.lastIndexOf("}");

                          if (
                            firstBrace !== -1 &&
                            lastBrace !== -1 &&
                            lastBrace > firstBrace
                          ) {
                            const potentialJson = text.substring(
                              firstBrace,
                              lastBrace + 1
                            );
                            try {
                              const parsed = JSON.parse(potentialJson);
                              // Handle multiple case studies
                              if (parsed.type === "case_studies" && Array.isArray(parsed.data)) {
                                return (
                                  <div className="space-y-2">
                                    {parsed.data.map((item: { slug: string; type: string; title: string; logoText: string; partner: string }, i: number) => (
                                      <CaseStudyCard key={item.slug || i} item={item} index={i} />
                                    ))}
                                  </div>
                                );
                              }
                              // Handle single case study
                              if (parsed.type === "case_study" && parsed.data) {
                                return (
                                  <CaseStudyCard item={parsed.data} index={0} />
                                );
                              }
                            } catch (e) {
                              // Failed to parse inner content, fall through to normal render
                            }
                          }
                        } catch (e) {}

                        // Use memoized MarkdownRenderer
                        return <MarkdownRenderer content={msg.text} />;
                      })()
                    : msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-rockship-800 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1 items-center">
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-rockship-900 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about our AI..."
              aria-label="Type your message"
              className="flex-1 bg-rockship-800 border-none rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-rockship-accent focus-visible:ring-2 focus-visible:ring-rockship-accent outline-none"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="bg-rockship-accent hover:bg-cyan-300 text-rockship-900 p-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {isOpen ? null : (
        <button
          onClick={toggleOpen}
          className="group flex items-center gap-2 p-1 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)] border border-white/20 bg-gradient-to-r from-rockship-accent to-rockship-accent-secondary text-white scale-100 hover:scale-110 hover:transition-transform hover:duration-300"
          aria-label="Open AI chat"
        >
          <Image src="/chatbot.png" alt="AI" width={50} height={50} className="w-[50px] h-[50px]" />
        </button>
      )}
    </div>
  );
};
