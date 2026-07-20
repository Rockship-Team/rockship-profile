import { SERVICES } from "@/lib/home-content";
import Section, { SectionHead } from "./Section";

export default function Services() {
  return (
    <Section id="services">
      <SectionHead
        index="01"
        eyebrow="Services"
        headline="Three ways to work with us."
        intro="Senior engineers only. No junior bench, no account managers."
      />
      <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {SERVICES.map((service) => (
          <article
            key={service.index}
            className="rounded-[18px] px-7 py-8"
            style={{ background: "var(--rk-alt)" }}
          >
            <span className="rk-num mb-3.5 block">{service.index}</span>
            <h3 className="rk-item">{service.title}</h3>
            <p className="mt-2.5 text-[17px]" style={{ color: "var(--rk-sec)" }}>
              {service.body}
            </p>
            <p className="mt-2 text-[14px]" style={{ color: "var(--rk-ter)" }}>
              {service.terms}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
