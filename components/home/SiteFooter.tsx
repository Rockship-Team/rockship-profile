import Link from "next/link";
import { CONTACT } from "@/lib/home-content";
import Logo from "./Logo";

const COLUMNS = [
  {
    heading: "Services",
    links: [
      { label: "Team augmentation", href: "/#services" },
      { label: "Dedicated teams", href: "/#services" },
      { label: "AI delivery sprints", href: "/#services" },
      { label: "How we select", href: "/#selection" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Why Rockship", href: "/#why" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Team", href: "/#team" },
      { label: "Events", href: "/events" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="pb-10">
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 px-[clamp(22px,5vw,60px)] pt-11 pb-7 max-[700px]:grid-cols-2">
        <div>
          <Logo height={18} />
          <p className="mt-3 max-w-[26ch] text-[13px]" style={{ color: "var(--rk-ter)" }}>
            Senior engineering teams for companies building internationally.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading}>
            <h2 className="text-[12px] font-semibold">{column.heading}</h2>
            <ul className="mt-3 flex list-none flex-col gap-[9px] p-0">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] hover:underline"
                    style={{ color: "var(--rk-sec)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-[12px] font-semibold">Contact</h2>
          <ul className="mt-3 flex list-none flex-col gap-[9px] p-0">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[12px] hover:underline"
                style={{ color: "var(--rk-sec)" }}
              >
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                className="text-[12px] hover:underline"
                style={{ color: "var(--rk-sec)" }}
              >
                {CONTACT.phoneLabel}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.linkedin}
                className="text-[12px] hover:underline"
                style={{ color: "var(--rk-sec)" }}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="mx-auto flex w-full max-w-[1120px] flex-wrap gap-3.5 px-[clamp(22px,5vw,60px)] pt-5 text-[12px]"
        style={{ borderTop: "1px solid var(--rk-hair)", color: "var(--rk-ter)" }}
      >
        <span>© {new Date().getFullYear()} Rockship</span>
        <span>{CONTACT.city}</span>
      </div>
    </footer>
  );
}
