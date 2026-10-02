"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import FivePrinciplesInteractive from "@/components/FivePrinciplesInteractive";
import TurnkeyLifecycle from "@/components/TurnkeyLifecycle";
import FinalCTA from "@/components/FinalCTA";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import {
  ChevronRight,
  ArrowRight,
  Quote,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function OurApproachPage() {
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

  // Delivered projects dataset
  const deliveredProjects = [
    {
      id: "ayu-tolgoi",
      category: "SOLAR EPC",
      region: "ASIA & INDIA",
      title: "Unlocking High-Yield Solar EPC at Scale",
      description:
        "Delivering complex utility-scale solar PV infrastructure in challenging terrain with tier-1 BOM compliance and zero-defect grid charging.",
      image: "/images/substation-project.jpg",
    },
    {
      id: "sabic-geleen",
      category: "WIND & HYBRID",
      region: "GLOBAL INFRASTRUCTURE",
      title: "Integrated Wind & Hybrid Clean Energy Portfolio",
      description:
        "Long-term partnership delivering turnkey EPCM for high-efficiency clean energy integration across complex industrial manufacturing facilities.",
      image: "/images/agrivoltaics-project.jpg",
    },
    {
      id: "germany-gas",
      category: "GRID SUBSTATION",
      region: "PAN-INDIA DISCOM",
      title: "Fast-Tracking 132kV/220kV Grid Evacuation Bays",
      description:
        "How execution-led engineering helped us deliver critical high-voltage grid substations in months with full regulatory clearance.",
      image: "/images/bess-substation.jpg",
    },
    {
      id: "bp-oman",
      category: "BESS STORAGE",
      region: "HYBRID STORAGE",
      title: "Partnering for Utility-Scale Battery Storage",
      description:
        "Boosting grid stability and round-the-clock availability with high-density BESS battery storage integration and SCADA automation.",
      image: "/images/hero-solar.jpg",
    },
  ];

  // Turnkey execution steps roadmap
  const executionSteps = [
    {
      step: "01",
      title: "Feasibility & Engineering",
      desc: "Detailed site survey, solar resource mapping, soil resistivity testing, grid tie-in studies, and EHV line route clearance.",
    },
    {
      step: "02",
      title: "Procurement & Quality",
      desc: "Tier-1 solar module procurement, string inverter flash testing, EHV cabling specs, and transformer factory audits.",
    },
    {
      step: "03",
      title: "Civil & Structural Works",
      desc: "Precision piling, MMS mounting structures, invertor rooms, access roads, and substation civil foundation works.",
    },
    {
      step: "04",
      title: "Electrical Integration",
      desc: "DC/AC cabling, SCADA telemetry integration, 33kV/132kV bay commissioning, and DISCOM synchronization.",
    },
  ];

  // Delivery benefits checklist
  const deliveryBenefits = [
    "Cost and quality certainty",
    "Schedule predictability",
    "Reduced rework",
    "Improved safety outcomes",
    "Fewer handovers",
    "Operational readiness",
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0" />

        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / FULL-SCREEN HERO SECTION (Matching Insights & About layout) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none"
          >
            {/* Background Image Layer */}
            <motion.div
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Energy Infrastructure Background"
                fill
                priority
                quality={95}
                className="object-cover object-center opacity-80"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
              {/* Soft Dark Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
            </motion.div>

            {/* Main Centered Content */}
            <motion.div
              style={{
                y: contentY,
                scale: contentScale,
                opacity: contentOpacity,
                filter: contentFilter,
              }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-28 flex flex-col items-center text-center will-change-transform"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="max-w-4xl flex flex-col items-center text-center"
              >
                {/* Serif H1 Heading matching Insights page design format */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl drop-shadow-lg"
                >
                  As project risk falls, <br />
                  <span className="italic font-normal text-white">
                    Sarhat <span className="text-[#D4E012]">value rises.</span>
                  </span>
                </motion.h1>

                {/* Subtitle Description */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="text-base sm:text-lg text-slate-100 font-normal max-w-5xl text-center leading-relaxed drop-shadow-md"
                >
                  Engineering discipline, site-first execution, and transparent handoffs that eliminate friction and maximize asset yields across India&apos;s clean energy transition.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Animated Mouse Scroll Indicator at Bottom */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MAIN SLIDING CONTENT OVERLAY */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          
          {/* 02 / FROM CONCEPT TO COMPLETION WE DELIVER (Placed Right After Hero) */}
          <section className="py-20 sm:py-28 bg-[#F8FAF8] text-[#0F172A] relative border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <ScrollReveal>
                    <AnimatedPillBadge className="mb-2">
                      END-TO-END CAPABILITY
                    </AnimatedPillBadge>

                    <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight">
                      From concept to completion, <br />
                      <span className="text-[#6DAD45]">we deliver</span>
                    </h2>

                    <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed pt-2 font-normal">
                      <p>
                        Customers need confidence that projects will be delivered
                        safely, predictably and efficiently across the full
                        lifecycle. They need a trusted delivery partner who can
                        manage complexity, reduce risk and accelerate value.
                      </p>
                      <p>
                        Full Project Delivery means we deliver from concept through
                        engineering, procurement, construction and commissioning
                        (EPC/EPCM) and operational readiness. Our AI and
                        digitally-enabled approach helps customers make better
                        decisions and improve project certainty through an
                        integrated, accountable delivery model.
                      </p>
                      <p className="font-semibold text-[#0F172A]">
                        Whether it&apos;s full EPC/EPCM, single or multiple phases,
                        we bring clear accountability for integrating delivery from
                        start to finish.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Badge Grid Column */}
                <div className="lg:col-span-5">
                  <ScrollReveal delay={0.2}>
                    <div className="bg-white border-2 border-[#5EE72D]/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                        {deliveryBenefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 bg-[#F8FAF8] p-4 rounded-2xl border border-emerald-100 shadow-sm hover:border-[#6DAD45] hover:shadow-md transition-all group"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#5EE72D] flex items-center justify-center text-black shrink-0 font-bold shadow-md shadow-[#5EE72D]/30 group-hover:scale-110 transition-transform">
                              <ChevronRight className="w-5 h-5 stroke-[3] text-black" />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* 03 / 5 PRINCIPLES INTERACTIVE SECTION (Obsidian Emerald Theme matching About page values) */}
          <section className="py-24 bg-[#09120B] border-b border-slate-800/90 relative z-10 text-white overflow-hidden select-none">
            {/* Soft Radial Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#D4E012]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal>
                <FivePrinciplesInteractive
                  onOpenQuote={() => setQuoteModalOpen(true)}
                />
              </ScrollReveal>
            </div>
          </section>

          {/* 04 / TURNKEY EXECUTION LIFECYCLE ROADMAP */}
          <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 text-[#0F172A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-3">
                    STEP-BY-STEP WORKFLOW
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#0F172A] tracking-tight">
                    Turnkey Execution Lifecycle
                  </h2>
                </div>
              </ScrollReveal>

              <TurnkeyLifecycle steps={executionSteps} />
            </div>
          </section>

          {/* 05 / PROJECTS DELIVERED SECTION */}
          <section className="py-20 sm:py-28 bg-[#F8FAF8] text-[#0F172A] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-14 text-center max-w-3xl mx-auto">
                  <AnimatedPillBadge className="mb-3">
                    TRACK RECORD
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#0F172A] tracking-tight mb-3">
                    Projects delivered
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg font-light">
                    See how we&apos;re delivering in the real world across utility solar, wind, and storage.
                  </p>
                </div>
              </ScrollReveal>

              {/* Grid of 4 Case Study Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deliveredProjects.map((project, index) => (
                  <ScrollReveal key={project.id} delay={index * 0.1}>
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-1">
                      {/* Card Image Container */}
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute top-3 right-3 bg-[#D4E012] text-black text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                          {project.category}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                        <div>
                          <span className="text-[11px] font-mono font-bold text-[#6DAD45] uppercase tracking-widest block mb-2">
                            | {project.region}
                          </span>
                          <h3 className="text-base font-bold text-[#0F172A] mb-3 line-clamp-2 leading-snug group-hover:text-[#6DAD45] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3 font-light">
                            {project.description}
                          </p>
                        </div>

                        <button
                          onClick={() => setQuoteModalOpen(true)}
                          className="text-xs font-bold text-[#0F172A] bg-[#D4E012] hover:bg-[#b8c40e] px-4 py-2.5 rounded-full transition-all text-left flex items-center justify-between group-hover:pr-3 cursor-pointer shadow-sm"
                        >
                          <span>Read the case study</span>
                          <ArrowRight className="w-3.5 h-3.5 text-black" />
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* 06 / OWNING THE OUTCOME AT EVERY PHASE (Brand Theme matching Sarhat Design System) */}
          <section className="py-20 sm:py-28 bg-[#F8FAF8] text-[#0F172A] relative overflow-hidden border-b border-slate-200/80">
            {/* Ambient Soft Brand Glow Flares */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[500px] h-[500px] bg-[#6DAD45]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#D4E012]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Stat Block */}
                <div className="lg:col-span-6 space-y-6">
                  <ScrollReveal>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6DAD45]/15 border border-[#6DAD45]/30 text-[#6DAD45] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#6DAD45]" />
                      <span>PARTNERSHIP EXCELLENCE</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight">
                      Owning the outcome at every phase
                    </h2>
                    <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed max-w-lg">
                      An extension of your team, supporting complex clean energy project
                      delivery from start to finish.
                    </p>

                    <div className="pt-4">
                      <div className="text-6xl sm:text-8xl font-extrabold font-mono text-[#6DAD45] tracking-tight drop-shadow-sm">
                        150+
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-md mt-2 leading-relaxed">
                        active customer portfolios, including partnerships spanning
                        more than 20 years with customers across renewable IPPs,
                        utilities, and infrastructure leaders.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Quote Card Block (Dark Brand Theme Card) */}
                <div className="lg:col-span-6">
                  <ScrollReveal delay={0.2}>
                    <div className="bg-[#0F172A] border border-slate-800 text-white rounded-3xl p-8 sm:p-12 relative shadow-2xl overflow-hidden group">
                      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#6DAD45]/15 rounded-full blur-2xl group-hover:bg-[#6DAD45]/25 transition-all duration-500 pointer-events-none" />

                      <Quote className="w-12 h-12 text-[#6DAD45] mb-4 fill-[#6DAD45]" />
                      <blockquote className="text-xl sm:text-3xl font-serif-display font-medium text-white leading-relaxed mb-8">
                        &ldquo;A great partner is someone who becomes a true business
                        partner. That&apos;s how we felt about Sarhat from the
                        beginning.&rdquo;
                      </blockquote>
                      <div>
                        <div className="font-bold text-[#D4E012] text-base">
                          Glenfarne Group
                        </div>
                        <div className="text-xs font-mono text-slate-400 mt-1">
                          Source: Sarhat Investor &amp; Partner Summit
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* 07 / FINAL CTA COMPONENT (Site-wide Standard) */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />

          <Footer />
        </div>

        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
