import type { Metadata } from "next";
import Link from "next/link";
import { BookCallProvider } from "@/components/home/BookCall";
import Nav from "@/components/home/Nav";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found",
  // The old rockship.co URLs are still in Google's index. Whatever lands here
  // is a dead link, so keep it out of the index rather than ranking it.
  robots: { index: false, follow: true },
};

/** Where someone arriving on a dead URL most likely wanted to go. */
const ROUTES = [
  { href: "/", label: "Home", note: "What we do and who we do it for" },
  { href: "/blog", label: "Blog", note: "Writing on AI, engineering and delivery" },
  { href: "/case-studies", label: "Case studies", note: "Products we shipped, with outcomes" },
  { href: "/demos", label: "Demos", note: "Working prototypes you can click through" },
  { href: "/events", label: "Events", note: "Where you can meet the team" },
  { href: "/contact", label: "Contact", note: "Start a conversation" },
];

export default function NotFound() {
  return (
    <BookCallProvider>
      <div className="rk">
        <Nav />

        <main>
          <header className="pt-[clamp(64px,9vw,104px)] pb-[clamp(32px,4vw,48px)] text-center">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
              <div className="text-[13px]" style={{ color: "var(--rk-ter)" }}>
                404
              </div>
              <h1 className="rk-hero mx-auto mt-2 max-w-[18ch]">
                That page isn&apos;t here.
              </h1>
              <p className="rk-intro mx-auto mt-3 max-w-[48ch]">
                We rebuilt the site and some older links didn&apos;t survive the move.
                Here&apos;s everything that&apos;s on it now.
              </p>
            </div>
          </header>

          <section className="pb-[clamp(56px,7vw,88px)]">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(22px,5vw,60px)]">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                {ROUTES.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="rk-card group flex h-full flex-col p-7"
                  >
                    <h2 className="rk-item group-hover:underline group-hover:underline-offset-[5px]">
                      {route.label}
                    </h2>
                    <p className="mt-2 text-[15px]" style={{ color: "var(--rk-sec)" }}>
                      {route.note}
                    </p>
                    <span
                      className="mt-auto pt-6 text-[15px] transition-transform group-hover:translate-x-1"
                      style={{ color: "var(--rk-accent)" }}
                    >
                      Go →
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
