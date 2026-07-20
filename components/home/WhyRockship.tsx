import { DIFFERENTIATORS } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import TK from "./TK";

export default function WhyRockship() {
  return (
    <Section id="why" alt>
      <SectionHead
        index="02"
        eyebrow="Why Rockship"
        headline="Proof, not promises."
        intro={
          <TK>Start with a two-week paid trial. Walk away at the end, owing nothing further.</TK>
        }
      />
      <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {DIFFERENTIATORS.map((item) => (
          <article
            key={item.title}
            className="rounded-[18px] px-7 py-8"
            style={{ background: "var(--rk-paper)" }}
          >
            <h3 className="rk-item">{item.title}</h3>
            <p className="mt-2.5 text-[17px]" style={{ color: "var(--rk-sec)" }}>
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
