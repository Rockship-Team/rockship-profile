"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Facebook, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppLink } from "./WhatsAppLink";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/rockship.co/", icon: Facebook, label: "Facebook" },
  { href: "https://www.linkedin.com/company/rockship", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/RockshipCo", icon: Twitter, label: "X (Twitter)" },
] as const;

const COMPANY_LINKS = [
  { href: "#company", label: "About Us", isAnchor: true },
  { href: "#case-studies", label: "Case Studies", isAnchor: true },
  { href: "/contact", label: "Contact", isAnchor: false },
] as const;

const LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Policy" },
] as const;

export const Footer = () => {
  const { handleAnchorClick } = useSmoothScroll();

  return (
    <footer className="bg-rockship-950 pt-20 pb-10 border-t border-white/5 text-gray-400 text-sm">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        {/* Brand & Contact */}
        <div className="col-span-2">
          <div className="text-2xl font-display font-bold text-white mb-4">
            <Image
              src="/rockship.svg"
              alt="Rockship"
              width={150}
              height={150}
              loading="lazy"
            />
          </div>
          <p className="max-w-xs mb-6">
            Enterprise AI systems, built for real-world operations.
          </p>
          <div className="flex flex-col gap-3 mb-6">
            <a
              href="mailto:info@rockship.co"
              className="flex items-center gap-2 link-hover"
              aria-label="Email us at info@rockship.co"
            >
              <Mail size={18} aria-hidden="true" />
              <span>info@rockship.co</span>
            </a>
            <WhatsAppLink />
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                className="link-hover"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${label} page`}
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="lg:ml-12">
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            {COMPANY_LINKS.map(({ href, label, isAnchor }) => (
              <li key={label}>
                {isAnchor ? (
                  <a href={href} onClick={handleAnchorClick} className="link-hover">
                    {label}
                  </a>
                ) : (
                  <Link href={href} className="link-hover">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-6 border-t border-white/5 pt-8 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          &copy; {new Date().getFullYear()} Rockship AI. All rights reserved.
        </div>
        <div className="col-span-2 flex md:flex-col md:flex-row gap-6 lg:gap-[13%] lg:ml-12">
          {LEGAL_LINKS.map(({ href, label }) => (
            <a key={label} href={href} className="link-hover">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
