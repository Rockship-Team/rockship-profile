import Image from "next/image";
import { TEAM } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import TK from "./TK";

/** Splits the roster into a top row of 3 and a centred row of 2 below. */
function chunkRows<T>(items: T[], firstRowSize: number): T[][] {
  return [items.slice(0, firstRowSize), items.slice(firstRowSize)];
}

function TeamRow({ people }: { people: typeof TEAM }) {
  return (
    <RevealGroup className="grid grid-cols-[repeat(auto-fit,190px)] justify-center gap-x-10 gap-y-12">
      {people.map((person) => (
        <RevealItem key={person.name}>
          <article className="group text-center">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px]"
              style={{ background: "var(--rk-paper)", border: "1px solid var(--rk-hair)" }}
            >
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="190px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: person.photoPosition ?? "center top" }}
              />
            </div>
            <h3 className="mt-4 text-[18px] font-semibold tracking-[0.011em]">
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
  );
}

export default function Team() {
  const [topRow, bottomRow] = chunkRows(TEAM, 3);

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

      {/* Fixed 190px tracks rather than stretched 1fr columns: at 1120px the
          old auto-fit grid rendered ~232x290 portraits, which read as hero
          images instead of headshots. Two centred rows (3 then 2) rather than
          one auto-fill grid, so the roster reads as a deliberate arrangement
          instead of wrapping wherever the container happens to break. */}
      <div className="mt-[clamp(48px,6vw,80px)] flex flex-col gap-y-12">
        <TeamRow people={topRow} />
        <TeamRow people={bottomRow} />
      </div>
    </Section>
  );
}
