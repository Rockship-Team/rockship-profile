import { HERO, PROOF } from "@/lib/home-content";
import { BookCallButton } from "./BookCall";
import CoverageBand from "./CoverageBand";
import Reveal from "./Reveal";
import TK from "./TK";

export default function Hero() {
  return (
    <>
      <header className="pt-[clamp(72px,10vw,120px)] pb-[clamp(56px,7vw,88px)] text-center">
        <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
          <Reveal>
            <p className="text-[15px] tracking-[0.01em]" style={{ color: "var(--rk-ter)" }}>
              {HERO.eyebrow}
            </p>
            <h1 className="rk-hero mx-auto mt-3 max-w-[16ch]">
              {HERO.headlineLead}{" "}
              <span className="rk-accent">{HERO.headlineAccent}</span>
              {HERO.headlineTail}
            </h1>
            <p className="rk-intro mx-auto mt-3 max-w-[42ch]">{HERO.sub}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <BookCallButton />
              <a className="rk-btn rk-btn-line" href="#work">
                See our work
              </a>
            </div>
            <p className="mt-4 text-[14px]" style={{ color: "var(--rk-ter)" }}>
              {HERO.meta}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <CoverageBand />
          </Reveal>
        </div>
      </header>

      {/* Proof inside the first viewport — 6 of 8 researched competitors do
          this and the earlier drafts did not. See docs/rebrand/research-v1.md */}
      <div className="rk-alt py-12">
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8 px-[clamp(22px,5vw,60px)] text-center">
          {PROOF.map((metric) => (
            <div key={metric.label}>
              <div className="text-[clamp(34px,3.8vw,44px)] font-semibold leading-[1.1] tabular-nums">
                {metric.unverified ? <TK>{metric.value}</TK> : metric.value}
              </div>
              <div
                className="mx-auto mt-2 max-w-[22ch] text-[14px] leading-[1.4]"
                style={{ color: "var(--rk-sec)" }}
              >
                {metric.unverified ? <TK>{metric.label}</TK> : metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
