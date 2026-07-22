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

      {/*
        Flex-wrap + justify-center rather than a grid so an incomplete final
        row centres itself. There are four cards: three fill the first row and
        the fourth would otherwise sit left-aligned and lonely under them.
        Centring keeps the block symmetrical. Widths: one per row on mobile,
        two on small screens, three on large — so the orphan is always centred.
      */}
      <RevealGroup className="mt-[clamp(48px,6vw,80px)] flex flex-wrap justify-center gap-6">
        {DIFFERENTIATORS.map((item) => (
          <RevealItem
            key={item.title}
            className="h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
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
