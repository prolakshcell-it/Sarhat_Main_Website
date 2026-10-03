"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Sun, Battery, Zap, Building2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedPillBadge from "./AnimatedPillBadge";

export interface Capability {
  id: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  fullDetails: string;
  specs: string[];
  icon: any;
  image: string;
  accentColor: string;
}

export const capabilities: Capability[] = [
  {
    id: "renewable-energy",
    tag: "RENEWABLE ENERGY",
    title: "Renewable Energy",
    headline: "Solar Parks, Rooftop & Wind",
    description: "Solar Parks, Rooftop, C&I, Wind Farms & O&M",
    fullDetails: "Complete execution and engineering for solar parks, commercial & industrial rooftop installations, utility-scale wind farms, and long-term O&M management.",
    specs: ["Solar Parks", "Rooftop & C&I", "Comprehensive O&M", "Wind Farms"],
    icon: Sun,
    image: "/images/hero-solar.jpg",
    accentColor: "#5EE72D",
  },
  {
    id: "bess-storage",
    tag: "BESS & STORAGE",
    title: "BESS & Storage",
    headline: "Energy Storage Solutions",
    description: "Containerized BESS, Solar + Storage, Backup and Peak-load solutions.",
    fullDetails: "Utility-scale containerized Battery Energy Storage Systems (BESS), solar + storage integration, emergency backup power, and peak-load shaving.",
    specs: ["Containerized BESS", "Solar + Storage Hybrids", "Backup Power", "Peak-Load Shaving"],
    icon: Battery,
    image: "/images/bess-substation.jpg",
    accentColor: "#5EE72D",
  },
  {
    id: "energy-infrastructure",
    tag: "ENERGY INFRASTRUCTURE",
    title: "Energy Infrastructure",
    headline: "Substations & Grid Connectivity",
    description: "HT/LT systems, Substations, Evacuation lines, Grid connectivity.",
    fullDetails: "High-voltage and low-voltage electrical systems, AIS/GIS substations, power evacuation line corridors, relay protection, and seamless DISCOM grid connectivity.",
    specs: ["HT/LT Systems", "Substations (GIS/AIS)", "Evacuation Lines", "Protection & SCADA", "Grid Connectivity"],
    icon: Zap,
    image: "/images/substation-project.jpg",
    accentColor: "#5EE72D",
  },
  {
    id: "civil-infrastructure",
    tag: "CIVIL INFRASTRUCTURE",
    title: "Civil Infrastructure",
    headline: "Industrial Civil & Works",
    description: "Roads, Buildings, Foundations, Industrial civil works, Project Infrastructure.",
    fullDetails: "Heavy-payload access roads, control room buildings, structural equipment foundations, industrial civil works, and comprehensive project site infrastructure.",
    specs: ["Access Roads", "Buildings & Control Rooms", "Equipment Foundations", "Industrial Civil Works", "Project Infrastructure"],
    icon: Building2,
    image: "/images/agrivoltaics-project.jpg",
    accentColor: "#5EE72D",
  },
];

export default function SolutionsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalCapability, setModalCapability] = useState<Capability | null>(null);

  return (
    <section id="solutions" className="py-10 sm:py-12 lg:py-14 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 select-none overflow-hidden font-sans-ui">
      {/* Full Viewport Width Outer Container - Touching Left & Right Edges */}
      <div className="w-full max-w-none px-0">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12 px-4 sm:px-6 lg:px-8">
            <AnimatedPillBadge className="mb-6">
              SOLUTIONS CAPABILITIES
            </AnimatedPillBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
              <span className="inline-block xl:whitespace-nowrap">Built on Solar. Growing into infrastructure.</span> <br />
              <span className="text-[#6DAD45] italic relative inline-block xl:whitespace-nowrap">
                One connected way to build.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
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
            <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              From renewable generation and storage to grid and civil infrastructure, our solutions are designed to work together.
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* FULL-WIDTH SLANTED PARALLELOGRAM INTERACTIVE IMAGE ACCORDION */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={50} delay={0.15}>
          {/* Top Edge-to-Edge Sarhat Brand Rule Line */}
          <div className="w-full h-1 bg-gradient-to-r from-[#6DAD45] via-[#D4E012] to-[#5EE72D] mb-4" />

          {/* Edge-to-Edge Slanted Gallery */}
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 h-auto lg:h-[550px] w-full px-1 sm:px-2 lg:px-3 overflow-hidden py-1">
            {capabilities.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[0.22,1,0.36,1] border-2 border-white shadow-2xl ${
                    isActive
                      ? "lg:flex-[3.8] h-[460px] lg:h-full rounded-2xl z-20 shadow-slate-950/70"
                      : "lg:flex-[0.9] h-[110px] lg:h-full rounded-2xl border-white/90 hover:border-[#D4E012] bg-slate-950 z-10"
                  } lg:-skew-x-[6deg] group`}
                >
                  {/* Un-skew Inner Wrapper so text and photos remain 100% straight */}
                  <div className="relative h-full w-full lg:skew-x-[6deg] lg:scale-110">
                    {/* Cover Background Image — 100% Bright, Crisp & Clear (Zero Grayscale/Fade) */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover object-center transition-all duration-700 ease-out brightness-105 contrast-105 ${
                        isActive ? "scale-100 opacity-100" : "scale-100 opacity-90 hover:opacity-100"
                      }`}
                    />

                    {/* Soft Gradient Overlay at Bottom only (leaving top/middle image 100% clear & bright) */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        isActive
                          ? "bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"
                          : "bg-slate-950/40 hover:bg-slate-950/20"
                      }`}
                    />

                    {/* ACTIVE EXPANDED CARD CONTENT */}
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end z-20"
                      >
                        <div className="flex items-start gap-4">
                          {/* Vertical Sarhat Volt Accent Bar */}
                          <div className="w-1.5 h-24 bg-gradient-to-b from-[#D4E012] via-[#6DAD45] to-[#5EE72D] rounded-full shrink-0 mt-1 shadow-[0_0_15px_#D4E012]" />

                          <div className="max-w-xl">
                            {/* Top Sarhat Lime Pill Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#6DAD45]/30 border border-[#6DAD45]/70 backdrop-blur-md text-[#D4E012] font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow-lg">
                              <span className="w-2 h-2 rounded-full animate-ping bg-[#D4E012]" />
                              {item.tag}
                            </div>

                            {/* Headline */}
                            <h3 className="text-2xl sm:text-4xl font-serif-display font-medium text-white mb-2 leading-tight drop-shadow-lg">
                              {item.headline}
                            </h3>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed mb-6 max-w-lg drop-shadow-md">
                              {item.description}
                            </p>

                            {/* Sarhat Brand CTA Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalCapability(item);
                              }}
                              className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-[11px] uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-xl shadow-[#D4E012]/30 flex items-center gap-2 group cursor-pointer"
                            >
                              <span>DISCOVER MORE</span>
                              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* COLLAPSED NARROW STRIP VIEW */
                      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center z-20">
                        {/* Centered Multi-Line Uppercase Title with Backdrop Pill */}
                        <div className="bg-slate-950/70 backdrop-blur-xs px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white tracking-widest uppercase leading-snug text-center max-w-[140px] shadow-lg border border-white/20 group-hover:border-[#D4E012]">
                          {item.tag}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Section Bottom CTA Button */}
        <ScrollReveal direction="up" distance={30} delay={0.2}>
          <div className="mt-14 text-center px-4">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
            >
              <span>Explore All Solutions</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

      </div>

      {/* Full Specs Modal Handoff Drawer */}
      <AnimatePresence>
        {modalCapability && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalCapability(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700/80 rounded-3xl p-8 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none"></div>

              <button
                onClick={() => setModalCapability(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 border border-slate-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono uppercase tracking-widest block mb-2 font-bold text-[#D4E012]">
                {modalCapability.tag}
              </span>
              <h3 className="text-3xl font-serif-display font-medium text-white mb-4">
                {modalCapability.title}
              </h3>
              <p className="text-slate-300 font-light text-base leading-relaxed mb-6">
                {modalCapability.fullDetails}
              </p>

              <div className="border-t border-slate-700/80 pt-6">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  CORE SPECIFICATIONS & CAPABILITIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modalCapability.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 text-white text-xs font-mono rounded-lg flex items-center gap-1.5"
                    >
                      <span className="text-[#D4E012]">✓</span> {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/80 flex justify-end">
                <button
                  onClick={() => setModalCapability(null)}
                  className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#D4E012]/20"
                >
                  REQUEST {modalCapability.title.toUpperCase()} PROPOSAL
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
