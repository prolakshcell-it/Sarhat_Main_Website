"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, ChevronDown, FolderKanban, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Dynamic related words that rotate continuously in logo
  const rotatingWords = ["SOLAR", "INFRA", "BESS", "AGRI", "LEISURE"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Word rotator interval (changes every 2.2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const topNavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Careers", href: "/careers" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans-ui">
      {/* Top Sub-Bar (Solid Black Utility Header) */}
      <div className="bg-black text-slate-200 py-1.5 select-none">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 text-[10px] sm:text-[11px] tracking-wider uppercase flex justify-between items-center">
          <div className="flex items-center gap-2 uppercase tracking-[0.18em] text-slate-200 font-semibold text-[10px] sm:text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#D4E012] inline-block animate-pulse shadow-[0_0_8px_#D4E012]"></span>
            <span>अक्षय ऊर्जा • सुदृढ़ आधारभूत संरचना</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-200">
            <Link href="/careers" className="hover:text-[#D4E012] transition-colors uppercase">
              CAREERS
            </Link>
            <Link href="/contact" className="hover:text-[#D4E012] transition-colors uppercase">
              CONTACT
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Completely Transparent Header Container) */}
      <div
        className={`w-full transition-all duration-300 ${scrolled
          ? "bg-black/90 py-3 shadow-2xl backdrop-blur-xl border-b border-neutral-900/40"
          : "bg-transparent py-3.5"
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-3 items-center">
          {/* Brand Logo with Dynamic Rotating Words (Left Aligned) */}
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center group shrink-0 select-none">
              <div className="text-xl sm:text-2xl font-black tracking-tighter text-white flex items-center leading-none">
                <Image
                  src="/images/logo.png"
                  alt="SARHAT"
                  width={260}
                  height={88}
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                  priority
                />
                <span className="w-2 h-2 rounded-full bg-[#D4E012] inline-block mx-1.5 shrink-0 self-center translate-y-1 sm:translate-y-2 group-hover:scale-125 transition-transform shadow-[0_0_10px_#D4E012]"></span>

                {/* Continuous Animated Vertical Text Ticker for Logo Words */}
                <div className="h-5 overflow-hidden inline-flex items-center ml-0.5 min-w-[50px] sm:min-w-[65px] relative translate-y-1 sm:translate-y-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ y: 12, opacity: 0, filter: "blur(3px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -12, opacity: 0, filter: "blur(3px)" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-[#D4E012]"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Center Aligned) */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 text-[11px] sm:text-[12px] uppercase font-bold tracking-widest text-slate-100">
            {/* 1. SOLUTIONS */}
            <Link
              href="/solutions"
              className="relative py-1 hover:text-[#D4E012] transition-colors duration-200 group whitespace-nowrap"
            >
              SOLUTIONS
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4E012] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* 2. PROJECTS (Dropdown: Portfolio & Footprints) */}
            <div
              className="relative py-1 group cursor-pointer"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <Link
                href="/projects"
                className="flex items-center gap-1.5 hover:text-[#D4E012] transition-colors duration-200 whitespace-nowrap"
              >
                <span>PROJECTS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${projectsDropdownOpen ? "rotate-180 text-[#D4E012]" : ""}`} />
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4E012] transition-all duration-300 group-hover:w-full"></span>

              {/* Projects Dropdown Panel */}
              <AnimatePresence>
                {projectsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-black border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    <Link
                      href="/projects"
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#D4E012]/15 hover:text-[#D4E012] transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover/item:border-[#D4E012]/50 group-hover/item:bg-[#D4E012]/20">
                        <FolderKanban className="w-4 h-4 text-slate-300 group-hover/item:text-[#D4E012]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white group-hover/item:text-[#D4E012]">
                          PORTFOLIO
                        </div>
                        <div className="text-[9px] text-slate-400 font-light normal-case">
                          National project portfolio & work
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/projects#footprint"
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#D4E012]/15 hover:text-[#D4E012] transition-all group/item mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover/item:border-[#D4E012]/50 group-hover/item:bg-[#D4E012]/20">
                        <MapPin className="w-4 h-4 text-slate-300 group-hover/item:text-[#D4E012]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white group-hover/item:text-[#D4E012]">
                          FOOTPRINTS
                        </div>
                        <div className="text-[9px] text-slate-400 font-light normal-case">
                          Pan-India map & regional hubs
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. INTELLIGENCE */}
            <Link
              href="/#intelligence"
              className="relative py-1 hover:text-[#D4E012] transition-colors duration-200 group whitespace-nowrap"
            >
              INTELLIGENCE
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4E012] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* 4. PARTNERS */}
            <Link
              href="/#partners"
              className="relative py-1 hover:text-[#D4E012] transition-colors duration-200 group whitespace-nowrap"
            >
              PARTNERS
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4E012] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* 5. INSIGHTS */}
            <Link
              href="/insights"
              className="relative py-1 hover:text-[#D4E012] transition-colors duration-200 group whitespace-nowrap"
            >
              INSIGHTS
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4E012] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* 6. ABOUT */}
            <Link
              href="/about"
              className="relative py-1 hover:text-[#D4E012] transition-colors duration-200 group whitespace-nowrap"
            >
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4E012] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* CTA Button & Mobile Menu Toggle (Right Aligned) */}
          <div className="flex items-center justify-end gap-4 shrink-0">
            <button
              onClick={onOpenQuote}
              className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-[#D4E012]/30 transform hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap"
            >
              DISCUSS A PROJECT
            </button>

            {/* Mobile / Tablet Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden text-zinc-200 hover:text-white p-2 rounded-lg bg-zinc-900/90 border border-white/15 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#5EE72D]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 px-6 py-8 overflow-hidden"
          >
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="text-[10px] tracking-widest text-[#5EE72D] uppercase font-bold flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping"></span>
                SARHAT EPC NAVIGATION
              </div>

              {/* Mobile Solutions */}
              <Link
                href="/solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#5EE72D] transition-colors py-2 border-b border-zinc-900 flex justify-between items-center"
              >
                <span>SOLUTIONS</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </Link>

              {/* Mobile Projects Accordion */}
              <div className="border-b border-zinc-900 py-2">
                <button
                  onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                  className="w-full text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#5EE72D] transition-colors flex justify-between items-center"
                >
                  <span>PROJECTS</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${mobileProjectsOpen ? "rotate-180 text-[#5EE72D]" : ""}`} />
                </button>
                {mobileProjectsOpen && (
                  <div className="pl-4 pt-3 flex flex-col gap-2.5">
                    <Link
                      href="/#execution"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#5EE72D] flex items-center gap-2"
                    >
                      <FolderKanban className="w-4 h-4 text-[#5EE72D]" />
                      <span>PORTFOLIO</span>
                    </Link>
                    <Link
                      href="/#footprint"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#5EE72D] flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-[#5EE72D]" />
                      <span>FOOTPRINTS</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Intelligence */}
              <Link
                href="/#intelligence"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#5EE72D] transition-colors py-2 border-b border-zinc-900 flex justify-between items-center"
              >
                <span>INTELLIGENCE</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </Link>

              {/* Mobile Partners */}
              <Link
                href="/#partners"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#5EE72D] transition-colors py-2 border-b border-zinc-900 flex justify-between items-center"
              >
                <span>PARTNERS</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </Link>

              {/* Mobile Insights */}
              <Link
                href="/insights"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#5EE72D] transition-colors py-2 border-b border-zinc-900 flex justify-between items-center"
              >
                <span>INSIGHTS</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </Link>

              {/* Mobile About */}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#5EE72D] transition-colors py-2 border-b border-zinc-900 flex justify-between items-center"
              >
                <span>ABOUT</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </Link>

              <div className="pt-2 flex flex-col gap-3 border-t border-white/10 mt-2">
                {topNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full bg-[#5EE72D] text-black font-extrabold py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#5EE72D]/30"
                >
                  DISCUSS A PROJECT
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


