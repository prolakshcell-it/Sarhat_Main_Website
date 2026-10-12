"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Activity,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface FlowItem {
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  stat?: string;
  metric?: string;
  spec?: string;
  flowLabel?: string;
}

interface SolutionFlowPipelineProps {
  items: FlowItem[];
  metricLabel?: string;
  flowStageTitle?: string;
}

// Snappy auto-play speed (~2.4s per stage as requested)
const STEP_DURATION = 2400;

export default function SolutionFlowPipeline({
  items,
  metricLabel = "Benchmark Impact",
  flowStageTitle = "Engineering Flow Pipeline",
}: SolutionFlowPipelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const stepCount = items.length;

  // Faster, snappy auto-play through stages
  useEffect(() => {
    if (isHovered || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveStep((prev) => (prev + 1) % stepCount);
    }, STEP_DURATION);
    return () => clearInterval(timer);
  }, [isHovered, shouldReduceMotion, stepCount]);

  const activeItem = items[activeStep] || items[0];
  const ActiveIcon = activeItem.icon;
  const activeStat = activeItem.stat || activeItem.metric || activeItem.spec || "Certified Standard";

  const goToStep = (index: number) => {
    if (index === activeStep) return;
    setDirection(index > activeStep ? 1 : -1);
    setActiveStep(index);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveStep((prev) => (prev + 1) % stepCount);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveStep((prev) => (prev - 1 + stepCount) % stepCount);
  };

  // Fluid transition
  const smoothTransition = {
    duration: shouldReduceMotion ? 0.12 : 0.35,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <div
      className="relative mx-auto max-w-7xl font-sans-ui"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 01 / FLOW HEADER & COMPACT SINGLE-LINE NAVIGATION RAIL */}
      <div className="mb-6 sm:mb-8">
        {/* Top telemetry status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200/90">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DAD45] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6DAD45]" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-800 font-semibold">
              {flowStageTitle}
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              — Step {String(activeStep + 1).padStart(2, "0")} / {String(stepCount).padStart(2, "0")}
            </span>
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline-block pr-1">
              Cycle stage
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Previous Stage"
              >
                <ArrowLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Next Stage"
              >
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* SINGLE-LINE COMPACT STAGE BUTTONS RAIL */}
        <div className="relative pt-3 pb-1">
          {/* Subtle connecting progress line behind */}
          <div className="absolute top-[22px] left-4 right-4 h-[2px] bg-slate-200 hidden lg:block z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6DAD45] to-[#D4E012]"
              animate={{
                width: `${(activeStep / Math.max(1, stepCount - 1)) * 100}%`,
              }}
              transition={smoothTransition}
            />
          </div>

          {/* Guaranteed single line: flex with horizontal scroll or auto-fit 6-col grid */}
          <div className="relative z-10 flex lg:grid lg:grid-cols-6 gap-2 overflow-x-auto no-scrollbar py-1">
            {items.map((item, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = idx < activeStep;
              const numStr = String(idx + 1).padStart(2, "0");

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`group relative text-left px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden shrink-0 min-w-[135px] lg:min-w-0 ${
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-[#6DAD45]/40"
                      : "bg-white border-slate-200/90 text-slate-700 hover:border-[#6DAD45]/60 hover:bg-slate-50/80"
                  }`}
                >
                  {/* Active top highlight line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFlowRail"
                      className="absolute inset-x-0 top-0 h-[2.5px] bg-[#D4E012]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Stage number & status dot */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        isActive
                          ? "text-[#D4E012]"
                          : isCompleted
                          ? "text-[#6DAD45]"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {numStr}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-[#D4E012]"
                          : isCompleted
                          ? "bg-[#6DAD45]"
                          : "bg-slate-200 group-hover:bg-slate-300"
                      }`}
                    />
                  </div>

                  {/* Stage title in 1-2 tight lines */}
                  <div>
                    <span
                      className={`block font-mono text-[9px] uppercase tracking-wider mb-0.5 truncate ${
                        isActive ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {item.tag.split(" ")[0]}
                    </span>
                    <span
                      className={`block text-[11px] font-medium leading-tight truncate ${
                        isActive ? "text-white font-semibold" : "text-slate-800"
                      }`}
                      title={item.title}
                    >
                      {item.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 02 / PROFESSIONAL FLOW WORKSPACE */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeStep}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction * 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction * -20,
            }}
            transition={smoothTransition}
            className="p-6 sm:p-8 lg:p-10 will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Context, Title, Description & Deliverables */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-[#6DAD45]/10 text-[#4f8a2e] border border-[#6DAD45]/20 rounded-full inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6DAD45]" />
                    STAGE {String(activeStep + 1).padStart(2, "0")} OF {String(stepCount).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                    {activeItem.tag}
                  </span>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-slate-900 text-[#D4E012] flex items-center justify-center shrink-0 shadow-md">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-medium text-slate-900 leading-tight">
                      {activeItem.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Technical Verification Highlights */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2.5 bg-[#F8FAF8] border border-slate-200/80 p-3 rounded-xl text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Deterministic Modeling</span>
                        <span className="text-slate-500 font-light">Validated under localized terrain factors</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 bg-[#F8FAF8] border border-slate-200/80 p-3 rounded-xl text-xs text-slate-700">
                      <Zap className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Turnkey Performance Ratio</span>
                        <span className="text-slate-500 font-light">Engineered to guarantee generation uptime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Telemetry Metric & Flow Navigation */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-7 shadow-xl relative overflow-hidden">
                  {/* Subtle corner glow */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4E012]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5 font-mono text-xs">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Activity className="w-3.5 h-3.5 text-[#6DAD45]" />
                        <span>ENGINEERING TELEMETRY</span>
                      </div>
                      <span className="text-[#D4E012] font-semibold text-[11px]">ACTIVE VECTOR</span>
                    </div>

                    <div className="mb-5">
                      <span className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                        {metricLabel}
                      </span>
                      <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                        <span className="text-[#D4E012]">{activeStat}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-5 text-xs font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Workflow Stage:</span>
                        <span className="text-white font-semibold">
                          0{activeStep + 1} &rarr; 0{((activeStep + 1) % stepCount) + 1}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Domain Scope:</span>
                        <span className="text-emerald-300 font-semibold">{activeItem.tag}</span>
                      </div>
                    </div>

                    {/* Step Navigation Buttons */}
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer group"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Prev</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#6DAD45] hover:bg-[#5da037] text-white font-mono text-xs font-bold transition-colors shadow-lg shadow-[#6DAD45]/20 flex items-center justify-center gap-1.5 cursor-pointer group"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom continuous completion indicator bar */}
        <div className="h-1 w-full bg-slate-100">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6DAD45] to-[#D4E012]"
            animate={{
              width: `${((activeStep + 1) / stepCount) * 100}%`,
            }}
            transition={smoothTransition}
          />
        </div>
      </div>
    </div>
  );
}
