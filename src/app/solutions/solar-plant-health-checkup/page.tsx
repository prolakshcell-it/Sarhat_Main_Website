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
  Stethoscope,
  Activity,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  TrendingUp,
  Search,
  Camera,
  FileSpreadsheet,
  AlertOctagon,
} from "lucide-react";

export default function SolarPlantHealthCheckupPage() {
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

  const diagnosticsPillars = [
    {
      icon: Camera,
      tag: "AERIAL AUDIT",
      title: "Drone Thermography & Hotspot Mapping",
      desc: "Calibrated radiometric thermal drone scans pinpoint defective bypass diodes, localized cell hotspots, and soiling patterns across thousands of modules in hours.",
      metric: "IEC 62446-3 Compliant",
    },
    {
      icon: Activity,
      tag: "STRING FORENSICS",
      title: "IV Curve Tracing & Degradation Benchmark",
      desc: "High-precision electronic string tracers capture Voc, Isc, and Maximum Power Point (Pmp), calibrating real degradation against factory nameplate STC data.",
      metric: "True Voc / Isc Curves",
    },
    {
      icon: Search,
      tag: "CELL INTEGRITY",
      title: "Mobile Electroluminescence (EL) Scans",
      desc: "Forensic night EL testing uncovers internal micro-cracks, inactive cell fingers, and mechanical fractures invisible to the naked human eye.",
      metric: "Sub-Millimeter Flaw Detection",
    },
    {
      icon: Zap,
      tag: "HIGH VOLTAGE",
      title: "Transformer DGA & Oil BDV Testing",
      desc: "Dissolved Gas Analysis (DGA) and breakdown voltage insulation tests on inverter duty and power transformers detect incipient electrical arcing.",
      metric: "Early Flashover Prevention",
    },
    {
      icon: TrendingUp,
      tag: "RESTORE WATTAGE",
      title: "PID / LID Degradation Remediation",
      desc: "Diagnosing Potential-Induced Degradation (PID) voltage stress and deploying reverse-polarization nocturnal regeneration to recover lost capacity.",
      metric: "Up to 15% Lost Wattage Restored",
    },
    {
      icon: FileSpreadsheet,
      tag: "EXECUTIVE AUDIT",
      title: "Comprehensive Health Scorecard & ROI Plan",
      desc: "A fully quantified diagnostic audit report ranking faults by commercial revenue impact, with clear payback models for targeted repowering.",
      metric: "Actionable Capex Recovery",
    },
  ];

  const diagnosticProcess = [
    {
      step: "01",
      title: "Historical SCADA Analysis",
      detail: "Benchmarking historical inverter generation curves against local satellite solar irradiance to detect systematic PR slippage.",
    },
    {
      step: "02",
      title: "Non-Invasive Field Telemetry",
      detail: "Aerial drone thermography flight followed by targeted string IV curve tracing on lowest-performing combiner boxes.",
    },
    {
      step: "03",
      title: "Substation & Electrical Testing",
      detail: "Insulation resistance (Megger), earth pit resistance tests, and transformer oil breakdown voltage lab analysis.",
    },
    {
      step: "04",
      title: "Audit Report & Repowering Plan",
      detail: "Detailed failure catalog with module-level GPS coordinates, warranty claim evidence packages, and repowering recommendations.",
    },
  ];

  const metrics = [
    { label: "Typical Generation Recovery", val: "+6% to +18%" },
    { label: "Audit Standard", val: "IEC 62446" },
    { label: "Hotspot Scan Resolution", val: "<0.05°C NETD" },
    { label: "Turnaround to Action Plan", val: "72 Hours" },
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
                src="/images/bess-substation.jpg"
                alt="Sarhat Solar Plant Health Check-up"
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
                  Solar Plant <br />
                  <span className="text-[#D4E012] italic font-normal">Health Check-up &amp; Diagnostics</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                  Is your solar asset underperforming? Our forensic diagnostic audits identify invisible cell cracks, bypass diode failures, and transformer risks to recover lost revenue.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* Core Diagnostics Grid */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                  <AnimatedPillBadge className="mb-3">FORENSIC DIAGNOSTICS</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Pinpoint Sub-Surface Failures &amp; Yield Leaks
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Degradation often hides beneath standard inverter meters. Our non-destructive testing exposes root causes and delivers tangible yield recovery roadmaps.
                  </p>
                </div>
              </ScrollReveal>

              <SolutionFlowGrid
                items={diagnosticsPillars.map((p) => ({ ...p, description: p.desc }))}
                metricLabel="Benchmark Testing"
                flowStageTitle="Diagnostic Audit Flow"
              />
            </div>
          </section>

          {/* Audit Methodology */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-3">AUDIT CADENCE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Structured 4-Phase Health Check Methodology
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Fast, non-disruptive on-site testing that keeps your power plant feeding the grid while diagnostics are conducted.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {diagnosticProcess.map((dp) => (
                  <ScrollReveal key={dp.step}>
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="font-mono text-3xl font-black text-[#6DAD45]/30 mb-2">{dp.step}</div>
                      <h4 className="font-serif-display text-lg font-medium text-slate-900 mb-2">{dp.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">{dp.detail}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Metrics Strip */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center space-y-1">
                    <div className="text-2xl sm:text-4xl font-mono font-bold text-[#D4E012]">{m.val}</div>
                    <div className="text-xs text-slate-300 font-mono uppercase tracking-wider">{m.label}</div>
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
