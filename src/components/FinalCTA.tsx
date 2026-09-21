"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Zap, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

interface FinalCTAProps {
  onOpenQuote: () => void;
}

export default function FinalCTA({ onOpenQuote }: FinalCTAProps) {
  return (
    <section id="contact" className="py-24 bg-black relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B1209] via-[#050A04] to-black rounded-3xl p-8 sm:p-14 border border-[#6DAD45]/40 relative overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                BE A PROJECT PARTNER // GET IN TOUCH
              </div>

              <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6">
                Have a project <br />
                <span className="text-[#6DAD45] italic">worth building?</span>
              </h2>

              <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed mb-8">
                Solar. BESS Storage. Substations. Agrivoltaics. Roads. Bridges. Buildings. Tell us where you want to build and let&apos;s map the execution path together.
              </p>

              {/* Direct Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#6DAD45]" />
                  <span>projects@sarhatepc.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6DAD45]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#6DAD45]" />
                  <span>Noida / New Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <button
                onClick={onOpenQuote}
                className="bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-[#5EE72D]/30 flex items-center justify-center gap-3 group"
              >
                <span>Discuss a Project</span>
                <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="#solutions"
                className="glass-panel hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest px-8 py-5 rounded-full transition-all border border-white/20 text-center flex items-center justify-center gap-2"
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
