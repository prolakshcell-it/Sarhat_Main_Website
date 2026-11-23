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
import { useHeroScroll } from "@/hooks/useHeroScroll";
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
  Factory,
  HardHat,
  Wrench,
  ClipboardCheck,
} from "lucide-react";

export default function InitiativesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax & Scroll Fade-out Tracking for Hero
  const {
    isPastHero,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  } = useHeroScroll();

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky Background Image Overlay Hero) */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
            }`}
          aria-hidden={isPastHero}>
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/agrivoltaics-project.jpg"
                alt="Sarhat Sustainable Initiatives - Where we're putting new ideas to work"
                fill
                priority
                className="object-cover object-center opacity-95" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Balanced Dark Gradient Overlay Scrim for centered content readability */}
              <div className="absolute inset-0 bg-black/45 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 sm:pt-32 pb-6 my-auto flex flex-col items-center text-center will-change-transform">
              <ScrollReveal direction="up" distance={30} className="w-full">
                <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
                  {/* Eyebrow Label matching mockup */}
                  <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/90 uppercase mb-4 sm:mb-6 font-mono text-center">
                    SARHAT INITIATIVES
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif-display font-medium tracking-tight text-white leading-[1.12] mb-5 sm:mb-6 text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    Where we’re putting{" "}
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)] mt-1">
                      new ideas to work.
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full h-3 text-[#D4E012]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-2xl text-center leading-relaxed mb-8 drop-shadow-md mx-auto">
                    Explore our work on industrial decarbonisation, agrivoltaics and hands-on training for site teams and local technicians.
                  </p>

                  {/* Call to action button matching Culture & People "How We Work" button */}
                  <button
                    type="button"
                    onClick={() => {
                      const target = document.getElementById("initiatives-overview") || document.getElementById("pillars");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-white/60 hover:border-white bg-black/20 hover:bg-white/10 text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]">
                    <span>Explore Our Initiatives</span>
                    <span className="text-sm">↓</span>
                  </button>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />


        {/* Main Content Sections (Slides UP over static Hero) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* ------------------------------------------------------------- */}
          {/* SECTION 01: OUR INITIATIVES OVERVIEW CARDS */}
          {/* ------------------------------------------------------------- */}
          <section id="initiatives-overview" className="py-12 sm:py-16 md:py-20 bg-white border-b border-slate-200/80 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Clean Section Heading matching Image 2 */}
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight">
                    Our{" "}
                    <span className="text-[#6DAD45] italic font-normal relative inline-block">
                      initiatives
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>
                </div>
              </ScrollReveal>

              {/* 3 Clean Initiative Cards matching Image 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* 1. Industrial Decarbonisation */}
                <ScrollReveal direction="up" distance={35} delay={0.05}>
                  <a
                    href="#net-zero"
                    className="bg-white border border-slate-200/90 hover:border-[#6DAD45] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#EDF6E8] border border-[#6DAD45]/25 flex items-center justify-center text-[#6DAD45] group-hover:bg-[#6DAD45] group-hover:text-white transition-colors duration-300 mb-6">
                        <Factory className="w-7 h-7 stroke-[1.6]" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 group-hover:text-[#6DAD45] transition-colors">
                        Industrial Decarbonisation
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        Solar and battery storage for industrial energy needs.
                      </p>
                    </div>

                    <div className="pt-5 mt-6 border-t border-slate-100 flex items-center text-sm font-sans font-medium text-[#6DAD45] group-hover:text-[#589234]">
                      <span>Explore decarbonisation</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </ScrollReveal>

                {/* 2. Agrivoltaics */}
                <ScrollReveal direction="up" distance={35} delay={0.12}>
                  <a
                    href="#agrovoltaics"
                    className="bg-white border border-slate-200/90 hover:border-[#6DAD45] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#EDF6E8] border border-[#6DAD45]/25 flex items-center justify-center text-[#6DAD45] group-hover:bg-[#6DAD45] group-hover:text-white transition-colors duration-300 mb-6">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="3 4 21 4 19 11 5 11" />
                          <line x1="12" y1="4" x2="12" y2="11" />
                          <line x1="7.5" y1="7.5" x2="16.5" y2="7.5" />
                          <path d="M6 19v-4c0-1.5 1-2 2-2" />
                          <path d="M8 13c1 0 2 .5 2 2v4" />
                          <path d="M12 20v-4" />
                          <path d="M11 14c.5-1 1.5-1 2 0" />
                          <path d="M16 19v-4c0-1.5 1-2 2-2" />
                          <path d="M18 13c1 0 2 .5 2 2v4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 group-hover:text-[#6DAD45] transition-colors">
                        Agrivoltaics
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        Growing crops and generating solar power on the same land.
                      </p>
                    </div>

                    <div className="pt-5 mt-6 border-t border-slate-100 flex items-center text-sm font-sans font-medium text-[#6DAD45] group-hover:text-[#589234]">
                      <span>Explore agrivoltaics</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </ScrollReveal>

                {/* 3. Field Exchange Programme */}
                <ScrollReveal direction="up" distance={35} delay={0.19}>
                  <a
                    href="#field-exchange"
                    className="bg-white border border-slate-200/90 hover:border-[#6DAD45] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#EDF6E8] border border-[#6DAD45]/25 flex items-center justify-center text-[#6DAD45] group-hover:bg-[#6DAD45] group-hover:text-white transition-colors duration-300 mb-6">
                        <HardHat className="w-7 h-7 stroke-[1.6]" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 group-hover:text-[#6DAD45] transition-colors">
                        Field Exchange Programme
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        Hands-on learning for site teams and local technicians.
                      </p>
                    </div>

                    <div className="pt-5 mt-6 border-t border-slate-100 flex items-center text-sm font-sans font-medium text-[#6DAD45] group-hover:text-[#589234]">
                      <span>Explore Field Exchange</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 02: INITIATIVE SHOWCASE CARDS */}
          {/* ------------------------------------------------------------- */}
          <section className="py-12 sm:py-16 md:py-20 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

              {/* ----------------------------------------------------------- */}
              {/* CARD 1: INDUSTRIAL DECARBONISATION */}
              {/* ----------------------------------------------------------- */}
              <div id="net-zero" className="scroll-mt-32">
                <ScrollReveal direction="up" distance={35}>
                  <div className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Left: Industrial Facility Photo */}
                      <div className="lg:col-span-6">
                        <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                          <Image
                            src="/images/substation-project.jpg"
                            alt="Industrial Decarbonisation - Solar and Battery Storage"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center" />
                        </div>
                      </div>

                      {/* Right: Content Breakdown */}
                      <div className="lg:col-span-6 space-y-5">
                        <h3 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                          Industrial Decarbonisation
                        </h3>

                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                          We help industrial facilities assess solar and battery storage options using their load profile, site constraints and operating priorities.
                        </p>

                        <div className="pt-2">
                          <div className="text-xs font-bold text-[#6DAD45] uppercase tracking-wider font-mono mb-4">
                            WHAT WE CAN ASSESS
                          </div>

                          <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-normal">
                              <CheckCircle2 className="w-5 h-5 text-[#6DAD45] shrink-0" />
                              <span>On-site and open-access solar options</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-normal">
                              <CheckCircle2 className="w-5 h-5 text-[#6DAD45] shrink-0" />
                              <span>Battery storage for peak demand management</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-normal">
                              <CheckCircle2 className="w-5 h-5 text-[#6DAD45] shrink-0" />
                              <span>Grid connection and electrical integration</span>
                            </li>
                          </ul>

                          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <button
                              type="button"
                              onClick={() => setQuoteModalOpen(true)}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#509E2F] hover:bg-[#439619] text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                              <span>Discuss Your Energy Needs</span>
                              <span className="text-base">→</span>
                            </button>

                            <Link
                              href="/about/initiatives/net-zero"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F1F4F8] hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all">
                              <span>EXPLORE DECARBONISATION</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* ----------------------------------------------------------- */}
              {/* CARD 2: AGRIVOLTAICS */}
              {/* ----------------------------------------------------------- */}
              <div id="agrovoltaics" className="scroll-mt-32">
                <ScrollReveal direction="up" distance={35}>
                  <div className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Left: Content Breakdown */}
                      <div className="lg:col-span-7 space-y-4">
                        {/* Dual-use Tag */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EAF5E4] border border-[#6DAD45]/20">
                          <Sprout className="w-4 h-4 text-[#6DAD45]" />
                          <span className="text-[11px] font-mono font-bold text-[#6DAD45] uppercase tracking-wider">
                            DUAL-USE SUSTAINABILITY
                          </span>
                        </div>

                        <div>
                          <h3 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-2">
                            Agrivoltaics
                          </h3>
                          <p className="text-base sm:text-lg font-bold text-[#668822]">
                            Keep farming. Add solar.
                          </p>
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                          Sarhat evaluates how elevated solar can work alongside active farming. We review crop needs, access for farm machinery and grid connectivity, including PM-KUSUM eligibility where applicable.
                        </p>

                        {/* Feature Pill */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="font-bold text-sm text-[#6DAD45]">Site-first design</span>
                          <span className="text-xs text-slate-500 font-mono tracking-wider">CROPS · ACCESS · SOLAR</span>
                        </div>

                        <div className="pt-2">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-4">
                            WHAT WE ASSESS
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                              <span>Land, drainage and grid connectivity</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                              <span>Panel clearance and machinery access</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                              <span>Crop selection and irrigation</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0 mt-0.5" />
                              <span>Indicative capacity and project economics</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <button
                              type="button"
                              onClick={() => setQuoteModalOpen(true)}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5EE72D] hover:bg-[#4ed423] text-slate-950 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                              <span>REQUEST A SITE REVIEW</span>
                              <span className="text-base">→</span>
                            </button>

                            <Link
                              href="/about/initiatives/agrovoltaics"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F1F4F8] hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all">
                              <span>EXPLORE AGRIVOLTAICS</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Right: Agrivoltaics Photo */}
                      <div className="lg:col-span-5">
                        <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                          <Image
                            src="/images/agrivoltaics-project.jpg"
                            alt="Agrivoltaics dual-use elevated solar and active crops"
                            fill
                            sizes="(max-width: 1024px) 100vw, 45vw"
                            className="object-cover object-center" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* ----------------------------------------------------------- */}
              {/* CARD 3: FIELD EXCHANGE PROGRAMME */}
              {/* ----------------------------------------------------------- */}
              <div id="field-exchange" className="scroll-mt-32">
                <ScrollReveal direction="up" distance={35}>
                  <div className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Left: Site Team Photo */}
                      <div className="lg:col-span-6">
                        <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                          <Image
                            src="/images/hero-solar.jpg"
                            alt="Field Exchange Programme - Solar Site Technical Training"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center" />
                        </div>
                      </div>

                      {/* Right: Content Breakdown */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <h3 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-2">
                            Field Exchange Programme
                          </h3>
                          <p className="text-base sm:text-lg font-bold text-[#668822]">
                            Practical learning for solar site teams
                          </p>
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                          Structured field learning for local technicians, apprentices and site crews.
                        </p>

                        <div className="pt-2">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-4">
                            TRAINING FOCUS
                          </div>

                          <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 bg-slate-50/60">
                              <div className="w-9 h-9 rounded-lg bg-[#EAF5E4] flex items-center justify-center text-[#6DAD45] shrink-0">
                                <HardHat className="w-5 h-5 stroke-[1.6]" />
                              </div>
                              <span className="text-sm sm:text-base text-slate-800 font-normal">
                                Site safety and hazard reporting
                              </span>
                            </div>

                            <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 bg-slate-50/60">
                              <div className="w-9 h-9 rounded-lg bg-[#EAF5E4] flex items-center justify-center text-[#6DAD45] shrink-0">
                                <Wrench className="w-5 h-5 stroke-[1.6]" />
                              </div>
                              <span className="text-sm sm:text-base text-slate-800 font-normal">
                                Installation and quality checks
                              </span>
                            </div>

                            <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 bg-slate-50/60">
                              <div className="w-9 h-9 rounded-lg bg-[#EAF5E4] flex items-center justify-center text-[#6DAD45] shrink-0">
                                <ClipboardCheck className="w-5 h-5 stroke-[1.6]" />
                              </div>
                              <span className="text-sm sm:text-base text-slate-800 font-normal">
                                Testing and commissioning fundamentals
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <button
                              type="button"
                              onClick={() => setQuoteModalOpen(true)}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5EE72D] hover:bg-[#4ed423] text-slate-950 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                              <span>Discuss a Training Partnership</span>
                              <span className="text-base">→</span>
                            </button>

                            <Link
                              href="/about/initiatives/field-exchange"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F1F4F8] hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all">
                              <span>EXPLORE FIELD EXCHANGE</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 03: CLOSING CTA */}
          {/* ------------------------------------------------------------- */}
          <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#071120] border border-slate-800 rounded-3xl sm:rounded-[2rem] p-10 sm:p-14 md:p-16 text-white relative overflow-hidden shadow-2xl text-center flex flex-col items-center justify-center">
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#6DAD45]/10 rounded-full blur-[100px] pointer-events-none" />

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-white tracking-tight leading-[1.12] mb-5 sm:mb-6 max-w-3xl text-center relative z-10">
                    Let’s build your next <br />
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.7)]">
                      clean energy project.
                      <svg
                        className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#D4E012]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-center relative z-10">
                    Talk to Sarhat about industrial decarbonisation, PM-KUSUM projects, agrivoltaics or solar technician training.
                  </p>

                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#D4E012] hover:bg-[#c3ce10] text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_35px_rgba(212,224,18,0.35)] hover:shadow-[0_0_45px_rgba(212,224,18,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                      <span>Discuss your project</span>
                      <span className="text-base font-bold">→</span>
                    </button>
                  </div>
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
