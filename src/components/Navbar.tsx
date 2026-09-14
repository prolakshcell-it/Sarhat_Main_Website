"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Dynamic related words that rotate continuously in logo
  const rotatingWords = ["EPC", "SOLAR", "BESS", "ENERGY", "INFRA", "STORAGE", "GRID"];

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
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Main navigation links (matching exact reference design)
  const mainNavLinks = [
    { label: "ABOUT US", href: "/about" },
    { label: "OUR SOLUTIONS", href: "/solutions" },
    { label: "PORTFOLIO", href: "/#execution" },
    { label: "PROJECT INTELLIGENCE", href: "/#intelligence" },
    { label: "NEWS & INSIGHTS", href: "/insights" },
  ];

  // Utility top links
  const topNavLinks = [
    { label: "CAREERS", href: "/careers" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-sans-ui">
      {/* Top Sub-Bar (Utility Header matching reference image) */}
      <div className="bg-black/40 border-b border-white/10 text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-300 py-2 px-4 sm:px-8 lg:px-12 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Sub-Header Tagline */}
          <div className="flex items-center gap-2 uppercase tracking-[0.18em] text-zinc-300 font-medium text-[10px] sm:text-[11px]">
            <span>ENERGY + INFRASTRUCTURE / PAN-INDIA EXECUTION</span>
          </div>

          {/* Right Sub-Header Links (CAREERS / CONTACT) */}
          <div className="hidden sm:flex items-center gap-7 text-[11px] font-bold tracking-widest text-zinc-200">
            {topNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-200 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/75 backdrop-blur-2xl py-3.5 border-white/15 shadow-2xl shadow-black/80"
            : "bg-black/35 backdrop-blur-xl py-4 border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with Dynamic Rotating Words (SARHAT . EPC -> SOLAR -> BESS -> ENERGY -> INFRA) */}
          <Link href="/" className="flex items-center group shrink-0 select-none">
            <div className="text-xl sm:text-2xl font-black tracking-tighter text-white flex items-baseline leading-none">
              <span className="font-black text-white uppercase tracking-tighter text-2xl sm:text-3xl">SARHAT</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5EE72D] inline-block mx-1 shrink-0 self-baseline group-hover:scale-125 transition-transform shadow-[0_0_10px_#5EE72D]"></span>
              
              {/* Continuous Animated Vertical Text Ticker for Logo Words */}
              <div className="h-6 overflow-hidden inline-flex items-center ml-0.5 min-w-[60px] sm:min-w-[75px] relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-xs sm:text-sm font-black uppercase tracking-wider block ${
                      rotatingWords[wordIndex] === "EPC" ? "text-white" : "text-[#5EE72D]"
                    }`}
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] sm:text-[12px] uppercase font-bold tracking-widest text-zinc-200">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-[#5EE72D] transition-colors duration-200 group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#5EE72D] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenQuote}
              className="bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-[#5EE72D]/25 transform hover:scale-[1.03] active:scale-[0.98]"
            >
              GET A QUOTE
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

              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 hover:text-[#5EE72D] transition-colors py-2 border-b border-zinc-900 flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </Link>
              ))}

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
                  GET A QUOTE
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

