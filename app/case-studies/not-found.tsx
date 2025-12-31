import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function CaseStudyNotFound() {
  return (
    <div className="min-h-screen bg-rockship-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-rockship-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="text-center max-w-lg p-12 rounded-3xl bg-rockship-900/40 border border-white/5 backdrop-blur-2xl relative z-10 shadow-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-rockship-accent/20 to-transparent mb-8 border border-white/10 shadow-inner group">
          <FileQuestion className="w-12 h-12 text-rockship-accent transition-transform duration-500 group-hover:scale-110" />
        </div>

        <h1 className="text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
          Case Study Not Found
        </h1>

        <p className="text-rockship-300 mb-10 leading-relaxed text-lg">
          The case study you are looking for might have been moved, renamed, or
          is currently being updated by our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/case-studies">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-rockship-accent/30 text-rockship-accent hover:bg-rockship-accent/10 hover:text-white px-8 py-6 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>
          </Link>

          <Link href="/">
            <Button className="w-full sm:w-auto bg-rockship-accent hover:bg-rockship-accent/90 text-white px-8 py-6 rounded-xl shadow-lg shadow-rockship-accent/20 transition-all duration-300">
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
