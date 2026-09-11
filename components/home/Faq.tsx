"use client";

import { useState } from "react";
import { FAQ_PARTS } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";

export default function Faq() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const totalQuestions = FAQ_PARTS.reduce((acc, p) => acc + p.items.length, 0);

  const displayedParts =
    activeTab === "all"
      ? FAQ_PARTS
      : FAQ_PARTS.filter((part) => part.id === activeTab);

  return (
    <Section id="faq">
      <Reveal>
        <SectionHead
          index="08"
          eyebrow="Questions"
          headline="The architectural, security, and operational standards enterprise leaders ask first."
        />
      </Reveal>

      {/* Category Filter Pills */}
      <div className="mx-auto mt-10 flex max-w-[880px] flex-wrap items-center justify-center gap-2 px-2">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className="cursor-pointer rounded-full px-4 py-2 text-[14px] font-medium transition-all"
          style={{
            background:
              activeTab === "all"
                ? "var(--rk-ink)"
                : "color-mix(in srgb, var(--rk-ink) 5%, transparent)",
            color: activeTab === "all" ? "var(--rk-paper)" : "var(--rk-sec)",
            border:
              activeTab === "all"
                ? "1px solid var(--rk-ink)"
                : "1px solid var(--rk-hair)",
          }}
        >
          All ({totalQuestions})
        </button>
        {FAQ_PARTS.map((part) => {
          const isActive = activeTab === part.id;
          return (
            <button
              key={part.id}
              type="button"
              onClick={() => setActiveTab(part.id)}
              className="cursor-pointer rounded-full px-4 py-2 text-[14px] font-medium transition-all"
              style={{
                background: isActive
                  ? "var(--rk-ink)"
                  : "color-mix(in srgb, var(--rk-ink) 5%, transparent)",
                color: isActive ? "var(--rk-paper)" : "var(--rk-sec)",
                border: isActive
                  ? "1px solid var(--rk-ink)"
                  : "1px solid var(--rk-hair)",
              }}
            >
              {part.shortTitle} ({part.items.length})
            </button>
          );
        })}
      </div>

      {/* FAQ Parts & Questions */}
      <div className="mx-auto mt-[clamp(40px,5vw,64px)] max-w-[840px] space-y-16">
        {displayedParts.map((part) => (
          <div key={part.id} className="scroll-mt-24">
            {/* Part Header */}
            <div className="mb-6 border-b border-[color:var(--rk-hair)] pb-4">
              <h3 className="text-[22px] font-semibold tracking-[-0.015em] text-[color:var(--rk-ink)] sm:text-[26px]">
                {part.title}
              </h3>
              <p
                className="mt-1 text-[15px] sm:text-[16px]"
                style={{ color: "var(--rk-sec)" }}
              >
                {part.description}
              </p>
            </div>

            {/* Questions List */}
            <div className="divide-y divide-[color:var(--rk-hair)]">
              {part.items.map((item) => (
                <details
                  key={item.question}
                  className="group py-2 transition-colors"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-[18px] font-medium tracking-[-0.01em] transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="text-[color:var(--rk-ink)] transition-colors group-hover:text-[color:var(--rk-accent)]">
                      {item.question}
                    </span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--rk-hair)] text-[18px] font-light leading-none transition-transform duration-200 group-open:rotate-45"
                      style={{ color: "var(--rk-sec)" }}
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-6 pt-1 text-[16px] leading-[1.65] text-[color:var(--rk-sec)] sm:text-[17px]">
                    {item.answer
                      .split("\n")
                      .map((p) => p.trim())
                      .filter(Boolean)
                      .map((para, idx) => (
                        <p key={idx} className={idx > 0 ? "mt-3" : ""}>
                          {para}
                        </p>
                      ))}
                    {item.secondaryAnswer && (
                      <p className="mt-3.5">{item.secondaryAnswer}</p>
                    )}
                    {item.points && item.points.length > 0 && (
                      <ul className="mt-4 space-y-3 border-l-2 border-[color:var(--rk-hair)] pl-4 sm:pl-5">
                        {item.points.map((point, pIdx) => (
                          <li key={pIdx} className="text-[15px] sm:text-[16px]">
                            {point.label && (
                              <strong className="font-semibold text-[color:var(--rk-ink)]">
                                {point.label}:{" "}
                              </strong>
                            )}
                            <span>{point.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
