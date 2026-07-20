import Link from "next/link";
import { CASE_STUDIES } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";

export default function CaseStudies() {
  return (
    <Section id="work" alt>
      <SectionHead
        index="04"
        eyebrow="Case studies"
        headline="What we've put into production."
        intro="Client names withheld under NDA. Metrics measured by the client."
      />
      <div className="mx-auto mt-[clamp(48px,6vw,80px)] max-w-[900px]">
        {CASE_STUDIES.map((study, index) => (
          <Link
            key={study.href}
            href={study.href}
            className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 max-[700px]:grid-cols-1 max-[700px]:gap-2.5"
            style={index === 0 ? undefined : { borderTop: "1px solid var(--rk-hair)" }}
          >
            <div>
              <div className="text-[14px]" style={{ color: "var(--rk-ter)" }}>
                {study.market}
              </div>
              <h3 className="rk-item mt-1.5 group-hover:underline group-hover:underline-offset-[5px]">
                {study.title}
              </h3>
            </div>
            <div className="text-right max-[700px]:text-left">
              <b className="block text-[32px] font-semibold tabular-nums tracking-[0.004em]">
                {study.stat}
              </b>
              <span className="mt-1 block text-[14px]" style={{ color: "var(--rk-sec)" }}>
                {study.statLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
