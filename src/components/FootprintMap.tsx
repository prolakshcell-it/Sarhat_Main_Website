"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Activity, CheckCircle2 } from "lucide-react";
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
      name: "Uttar Pradesh (Central)",
      code: "UP-CTL",
      mwInstalled: "18.5 MW",
      activeProjects: 8,
      highlightVertical: "Solar EPC & 132kV Substation",
      discom: "UPPCL / UPNEDA",
      description: "Core operating footprint for utility solar EPC and DISCOM substations.",
      targetPos: { top: "37%", left: "47%" },
      deliverables: ["132kV Substation Bay", "Solar Park Stringing", "UPNEDA Clearances"],
    },
    {
      name: "Uttar Pradesh (North)",
      code: "UP-NTH",
      mwInstalled: "14.2 MW",
      activeProjects: 5,
      highlightVertical: "Grid Evacuation Substation",
      discom: "UPPCL Corridors",
      description: "High-voltage transmission corridor and grid integration hub.",
      targetPos: { top: "32%", left: "44%" },
      deliverables: ["High Voltage Bay", "Feeder Interconnect", "DISCOM Approval"],
    },
    {
      name: "Rajasthan (Jaipur)",
      code: "RJ",
      mwInstalled: "16.0 MW",
      activeProjects: 6,
      highlightVertical: "Utility Solar & BESS Storage",
      discom: "RRECL / JVVNL",
      description: "High-irradiance solar parks and containerized BESS storage arrays.",
      targetPos: { top: "37%", left: "26%" },
      deliverables: ["High-Irradiance Arrays", "Containerized BESS", "Open Access PPA"],
    },
    {
      name: "Madhya Pradesh (Bhopal)",
      code: "MP",
      mwInstalled: "12.4 MW",
      activeProjects: 5,
      highlightVertical: "Agrivoltaics & Grid Evacuation",
      discom: "MPMKVVCL / MPPMCL",
      description: "Central India utility solar installations and substation corridors.",
      targetPos: { top: "52%", left: "37%" },
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
      targetPos: { top: "36%", left: "67%" },
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
      targetPos: { top: "30%", left: "84%" },
      deliverables: ["Terrain MMS Foundations", "Substation Evacuation", "APEDA Clearances"],
    },
  ];

  // State hovered by mouse (null when mouse leaves)
  const [hoveredState, setHoveredState] = useState<StateInfo | null>(null);

  return (
    <section id="footprint" className="py-24 sm:py-28 bg-[#030908] relative z-10 border-b border-white/10 select-none overflow-hidden font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-[11px] font-bold text-[#5EE72D] uppercase tracking-widest mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping"></span>
              05 / PAN-INDIA FOOTPRINT
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium tracking-tight text-white leading-tight mb-4">
              Built across India. <br />
              <span className="text-[#5EE72D] italic font-serif-display font-medium">Growing with purpose.</span>
            </h2>

            <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
              Explore our active solar, storage, and infrastructure projects across key state corridors. Hover any state location on the map to inspect project details.
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* HIGH-RES VECTOR INDIA MAP CANVAS (CLEAN & ISOLATED) */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={45} delay={0.15}>
          <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Map Header Status Indicator */}
            <div className="w-full flex items-center justify-between mb-4 px-3">
              <span className="text-[11px] font-mono text-[#5EE72D] uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#5EE72D]" /> PAN-INDIA OPERATIONAL MAP
              </span>
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#5EE72D] animate-pulse" />
                HOVER MARKER FOR DETAILS
              </span>
            </div>

            {/* Main India Vector Map Canvas (Un-bordered Floating View) */}
            <div className="relative w-full aspect-[3/3.8] max-h-[720px] flex items-center justify-center">
              
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
                {/* 6 USER-SPECIFIED SMALL NEON GREEN DOT LOCATION MARKERS */}
                {/* ------------------------------------------------------- */}
                {stateData.map((st) => {
                  const isHovered = hoveredState?.code === st.code;
                  const topVal = parseInt(st.targetPos.top);
                  const leftVal = parseInt(st.targetPos.left);

                  const isTopHalf = topVal < 45;
                  const isRightHalf = leftVal > 55;

                  return (
                    <div
                      key={st.code}
                      style={{ top: st.targetPos.top, left: st.targetPos.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                        isHovered ? "z-[100]" : "z-20"
                      }`}
                      onMouseEnter={() => setHoveredState(st)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => setHoveredState(hoveredState?.code === st.code ? null : st)}
                    >
                      {/* Compact Outer Ripple Ring */}
                      <span
                        className={`absolute -inset-2 rounded-full transition-all duration-300 pointer-events-none ${
                          isHovered
                            ? "bg-[#5EE72D]/70 animate-ping border border-[#5EE72D]"
                            : "bg-[#5EE72D]/30 group-hover:scale-125"
                        }`}
                      ></span>

                      {/* Small Sleek Neon Green Location Dot Pointer */}
                      <motion.button
                        whileHover={{ scale: 1.4 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-black flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_#5EE72D] ${
                          isHovered
                            ? "bg-[#5EE72D] shadow-[0_0_25px_#5EE72D] scale-130"
                            : "bg-[#5EE72D]"
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-black"></span>
                      </motion.button>

                      {/* --------------------------------------------------- */}
                      {/* HOVER TOOLTIP SPEECH BUBBLE WITH POINTER ARROW */}
                      {/* --------------------------------------------------- */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: isTopHalf ? 8 : -8, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.85, y: isTopHalf ? 8 : -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute z-[110] w-60 sm:w-64 p-3.5 bg-black/95 border border-[#5EE72D] rounded-2xl backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.95)] text-left pointer-events-auto ${
                              isTopHalf ? "top-full mt-3" : "bottom-full mb-3"
                            } ${
                              isRightHalf ? "right-0 translate-x-3" : "left-1/2 -translate-x-1/2"
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Speech Bubble Arrow Pointer */}
                            <div
                              className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent ${
                                isTopHalf
                                  ? "bottom-full border-b-8 border-b-[#5EE72D]"
                                  : "top-full border-t-8 border-t-[#5EE72D]"
                              }`}
                            ></div>

                            {/* Header inside Tooltip */}
                            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/15">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-pulse shrink-0"></span>
                                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider truncate">
                                  {st.name} ({st.code})
                                </h4>
                              </div>
                              <span className="px-2 py-0.5 bg-[#5EE72D] text-black text-[10px] font-mono font-extrabold rounded-md shadow-sm shrink-0">
                                {st.mwInstalled}
                              </span>
                            </div>

                            {/* Info Stats */}
                            <div className="space-y-1 text-[11px] mb-2.5">
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-mono">PROJECTS:</span>
                                <span className="text-white font-mono font-bold">{st.activeProjects} Active Sites</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-mono">DISCOM:</span>
                                <span className="text-[#5EE72D] font-mono font-semibold">{st.discom}</span>
                              </div>
                            </div>

                            {/* Core Focus Vertical */}
                            <p className="text-[10.5px] text-zinc-300 font-light leading-snug mb-2.5 pt-1.5 border-t border-white/10">
                              <span className="text-[#5EE72D] font-medium">Core Focus: </span>
                              {st.highlightVertical}
                            </p>

                            {/* Key Deliverables Badges */}
                            <div className="space-y-1 pt-1.5 border-t border-white/10">
                              {st.deliverables.map((item) => (
                                <div key={item} className="flex items-center gap-1.5 text-[9.5px] text-zinc-200 font-mono">
                                  <CheckCircle2 className="w-3 h-3 text-[#5EE72D] shrink-0" />
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
                {/* FLOATING STAT BADGE CIRCLE (MATCHING REFERENCE DESIGN) */}
                {/* ------------------------------------------------------- */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute bottom-4 right-2 sm:bottom-8 sm:right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white text-zinc-900 border-4 border-[#0891b2] shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center p-2 z-30 pointer-events-none select-none"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0891b2] font-mono leading-none">
                    75+
                  </span>
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800 font-mono leading-none mb-1">
                    MW
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-500 leading-tight">
                    Clean Energy Evacuated
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


