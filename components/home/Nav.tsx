"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  // The tabs are anchors into the homepage. On any other route those sections
  // do not exist, so the bare "#services" hrefs did nothing and the whole nav
  // was a dead end — link back to "/#services" instead.
  const onHome = pathname === "/";
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (!onHome) return;

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
  }, [onHome]);

  return (
    <nav
      className="sticky top-0 z-[60]"
      style={{
        background: "color-mix(in srgb, var(--rk-paper) 82%, transparent)",
        backdropFilter: "saturate(180%) blur(20px)",
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1120px] items-center gap-6 px-[clamp(22px,5vw,60px)]">
        <Link href="/" aria-label="Rockship home" className="shrink-0">
          <Logo height={22} />
        </Link>

        <div className="hidden gap-px overflow-x-auto lg:flex">
          {TABS.map((tab) => {
            const active = onHome && current === tab.href;
            return (
              <Link
                key={tab.href}
                href={onHome ? tab.href : `/${tab.href}`}
                aria-current={active ? "true" : undefined}
                className="whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] transition-colors hover:text-[color:var(--rk-ink)]"
                style={{
                  color: active ? "var(--rk-accent)" : "var(--rk-sec)",
                  background: active ? "var(--rk-alt)" : "transparent",
                }}
              >
                {tab.label}
              </Link>
            );
          })}
          <Link
            href="/events"
            aria-current={pathname === "/events" ? "page" : undefined}
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] transition-colors hover:text-[color:var(--rk-ink)]"
            style={
              pathname === "/events"
                ? { color: "var(--rk-accent)", background: "var(--rk-alt)" }
                : { color: "var(--rk-sec)" }
            }
          >
            Events
          </Link>
          <Link
            href="/demos"
            aria-current={pathname.startsWith("/demos") ? "page" : undefined}
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] transition-colors hover:text-[color:var(--rk-ink)]"
            style={
              pathname.startsWith("/demos")
                ? { color: "var(--rk-accent)", background: "var(--rk-alt)" }
                : { color: "var(--rk-sec)" }
            }
          >
            Demos
          </Link>
        </div>

        <div className="ml-auto shrink-0">
          <BookCallButton className="rk-btn" />
        </div>
      </div>
    </nav>
  );
}
