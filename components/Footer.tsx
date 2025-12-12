import { Github, Linkedin, Twitter } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-rockship-950 pt-20 pb-10 border-t border-white/5 text-gray-400 text-sm">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2">
          <div className="text-2xl font-display font-bold text-white mb-4">
            <span className="text-white lowercase font-medium tracking-tighter">
              rockship
            </span>
            <span className="gradient-text">AI</span>
          </div>
          <p className="max-w-xs mb-6">
            Accelerating human potential through scalable, ethical, and secure
            AI infrastructure.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-rockship-accent transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-rockship-accent transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-rockship-accent transition">
              <Github size={20} />
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
                Computer Vision
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                Data Annotation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                Government & Defense
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                Research
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rockship-accent transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>&copy; 2024 RockshipAI Solutions. All rights reserved.</div>
        <div className="flex gap-6">
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
