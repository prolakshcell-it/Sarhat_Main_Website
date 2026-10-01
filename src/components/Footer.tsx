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
    <footer className="bg-[#070C08] text-white border-t border-slate-800/80 pt-16 pb-10 relative z-10 font-sans-ui overflow-hidden">
      {/* Background Image with Clean Deep Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/footer-bg.jpg"
          alt="Sarhat Renewable Energy Infrastructure"
          fill
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070C08] via-[#070C08]/90 to-[#070C08]"></div>
      </div>

      {/* Subtle Glow Accents */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[#6DAD45]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[250px] bg-[#D4E012]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid - Balanced 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="flex items-center group shrink-0 select-none">
              <div className="font-sans-ui text-2xl font-black tracking-tighter text-white flex items-center leading-none">
                <Image
                  src="/images/logo.png"
                  alt="SARHAT"
                  width={280}
                  height={95}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <span className="w-2 h-2 rounded-full bg-[#6DAD45] inline-block mx-1.5 shrink-0 self-center translate-y-1 shadow-[0_0_10px_#6DAD45]"></span>
                <div className="h-5 overflow-hidden inline-flex items-center ml-0.5 min-w-[55px] relative translate-y-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs font-bold uppercase tracking-wider block text-[#D4E012]"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md">
              Engineering high-yield solar parks, utility-scale BESS storage, high-voltage substations, and resilient civil infrastructure across India.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#6DAD45] font-mono font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#6DAD45]" />
              <span>ISO 9001:2015 &amp; OHSAS 45001 CERTIFIED</span>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300"
              >
                <SocialLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300"
              >
                <SocialTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300"
              >
                <SocialInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300"
              >
                <SocialFacebook />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#D4E012] hover:border-[#D4E012] transition-all duration-300"
              >
                <SocialYoutube />
              </a>
            </div>
          </div>

          {/* Column 2: Our Solutions (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link href="/solutions#renewable-energy" className="hover:text-[#D4E012] transition-colors">
                  Solar &amp; Wind Energy
                </Link>
              </li>
              <li>
                <Link href="/solutions#bess-storage" className="hover:text-[#D4E012] transition-colors">
                  BESS &amp; Storage
                </Link>
              </li>
              <li>
                <Link href="/solutions#energy-infrastructure" className="hover:text-[#D4E012] transition-colors">
                  Substations &amp; Grid
                </Link>
              </li>
              <li>
                <Link href="/solutions#civil-infrastructure" className="hover:text-[#D4E012] transition-colors">
                  Civil Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
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
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#D4E012] transition-colors">
                  Careers &amp; Life
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#D4E012] transition-colors">
                  Insights &amp; News
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Ecosystem & Network (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              ECOSYSTEM &amp; NETWORK
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium mb-5">
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
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          {/* Policy Links */}
          <div className="flex items-center gap-4 whitespace-nowrap">
            <a href="#" className="hover:text-[#D4E012] transition-colors">
              PRIVACY POLICY
            </a>
            <span className="text-slate-800">•</span>
            <a href="#" className="hover:text-[#D4E012] transition-colors">
              TERMS OF SERVICE
            </a>
            <span className="text-slate-800">•</span>
            <a href="#" className="hover:text-[#D4E012] transition-colors">
              COOKIE POLICY
            </a>
          </div>

          {/* Powered by */}
          <div className="text-[11px] tracking-widest text-slate-400 uppercase font-mono font-bold">
            POWERED BY <span className="text-white font-extrabold">PROLAKSH</span>
          </div>

          {/* Copyright & Scroll Top */}
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span>© {new Date().getFullYear()} SARHAT EPC PVT. LTD. ALL RIGHTS RESERVED.</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-[#D4E012] hover:bg-[#D4E012] hover:text-black transition-all ml-1 shadow-md cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
