"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Social Media Icons (SVG)
const SocialLinkedin = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const SocialTwitter = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialInstagram = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const SocialFacebook = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const SocialYoutube = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-slate-800">
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

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div className="transition-transform group-hover:scale-110">
                  <SocialLinkedin />
                </div>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div className="transition-transform group-hover:scale-110">
                  <SocialTwitter />
                </div>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div className="transition-transform group-hover:scale-110">
                  <SocialInstagram />
                </div>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div className="transition-transform group-hover:scale-110">
                  <SocialFacebook />
                </div>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div className="transition-transform group-hover:scale-110">
                  <SocialYoutube />
                </div>
              </a>
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
                  Renewable Energy (Solar &amp; Wind)
                </Link>
              </li>
              <li>
                <Link href="/solutions#bess-storage" className="hover:text-[#D4E012] transition-colors">
                  BESS &amp; Battery Storage
                </Link>
              </li>
              <li>
                <Link href="/solutions#energy-infrastructure" className="hover:text-[#D4E012] transition-colors">
                  Substations &amp; Grid Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/solutions#civil-infrastructure" className="hover:text-[#D4E012] transition-colors">
                  Industrial Civil Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Website Navigation Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/" className="hover:text-[#D4E012] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#D4E012] transition-colors">
                  Solutions &amp; Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#D4E012] transition-colors">
                  Projects &amp; Footprints
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-[#D4E012] transition-colors">
                  Partnership Programs
                </Link>
              </li>
              <li>
                <Link href="/supply-partners" className="hover:text-[#D4E012] transition-colors">
                  Supply Partners &amp; OEMs
                </Link>
              </li>
              <li>
                <Link href="/execution-contractors" className="hover:text-[#D4E012] transition-colors">
                  Execution Contractors
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#D4E012] transition-colors">
                  Insights &amp; Market Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4E012] transition-colors">
                  About Sarhat
                </Link>
              </li>
              <li>
                <Link href="/about/our-story" className="hover:text-[#D4E012] transition-colors">
                  Our Story &amp; Milestones
                </Link>
              </li>
              <li>
                <Link href="/about/initiatives" className="hover:text-[#D4E012] transition-colors">
                  Key Sustainability Initiatives
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#D4E012] transition-colors">
                  Careers &amp; Life at Sarhat
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4E012] transition-colors">
                  Discuss a Project / Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Interchanged Left & Right + Added Cookie Policy */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono font-semibold">
          {/* Left: Policy Links (Privacy Policy, Terms of Service, Cookie Policy) */}
          <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap">
            <a href="#" className="hover:text-[#D4E012] transition-colors">
              PRIVACY POLICY
            </a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-[#D4E012] transition-colors">
              TERMS OF SERVICE
            </a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-[#D4E012] transition-colors">
              COOKIE POLICY
            </a>
          </div>

          {/* Middle: Powered by Prolaksh */}
          <div className="text-[11px] tracking-widest text-slate-400 uppercase font-mono font-bold">
            POWERED BY <span className="text-white font-extrabold">PROLAKSH</span>
          </div>

          {/* Right: Copyright & Back To Top */}
          <div className="flex items-center gap-4 whitespace-nowrap">
            <span>© {new Date().getFullYear()} SARHAT EPC PVT. LTD. ALL RIGHTS RESERVED.</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 text-[#D4E012] hover:bg-[#D4E012] hover:text-black transition-all duration-300 ml-1 shadow-md cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
