"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackContactCtaClick } from "@/lib/analytics";

/**
 * A link into the contact flow that reports where it was clicked from.
 *
 * Exists as its own client component so the pages holding these CTAs — the
 * case study layouts — can stay server components. Converting those to client
 * components just to attach an onClick would ship their whole subtree to the
 * browser for the sake of one analytics call.
 */
export default function ContactCtaLink({
  location,
  children,
  className,
  href = "/contact",
}: {
  /** Where this CTA lives, e.g. "case_study_conclusion". Becomes cta_location. */
  location: string;
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackContactCtaClick(location)}
    >
      {children}
    </Link>
  );
}
