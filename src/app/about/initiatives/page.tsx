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
import {
  Leaf,
  Sprout,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  ShieldCheck,
  TrendingUp,
  Compass,
} from "lucide-react";

export default function InitiativesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax & Scroll Fade-out Tracking for Hero
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

  const initiatives = [
    {
      id: "net-zero",
      href: "/about/initiatives/net-zero",
      tag: "DECARBONIZATION & TRANSITION",
      title: "Net Zero Infrastructure",
      subtitle: "Accelerating Enterprise Decarbonization",
      description:
        "Our Net Zero initiative drives enterprise transition towards 100% renewable energy utilization. By combining utility-scale solar generation, peak-shaving Battery Energy Storage Systems (BESS), and green microgrid architecture, Sarhat helps corporate partners eliminate Scope 1 and Scope 2 carbon emissions.",
      highlights: [
        "Turnkey Corporate PPA & Open Access Solar Projects",
        "Utility BESS Integration for 24/7 Green Power Dispatch",
        "Industrial Campus Decarbonization Blueprints",
        "Carbon Credit & Offsetting Framework Audits",
      ],
      stat: "500,000+ Tons",
      statLabel: "Annual CO2 Avoidance Potential",
      icon: Leaf,
      image: "/images/substation-project.jpg",
    },
    {
      id: "agrovoltaics",
      href: "/about/initiatives/agrovoltaics",
      tag: "DUAL-USE SUSTAINABILITY",
      title: "AgroVoltaics (PM-KUSUM)",
      subtitle: "Harvesting Solar Energy & Sustainable Crops Together",
      description:
        "AgroVoltaics integrates elevated solar PV tracking structures (2.5m+ ground clearance) above active farmland. Under the PM-KUSUM scheme, Sarhat empowers farmers with guaranteed dual income streams—agricultural produce beneath and clean power generation above.",
      highlights: [
        "Elevated MMS Structures (2.5m+ Ground Clearance)",
        "Shade-tolerant crop cultivation integration",
        "Dual income model for rural farming communities",
        "Micro-irrigation & solar water pumping synergies",
      ],
      stat: "1,200+ Acres",
      statLabel: "Dual-Use Farmland Optimization",
      icon: Sprout,
      image: "/images/agrivoltaics-project.jpg",
    },
    {
      id: "field-exchange",
      href: "/about/initiatives/field-exchange",
      tag: "WORKFORCE & COMMUNITY",
      title: "Field Exchange Program",
      subtitle: "Local Technician Upskilling & Academic Transfer",
      description:
        "Field Exchange is Sarhat's community-driven learning program. We bridge the gap between engineering academia and ground-level infrastructure delivery by training local technicians, electrical apprentices, and civil crews at active project locations.",
      highlights: [
        "Hands-on electrical safety & relay protection training",
        "Empanelled technician certification courses",
        "Local community hiring & economic empowerment",
        "Site safety & quality control standard compliance",
      ],
      stat: "1,500+ Trained",
      statLabel: "Local Engineers & Technicians",
      icon: GraduationCap,
      image: "/images/hero-solar.jpg",
    },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky Background Image Overlay Hero) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none"
          >
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/agrivoltaics-project.jpg"
                alt="Sarhat Sustainable Initiatives"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/95 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center will-change-transform"
            >
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center">


                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                    Pioneering Sustainable Growth <br />
                    <span className="text-[#D4E012] italic font-normal">&amp; Social Impact</span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-200 max-w-5xl text-center leading-relaxed font-normal drop-shadow-md">
                    Beyond engineering execution, Sarhat actively drives transformative initiatives in industrial Net Zero transition, agricultural dual-use solar, and community skill upskilling.
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* Main Content Sections (Slides UP over static Hero) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* ------------------------------------------------------------- */}
          {/* SECTION 01: INITIATIVE OVERVIEW & PILLARS */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6DAD45]/15 border border-[#6DAD45]/30 text-[#6DAD45] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                    <Compass className="w-3.5 h-3.5 text-[#6DAD45]" />
                    <span>OUR THREE INITIATIVES</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Three Pillars of <span className="bg-gradient-to-r from-[#6DAD45] via-[#707B00] to-[#16A34A] bg-clip-text text-transparent italic font-serif-display">Sustainable Value</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
                    Combining environmental stewardship, agricultural dual-use solar, and workforce technical upskilling.
                  </p>
                </div>
              </ScrollReveal>

              {/* Quick Jump Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {initiatives.map((item, index) => {
                  const IconComp = item.icon;
                  return (
                    <ScrollReveal key={item.id} direction="up" distance={40} delay={index * 0.1}>
                      <a
                        href={`#${item.id}`}
                        className="bg-[#F8FAF8] border-2 border-slate-200/90 hover:border-[#6DAD45] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden"
                      >
                        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#6DAD45]/10 rounded-full blur-2xl group-hover:bg-[#6DAD45]/25 transition-all duration-500 pointer-events-none" />

                        <div>
                          <div className="w-14 h-14 rounded-2xl bg-[#6DAD45]/15 border border-[#6DAD45]/30 flex items-center justify-center text-[#6DAD45] group-hover:bg-[#6DAD45] group-hover:text-white transition-colors duration-300 mb-6">
                            <IconComp className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono font-extrabold text-[#6DAD45] uppercase tracking-widest block mb-2">
                            {item.tag}
                          </span>
                          <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-2 group-hover:text-[#6DAD45] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                            {item.subtitle}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono font-bold text-[#6DAD45]">
                          <span>Explore Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </a>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 02: INITIATIVE SHOWCASE CARDS */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
              {initiatives.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <div key={item.id} id={item.id} className="scroll-mt-32">
                    <ScrollReveal direction="up" distance={40}>
                      <div className="bg-white border-2 border-slate-200/90 rounded-[32px] p-8 sm:p-12 shadow-xl hover:shadow-2xl relative overflow-hidden transition-all duration-300 group">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                          {/* Image Showcase Frame */}
                          <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                            <div className="relative h-[300px] sm:h-[380px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-5 left-5 right-5">
                                <span className="text-[11px] font-mono text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                                  {item.title} Active Program
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Content Breakdown */}
                          <div className={`lg:col-span-7 space-y-6 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#6DAD45]/15 border border-[#6DAD45]/30 flex items-center justify-center text-[#6DAD45]">
                                <IconComp className="w-5 h-5" />
                              </div>
                              <span className="text-xs font-mono font-bold text-[#6DAD45] uppercase tracking-wider">
                                {item.tag}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-2">
                                {item.title}
                              </h3>
                              <p className="text-sm sm:text-base font-mono font-bold text-[#707B00]">
                                {item.subtitle}
                              </p>
                            </div>

                            <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
                              {item.description}
                            </p>

                            {/* Stat Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F8FAF8] border border-slate-200 text-slate-900">
                              <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#6DAD45]">
                                {item.stat}
                              </span>
                              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                                {item.statLabel}
                              </span>
                            </div>

                            {/* Key Highlights */}
                            <div className="space-y-3 pt-2">
                              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                                PROGRAM DELIVERABLES
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {item.highlights.map((h) => (
                                  <div key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                    <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                                    <span>{h}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Links */}
                            <div className="pt-4 flex flex-wrap items-center gap-4">
                              <Link
                                href={item.href}
                                className="bg-gradient-to-r from-[#6DAD45] to-[#5EE72D] hover:from-[#5cb338] hover:to-[#4ed423] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md shadow-[#6DAD45]/20 hover:scale-105 inline-flex items-center gap-2"
                              >
                                <span>Learn More &amp; Dedicated Page</span>
                                <ArrowRight className="w-4 h-4 text-slate-950" />
                              </Link>

                              <button
                                onClick={() => setQuoteModalOpen(true)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all cursor-pointer"
                              >
                                Partner On This Initiative
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 03: IMPACT CTA BANNER */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-4 max-w-2xl">
                    <span className="text-xs font-mono text-[#D4E012] font-bold uppercase tracking-widest block">
                      BUILDING LASTING VALUE
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight">
                      Ready to build clean energy <br />
                      <span className="text-[#D4E012]">with social &amp; environmental impact?</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      Whether you are looking to decarbonize corporate operations, deploy PM-KUSUM AgroVoltaic solar, or launch technician training in your region, Sarhat is your trusted partner.
                    </p>
                  </div>

                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl shadow-[#D4E012]/30 hover:scale-105 shrink-0 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>START A CONVERSATION</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>

        {/* Quote Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
