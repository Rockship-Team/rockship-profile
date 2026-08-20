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

/**
 * Rule-and-label divider above each row. A hairline either side of the label
 * rather than a left-aligned heading: the portraits are centre-aligned tracks,
 * so a centred label keeps the column axis intact instead of introducing a
 * second, competing left edge.
 */
function GroupLabel({ children }: { children: string }) {
  return (
    // 650px = the three 190px tracks plus their two 40px gutters, so the rule
    // ends where the portrait grid ends instead of running the full 1120px.
    <h3 className="mx-auto mb-8 flex w-full max-w-[650px] items-center gap-4">
      <span aria-hidden className="h-px flex-1" style={{ background: "var(--rk-hair)" }} />
      <span
        className="rk-num whitespace-nowrap text-[13px] uppercase"
        style={{ letterSpacing: "0.08em" }}
      >
        {children}
      </span>
      <span aria-hidden className="h-px flex-1" style={{ background: "var(--rk-hair)" }} />
    </h3>
  );
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
            <h4 className="mt-4 text-[18px] font-semibold tracking-[0.011em]">
              {person.unverified ? <TK>{person.name}</TK> : person.name}
            </h4>
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

  /** Each row is a named group, labelled by a rule so the hierarchy is readable. */
  const groups: { label: string; people: RosterCard[]; id?: string }[] = [
    { label: "Executive Team", people: staffRows[0] ?? [] },
    { label: "Management Team", people: staffRows[1] ?? [] },
    { label: "Advisory Board", people: advisorRow, id: "advisors" },
  ].filter((group) => group.people.length > 0);

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
      <div className="mt-[clamp(48px,6vw,80px)] flex flex-col gap-y-[clamp(44px,5vw,64px)]">
        {groups.map((group) => (
          <div key={group.label} id={group.id} className="scroll-mt-[88px]">
            <Reveal>
              <GroupLabel>{group.label}</GroupLabel>
            </Reveal>
            <PersonRow people={group.people} />
          </div>
        ))}
      </div>
    </Section>
  );
}
