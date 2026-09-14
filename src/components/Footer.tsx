"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [wordIndex, setWordIndex] = useState(0);
  const rotatingWords = ["SOLAR", "INFRA", "BESS", "AGRI", "LEISURE"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

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
            {/* Exact Logo: SARHAT [Green Dot] Rotating Words */}
            <Link href="/" className="flex items-center group shrink-0 select-none">
              <div className="font-sans-ui text-2xl font-black tracking-tighter text-white flex items-center leading-none">
                <Image
                  src="/images/logo.png"
                  alt="SARHAT"
                  width={280}
                  height={95}
                  className="h-12 sm:h-16 md:h-18 w-auto object-contain"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-[#6DAD45] inline-block mx-1.5 shrink-0 self-center translate-y-1 sm:translate-y-1.5 shadow-[0_0_10px_#6DAD45]"></span>

                {/* Continuous Animated Vertical Text Ticker for Logo Words */}
                <div className="h-5 overflow-hidden inline-flex items-center ml-0.5 min-w-[50px] sm:min-w-[65px] relative translate-y-1 sm:translate-y-1.5">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ y: 12, opacity: 0, filter: "blur(3px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -12, opacity: 0, filter: "blur(3px)" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-[#6DAD45]"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </Link>
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
