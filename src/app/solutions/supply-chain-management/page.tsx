"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import FinalCTA from "@/components/FinalCTA";
import RelatedSolutionsSection from "@/components/solutions/RelatedSolutionsSection";
import { STATES } from "@/data/projects";
import {
  CalendarClock,
  PackageCheck,
  Truck,
  Warehouse,
  ClipboardCheck,
  ShieldCheck,
  Shuffle,
  Gauge,
  BadgeCheck,
  SlidersHorizontal,
  Zap,
  CheckCircle2,
  ArrowRight,
  HardHat,
  type LucideIcon,
} from "lucide-react";

/* ---------- Content ---------- */

interface Stage {
  icon: LucideIcon;
  step: string;
  tag: string;
  title: string;
  body: string;
  points: string[];
}

const stages: Stage[] = [
  {
    icon: CalendarClock,
    step: "01",
    tag: "PLANNING & FORECASTING",
    title: "Know what is needed, and when",
    body: "We work out the materials from the design and the project schedule, then plan the order and timing for each phase. Items that take longest to arrive are flagged first, so nothing holds up the build.",
    points: [
      "Material needs worked out from the design",
      "Long-lead items identified early",
      "Deliveries timed to when the site is ready",
    ],
  },
  {
    icon: PackageCheck,
    step: "02",
    tag: "PROCUREMENT",
    title: "Buy the right equipment from the right makers",
    body: "We compare offers against the technical specification and the budget, and buy from manufacturers we are confident in. Every order is tracked, so cost stays in view from purchase to delivery.",
    points: [
      "Offers checked against specification and budget",
      "Clear terms with each supplier",
      "A tracking system for cost and order status",
    ],
  },
  {
    icon: Truck,
    step: "03",
    tag: "LOGISTICS & TRANSPORTATION",
    title: "Move it safely to every site",
    body: `Our plants are spread across ${STATES.length} states, from desert to hills, so one route does not fit all. We plan transport for each site and handle delicate items with care, so they arrive in the condition they left.`,
    points: [
      "Transport planned site by site",
      "Careful handling of modules and electrical equipment",
      "Delivery times agreed with the site team",
    ],
  },
  {
    icon: Warehouse,
    step: "04",
    tag: "INVENTORY MANAGEMENT",
    title: "Keep the right material in the right place",
    body: "Everything that arrives is logged and stored properly, then issued to the crew when the plan calls for it. That keeps shortages, damage and loss to a minimum.",
    points: [
      "Material logged on arrival",
      "Storage that protects against weather and damage",
      "Stock issued to crews as the plan needs it",
    ],
  },
  {
    icon: ClipboardCheck,
    step: "05",
    tag: "QUALITY CONTROL & INSPECTIONS",
    title: "Check it before it is installed",
    body: "We inspect equipment at the source where it matters and again when it reaches site. Anything that does not meet the specification is stopped, and replaced before it goes into the plant.",
    points: [
      "Inspection at source for key equipment",
      "Checks on arrival and test records kept",
      "Out-of-specification items rejected and replaced",
    ],
  },
];

const outcomes: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ShieldCheck, title: "Resilience", body: "A plan that holds when a supplier or a route lets us down." },
  { icon: Shuffle, title: "Flexibility", body: "Orders and deliveries that can shift when the project does." },
  { icon: Gauge, title: "Speed", body: "Equipment ordered early and moved without waiting." },
  { icon: BadgeCheck, title: "Reliability", body: "Material that arrives when promised and meets the spec." },
  { icon: SlidersHorizontal, title: "Customization", body: "A supply plan built around your project, not a template." },
  { icon: Zap, title: "Agility", body: "Quick decisions when something changes on site." },
];

/* ---------- Route stage ---------- */

function RouteStage({ stage, index }: { stage: Stage; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // "Reached" once the card crosses the middle band of the viewport, where the truck sits
  const reached = useInView(ref, { margin: "0px 0px -50% 0px", once: true });
  const Icon = stage.icon;
  const left = index % 2 === 0;

  return (
    <li ref={ref} className="relative pl-14 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-x-24">
      {/* stop marker on the route */}
      <span
        className={`absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-colors duration-300 lg:left-1/2 ${
          reached ? "border-slate-900 bg-slate-900 text-[#D4E012]" : "border-slate-200 bg-white text-slate-400"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>

      <ScrollReveal className={left ? "lg:col-start-1 lg:text-right" : "lg:col-start-2"}>
        <div className={`rounded-2xl border bg-white p-6 sm:p-8 shadow-sm transition-colors duration-300 ${reached ? "border-[#6DAD45]/50" : "border-slate-200"}`}>
          <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">
            STOP {stage.step} · {stage.tag}
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-serif-display font-medium text-slate-900 leading-tight">
            {stage.title}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{stage.body}</p>
          <ul className={`mt-5 space-y-2 ${left ? "lg:ml-auto" : ""}`}>
            {stage.points.map((pt) => (
              <li key={pt} className={`flex items-start gap-2.5 text-sm text-slate-700 ${left ? "lg:flex-row-reverse lg:text-right" : ""}`}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6DAD45]" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </li>
  );
}

/* ---------- Page ---------- */

export default function SupplyChainPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const routeRef = useRef<HTMLOListElement>(null);
  const reduce = !!useReducedMotion();

  // Transform + opacity only, so scrolling stays on the compositor
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-48px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // The route line fills as you travel down it
  const { scrollYProgress: routeProgress } = useScroll({
    target: routeRef,
    offset: ["start 50%", "end 50%"],
  });
  const lineScale = useTransform(routeProgress, [0, 1], [0, 1]);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 / HERO */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={heroRef}
            className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none"
          >
            <motion.div
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="absolute inset-0 z-0 h-full w-full will-change-transform"
            >
              <Image
                src="/images/partner-hero-bg.jpg"
                alt="Equipment supply for a Sarhat solar project"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-24 flex flex-col items-center text-center will-change-transform"
            >
              <div className="max-w-4xl flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 leading-[1.08] drop-shadow-lg">
                  Supply chain built <br />
                  <span className="text-[#D4E012] italic font-normal">around your project</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                  From the first forecast to the last inspection, we make sure the right equipment reaches your site in the right condition, at the right time.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Intro */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
                  <AnimatedPillBadge className="mb-6">SUPPLY CHAIN MANAGEMENT</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Equipment that arrives</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      right, and on time
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
                    We help the renewable energy industry with supply solutions led by people who understand what a solar project needs. We build the supply chain around your project and its full lifecycle, not the other way round.
                  </p>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                    Our consultative approach improves product quality and keeps the budget under control through a tracking system that follows every order. Follow one delivery from plan to site below.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* The route: a truck stays at mid-screen while the stops pass by */}
          <section className="pb-16 sm:pb-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="relative">
                {/* route line + fill */}
                <div className="absolute inset-y-0 left-5 w-[3px] -translate-x-1/2 rounded-full bg-slate-200 lg:left-1/2" aria-hidden />
                <motion.div
                  style={{ scaleY: reduce ? 1 : lineScale }}
                  className="absolute inset-y-0 left-5 w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-[#6DAD45] to-[#D4E012] will-change-transform lg:left-1/2"
                  aria-hidden
                />

                {/* the truck: pinned to mid-screen with plain CSS sticky, no scroll handler */}
                <div className="pointer-events-none absolute inset-y-0 left-5 z-20 -translate-x-1/2 lg:left-1/2" aria-hidden>
                  <div className="sticky top-[50vh] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#D4E012] text-black shadow-lg ring-4 ring-[#F8FAF8]">
                    <Truck className="h-5 w-5" />
                  </div>
                </div>

                <ol ref={routeRef} className="relative space-y-10 sm:space-y-14 py-6">
                  {stages.map((s, i) => (
                    <RouteStage key={s.step} stage={s} index={i} />
                  ))}
                </ol>
              </div>

              {/* arrival */}
              <ScrollReveal>
                <div className="mt-6 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">
                    <HardHat className="h-4 w-4 text-[#D4E012]" />
                    Delivered to site, ready for the crew
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Outcomes */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-6">WHAT YOU GAIN</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Six key advantages</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      a good supply chain gives you
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
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {outcomes.map((o, i) => {
                  const Icon = o.icon;
                  return (
                    <ScrollReveal key={o.title} delay={(i % 3) * 0.06}>
                      <div className="group h-full rounded-2xl border border-slate-200 bg-[#F8FAF8] p-7 text-center transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#6DAD45]/50 hover:shadow-lg">
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[#D4E012]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-5 font-serif-display text-xl font-medium text-slate-900">{o.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{o.body}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

            </div>
          </section>

          {/* Related Solutions */}
          <RelatedSolutionsSection currentHref="/solutions/supply-chain-management" />

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
