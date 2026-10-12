"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import { stageScenes } from "@/components/solutions/EngineeringStageScenes";
import { PROJECTS, STATES, sumMW } from "@/data/projects";
import {
  Compass,
  PencilRuler,
  FileCheck2,
  HardHat,
  MapPin,
  ArrowRight,
  Zap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* ---------- Content (all derived or written once; nothing repeated across sections) ---------- */

const regionFocus: Record<string, string> = {
  Rajasthan: "Loose sandy soil, extreme heat and dust shape foundation choices and how we plan for output.",
  Haryana: "Flat farmland criss-crossed by canals and field boundaries, so layouts follow the land and the feeder.",
  "Uttar Pradesh": "Small, irregular parcels near feeders. Making the layout fit awkward boundaries is the real work.",
  "Madhya Pradesh": "Ground that changes from rocky to alluvial within a district, so foundations follow the test results.",
  Bihar: "Monsoon waterlogging and flood-prone belts call for raised equipment and drainage planned up front.",
  "Arunachal Pradesh": "Hilly, high-rainfall terrain with difficult access, so design is driven by what trucks and crews can reach.",
};

const regionList = Object.keys(regionFocus).map((name) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  summary: STATES.find((s) => s.state === name),
}));

const portfolio = [
  { value: String(PROJECTS.length), label: "Projects in our portfolio" },
  { value: `${sumMW(PROJECTS).toFixed(0)}+ MW`, label: "Total planned capacity" },
  { value: String(regionList.length), label: "States we engineer for" },
  {
    value: String(PROJECTS.filter((p) => p.status === "Commissioned").length),
    label: "Plants commissioned so far",
  },
];

interface Phase {
  icon: LucideIcon;
  step: string;
  title: string;
  body: string;
  outcome: string;
}

const phases: Phase[] = [
  {
    icon: Compass,
    step: "01",
    title: "Understand the site before drawing a line",
    body: "Our engineers walk the land, check boundaries and access, test the soil and confirm where the plant can actually connect to the DISCOM network. Most surprises on a solar project start here, so this is where we spend the time.",
    outcome: "A site report the whole team trusts",
  },
  {
    icon: PencilRuler,
    step: "02",
    title: "Design for the plant you will operate",
    body: "Layout, electrical and structural design are done together, not handed from desk to desk. We size the plant to the land and the grid point, and keep maintenance access in mind from the first drawing.",
    outcome: "Drawings that match the ground",
  },
  {
    icon: FileCheck2,
    step: "03",
    title: "Clear approvals without last-minute rework",
    body: "Scheme norms, DISCOM requirements and statutory inspections are planned into the design instead of being fixed afterwards. We prepare the documents and answer the queries, so your approvals do not wait on us.",
    outcome: "Inspection-ready from day one",
  },
  {
    icon: HardHat,
    step: "04",
    title: "Stay with the build until it is energised",
    body: "Engineering does not end at issue of drawings. Our team supports the construction crew on site, resolves field changes quickly and records the plant exactly as it was built for the people who will run it.",
    outcome: "As-built records you can operate from",
  },
];


/* ---------- Page ---------- */

export default function EngineeringPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Hero: transform + opacity only, so scrolling stays on the compositor
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-48px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Timeline: one scroll-linked line, no per-card listeners
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(lineProgress, [0, 1], [0, 1]);

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
                src="/images/hero-solar.jpg"
                alt="Sarhat engineering team planning a solar plant"
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
                  Engineering that starts <br />
                  <span className="text-[#D4E012] italic font-normal">on your land</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                  Sarhat&apos;s engineers take a solar plant from a plot of land to a working grid connection, and stay until it is energised.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Who we engineer for, grounded in the real portfolio */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto">
                  <AnimatedPillBadge className="mb-4">OUR ENGINEERING</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Practical design for plants that get built
                  </h2>
                  <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                    Our work is mostly KUSUM-scheme and utility-connected solar plants of a few megawatts each. Every one sits on different ground and connects to a different substation, so we do not reuse a template. We engineer each plant for its own site.
                  </p>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                    The same engineers who survey the site also sign off the design and support the build. Fewer handovers means fewer gaps between the drawing and what is on the ground.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {portfolio.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                    >
                      <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-900">{s.value}</div>
                      <div className="mt-2 text-xs sm:text-sm text-slate-500 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* How an engagement runs: scroll-drawn timeline */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                  <AnimatedPillBadge className="mb-3">HOW WE WORK</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    From first site visit to energisation
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Four stages, one team, and no point where responsibility quietly changes hands.
                  </p>
                </div>
              </ScrollReveal>

              <div ref={timelineRef} className="relative">
                {/* Track + progress line */}
                <div className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-slate-200" aria-hidden />
                <motion.div
                  style={{ scaleY: lineScale }}
                  className="absolute left-5 sm:left-6 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[#6DAD45] to-[#D4E012] will-change-transform"
                  aria-hidden
                />

                <ol className="space-y-10 sm:space-y-12">
                  {phases.map((p, idx) => {
                    const Icon = p.icon;
                    const Scene = stageScenes[idx];
                    return (
                      <li key={p.step} className="relative pl-16 sm:pl-20">
                        <span className="absolute left-0 top-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-900 text-[#D4E012] shadow-md ring-4 ring-white">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                          <ScrollReveal>
                            <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">
                              STAGE {p.step}
                            </div>
                            <h3 className="mt-1 text-xl sm:text-2xl font-serif-display font-medium text-slate-900">
                              {p.title}
                            </h3>
                            <p className="mt-3 text-slate-600 leading-relaxed">{p.body}</p>
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F8FAF8] px-4 py-1.5 text-xs font-medium text-slate-700">
                              <Zap className="h-3.5 w-3.5 text-[#6DAD45]" />
                              {p.outcome}
                            </div>
                          </ScrollReveal>
                          <Scene />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </section>

          {/* Site conditions by state, derived from the project sheet */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
                  <AnimatedPillBadge className="mb-3">ACROSS INDIA</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Every state asks something different of the design
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Soil, weather, land shape and access change from one region to the next. This is what we plan for in each place we work.
                  </p>
                </div>
              </ScrollReveal>

              <div className="flex flex-wrap justify-center gap-5">
                {regionList.map((r) => (
                  <ScrollReveal key={r.name} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                    <Link
                      href={`/projects/${r.slug}`}
                      className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#6DAD45]/60 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-slate-900">
                          <MapPin className="h-4 w-4 text-[#6DAD45]" />
                          <h3 className="font-serif-display text-lg font-medium">{r.name}</h3>
                        </div>
                        {r.summary && (
                          <span className="font-mono text-xs text-slate-400">{r.summary.capacityMW.toFixed(1)} MW</span>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{regionFocus[r.name]}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                        See projects
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Go deeper: teasers only, details live on the sub-pages */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-3">GO DEEPER</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Two ways to look inside our engineering
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                   {
                    href: "/solutions/engineering/innovation",
                    icon: Sparkles,
                    tag: "Innovation",
                    title: "Where we try to do better",
                    body: "The ideas we use to get more energy from each site and make plants last longer in the field.",
                  },
                  {
                    href: "/solutions/engineering/system-design",
                    icon: PencilRuler,
                    tag: "System Design",
                    title: "What we design and hand over",
                    body: "The electrical and structural design of the plant, and the drawing package your contractors build from.",
                  },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <ScrollReveal key={c.href}>
                      <Link
                        href={c.href}
                        className="group flex h-full flex-col rounded-3xl bg-slate-900 p-8 sm:p-10 text-white transition-transform duration-200 hover:-translate-y-1"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#D4E012]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="mt-6 font-mono text-xs uppercase tracking-wider text-[#D4E012]">{c.tag}</div>
                        <h3 className="mt-2 font-serif-display text-2xl sm:text-3xl font-medium">{c.title}</h3>
                        <p className="mt-3 flex-1 text-sm sm:text-base text-slate-300 font-light leading-relaxed">{c.body}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                          Explore {c.tag}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
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
