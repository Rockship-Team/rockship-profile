import Image from "next/image";
import { TEAM } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import TK from "./TK";

export default function Team() {
  return (
    <Section id="team" alt>
      <SectionHead
        index="06"
        eyebrow="Team"
        headline="The people you'll work with."
        intro="You meet the engineers before you commit."
      />
      <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-7">
        {TEAM.map((person) => (
          <article key={person.name}>
            <div
              className="relative aspect-square overflow-hidden rounded-[18px] grayscale"
              style={{ background: "var(--rk-paper)" }}
            >
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="(max-width: 700px) 50vw, 260px"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-[21px] font-semibold tracking-[0.011em]">
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
        ))}
      </div>
    </Section>
  );
}
