import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

/**
 * The case-study artwork in public/images is AI-generated and contains garbled
 * baked-in text ("Loar AI Appovealy", "Loan Recommendios"). Legible, it reads
 * as unserious on a page whose job is establishing credibility. It is used
 * here blurred, as a colour wash behind the result — texture without content.
 *
 * Replace with real product screenshots and this becomes a normal image card.
 */
export default function CaseStudies() {
  return (
    <Section id="work" alt>
      <Reveal>
        <SectionHead
          index="04"
          eyebrow="Case studies"
          headline="What we've put into production."
          intro="Client names withheld under NDA. Metrics measured by the client."
        />
      </Reveal>

      <RevealGroup className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        {CASE_STUDIES.map((study) => (
          <RevealItem key={study.href} className="h-full">
            <Link href={study.href} className="rk-card group flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={study.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  aria-hidden
                  className="scale-125 object-cover blur-2xl saturate-[1.15] transition-transform duration-700 group-hover:scale-[1.35]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in srgb, var(--rk-paper) 42%, transparent), var(--rk-paper))",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <b className="text-[clamp(40px,4.6vw,56px)] font-semibold leading-none tabular-nums tracking-[-0.02em]">
                    {study.stat}
                  </b>
                  <span className="mt-2 text-[14px]" style={{ color: "var(--rk-sec)" }}>
                    {study.statLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-7 pt-5 pb-7">
                <div className="text-[13px]" style={{ color: "var(--rk-ter)" }}>
                  {study.market}
                </div>
                <h3 className="rk-item mt-1.5">{study.title}</h3>
                <span
                  className="mt-auto pt-6 text-[15px] transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--rk-accent)" }}
                >
                  Read the case study →
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
