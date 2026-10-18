"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import FinalCTA from "@/components/FinalCTA";
import RelatedSolutionsSection from "@/components/solutions/RelatedSolutionsSection";
import ConstructionScene from "@/components/solutions/ConstructionScene";
import { CheckCircle2, ArrowRight } from "lucide-react";

/* ---------- Content ---------- */

const stages = [
  {
    tag: "PRE-CONSTRUCTION ACTIVITIES",
    title: "Get the site ready before the first pile",
    body: "We set up the site office and storage, mark the layout on the ground and agree how crews, equipment and material will arrive. A calm start saves weeks later.",
    points: [
      "Survey and layout marked on the ground",
      "Site office, storage and safety set-up",
      "Crew, equipment and material plan agreed",
    ],
  },
  {
    tag: "CIVIL WORKS",
    title: "Build the ground the plant stands on",
    body: "Foundations, access roads, trenches and drainage come first, because everything above depends on them. We test the foundations before any structure goes on top.",
    points: [
      "Piles and foundations tested before erection",
      "Access roads, trenches and drainage",
      "Bases for the inverter, transformer and control room",
    ],
  },
  {
    tag: "MECHANICAL ERECTION",
    title: "Raise the structures and fit the modules",
    body: "Steel structures are set out and levelled, and the modules are mounted on them row by row. We check alignment as we go, so the finished array is straight and secure.",
    points: [
      "Structures set out and levelled",
      "Modules fitted and fixed in place",
      "Alignment checked row by row",
    ],
  },
  {
    tag: "ELECTRICAL ERECTION",
    title: "Connect everything, safely",
    body: "Cables are laid and terminated, and the inverter, transformer and earthing are installed and joined up to the grid connection point, following the approved drawings.",
    points: [
      "Cable laying and termination",
      "Inverter, transformer and earthing installed",
      "Connection to the grid point as drawn",
    ],
  },
  {
    tag: "QUALITY & SAFETY COMPLIANCE",
    title: "Check as we build, not only at the end",
    body: "Quality and safety checks run through every stage. Crews are briefed and protected, work is inspected against the drawings, and anything that falls short is corrected before the next stage begins.",
    points: [
      "Safety briefings and protective equipment on every shift",
      "Inspection of each stage against the drawings",
      "Records kept for every check",
    ],
  },
  {
    tag: "HANDOVER & FINAL COMMISSIONING",
    title: "Switch on, test, and hand over",
    body: "We test the plant, complete the required inspections and energise it. You receive the as-built records and documents you need to operate it with confidence.",
    points: [
      "Testing and inspection before energisation",
      "Energisation with the DISCOM",
      "As-built records and documents handed over",
    ],
  },
];

/* ---------- Stage text block ---------- */

function StageText({ stage, index, onActive }: { stage: (typeof stages)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // Active when the block crosses the middle band of the viewport
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[48vh] lg:min-h-[70vh] items-center py-6">
      <div>
        <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">
          STAGE {String(index + 1).padStart(2, "0")} · {stage.tag}
        </div>
        <h3 className="mt-2 text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 leading-tight">{stage.title}</h3>
        <p className="mt-4 text-slate-600 leading-relaxed">{stage.body}</p>
        <ul className="mt-5 space-y-2.5">
          {stage.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6DAD45]" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function ConstructionPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Transform + opacity only, so scrolling stays on the compositor
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

        {/* 01 / HERO */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${
            isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
          }`}
          aria-hidden={isPastHero}
        >
          <section ref={heroRef} className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full will-change-transform">
              <Image
                src="/images/timeline-2026.jpg"
                alt="Sarhat crew working at a substation"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 via-45% to-black/40 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-24 flex flex-col items-center text-center will-change-transform"
            >
              <div className="max-w-4xl flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 leading-[1.08] drop-shadow-lg">
                  Where the plan <br />
                  <span className="text-[#D4E012] italic font-normal">becomes a plant</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                  Safe, careful site construction and erection, from the first stake in the ground to the day the plant is switched on.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />


        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Intro */}
          <section className="pt-16 sm:pt-24 pb-6 bg-[#F8FAF8]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
                  <AnimatedPillBadge className="mb-6">SITE CONSTRUCTION &amp; ERECTION</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Watch a plant</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      take shape
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
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
                  <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                    At Sarhat Energy, we provide complete site construction and erection services for renewable energy projects, with careful execution, structural stability and on-time completion. Our work covers utility-scale, commercial and rooftop solar, always with quality, safety and efficiency in focus.
                  </p>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                    Scroll through the six stages and watch the plant build up as we go.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Build-up: pinned scene assembles as stages scroll past */}
          <section className="pb-16 sm:pb-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14">
                <div className="contents lg:block">
                  <div className="sticky top-[72px] z-20 max-lg:h-[30vh] lg:top-24">
                    <div className="relative h-full overflow-hidden rounded-3xl bg-slate-950 shadow-xl ring-1 ring-slate-200 lg:aspect-[8/5] lg:h-auto">
                      <ConstructionScene stage={active} />
                      <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#D4E012] backdrop-blur-sm">
                        Stage {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                        <div
                          className="h-full origin-left bg-gradient-to-r from-[#6DAD45] to-[#D4E012] transition-transform duration-500 motion-reduce:transition-none"
                          style={{ transform: `scaleX(${(active + 1) / stages.length})` }}
                        />
                      </div>
                    </div>
                    <p className="mt-3 hidden text-center text-xs text-slate-500 lg:block">{stages[active].tag}</p>
                  </div>
                </div>

                <div>
                  {stages.map((s, i) => (
                    <StageText key={s.tag} stage={s} index={i} onActive={setActive} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RELATED SOLUTIONS */}
          <RelatedSolutionsSection currentHref="/solutions/construction" />

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
