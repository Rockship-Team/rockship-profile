import type { Metadata } from "next";
import Link from "next/link";
import { BookCallProvider } from "@/components/home/BookCall";
import Nav from "@/components/home/Nav";
import SiteFooter from "@/components/home/SiteFooter";
import { DEMOS } from "@/lib/demos-content";

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Interactive prototypes and walkthroughs of products Rockship has built — costing, procurement and data platforms.",
};

export default function DemosPage() {
  return (
    <BookCallProvider>
      <div className="rk">
        <Nav />

        <main>
          <header className="pt-[clamp(64px,9vw,104px)] pb-[clamp(40px,5vw,64px)] text-center">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
              <h1 className="rk-hero mx-auto max-w-[16ch]">See what we build.</h1>
              <p className="rk-intro mx-auto mt-3 max-w-[46ch]">
                A few working prototypes and walkthroughs — click through them the way a
                user would, or watch the short tour.
              </p>
            </div>
          </header>

          <section className="pb-[clamp(56px,7vw,88px)]">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {DEMOS.map((demo) => (
                  <Link
                    key={demo.slug}
                    href={`/demos/${demo.slug}`}
                    className="rk-card group flex h-full flex-col p-7"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-flex rounded-full px-[9px] py-[3px] text-[11px]"
                        style={{
                          background: demo.prototype ? "var(--rk-ink)" : "var(--rk-paper)",
                          color: demo.prototype ? "var(--rk-paper)" : "var(--rk-sec)",
                          border: demo.prototype ? undefined : "1px solid var(--rk-hair)",
                        }}
                      >
                        {demo.prototype ? "Interactive" : "Video walkthrough"}
                      </span>
                      {demo.language === "Vietnamese" ? (
                        <span
                          className="inline-flex rounded-full px-[9px] py-[3px] text-[11px]"
                          style={{
                            background: "var(--rk-paper)",
                            color: "var(--rk-sec)",
                            border: "1px solid var(--rk-hair)",
                          }}
                        >
                          Tiếng Việt
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-4 text-[13px]" style={{ color: "var(--rk-ter)" }}>
                      {demo.domain}
                    </div>
                    <h2 className="rk-item mt-1.5 group-hover:underline group-hover:underline-offset-[5px]">
                      {demo.title}
                    </h2>
                    <p className="mt-2 text-[15px]" style={{ color: "var(--rk-sec)" }}>
                      {demo.tagline}
                    </p>

                    <span
                      className="mt-auto pt-6 text-[15px] transition-transform group-hover:translate-x-1"
                      style={{ color: "var(--rk-accent)" }}
                    >
                      {demo.prototype ? "Open the demo →" : "Watch the walkthrough →"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </BookCallProvider>
  );
}
