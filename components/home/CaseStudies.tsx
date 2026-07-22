import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

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
        {CASE_STUDIES.map((study) => {
          return (
            <RevealItem key={study.href} className="h-full">
              <Link href={study.href} className="rk-card group flex h-full flex-col overflow-hidden">
                <div
                  className="relative aspect-[16/9] overflow-hidden"
                  style={{ background: "var(--rk-alt)" }}
                >
                  <Image
                    src={study.thumb}
                    alt={study.title}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1120px) 50vw, 360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="text-[13px]" style={{ color: "var(--rk-ter)" }}>
                    {study.market}
                  </div>
                  <h3 className="rk-item mt-1.5">{study.title}</h3>

                  <div className="mt-6 flex items-baseline gap-3">
                    <b className="text-[40px] font-semibold leading-none tabular-nums tracking-[-0.02em]">
                      {study.stat}
                    </b>
                    <span className="text-[14px]" style={{ color: "var(--rk-sec)" }}>
                      {study.statLabel}
                    </span>
                  </div>

                  <span
                    className="mt-auto pt-6 text-[15px] transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--rk-accent)" }}
                  >
                    Read the case study →
                  </span>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
