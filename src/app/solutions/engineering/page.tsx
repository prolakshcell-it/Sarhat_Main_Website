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
  Compass,
  Layers,
  Zap,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Activity,
  FileCheck2,
  Settings2,
  Binary,
} from "lucide-react";

export default function EngineeringPage() {
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

  const subPages = [
    {
      title: "Innovation",
      href: "/solutions/engineering/innovation",
      badge: "CUTTING-EDGE",
      desc: "Pioneering bifacial albedo modeling, dynamic tracker algorithms, agrivoltaic dual-use setups, and digital twin microgrid simulations.",
      icon: Sparkles,
      action: "Explore Innovation",
    },
    {
      title: "System Design",
      href: "/solutions/engineering/system-design",
      badge: "OPTIMIZED ARCHITECTURE",
      desc: "Turnkey Single-Line Diagrams (SLD), DC/AC ratio sizing, 33kV/132kV/220kV switchyard layout, and sub-1.2% DC cable loss topologies.",
      icon: Settings2,
      action: "Explore System Design",
    },
  ];

  const pillars = [
    {
      icon: Compass,
      title: "Topographical & Geotechnical Feasibility",
      desc: "High-density drone contour mapping, soil resistivity tests, and pull-out test analytics ensure structural stability over 25+ years.",
      metric: "LIDAR & 3D Contour",
    },
    {
      icon: Binary,
      title: "PVSyst Simulation & Yield Modeling",
      desc: "Rigorous hourly energy simulations incorporating horizon shading, bifacial rear irradiance, IAM loss, and degradation rates.",
      metric: "P50 / P90 High Fidelity",
    },
    {
      icon: Layers,
      title: "Structural MMS Calculations",
      desc: "STAAD.Pro wind load simulations up to 180 km/h, corrosion-resistant HDG steel profiling, and optimized tilt pitch configurations.",
      metric: "IS:875 Part 3 Compliant",
    },
    {
      icon: ShieldCheck,
      title: "Grid Compliance & DISCOM Clearances",
      desc: "Detailed short-circuit analysis, protection relay coordination (ETAP), CEA regulations compliance, and CEIG readiness approvals.",
      metric: "100% Grid Code Sync",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Data Gathering & Site Survey",
      detail: "Geotech bore logs, drone aerial photogrammetry, boundary validation, and DISCOM interconnection substation audit.",
    },
    {
      step: "02",
      title: "Detailed Architectural Concept",
      detail: "Optimized DC capacity sizing, inverter placement geometry, string lengths, and shadow-free PV layout planning.",
    },
    {
      step: "03",
      title: "Electrical, Civil & Structural SLD",
      detail: "Detailed single-line diagrams, cable schedules, trench details, MMS shop drawings, and transformer sizing.",
    },
    {
      step: "04",
      title: "Statutory Approvals & As-Built",
      detail: "Facilitating CEIG inspectorial clearance, grid synchronisation checklists, and certified as-built engineering packages.",
    },
  ];

  const kpis = [
    { label: "Engineering Accuracy", val: "99.8%" },
    { label: "Design Capacity Delivered", val: "150+ MW" },
    { label: "Substation Voltage Ratings", val: "Up to 220kV" },
    { label: "Statutory Approval Record", val: "100% COD On-Time" },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 / FULL-SCREEN HERO SECTION */}
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
                src="/images/hero-solar.jpg"
                alt="Sarhat Engineering Solutions"
                fill
                priority
                quality={95}
                className="object-cover object-center opacity-85"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/95 pointer-events-none" />
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4E012] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  <Compass className="w-3.5 h-3.5 text-[#D4E012]" />
                  <span>SOLUTIONS • ENGINEERING</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                  Engineering <br />
                  <span className="text-[#D4E012] italic font-normal">Without Compromise</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                  From geotechnical modeling and high-fidelity PVSyst simulations to high-voltage evacuation architecture, Sarhat transforms raw acreage into high-yield clean energy assets.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#D4E012]/20 hover:scale-105 cursor-pointer"
                  >
                    Discuss Engineering Scope
                  </button>
                  <Link
                    href="#specializations"
                    className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all backdrop-blur-sm"
                  >
                    Explore Subheadings
                  </Link>
                </div>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Breadcrumb Bar */}
          <div className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md py-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#707B00] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Solutions Overview</span>
              </Link>
              <div className="text-slate-400 hidden sm:block">
                SOLUTIONS / <span className="text-[#0F172A] font-bold">ENGINEERING</span>
              </div>
            </div>
          </div>

          {/* Subheadings Direct Showcase */}
          <section id="specializations" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-3">Specialized Divisions</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Explore Engineering Subheadings
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Dive into our dedicated engineering centers for deep research and turnkey design specifications.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {subPages.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <ScrollReveal key={sub.href}>
                      <div className="group relative flex flex-col justify-between h-full rounded-3xl border-2 border-slate-200/80 bg-[#F8FAF8] p-8 sm:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6DAD45] hover:shadow-xl">
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-6">
                            <span className="rounded-full bg-[#6DAD45]/10 px-3 py-1 font-mono text-xs font-bold text-[#4f8a2e] border border-[#6DAD45]/20">
                              {sub.badge}
                            </span>
                            <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#6DAD45] group-hover:bg-[#6DAD45] group-hover:text-white transition-colors duration-300">
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>

                          <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-slate-900 mb-3">
                            {sub.title}
                          </h3>
                          <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-6">
                            {sub.desc}
                          </p>
                        </div>

                        <Link
                          href={sub.href}
                          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#707B00] group-hover:text-[#4f8a2e] transition-colors"
                        >
                          <span>{sub.action}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Core Engineering Disciplines */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="max-w-3xl mb-14">
                  <AnimatedPillBadge className="mb-3">TECHNICAL DISCIPLINES</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Bankable Engineering from Concept to Interconnection
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Every calculation is backed by multi-physics modeling, site empirical data, and rigorous structural stress analysis.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((pil) => {
                  const Icon = pil.icon;
                  return (
                    <ScrollReveal key={pil.title}>
                      <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                          <div className="h-10 w-10 rounded-xl bg-[#6DAD45]/10 flex items-center justify-center text-[#6DAD45] mb-4">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-slate-900 text-base mb-2">{pil.title}</h4>
                          <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mb-4">
                            {pil.desc}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 font-mono text-xs text-[#4f8a2e] font-semibold">
                          {pil.metric}
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Workflow Pipeline */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-3">EXECUTION PIPELINE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Our 4-Phase Engineering Framework
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    A systematized workflow eliminating site surprises, project delays, and yield shortfalls.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {workflow.map((wf) => (
                  <ScrollReveal key={wf.step}>
                    <div className="relative rounded-2xl border border-slate-200 bg-[#F8FAF8] p-6 shadow-sm">
                      <div className="font-mono text-3xl font-black text-[#6DAD45]/30 mb-2">{wf.step}</div>
                      <h4 className="font-serif-display text-lg font-medium text-slate-900 mb-2">{wf.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">{wf.detail}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* KPI Strip */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="text-center space-y-1">
                    <div className="text-2xl sm:text-4xl font-mono font-bold text-[#D4E012]">{kpi.val}</div>
                    <div className="text-xs text-slate-300 font-mono uppercase tracking-wider">{kpi.label}</div>
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
