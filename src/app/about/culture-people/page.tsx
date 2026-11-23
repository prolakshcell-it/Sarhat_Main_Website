"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import SmoothScroll from "@/components/SmoothScroll";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

import {
  Users,
  ShieldCheck,
  Heart,
  Leaf,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Award,
  Compass,
  MessageSquare,
  Shield,
  Smile,
  Flame,
  HardHat,
  ClipboardCheck,
} from "lucide-react";

export default function CulturePeoplePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Subtle scroll-reveal helper
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const },
  });

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
        {/* Soft Ambient Porcelain Flares */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4E012]/15 via-[#6DAD45]/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>

        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ==========================================
            1. HERO SECTION (Sticky background & Centered Content)
            ========================================== */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${
            isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
          }`}
          aria-hidden={isPastHero}>
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none">
            {/* Background Image Layer with Parallax Zoom */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/hero-solar.jpg"
                alt="Sarhat Culture & People - Safety, Unity & Ownership"
                fill
                priority
                className="object-cover object-center opacity-90" />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Balanced Dark Gradient Overlay Scrim for centered content readability */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 sm:pt-32 pb-6 my-auto flex flex-col items-center text-center will-change-transform">
              <ScrollReveal direction="up" distance={30} className="w-full">
                <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
                  {/* Eyebrow Label matching mockup */}
                  <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/90 uppercase mb-4 sm:mb-6 font-mono text-center">
                    CULTURE &amp; PEOPLE
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-5 sm:mb-6 text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    Safety, Unity &amp; Ownership <br />
                    <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)] mt-1">
                      guide every project.
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
                    From design reviews to site handovers, we work across teams, raise issues early and take responsibility for the work we deliver.
                  </p>

                  {/* Call to action button matching mockup */}
                  <button
                    type="button"
                    onClick={() => {
                      const target = document.getElementById("how-we-work");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-white/60 hover:border-white bg-black/20 hover:bg-white/10 text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]">
                    <span>How We Work</span>
                    <span className="text-sm">↓</span>
                  </button>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Standard Animated Mouse Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />


        {/* ==========================================
            MAIN SLIDING CONTENT OVERLAY
            ========================================== */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">

          {/* ------------------------------------------------------------- */}
          {/* SECTION 1: HOW WE WORK AT SARHAT */}
          {/* ------------------------------------------------------------- */}
          <section id="how-we-work" className="py-14 sm:py-16 md:py-20 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header with green vertical bar */}
              <ScrollReveal direction="up" distance={20}>
                <div className="flex items-center gap-3 mb-8 sm:mb-12">
                  <div className="w-1.5 h-8 sm:h-10 bg-[#6DAD45] rounded-full shrink-0" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-medium text-slate-900 tracking-tight">
                    How we work at{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Sarhat
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#6DAD45]"
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

              {/* 3 Value Cards: Safety, Unity, Ownership */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Safety Card */}
                <ScrollReveal direction="up" distance={25} delay={0.05}>
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-start">
                    <div className="mb-6">
                      <HardHat className="w-11 h-11 text-[#6DAD45] stroke-[1.6]" />
                    </div>
                    <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 tracking-tight">
                      Safety
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-normal">
                      We discuss site hazards before work begins and raise concerns as soon as we spot them.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Unity Card */}
                <ScrollReveal direction="up" distance={25} delay={0.12}>
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-start">
                    <div className="mb-6">
                      <Users className="w-11 h-11 text-[#6DAD45] stroke-[1.6]" />
                    </div>
                    <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 tracking-tight">
                      Unity
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-normal">
                      Design, procurement and site teams coordinate early so drawings, materials and site readiness stay aligned.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Ownership Card */}
                <ScrollReveal direction="up" distance={25} delay={0.19}>
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-start">
                    <div className="mb-6">
                      <ClipboardCheck className="w-11 h-11 text-[#6DAD45] stroke-[1.6]" />
                    </div>
                    <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3 tracking-tight">
                      Ownership
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-normal">
                      Every open issue has a named owner who follows it through to resolution.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: VIBES AT SARHAT */}
          {/* ------------------------------------------------------------- */}
          <section className="py-14 sm:py-16 md:py-20 bg-[#F4F7F2] border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header with green vertical bar */}
              <ScrollReveal direction="up" distance={20}>
                <div className="flex items-center gap-3 mb-8 sm:mb-10">
                  <div className="w-1.5 h-8 sm:h-10 bg-[#6DAD45] rounded-full shrink-0" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-medium text-slate-900 tracking-tight">
                    VIBES at{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Sarhat
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#6DAD45]"
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Left Column: Text & VIBES Categories */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <ScrollReveal direction="up" distance={20} delay={0.05}>
                    <p className="text-base sm:text-lg md:text-xl text-slate-800 font-normal leading-relaxed">
                      VIBES brings people across Sarhat together through volunteering, shared learning and team activities.
                    </p>

                    <div className="mt-8 sm:mt-12 text-xs sm:text-sm font-medium text-slate-600 tracking-wide">
                      <span>Volunteering</span>
                      <span className="mx-2 text-slate-400">·</span>
                      <span>Inclusivity</span>
                      <span className="mx-2 text-slate-400">·</span>
                      <span>Belonging</span>
                      <span className="mx-2 text-slate-400">·</span>
                      <span>Engagement</span>
                      <span className="mx-2 text-slate-400">·</span>
                      <span>Social</span>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Column: Collaboration Team Image */}
                <div className="lg:col-span-7">
                  <ScrollReveal direction="up" distance={20} delay={0.12}>
                    <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-100">
                      <Image
                        src="/images/culture-vibes-team.jpg"
                        alt="VIBES team collaboration at Sarhat Energy"
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover object-center" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 3: OUR CORE VALUES (5 VALUES LAYOUT) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header */}
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                  <AnimatedPillBadge className="mb-6">
                    OUR GUIDING PRINCIPLES
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Our core{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      values.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden>
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                    From our corporate social responsibility to our passion for renewable energy, Sarhat works to five core values that shape everything we do.
                  </p>
                </div>
              </ScrollReveal>

              {/* Core Values 5-Card Layout */}
              <div className="space-y-8">
                
                {/* 1. TOP FEATURED CENTER CARD: INTEGRITY */}
                <ScrollReveal direction="up" distance={30}>
                  <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#F8FAF5] via-white to-[#F3F7EE] border-2 border-[#D4E012]/60 rounded-3xl p-8 sm:p-10 text-center shadow-lg hover:shadow-2xl hover:border-[#6DAD45] transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 text-[#707B00] flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900 mb-4">
                      Integrity
                    </h3>
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
                      We are a company of uncompromising integrity and business ethics. We achieve our ambitions and strategic initiatives by doing the right thing in an honest, fair, and responsible way, with and by our employees and business partners, every time.
                    </p>
                  </div>
                </ScrollReveal>

                {/* 2. MIDDLE ROW: SAFETY & RESPECT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Safety */}
                  <ScrollReveal direction="left" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center mb-6 shadow-sm">
                        <Shield className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Safety
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        Safety isn&apos;t a check-box; it&apos;s our foundational law. Every team member on site is empowered with absolute stop-work authority to prevent hazards and protect lives across every field location.
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Respect */}
                  <ScrollReveal direction="right" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                        <Users className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Respect
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        We treat everyone with dignity, empathy, and mutual respect, fostering open communication, active listening, and inclusive collaboration across field teams, partners, and executive leadership.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* 3. BOTTOM ROW: SUSTAINABILITY & DRIVE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Sustainability */}
                  <ScrollReveal direction="left" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                        <Leaf className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Sustainability
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        We deliver clean renewable energy assets that protect the environment and create long-term economic and ecological benefits for communities across India.
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Drive */}
                  <ScrollReveal direction="right" distance={30}>
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012]/40 text-[#707B00] flex items-center justify-center mb-6 shadow-sm">
                        <Flame className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                        Drive
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        We bring passion, technical mastery, and energy to every project, continuously pushing boundaries to turn clean energy ambitions into operational reality.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

              </div>
            </div>
          </section>


          {/* ------------------------------------------------------------- */}
          {/* REVISED CLOSURE SECTION: BUILD YOUR CAREER AT SARHAT */}
          {/* ------------------------------------------------------------- */}
          <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-slate-950 border border-slate-800/90 rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
                  {/* Ambient Soft Glow */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6DAD45]/10 rounded-full blur-[100px] pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium text-white tracking-tight leading-[1.15] mb-4 sm:mb-5">
                        Build your career <br />
                        <span className="text-[#D4E012] italic font-normal relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.7)]">
                          at Sarhat.
                          <svg
                            className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 text-[#D4E012]"
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

                      <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                        Work alongside engineering, procurement and site teams delivering solar and energy infrastructure projects, from design through commissioning.
                      </p>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto">
                      <Link
                        href="/careers"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0f] hover:to-[#52d326] text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_35px_rgba(212,224,18,0.4)] hover:shadow-[0_0_45px_rgba(212,224,18,0.65)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer w-full sm:w-auto">
                        <span>EXPLORE CAREERS AT SARHAT</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

        </div>

        <Footer />
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
