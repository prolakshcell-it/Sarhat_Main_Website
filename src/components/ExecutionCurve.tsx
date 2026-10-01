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
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedPillBadge from "./AnimatedPillBadge";

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
      description:
        "We evaluate land topography, solar irradiance metrics, substation proximity, and regulatory permissions to map total project feasibility.",
      color: "#D4E012",
      bgGlow: "rgba(212, 224, 18, 0.25)",
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
      description:
        "Detailed civil engineering, electrical single-line diagrams (SLD), array layout optimization, and bill of materials (BOM) finalized.",
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
      description:
        "PPA negotiation, state utility open-access approvals, CEIG clearance filing, and project financing closure.",
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
      description:
        "Piling, mounting structure assembly, module installation, inverter station wiring, substation bay erection, and transmission line corridor.",
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
      description:
        "High-voltage insulation testing, SCADA telemetry calibration, DISCOM grid synchronization, and Commercial Operation Date (COD) handover.",
      color: "#16A34A",
      bgGlow: "rgba(22, 163, 74, 0.25)",
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
      description:
        "24/7 remote monitoring, preventive maintenance, BESS integration upgrades, and performance ratio optimization.",
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

  // Auto-play rotation effect (continuous)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [phases.length]);

  const activePhase = phases[activeIndex];
  const ActiveIcon = activePhase.icon;

  return (
    <section
      id="execution"
      className="py-16 sm:py-24 md:py-28 bg-slate-950 text-white relative z-10 border-b border-slate-800 select-none overflow-hidden font-sans-ui"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Editorial Title */}
        <ScrollReveal direction="up" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <AnimatedPillBadge darkBg className="mb-4 sm:mb-6">
              THE CURVE OF EXECUTION
            </AnimatedPillBadge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-4">
              A project journey <br />
              <span className="text-[#D4E012] relative inline-block">
                with a clear curve.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#D4E012]"
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
            <p className="text-slate-300 font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              6 core phases in sequence. The roadmap lights up as the project moves from discovery to long-term operations.
            </p>
          </div>
        </ScrollReveal>

        {/* ============================================================= */}
        {/* MOBILE & SMALL TABLET VIEW (< md) - Clean Non-Overlapping Layout */}
        {/* ============================================================= */}
        <div className="block md:hidden max-w-xl mx-auto">
          {/* Mobile Horizontal Step Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x mb-6 border-b border-slate-800/80">
            {phases.map((phase, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`snap-start shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 border ${
                    isActive
                      ? "bg-slate-900 text-white border-2 shadow-lg"
                      : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                  style={{
                    borderColor: isActive ? phase.color : undefined,
                    boxShadow: isActive ? `0 0 12px ${phase.color}40` : undefined,
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: isActive ? phase.color : "rgba(255,255,255,0.08)",
                      color: isActive ? "#000000" : "#94a3b8",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span>{phase.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative rounded-3xl bg-slate-900/90 border-2 p-5 sm:p-7 backdrop-blur-xl shadow-2xl overflow-hidden"
              style={{ borderColor: activePhase.color }}
            >
              {/* Background ambient glow */}
              <div
                className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-all duration-500"
                style={{ background: activePhase.bgGlow }}
              ></div>

              {/* Card Top Row: Phase Tag & Icon */}
              <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
                <span
                  className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm"
                  style={{
                    color: activePhase.color,
                    borderColor: `${activePhase.color}50`,
                    backgroundColor: activePhase.bgGlow,
                  }}
                >
                  {activePhase.phaseNumber} OF 06
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: activePhase.color,
                    color: "#000000",
                  }}
                >
                  <ActiveIcon className="w-5 h-5 stroke-[2.2]" />
                </div>
              </div>

              {/* Phase Image Preview */}
              <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-4 border border-slate-700/80 shadow-md">
                <Image
                  src={activePhase.image}
                  alt={activePhase.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200 font-medium bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="truncate">{activePhase.caption}</span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0 animate-pulse ml-2"
                    style={{ backgroundColor: activePhase.color }}
                  ></span>
                </div>
              </div>

              {/* Card Headline & Description */}
              <div className="relative z-10 mb-4">
                <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-white mb-2 leading-tight">
                  {activePhase.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activePhase.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="relative z-10 space-y-2 pt-2 border-t border-slate-800">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
                  Key Phase Deliverables:
                </p>
                {activePhase.checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-xs text-slate-200 font-medium bg-slate-950/50 p-2 rounded-xl border border-slate-800/60"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: activePhase.color }}
                    />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar & Indicators */}
          <div className="flex items-center justify-center gap-1.5 my-6">
            {phases.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-8" : "w-2 bg-slate-800"
                }`}
                style={{
                  backgroundColor: idx === activeIndex ? activePhase.color : undefined,
                }}
                aria-label={`Go to phase ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ============================================================= */}
        {/* DESKTOP / TABLET RADIAL CANVAS (md:block) - Spacious & Non-Overlapping */}
        {/* ============================================================= */}
        <ScrollReveal direction="up" distance={45} delay={0.15} className="hidden md:block">
          <div className="relative w-full max-w-5xl mx-auto aspect-square max-h-[640px] lg:max-h-[700px] min-h-[580px] flex items-center justify-center mt-12 lg:mt-16 mb-8">
            {/* Background Radial Glow */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-700 pointer-events-none opacity-40 blur-3xl"
              style={{ background: activePhase.bgGlow }}
            ></div>

            {/* Dashed Circular Orbit Line */}
            <div className="absolute inset-12 lg:inset-16 rounded-full border-2 border-dashed border-white/20 animate-[spin_120s_linear_infinite] pointer-events-none"></div>

            {/* Inner Pulsing Ring */}
            <div className="absolute inset-32 lg:inset-36 rounded-full border border-white/10 pointer-events-none"></div>

            {/* --------------------------------------------------------- */}
            {/* 6 RADIAL NODES PLACED ON THE CIRCLE */}
            {/* --------------------------------------------------------- */}
            {phases.map((phase, idx) => {
              const isActive = idx === activeIndex;
              // Compute node offset percentages on radius R = 37% for safe padding
              const radiusPercent = 37;
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
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl relative ${
                      isActive
                        ? "scale-110 shadow-2xl border-2 border-white"
                        : "bg-slate-900/90 border border-slate-700 hover:border-slate-500"
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
                    className={`mt-2 py-1 px-3 rounded-xl border text-[10px] lg:text-[11px] font-mono uppercase tracking-wider font-bold transition-all duration-300 whitespace-nowrap backdrop-blur-md shadow-lg ${
                      isActive
                        ? "bg-white text-slate-900 border-white scale-105 shadow-2xl"
                        : "bg-slate-900/90 text-slate-300 border-slate-700 group-hover:border-slate-500 group-hover:text-white"
                    }`}
                  >
                    <span className="opacity-60 mr-1.5">{phase.phaseNumber}</span>
                    <span>{phase.title}</span>
                  </div>
                </div>
              );
            })}

            {/* --------------------------------------------------------- */}
            {/* CENTER ACTIVE SPOTLIGHT CIRCLE CARD */}
            {/* --------------------------------------------------------- */}
            <div className="relative z-20 w-[310px] h-[310px] lg:w-[390px] lg:h-[390px] rounded-full bg-slate-900/95 border-2 border-slate-700 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center text-center p-5 lg:p-7 overflow-hidden">
              {/* Dynamic Color Accent Ring */}
              <div
                className="absolute inset-0 rounded-full border-2 opacity-60 transition-colors duration-500 pointer-events-none"
                style={{ borderColor: activePhase.color }}
              ></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center h-full w-full"
                >
                  {/* Top Preview Image Thumbnail */}
                  <div className="relative w-28 h-14 lg:w-36 lg:h-20 rounded-xl overflow-hidden mb-2 border border-slate-700/80 shadow-md shrink-0">
                    <Image
                      src={activePhase.image}
                      alt={activePhase.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span
                      className="absolute top-1 left-1.5 text-[8px] lg:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded text-black uppercase shadow"
                      style={{ backgroundColor: activePhase.color }}
                    >
                      {activePhase.phaseNumber}
                    </span>
                  </div>

                  {/* Phase Badge */}
                  <span
                    className="text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1.5 border shadow-sm"
                    style={{
                      color: activePhase.color,
                      borderColor: `${activePhase.color}50`,
                      backgroundColor: activePhase.bgGlow,
                    }}
                  >
                    {activePhase.title} • {activePhase.phaseNumber} OF 06
                  </span>

                  {/* Headline Title */}
                  <h3 className="text-xs lg:text-base font-serif-display font-medium text-white mb-1 leading-tight px-2 max-w-[250px] lg:max-w-[290px]">
                    {activePhase.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[9px] lg:text-[10px] text-slate-300 font-light leading-relaxed mb-2 max-w-[220px] lg:max-w-[260px] line-clamp-2">
                    {activePhase.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-1 text-left w-full max-w-[200px] lg:max-w-[240px]">
                    {activePhase.checklist.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-1.5 text-[9px] lg:text-[10px] text-slate-200 font-medium"
                      >
                        <CheckCircle2
                          className="w-3 h-3 shrink-0"
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
        {/* INTERACTIVE CONTROLS BAR (Step Navigation) */}
        {/* ------------------------------------------------------------- */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev === 0 ? phases.length - 1 : prev - 1))
            }
            className="p-2.5 sm:p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-[#D4E012] transition-colors"
            aria-label="Previous Phase"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % phases.length)}
            className="p-2.5 sm:p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-[#D4E012] transition-colors"
            aria-label="Next Phase"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Section CTA Button */}
        <ScrollReveal direction="up" distance={30} delay={0.2}>
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
            >
              <span>Explore Project Portfolio</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


