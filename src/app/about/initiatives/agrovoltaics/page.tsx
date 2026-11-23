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

export default function AgroVoltaicsPage() {
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
            {/* Elevated Agrivoltaics Solar Farm Background Image */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/agrivoltaics-project.jpg"
                alt="Agrivoltaics — Keep farming. Add solar — Sarhat"
                fill
                priority
                className="object-cover object-center opacity-90" />
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
                    Initiatives / Agrivoltaics
                  </div>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-5 text-center leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    Keep farming. <br />
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                      Add solar.
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
                    Explore whether elevated solar can work alongside your crops, irrigation and farm operations.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(212,224,18,0.35)] hover:shadow-[0_0_40px_rgba(212,224,18,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                      <span>Request a site review</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const target = document.getElementById("farm-plan");
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/70 hover:border-white bg-black/25 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                      <span>Explore pilot partnerships</span>
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
          {/* SECTION 01: DESIGNED AROUND HOW YOUR FARM WORKS */}
          {/* ----------------------------------------------------------- */}
          <section id="farm-plan" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative z-10 scroll-mt-20">
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
                    {/* Left Column: Heading, Subtitle & 6 What We Assess items */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-[1.15]">
                        Designed around <br />
                        <span className="text-[#509E2F] italic font-normal relative inline-block">
                          how your farm works.
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
                        We assess your crops, irrigation and machinery before proposing a solar layout. Panel height, row spacing and access are designed around how the land is farmed.
                      </p>

                      <div className="pt-2">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                            WHAT WE ASSESS
                          </span>
                          <div className="h-px bg-slate-300 flex-1 max-w-[200px]" />
                        </div>

                        {/* 6 Key Assessment Criteria (2 cols x 3 rows) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                          {/* 1 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Crop calendar and shade tolerance
                            </span>
                          </div>

                          {/* 2 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Tractor clearance and turning space
                            </span>
                          </div>

                          {/* 3 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Irrigation, drainage and soil conditions
                            </span>
                          </div>

                          {/* 4 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Grid connection and power sale options
                            </span>
                          </div>

                          {/* 5 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Panel height and row spacing
                            </span>
                          </div>

                          {/* 6 */}
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#509E2F] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-800 font-normal leading-snug">
                              Pilot layout and performance measures
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: "Start with a site review" Card */}
                    <div className="lg:col-span-5 xl:col-span-4">
                      <div className="bg-white border-2 border-[#509E2F]/20 rounded-3xl p-6 sm:p-8 shadow-md">
                        <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#509E2F] mb-3 leading-tight">
                          Start with a site review
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                          Share your location, land area and current crops.
                        </p>

                        <button
                          type="button"
                          onClick={() => setQuoteModalOpen(true)}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#509E2F] hover:bg-[#438725] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer mb-4">
                          <span>Request a site review</span>
                          <span className="text-base font-bold">→</span>
                        </button>

                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setQuoteModalOpen(true)}
                            className="text-xs sm:text-sm text-slate-600 hover:text-[#509E2F] transition-colors font-medium underline underline-offset-4 cursor-pointer">
                            Discuss a pilot partnership
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
          {/* SECTION 02: CLOSING CTA */}
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
