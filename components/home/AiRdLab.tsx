import Image from "next/image";
import { AI_RD_LAB } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

/**
 * The R&D block: prose left, platform diagram right. Deliberately the only
 * two-column section on the page — the diagram is the argument here, so it
 * sits beside the claim it illustrates rather than under it.
 *
 * The section runs on paper rather than the alt grey either side of it, so the
 * dark diagram reads as artwork instead of a floating panel.
 */
export default function AiRdLab() {
  const { intro, body, diagram, capabilities, advisor } = AI_RD_LAB;

  return (
    <Section id="ai-lab">
      <Reveal>
        <SectionHead
          index="06"
          eyebrow="AI R&D Lab"
          headline="Our innovation engine."
          intro={intro}
        />
      </Reveal>

      {/* The prose is two paragraphs against a 4:3 diagram, so the columns are
          centred against each other rather than top-aligned — top-aligned left
          a third of the right column empty. On mobile the diagram takes order-1
          so the picture lands directly under the intro it illustrates. */}
      <div className="mt-[clamp(48px,6vw,80px)] grid items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-2">
        <Reveal className="order-2 flex flex-col gap-4 lg:order-1">
          {body.map((paragraph) => (
            <p key={paragraph} className="text-[17px]" style={{ color: "var(--rk-sec)" }}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.08} className="order-1 lg:order-2">
          <Image
            src={diagram.src}
            alt={diagram.alt}
            width={diagram.width}
            height={diagram.height}
            sizes="(max-width: 1024px) 100vw, 520px"
            className="h-auto w-full rounded-[18px]"
          />
        </Reveal>
      </div>

      {/* A hairline-topped strip rather than another card grid: case studies
          above and Career below are both card grids, and a third in between
          would flatten the page into one long deck.

          Explicit column counts rather than auto-fit: five items auto-fit into
          four columns plus a lone fifth at this width. 5 / 3+2 / 2+2+1 / 1 all
          read as deliberate; 4+1 reads as a mistake. */}
      <RevealGroup className="mt-[clamp(48px,6vw,72px)] grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {capabilities.map((capability) => (
          <RevealItem key={capability.title}>
            <div className="border-t pt-5" style={{ borderColor: "var(--rk-hair)" }}>
              <h3 className="text-[17px] font-semibold leading-snug">{capability.title}</h3>
              <p className="mt-2 text-[15px]" style={{ color: "var(--rk-sec)" }}>
                {capability.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Dr. Buntine also appears in the Team roster. He is repeated here in a
          different register: Team answers who you work with, this answers why
          the lab is credible. */}
      <Reveal className="mt-[clamp(48px,6vw,72px)]">
        <article className="rk-card flex flex-col gap-6 p-8 sm:flex-row sm:items-start sm:gap-8">
          <Image
            src={advisor.photo}
            alt={advisor.name}
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full object-cover"
            style={{ objectPosition: "center top", background: "var(--rk-alt)" }}
          />
          <div>
            <h3 className="rk-item">{advisor.name}</h3>
            <p className="mt-1 text-[15px]" style={{ color: "var(--rk-accent)" }}>
              {advisor.role}
            </p>
            <p className="mt-4 text-[17px]" style={{ color: "var(--rk-sec)" }}>
              {advisor.body}
            </p>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
