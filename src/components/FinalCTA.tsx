"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Zap, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

interface FinalCTAProps {
  onOpenQuote: () => void;
}

export default function FinalCTA({ onOpenQuote }: FinalCTAProps) {
  return (
    <section id="contact" className="py-24 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="text-xs font-mono font-bold text-[#D4E012] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4E012] animate-ping shadow-[0_0_8px_#D4E012]"></span>
                BE A PROJECT PARTNER // GET IN TOUCH
              </div>

              <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6">
                Have a project <br />
                <span className="text-[#D4E012] italic">worth building?</span>
              </h2>

              <p className="text-slate-300 font-normal text-base sm:text-lg leading-relaxed mb-8">
                Solar. BESS Storage. Substations. Agrivoltaics. Roads. Bridges. Buildings. Tell us where you want to build and let&apos;s map the execution path together.
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
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <button
                onClick={onOpenQuote}
                className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-[#D4E012]/30 flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Discuss a Project</span>
                <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="#solutions"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-widest px-8 py-5 rounded-full transition-all border border-slate-700 text-center flex items-center justify-center gap-2 shadow-md"
              >
                <span>Explore Capabilities</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
