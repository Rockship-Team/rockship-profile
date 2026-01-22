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
              className="link-hover"
              target="_blank"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/rockship"
              className="link-hover"
              target="_blank"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div>
          {/* <h4 className="font-bold text-white mb-4">Solutions</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="link-hover">
                Generative AI
              </a>
            </li>
            <li>
              <a href="#" className="link-hover">
                AI Agents & Workflow Intelligence
              </a>
            </li>
            <li>
              <a href="#" className="link-hover">
                Computer Vision & Document AI
              </a>
            </li>
          </ul> */}
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#about"
                className="link-hover"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#case-studies"
                className="link-hover"
              >
                Case Studies
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="link-hover"
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
          <a href="#" className="link-hover">
            Privacy Policy
          </a>
          <a href="#" className="link-hover">
            Terms of Service
          </a>
          <a href="#" className="link-hover">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
