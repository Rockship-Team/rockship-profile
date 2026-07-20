"use client";

import { useEffect, useState } from "react";
import { MARKETS, OUR_HOURS, OUR_TIMEZONE } from "@/lib/home-content";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function offsetHours(timeZone: string, at: Date) {
  const local = new Date(at.toLocaleString("en-US", { timeZone }));
  const utc = new Date(at.toLocaleString("en-US", { timeZone: "UTC" }));
  return Math.round((local.getTime() - utc.getTime()) / 3_600_000);
}

function timeIn(timeZone: string, at: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(at);
}

/**
 * The page's one visual anchor: every client market's working day laid over a
 * single UTC axis, with a live indicator sweeping across it.
 *
 * It exists because it answers the first question an international client asks
 * about a Vietnam-based team — when are you actually online — with our own
 * data rather than a stock illustration.
 */
export default function CoverageBand() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const utcNow = now
    ? now.getUTCHours() + now.getUTCMinutes() / 60
    : null;

  const ourOffset = now ? offsetHours(OUR_TIMEZONE, now) : 7;
  const ourUtcHours = new Set(
    Array.from({ length: OUR_HOURS.end - OUR_HOURS.start }, (_, i) =>
      ((OUR_HOURS.start + i - ourOffset) % 24 + 24) % 24
    )
  );

  return (
    <div
      className="relative mx-auto mt-[clamp(48px,6vw,80px)] w-full max-w-[880px] overflow-hidden rounded-[20px] text-left"
      style={{ background: "var(--rk-alt)" }}
    >
      <div
        className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-5 pb-4"
        style={{ borderBottom: "1px solid var(--rk-hair)" }}
      >
        <span className="rk-num">Working coverage</span>
        <span className="text-[13px]" style={{ color: "var(--rk-sec)" }}>
          {now ? `Ho Chi Minh City · ${timeIn(OUR_TIMEZONE, now)}` : " "}
        </span>
      </div>

      <div className="relative px-6 py-5">
        {/* live "now" line */}
        {utcNow !== null ? (
          <div
            className="pointer-events-none absolute top-3 bottom-8 w-px"
            style={{
              left: `calc(24px + 96px + (100% - 24px - 96px - 24px) * ${utcNow / 24})`,
              background: "var(--rk-ink)",
              opacity: 0.35,
            }}
          />
        ) : null}

        {MARKETS.map((market) => {
          const marketOffset = now ? offsetHours(market.tz, now) : 0;

          return (
            <div key={market.tz} className="mb-1.5 grid grid-cols-[96px_1fr] items-center gap-3">
              <span
                className="truncate text-[12px]"
                style={{ color: "var(--rk-sec)", letterSpacing: "-0.01em" }}
              >
                {market.label}
              </span>
              <div className="grid grid-cols-24 gap-[2px]" style={{ gridTemplateColumns: "repeat(24, 1fr)" }}>
                {HOURS.map((utcHour) => {
                  const localHour = ((utcHour + marketOffset) % 24 + 24) % 24;
                  const working = localHour >= OUR_HOURS.start && localHour < OUR_HOURS.end;
                  const overlapping = working && ourUtcHours.has(utcHour);

                  return (
                    <span
                      key={utcHour}
                      className="h-[18px] rounded-[3px] transition-colors"
                      style={{
                        background: overlapping
                          ? "var(--rk-accent)"
                          : working
                            ? "color-mix(in srgb, var(--rk-ink) 22%, transparent)"
                            : "color-mix(in srgb, var(--rk-ink) 6%, transparent)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* hour axis */}
        <div className="mt-2 grid grid-cols-[96px_1fr] gap-3">
          <span />
          <div className="grid" style={{ gridTemplateColumns: "repeat(24, 1fr)" }}>
            {HOURS.map((hour) => (
              <span
                key={hour}
                className="text-center text-[9px] tabular-nums"
                style={{ color: "var(--rk-ter)" }}
              >
                {hour % 6 === 0 ? String(hour).padStart(2, "0") : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center gap-x-5 gap-y-2 px-6 pt-3 pb-5 text-[11px]"
        style={{ borderTop: "1px solid var(--rk-hair)", color: "var(--rk-sec)" }}
      >
        <span className="inline-flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-[2px]" style={{ background: "var(--rk-accent)" }} />
          Overlaps our working day
        </span>
        <span className="inline-flex items-center gap-2">
          <i
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{ background: "color-mix(in srgb, var(--rk-ink) 22%, transparent)" }}
          />
          Their business hours
        </span>
        <span style={{ color: "var(--rk-ter)" }}>UTC axis · live</span>
      </div>
    </div>
  );
}
