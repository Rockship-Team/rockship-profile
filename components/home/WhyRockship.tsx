import { DIFFERENTIATORS } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import TK from "./TK";

export default function WhyRockship() {
  return (
    <Section id="why" alt>
      <Reveal>
        <SectionHead
          index="02"
          eyebrow="Why Rockship"
          headline="Proof, not promises."
          intro={
            <TK>Start with a two-week paid trial. Walk away at the end, owing nothing further.</TK>
          }
        />
      </Reveal>

      <RevealGroup className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {DIFFERENTIATORS.map((item) => (
          <RevealItem key={item.title} className="h-full">
            <article className="rk-card h-full p-8">
              <h3 className="rk-item">{item.title}</h3>
              <p className="mt-3 text-[17px]" style={{ color: "var(--rk-sec)" }}>
                {item.body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
