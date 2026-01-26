"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { handleAnchorClick } = useSmoothScroll();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    // Add passive option for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Solutions", href: "#platform" },
    { label: "How It Works", href: "#solutions" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Why Us", href: "#why-us" },
    { label: "About", href: "#company" },
    { label: "Blog", href: "/blog", isExternal: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-rockship-900/90 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="/"
          className="text-2xl font-display font-bold text-white tracking-tight"
        >
          <Image src="/rockship.svg" alt="Rockship" width={150} height={150} />
          {/* <span className="text-white lowercase font-medium tracking-tighter">
            rockship
          </span> */}
          {/* <span className="gradient-text">AI</span> */}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            return "isExternal" in link && link.isExternal ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 link-hover"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={handleAnchorClick}
                className="text-sm font-medium text-gray-300 link-hover"
              >
                {link.label}
              </a>
            );
          })}
          <Link
            href="/contact"
            className="animated-border-btn group relative inline-flex items-center justify-center rounded-full transition-all duration-500"
          >
            <span className="px-5 py-2 text-white text-sm font-bold flex items-center justify-center">
              Start an AI Pilot
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="md:hidden absolute top-full left-0 right-0 bg-rockship-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link, index) => {
              return "isExternal" in link && link.isExternal ? (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-lg text-gray-300 link-hover block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="text-lg text-gray-300 link-hover"
                  onClick={(e) => {
                    handleAnchorClick(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </motion.a>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.2 }}
            >
              <Link
                href="/contact"
                className="w-full block text-center py-3 bg-rockship-accent text-rockship-900 font-bold rounded-lg mt-2 btn-hover"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start an AI Pilot
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
