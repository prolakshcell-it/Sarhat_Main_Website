"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sun, Battery, Sprout, Zap, Route, Building2, X } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface Capability {
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

export default function SolutionsGrid() {
  const capabilities: Capability[] = [
    {
      id: "solar-wind",
      tag: "01 / RENEWABLE ENERGY",
      title: "Solar + Wind",
      headline: "Zero-Risk Solar & Wind",
      description:
        "Utility scale solar EPC, wind energy, hybrid systems and turnkey renewable power plants built with zero operational risk.",
      fullDetails:
        "Complete EPC execution for utility-scale solar parks, rooftop installations, and wind-solar hybrid projects. We manage land acquisition assistance, micro-siting, solar panel stringing, inverter stations, and full synchronization to state and national grids.",
      specs: ["Utility Scale & C&I", "Tracker Integration", "PPA & Open Access Support"],
      icon: Sun,
      image: "/images/hero-solar.jpg",
      accentColor: "#5EE72D",
    },
    {
      id: "bess",
      tag: "02 / ENERGY STORAGE",
      title: "BESS Storage",
      headline: "Flexible Storage Options",
      description:
        "Battery storage systems for renewable integration, peak shaving, and 24/7 grid resilience.",
      fullDetails:
        "Containerized utility-scale Battery Energy Storage Systems (BESS) designed for grid stability, peak load management, and frequency regulation. Integration with lithium iron phosphate (LFP) chemistry and advanced EMS software.",
      specs: ["Containerized Systems", "Peak Load Shaving", "Grid Frequency Regulation"],
      icon: Battery,
      image: "/images/bess-substation.jpg",
      accentColor: "#3B82F6",
    },
    {
      id: "agrivoltaics",
      tag: "03 / AGRIVOLTAICS",
      title: "Solar + Agriculture",
      headline: "Immediate Savings",
      description:
        "Dual-use land solutions combining high-yield agriculture and solar power generation (PM-KUSUM Component A & C).",
      fullDetails:
        "Elevated mounting structures and tailored solar panel pitch designed specifically for agricultural farming beneath arrays (PM-KUSUM Component A & C). Maximizes land revenue density while retaining agricultural productivity.",
      specs: ["PM-KUSUM Aligned", "Elevated Clearance", "Soil & Water Preservation"],
      icon: Sprout,
      image: "/images/hero-solar.jpg",
      accentColor: "#F59E0B",
    },
    {
      id: "substations",
      tag: "04 / GRID INFRASTRUCTURE",
      title: "Substations & Grid",
      headline: "High-Voltage Evacuation",
      description:
        "High-voltage substations up to 400kV, transmission lines, power evacuation, and electrical BOP.",
      fullDetails:
        "33kV, 132kV, 220kV, and 400kV substation design, procurement, testing, and commissioning. Turnkey transmission line corridor construction with SCADA automation and state utility approval handling.",
      specs: ["Up to 400kV GIS/AIS", "Transmission Corridors", "SCADA & Protection Systems"],
      icon: Zap,
      image: "/images/bess-substation.jpg",
      accentColor: "#06B6D4",
    },
    {
      id: "infrastructure",
      tag: "05 / CIVIL INFRASTRUCTURE",
      title: "Roads + Bridges",
      headline: "Civil Infrastructure",
      description:
        "Access roads, bridges, drainage networks, and civil works executed with heavy payload EPC discipline.",
      fullDetails:
        "Civil infrastructure required for remote energy project sites including heavy payload access roads, drainage culverts, bridges, boundary walls, and control room buildings built to withstand harsh weather.",
      specs: ["Heavy Load Access Roads", "Pre-cast Reinforced Bridges", "Site Grading & Drainage"],
      icon: Route,
      image: "/images/india-map-tactical.jpg",
      accentColor: "#F97316",
    },
    {
      id: "pmc-epcm",
      tag: "06 / PROJECT SERVICES",
      title: "PMC + EPCM",
      headline: "Turnkey Handoff",
      description:
        "Project management consultancy, EPCM contracts, owner engineering, and full-scope turnkey EPC execution.",
      fullDetails:
        "Full lifecycle project management consultancy, owner engineering services, procurement oversight, and complete turnkey contract execution with guaranteed performance ratios.",
      specs: ["Owner Engineering", "Quality Audit & Testing", "Performance Ratio Guarantees"],
      icon: Building2,
      image: "/images/hero-solar.jpg",
      accentColor: "#A855F7",
    },
  ];

  // Active expanded accordion card index (default to 0)
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalCapability, setModalCapability] = useState<Capability | null>(null);

  return (
    <section id="solutions" className="py-24 sm:py-28 bg-black relative z-10 border-b border-white/10 select-none overflow-hidden font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#5EE72D] uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping"></span>
                01 / CAPABILITIES
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
                Six capabilities. <br />
                <span className="text-[#5EE72D] italic font-serif-display font-medium">One connected way to build.</span>
              </h2>
            </div>
            <p className="text-zinc-300 font-light text-base max-w-md leading-relaxed">
              From renewable generation and storage to grid and civil infrastructure, our solutions are designed to work together.{" "}
              <span className="text-[#5EE72D] font-semibold">
                Hover any card to expand its capability view.
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* EXPANDING HORIZONTAL IMAGE ACCORDION GALLERY (Ultra-smooth hover expand) */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={50} delay={0.15}>
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 h-auto lg:h-[500px] w-full max-w-7xl mx-auto">
            {capabilities.map((item, index) => {
              const isActive = index === activeIndex;
              const IconComp = item.icon;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-800 ease-[0.22,1,0.36,1] border ${
                    isActive
                      ? "lg:flex-[3.5] h-[400px] lg:h-full border-white/35 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
                      : "lg:flex-[0.8] h-[90px] lg:h-full border-white/10 hover:border-white/30 hover:bg-zinc-900/40"
                  }`}
                >
                  {/* Cover Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-all duration-1000 ease-[0.22,1,0.36,1] ${
                      isActive ? "scale-100 opacity-85" : "scale-110 opacity-20 grayscale group-hover:grayscale-0"
                    }`}
                  />

                  {/* Gradient Dark Overlays */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-800 ${
                      isActive
                        ? "bg-gradient-to-t from-black via-black/40 to-transparent"
                        : "bg-black/70 hover:bg-black/40"
                    }`}
                  ></div>

                  {/* ACTIVE EXPANDED CARD CONTENT (Ultra-smooth blur fade entrance) */}
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-20"
                    >
                      {/* Top Bar inside Active Card */}
                      <div className="flex items-center justify-between">
                        <span className="px-3.5 py-1 bg-black/60 border border-white/20 text-white font-mono text-[10px] sm:text-[11px] font-bold rounded-full backdrop-blur-md uppercase tracking-wider flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full animate-ping"
                            style={{ backgroundColor: item.accentColor }}
                          ></span>
                          {item.tag}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalCapability(item);
                          }}
                          className="p-3 rounded-full bg-white/10 hover:bg-[#5EE72D] text-white hover:text-black border border-white/20 transition-colors backdrop-blur-md group"
                          aria-label="View Full Details"
                        >
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>

                      {/* Bottom Info inside Active Card */}
                      <div className="max-w-xl">
                        {/* Dot indicator matching reference images */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]"
                            style={{ color: item.accentColor, backgroundColor: item.accentColor }}
                          ></span>
                          <span className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-widest">
                            {item.title}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-serif-display font-medium text-white mb-3 leading-tight drop-shadow-md">
                          {item.headline}
                        </h3>

                        <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed mb-4 max-w-lg drop-shadow-sm">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalCapability(item);
                            }}
                            className="bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#5EE72D]/20 flex items-center gap-2"
                          >
                            <span>INSPECT SPECIFICATIONS</span>
                            <ArrowUpRight className="w-4 h-4 text-black" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* COLLAPSED CARD STRIP VIEW */
                    <div className="absolute inset-0 p-4 sm:p-6 flex lg:flex-col items-center justify-between z-20">
                      {/* Top Icon */}
                      <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center text-zinc-400 backdrop-blur-md">
                        <IconComp className="w-5 h-5" style={{ color: item.accentColor }} />
                      </div>

                      {/* Rotated Vertical Title for Desktop Accordion Strip */}
                      <div className="hidden lg:block [writing-mode:vertical-lr] rotate-180 text-xs font-bold text-zinc-300 uppercase tracking-widest whitespace-nowrap">
                        {item.title}
                      </div>

                      {/* Horizontal Title for Mobile Accordion Strip */}
                      <div className="lg:hidden text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        {item.title}
                      </div>

                      {/* Bottom Number */}
                      <span className="text-[10px] font-mono font-bold text-zinc-500">
                        0{index + 1}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalCapability(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0D0D0D] border border-white/20 rounded-3xl p-8 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#5EE72D]/15 rounded-full blur-3xl pointer-events-none"></div>

              <button
                onClick={() => setModalCapability(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span
                className="text-xs font-mono uppercase tracking-widest block mb-2 font-bold"
                style={{ color: modalCapability.accentColor }}
              >
                {modalCapability.tag}
              </span>
              <h3 className="text-3xl font-serif-display font-medium text-white mb-4">
                {modalCapability.title}
              </h3>
              <p className="text-zinc-300 font-light text-base leading-relaxed mb-6">
                {modalCapability.fullDetails}
              </p>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                  CORE SPECIFICATIONS & CAPABILITIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modalCapability.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3.5 py-1.5 bg-zinc-900 border border-white/20 text-white text-xs font-mono rounded-lg flex items-center gap-1.5"
                    >
                      <span className="text-[#5EE72D]">✓</span> {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setModalCapability(null)}
                  className="bg-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#4ed423] transition-colors flex items-center gap-2 shadow-lg shadow-[#5EE72D]/20"
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

