import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCallProvider } from "@/components/home/BookCall";
import Nav from "@/components/home/Nav";
import SiteFooter from "@/components/home/SiteFooter";
import { DEMOS, getDemo } from "@/lib/demos-content";

type DemoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DEMOS.map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return { title: "Demo" };
  return {
    title: demo.title,
    description: demo.tagline,
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  return (
    <BookCallProvider>
      <div className="rk">
        <Nav />

        <main className="pb-[clamp(56px,7vw,88px)]">
          <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
            {/* Header */}
            <header className="pt-[clamp(48px,7vw,80px)]">
              <Link
                href="/demos"
                className="text-[14px] transition-colors hover:text-[color:var(--rk-ink)]"
                style={{ color: "var(--rk-sec)" }}
              >
                ← All demos
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <span
                  className="inline-flex rounded-full px-[9px] py-[3px] text-[11px]"
                  style={{
                    background: demo.prototype ? "var(--rk-ink)" : "var(--rk-paper)",
                    color: demo.prototype ? "var(--rk-paper)" : "var(--rk-sec)",
                    border: demo.prototype ? undefined : "1px solid var(--rk-hair)",
                  }}
                >
                  {demo.prototype ? "Interactive prototype" : "Video walkthrough"}
                </span>
                <span className="text-[13px]" style={{ color: "var(--rk-ter)" }}>
                  {demo.domain}
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
                    Giao diện tiếng Việt
                  </span>
                ) : null}
              </div>

              <h1 className="rk-head mt-3">{demo.title}</h1>
              <p className="rk-intro mt-3 max-w-[56ch]">{demo.tagline}</p>
              <p className="mt-4 max-w-[64ch] text-[17px]" style={{ color: "var(--rk-sec)" }}>
                {demo.summary}
              </p>
            </header>

            {/* Interactive prototype */}
            {demo.prototype ? (
              <section className="mt-[clamp(36px,5vw,56px)]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-[15px] font-semibold" style={{ color: "var(--rk-ink)" }}>
                    Live prototype
                  </h2>
                  <a
                    href={demo.prototype}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] transition-transform hover:translate-x-0.5"
                    style={{ color: "var(--rk-accent)" }}
                  >
                    Open full screen ↗
                  </a>
                </div>
                <div
                  className="overflow-hidden rounded-[16px]"
                  style={{ border: "1px solid var(--rk-hair)" }}
                >
                  <iframe
                    src={demo.prototype}
                    title={`${demo.title} interactive prototype`}
                    loading="lazy"
                    className="block h-[78vh] max-h-[820px] min-h-[560px] w-full"
                    style={{ border: "none", background: "#fff" }}
                  />
                </div>
                <p className="mt-2 text-[13px]" style={{ color: "var(--rk-ter)" }}>
                  Best viewed on a desktop screen. Uses illustrative, fictional data —
                  not a live system.
                </p>
              </section>
            ) : null}

            {/* Architecture note (video-only demos) */}
            {demo.architecture ? (
              <section className="mt-[clamp(36px,5vw,56px)]">
                <h2 className="mb-3 text-[15px] font-semibold" style={{ color: "var(--rk-ink)" }}>
                  How it works
                </h2>
                <div className="rk-card p-7">
                  <p className="text-[16px]" style={{ color: "var(--rk-sec)" }}>
                    {demo.architecture}
                  </p>
                </div>
              </section>
            ) : null}

            {/* Loom walkthrough */}
            <section className="mt-[clamp(36px,5vw,56px)]">
              <h2 className="mb-3 text-[15px] font-semibold" style={{ color: "var(--rk-ink)" }}>
                {demo.prototype ? "Watch the walkthrough" : "Walkthrough"}
              </h2>
              <div
                className="relative w-full overflow-hidden rounded-[16px]"
                style={{ paddingTop: "56.25%", border: "1px solid var(--rk-hair)" }}
              >
                <iframe
                  src={`https://www.loom.com/embed/${demo.loomId}`}
                  title={`${demo.title} walkthrough`}
                  loading="lazy"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  style={{ border: "none" }}
                />
              </div>
            </section>

            {/* Highlights */}
            <section className="mt-[clamp(36px,5vw,56px)]">
              <h2 className="mb-4 text-[15px] font-semibold" style={{ color: "var(--rk-ink)" }}>
                What it does
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {demo.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 rounded-[12px] p-4 text-[15px]"
                    style={{ background: "var(--rk-alt)", color: "var(--rk-sec)" }}
                  >
                    <span style={{ color: "var(--rk-accent)" }}>—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>

        <SiteFooter />
      </div>
    </BookCallProvider>
  );
}
