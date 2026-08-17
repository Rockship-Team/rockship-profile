import Image from "next/image";
import { ADVISORS } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

export default function Advisors() {
  return (
    <Section id="advisors">
      <Reveal>
        <SectionHead
          index="07"
          eyebrow="Advisors"
          headline="Guidance from people who've done it."
        />
      </Reveal>

      <RevealGroup className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,190px)] justify-center gap-x-10 gap-y-12">
        {ADVISORS.map((advisor) => (
          <RevealItem key={advisor.name}>
            <article className="group text-center">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px]"
                style={{ background: "var(--rk-paper)", border: "1px solid var(--rk-hair)" }}
              >
                <Image
                  src={advisor.photo}
                  alt={advisor.name}
                  fill
                  sizes="190px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: advisor.photoPosition ?? "center top" }}
                />
              </div>
              <h3 className="mt-4 text-[18px] font-semibold tracking-[0.011em]">
                {advisor.name}
              </h3>
              <div className="mt-1 text-[14px]" style={{ color: "var(--rk-sec)" }}>
                {advisor.role}
              </div>
              <div className="mt-2 text-[13px]" style={{ color: "var(--rk-ter)" }}>
                {advisor.subtext}
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
