"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Calendar,
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollIndicator from "@/components/ScrollIndicator";

const TOC_ITEMS = [
  { id: "what-is-floating-solar", label: "What is floating solar?" },
  { id: "why-build-on-water", label: "Why build on water" },
  { id: "main-components", label: "Main components" },
  { id: "is-water-body-suitable", label: "Is my water body suitable?" },
  { id: "economics", label: "Economics" },
  { id: "project-steps", label: "Project steps" },
];

export default function SuryaSarovarGuidePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("what-is-floating-solar");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-slate-900 selection:bg-[#D4E012] selection:text-black font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / HERO SECTION (Matching Cinematic Text-Only Format)       */}
        {/* ------------------------------------------------------------- */}
        <section className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none pt-28 pb-8 text-white">
          {/* Background image & dark scrim overlay */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <Image
              src="/images/surya-sarovar.jpg"
              alt="Floating Solar Surya Sarovar Reservoir"
              fill
              priority
              quality={95}
              className="object-cover object-center opacity-80"
            />
            {/* Soft Dark Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div /> {/* Spacer for top alignment under navbar */}

          {/* Main Centered Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center my-auto py-12">
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
              {/* Serif H1 Heading matching format */}
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
                Floating solar systems, <br />
                <span className="italic font-normal text-white">
                  Surya Sarovar <span className="text-[#D4E012]">on water.</span>
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
                className="text-base sm:text-lg text-slate-100 font-normal max-w-3xl text-center leading-relaxed drop-shadow-md mx-auto"
              >
                Conserve precious land, curb reservoir water evaporation, and generate higher solar yields with utility-scale floating PV engineering.
              </motion.p>
            </motion.div>
          </div>

          {/* Animated Mouse Scroll Indicator at Bottom */}
          <div className="relative z-10 pb-4 sm:pb-8 flex justify-center">
            <ScrollIndicator targetId="content" />
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 02 / MAIN ARTICLE LAYOUT WITH STICKY TOC                       */}
        {/* ------------------------------------------------------------- */}
        <section id="content" className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-8">
                  <div>
                    <h2 className="font-mono text-xs font-bold text-[#6DAD45] tracking-[0.2em] uppercase mb-4">
                      ON THIS PAGE
                    </h2>
                    <ul className="border-l-2 border-slate-200 space-y-1">
                      {TOC_ITEMS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => scrollTo(item.id)}
                              className={`block text-left text-xs leading-relaxed py-2 pl-4 -ml-[2px] border-l-2 transition-all cursor-pointer ${isActive
                                ? "border-[#6DAD45] font-bold text-slate-900 bg-[#6DAD45]/5 rounded-r-md"
                                : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-400"
                                }`}
                            >
                              {item.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Sidebar CTA Card */}
                  <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 shadow-sm">
                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-2">
                      READY TO BUILD?
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Talk to a Sarhat project lead about your Surya Sarovar project.
                    </p>
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0B132B] hover:bg-slate-900 text-white font-mono font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full transition-all shadow cursor-pointer"
                    >
                      <span>Discuss</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </aside>

              {/* Article Content */}
              <article className="prose-content max-w-3xl text-slate-800">
                {/* Article Header Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest pb-6 mb-10 border-b border-slate-200">
                  <span>BY SARHAT ENGINEERING TEAM</span>
                  <span>•</span>
                  <span>3 MIN READ</span>
                  <span>•</span>
                  <span>SOLAR ENERGY</span>
                </div>

                {/* Section 1: What is floating solar? */}
                <section id="what-is-floating-solar" className="scroll-mt-28 mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    What is floating solar?
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                    Floating solar, or floating PV (FPV), places solar modules on buoyant platforms on the surface of a water body. The platform is held in position by anchors on the bed or mooring lines to the banks, and the electricity is carried to shore by floating or submerged cables. India has built several large floating plants, including NTPC&apos;s 100 MW plant at Ramagundam in Telangana, and states are actively tendering reservoir-based projects.
                  </p>
                </section>

                {/* Section 2: Why build on water */}
                <section id="why-build-on-water" className="scroll-mt-28 mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Why build on water
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-700 text-base sm:text-lg leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#6DAD45] shrink-0 mt-2.5" />
                      <div>
                        <strong className="font-semibold text-slate-900">No land acquisition.</strong>{" "}
                        Reservoirs and ponds are already owned by the utility, department or company.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-base sm:text-lg leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#6DAD45] shrink-0 mt-2.5" />
                      <div>
                        <strong className="font-semibold text-slate-900">Cooler modules.</strong>{" "}
                        Water keeps module temperatures lower, which supports energy yield.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-base sm:text-lg leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#6DAD45] shrink-0 mt-2.5" />
                      <div>
                        <strong className="font-semibold text-slate-900">Reduced evaporation.</strong>{" "}
                        Covering part of the water surface cuts evaporation losses, valuable for drinking-water and irrigation reservoirs.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-base sm:text-lg leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#6DAD45] shrink-0 mt-2.5" />
                      <div>
                        <strong className="font-semibold text-slate-900">Existing grid nearby.</strong>{" "}
                        Many reservoirs already have hydro or pumping infrastructure with grid connections.
                      </div>
                    </li>
                  </ul>
                </section>

                {/* Section 3: Main components */}
                <section id="main-components" className="scroll-mt-28 mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Main components
                  </h2>
                  <ul className="space-y-3.5">
                    {[
                      "HDPE floats (pure-float or float-plus-frame designs)",
                      "Anchoring and mooring system: bank anchors, dead-weight anchors or piles",
                      "Walkways for maintenance access",
                      "Marine-grade DC cables, combiner boxes and connectors",
                      "Inverters on floating platforms or on shore",
                      "Evacuation to a nearby substation",
                    ].map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 text-base sm:text-lg leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-[#6DAD45] shrink-0 mt-2.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Section 4: Is my water body suitable? */}
                <section id="is-water-body-suitable" className="scroll-mt-28 mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Is my water body suitable?
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                    Good sites have a stable, large surface area, manageable depth, a known water-level range and moderate wind. Poorer sites have very deep water, strong currents, heavy floating debris or extreme water-level swings. We start with a survey of depth (bathymetry), soil at the bed, historical water levels and wind data.
                  </p>

                  {/* SARHAT TIP callout box */}
                  <div className="my-8 rounded-2xl bg-[#F8FAF8] border-l-4 border-[#6DAD45] p-6 shadow-xs">
                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-2">
                      SARHAT TIP
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      Anchoring is the single biggest engineering risk in floating solar. Design it for the full record of water levels at your site, not just the average year.
                    </p>
                  </div>
                </section>

                {/* Section 5: Economics */}
                <section id="economics" className="scroll-mt-28 mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Economics
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                    Floating plants cost more per MW to build than ground-mounted ones because of floats and anchoring. Against that, there is no land cost, yields can be slightly higher, and the plant may sit next to a large captive load such as a water-treatment works or factory. For owners of water bodies, the business case is often strongest as a captive or RESCO project.
                  </p>
                </section>

                {/* Section 6: Project steps */}
                <section id="project-steps" className="scroll-mt-28 mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Project steps
                  </h2>
                  <ol className="space-y-4">
                    {[
                      "Water-body survey and feasibility",
                      "Layout, float and anchoring design",
                      "Approvals from the water-body owner and DISCOM",
                      "Procurement of floats, modules and electrical equipment",
                      "Shore-side assembly and launch",
                      "Anchoring, cabling and commissioning",
                      "Long-term O&M including anchor and float inspection",
                    ].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-slate-700 text-base sm:text-lg leading-relaxed">
                        <span className="font-mono font-bold text-sm text-[#6DAD45] shrink-0 mt-0.5">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  {/* General Disclaimer */}
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      This guide is for general information. Scheme rules, subsidies and charges are set by central and state authorities and change from time to time; always confirm the latest notification before making investment decisions.
                    </p>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 03 / NEXT STEPS: FROM READING TO BUILDING                     */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 sm:py-28 bg-[#0B132B] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mb-12">
                <div className="font-mono text-xs font-bold text-[#D4E012] tracking-[0.2em] uppercase mb-3">
                  NEXT STEPS
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight">
                  From reading to{" "}
                  <span className="text-[#D4E012] italic relative inline-block font-normal">
                    building.
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#D4E012]"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      aria-hidden
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
              </div>
            </ScrollReveal>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Card 1 */}
              <Link
                href="/products/floating-pv/surya-sarovar"
                className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4E012]/50 p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#D4E012] tracking-wider uppercase mb-3">
                    01 • PRODUCT
                  </div>
                  <h3 className="font-serif-display font-bold text-white text-lg mb-2 group-hover:text-[#D4E012] transition-colors">
                    Surya Sarovar
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    What Sarhat delivers, in short.
                  </p>
                </div>
              </Link>

              {/* Card 2 */}
              <Link
                href="/solutions"
                className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4E012]/50 p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#D4E012] tracking-wider uppercase mb-3">
                    02 • SOLUTIONS
                  </div>
                  <h3 className="font-serif-display font-bold text-white text-lg mb-2 group-hover:text-[#D4E012] transition-colors">
                    Engineering → O&M
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    How we develop your project.
                  </p>
                </div>
              </Link>

              {/* Card 3 */}
              <Link
                href="/projects"
                className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4E012]/50 p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#D4E012] tracking-wider uppercase mb-3">
                    03 • PROJECTS
                  </div>
                  <h3 className="font-serif-display font-bold text-white text-lg mb-2 group-hover:text-[#D4E012] transition-colors">
                    Projects in Madhya Pradesh
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    See our work state by state.
                  </p>
                </div>
              </Link>

              {/* Card 4 */}
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4E012]/50 p-6 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#D4E012] tracking-wider uppercase mb-3">
                    04 • DISCUSS
                  </div>
                  <h3 className="font-serif-display font-bold text-white text-lg mb-2 group-hover:text-[#D4E012] transition-colors">
                    Let&apos;s discuss a project
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Talk to a project lead.
                  </p>
                </div>
              </button>
            </div>

            {/* State Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { name: "Surya Sarovar projects in Madhya Pradesh", href: "/projects/madhya-pradesh" },
                { name: "Surya Sarovar projects in Rajasthan", href: "/projects/rajasthan" },
                { name: "Surya Sarovar projects in Uttar Pradesh", href: "/projects/uttar-pradesh" },
              ].map((st, idx) => (
                <Link
                  key={idx}
                  href={st.href}
                  className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4E012]/30 px-4 py-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {st.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 04 / KEEP READING: MORE GUIDES (Icon Cards matching screenshot) */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 sm:py-28 bg-[#F8FAF8] border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                <AnimatedPillBadge className="mb-6">KEEP READING</AnimatedPillBadge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                  More{" "}
                  <span className="text-[#6DAD45] italic relative inline-block">
                    guides.
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      aria-hidden
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
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Guide Card 1 */}
              <ScrollReveal delay={0.1}>
                <Link
                  href="/insights/kusum-guide"
                  className="group block rounded-[26px] bg-white border border-slate-200/90 hover:border-[#6DAD45] p-7 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col justify-between"
                >
                  {/* Pale corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF087]/25 rounded-bl-[56px] pointer-events-none transition-all group-hover:bg-[#EAF087]/45" />

                  <div>
                    {/* Top Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAF8] border border-slate-200/90 flex items-center justify-center mb-6 transition-all group-hover:bg-[#D4E012] group-hover:border-[#D4E012] shadow-xs">
                      <BookOpen className="w-5 h-5 text-slate-700 group-hover:text-black transition-colors" />
                    </div>

                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-3">
                      GUIDE
                    </div>
                    <h3 className="font-serif-display font-bold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-[#6DAD45] transition-colors">
                      PM-KUSUM explained: Components A and C, eligibility, economics and timelines
                    </h3>
                  </div>

                  <div className="pt-6 mt-8 flex items-center gap-1.5 font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>READ GUIDE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>

              {/* Guide Card 2 (Active highlighted style) */}
              <ScrollReveal delay={0.2}>
                <Link
                  href="/insights/open-access-guide"
                  className="group block rounded-[26px] bg-white border border-[#6DAD45] p-7 sm:p-8 relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col justify-between"
                >
                  {/* Pale corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF087]/35 rounded-bl-[56px] pointer-events-none transition-all group-hover:bg-[#EAF087]/50" />

                  <div>
                    {/* Top Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#D4E012] border border-[#D4E012] flex items-center justify-center mb-6 transition-all shadow-xs">
                      <BookOpen className="w-5 h-5 text-black" />
                    </div>

                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-3">
                      GUIDE
                    </div>
                    <h3 className="font-serif-display font-bold text-[#6DAD45] text-lg sm:text-xl leading-snug transition-colors">
                      Solar open access in India: models, charges and how to get started
                    </h3>
                  </div>

                  <div className="pt-6 mt-8 flex items-center gap-1.5 font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>READ GUIDE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>

              {/* Guide Card 3 */}
              <ScrollReveal delay={0.3}>
                <Link
                  href="/products/floating-pv/canal-top"
                  className="group block rounded-[26px] bg-white border border-slate-200/90 hover:border-[#6DAD45] p-7 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col justify-between"
                >
                  {/* Pale corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF087]/25 rounded-bl-[56px] pointer-events-none transition-all group-hover:bg-[#EAF087]/45" />

                  <div>
                    {/* Top Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAF8] border border-slate-200/90 flex items-center justify-center mb-6 transition-all group-hover:bg-[#D4E012] group-hover:border-[#D4E012] shadow-xs">
                      <BookOpen className="w-5 h-5 text-slate-700 group-hover:text-black transition-colors" />
                    </div>

                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-3">
                      GUIDE
                    </div>
                    <h3 className="font-serif-display font-bold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-[#6DAD45] transition-colors">
                      Canal-top and canal-bank solar: a guide for irrigation departments and utilities
                    </h3>
                  </div>

                  <div className="pt-6 mt-8 flex items-center gap-1.5 font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>READ GUIDE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 05 / DEDICATED SURYA SAROVAR PROJECT CTA SECTION              */}
        {/* ------------------------------------------------------------- */}
        <section id="discuss" className="py-14 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="bg-[#0B132B] text-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
                {/* Ambient glow behind right buttons */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
                  <div>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-white tracking-tight leading-[1.12] mb-4">
                      Ready to build your <br />
                      <span className="text-[#D4E012] italic relative inline-block font-normal">
                        Surya Sarovar project?
                        <svg
                          className="absolute -bottom-2 left-0 w-full h-3 text-[#D4E012]"
                          viewBox="0 0 100 20"
                          preserveAspectRatio="none"
                          aria-hidden
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
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6 sm:mb-8 font-light">
                      Bring your site, roof, load or tender details. We&apos;ll review feasibility and share a clear execution path.
                    </p>

                    {/* Contact details row */}
                    <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm text-slate-300">
                      <a
                        href="mailto:info@sarhatenergy.com"
                        className="flex items-center gap-2 hover:text-[#D4E012] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#D4E012]" />
                        <span>info@sarhatenergy.com</span>
                      </a>
                      <a
                        href="tel:+919266711125"
                        className="flex items-center gap-2 hover:text-[#D4E012] transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#D4E012]" />
                        <span>+91 9266 7111 25</span>
                      </a>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D4E012]" />
                        <span>Ghaziabad, U.P., India</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons on the right */}
                  <div className="flex flex-col gap-3.5 sm:min-w-[250px]">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-mono font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#D4E012]/20 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>LET&apos;S DISCUSS A PROJECT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <Link
                      href="/contact?product=Surya+Sarovar#inquiry"
                      className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all cursor-pointer whitespace-nowrap hover:border-white/40"
                    >
                      <span>OPEN ENQUIRY PAGE</span>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />

        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          defaultProduct="Surya Sarovar"
        />
      </main>
    </SmoothScroll>
  );
}
