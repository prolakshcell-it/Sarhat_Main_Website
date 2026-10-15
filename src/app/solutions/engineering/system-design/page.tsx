"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
import {
  Sun,
  Cable,
  Cpu,
  Zap,
  ShieldCheck,
  Gauge,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Wrench,
  CloudRain,
  Layers,
  type LucideIcon,
} from "lucide-react";

/* ---------- Content ---------- */

interface ChainNode {
  icon: LucideIcon;
  short: string;
  title: string;
  design: string;
  drawings: string[];
  why: string;
}

/** Follows the power from the panels to the DISCOM grid. */
const chain: ChainNode[] = [
  {
    icon: Sun,
    short: "Array",
    title: "Panel array & structure",
    design:
      "We decide how many panels fit, how the rows are spaced and tilted, and what the structures stand on. The layout is drawn on your actual plot, with paths left open for cleaning and repair.",
    drawings: ["General arrangement layout", "Structure and foundation drawings", "Row spacing and shade check"],
    why: "A good layout is the cheapest way to get more energy from the same land.",
  },
  {
    icon: Cable,
    short: "DC cables",
    title: "Strings & DC cabling",
    design:
      "Panels are grouped into strings and joined back to the inverters by the shortest sensible cable routes. We size every cable for the current it carries and the heat it will see.",
    drawings: ["String layout", "Cable schedule", "Trench and cable route details"],
    why: "Shorter, correctly sized cables lose less energy and run cooler for years.",
  },
  {
    icon: Cpu,
    short: "Inverters",
    title: "Inverters",
    design:
      "We choose the inverter size and position to suit the array and the site conditions, with enough space for airflow and for a technician to work safely.",
    drawings: ["Inverter location plan", "Inverter connection details"],
    why: "Inverters are the busiest equipment on site. Where they sit affects heat, access and repair time.",
  },
  {
    icon: Zap,
    short: "Transformer",
    title: "Transformer & switchgear",
    design:
      "The inverter output is raised to the voltage your DISCOM connection needs. We lay out the transformer, switchgear and their foundations so everything has room and a safe clearance.",
    drawings: ["Single-line diagram", "Equipment layout", "Transformer and switchgear foundations"],
    why: "This is where the plant meets the grid, so clear drawings avoid delay at inspection.",
  },
  {
    icon: ShieldCheck,
    short: "Protection",
    title: "Protection & earthing",
    design:
      "We plan the protection that switches a faulty section off safely, and the earthing and lightning protection that keep people and equipment safe in storms and faults.",
    drawings: ["Protection scheme", "Earthing layout", "Lightning protection plan"],
    why: "Protection is mostly invisible, until the day it is needed.",
  },
  {
    icon: Gauge,
    short: "Metering",
    title: "Metering & grid connection",
    design:
      "We design the metering and the point where the plant joins the DISCOM network, following that DISCOM's requirements for the scheme the plant is built under.",
    drawings: ["Metering arrangement", "Grid connection details"],
    why: "Your income is measured here, so it has to be right from the start.",
  },
  {
    icon: Activity,
    short: "Monitoring",
    title: "Monitoring & control",
    design:
      "We plan what the plant measures and how the data reaches the people who run it, so operators see problems early instead of finding them in the monthly bill.",
    drawings: ["Monitoring layout", "Communication and data scheme"],
    why: "A plant you can see into is a plant you can look after.",
  },
];

const sheets = [
  { no: "01", title: "General arrangement", note: "Whole-plant layout on your plot" },
  { no: "02", title: "Single-line diagram", note: "How power flows, panel to grid" },
  { no: "03", title: "String and cable schedule", note: "Every run, sized and routed" },
  { no: "04", title: "Structure and foundations", note: "What is built and what it stands on" },
  { no: "05", title: "Equipment layout", note: "Inverters, transformer, switchgear" },
  { no: "06", title: "Earthing and lightning", note: "Safety layout for site and equipment" },
  { no: "07", title: "Civil and drainage", note: "Roads, trenches and water paths" },
  { no: "08", title: "As-built set", note: "The plant exactly as it was built" },
];

const rules: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Wrench,
    title: "Design for the person who maintains it",
    body: "Every row, inverter and panel must be reachable. If a technician cannot get to it easily, we redraw it.",
  },
  {
    icon: CloudRain,
    title: "Plan for the hardest week",
    body: "We design for monsoon rain, peak heat and dust, because that is when the plant gets tested.",
  },
  {
    icon: Layers,
    title: "One set of drawings",
    body: "Every change is recorded in a single drawing set, so the crew, the client and the inspector are always looking at the same plan.",
  },
];

/* ---------- Page ---------- */

export default function SystemDesignPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
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

  const node = chain[active];
  const NodeIcon = node.icon;
  const progress = active / (chain.length - 1);

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
                src="/images/substation-project.jpg"
                alt="Substation and control building at a Sarhat solar site"
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
                  Drawings your crew <br />
                  <span className="text-[#D4E012] italic font-normal">can build from</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                  We design every part of the plant, from the first panel to the grid connection, so the people on site have fewer questions and the people who approve it have fewer objections.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Follow the power: interactive chain */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
                  <AnimatedPillBadge className="mb-6">SYSTEM DESIGN</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Follow the power,</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      from panel to grid
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
                  <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    A solar plant is a chain. Each link has to suit the ones on either side, so we design them together. Select a link to see what we design and what you get.
                  </p>
                </div>
              </ScrollReveal>

              {/* chain selector */}
              <div className="relative">
                <div className="hidden lg:block absolute top-[22px] left-[7.14%] right-[7.14%] h-[3px] rounded-full bg-slate-200" aria-hidden />
                <motion.div
                  className="hidden lg:block absolute top-[22px] left-[7.14%] right-[7.14%] h-[3px] origin-left rounded-full bg-gradient-to-r from-[#6DAD45] to-[#D4E012] will-change-transform"
                  animate={{ scaleX: progress }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
                  aria-hidden
                />
                <div className="relative flex lg:grid lg:grid-cols-7 gap-2 overflow-x-auto no-scrollbar pb-2">
                  {chain.map((c, i) => {
                    const Icon = c.icon;
                    const isActive = i === active;
                    const reached = i <= active;
                    return (
                      <button
                        key={c.title}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActive(i)}
                        className="group flex min-w-[84px] lg:min-w-0 flex-col items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                            isActive
                              ? "border-slate-900 bg-slate-900 text-[#D4E012] shadow-lg"
                              : reached
                              ? "border-[#6DAD45] bg-white text-[#4f8a2e]"
                              : "border-slate-200 bg-white text-slate-400 group-hover:border-slate-400"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span
                          className={`text-xs font-medium transition-colors ${
                            isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                          }`}
                        >
                          {c.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* detail panel */}
              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0.1 : 0.25, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                  >
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[#D4E012]">
                          <NodeIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="font-mono text-[11px] font-bold tracking-widest text-[#6DAD45]">
                            LINK {String(active + 1).padStart(2, "0")} OF {String(chain.length).padStart(2, "0")}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 leading-tight">
                            {node.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-5 text-slate-600 leading-relaxed text-base sm:text-lg">{node.design}</p>
                      <p className="mt-5 rounded-xl border-l-4 border-[#6DAD45] bg-[#F8FAF8] px-4 py-3 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Why it matters: </span>
                        {node.why}
                      </p>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="rounded-2xl bg-slate-900 p-6 text-white">
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                          <FileText className="h-3.5 w-3.5 text-[#D4E012]" />
                          In your drawing set
                        </div>
                        <ul className="mt-4 space-y-3">
                          {node.drawings.map((d) => (
                            <li key={d} className="flex items-start gap-2.5 text-sm text-slate-100">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6DAD45]" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setActive((a) => Math.max(0, a - 1))}
                            disabled={active === 0}
                            className="rounded-full border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-30 cursor-pointer disabled:cursor-default"
                          >
                            Previous link
                          </button>
                          <button
                            type="button"
                            onClick={() => setActive((a) => Math.min(chain.length - 1, a + 1))}
                            disabled={active === chain.length - 1}
                            className="rounded-full bg-[#6DAD45] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#5da037] disabled:opacity-30 cursor-pointer disabled:cursor-default"
                          >
                            Next link
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Typical drawing set */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
                  <AnimatedPillBadge className="mb-6">WHAT YOU RECEIVE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">A drawing set</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      you can hand straight to site
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
                  <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    A typical set for one plant. The exact sheets depend on the scheme and the site.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sheets.map((s, i) => (
                  <ScrollReveal key={s.no} delay={(i % 4) * 0.06}>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-slate-300 bg-[#F8FAF8] p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg">
                      {/* title-block corner, like a real drawing sheet */}
                      <div className="absolute right-0 top-0 flex h-9 w-14 items-center justify-center border-b border-l border-slate-300 bg-white font-mono text-xs font-bold text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-[#D4E012]">
                        {s.no}
                      </div>
                      <div className="mt-8 h-px w-10 bg-[#6DAD45]" />
                      <h3 className="mt-3 font-serif-display text-lg font-medium text-slate-900 leading-snug">{s.title}</h3>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{s.note}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Design rules */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-6">OUR RULES</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Engineering Principles.</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Three rules every design follows
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {rules.map((r) => {
                  const Icon = r.icon;
                  return (
                    <ScrollReveal key={r.title}>
                      <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 text-center">
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[#D4E012]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-5 font-serif-display text-xl font-medium text-slate-900">{r.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{r.body}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              <ScrollReveal>
                <Link
                  href="/solutions/engineering/innovation"
                  className="group mx-auto mt-12 flex max-w-5xl flex-col items-start justify-between gap-4 rounded-3xl bg-slate-900 p-8 text-white transition-transform duration-200 hover:-translate-y-1 sm:flex-row sm:items-center sm:p-10"
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D4E012]">
                      <Sparkles className="h-4 w-4" /> Innovation
                    </div>
                    <h3 className="mt-2 font-serif-display text-2xl sm:text-3xl font-medium">
                      See how drones and VR shape the design
                    </h3>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
                    Explore Innovation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
