import { HERO, PROOF } from "@/lib/home-content";
import { BookCallButton } from "./BookCall";
import TimezoneStrip from "./TimezoneStrip";
import TK from "./TK";

export default function Hero() {
  return (
    <>
      <header className="pt-[clamp(64px,9vw,104px)] pb-[clamp(48px,6vw,72px)] text-center">
        <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
          <p className="text-[17px]" style={{ color: "var(--rk-sec)" }}>
            {HERO.eyebrow}
          </p>
          <h1 className="rk-hero mx-auto mt-2 max-w-[16ch]">{HERO.headline}</h1>
          <p className="rk-intro mx-auto mt-2 max-w-[40ch]">{HERO.sub}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <BookCallButton />
            <a className="rk-btn rk-btn-line" href="#work">
              See our work
            </a>
          </div>
          <p className="mt-3.5 text-[14px]" style={{ color: "var(--rk-ter)" }}>
            {HERO.meta}
          </p>

          <TimezoneStrip />
        </div>
      </header>

      {/* Proof inside the first viewport — 6 of 8 researched competitors do
          this and neither earlier draft did. See research-v1.md. */}
      <div className="rk-alt py-10">
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-7 px-[clamp(22px,5vw,60px)] text-center">
          {PROOF.map((metric) => (
            <div key={metric.label}>
              <div className="text-[clamp(32px,3.6vw,40px)] font-semibold leading-[1.1] tabular-nums">
                {metric.unverified ? <TK>{metric.value}</TK> : metric.value}
              </div>
              <div className="mt-1.5 text-[14px] leading-[1.4]" style={{ color: "var(--rk-sec)" }}>
                {metric.unverified ? <TK>{metric.label}</TK> : metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
