import Link from "next/link";
import { CAREER } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";

/**
 * Written as proof of our talent bar rather than as recruiting. Research found
 * that none of Palantir, Toptal, Turing or sixonefourlabs mixes audiences on a
 * client-facing page — a client should read this as quality assurance.
 * See docs/rebrand/research-v2.md Part 4.
 */
export default function Career() {
  return (
    <Section id="career">
      <SectionHead
        index="05"
        eyebrow="A career, redefined"
        headline="We build the engineers we place."
        intro="AI writes more of the code every quarter. What's scarce is the engineer who owns the outcome."
      />
      <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {CAREER.map((pillar) => (
          <article
            key={pillar.index}
            className="rounded-[18px] px-7 py-8"
            style={{ background: "var(--rk-alt)" }}
          >
            <span className="rk-num mb-3.5 block">{pillar.index}</span>
            <h3 className="rk-item">{pillar.title}</h3>
            <p className="mt-2.5 text-[17px]" style={{ color: "var(--rk-sec)" }}>
              {pillar.body}
            </p>
          </article>
        ))}
      </div>
      <p className="rk-cap mt-7 text-center">
        Engineers:{" "}
        <Link href="/events" className="underline underline-offset-4">
          see our next open session
        </Link>
        .
      </p>
    </Section>
  );
}
