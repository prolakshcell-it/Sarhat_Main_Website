"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import FivePrinciplesInteractive from "@/components/FivePrinciplesInteractive";
import TurnkeyLifecycle from "@/components/TurnkeyLifecycle";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import {
  ClipboardCheck,
  Calendar,
  Wrench,
  ShieldCheck,
  ArrowLeftRight,
  Power,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function OurApproachPage() {
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

  // Revised Turnkey execution steps roadmap matching mockup
  const executionSteps = [
    {
      step: "01",
      title: "Feasibility & Engineering",
      desc: "Verify site and grid constraints before finalising the design.",
    },
    {
      step: "02",
      title: "Procurement & Quality",
      desc: "Source to specification and verify equipment before dispatch.",
    },
    {
      step: "03",
      title: "Civil & Structural Works",
      desc: "Build access roads, foundations and module supports with documented checks.",
    },
    {
      step: "04",
      title: "Electrical Integration",
      desc: "Connect the plant, integrate monitoring and coordinate testing and grid synchronisation.",
    },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Soft Ambient Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-gradient-to-l from-emerald-400/10 via-[#D4E012]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0" />

        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / FULL-SCREEN HERO SECTION (Matching Mockup 1)             */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${
            isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
          }`}
          aria-hidden={isPastHero}>
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            {/* Background Image Layer (Retained authentic high-res project photo) */}
            <motion.div
              style={{ scale: bgScale }}
              className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Clean Energy Infrastructure Background"
                fill
                priority
                quality={95}
                className="object-cover object-center opacity-85" />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 via-50% to-black/75 pointer-events-none" />
            </motion.div>

            {/* Main Centered Content */}
            <motion.div
              style={{
                y: contentY,
                scale: contentScale,
                opacity: contentOpacity,
              }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-24 sm:pt-28 flex flex-col items-center text-center will-change-transform">
              <ScrollReveal direction="up" distance={30} className="w-full">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    From first site visit <br />
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                      to long-term performance.
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

                  <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-3xl text-center leading-relaxed mb-8 drop-shadow-md">
                    We identify project risks early, coordinate engineering and site execution, and carry those decisions through commissioning and operations.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const target = document.getElementById("concept-to-completion");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D4E012] hover:bg-[#c2ce0f] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(212,224,18,0.35)] hover:shadow-[0_0_40px_rgba(212,224,18,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                    <span>See how we deliver</span>
                    <span className="text-base font-bold">↓</span>
                  </button>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Animated Mouse Scroll Indicator at Bottom */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* ------------------------------------------------------------- */}
        {/* MAIN SLIDING CONTENT OVERLAY */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* ----------------------------------------------------------- */}
          {/* 02 / FROM CONCEPT TO COMPLETION WE DELIVER (Mockup 2)       */}
          {/* ----------------------------------------------------------- */}
          <section
            id="concept-to-completion"
            className="py-14 sm:py-20 bg-white text-[#0F172A] relative border-b border-slate-200/80 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    From concept to{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      completion, we deliver.
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-6 space-y-5">
                  <ScrollReveal direction="up" distance={30}>
                    <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                      <p>
                        Project owners need visibility into cost, schedule, quality and safety. We coordinate the teams and decisions that affect each milestone, so risks can be addressed early.
                      </p>
                      <p>
                        Sarhat connects engineering, procurement, construction and commissioning with planning for operations. We use digital tools to track progress, document decisions and coordinate handovers.
                      </p>
                      <p className="font-bold text-slate-900 pt-2">
                        For full EPC/EPCM delivery or selected phases, we define who owns each decision and handover.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right 6 Rounded Tiles Column */}
                <div className="lg:col-span-6">
                  <ScrollReveal direction="up" distance={30} delay={0.15}>
                    <div className="bg-[#FAFDF9] border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        {/* 1. Cost and quality control */}
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-[#5EE72D] flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                            <ClipboardCheck className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            Cost and quality control
                          </span>
                        </div>

                        {/* 2. Schedule visibility */}
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-[#5EE72D] flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                            <Calendar className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            Schedule visibility
                          </span>
                        </div>

                        {/* 3. Less rework */}
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-[#5EE72D] flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                            <Wrench className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            Less rework
                          </span>
                        </div>

                        {/* 4. Site safety */}
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-[#5EE72D] flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                            <ShieldCheck className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            Site safety
                          </span>
                        </div>

                        {/* 5. Coordinated handovers */}
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-[#5EE72D] flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                            <ArrowLeftRight className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            Coordinated handovers
                          </span>
                        </div>

                        {/* 6. Operational readiness */}
                        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-[#5EE72D] flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                            <Power className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            Operational readiness
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 03 / OUR DELIVERY PRINCIPLES (Mockups 3, 4, 5, 6)          */}
          {/* ----------------------------------------------------------- */}
          <section
            id="delivery-principles"
            className="py-16 sm:py-20 md:py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10 text-[#0F172A] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal direction="up" distance={30}>
                <FivePrinciplesInteractive
                  onOpenQuote={() => setQuoteModalOpen(true)} />
              </ScrollReveal>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 04 / TURNKEY EXECUTION LIFECYCLE ROADMAP (Mockup 8)         */}
          {/* ----------------------------------------------------------- */}
          <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80 text-[#0F172A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                  <AnimatedPillBadge className="mb-4">
                    STEP-BY-STEP WORKFLOW
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight mb-4">
                    Turnkey Execution{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Lifecycle.
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

              <TurnkeyLifecycle steps={executionSteps} />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 05 / CLOSING CTA (Mockup 9 Bottom)                          */}
          {/* ----------------------------------------------------------- */}
          <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#071120] border border-slate-800 rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
                  {/* Subtle Background Glows */}
                  <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#6DAD45]/10 rounded-full blur-[100px] pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Heading & Subtitle */}
                    <div className="lg:col-span-8">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-white tracking-tight leading-[1.12] mb-5">
                        Planning your <br />
                        <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.7)]">
                          next project?
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

                      <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
                        Tell us where you’re building, what stage you’re at, and where you need support. We’ll help you define the right scope, from site feasibility to turnkey delivery.
                      </p>

                      {/* Contact Info Footer inside Card */}
                      <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-400 font-sans border-t border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#D4E012]" />
                          <span>info@sarhatenergy.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#D4E012]" />
                          <span>+91 9266 7111 25</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#D4E012]" />
                          <span>Ghaziabad, U.P., India</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div className="lg:col-span-4 flex lg:justify-end">
                      <button
                        type="button"
                        onClick={() => setQuoteModalOpen(true)}
                        className="inline-flex items-center gap-2.5 px-8 py-4 sm:px-9 sm:py-4 rounded-full bg-[#D4E012] hover:bg-[#c3ce10] text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_35px_rgba(212,224,18,0.35)] hover:shadow-[0_0_45px_rgba(212,224,18,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                        <span>Discuss your project</span>
                        <span className="text-base font-bold">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Site Footer */}
          <Footer />
        </div>

        {/* Quote Inquiry Modal */}
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
