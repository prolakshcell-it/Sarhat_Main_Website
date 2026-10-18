"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

interface FinalCTAProps {
  onOpenQuote: () => void;
  headline?: string;
  accent?: string;
  description?: string;
  product?: string;
}

export default function FinalCTA({
  onOpenQuote,
  headline = "Have a project",
  accent = "worth building?",
  description = "Solar. BESS Storage. Substations. Agrivoltaics. Roads. Bridges. Buildings. Tell us where you want to build and let's map the execution path together.",
  product,
}: FinalCTAProps) {
  const enquiryHref = product
    ? `/contact?product=${encodeURIComponent(product)}#inquiry`
    : "/contact#inquiry";

  return (
    <section id="contact" className="py-10 sm:py-12 lg:py-14 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6">
                {headline} <br />
                <span className="text-[#D4E012] italic relative inline-block">
                  {accent}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#D4E012]"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 15 Q 50 0 100 15"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      fill="transparent"
                    />
                  </svg>
                </span>
              </h2>

              <p className="text-slate-300 font-normal text-base sm:text-lg leading-relaxed mb-8">
                {description}
              </p>

              {/* Direct Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D4E012]" />
                  <span>info@sarhatenergy.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4E012]" />
                  <span>+91 9266 7111 25</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4E012]" />
                  <span>Ghaziabad, U.P., India</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 sm:min-w-[240px]">
              <button
                onClick={onOpenQuote}
                className="w-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-[#D4E012]/30 flex items-center justify-center gap-2 group cursor-pointer whitespace-nowrap"
              >
                <span>LET&apos;S DISCUSS A PROJECT</span>
                <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
              </button>

              <Link
                href={enquiryHref}
                className="w-full bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-white font-mono font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all flex items-center justify-center cursor-pointer whitespace-nowrap hover:scale-102"
              >
                <span>OPEN ENQUIRY PAGE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
