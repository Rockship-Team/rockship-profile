import { FAQ } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import TK from "./TK";

export default function Faq() {
  return (
    <Section id="faq">
      <Reveal>
        <SectionHead index="07" eyebrow="Questions" headline="The things clients ask first." />
      </Reveal>
      <div className="mx-auto mt-[clamp(48px,6vw,80px)] max-w-[720px]">
        {FAQ.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group"
            style={{
              borderTop: "1px solid var(--rk-hair)",
              borderBottom: index === FAQ.length - 1 ? "1px solid var(--rk-hair)" : undefined,
            }}
          >
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-5 py-[22px] text-[19px] tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                className="text-[22px] leading-none group-open:hidden"
                style={{ color: "var(--rk-ter)" }}
                aria-hidden
              >
                +
              </span>
              <span
                className="hidden text-[22px] leading-none group-open:inline"
                style={{ color: "var(--rk-ter)" }}
                aria-hidden
              >
                –
              </span>
            </summary>
            <p className="max-w-[62ch] pb-[22px] text-[17px]" style={{ color: "var(--rk-sec)" }}>
              {item.unverified ? <TK>{item.answer}</TK> : item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
