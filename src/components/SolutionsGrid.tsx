"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sun, Battery, Sprout, Zap, Route, Building2, X } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

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
    image: "/images/bess-substation.jpg",
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
    image: "/images/india-map-tactical.jpg",
    accentColor: "#5EE72D",
  },
];

export default function SolutionsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalCapability, setModalCapability] = useState<Capability | null>(null);

  return (
    <section id="solutions" className="py-24 sm:py-28 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 select-none overflow-hidden font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-xs font-mono font-extrabold tracking-widest text-[#707B00] uppercase mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8A9600] animate-ping"></span>
                SOLUTIONS CAPABILITIES
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                Four Core capabilities. <br />
                <span className="text-[#6DAD45] italic font-serif-display font-medium">One connected way to build.</span>
              </h2>
            </div>
            <p className="text-slate-600 font-normal text-base max-w-md leading-relaxed">
              From renewable generation and storage to grid and civil infrastructure, our solutions are designed to work together.{" "}
              <span className="text-[#707B00] font-semibold">
                Hover any card to expand its capability view.
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* EXPANDING HORIZONTAL IMAGE ACCORDION GALLERY */}
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
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-800 ease-[0.22,1,0.36,1] border ${isActive
                    ? "lg:flex-[3.5] h-[400px] lg:h-full border-slate-400 shadow-2xl shadow-slate-300/60"
                    : "lg:flex-[0.8] h-[90px] lg:h-full border-slate-200/90 hover:border-[#D4E012] bg-white"
                    }`}
                >
                  {/* Cover Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-all duration-1000 ease-[0.22,1,0.36,1] ${isActive ? "scale-100 opacity-90" : "scale-110 opacity-30 grayscale group-hover:grayscale-0"
                      }`}
                  />

                  {/* Gradient Dark Overlays */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-800 ${isActive
                      ? "bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"
                      : "bg-slate-950/70 hover:bg-slate-950/40"
                      }`}
                  ></div>

                  {/* ACTIVE EXPANDED CARD CONTENT */}
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-20"
                    >
                      {/* Top Bar inside Active Card */}
                      <div className="flex items-center justify-between">
                        <span className="px-3.5 py-1 bg-slate-900/80 border border-white/20 text-white font-mono text-[10px] sm:text-[11px] font-bold rounded-full backdrop-blur-md uppercase tracking-wider flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full animate-ping bg-[#D4E012]"
                          ></span>
                          {item.tag}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalCapability(item);
                          }}
                          className="p-3 rounded-full bg-white/10 hover:bg-[#D4E012] text-white hover:text-black border border-white/20 transition-colors backdrop-blur-md group"
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
                            className="w-2.5 h-2.5 rounded-full bg-[#D4E012] shadow-[0_0_10px_#D4E012]"
                          ></span>
                          <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-widest">
                            {item.title}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-serif-display font-medium text-white mb-3 leading-tight drop-shadow-md">
                          {item.headline}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed mb-4 max-w-lg drop-shadow-sm">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalCapability(item);
                            }}
                            className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#D4E012]/20 flex items-center gap-2"
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
                      <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/15 flex items-center justify-center text-[#D4E012] backdrop-blur-md">
                        <IconComp className="w-5 h-5 text-[#D4E012]" />
                      </div>

                      {/* Rotated Vertical Title for Desktop Accordion Strip */}
                      <div className="hidden lg:block [writing-mode:vertical-lr] rotate-180 text-xs font-bold text-slate-200 uppercase tracking-widest whitespace-nowrap">
                        {item.title}
                      </div>

                      {/* Horizontal Title for Mobile Accordion Strip */}
                      <div className="lg:hidden text-xs font-bold text-slate-200 uppercase tracking-wider">
                        {item.title}
                      </div>

                      {/* Bottom Number */}
                      <span className="text-[10px] font-mono font-bold text-slate-400">
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
