"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import FinalCTA from "@/components/FinalCTA";
import SolutionNavigator from "@/components/solutions/SolutionNavigator";
import SolutionTabsBar from "@/components/solutions/SolutionTabsBar";
import { detailedSolutions, serviceStages } from "@/components/solutions/data";

const CTA_CLASS =
  "group/cta inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#D4E012]/25 transition-all duration-200 hover:-translate-y-px hover:from-[#c2ce0d] hover:to-[#4ed423] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012] focus-visible:ring-offset-2";

export default function SolutionsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Hero fades as the content sheet slides over it
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

  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = serviceStages[activeStageIndex];


  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / FULL-SCREEN HERO SECTION (Matching Insights & About page layout) */}
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
                alt="Sarhat Solutions Hero"
                fill
                priority
                quality={95}
                className="object-cover object-center opacity-85"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
              {/* Dark Scrim Overlay */}
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
                {/* Serif H1 Heading matching site standard */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-5xl drop-shadow-lg"
                >
                  Built on Solar.
                  <span className="italic font-normal text-white">
                    Growing into <span className="text-[#D4E012]">infrastructure.</span>
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
                  From the ground beneath a solar plant to the grid that carries its power, Sarhat brings engineering, civil works and on-site execution together under one connected model.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CONTENT SHEET */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* 02 / SERVICES & CAPABILITIES NAVIGATOR */}
          <SolutionNavigator />

          {/* 03 / PER-SOLUTION DEPTH BREAKDOWN */}
          <section className="relative border-b border-slate-200/80 bg-[#F8FAF8] text-[#0F172A]">
            <SolutionTabsBar />
            <div className="mx-auto max-w-[1280px] space-y-[clamp(64px,9vw,120px)] px-4 py-[clamp(48px,7vw,100px)] sm:px-6 lg:px-8">
              {detailedSolutions.map((sol, index) => (
                <ScrollReveal key={sol.id} once distance={24}>
                  <div id={sol.id} className="scroll-mt-44 space-y-8 lg:space-y-10">
                    <div className="max-w-4xl space-y-4">
                      <AnimatedPillBadge className="mb-1">{sol.badge}</AnimatedPillBadge>
                      <h3 className="font-serif-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-tight text-[#0F172A]">
                        {sol.headline}
                      </h3>
                      <p className="text-[clamp(15px,1.3vw,18px)] font-light leading-relaxed text-slate-600">{sol.description}</p>
                    </div>

                    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
                      <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="group relative h-[300px] w-full overflow-hidden rounded-[24px] border border-slate-200 shadow-xl sm:h-[380px] lg:h-full lg:min-h-[420px]">
                          <Image
                            src={sol.image}
                            alt={sol.title}
                            fill
                            sizes="(min-width: 1024px) 480px, 100vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
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
                              className="group/card relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#6DAD45]/70 hover:shadow-lg"
                            >
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
          {/* 04 / SERVICE ROADMAP - ANIMATED STAGE PIPELINE */}
          {/* ------------------------------------------------------------- */}
          <section className="py-[clamp(60px,9vw,120px)] bg-[#09120B] text-white relative z-10 border-b border-slate-800/90 select-none overflow-hidden">
            {/* Ambient Green Radial Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#D4E012]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal once>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                  <div>
                    <AnimatedPillBadge darkBg className="mb-3">
                      THE SERVICE ROADMAP
                    </AnimatedPillBadge>
                    <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight">
                      The same road. <br />
                      <span className="text-[#D4E012] italic">A smarter project.</span>
                    </h2>
                  </div>
                  <p className="text-slate-300 font-light text-base max-w-md leading-relaxed">
                    From site feasibility to 24/7 O&M, every phase connects seamlessly into the next stage gate. Click or tap any stage to inspect the execution pipeline.
                  </p>
                </div>
              </ScrollReveal>

              {/* Animated Interactive Pipeline Grid */}
              <ScrollReveal once delay={0.2}>
                <div className="bg-[#06140b] border border-[#163a23] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
                  {/* Pipeline Horizontal Progress Line */}
                  <div className="relative w-full h-1.5 bg-[#123320] rounded-full my-8">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#6DAD45] via-[#5EE72D] to-[#D4E012] rounded-full shadow-[0_0_12px_#D4E012]"
                      animate={{
                        width: `${((activeStageIndex + 1) / serviceStages.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>

                  {/* Stage Node Selection Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
                    {serviceStages.map((st, idx) => {
                      const isActive = idx === activeStageIndex;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setActiveStageIndex(idx)}
                          aria-pressed={isActive}
                          className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer border ${isActive
                            ? "bg-gradient-to-br from-[#D4E012] to-[#5EE72D] text-black font-bold border-[#D4E012] shadow-lg shadow-[#D4E012]/20 scale-[1.03]"
                            : "bg-[#0b1f13] text-slate-300 border-[#1a422a] hover:border-slate-300 hover:text-white"
                            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012]`}
                        >
                          <span
                            className={`font-mono text-xs font-bold block mb-1 ${isActive ? "text-black" : "text-[#D4E012]"
                              }`}
                          >
                            STAGE {st.num}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold leading-snug">
                            {st.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Service Stage Details Container */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="bg-[#0e2518]/90 border border-[#1e4d30] rounded-2xl p-6 sm:p-8 backdrop-blur-md relative"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#D4E012] block mb-1">
                            STAGE {activeStage.num} PIPELINE DETAILS
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-white mb-2">
                            {activeStage.headline}
                          </h3>
                          <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-3xl">
                            {activeStage.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setQuoteModalOpen(true)}
                          className="shrink-0 bg-[#D4E012] hover:bg-[#b8c40e] text-black font-extrabold text-xs uppercase px-5 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer w-fit"
                        >
                          <span>DISCUSS STAGE {activeStage.num}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-black" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
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
