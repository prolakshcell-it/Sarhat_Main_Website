"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import FinalCTA from "@/components/FinalCTA";
import SolutionFlowGrid from "@/components/solutions/SolutionFlowGrid";
import {
  HardHat,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Layers,
  Zap,
  Building2,
  Hammer,
  Gauge,
  Compass,
  AlertTriangle,
} from "lucide-react";

export default function ConstructionPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const bgDim = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.85]);

  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-60px"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentFilter = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", "blur(10px)"]);

  const constructionPillars = [
    {
      icon: Compass,
      tag: "SITE PREPARATION",
      title: "Earthworks, Grading & Access Roads",
      desc: "Topographic grading, culvert construction, heavy equipment access routes, and perimeter stormwater drainage networks designed for all-season reliability.",
      metric: "Heavy Payload Roads",
    },
    {
      icon: Hammer,
      tag: "DEEP FOUNDATIONS",
      title: "Hydraulic Ramming & Screw Piling",
      desc: "High-torque GPS-guided hydraulic piling rigs capable of installing hundreds of posts daily with continuous pullout and lateral load testing verification.",
      metric: "5,000+ Piles / Week",
    },
    {
      icon: Layers,
      tag: "MECHANICAL ASSEMBLY",
      title: "MMS Structure Erection & Module Clamping",
      desc: "Calibrated pneumatic torque-limiting tools, precision tilt alignment, anti-tamper fasteners, and dual-axis tracking drive calibration.",
      metric: "Zero Torque Deviation",
    },
    {
      icon: Zap,
      tag: "ELECTRICAL BALANCE",
      title: "DC String Laying & Inverter Plinths",
      desc: "Direct-buried UV-resistant DC cabling, engineered sand-bed trenches with protective tiles, combiner boxes, and cast-in-place inverter station pads.",
      metric: "IS:7098 Cable Standards",
    },
    {
      icon: Building2,
      tag: "HIGH VOLTAGE",
      title: "Substation & Transmission Line Works",
      desc: "Complete civil and electrical construction of 33kV/132kV/220kV grid substations, transformer oil pits, control rooms, and transmission line towers.",
      metric: "Turnkey Switchyards",
    },
    {
      icon: ShieldCheck,
      tag: "SAFETY FIRST",
      title: "Zero-Harm EHS Protocols",
      desc: "Daily toolbox safety talks, OSHA/ISO standard PPE compliance, electrical lock-out/tag-out (LOTO) procedures, and zero lost-time injury records.",
      metric: "Zero Lost Time Incidents",
    },
  ];

  const executionStages = [
    {
      step: "01",
      title: "Mobilization & Site Survey",
      detail: "Establishing site security, material storage laydowns, safety barriers, and baseline benchmark coordinate markers.",
    },
    {
      step: "02",
      title: "Civil Works & Structural Piling",
      detail: "Trench excavation, heavy access roads, pile testing, ramming of MMS posts, and building of inverter control plinths.",
    },
    {
      step: "03",
      title: "Mechanical & Electrical Installation",
      detail: "MMS purlin assembly, module installation with calibrated torque verification, DC cabling, and inverter terminations.",
    },
    {
      step: "04",
      title: "Cold & Hot Pre-Commissioning",
      detail: "Insulation resistance testing, hi-pot tests, phase sequence checks, transformer pre-charging, and CEIG inspection clearances.",
    },
  ];

  const safetyStats = [
    { label: "Lost Time Incidents (LTI)", val: "Zero" },
    { label: "Total Safe Man-Hours", val: "1.2M+" },
    { label: "On-Time COD Milestone Rate", val: "100%" },
    { label: "Torque Quality Audit Pass", val: "99.9%" },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 / HERO */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none"
          >
            <motion.div
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <Image
                src="/images/agrivoltaics-project.jpg"
                alt="Sarhat Construction Solutions"
                fill
                priority
                quality={95}
                className="object-cover object-center opacity-85"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/95 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{
                y: contentY,
                scale: contentScale,
                opacity: contentOpacity,
                filter: contentFilter,
              }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-24 flex flex-col items-center text-center will-change-transform"
            >
              <div className="max-w-4xl flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                  Precision Construction <br />
                  <span className="text-[#D4E012] italic font-normal">&amp; Field Execution</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                  Deploying heavy hydraulic ramming machinery, calibrated assembly teams, and stringent safety standards to build enduring solar parks and electrical grid infrastructure.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* Construction Pillars */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                  <AnimatedPillBadge className="mb-3">FIELD CAPABILITIES</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Engineering-Led Construction in the Field
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    We bridge the gap between design drawings and on-the-ground reality, ensuring zero shortcuts and uncompromising quality across every foundation and terminal.
                  </p>
                </div>
              </ScrollReveal>

              <SolutionFlowGrid
                items={constructionPillars.map((p) => ({ ...p, description: p.desc }))}
                metricLabel="Benchmark Metric"
                flowStageTitle="Construction Execution Flow"
              />
            </div>
          </section>

          {/* Construction Timeline */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-3">EXECUTION CADENCE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Structured On-Site Milestone Delivery
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Real-time daily progress reporting (DPR), drone volumetric tracking, and zero delay tolerances.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {executionStages.map((es) => (
                  <ScrollReveal key={es.step}>
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="font-mono text-3xl font-black text-[#6DAD45]/30 mb-2">{es.step}</div>
                      <h4 className="font-serif-display text-lg font-medium text-slate-900 mb-2">{es.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">{es.detail}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Safety Scorecard */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white">
                {safetyStats.map((st) => (
                  <div key={st.label} className="text-center space-y-1">
                    <div className="text-2xl sm:text-4xl font-mono font-bold text-[#D4E012]">{st.val}</div>
                    <div className="text-xs text-slate-300 font-mono uppercase tracking-wider">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
