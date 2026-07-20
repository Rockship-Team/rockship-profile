import type { Metadata } from "next";
import { BookCallProvider } from "@/components/home/BookCall";
import Career from "@/components/home/Career";
import CaseStudies from "@/components/home/CaseStudies";
import Faq from "@/components/home/Faq";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import Nav from "@/components/home/Nav";
import Selection from "@/components/home/Selection";
import Services from "@/components/home/Services";
import SiteFooter from "@/components/home/SiteFooter";
import Team from "@/components/home/Team";
import WhyRockship from "@/components/home/WhyRockship";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Rockship — Senior Engineering Teams for Companies Building Internationally",
  description:
    "Rockship places senior product engineers with teams in the US, Europe, Singapore and Japan. Team augmentation and dedicated product teams, from architecture to production.",
};

export default function Page() {
  return (
    <BookCallProvider>
      <div className="rk">
        <Nav />
        <main>
          <Hero />
          <Services />
          <WhyRockship />
          <Selection />
          <CaseStudies />
          <Career />
          <Team />
          <Faq />
          <FinalCTA />
        </main>
        <SiteFooter />
      </div>
    </BookCallProvider>
  );
}
