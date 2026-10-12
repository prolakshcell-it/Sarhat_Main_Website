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
import {
  Settings2,
  Zap,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Activity,
  FileCheck2,
  Cpu,
  Workflow,
  Sparkles,
} from "lucide-react";

import SolutionFlowPipeline from "@/components/solutions/SolutionFlowPipeline";

export default function SystemDesignPage() {
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

  const designPillars = [
    {
      icon: Zap,
      tag: "ELECTRICAL ARCHITECTURE",
      title: "Comprehensive Single-Line Diagrams (SLD)",
      description: "Detailed end-to-end electrical schematics spanning DC string combiners, inverter duty transformers, 33kV switchgear, to the high-voltage grid interconnection bay.",
      spec: "Turnkey SLD Packages",
    },
    {
      icon: Cpu,
      tag: "LOSS OPTIMIZATION",
      title: "DC/AC Sizing & Inverter Loading Ratio",
      description: "Optimizing ILR between 1.25x and 1.42x to maximize annualized tariff revenue while ensuring inverter clipping losses remain strictly controlled.",
      spec: "1.25x – 1.42x ILR Ratios",
    },
    {
      icon: Layers,
      tag: "HIGH VOLTAGE",
      title: "Substation & Switchyard Engineering",
      description: "Full bay layouts, busbar clearances, surge arrestor placement, transformer oil containment pits, and lightning shielding calculations (33kV to 220kV).",
      spec: "33kV / 132kV / 220kV",
    },
    {
      icon: Activity,
      tag: "OHMIC CONTROL",
      title: "Low-Loss Cable Scheduling & Trenching",
      description: "Thermal derating calculations, trench bedding profiles, and optimized string groupings keeping DC ohmic losses strictly below 1.2%.",
      spec: "< 1.2% DC Cable Loss",
    },
    {
      icon: Workflow,
      tag: "AUTOMATION & SCADA",
      title: "Protection & SCADA Architecture",
      description: "ETAP relay coordination curves, numerical protection relays, dual-redundant fiber optic rings, and DISCOM SLDC communication gateways.",
      spec: "IEC 61850 Protocols",
    },
    {
      icon: ShieldCheck,
      tag: "STRUCTURAL ALIGNMENT",
      title: "Civil Foundation & MMS Loading Specs",
      description: "Geotechnical pile embedment depths, pullout resistance safety factor >1.5, and hot-dip galvanized structural member profiling.",
      spec: "IS:800 & IS:875 Safety",
    },
  ];

  const deliverables = [
    "Complete Plant General Arrangement (GA) Drawing",
    "Detailed Electrical Single-Line Diagram (SLD) & Metering Architecture",
    "PVSyst Energy Simulation Report (P50, P75, P90)",
    "String Sizing & DC Cable Schedule with Trench Cross-Sections",
    "33kV / 132kV / 220kV Substation Bay Layout & Elevation Drawings",
    "ETAP Short-Circuit Study & Relay Setting Coordination Report",
    "MMS Fabrication Drawings & STAAD.Pro Structural Calculation Dossier",
    "Earthing & Lightning Protection Calculation (IEEE 80 / IS 3043)",
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
                src="/images/substation-project.jpg"
                alt="Sarhat System Design Solutions"
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
                  System Design &amp; <br />
                  <span className="text-[#D4E012] italic font-normal">Electrical Architecture</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                  From DC string topology and low-loss cabling to high-voltage substation switchyards, we design resilient electrical infrastructure that operates flawlessly under real grid conditions.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* Core System Design Pillars */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                  <AnimatedPillBadge className="mb-3">TECHNICAL ARCHITECTURE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Optimized Electrical &amp; Structural Topologies
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Every watt matters. Our system design engineers eliminate thermal and ohmic bottlenecks across every tier of the power chain.
                  </p>
                </div>
              </ScrollReveal>

              <SolutionFlowPipeline
                items={designPillars}
                metricLabel="Benchmark Spec"
                flowStageTitle="System Design Topology Flow"
              />
            </div>
          </section>

          {/* IFC Deliverables Dossier */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-14 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-8 space-y-6">
                    <AnimatedPillBadge className="mb-2">IFC DOCUMENTATION</AnimatedPillBadge>
                    <h3 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900">
                      Issued For Construction (IFC) Engineering Deliverables
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      We provide engineering documentation that contractors and DISCOM inspectors trust. Zero ambiguities on site, rapid CEIG approvals, and smooth execution.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 rounded-2xl bg-slate-900 p-8 text-white space-y-4 text-center">
                    <div className="text-4xl font-mono font-extrabold text-[#D4E012]">100%</div>
                    <div className="text-xs uppercase font-mono tracking-widest text-slate-300">
                      CEIG Approval Success Rate
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      All electrical designs adhere strictly to CEA regulations and local state utility grid codes.
                    </p>
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-black font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      Consult Design Engineers
                    </button>
                  </div>
                </div>
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
