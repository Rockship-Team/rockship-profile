import HomePage from "@/components/pages/HomePage";
import { Metadata } from "next";

// ISR: Tái tạo page mỗi 60 giây
export const revalidate = 60;

// Force static generation for better caching
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Rockship | Enterprise AI Systems",
  description:
    "We consult, design, and deploy production-ready AI automation that streamlines operations and delivers measurable business impact.",
};

export default function Page() {
  return <HomePage />;
}
