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
  Sparkles,
  Cpu,
  Layers,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sun,
  ShieldCheck,
  Binary,
  Microscope,
  Workflow,
} from "lucide-react";

export default function EngineeringInnovationPage() {
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

  const innovationPillars = [
    {
      icon: Binary,
      tag: "COMPUTATIONAL DESIGN",
      title: "Algorithmic 3D Topo-Fitting",
      description:
        "Proprietary CAD automation engines adapt module pitch and table heights directly to complex undulating ground profiles, cutting civil cut-and-fill by up to 40%.",
      stat: "-40% Earthwork",
    },
    {
      icon: Sun,
      tag: "YIELD BOOST",
      title: "Bifacial Albedo Modeling",
      description:
        "Sub-hourly optical ray-tracing simulations predict backside solar irradiance across seasonal ground covers, capturing an extra 8–15% bifacial energy yield.",
      stat: "+12% Net Generation",
    },
    {
      icon: Layers,
      tag: "DUAL-USE ARCHITECTURE",
      title: "Agrivoltaic Elevated Structures",
      description:
        "Custom high-clearance (2.5m+) structural frames allowing tractors and agricultural equipment to work safely under active PV generation panels.",
      stat: "Dual-Use Land",
    },
    {
      icon: Zap,
      tag: "STORAGE & HYBRID",
      title: "DC-Coupled BESS Architecture",
      description:
        "Minimizing inverter conversion stages through DC-coupled solar-plus-storage integration, enhancing round-trip storage efficiency above 88%.",
      stat: "88%+ Round-Trip Eff.",
    },
    {
      icon: Cpu,
      tag: "ASSET INTELLIGENCE",
      title: "Digital Twin Predictive Modeling",
      description:
        "Real-time sensor telemetry paired with digital physics twins continuously flags minor string anomalies before they degrade plant performance ratios.",
      stat: "Predictive O&M",
    },
    {
      icon: Microscope,
      tag: "MATERIALS R&D",
      title: "Corrosion-Proof Pre-Galvanized MMS",
      description:
        "Engineered POSMAC and high-strength zinc-aluminum-magnesium coatings tailored for high-salinity and aggressive alkaline soil conditions.",
      stat: "C5-M Corrosion Life",
    },
  ];

  const comparisonRows = [
    {
      criteria: "Terrain Adaptation",
      conventional: "Flat grading required; heavy earthwork and soil disruption",
      sarhat: "Algorithmic 3D contour fitting preserving natural ground contours",
    },
    {
      criteria: "Bifacial Calculation",
      conventional: "Standard nominal 5% flat multiplier assumption",
      sarhat: "View-factor ray-tracing modeling specific ground albedo profiles",
    },
    {
      criteria: "Cable Loss Optimization",
      conventional: "Standard 2.0% - 2.5% ohmic DC losses accepted",
      sarhat: "String grouping optimization constraining DC cable loss below 1.2%",
    },
    {
      criteria: "Structural Durability",
      conventional: "Generic wind load tables without local topography dynamics",
      sarhat: "Computational fluid dynamics (CFD) and aero-elastic boundary testing",
    },
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
                alt="Sarhat Engineering Innovation"
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4E012] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4E012]" />
                  <span>ENGINEERING • INNOVATION</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                  Next-Generation <br />
                  <span className="text-[#D4E012] italic font-normal">Engineering Innovation</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                  Pioneering computational topography modeling, bifacial albedo ray-tracing, and hybrid BESS DC coupling to unlock the highest generation yields per hectare.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#D4E012]/20 hover:scale-105 cursor-pointer"
                  >
                    Request Innovation Brief
                  </button>
                  <Link
                    href="/solutions/engineering/system-design"
                    className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all backdrop-blur-sm"
                  >
                    View System Design →
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
                href="/solutions/engineering"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#707B00] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Engineering Overview</span>
              </Link>
              <div className="text-slate-400 hidden sm:block">
                SOLUTIONS / ENGINEERING / <span className="text-[#0F172A] font-bold">INNOVATION</span>
              </div>
            </div>
          </div>

          {/* Core Innovation Pillars */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="max-w-3xl mb-14">
                  <AnimatedPillBadge className="mb-3">INNOVATION VECTOR</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Technology-Driven Energy Yield Multipliers
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Discover how Sarhat integrates cutting-edge simulation, material science, and automation into renewable energy engineering.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {innovationPillars.map((item) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.title}>
                      <div className="group relative h-full flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F8FAF8] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6DAD45] hover:shadow-xl">
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[11px] font-bold text-[#4f8a2e] uppercase tracking-wider bg-[#6DAD45]/10 px-2.5 py-1 rounded-md">
                              {item.tag}
                            </span>
                            <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#6DAD45] group-hover:bg-[#6DAD45] group-hover:text-white transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                          </div>

                          <h3 className="font-serif-display text-xl sm:text-2xl font-medium text-slate-900 mb-3">
                            {item.title}
                          </h3>
                          <p className="text-slate-600 font-light text-sm leading-relaxed mb-6">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between font-mono text-xs">
                          <span className="text-slate-500">Benchmark Impact</span>
                          <span className="font-bold text-[#4f8a2e]">{item.stat}</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benchmark Comparison Table */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <AnimatedPillBadge className="mb-3">BENCHMARK COMPARISON</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Conventional EPC vs. Sarhat Innovative Engineering
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    The measurable difference between generic template design and our research-led engineering rigor.
                  </p>
                </div>
              </ScrollReveal>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-900 text-white font-mono text-xs uppercase tracking-wider">
                        <th className="p-5 sm:p-6">Parameter</th>
                        <th className="p-5 sm:p-6 text-slate-400">Conventional Industry Approach</th>
                        <th className="p-5 sm:p-6 text-[#D4E012]">Sarhat Engineering Innovation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {comparisonRows.map((row) => (
                        <tr key={row.criteria} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-5 sm:p-6 font-bold text-slate-900">{row.criteria}</td>
                          <td className="p-5 sm:p-6 text-slate-500 font-light">{row.conventional}</td>
                          <td className="p-5 sm:p-6 text-slate-800 font-medium bg-[#6DAD45]/5">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                              <span>{row.sarhat}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cross-Link Card to System Design */}
              <div className="mt-14 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="font-mono text-xs text-[#D4E012] uppercase tracking-wider mb-2">Next Specialization</div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-medium">
                    Looking for Detailed System Design &amp; SLDs?
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 max-w-xl font-light">
                    Explore our electrical switchyard configurations, string layout optimization, and transformer sizing workflows.
                  </p>
                </div>
                <Link
                  href="/solutions/engineering/system-design"
                  className="shrink-0 bg-white text-slate-900 hover:bg-[#D4E012] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all inline-flex items-center gap-2"
                >
                  <span>Explore System Design</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
