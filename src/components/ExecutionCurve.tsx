"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
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

const VB_W = 1000;
const VB_H = 300;
const AUTOPLAY_MS = 6500;

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
        "Project Goals & Scope",
        "Site Assessment & Feasibility",
        "Risks & Viability Review",
      ],
      image: "/images/hero-solar.jpg",
      caption: "Understand the Vision. Assess the Potential.",
    },
    {
      id: "design",
      phaseNumber: "PHASE 02",
      title: "Design",
      headline: "Engineering & Procurement Blueprint",
      description:
        "Designed for Your Goals. Engineered to Perform. We turn your vision into build-ready designs and finalised bills of materials (BOM)—balancing performance, safety and cost.",
      color: "#3B82F6",
      bgGlow: "rgba(59, 130, 246, 0.2)",
      icon: Cpu,
      angle: -30, // Top Right
      checklist: [
        "Detailed Engineering & Layouts",
        "Technology & Material Selection",
        "Performance & Cost Optimisation",
      ],
      image: "/images/bess-substation.jpg",
      caption: "Lasting performance begins with thoughtful design.",
    },
    {
      id: "prepare",
      phaseNumber: "PHASE 03",
      title: "Prepare",
      headline: "Commercial & Statutory Approvals",
      description:
        "Plan with Precision. Build with Confidence. We align procurement, contracts and approval requirements—bringing resources, responsibilities and timelines together for a coordinated start.",
      color: "#F43F5E",
      bgGlow: "rgba(244, 63, 94, 0.2)",
      icon: FileCheck,
      angle: 30, // Bottom Right
      checklist: [
        "Procurement & Delivery Planning",
        "Contracts & Approval Coordination",
        "Resource & Site Readiness",
      ],
      image: "/images/india-map-tactical.jpg",
      caption: "Strong preparation sets execution in motion.",
    },
    {
      id: "build",
      phaseNumber: "PHASE 04",
      title: "Build",
      headline: "Precision On-Site Execution",
      description:
        "We bring designs to life through skilled teams, disciplined coordination and rigorous quality checks—keeping safety, timelines and your goals at the centre.",
      color: "#F97316",
      bgGlow: "rgba(249, 115, 22, 0.2)",
      icon: Hammer,
      angle: 90, // Bottom
      checklist: [
        "Construction & Installation",
        "Safety & Quality Control",
        "Schedule & Progress Tracking",
      ],
      image: "/images/hero-solar.jpg",
      caption: "Where engineering meets execution.",
    },
    {
      id: "commission",
      phaseNumber: "PHASE 05",
      title: "Commission",
      headline: "System Synchronization & Handover",
      description:
        "We test, verify and commission your systems for safe operation—with performance checks, complete documentation and a confident handover.",
      color: "#16A34A",
      bgGlow: "rgba(22, 163, 74, 0.25)",
      icon: Zap,
      angle: 150, // Bottom Left
      checklist: [
        "System Testing & Verification",
        "Commissioning & Grid Integration",
        "Documentation & Client Handover",
      ],
      image: "/images/bess-substation.jpg",
      caption: "Where execution becomes operation.",
    },
    {
      id: "sustain",
      phaseNumber: "PHASE 06",
      title: "Sustain",
      headline: "Asset Maintenance & Lifecycle Expansion",
      description:
        "Beyond Handover. Committed to Performance. We keep your assets working through proactive maintenance, performance monitoring and timely upgrades—reducing downtime and protecting long-term value.",
      color: "#A855F7",
      bgGlow: "rgba(168, 85, 247, 0.2)",
      icon: RefreshCw,
      angle: 210, // Top Left
      checklist: [
        "Operation & Maintenance",
        "Performance Monitoring & Optimisation",
        "System Upgrades & Modernisation",
      ],
      image: "/images/bess-substation.jpg",
      caption: "Lasting value needs lasting commitment.",
    },
  ];

  // Active step index
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  // Desktop is scroll-driven; autoplay is only for the mobile card view
  const autoPlay = inView && !paused && !reduceMotion && !isDesktop;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 15%", "end end"],
  });
  const lineTarget = useTransform(scrollYProgress, [0, (phases.length - 1) / phases.length], [0, 1], { clamp: true });
  const lineProgress = useSpring(lineTarget, { stiffness: 90, damping: 26, mass: 0.6 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!isDesktop) return;
    const idx = Math.min(phases.length - 1, Math.max(0, Math.floor(p * phases.length)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const goTo = (idx: number) => {
    const i = (idx + phases.length) % phases.length;
    if (isDesktop && trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const start = window.scrollY + rect.top - window.innerHeight * 0.15;
      const scrollable = rect.height - window.innerHeight * 0.85;
      window.scrollTo({
        top: start + ((i + 0.5) / phases.length) * scrollable,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    } else {
      setActiveIndex(i);
    }
  };

  // S-curve geometry: nodes alternate high/low, joined by smooth cubic segments
  const { points, curvePath } = useMemo(() => {
    const n = phases.length;
    const pts = phases.map((_, i) => ({
      x: 70 + (i * (VB_W - 140)) / (n - 1),
      y: i % 2 === 0 ? 90 : VB_H - 90,
    }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < n; i++) {
      const mx = (pts[i - 1].x + pts[i].x) / 2;
      d += ` C ${mx} ${pts[i - 1].y}, ${mx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
    }
    return { points: pts, curvePath: d };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-play only while visible, not hovered, and motion is allowed
  useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(
      () => setActiveIndex((prev) => (prev + 1) % phases.length),
      AUTOPLAY_MS
    );
    return () => clearTimeout(t);
  }, [autoPlay, activeIndex, phases.length]);

  const activePhase = phases[activeIndex];
  const ActiveIcon = activePhase.icon;

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      id="execution"
      className="py-10 sm:py-12 lg:py-14 bg-[#18221B] text-white relative z-10 border-b border-white/10 select-none overflow-clip font-sans-ui"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Editorial Title */}
        <ScrollReveal direction="up" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
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
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x mb-6 border-b border-white/10">
            {phases.map((phase, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`snap-start shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 border ${isActive
                    ? "bg-[#202C24] text-white border-2 shadow-lg"
                    : "bg-[#202C24]/50 text-slate-400 border-white/10 hover:border-white/30 hover:text-slate-200"
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
              className="relative rounded-3xl bg-[#202C24]/90 border-2 p-5 sm:p-7 backdrop-blur-xl shadow-2xl overflow-hidden"
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
              <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-md">
                <Image
                  src={activePhase.image}
                  alt={activePhase.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18221B] via-[#18221B]/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200 font-medium bg-[#18221B]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
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
                    className="flex items-center gap-2.5 text-xs text-slate-200 font-medium bg-black/20 p-2 rounded-xl border border-white/10"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: activePhase.color }}
                    />
                    <span className="leading-snug text-xs">{item}</span>
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
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8" : "w-2 bg-slate-800"
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
        {/* DESKTOP / TABLET CURVE (md:block) - S-curve roadmap + detail card */}
        {/* ============================================================= */}
        <div ref={trackRef} className="hidden md:block mt-10 md:h-[460vh]">
          <div className="sticky top-24">
            {/* Curve canvas */}
            <div className="relative w-full max-w-5xl mx-auto" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="curve-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
                    {phases.map((p, i) => (
                      <stop key={p.id} offset={`${(points[i].x / VB_W) * 100}%`} stopColor={p.color} />
                    ))}
                  </linearGradient>
                </defs>
                {/* Base track */}
                <path d={curvePath} stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round" />
                {/* Progress */}
                <motion.path
                  d={curvePath}
                  stroke="url(#curve-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? lineTarget : lineProgress }}
                />
              </svg>

              {/* Nodes */}
              {phases.map((phase, idx) => {
                const isActive = idx === activeIndex;
                const isDone = idx < activeIndex;
                const Icon = phase.icon;
                const high = points[idx].y < VB_H / 2;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`${phase.phaseNumber} ${phase.title}`}
                    aria-current={isActive ? "step" : undefined}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group focus:outline-none"
                    style={{
                      left: `${(points[idx].x / VB_W) * 100}%`,
                      top: `${(points[idx].y / VB_H) * 100}%`,
                    }}
                  >
                    <span
                      className={`relative flex w-12 h-12 lg:w-14 lg:h-14 rounded-2xl items-center justify-center border transition-[transform,background-color,box-shadow] duration-700 ${isActive ? "scale-105 border-white/70" : "bg-[#202C24] border-white/15 group-hover:border-white/40 group-focus-visible:border-white"
                        }`}
                      style={{
                        backgroundColor: isActive ? phase.color : undefined,
                        color: isActive ? "#000" : phase.color,
                        boxShadow: isActive ? `0 8px 24px -8px ${phase.color}80` : undefined,
                        borderColor: isDone ? `${phase.color}99` : undefined,
                      }}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </span>
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap py-1 px-3 rounded-xl border text-[10px] lg:text-[11px] font-mono uppercase tracking-wider font-bold transition-colors duration-500 ${high ? "bottom-full mb-3" : "top-full mt-3"
                        } ${isActive
                          ? "bg-white text-slate-900 border-white"
                          : "bg-[#202C24]/90 text-slate-300 border-white/10 group-hover:text-white"
                        }`}
                    >
                      <span className="opacity-60 mr-1.5">{phase.phaseNumber.replace("PHASE ", "")}</span>
                      {phase.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active phase detail */}
            <div className="relative max-w-4xl mx-auto mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.6, ease: [0.45, 0, 0.2, 1] }}
                  className="relative grid grid-cols-5 gap-6 rounded-3xl bg-[#202C24]/80 border p-5 lg:p-6 overflow-hidden"
                  style={{ borderColor: `${activePhase.color}80` }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.12] pointer-events-none"
                    style={{ background: `radial-gradient(60% 80% at 0% 0%, ${activePhase.color}, transparent)` }}
                  />
                  <div className="relative col-span-2 h-48 lg:h-56 rounded-2xl overflow-hidden border border-white/10">
                    <Image src={activePhase.image} alt={activePhase.title} fill sizes="400px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18221B]/70 via-transparent to-transparent" />
                    <span
                      className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2 py-1 rounded text-black uppercase"
                      style={{ backgroundColor: activePhase.color }}
                    >
                      {activePhase.phaseNumber}
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 text-[11px] text-slate-200 bg-[#18221B]/80 px-3 py-1.5 rounded-xl border border-white/10 truncate">
                      {activePhase.caption}
                    </span>
                  </div>
                  <div className="relative col-span-3 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-serif-display font-medium text-white leading-tight mb-2">
                      {activePhase.headline}
                    </h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">{activePhase.description}</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                      {activePhase.checklist.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs text-slate-200 font-medium bg-black/20 p-2 rounded-xl border border-white/10"
                        >
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: activePhase.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Auto-advance timer bar (transform-only) */}
                  {autoPlay && (
                    <motion.div
                      key={`bar-${activeIndex}`}
                      className="absolute left-0 bottom-0 h-[3px] w-full origin-left"
                      style={{ backgroundColor: activePhase.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE CONTROLS BAR (Step Navigation) */}
        {/* ------------------------------------------------------------- */}
        <div className="flex md:hidden items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev === 0 ? phases.length - 1 : prev - 1))
            }
            className="p-2.5 sm:p-3 rounded-full bg-[#202C24] border border-white/15 text-slate-300 hover:text-white hover:border-[#D4E012] transition-colors"
            aria-label="Previous Phase"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % phases.length)}
            className="p-2.5 sm:p-3 rounded-full bg-[#202C24] border border-white/15 text-slate-300 hover:text-white hover:border-[#D4E012] transition-colors"
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


