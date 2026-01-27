"use client";

import { Phone } from "lucide-react";

export function WhatsAppLink() {
  const handleClick = () => {
    const start = Date.now();
    setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.open("https://wa.me/84865791311", "_blank");
      }
    }, 500);
  };

  return (
    <a
      href="whatsapp://send?phone=84865791311"
      onClick={handleClick}
      className="flex items-center gap-2 link-hover"
      aria-label="Contact us on WhatsApp at +84 865791311"
    >
      <Phone size={18} aria-hidden="true" />
      <span>+84 865791311</span>
    </a>
  );
}
