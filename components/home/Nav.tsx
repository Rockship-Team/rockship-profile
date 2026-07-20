"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { BookCallButton } from "./BookCall";

/** One nav item per section, so every anchor lands on a defined block. */
const TABS = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Rockship" },
  { href: "#selection", label: "Selection" },
  { href: "#work", label: "Case studies" },
  { href: "#career", label: "Career" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = TABS.map((tab) => document.querySelector(tab.href)).filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    if (sections.length === 0) return;

    function spy() {
      const line = window.scrollY + 120;
      let active: string | null = null;
      for (const section of sections) {
        if (section.offsetTop <= line) active = `#${section.id}`;
      }
      setCurrent(active);
    }

    spy();
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    };
  }, []);

  return (
    <nav
      className="sticky top-0 z-[60]"
      style={{
        background: "color-mix(in srgb, var(--rk-paper) 82%, transparent)",
        backdropFilter: "saturate(180%) blur(20px)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1120px] items-center gap-5 px-[clamp(22px,5vw,60px)]">
        <Link href="/" aria-label="Rockship home" className="shrink-0">
          <Logo height={20} />
        </Link>

        <div className="hidden gap-px overflow-x-auto lg:flex">
          {TABS.map((tab) => {
            const active = current === tab.href;
            return (
              <a
                key={tab.href}
                href={tab.href}
                aria-current={active ? "true" : undefined}
                className="whitespace-nowrap rounded-full px-[10px] py-1.5 text-[12px] transition-colors"
                style={{
                  color: active ? "var(--rk-accent)" : "var(--rk-sec)",
                  background: active ? "var(--rk-alt)" : "transparent",
                }}
              >
                {tab.label}
              </a>
            );
          })}
          <Link
            href="/events"
            className="whitespace-nowrap rounded-full px-[10px] py-1.5 text-[12px]"
            style={{ color: "var(--rk-sec)" }}
          >
            Events
          </Link>
        </div>

        <div className="ml-auto shrink-0">
          <BookCallButton className="rk-btn rk-btn-sm" />
        </div>
      </div>
    </nav>
  );
}
