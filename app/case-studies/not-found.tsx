import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function CaseStudyNotFound() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#FF4D00]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-transparent rounded-full blur-[120px]" />

      <div className="text-center max-w-lg p-12 rounded-3xl bg-[#F5F5F7] border border-black/[0.06] backdrop-blur-2xl relative z-10 shadow-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FF4D00]/20 to-transparent mb-8 border border-black/10 shadow-inner group">
          <FileQuestion className="w-12 h-12 text-[#FF4D00] transition-transform duration-500 group-hover:scale-110" />
        </div>

        <h1 className="text-4xl font-semibold mb-4 tracking-[-0.02em] text-[#1D1D1F]">
          Case Study Not Found
        </h1>

        <p className="text-[#6E6E73] mb-10 leading-relaxed text-lg">
          The case study you are looking for might have been moved, renamed, or
          is currently being updated by our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/case-studies">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-[#FF4D00]/30 text-[#FF4D00] hover:bg-[#FF4D00]/10 hover:text-[#1D1D1F] px-8 py-6 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>
          </Link>

          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-[#1D1D1F] px-8 py-6 rounded-xl shadow-lg shadow-[#FF4D00]/20 transition-all duration-300">
              Return Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(2,4,10,1)_100%)]" />
      </div>
    </div>
  );
}
