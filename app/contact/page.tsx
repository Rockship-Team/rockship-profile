"use client";

import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  return (
    <div className="min-h-screen bg-rockship-950 text-white pt-24 pb-12 bg-grid-pattern relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rockship-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Start Your <span className="gradient-text">AI Pilot</span>
          </h1>
          <p className="text-xl text-gray-400">
            Tell us about your challenges and we'll design a custom AI solution
            that delivers real ROI within weeks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Value Prop & Info */}
          <div className="space-y-8">
            <div className="bg-rockship-900/60 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] p-8 rounded-2xl border-white/10">
              <h3 className="text-2xl font-bold mb-6">Why Partner With Us?</h3>
              <ul className="space-y-4">
                {[
                  "Rapid prototyping and deployment",
                  "Enterprise-grade security & compliance",
                  "Deep expertise in GenAI & LLMs",
                  "Scalable architecture for growth",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-rockship-accent flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 text-gray-300">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-rockship-accent group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
                    Email Us
                  </p>
                  <p className="text-lg font-medium group-hover:text-rockship-accent transition-colors">
                    hans.dang@rockship.co
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-rockship-accent group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
                    Headquarters
                  </p>
                  <p className="text-lg font-medium group-hover:text-rockship-accent transition-colors">
                    Ho Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-rockship-900/60 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] p-8 rounded-2xl border-white/10 glow">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-8">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rockship-accent focus:ring-1 focus:ring-rockship-accent focus-visible:ring-2 focus-visible:ring-rockship-accent transition"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rockship-accent focus:ring-1 focus:ring-rockship-accent focus-visible:ring-2 focus-visible:ring-rockship-accent transition"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    spellCheck="false"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rockship-accent focus:ring-1 focus:ring-rockship-accent focus-visible:ring-2 focus-visible:ring-rockship-accent transition"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rockship-accent focus:ring-1 focus:ring-rockship-accent focus-visible:ring-2 focus-visible:ring-rockship-accent transition resize-none"
                    placeholder="Tell us about your goals and technical requirements..."
                  ></textarea>
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-rockship-accent hover:bg-rockship-accent/90 text-white font-bold rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-lg shadow-lg shadow-rockship-accent/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Start Conversation
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
