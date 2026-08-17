import { SERVICES } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

export default function Services() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHead
          index="01"
          eyebrow="Services"
          headline="Three ways to work with us."
          intro="AI-Native Engineering Team only. No junior bench, no account managers."
        />
      </Reveal>

      <RevealGroup className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {SERVICES.map((service) => (
          <RevealItem key={service.index} className="h-full">
            <article
              className={`rk-card relative flex h-full flex-col p-8 ${service.highlight ? "rk-card--highlight" : ""}`}
            >
              {service.highlight ? (
                <span className="rk-badge">Most popular</span>
              ) : null}
              <span
                className="text-[44px] font-semibold leading-none tabular-nums"
                style={{ color: "color-mix(in srgb, var(--rk-ink) 14%, transparent)" }}
              >
                {service.index}
              </span>
              <h3 className="rk-item mt-6">{service.title}</h3>
              <p className="mt-3 text-[17px]" style={{ color: "var(--rk-sec)" }}>
                {service.body}
              </p>
              <p
                className="mt-auto pt-6 text-[13px]"
                style={{ color: "var(--rk-ter)" }}
              >
                {service.terms}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
