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

      <RevealGroup className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-8">
        {TEAM.map((person) => (
          <RevealItem key={person.name}>
            <article className="group">
              <div
                className="rk-shot relative aspect-[4/5] overflow-hidden rounded-[20px]"
                style={{ background: "var(--rk-paper)", border: "1px solid var(--rk-hair)" }}
              >
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 700px) 50vw, 300px"
                  className="object-cover object-top"
                />
              </div>
              <h3 className="mt-5 text-[21px] font-semibold tracking-[0.011em]">
                {person.unverified ? <TK>{person.name}</TK> : person.name}
              </h3>
              <div className="mt-1 text-[15px]" style={{ color: "var(--rk-sec)" }}>
                {person.unverified ? <TK>{person.role}</TK> : person.role}
              </div>
              <div className="mt-2 text-[13px]" style={{ color: "var(--rk-ter)" }}>
                {person.previously ? (
                  `Previously ${person.previously}`
                ) : (
                  <TK>Previously — to confirm</TK>
                )}
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
