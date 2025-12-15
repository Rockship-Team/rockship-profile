import { Bot, Send, Sparkles, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChatResponse, initGemini } from "../services/geminiService";
import { ChatMessage, ChatRole } from "../types";
import { CaseStudyCard } from "./CaseStudyCard";
import Image from "next/image";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
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
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

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

                        return (
                          <div className="markdown-content">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({ children }) => (
                                  <p className="mb-2 last:mb-0">{children}</p>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc list-inside mb-2 space-y-1">
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal list-inside mb-2 space-y-1">
                                    {children}
                                  </ol>
                                ),
                                li: ({ children }) => (
                                  <li className="text-gray-200">{children}</li>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-bold text-white">
                                    {children}
                                  </strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic">{children}</em>
                                ),
                                code: ({ children }) => (
                                  <code className="bg-rockship-900/50 px-1.5 py-0.5 rounded text-xs font-mono text-cyan-300">
                                    {children}
                                  </code>
                                ),
                                pre: ({ children }) => (
                                  <pre className="bg-rockship-900/80 p-2 rounded-lg overflow-x-auto mb-2 text-xs font-mono">
                                    {children}
                                  </pre>
                                ),
                                a: ({ children, href }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-rockship-accent hover:text-cyan-300 underline"
                                  >
                                    {children}
                                  </a>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="border-l-2 border-rockship-accent/50 pl-3 italic text-gray-300 mb-2">
                                    {children}
                                  </blockquote>
                                ),
                                h1: ({ children }) => (
                                  <h1 className="text-lg font-bold text-white mb-2">
                                    {children}
                                  </h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-base font-bold text-white mb-2">
                                    {children}
                                  </h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-sm font-bold text-white mb-1">
                                    {children}
                                  </h3>
                                ),
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        );
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
              className="flex-1 bg-rockship-800 border-none rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-rockship-accent outline-none"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-rockship-accent hover:bg-cyan-300 text-rockship-900 p-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 p-1 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300 border border-white/20 ${
          isOpen
            ? "bg-rockship-800 text-white"
            : "bg-gradient-to-r from-rockship-accent to-rockship-accent-secondary text-white hover:scale-110"
        }`}
      >
        {isOpen ? (
          <X size={21} />
        ) : (
          <Image src="/chatbot.png" alt="AI" width={50} height={50} />
        )}
      </button>
    </div>
  );
};
