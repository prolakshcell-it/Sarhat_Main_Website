"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sun, Battery, Sprout, Zap, Route, Building2, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export interface Capability {
  id: string;
  tag: string;
  title: string;
  description: string;
  fullDetails: string;
  specs: string[];
  icon: any;
  accentColor: string;
}

export const capabilities: Capability[] = [
  {
    id: "renewable-energy",
    tag: "01 / RENEWABLE ENERGY",
    title: "Renewable Energy",
    description: "Solar Parks, Rooftop, C&I, O&M, Wind Farms",
    fullDetails: "Complete execution and engineering for solar parks, commercial & industrial rooftop installations, utility-scale wind farms, and long-term O&M management.",
    specs: ["Solar Parks", "Rooftop & C&I", "Comprehensive O&M", "Wind Farms"],
    icon: Sun,
    accentColor: "#5EE72D",
  },
  {
    id: "grid-substations",
    tag: "02 / GRID & SUBSTATIONS",
    title: "Grid & Substations",
    description: "HT/LT systems, Substations, Evacuation lines, Protection, Grid connectivity.",
    fullDetails: "High-voltage and low-voltage electrical systems, AIS/GIS substations, power evacuation line corridors, relay protection, and seamless DISCOM grid connectivity.",
    specs: ["HT/LT Systems", "Substations (GIS/AIS)", "Evacuation Lines", "Protection & SCADA", "Grid Connectivity"],
    icon: Zap,
    accentColor: "#5EE72D",
  },
  {
    id: "civil-infrastructure",
    tag: "03 / CIVIL INFRASTRUCTURE",
    title: "Civil Infrastructure",
    description: "Roads, Buildings, Foundations, Industrial civil works, Project Infrastructure.",
    fullDetails: "Heavy-payload access roads, control room buildings, structural equipment foundations, industrial civil works, and comprehensive project site infrastructure.",
    specs: ["Access Roads", "Buildings & Control Rooms", "Equipment Foundations", "Industrial Civil Works", "Project Infrastructure"],
    icon: Building2,
    accentColor: "#5EE72D",
  },
  {
    id: "agrivoltaics",
    tag: "04 / AGRIVOLTAICS",
    title: "Agrivoltaics",
    description: "Solar with agriculture, Land optimization, Farmer-linked models.",
    fullDetails: "Dual-use land solutions integrating solar power generation with active farming, optimizing land revenue density and implementing farmer-linked PM-KUSUM models.",
    specs: ["Solar with Agriculture", "Land Optimization", "Farmer-Linked PM-KUSUM Models"],
    icon: Sprout,
    accentColor: "#5EE72D",
  },
  {
    id: "bess",
    tag: "05 / BESS",
    title: "BESS",
    description: "BESS, Solar + Storage, Backup and Peak-load solutions.",
    fullDetails: "Utility-scale containerized Battery Energy Storage Systems (BESS), solar + storage integration, emergency backup power, and peak-load shaving.",
    specs: ["Containerized BESS", "Solar + Storage Hybrids", "Backup Power", "Peak-Load Shaving"],
    icon: Battery,
    accentColor: "#5EE72D",
  },
  {
    id: "project-delivery",
    tag: "06 / PROJECT DELIVERY",
    title: "Project Delivery",
    description: "EPC, PMC, EPCM, Turnkey",
    fullDetails: "Full-scope turnkey EPC execution, Project Management Consultancy (PMC), EPCM contracting, and owner engineering services.",
    specs: ["Turnkey EPC", "PMC Consultancy", "EPCM Contracting", "Full Lifecycle Delivery"],
    icon: Route,
    accentColor: "#5EE72D",
  },
];

export default function SolutionsGrid() {
  const [modalCapability, setModalCapability] = useState<Capability | null>(null);

  return (
    <section id="solutions" className="py-24 sm:py-28 bg-[#050705] relative z-10 border-b border-white/10 select-none overflow-hidden font-sans-ui">
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
                Click any capability to inspect execution details.
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* 6 CAPABILITIES CARDS GRID (Exact UI matching reference images) */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={50} delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => setModalCapability(item)}
                  className="group relative rounded-[28px] bg-[#0A0E0A] border border-white/10 hover:border-[#5EE72D]/50 p-8 sm:p-9 flex flex-col justify-between min-h-[290px] cursor-pointer overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#5EE72D]/10"
                >
                  {/* Subtle Radial Green Glow in Bottom Right on Hover */}
                  <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-[#5EE72D]/5 rounded-full blur-2xl group-hover:bg-[#5EE72D]/20 transition-all duration-500 pointer-events-none" />

                  <div>
                    {/* Top Tag */}
                    <div className="text-[11px] font-mono tracking-widest text-[#5EE72D] uppercase mb-8 font-semibold">
                      {item.tag}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-3 group-hover:text-[#5EE72D] transition-colors leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Bar with Arrow & Icon */}
                  <div className="pt-8 flex items-center justify-between z-10 relative">
                    <ArrowUpRight className="w-5 h-5 text-[#5EE72D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <IconComp className="w-5 h-5 text-zinc-600 group-hover:text-[#5EE72D] transition-colors" />
                  </div>
                </motion.div>
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
              className="bg-[#0D110D] border border-white/20 rounded-3xl p-8 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#5EE72D]/15 rounded-full blur-3xl pointer-events-none"></div>

              <button
                onClick={() => setModalCapability(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono uppercase tracking-widest block mb-2 font-bold text-[#5EE72D]">
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
                  CORE DELIVERABLES & SERVICES
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
