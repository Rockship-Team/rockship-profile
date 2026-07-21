import Image from "next/image";
import { TEAM } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import TK from "./TK";

export default function Team() {
  return (
    <Section id="team" alt>
      <Reveal>
        <SectionHead
          index="06"
          eyebrow="Team"
          headline="The people you'll work with."
          intro="You meet the engineers before you commit."
        />
      </Reveal>

      {/* The frame is capped rather than stretched to the column: at 1120px the
          old auto-fit 1fr columns rendered ~232x290 portraits, which read as
          hero images instead of headshots. */}
      <RevealGroup className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-x-8 gap-y-10">
        {TEAM.map((person) => (
          <RevealItem key={person.name}>
            <article className="group">
              <div
                className="relative aspect-[4/5] w-full max-w-[160px] overflow-hidden rounded-[14px]"
                style={{ background: "var(--rk-paper)", border: "1px solid var(--rk-hair)" }}
              >
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="160px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[0.011em]">
                {person.unverified ? <TK>{person.name}</TK> : person.name}
              </h3>
              <div className="mt-1 text-[14px]" style={{ color: "var(--rk-sec)" }}>
                {person.unverified ? <TK>{person.role}</TK> : person.role}
              </div>
              {person.previously ? (
                <div className="mt-2 text-[13px]" style={{ color: "var(--rk-ter)" }}>
                  Previously {person.previously}
                </div>
              ) : null}
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
