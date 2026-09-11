import { SELECTION } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";

/**
 * The highest-leverage section on the page: an international buyer's first
 * objection is that engineering quality is unverifiable from the other side of
 * the world. Toptal answers it with published stage-by-stage pass rates.
 * Ours render only once Ops supplies real numbers.
 */
export default function Selection() {
  return (
    <Section id="selection">
      <Reveal>
        <SectionHead
          index="04"
          eyebrow="Selection"
          headline="Empirical rigor. Deterministic execution. An uncompromising engineering bar."
          intro="We evaluate technical talent by production systems reliability, not resume claims. Here is our four-stage vetting protocol."
        />
      </Reveal>
      <div className="mx-auto mt-[clamp(48px,6vw,80px)] max-w-[720px]">
        {SELECTION.map((stage, index) => (
          <div
            key={stage.index}
            className="grid grid-cols-[40px_1fr_auto] items-baseline gap-5 py-5 max-[700px]:grid-cols-[32px_1fr]"
            style={
              index === 0 ? undefined : { borderTop: "1px solid var(--rk-hair)" }
            }
          >
            <span className="rk-num">{stage.index}</span>
            <div>
              <h3 className="text-[21px] font-semibold tracking-[0.011em]">{stage.title}</h3>
              <p className="mt-1.5 text-[15px]" style={{ color: "var(--rk-sec)" }}>
                {stage.body}
              </p>
            </div>
            {stage.rate ? (
              <span className="text-[21px] font-semibold tabular-nums">{stage.rate}</span>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
