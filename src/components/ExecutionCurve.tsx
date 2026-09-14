"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Cpu,
  FileCheck,
  Hammer,
  Zap,
  RefreshCw,
  CheckCircle2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface Phase {
  id: string;
  phaseNumber: string;
  title: string;
  headline: string;
  description: string;
  color: string;
  bgGlow: string;
  icon: any;
  angle: number; // angle in degrees (-90 top, -30 top right, 30 bottom right, 90 bottom, 150 bottom left, 210 top left)
  checklist: string[];
  image: string;
  caption: string;
}

export default function ExecutionCurve() {
  const phases: Phase[] = [
    {
      id: "discover",
      phaseNumber: "PHASE 01",
      title: "Discover",
      headline: "Site Intelligence & Grid Assessment",
      description: "We evaluate land topography, solar irradiance metrics, substation proximity, and regulatory permissions to map total project feasibility.",
      color: "#5EE72D",
      bgGlow: "rgba(94, 231, 45, 0.2)",
      icon: Compass,
      angle: -90, // Top
      checklist: [
        "Solar Irradiance Audit",
        "Substation Distance Matrix",
        "Land Title Verification",
      ],
      image: "/images/hero-solar.jpg",
      caption: "Site feasibility & GIS solar irradiance mapping",
    },
    {
      id: "design",
      phaseNumber: "PHASE 02",
      title: "Design",
      headline: "Engineering & Procurement Blueprint",
      description: "Detailed civil engineering, electrical single-line diagrams (SLD), array layout optimization, and bill of materials (BOM) finalized.",
      color: "#3B82F6",
      bgGlow: "rgba(59, 130, 246, 0.2)",
      icon: Cpu,
      angle: -30, // Top Right
      checklist: [
        "3D Shadow Analysis",
        "SLD & Civil Layouts",
        "Equipment Procurement BOM",
      ],
      image: "/images/bess-substation.jpg",
      caption: "CAD engineering & SLD electrical layouts",
    },
    {
      id: "structure",
      phaseNumber: "PHASE 03",
      title: "Structure",
      headline: "Commercial & Statutory Clearances",
      description: "PPA negotiation, state utility open-access approvals, CEIG clearance filing, and project financing closure.",
      color: "#F43F5E",
      bgGlow: "rgba(244, 63, 94, 0.2)",
      icon: FileCheck,
      angle: 30, // Bottom Right
      checklist: [
        "CEIG & DISCOM Approvals",
        "PPA Documentation",
        "EPC Contract Execution",
      ],
      image: "/images/india-map-tactical.jpg",
      caption: "PPA approvals & statutory clearance filings",
    },
    {
      id: "build",
      phaseNumber: "PHASE 04",
      title: "Build",
      headline: "Precision On-Site EPC Execution",
      description: "Piling, mounting structure assembly, module installation, inverter station wiring, substation bay erection, and transmission line corridor.",
      color: "#F97316",
      bgGlow: "rgba(249, 115, 22, 0.2)",
      icon: Hammer,
      angle: 90, // Bottom
      checklist: [
        "Civil Foundations & Piling",
        "Substation Bay Erection",
        "String Inverter Cabling",
      ],
      image: "/images/hero-solar.jpg",
      caption: "On-site civil foundations & mounting assembly",
    },
    {
      id: "commission",
      phaseNumber: "PHASE 05",
      title: "Commission",
      headline: "Grid Synchronization & COD",
      description: "High-voltage insulation testing, SCADA telemetry calibration, DISCOM grid synchronization, and Commercial Operation Date (COD) handover.",
      color: "#10B981",
      bgGlow: "rgba(16, 185, 129, 0.2)",
      icon: Zap,
      angle: 150, // Bottom Left
      checklist: [
        "Grid Synchronization",
        "SCADA Calibration",
        "COD Handover Certificate",
      ],
      image: "/images/bess-substation.jpg",
      caption: "High-voltage testing & DISCOM grid COD sync",
    },
    {
      id: "upgrade",
      phaseNumber: "PHASE 06",
      title: "Upgrade",
      headline: "Asset Operations & Lifecycle Expansion",
      description: "24/7 remote monitoring, preventive maintenance, BESS integration upgrades, and performance ratio optimization.",
      color: "#A855F7",
      bgGlow: "rgba(168, 85, 247, 0.2)",
      icon: RefreshCw,
      angle: 210, // Top Left
      checklist: [
        "24/7 Telemetry Monitoring",
        "O&M Maintenance Support",
        "BESS Retrofit Options",
      ],
      image: "/images/bess-substation.jpg",
      caption: "24/7 telemetry monitoring & BESS retrofits",
    },
  ];

  // Active step index
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play rotation effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying, phases.length]);

  const activePhase = phases[activeIndex];

  return (
    <section id="execution" className="py-24 sm:py-28 bg-black text-white relative z-10 border-b border-white/10 select-none overflow-hidden font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Editorial Title matching previous content */}
        <ScrollReveal direction="up" distance={35}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#5EE72D] uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping"></span>
                02 / THE CURVE OF EXECUTION
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
                A project journey <br />
                <span className="text-[#5EE72D] relative inline-block">
                  with a clear curve.
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#5EE72D]"
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
            </div>
            <p className="text-zinc-300 font-light text-base max-w-md leading-relaxed">
              6 core phases in sequence. The roadmap lights up as the project moves from discovery to long-term operations.
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* RADIAL 6-PHASE INTERACTIVE LIFECYCLE CANVAS */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={45} delay={0.15}>
          <div className="relative w-full max-w-5xl mx-auto aspect-square max-h-[700px] min-h-[560px] sm:min-h-[620px] flex items-center justify-center my-4">
            
            {/* Background Radial Glow */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-700 pointer-events-none opacity-40 blur-3xl"
              style={{ background: activePhase.bgGlow }}
            ></div>

            {/* Dashed Circular Orbit Line */}
            <div className="absolute inset-8 sm:inset-16 rounded-full border-2 border-dashed border-white/20 animate-[spin_120s_linear_infinite] pointer-events-none"></div>

            {/* Inner Pulsing Ring */}
            <div className="absolute inset-28 sm:inset-36 rounded-full border border-white/10 pointer-events-none"></div>

            {/* --------------------------------------------------------- */}
            {/* 6 RADIAL NODES PLACED ON THE CIRCLE */}
            {/* --------------------------------------------------------- */}
            {phases.map((phase, idx) => {
              const isActive = idx === activeIndex;
              // Compute node offset percentages on radius R = 38%
              const radiusPercent = 38;
              const rad = (phase.angle * Math.PI) / 180;
              const leftPercent = 50 + radiusPercent * Math.cos(rad);
              const topPercent = 50 + radiusPercent * Math.sin(rad);

              const Icon = phase.icon;

              return (
                <div
                  key={phase.id}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center group cursor-pointer"
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Icon Box */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl relative ${
                      isActive
                        ? "scale-110 shadow-2xl border-2 border-white"
                        : "bg-zinc-900/90 border border-white/15 hover:border-white/40"
                    }`}
                    style={{
                      backgroundColor: isActive ? phase.color : undefined,
                      color: isActive ? "#000000" : phase.color,
                      boxShadow: isActive ? `0 0 25px ${phase.color}` : undefined,
                    }}
                  >
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </motion.div>

                  {/* Phase Title Card Pill */}
                  <div
                    className={`mt-2 py-1 px-3 rounded-xl border text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold transition-all duration-300 whitespace-nowrap backdrop-blur-md shadow-lg ${
                      isActive
                        ? "bg-white text-black border-white scale-105 shadow-2xl"
                        : "bg-black/80 text-zinc-300 border-white/20 group-hover:border-white/50 group-hover:text-white"
                    }`}
                  >
                    <span className="opacity-60 mr-1.5">{phase.phaseNumber}</span>
                    <span>{phase.title}</span>
                  </div>

                  {/* ----------------------------------------------------- */}
                  {/* CLICKED NODE PREVIEW IMAGE POPOVER CARD */}
                  {/* Floating directly next to the clicked phase node! */}
                  {/* ----------------------------------------------------- */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: -10 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className={`hidden sm:block absolute z-50 w-64 p-2.5 bg-black/95 border-2 rounded-2xl backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.95)] pointer-events-auto ${
                          phase.angle === -90
                            ? "bottom-full mb-3 left-1/2 -translate-x-1/2"
                            : phase.angle === 90
                            ? "top-full mt-3 left-1/2 -translate-x-1/2"
                            : phase.angle > -90 && phase.angle < 90
                            ? "left-full ml-4 top-1/2 -translate-y-1/2"
                            : "right-full mr-4 top-1/2 -translate-y-1/2"
                        }`}
                        style={{ borderColor: phase.color }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Preview Image at Clicked Node */}
                        <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2 border border-white/20">
                          <Image
                            src={phase.image}
                            alt={phase.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <span
                            className="absolute top-2 left-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded text-black uppercase shadow-md"
                            style={{ backgroundColor: phase.color }}
                          >
                            {phase.phaseNumber}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="px-1 text-left">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider truncate">
                              {phase.headline}
                            </h4>
                            <span
                              className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                              style={{ backgroundColor: phase.color }}
                            ></span>
                          </div>
                          <p className="text-[10px] text-zinc-300 font-light leading-snug">
                            {phase.caption}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* --------------------------------------------------------- */}
            {/* CENTER ACTIVE SPOTLIGHT CIRCLE CARD */}
            {/* --------------------------------------------------------- */}
            <div className="relative z-20 w-[275px] h-[275px] sm:w-[340px] sm:h-[340px] rounded-full bg-black/90 border-2 border-white/20 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center text-center p-6 sm:p-8 overflow-hidden">
              
              {/* Dynamic Color Accent Ring */}
              <div
                className="absolute inset-0 rounded-full border-2 opacity-60 transition-colors duration-500 pointer-events-none"
                style={{ borderColor: activePhase.color }}
              ></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center h-full w-full"
                >
                  {/* Phase Number Badge */}
                  <span
                    className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 border"
                    style={{
                      color: activePhase.color,
                      borderColor: `${activePhase.color}50`,
                      backgroundColor: activePhase.bgGlow,
                    }}
                  >
                    {activePhase.phaseNumber} OF 06
                  </span>

                  {/* Headline Title */}
                  <h3 className="text-lg sm:text-xl font-serif-display font-medium text-white mb-2 leading-tight px-2">
                    {activePhase.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-[11px] text-zinc-300 font-light leading-relaxed mb-3 max-w-[240px] sm:max-w-[260px] line-clamp-2">
                    {activePhase.description}
                  </p>

                  {/* Checklist with animated icons */}
                  <div className="space-y-1.5 text-left w-full max-w-[230px] sm:max-w-[250px]">
                    {activePhase.checklist.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[10px] sm:text-[11px] text-zinc-200 font-medium">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: activePhase.color }}
                        />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE CONTROLS BAR (Play/Pause & Step Navigation) */}
        {/* ------------------------------------------------------------- */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setActiveIndex((prev) => (prev === 0 ? phases.length - 1 : prev - 1))}
            className="p-3 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-[#5EE72D] transition-colors"
            aria-label="Previous Phase"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2.5 rounded-full bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#5EE72D]/20 transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-black fill-current" />
                <span>PAUSE CYCLE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-black fill-current" />
                <span>AUTO PLAY ROADMAP</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % phases.length)}
            className="p-3 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-[#5EE72D] transition-colors"
            aria-label="Next Phase"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}


