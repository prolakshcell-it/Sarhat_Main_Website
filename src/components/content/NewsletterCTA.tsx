"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface NewsletterCTAProps {
  onOpenQuote?: () => void;
  title?: string;
  subtitle?: string;
}

export default function NewsletterCTA({
  onOpenQuote,
  title = "Stay Ahead of Clean Energy Trends",
  subtitle = "Subscribe to Sarhat's Energy Digest for monthly technical briefings on utility solar, BESS economics, regulatory updates, and execution benchmarks.",
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid work email address");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you for subscribing to Sarhat Energy Insights!");
    setEmail("");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 text-white p-8 sm:p-12 shadow-2xl my-12">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5EE72D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4E012] text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Technical Intelligence
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-display font-medium tracking-tight text-white">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="w-full lg:w-auto min-w-[320px] sm:min-w-[400px]">
          {submitted ? (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#6DAD45]/15 border border-[#6DAD45]/30 text-white text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#5EE72D] shrink-0" />
              <span>You are subscribed! We deliver concise, high-value technical intelligence straight to your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4E012] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#6DAD45] hover:bg-[#5da037] text-white font-medium text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {onOpenQuote && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Looking to discuss an upcoming project?</span>
              <button
                type="button"
                onClick={onOpenQuote}
                className="text-[#D4E012] hover:underline font-mono font-medium flex items-center gap-1"
              >
                Consult Our Engineers &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

