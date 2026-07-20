import type { ReactNode } from "react";

/**
 * Shared section shell. One idea per section, separated by a background swap
 * and large padding rather than borders — the apple.com pattern measured in
 * docs/rebrand/research-v2.md.
 */
export default function Section({
  id,
  alt = false,
  children,
}: {
  id: string;
  alt?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`rk-sec ${alt ? "rk-alt" : ""}`}>
      <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  index,
  eyebrow,
  headline,
  intro,
}: {
  index: string;
  eyebrow: string;
  headline: string;
  intro?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[40ch] text-center">
      <span className="rk-num">
        {index} — {eyebrow}
      </span>
      <h2 className="rk-head mt-[10px]">{headline}</h2>
      {intro ? <p className="rk-intro mt-3">{intro}</p> : null}
    </header>
  );
}
