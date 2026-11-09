"use client";

import HeroVideoBackground from "@/components/HeroVideoBackground";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import FinalCTA from "@/components/FinalCTA";
import SolutionNavigator from "@/components/solutions/SolutionNavigator";
import HorizontalServiceRoadmap from "@/components/solutions/HorizontalServiceRoadmap";
import { detailedSolutions, serviceStages } from "@/components/solutions/data";

import { useHeroScroll } from "@/hooks/useHeroScroll";

const CTA_CLASS =
  "group/cta inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#D4E012]/25 transition-all duration-200 hover:-translate-y-px hover:from-[#c2ce0d] hover:to-[#4ed423] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012] focus-visible:ring-offset-2";

export default function SolutionsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
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
        {/* 01 / FULL-SCREEN HERO SECTION (Matching Insights & About page layout) */}
        {/* ------------------------------------------------------------- */}
        {/* Fixed Hero Section (Pinned background layer while scrolling) */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
            }`}
          aria-hidden={isPastHero}>
          <section className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
              <HeroVideoBackground
                desktopSrc="/videos/solutions-hero.mp4"
                mobileSrc="/videos/solutions-hero-mobile.mp4"
                poster="/videos/solutions-hero-poster.jpg"
                alt="Aerial view of Sarhat solar plant at Karanpura" />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 via-45% to-black/40 pointer-events-none" />
            </motion.div>

            {/* Luminous Glow Behind Subject */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Main Centered Content */}
            <motion.div
              style={{
                y: contentY,
                scale: contentScale,
                opacity: contentOpacity,
              }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-32 sm:pt-36 pb-4 flex flex-col items-center text-center will-change-transform">
              <div className="max-w-4xl flex flex-col items-center text-center">
                {/* Hero Headline */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.1] mb-6 [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)] [text-wrap:balance]">
                  Built on Solar.
                  <br />
                  Growing into{" "}
                  <span className="italic font-normal text-[#D4E012] relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
                    infrastructure.
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full h-3 text-[#D4E012]"
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
                </h1>

                {/* Subtitle Description */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 font-normal max-w-4xl mx-auto text-center leading-relaxed tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]">
                    <span className="sm:block">
                      Renewable energy, storage, substations and infrastructure,
                    </span>
                    <span className="sm:block mt-1 sm:mt-0">
                      brought together by one execution mindset.
                    </span>
                  </p>
              </div>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        {/* ------------------------------------------------------------- */}
        {/* CONTENT SHEET (Slides UP over the fixed Hero layer) */}
        {/* ------------------------------------------------------------- */}
        <div id="solutions-overview" className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* 02 / SERVICES & CAPABILITIES NAVIGATOR */}
          <SolutionNavigator />

          {/* 03 / PER-SOLUTION DEPTH BREAKDOWN */}
          <section className="relative border-b border-slate-200/80 bg-[#F8FAF8] text-[#0F172A]">
            <div className="mx-auto max-w-[1280px] space-y-[clamp(64px,9vw,120px)] px-4 py-[clamp(48px,7vw,100px)] sm:px-6 lg:px-8">
              {detailedSolutions.map((sol, index) => (
                <ScrollReveal key={sol.id} once distance={24}>
                  <div id={sol.id} className="relative scroll-mt-44 space-y-8 lg:space-y-10">
                    {/* Backward-compatible anchor targets */}
                    {sol.id === "solar-energy" && (
                      <span id="renewable-energy" className="absolute -top-44 pointer-events-none" aria-hidden />
                    )}
                    {sol.id === "bess-hybrid" && (
                      <span id="bess-storage" className="absolute -top-44 pointer-events-none" aria-hidden />
                    )}
                    {sol.id === "infrastructure" && (
                      <>
                        <span id="energy-infrastructure" className="absolute -top-44 pointer-events-none" aria-hidden />
                        <span id="civil-infrastructure" className="absolute -top-44 pointer-events-none" aria-hidden />
                      </>
                    )}
                    <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
                      <AnimatedPillBadge className="mb-2">{sol.badge}</AnimatedPillBadge>
                      <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-[2.25rem] font-medium leading-[1.25] text-[#0F172A] max-w-2xl mx-auto [text-wrap:balance]">
                        {sol.headline}
                      </h3>
                      <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto [text-wrap:balance]">
                        {sol.description.split("\n").map((line, idx) => (
                          <span key={idx}>
                            {idx > 0 && <br className="hidden sm:inline" />}
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
                      <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="group relative h-[300px] w-full overflow-hidden rounded-[24px] border border-slate-200 shadow-xl sm:h-[380px] lg:h-full lg:min-h-[420px]">
                          <Image
                            src={sol.image}
                            alt={sol.title}
                            fill
                            sizes="(min-width: 1024px) 480px, 100vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-[#6DAD45]/10" />
                          <div className="absolute bottom-5 left-5 right-5">
                            <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1.5 font-mono text-xs text-white">
                              {sol.title} Asset Showcase
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`flex flex-col gap-6 lg:col-span-7 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {sol.breakdownItems.map((item) => (
                            <li
                              key={item.name}
                              className="group/card relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#6DAD45]/70 hover:shadow-lg">
                              <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#6DAD45] transition-transform duration-300 group-hover/card:scale-x-100" />
                              <div>
                                <h4 className="mb-2 flex items-center gap-2 text-[15px] font-bold text-[#0F172A]">
                                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6DAD45]" />
                                  {item.name}
                                </h4>
                                <p className="text-sm font-light leading-relaxed text-slate-600">{item.desc}</p>
                              </div>
                              <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-[#6DAD45]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#4f8a2e]">
                                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                                {item.metric}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div>
                          <button type="button" onClick={() => setQuoteModalOpen(true)} className={CTA_CLASS}>
                            <span>{sol.buttonText}</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-[3px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* 04 / SERVICE ROADMAP - ANIMATED STAGE PIPELINE (LIGHT THEME) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-[clamp(60px,9vw,120px)] bg-[#F8FAF8] text-[#0F172A] relative z-10 border-b border-slate-200/80 select-none overflow-hidden">
            {/* Ambient Green Radial Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#6DAD45]/8 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal once>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                  <AnimatedPillBadge className="mb-6">
                    THE SERVICE ROADMAP
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-[#0F172A] tracking-tight leading-tight mb-4">
                    The same road.{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      A smarter project.
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
                  <p className="text-slate-600 font-normal text-base sm:text-lg max-w-3xl mx-auto text-center leading-relaxed">
                    From site feasibility to 24/7 O&M, every phase connects into the next stage gate. Scroll or click any stage to inspect the execution pipeline.
                  </p>
                </div>
              </ScrollReveal>

              {/* Animated Interactive Horizontal Roadmap (Matching Image 2 TurnkeyLifecycle flow) */}
              <ScrollReveal once delay={0.2}>
                <HorizontalServiceRoadmap
                  stages={serviceStages}
                  onOpenQuote={() => setQuoteModalOpen(true)} />
              </ScrollReveal>
            </div>
          </section>

          {/* 05 / SITE-WIDE FINAL CTA COMPONENT */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />

          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
