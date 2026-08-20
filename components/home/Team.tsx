import Image from "next/image";
import { ADVISORS, TEAM } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import TK from "./TK";

/** One portrait card — the same shape whether the person is staff or an advisor. */
interface RosterCard {
  name: string;
  role: string;
  photo: string;
  photoPosition?: string;
  /** Credential line under the role: "Previously X" for staff, the bio for advisors. */
  note: string | null;
  unverified?: boolean;
}

/** Splits the roster into rows of `size` so each row stays centred. */
function chunkRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

function PersonRow({ people }: { people: RosterCard[] }) {
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
            {person.note ? (
              <div className="mt-2 text-[13px]" style={{ color: "var(--rk-ter)" }}>
                {person.note}
              </div>
            ) : null}
          </article>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export default function Team() {
  const staffRows = chunkRows<RosterCard>(
    TEAM.map((person) => ({
      ...person,
      note: person.previously ? `Previously ${person.previously}` : null,
    })),
    3
  );
  const advisorRow: RosterCard[] = ADVISORS.map((advisor) => ({
    ...advisor,
    note: advisor.subtext,
  }));

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
          images instead of headshots. Rows of three rather than one auto-fill
          grid, so the roster reads as a deliberate arrangement instead of
          wrapping wherever the container happens to break. Advisors close the
          section as a final row — they were their own section until the roster
          was small enough that two headers back to back read as padding. The
          "advisors" id stays put so existing /#advisors links still land. */}
      <div className="mt-[clamp(48px,6vw,80px)] flex flex-col gap-y-12">
        {staffRows.map((row, i) => (
          <PersonRow key={i} people={row} />
        ))}
        {advisorRow.length > 0 ? (
          <div id="advisors" className="scroll-mt-[88px]">
            <PersonRow people={advisorRow} />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
