import Link from "next/link";
import { CAREER } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

/**
 * Written as proof of our talent bar rather than as recruiting. Research found
 * that none of Palantir, Toptal, Turing or sixonefourlabs mixes audiences on a
 * client-facing page. See docs/rebrand/research-v2.md Part 4.
 */
export default function Career() {
  return (
    <Section id="career">
      <Reveal>
        <SectionHead
          index="05"
          eyebrow="A career, redefined"
          headline="We build the engineers we place."
          intro="AI writes more of the code every quarter. What's scarce is the engineer who owns the outcome."
        />
      </Reveal>

      <RevealGroup className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {CAREER.map((pillar) => (
          <RevealItem key={pillar.index} className="h-full">
            <article className="rk-card flex h-full flex-col p-8">
              <span
                className="text-[44px] font-semibold leading-none tabular-nums"
                style={{ color: "color-mix(in srgb, var(--rk-ink) 14%, transparent)" }}
              >
                {pillar.index}
              </span>
              <h3 className="rk-item mt-6">{pillar.title}</h3>
              <p className="mt-3 text-[17px]" style={{ color: "var(--rk-sec)" }}>
                {pillar.body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="rk-cap mt-9 text-center">
          Engineers:{" "}
          <Link href="/events" className="underline underline-offset-4">
            see our next open session
          </Link>
          .
        </p>
      </Reveal>
    </Section>
  );
}
