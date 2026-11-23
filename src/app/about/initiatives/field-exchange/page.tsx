"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function FieldExchangePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

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
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky background with scroll fade) */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${
            isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
          }`}
          aria-hidden={isPastHero}>
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none">
            {/* Solar Site Team Background Image */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Field Exchange Program — Learn how solar sites work — Sarhat"
                fill
                priority
                className="object-cover object-center opacity-85" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 via-50% to-black/75 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center">
              <ScrollReveal direction="up" distance={30} className="w-full">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                  {/* Breadcrumb Eyebrow */}
                  <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/90 uppercase mb-4 sm:mb-6 font-mono">
                    Initiatives / Field Exchange
                  </div>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-5 text-center leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    Field Exchange Program <br />
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                      Learn how solar sites work.
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

                  <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto text-center leading-relaxed font-normal mb-8 drop-shadow-md">
                    Site-based learning for students, apprentices and local technicians.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(212,224,18,0.35)] hover:shadow-[0_0_40px_rgba(212,224,18,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                      <span>Register training interest</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const target = document.getElementById("dual-action");
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/70 hover:border-white bg-black/25 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                      <span>Partner with Sarhat</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>

            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* ------------------------------------------------------------- */}
        {/* MAIN BODY SECTIONS (Slides UP over static Hero) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          
          {/* ----------------------------------------------------------- */}
          {/* SECTION 01: WHAT YOU’LL LEARN IN THE FIELD */}
          {/* ----------------------------------------------------------- */}
          <section id="what-youll-learn" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 text-center tracking-tight mb-12 sm:mb-16">
                  What you’ll learn in the field
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/90 gap-8 md:gap-0 max-w-5xl mx-auto">
                {/* 1. Site safety */}
                <ScrollReveal direction="up" distance={30} delay={0.05}>
                  <div className="md:px-8 first:pl-0 last:pr-0">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                      Site safety
                    </h3>
                    <div className="w-10 h-0.5 bg-[#D4E012] mb-3 rounded-full" />
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      PPE, hazard recognition and safe work practices.
                    </p>
                  </div>
                </ScrollReveal>

                {/* 2. Installation & quality */}
                <ScrollReveal direction="up" distance={30} delay={0.1}>
                  <div className="md:px-8 first:pl-0 last:pr-0 pt-6 md:pt-0">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                      Installation &amp; quality
                    </h3>
                    <div className="w-10 h-0.5 bg-[#D4E012] mb-3 rounded-full" />
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      Drawings, mounting, cable routing and quality checks.
                    </p>
                  </div>
                </ScrollReveal>

                {/* 3. Testing & handover */}
                <ScrollReveal direction="up" distance={30} delay={0.15}>
                  <div className="md:px-8 first:pl-0 last:pr-0 pt-6 md:pt-0">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                      Testing &amp; handover
                    </h3>
                    <div className="w-10 h-0.5 bg-[#D4E012] mb-3 rounded-full" />
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      Observe supervised testing and handover checks.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 02: HOW IT WORKS */}
          {/* ----------------------------------------------------------- */}
          <section className="py-12 sm:py-16 bg-[#EEF7EB] border-b border-slate-200/80 relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={25}>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 text-center tracking-tight mb-8 sm:mb-10">
                  How it works
                </h3>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={30} delay={0.08}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
                  {/* Step 1 */}
                  <div className="bg-white border border-slate-200/90 rounded-full px-6 sm:px-7 py-3 shadow-sm text-sm font-semibold text-slate-800 text-center w-full sm:w-auto">
                    Register interest
                  </div>

                  <span className="text-[#6DAD45] text-lg font-bold rotate-90 sm:rotate-0">→</span>

                  {/* Step 2 */}
                  <div className="bg-white border border-slate-200/90 rounded-full px-6 sm:px-7 py-3 shadow-sm text-sm font-semibold text-slate-800 text-center w-full sm:w-auto">
                    Confirm a suitable cohort
                  </div>

                  <span className="text-[#6DAD45] text-lg font-bold rotate-90 sm:rotate-0">→</span>

                  {/* Step 3 */}
                  <div className="bg-white border border-slate-200/90 rounded-full px-6 sm:px-7 py-3 shadow-sm text-sm font-semibold text-slate-800 text-center w-full sm:w-auto">
                    Attend supervised training
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 03: DUAL ACTION (FOR LEARNERS / FOR INSTITUTIONS) */}
          {/* ----------------------------------------------------------- */}
          <section id="dual-action" className="bg-[#0B1528] text-white py-12 sm:py-16 border-b border-slate-800 relative z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700/80 gap-8 md:gap-0 items-center">
                  {/* Left: For learners */}
                  <div className="md:pr-10 text-center md:text-left flex flex-col items-center md:items-start">
                    <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-5">
                      For learners
                    </h3>
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(212,224,18,0.35)] hover:scale-105 active:scale-[0.98] cursor-pointer">
                      <span>Register training interest</span>
                    </button>
                  </div>

                  {/* Right: For institutions */}
                  <div className="md:pl-10 pt-8 md:pt-0 text-center md:text-left flex flex-col items-center md:items-start">
                    <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-5">
                      For institutions
                    </h3>
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/80 hover:border-white bg-transparent hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-[0.98]">
                      <span>Discuss a training partnership</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 04: LEARN ALONGSIDE A SOLAR SITE TEAM (CURRICULUM) */}
          {/* ----------------------------------------------------------- */}
          <section id="curriculum" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative z-10 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#FAFDF9] border border-slate-200/90 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
                  
                  {/* Back to Initiatives link */}
                  <div className="mb-6 sm:mb-8">
                    <Link
                      href="/about/initiatives"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#509E2F] hover:text-[#418224] transition-colors uppercase tracking-wider">
                      <span>← Back to Initiatives</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left Column: Heading, Subtitle & 6 What You'll Learn items */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-[1.15]">
                        Learn alongside <br />
                        <span className="text-[#509E2F] italic font-normal relative inline-block">
                          a solar site team.
                          <svg
                            className="absolute -bottom-1.5 left-0 w-full h-3 text-[#509E2F]"
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

                      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                        Follow how site teams turn drawings into installations, check workmanship and prepare a project for handover. Activities vary by site and cohort.
                      </p>

                      <div className="pt-2">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                            WHAT YOU’LL LEARN
                          </span>
                          <div className="h-px bg-slate-300 flex-1 max-w-[200px]" />
                        </div>

                        {/* 6 Key Deliverables Grid (2 cols x 3 rows) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                          {/* 1 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Site induction and hazard awareness
                            </span>
                          </div>

                          {/* 2 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Mounting, cabling and earthing checks
                            </span>
                          </div>

                          {/* 3 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Reading layouts and work drawings
                            </span>
                          </div>

                          {/* 4 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Observe supervised testing and commissioning
                            </span>
                          </div>

                          {/* 5 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Foundation and piling quality checks
                            </span>
                          </div>

                          {/* 6 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Inspection records and handover
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: "Find a training cohort" Card */}
                    <div className="lg:col-span-5 xl:col-span-4">
                      <div className="bg-white border-2 border-[#509E2F]/20 rounded-3xl p-6 sm:p-8 shadow-md">
                        <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#509E2F] mb-3 leading-tight">
                          Find a training cohort
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-3">
                          Share your trade or course, location and availability.
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                          We&apos;ll follow up when a suitable cohort is available.
                        </p>

                        <button
                          type="button"
                          onClick={() => setQuoteModalOpen(true)}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#509E2F] hover:bg-[#438725] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer mb-4">
                          <span>Register training interest</span>
                        </button>

                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setQuoteModalOpen(true)}
                            className="text-xs sm:text-sm text-slate-600 hover:text-[#509E2F] transition-colors font-medium underline underline-offset-4 cursor-pointer">
                            Discuss an institutional visit →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 05: CLOSING CTA */}
          {/* ----------------------------------------------------------- */}
          <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#071120] border border-slate-800 rounded-3xl sm:rounded-[2rem] p-10 sm:p-14 md:p-16 text-white relative overflow-hidden shadow-2xl text-center flex flex-col items-center justify-center">
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
