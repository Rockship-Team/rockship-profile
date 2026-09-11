import { FAQ } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <Section id="faq">
      <Reveal>
        <SectionHead
          index="08"
          eyebrow="Questions"
          headline="The architectural, security, and operational standards enterprise leaders ask first."
        />
      </Reveal>

      <div className="mx-auto mt-[clamp(48px,6vw,80px)] max-w-[800px] divide-y divide-[color:var(--rk-hair)]">
        {FAQ.map((item) => (
          <details
            key={item.question}
            className="group py-2 transition-colors"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-[18px] font-medium tracking-[-0.01em] transition-colors [&::-webkit-details-marker]:hidden">
              <span className="text-[color:var(--rk-ink)] transition-colors group-hover:text-[color:var(--rk-accent)] sm:text-[19px]">
                {item.question}
              </span>
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--rk-hair)] text-[18px] font-light leading-none transition-transform duration-200 group-open:rotate-45"
                style={{ color: "var(--rk-sec)" }}
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="pb-6 pt-1 text-[16px] leading-[1.65] text-[color:var(--rk-sec)] sm:text-[17px]">
              {item.answer.split("\n").map((para, idx) => (
                <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                  {para}
                </p>
              ))}
              {item.secondaryAnswer && (
                <p className="mt-3.5">{item.secondaryAnswer}</p>
              )}
              {item.points && item.points.length > 0 && (
                <ul className="mt-4 space-y-3 border-l-2 border-[color:var(--rk-hair)] pl-4 sm:pl-5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="text-[15px] sm:text-[16px]">
                      {point.label && (
                        <strong className="font-semibold text-[color:var(--rk-ink)]">
                          {point.label}:{" "}
                        </strong>
                      )}
                      <span>{point.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
