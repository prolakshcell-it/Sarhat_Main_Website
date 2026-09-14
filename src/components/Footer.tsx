"use client";

import { ArrowUp, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-16 pb-12 relative z-10 font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Exact Logo: SARHAT [Green Dot] EPC */}
            <div className="flex items-center group shrink-0 select-none">
              <div className="font-sans-ui text-2xl font-black tracking-tighter text-white flex items-baseline leading-none">
                <span className="font-black text-white uppercase tracking-tighter">SARHAT</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#6DAD45] inline-block mx-1 shrink-0 self-baseline shadow-[0_0_10px_#6DAD45]"></span>
                <span className="text-xs font-extrabold text-white uppercase tracking-wider ml-0.5 opacity-90">
                  EPC
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light max-w-sm leading-relaxed">
              Renewable energy generation, battery storage (BESS), substations, and civil infrastructure delivered under one connected execution mindset.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#6DAD45] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#6DAD45]" />
              <span>ISO 9001:2015 & OHSAS 45001 CERTIFIED</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              OUR SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#solutions" className="hover:text-[#6DAD45] transition-colors">
                  Solar + Wind EPC
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#6DAD45] transition-colors">
                  BESS Storage Systems
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#6DAD45] transition-colors">
                  Agrivoltaics (PM-KUSUM)
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#6DAD45] transition-colors">
                  High Voltage Substations
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#6DAD45] transition-colors">
                  Civil Roads & Bridges
                </a>
              </li>
            </ul>
          </div>

          {/* Method & Footprint Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              METHODOLOGY
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#execution" className="hover:text-[#6DAD45] transition-colors">
                  The Curve of Execution
                </a>
              </li>
              <li>
                <a href="#intelligence" className="hover:text-[#6DAD45] transition-colors">
                  Project Intelligence Tool
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#6DAD45] transition-colors">
                  One-Halt EPC Mindset
                </a>
              </li>
              <li>
                <a href="#footprint" className="hover:text-[#6DAD45] transition-colors">
                  Pan-India Footprint
                </a>
              </li>
              <li>
                <a href="#people" className="hover:text-[#6DAD45] transition-colors">
                  People & Culture
                </a>
              </li>
            </ul>
          </div>

          {/* Insights Newsletter Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              EPC INSIGHTS
            </h4>
            <p className="text-xs text-zinc-400 font-light mb-3">
              Subscribe to regulatory DISCOM updates and renewable energy market intelligence.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="engineering@company.com"
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#6DAD45]"
              />
              <button
                type="submit"
                className="w-full bg-[#6DAD45] text-black font-bold text-xs uppercase tracking-wider py-2 rounded-lg hover:bg-[#5b9538] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} SARHAT EPC PVT. LTD. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              TERMS OF SERVICE
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#6DAD45] hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
