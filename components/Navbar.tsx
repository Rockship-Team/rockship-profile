import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Solutions", href: "#platform" },
    { label: "How It Works", href: "#solutions" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Why Us", href: "#why-us" },
    { label: "About", href: "#company" },
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
          href="#home"
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
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/contact"
            className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-sm font-bold transition"
          >
            Start an AI Pilot
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-rockship-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-lg text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/contact"
            className="w-full block text-center py-3 bg-rockship-accent text-rockship-900 font-bold rounded-lg mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start an AI Pilot
          </Link>
        </div>
      )}
    </nav>
  );
};
