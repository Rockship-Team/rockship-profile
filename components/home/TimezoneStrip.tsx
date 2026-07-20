"use client";

import { useEffect, useState } from "react";
import { MARKETS, OUR_HOURS, OUR_TIMEZONE } from "@/lib/home-content";

function hourIn(timeZone: string, at: Date) {
  return Number(
    new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", hour12: false }).format(at)
  );
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
 * Answers the first question every international client has about a
 * Vietnam-based team: when are you actually online? Rendered client-side only,
 * so the server and client markup cannot disagree about the current minute.
 */
export default function TimezoneStrip() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const ourHour = now ? hourIn(OUR_TIMEZONE, now) : null;
  const weAreWorking =
    ourHour !== null && ourHour >= OUR_HOURS.start && ourHour < OUR_HOURS.end;

  return (
    <div className="mt-[clamp(48px,6vw,76px)]">
      <div className="flex flex-wrap justify-center gap-2">
        {MARKETS.map((market) => {
          const theirHour = now ? hourIn(market.tz, now) : null;
          const overlapping =
            weAreWorking &&
            theirHour !== null &&
            theirHour >= OUR_HOURS.start &&
            theirHour < OUR_HOURS.end;

          return (
            <span
              key={market.tz}
              className="inline-flex items-baseline gap-2 rounded-full px-3.5 py-[7px] text-[13px]"
              style={{
                background: overlapping ? "var(--rk-ink)" : "var(--rk-alt)",
                color: overlapping
                  ? "color-mix(in srgb, var(--rk-paper) 70%, transparent)"
                  : "var(--rk-sec)",
                letterSpacing: "-0.01em",
              }}
            >
              {market.label}{" "}
              <b
                className="font-normal tabular-nums"
                style={{ color: overlapping ? "var(--rk-paper)" : "var(--rk-ink)" }}
              >
                {now ? timeIn(market.tz, now) : "—"}
              </b>
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[12px]" style={{ color: "var(--rk-ter)" }}>
        {now === null
          ? "Where our clients are."
          : weAreWorking
            ? "Our team is online now — highlighted markets are in their working day too."
            : "Outside our standard hours. Markets highlight when we overlap."}
      </p>
    </div>
  );
}
