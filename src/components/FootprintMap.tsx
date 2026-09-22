"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  Building2,
  Compass,
  X,
} from "lucide-react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface StateInfo {
  name: string;
  code: string;
  mwInstalled: string;
  activeProjects: number;
  highlightVertical: string;
  discom: string;
  description: string;
  targetPos: { top: string; left: string };
  deliverables: string[];
}

export default function FootprintMap() {
  const stateData: StateInfo[] = [
    {
      name: "Uttar Pradesh",
      code: "UP",
      mwInstalled: "32.7 MW",
      activeProjects: 13,
      highlightVertical: "Solar EPC & 132kV Substation",
      discom: "UPPCL / UPNEDA",
      description: "Core operating footprint for utility solar EPC, DISCOM substations, and Purvanchal feeder solarization.",
      targetPos: { top: "36.5%", left: "45.0%" },
      deliverables: ["132kV Substation Bay", "Solar Park Stringing", "UPNEDA Grid Clearances"],
    },
    {
      name: "Rajasthan",
      code: "RJ",
      mwInstalled: "16.0 MW",
      activeProjects: 6,
      highlightVertical: "Utility Solar & BESS Storage",
      discom: "RRECL / JVVNL",
      description: "High-irradiance solar parks and containerized BESS storage arrays in Thar desert corridor.",
      targetPos: { top: "37.5%", left: "21.0%" },
      deliverables: ["High-Irradiance Arrays", "Containerized BESS", "Open Access PPA"],
    },
    {
      name: "Gujarat",
      code: "GJ",
      mwInstalled: "12.5 MW",
      activeProjects: 5,
      highlightVertical: "Coastal Substation & C&I Open Access",
      discom: "GETCO / DGVCL",
      description: "Coastal anti-corrosion solar mounting structures and GETCO industrial grid evacuation.",
      targetPos: { top: "46.0%", left: "13.5%" },
      deliverables: ["GETCO Bay Clearance", "C5-M Structural Coating", "C&I Group Captive PPA"],
    },
    {
      name: "Madhya Pradesh",
      code: "MP",
      mwInstalled: "12.4 MW",
      activeProjects: 5,
      highlightVertical: "Agrivoltaics & Grid Evacuation",
      discom: "MPMKVVCL / MPPMCL",
      description: "Central India utility solar installations and substation corridors.",
      targetPos: { top: "48.0%", left: "35.0%" },
      deliverables: ["Substation Corridor", "PM-KUSUM Feeder", "Ground Mount Solar"],
    },
    {
      name: "Bihar / Sikkim Corridor",
      code: "BR-SKM",
      mwInstalled: "8.5 MW",
      activeProjects: 4,
      highlightVertical: "PM-KUSUM & Civil Infrastructure",
      discom: "NBPDCL / BREDA",
      description: "Feeder solarization and mountain access civil engineering.",
      targetPos: { top: "41.0%", left: "60.5%" },
      deliverables: ["Feeder Solarization", "Access Infrastructure", "BREDA Approvals"],
    },
    {
      name: "Arunachal / NE Grid",
      code: "NE-GRID",
      mwInstalled: "6.2 MW",
      activeProjects: 3,
      highlightVertical: "Frontier Solar & Substation",
      discom: "APDCL / APEDA",
      description: "Specialized terrain civil engineering and power evacuation.",
      targetPos: { top: "36.0%", left: "81.0%" },
      deliverables: ["Terrain MMS Foundations", "Substation Evacuation", "APEDA Clearances"],
    },
  ];

  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);

  return (
    <section
      id="footprint"
      className="py-24 sm:py-28 bg-slate-950 relative z-10 border-b border-slate-900 select-none overflow-hidden font-sans-ui"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-[#D4E012] text-[11px] font-bold text-[#D4E012] uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4E012] animate-ping"></span>
              PAN-INDIA OPERATIONAL FOOTPRINT
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium tracking-tight text-white leading-tight mb-4">
              Built across India. <br />
              <span className="text-[#D4E012] italic font-serif-display font-medium">
                Core Operating Footprint.
              </span>
            </h2>

            <p className="text-slate-300 font-normal text-base sm:text-lg leading-relaxed">
              Explore Sarhat's active solar EPC projects, DISCOM substation corridors, and renewable infrastructure across key operating states.
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* QUICK STATE SELECTION BAR */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={30} delay={0.1}>
          <div className="max-w-4xl mx-auto mb-8 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 px-2">
                <Compass className="w-4 h-4 text-[#D4E012]" /> SELECT REGIONAL FOOTPRINT:
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {stateData.map((st) => {
                  const isSelected = selectedState?.code === st.code;
                  return (
                    <button
                      key={st.code}
                      onClick={() => setSelectedState(isSelected ? null : st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 border ${isSelected
                          ? "bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black border-[#D4E012] shadow-md"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-[#D4E012] hover:text-white"
                        }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-[#D4E012]"}`} />
                      <span>{st.code}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? "bg-black/20 text-black font-extrabold" : "bg-slate-700 text-[#D4E012] font-bold"}`}>
                        {st.mwInstalled}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* HIGH-RES VECTOR INDIA MAP CANVAS WITH ACCURATE LOCATION DOTS */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={45} delay={0.15}>
          <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
            {/* Map Header Status Indicator */}
            <div className="w-full flex items-center justify-between mb-4 px-3">
              <span className="text-[11px] font-mono text-[#5EE72D] uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#5EE72D]" /> PAN-INDIA OPERATIONAL LOCATIONS
              </span>
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping" />
                CLICK ANY LOCATION POINT TO VIEW DETAILS
              </span>
            </div>

            {/* Main India Vector Map Canvas Container */}
            <div
              className="relative w-full aspect-[896/1200] flex items-center justify-center rounded-3xl overflow-hidden bg-slate-950"
              onClick={() => setSelectedState(null)}
            >
              {/* Isolated Vector Image of India */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/india-map-vector.jpg"
                  alt="Interactive Vector Map of India - SARHAT EPC"
                  fill
                  priority
                  className="object-contain object-center filter contrast-110 brightness-105"
                />

                {/* ------------------------------------------------------- */}
                {/* 6 ACCURATE MINI CLICKABLE LOCATION DOTS */}
                {/* ------------------------------------------------------- */}
                {stateData.map((st) => {
                  const isSelected = selectedState?.code === st.code;

                  const topVal = parseInt(st.targetPos.top);
                  const leftVal = parseInt(st.targetPos.left);

                  const isTopHalf = topVal < 45;
                  const isRightHalf = leftVal > 55;

                  return (
                    <div
                      key={st.code}
                      style={{ top: st.targetPos.top, left: st.targetPos.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${isSelected ? "z-[100]" : "z-20"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedState(isSelected ? null : st);
                      }}
                    >
                      {/* Pulse Glow Ring */}
                      <span
                        className={`absolute -inset-2 rounded-full transition-all duration-300 pointer-events-none ${isSelected
                            ? "bg-[#5EE72D]/60 animate-ping border border-[#5EE72D]"
                            : "bg-[#5EE72D]/30"
                          }`}
                      ></span>

                      {/* Small Minimal Location Dot Marker */}
                      <motion.button
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.85 }}
                        className={`relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black flex items-center justify-center transition-all duration-300 shadow-md ${isSelected
                            ? "bg-[#5EE72D] ring-4 ring-[#5EE72D]/50 scale-125"
                            : "bg-[#5EE72D]"
                          }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      </motion.button>

                      {/* --------------------------------------------------- */}
                      {/* CLICK-ONLY TOOLTIP MODAL CARD */}
                      {/* --------------------------------------------------- */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.85,
                              y: isTopHalf ? 8 : -8,
                              filter: "blur(4px)",
                            }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{
                              opacity: 0,
                              scale: 0.85,
                              y: isTopHalf ? 8 : -8,
                              filter: "blur(4px)",
                            }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute z-[110] w-64 sm:w-72 p-4 bg-zinc-950/95 border border-[#5EE72D] rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-left pointer-events-auto ${isTopHalf ? "top-full mt-4" : "bottom-full mb-4"
                              } ${isRightHalf ? "right-0 translate-x-4" : "left-1/2 -translate-x-1/2"}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Speech Bubble Arrow Pointer */}
                            <div
                              className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent ${isTopHalf
                                  ? "bottom-full border-b-8 border-b-[#5EE72D]"
                                  : "top-full border-t-8 border-t-[#5EE72D]"
                                }`}
                            ></div>

                            {/* Tooltip Header with Close Button */}
                            <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/15">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="p-1 rounded-md bg-[#5EE72D]/10 border border-[#5EE72D]/30 shrink-0">
                                  <MapPin className="w-4 h-4 text-[#5EE72D]" />
                                </div>
                                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider truncate">
                                  {st.name}
                                </h4>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedState(null);
                                }}
                                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Capacity Badge */}
                            <div className="mb-2.5 flex items-center justify-between">
                              <span className="text-[10px] font-mono text-zinc-400">TOTAL CAPACITY:</span>
                              <span className="px-2 py-0.5 bg-[#5EE72D] text-black text-[10px] font-mono font-extrabold rounded-md shadow-sm">
                                {st.mwInstalled}
                              </span>
                            </div>

                            {/* Info Stats */}
                            <div className="space-y-1.5 text-[11px] mb-3">
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-mono">ACTIVE SITES:</span>
                                <span className="text-white font-mono font-bold flex items-center gap-1">
                                  <Building2 className="w-3.5 h-3.5 text-[#5EE72D]" />
                                  {st.activeProjects} Facilities
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-mono">DISCOM / UTILITY:</span>
                                <span className="text-[#5EE72D] font-mono font-semibold">
                                  {st.discom}
                                </span>
                              </div>
                            </div>

                            {/* Core Focus */}
                            <p className="text-[11px] text-zinc-300 font-light leading-snug mb-3 pt-2 border-t border-white/10">
                              <span className="text-[#5EE72D] font-medium">Core EPC Focus: </span>
                              {st.highlightVertical}
                            </p>

                            {/* Key Deliverables */}
                            <div className="space-y-1 pt-2 border-t border-white/10">
                              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                                Key Infrastructure Delivered:
                              </div>
                              {st.deliverables.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-1.5 text-[10px] text-zinc-200 font-mono"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5EE72D] shrink-0" />
                                  <span className="truncate">{item}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* ------------------------------------------------------- */}
                {/* FLOATING TOTAL MW STAT BADGE */}
                {/* ------------------------------------------------------- */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-4 right-2 sm:bottom-8 sm:right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-zinc-950/90 text-white border-2 border-[#5EE72D] shadow-[0_10px_35px_rgba(94,231,45,0.3)] backdrop-blur-md flex flex-col items-center justify-center text-center p-2 z-30 pointer-events-none select-none"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#5EE72D] font-mono leading-none">
                    75+
                  </span>
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-white font-mono leading-none mb-1">
                    MW
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-400 leading-tight">
                    Clean Power Evacuated
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}