import { Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-rockship-950 pt-20 pb-10 border-t border-white/5 text-gray-400 text-sm">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2">
          <div className="text-2xl font-display font-bold text-white mb-4">
            <Image
              src="/rockship.svg"
              alt="Rockship"
              width={150}
              height={150}
            />
            {/* <span className="text-white lowercase font-medium tracking-tighter">
              rockship
            </span> */}
            {/* <span className="gradient-text">AI</span> */}
          </div>
          <p className="max-w-xs mb-6">
            Enterprise AI systems, built for real-world operations.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/rockship.co/"
              className="hover:text-rockship-accent transition"
              target="_blank"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/rockship"
              className="hover:text-rockship-accent transition"
              target="_blank"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Solutions</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                Generative AI
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                AI Agents & Workflow Intelligence
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                Computer Vision & Document AI
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#about"
                className="hover:text-rockship-accent transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#case-studies"
                className="hover:text-rockship-accent transition"
              >
                Case Studies
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-rockship-accent transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-white/5 pt-8 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          &copy; 2025 Rockship AI. All rights reserved.
        </div>
        <div className="col-span-2 flex md:flex-col md:flex-row gap-6 lg:gap-[13%]">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
