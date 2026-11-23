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

export default function NetZeroPage() {
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
            {/* Facility Background Photo */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/substation-project.jpg"
                alt="Industrial Decarbonisation Engineered for your facility — Sarhat"
                fill
                priority
                className="object-cover object-center opacity-85" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 via-50% to-black/70 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center">
              <ScrollReveal direction="up" distance={30} className="w-full">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-5 text-center leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    Industrial Decarbonisation <br />
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                      Engineered for your facility.
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

                  <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-3xl mx-auto text-center leading-relaxed font-normal mb-8 drop-shadow-md">
                    Evaluate on-site solar, open-access power and battery storage around your facility’s load profile, operating hours and reliability needs.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(212,224,18,0.35)] hover:shadow-[0_0_40px_rgba(212,224,18,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                      <span>Request a power review</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const target = document.getElementById("facility-start");
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/70 hover:border-white bg-black/25 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                      <span>Explore solutions</span>
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
          {/* SECTION 01: WHERE CAN YOUR FACILITY START? */}
          {/* ----------------------------------------------------------- */}
          <section id="facility-start" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative z-10 scroll-mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 text-center tracking-tight mb-12 sm:mb-16">
                  Where can your facility start?
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/90 gap-8 md:gap-0 max-w-5xl mx-auto">
                {/* 1. On-site solar */}
                <ScrollReveal direction="up" distance={30} delay={0.05}>
                  <div className="md:px-8 first:pl-0 last:pr-0">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                      On-site solar
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      Use available roof or land to serve daytime demand.
                    </p>
                  </div>
                </ScrollReveal>

                {/* 2. Open-access power */}
                <ScrollReveal direction="up" distance={30} delay={0.1}>
                  <div className="md:px-8 first:pl-0 last:pr-0 pt-6 md:pt-0">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                      Open-access power
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      Assess off-site renewable supply and landed cost.
                    </p>
                  </div>
                </ScrollReveal>

                {/* 3. Battery storage */}
                <ScrollReveal direction="up" distance={30} delay={0.15}>
                  <div className="md:px-8 first:pl-0 last:pr-0 pt-6 md:pt-0">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                      Battery storage
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      Evaluate peak demand, backup and load shifting.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 02: A DECARBONISATION PLAN BUILT AROUND YOUR PLANT */}
          {/* ----------------------------------------------------------- */}
          <section id="decarb-plan" className="py-14 sm:py-20 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-white border border-slate-200/90 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
                  
                  {/* Back to Initiatives link */}
                  <div className="mb-6 sm:mb-8">
                    <Link
                      href="/about/initiatives"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#509E2F] hover:text-[#418224] transition-colors uppercase tracking-wider">
                      <span>← Back to Initiatives</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left Column: Heading, Subtitle & 6 Key Deliverables */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-[1.15]">
                        A decarbonisation plan <br />
                        <span className="text-[#509E2F] italic font-normal relative inline-block">
                          built around your plant.
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
                        Sarhat uses your electricity bills, load profile and operating priorities to compare renewable power and storage options, then maps the grid and on-site infrastructure needed to deliver them.
                      </p>

                      {/* 6 Key Items Grid (2 cols x 3 rows) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4">
                        {/* 1. Renewable power sourcing */}
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              Renewable power sourcing
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                              On-site solar and open-access PPAs
                            </p>
                          </div>
                        </div>

                        {/* 2. Energy management */}
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              Energy management
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                              Metering, monitoring and controls
                            </p>
                          </div>
                        </div>

                        {/* 3. Battery storage */}
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              Battery storage
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                              Peak demand, backup and load shifting
                            </p>
                          </div>
                        </div>

                        {/* 4. Emissions impact */}
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              Emissions impact
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                              Estimate Scope 2 reductions
                            </p>
                          </div>
                        </div>

                        {/* 5. Grid integration */}
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              Grid integration
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                              Substations, evacuation and protection
                            </p>
                          </div>
                        </div>

                        {/* 6. Project delivery */}
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              Project delivery
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                              Engineering through commissioning
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: "Your first power review" Highlighted Card */}
                    <div className="lg:col-span-5 xl:col-span-4">
                      <div className="bg-[#FAFDF8] border-2 border-[#509E2F]/20 rounded-3xl p-6 sm:p-8 shadow-md">
                        <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#509E2F] mb-2 leading-tight">
                          Your first power review
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                          Start with a recent bill and your operating hours.
                        </p>

                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#509E2F] shrink-0" />
                            <span>Options that fit your load</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#509E2F] shrink-0" />
                            <span>Indicative costs and emissions impact</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#509E2F] shrink-0" />
                            <span>Next steps for feasibility</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setQuoteModalOpen(true)}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#509E2F] hover:bg-[#438725] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                          <span>Request a power review</span>
                          <span className="text-base font-bold">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 03: CLOSING CTA */}
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
