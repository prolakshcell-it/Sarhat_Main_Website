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
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Layers,
  Zap,
  Building2,
  PackageCheck,
  ClipboardCheck,
  Factory,
  TrendingDown,
} from "lucide-react";

export default function SupplyChainPage() {
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

  const procurementPillars = [
    {
      icon: Factory,
      tag: "CORE ASSET",
      title: "Tier-1 ALMM Solar Modules",
      desc: "Direct OEM framework agreements for N-Type TOPCon and Mono-PERC high-density bifacial modules strictly adhering to MNRE ALMM and BIS guidelines.",
      spec: "100% ALMM / BIS Certified",
    },
    {
      icon: Zap,
      tag: "CONVERSION POWER",
      title: "String & Central Inverters",
      desc: "High-efficiency string inverters (250kW - 350kW) and containerized central inverters with built-in SVG night support, anti-PID, and AFCI safety.",
      spec: "99.0%+ Euro Efficiency",
    },
    {
      icon: Layers,
      tag: "STRUCTURAL METALLURGY",
      title: "Galvanized Steel MMS Profiles",
      desc: "Heavy-gauge hot-dip galvanized (80+ microns) and Galvalume / POSMAC steel columns and purlins engineered for 25-year corrosive soil survival.",
      spec: "80μm HDG & POSMAC",
    },
    {
      icon: Building2,
      tag: "SUBSTATION BOP",
      title: "High-Voltage Power Transformers",
      desc: "33kV / 132kV / 220kV oil-immersed inverter duty transformers, SF6 switchgear, lightning arrestors, and numerical relay panels from certified OEMs.",
      spec: "Type Tested & CEIG Ready",
    },
    {
      icon: ClipboardCheck,
      tag: "QUALITY GOVERNANCE",
      title: "Pre-Dispatch Factory Inspections (PDI)",
      desc: "Witnessed flash testing, EL imaging crack checks, IV curve audits, and galvanization thickness verification before components leave the manufacturing line.",
      spec: "Zero-Defect Dispatch",
    },
    {
      icon: Truck,
      tag: "JUST-IN-TIME DELIVERY",
      title: "Multi-State Heavy Site Logistics",
      desc: "Synchronized container transit, flatbed hydraulic logistics, on-site staging yards, and zero-breakage material management across rugged terrains.",
      spec: "Pan-India Freight Network",
    },
  ];

  const vendorProtocol = [
    {
      step: "01",
      title: "OEM Qualification Audit",
      detail: "Factory financial strength, manufacturing automation level, Tier-1 status, and raw cell wafer provenance verification.",
    },
    {
      step: "02",
      title: "Technical Compliance Matrix",
      detail: "Alignment with Sarhat site specifications, warranty clauses (12-yr product / 30-yr performance), and degradation guarantees.",
    },
    {
      step: "03",
      title: "Witnessed Factory Testing (PDI)",
      detail: "Independent third-party laboratory verification, electroluminescence micro-crack scans, and batch flash test verification.",
    },
    {
      step: "04",
      title: "On-Site Delivery & Ingestion",
      detail: "Barcoded pallet check-in, visual transit inspection, weatherproof warehouse storage, and controlled delivery to string teams.",
    },
  ];

  const stats = [
    { label: "ALMM Compliance", val: "100%" },
    { label: "Components Sourced", val: "150+ MW" },
    { label: "Active Tier-1 Partners", val: "40+" },
    { label: "Transit Breakage Rate", val: "<0.01%" },
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
                src="/images/partner-hero-bg.jpg"
                alt="Sarhat Supply Chain Management"
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
                  <Truck className="w-3.5 h-3.5 text-[#D4E012]" />
                  <span>SOLUTIONS • SUPPLY CHAIN</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                  Supply Chain <br />
                  <span className="text-[#D4E012] italic font-normal">&amp; Procurement Excellence</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-200 max-w-3xl text-center leading-relaxed font-normal drop-shadow-md">
                  Leveraging strategic OEM relationships, rigorous factory pre-dispatch inspections, and seamless logistics across India to deliver tier-1 clean energy equipment on schedule.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#D4E012]/20 hover:scale-105 cursor-pointer"
                  >
                    Partner on Procurement
                  </button>
                  <Link
                    href="/supply-partners"
                    className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all backdrop-blur-sm"
                  >
                    Vendor Portal →
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
                SOLUTIONS / <span className="text-[#0F172A] font-bold">SUPPLY CHAIN MANAGEMENT</span>
              </div>
            </div>
          </div>

          {/* Sourcing Capabilities Grid */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="max-w-3xl mb-14">
                  <AnimatedPillBadge className="mb-3">STRATEGIC SOURCING</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    End-to-End Equipment Sourcing &amp; Quality Governance
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    We eliminate supply risk by enforcing uncompromising factory qualification, multi-point pre-dispatch inspections, and locked-in delivery schedules.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {procurementPillars.map((item) => {
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
                            {item.desc}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between font-mono text-xs">
                          <span className="text-slate-500">Quality Spec</span>
                          <span className="font-bold text-[#4f8a2e]">{item.spec}</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quality Protocol Pipeline */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-3">QUALITY ASSURANCE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Our 4-Stage Vendor Governance Protocol
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Ensuring zero defective modules, out-of-spec structural steel, or sub-par transformers ever reach your site.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {vendorProtocol.map((vp) => (
                  <ScrollReveal key={vp.step}>
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="font-mono text-3xl font-black text-[#6DAD45]/30 mb-2">{vp.step}</div>
                      <h4 className="font-serif-display text-lg font-medium text-slate-900 mb-2">{vp.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">{vp.detail}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Stats Strip */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white">
                {stats.map((s) => (
                  <div key={s.label} className="text-center space-y-1">
                    <div className="text-2xl sm:text-4xl font-mono font-bold text-[#D4E012]">{s.val}</div>
                    <div className="text-xs text-slate-300 font-mono uppercase tracking-wider">{s.label}</div>
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
