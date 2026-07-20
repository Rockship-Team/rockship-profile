import type { Metadata } from "next";
import Link from "next/link";
import { BookCallProvider } from "@/components/home/BookCall";
import Nav from "@/components/home/Nav";
import SiteFooter from "@/components/home/SiteFooter";
import { EVENTS, EVENTS_ARE_PLACEHOLDER } from "@/lib/home-content";
import type { EventStatus, RockshipEvent } from "@/types/home";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Talks, workshops and open sessions Rockship hosts or takes part in — in Ho Chi Minh City and online.",
};

export default function EventsPage() {
  const upcoming = EVENTS.filter((event) => event.status === "upcoming");
  const past = EVENTS.filter((event) => event.status === "past");

  return (
    <BookCallProvider>
      <div className="rk">
        <Nav />

        {EVENTS_ARE_PLACEHOLDER ? (
          <div style={{ background: "#FBEFDC", color: "#8A4B00" }}>
            <p className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)] py-3.5 text-[13px]">
              <strong>Placeholder content.</strong> Every event below is illustrative. Real
              event data is needed before this page ships.
            </p>
          </div>
        ) : null}

        <main>
          <header className="pt-[clamp(64px,9vw,104px)] pb-[clamp(40px,5vw,64px)] text-center">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
              <h1 className="rk-hero mx-auto max-w-[14ch]">Where we build in public.</h1>
              <p className="rk-intro mx-auto mt-3 max-w-[44ch]">
                Talks, workshops and open sessions we host or take part in — in Ho Chi Minh
                City and online.
              </p>
            </div>
          </header>

          <EventList
            id="upcoming"
            heading="Upcoming"
            sub="Venue is shared with registered attendees."
            events={upcoming}
            status="upcoming"
          />
          <EventList
            id="past"
            heading="Past"
            sub="Recaps and slides, where the speakers agreed to share them."
            events={past}
            status="past"
            alt
          />

          <section className="rk-sec text-center">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
              <h2 className="rk-head mx-auto max-w-[16ch]">
                Want us to run one with your team?
              </h2>
              <p className="rk-intro mx-auto mt-3 max-w-[42ch]">
                We host private sessions for engineering teams — on evals, AI cost control,
                or forward-deployed practice.
              </p>
              <Link className="rk-btn mt-7 inline-flex" href="/#contact">
                Get in touch
              </Link>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </BookCallProvider>
  );
}

function EventList({
  id,
  heading,
  sub,
  events,
  status,
  alt = false,
}: {
  id: string;
  heading: string;
  sub: string;
  events: RockshipEvent[];
  status: EventStatus;
  alt?: boolean;
}) {
  if (events.length === 0) return null;

  return (
    <section id={id} className={`py-[clamp(56px,7vw,88px)] ${alt ? "rk-alt" : ""}`}>
      <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
        <h2 className="rk-head">{heading}</h2>
        <p className="mt-2 text-[17px]" style={{ color: "var(--rk-sec)" }}>
          {sub}
        </p>

        <div className="mt-9">
          {events.map((event, index) => (
            <a
              key={event.title}
              href={event.href}
              className="group grid grid-cols-[132px_1fr_auto] items-center gap-7 py-6 max-[820px]:grid-cols-1 max-[820px]:gap-2.5"
              style={{
                borderTop: "1px solid var(--rk-hair)",
                borderBottom:
                  index === events.length - 1 ? "1px solid var(--rk-hair)" : undefined,
              }}
            >
              <div className="text-[14px]" style={{ color: "var(--rk-sec)" }}>
                <span
                  className="mb-[7px] inline-block rounded-full px-[9px] py-[3px] text-[11px]"
                  style={
                    status === "upcoming"
                      ? { background: "var(--rk-ink)", color: "var(--rk-paper)" }
                      : {
                          background: "var(--rk-paper)",
                          color: "var(--rk-sec)",
                          border: "1px solid var(--rk-hair)",
                        }
                  }
                >
                  {status === "upcoming" ? "Upcoming" : "Ended"}
                </span>
                <b className="block text-[17px] font-semibold" style={{ color: "var(--rk-ink)" }}>
                  {event.date}
                </b>
                {event.year}
                {event.time ? ` · ${event.time}` : ""}
              </div>

              <div>
                <h3 className="rk-item group-hover:underline group-hover:underline-offset-[5px]">
                  {event.title}
                </h3>
                <div className="mt-[7px] text-[14px]" style={{ color: "var(--rk-sec)" }}>
                  {event.location}
                </div>
                <p className="mt-2 max-w-[56ch] text-[15px]" style={{ color: "var(--rk-sec)" }}>
                  {event.description}
                </p>
              </div>

              <span className="whitespace-nowrap text-[15px]">
                {status === "upcoming" ? "Register →" : "View recap →"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
