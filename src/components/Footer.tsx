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
    <footer className="bg-[#050905] text-white border-t border-slate-800 pt-16 pb-12 relative z-10 font-sans-ui overflow-hidden">
      {/* Bespoke Renewable Infrastructure Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer-bg.jpg"
          alt="Sarhat Renewable Energy Infrastructure Twilight"
          fill
          quality={95}
          className="object-cover object-center opacity-75 transform scale-105 transition-opacity duration-700"
        />
        {/* Balanced Gradient Overlays: Makes image clearly visible while keeping text 100% crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050905]/85 via-[#050905]/65 to-[#050905]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050905]/80 via-transparent to-[#050905]/80"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[350px] bg-[#6DAD45]/20 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#D4E012]/15 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800">
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
                      className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-[#D4E012]"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-sm leading-relaxed">
              Renewable energy generation, battery storage (BESS), substations, and civil infrastructure delivered under one connected execution mindset.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#6DAD45] font-mono font-bold">
              <ShieldCheck className="w-4.5 h-4.5 text-[#6DAD45]" />
              <span>ISO 9001:2015 &amp; OHSAS 45001 CERTIFIED</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4">
              OUR SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/solutions#renewable-energy" className="hover:text-[#D4E012] transition-colors">
                  Renewable Energy
                </Link>
              </li>
              <li>
                <Link href="/solutions#bess-storage" className="hover:text-[#D4E012] transition-colors">
                  BESS &amp; Storage
                </Link>
              </li>
              <li>
                <Link href="/solutions#energy-infrastructure" className="hover:text-[#D4E012] transition-colors">
                  Energy Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/solutions#civil-infrastructure" className="hover:text-[#D4E012] transition-colors">
                  Civil Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Method & Footprint Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/solutions" className="hover:text-[#D4E012] transition-colors">
                  Solutions Capabilities
                </Link>
              </li>
              <li>
                <a href="#execution" className="hover:text-[#D4E012] transition-colors">
                  Portfolio (Execution Curve)
                </a>
              </li>
              <li>
                <a href="#footprint" className="hover:text-[#D4E012] transition-colors">
                  Footprints (Pan-India)
                </a>
              </li>
              <li>
                <a href="#intelligence" className="hover:text-[#D4E012] transition-colors">
                  Project Intelligence
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-[#D4E012] transition-colors">
                  Strategic Partners
                </a>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#D4E012] transition-colors">
                  EPC Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4E012] transition-colors">
                  About Sarhat
                </Link>
              </li>
            </ul>
          </div>

          {/* Insights Newsletter Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4">
              EPC INSIGHTS
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mb-3">
              Subscribe to regulatory DISCOM updates and renewable energy market intelligence.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="engineering@company.com"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4E012] font-medium"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4E012] to-[#6DAD45] text-black font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-lg hover:brightness-110 transition-all shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono font-semibold">
          {/* Left: Copyright */}
          <div className="whitespace-nowrap">
            © {new Date().getFullYear()} SARHAT EPC PVT. LTD. ALL RIGHTS RESERVED.
          </div>

          {/* Middle: Powered by Prolaksh */}
          <div className="text-[11px] tracking-widest text-slate-400 uppercase font-mono font-bold">
            POWERED BY <span className="text-white font-extrabold">PROLAKSH</span>
          </div>

          {/* Right: Policy Links & Back To Top */}
          <div className="flex items-center gap-6 whitespace-nowrap">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TERMS OF SERVICE
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D4E012] font-bold hover:text-white transition-colors"
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
