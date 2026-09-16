"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Activity,
  CheckCircle2,
  Rocket,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Target,
  Navigation,
  Radio,
  ArrowRight,
  ShieldCheck,
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
  svgPos: { x: number; y: number };
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
      svgPos: { x: 470, y: 370 },
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
      svgPos: { x: 440, y: 320 },
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
      svgPos: { x: 260, y: 370 },
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
      svgPos: { x: 370, y: 520 },
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
      svgPos: { x: 670, y: 360 },
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
      svgPos: { x: 840, y: 300 },
      deliverables: ["Terrain MMS Foundations", "Substation Evacuation", "APEDA Clearances"],
    },
  ];

  // Hover state for details tooltip
  const [hoveredState, setHoveredState] = useState<StateInfo | null>(null);

  // Flight trajectory state
  const [originIndex, setOriginIndex] = useState<number>(2); // Default: Rajasthan
  const [targetIndex, setTargetIndex] = useState<number>(0); // Default: UP Central
  const [progress, setProgress] = useState<number>(0); // 0 to 1
  const [isFlying, setIsFlying] = useState<boolean>(true);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [landingEffect, setLandingEffect] = useState<boolean>(false);
  const [flightCount, setFlightCount] = useState<number>(1);

  const autoPlayRef = useRef<boolean>(autoPlay);
  const isFlyingRef = useRef<boolean>(isFlying);
  const originIndexRef = useRef<number>(originIndex);
  const targetIndexRef = useRef<number>(targetIndex);

  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  useEffect(() => {
    isFlyingRef.current = isFlying;
  }, [isFlying]);

  useEffect(() => {
    originIndexRef.current = originIndex;
  }, [originIndex]);

  useEffect(() => {
    targetIndexRef.current = targetIndex;
  }, [targetIndex]);

  // Helper to trigger next auto route flight
  const triggerNextAutoFlight = useCallback(() => {
    const currentTarget = targetIndexRef.current;
    let nextTarget = (currentTarget + 1) % stateData.length;
    // Make sure origin != target
    if (nextTarget === currentTarget) {
      nextTarget = (nextTarget + 1) % stateData.length;
    }
    setOriginIndex(currentTarget);
    setTargetIndex(nextTarget);
    setProgress(0);
    setIsFlying(true);
    setFlightCount((prev) => prev + 1);
  }, [stateData.length]);

  // Launch custom flight
  const launchFlight = useCallback(
    (fromIdx: number, toIdx: number) => {
      if (fromIdx === toIdx) return;
      setOriginIndex(fromIdx);
      setTargetIndex(toIdx);
      setProgress(0);
      setIsFlying(true);
      setFlightCount((prev) => prev + 1);
    },
    []
  );

  // Main animation frame loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const flightBaseDuration = 3200; // ms

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (isFlyingRef.current) {
        const duration = flightBaseDuration / speedMultiplier;
        const increment = delta / duration;

        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 1) {
            setIsFlying(false);
            setLandingEffect(true);
            setTimeout(() => setLandingEffect(false), 1400);

            if (autoPlayRef.current) {
              setTimeout(() => {
                if (autoPlayRef.current && !isFlyingRef.current) {
                  triggerNextAutoFlight();
                }
              }, 1600);
            }
            return 1;
          }
          return next;
        });
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [speedMultiplier, triggerNextAutoFlight]);

  // Geometry calculations for trajectory Bezier curve
  const originNode = stateData[originIndex];
  const targetNode = stateData[targetIndex];

  const p1 = originNode.svgPos;
  const p2 = targetNode.svgPos;

  // Midpoint & Perpendicular control point calculation for arc
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  let nx = -dy / (dist || 1);
  let ny = dx / (dist || 1);
  // Ensure arc bends upward in screen coordinates (ny < 0)
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const archHeight = Math.min(140, Math.max(55, dist * 0.28));
  const cx = mx + nx * archHeight;
  const cy = my + ny * archHeight;

  // Approximate route distance in KM
  const calculatedDistance = Math.round(dist * 3.2 + 180);

  // Position & angle at progress t
  const t = Math.min(1, Math.max(0, progress));
  const oneMinusT = 1 - t;
  const rx = oneMinusT * oneMinusT * p1.x + 2 * oneMinusT * t * cx + t * t * p2.x;
  const ry = oneMinusT * oneMinusT * p1.y + 2 * oneMinusT * t * cy + t * t * p2.y;

  // Tangents for rotation angle
  const tvx = 2 * oneMinusT * (cx - p1.x) + 2 * t * (p2.x - cx);
  const tvy = 2 * oneMinusT * (cy - p1.y) + 2 * t * (p2.y - cy);
  const rocketAngle = (Math.atan2(tvy, tvx) * 180) / Math.PI + 90;

  // Control point for trailing SVG sub-path
  const subCx = (1 - t) * p1.x + t * cx;
  const subCy = (1 - t) * p1.y + t * cy;

  // Particle tail positions behind rocket
  const getTrailPos = (dt: number) => {
    const pt = Math.max(0, t - dt);
    const omt = 1 - pt;
    return {
      x: omt * omt * p1.x + 2 * omt * pt * cx + pt * pt * p2.x,
      y: omt * omt * p1.y + 2 * omt * pt * cy + pt * pt * p2.y,
    };
  };

  const trail1 = getTrailPos(0.025);
  const trail2 = getTrailPos(0.05);
  const trail3 = getTrailPos(0.075);

  return (
    <section
      id="footprint"
      className="py-24 sm:py-28 bg-[#030908] relative z-10 border-b border-white/10 select-none overflow-hidden font-sans-ui"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-[11px] font-bold text-[#5EE72D] uppercase tracking-widest mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#5EE72D] animate-ping"></span>
              05 / PAN-INDIA FOOTPRINT & TRAJECTORY RADAR
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium tracking-tight text-white leading-tight mb-4">
              Built across India. <br />
              <span className="text-[#5EE72D] italic font-serif-display font-medium">
                Connected by High-Speed Trajectories.
              </span>
            </h2>

            <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
              Real-time clean energy grid dispatch & site connection telemetry. Watch our rocket payload trajectories link active solar parks, DISCOM substations, and BESS storage nodes nationwide.
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE FLIGHT RADAR CONTROL BAR & TELEMETRY PANEL */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={30} delay={0.1}>
          <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-zinc-950/80 border border-[#5EE72D]/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Flight Telemetry Status */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                    <Radio className="w-4 h-4 text-[#5EE72D] animate-pulse shrink-0" />
                    <span>TRAJECTORY #{flightCount.toString().padStart(3, "0")}</span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-[#5EE72D]">
                      {originNode.code} <ArrowRight className="w-3 h-3 inline mx-0.5 text-white" /> {targetNode.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5EE72D]/10 border border-[#5EE72D]/40 text-[10px] font-mono font-bold text-[#5EE72D]">
                    <Rocket className={`w-3 h-3 ${isFlying ? "animate-bounce" : ""}`} />
                    <span>{isFlying ? "IN FLIGHT" : "TOUCHDOWN LINKED"}</span>
                  </div>
                </div>

                {/* Progress bar and details */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-300">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Navigation className="w-3 h-3 text-[#5EE72D]" />
                      DIST: <strong className="text-white font-bold">{calculatedDistance} KM</strong>
                    </span>
                    <span className="text-zinc-400">
                      SPEED: <strong className="text-[#5EE72D] font-bold">{(1.8 * speedMultiplier).toFixed(1)} MACH</strong>
                    </span>
                    <span className="text-[#5EE72D] font-bold">
                      {Math.round(t * 100)}%
                    </span>
                  </div>

                  <div className="relative w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 via-[#5EE72D] to-cyan-400 rounded-full shadow-[0_0_12px_#5EE72D]"
                      style={{ width: `${Math.round(t * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Controls & Quick Launch Buttons */}
              <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-4">
                
                {/* Auto Play Patrol Toggle */}
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-200 ${
                    autoPlay
                      ? "bg-[#5EE72D]/20 text-[#5EE72D] border-[#5EE72D]/50 shadow-[0_0_15px_rgba(94,231,45,0.2)]"
                      : "bg-zinc-900 text-zinc-400 border-white/10 hover:text-white"
                  }`}
                >
                  {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>AUTO PATROL {autoPlay ? "ON" : "OFF"}</span>
                </button>

                {/* Speed Multiplier */}
                <div className="flex items-center gap-1 bg-zinc-900/90 border border-white/10 rounded-xl p-1 w-full sm:w-auto justify-center">
                  {[1, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeedMultiplier(s)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                        speedMultiplier === s
                          ? "bg-[#5EE72D] text-black shadow-sm"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

              </div>

            </div>

            {/* Quick Route Buttons */}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                <Target className="w-3 h-3 text-[#5EE72D]" /> QUICK TRAJECTORY LAUNCH:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { from: 2, to: 0, label: "Jaipur ➔ UP Central" },
                  { from: 0, to: 3, label: "UP ➔ Bhopal" },
                  { from: 3, to: 4, label: "Bhopal ➔ Bihar" },
                  { from: 4, to: 5, label: "Bihar ➔ Arunachal" },
                  { from: 5, to: 1, label: "Arunachal ➔ UP North" },
                ].map((route, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAutoPlay(false);
                      launchFlight(route.from, route.to);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all border ${
                      originIndex === route.from && targetIndex === route.to
                        ? "bg-[#5EE72D] text-black border-[#5EE72D] font-bold shadow-[0_0_10px_rgba(94,231,45,0.4)]"
                        : "bg-zinc-900/80 text-zinc-300 border-white/10 hover:border-[#5EE72D]/50 hover:text-[#5EE72D]"
                    }`}
                  >
                    🚀 {route.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* HIGH-RES VECTOR INDIA MAP CANVAS WITH ROCKET ANIMATION */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal direction="up" distance={45} delay={0.15}>
          <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
            {/* Map Header Status Indicator */}
            <div className="w-full flex items-center justify-between mb-4 px-3">
              <span className="text-[11px] font-mono text-[#5EE72D] uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#5EE72D]" /> PAN-INDIA OPERATIONAL MAP & TRAJECTORY SYSTEM
              </span>
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#5EE72D] animate-pulse" />
                CLICK ANY CITY MARKER TO LAUNCH ROCKET
              </span>
            </div>

            {/* Main India Vector Map Canvas Container */}
            <div className="relative w-full aspect-[3/3.8] max-h-[720px] flex items-center justify-center rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
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
                {/* SVG OVERLAY FOR ROCKET TRAJECTORY & ARC ANIMATION */}
                {/* ------------------------------------------------------- */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-30"
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* SVG Filters for Neon Glow */}
                    <filter id="rocketTrailGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="targetPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Gradient for Rocket Thruster Plume */}
                    <linearGradient id="rocketFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="35%" stopColor="#5EE72D" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#FF9900" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
                    </linearGradient>

                    {/* Gradient for Trajectory Line */}
                    <linearGradient id="trajectoryLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5EE72D" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#5EE72D" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  {/* 1. Full Planned Trajectory Radar Path (Dashed Arc) */}
                  <path
                    d={`M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="rgba(94, 231, 45, 0.3)"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  />

                  {/* 2. Active Glowing Trail Behind Rocket */}
                  {t > 0.01 && (
                    <path
                      d={`M ${p1.x} ${p1.y} Q ${subCx} ${subCy} ${rx} ${ry}`}
                      fill="none"
                      stroke="url(#trajectoryLineGrad)"
                      strokeWidth="4"
                      filter="url(#rocketTrailGlow)"
                      strokeLinecap="round"
                    />
                  )}

                  {/* 3. Concentric Target Crosshair Pulse on Destination Node while flying */}
                  <g transform={`translate(${p2.x}, ${p2.y})`}>
                    <circle
                      r="18"
                      fill="none"
                      stroke="#5EE72D"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="animate-spin-slow opacity-80"
                    />
                    <circle
                      r="26"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="1"
                      className="animate-ping opacity-40"
                    />
                  </g>

                  {/* 4. Touchdown Pulse Wave on Landing */}
                  {landingEffect && (
                    <g transform={`translate(${p2.x}, ${p2.y})`}>
                      <circle
                        r="35"
                        fill="rgba(94, 231, 45, 0.25)"
                        stroke="#5EE72D"
                        strokeWidth="3"
                        filter="url(#targetPulseGlow)"
                        className="animate-ping"
                      />
                      <circle
                        r="55"
                        fill="none"
                        stroke="#00F0FF"
                        strokeWidth="2"
                        className="animate-ping opacity-60"
                      />
                    </g>
                  )}

                  {/* 5. Trailing Ember / Flame Particles Behind Rocket */}
                  {t > 0.03 && (
                    <g>
                      <circle cx={trail1.x} cy={trail1.y} r="4" fill="#5EE72D" opacity="0.85" filter="url(#rocketTrailGlow)" />
                      <circle cx={trail2.x} cy={trail2.y} r="3" fill="#00F0FF" opacity="0.65" />
                      <circle cx={trail3.x} cy={trail3.y} r="2" fill="#FF9900" opacity="0.45" />
                    </g>
                  )}

                  {/* 6. Dynamic ROCKET CRAFT VEHICLE */}
                  <g
                    transform={`translate(${rx}, ${ry}) rotate(${rocketAngle})`}
                    style={{ transition: "none" }}
                  >
                    {/* Rocket Thruster Flame Tail */}
                    <ellipse
                      cx="0"
                      cy="20"
                      rx="4.5"
                      ry="12"
                      fill="url(#rocketFlameGrad)"
                      className="animate-pulse"
                    />
                    <ellipse cx="0" cy="15" rx="2.5" ry="7" fill="#FFFFFF" />

                    {/* Rocket Wings / Side Booster Fins */}
                    <path d="M -7 8 L -14 17 L -5 14 Z" fill="#5EE72D" />
                    <path d="M 7 8 L 14 17 L 5 14 Z" fill="#5EE72D" />

                    {/* Rocket Fuselage Main Body */}
                    <path
                      d="M 0 -22 Q 8 -6 7 12 L -7 12 Q -8 -6 0 -22 Z"
                      fill="#0C1A10"
                      stroke="#5EE72D"
                      strokeWidth="1.8"
                    />

                    {/* Cockpit Glass LED Glow */}
                    <circle cx="0" cy="-4" r="3" fill="#00F0FF" filter="url(#rocketTrailGlow)" />
                    <circle cx="0" cy="-4" r="1.5" fill="#FFFFFF" />

                    {/* Nose Cone Tip Highlight */}
                    <circle cx="0" cy="-22" r="1.5" fill="#5EE72D" />
                  </g>
                </svg>

                {/* ------------------------------------------------------- */}
                {/* 6 LOCATION DOT MARKERS (CLICKABLE TO LAUNCH ROCKET) */}
                {/* ------------------------------------------------------- */}
                {stateData.map((st, idx) => {
                  const isHovered = hoveredState?.code === st.code;
                  const isOrigin = idx === originIndex;
                  const isTarget = idx === targetIndex;
                  const topVal = parseInt(st.targetPos.top);
                  const leftVal = parseInt(st.targetPos.left);

                  const isTopHalf = topVal < 45;
                  const isRightHalf = leftVal > 55;

                  return (
                    <div
                      key={st.code}
                      style={{ top: st.targetPos.top, left: st.targetPos.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                        isHovered || isTarget ? "z-[100]" : "z-20"
                      }`}
                      onMouseEnter={() => setHoveredState(st)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => {
                        // Clicking a city sets it as the next destination target & launches rocket
                        if (idx !== originIndex) {
                          setAutoPlay(false);
                          launchFlight(targetIndex, idx);
                        }
                      }}
                    >
                      {/* Outer Ripple Ring */}
                      <span
                        className={`absolute -inset-2.5 rounded-full transition-all duration-300 pointer-events-none ${
                          isTarget
                            ? "bg-[#00F0FF]/50 animate-ping border border-[#00F0FF]"
                            : isOrigin
                            ? "bg-[#5EE72D]/40 border border-[#5EE72D]"
                            : isHovered
                            ? "bg-[#5EE72D]/70 animate-ping border border-[#5EE72D]"
                            : "bg-[#5EE72D]/20 group-hover:scale-125"
                        }`}
                      ></span>

                      {/* City Marker Node Pointer */}
                      <motion.button
                        whileHover={{ scale: 1.4 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isTarget
                            ? "bg-[#00F0FF] border-white shadow-[0_0_20px_#00F0FF] scale-125"
                            : isOrigin
                            ? "bg-[#5EE72D] border-black shadow-[0_0_15px_#5EE72D]"
                            : "bg-[#5EE72D] border-black shadow-[0_0_12px_#5EE72D]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isTarget ? "bg-black" : "bg-black"
                          }`}
                        ></span>
                      </motion.button>

                      {/* City Badge Label on Map */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-1.5 py-0.5 rounded bg-black/90 border border-white/20 text-[9px] font-mono font-bold whitespace-nowrap pointer-events-none transition-all ${
                          isTarget
                            ? "text-[#00F0FF] border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                            : "text-zinc-300"
                        }`}
                      >
                        {st.code}
                      </div>

                      {/* --------------------------------------------------- */}
                      {/* HOVER TOOLTIP SPEECH BUBBLE WITH DETAILS */}
                      {/* --------------------------------------------------- */}
                      <AnimatePresence>
                        {isHovered && (
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
                            className={`absolute z-[110] w-60 sm:w-64 p-3.5 bg-black/95 border border-[#5EE72D] rounded-2xl backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.95)] text-left pointer-events-auto ${
                              isTopHalf ? "top-full mt-7" : "bottom-full mb-7"
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
                                <span className="text-white font-mono font-bold">
                                  {st.activeProjects} Active Sites
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-mono">DISCOM:</span>
                                <span className="text-[#5EE72D] font-mono font-semibold">
                                  {st.discom}
                                </span>
                              </div>
                            </div>

                            {/* Core Focus Vertical */}
                            <p className="text-[10.5px] text-zinc-300 font-light leading-snug mb-2.5 pt-1.5 border-t border-white/10">
                              <span className="text-[#5EE72D] font-medium">Core Focus: </span>
                              {st.highlightVertical}
                            </p>

                            {/* Key Deliverables Badges */}
                            <div className="space-y-1 pt-1.5 border-t border-white/10 mb-2.5">
                              {st.deliverables.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-1.5 text-[9.5px] text-zinc-200 font-mono"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#5EE72D] shrink-0" />
                                  <span className="truncate">{item}</span>
                                </div>
                              ))}
                            </div>

                            {/* Action Button to launch rocket to this city */}
                            <button
                              onClick={() => {
                                setAutoPlay(false);
                                launchFlight(targetIndex, idx);
                              }}
                              className="w-full py-1.5 bg-[#5EE72D] text-black text-[10px] font-mono font-bold rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 shadow-md"
                            >
                              <Rocket className="w-3 h-3" />
                              LAUNCH TRAJECTORY TO {st.code}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* ------------------------------------------------------- */}
                {/* FLOATING STAT BADGE CIRCLE */}
                {/* ------------------------------------------------------- */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute bottom-4 right-2 sm:bottom-8 sm:right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-zinc-950/90 text-white border-2 border-[#5EE72D] shadow-[0_10px_35px_rgba(94,231,45,0.3)] backdrop-blur-md flex flex-col items-center justify-center text-center p-2 z-30 pointer-events-none select-none"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#5EE72D] font-mono leading-none">
                    75+
                  </span>
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-white font-mono leading-none mb-1">
                    MW
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-400 leading-tight">
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
