"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import FinalCTA from "@/components/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { PROJECT_ROWS } from "@/data/projects";
import {
  CheckCircle2,
  ArrowUpRight,
  Compass,
  Truck,
  HardHat,
  Wrench,
  Search,
  Plus,
  Minus,
} from "lucide-react";

/* ---------- Data Definitions ---------- */

interface DeliverableStep {
  step: string;
  title: string;
  body: string;
}

const deliverables: DeliverableStep[] = [
  {
    step: "01",
    title: "Soil investigation",
    body: "Bore holes, SPT, resistivity and lab testing.",
  },
  {
    step: "02",
    title: "Foundation design",
    body: "Pile type, depth and spacing by load and soil.",
  },
  {
    step: "03",
    title: "Pile testing",
    body: "Pull-out and lateral load tests on trial piles.",
  },
  {
    step: "04",
    title: "Installation",
    body: "Ramming, bored cast-in-situ or helical piles.",
  },
  {
    step: "05",
    title: "Open foundations",
    body: "Isolated and raft foundations for equipment and buildings.",
  },
  {
    step: "06",
    title: "Quality records",
    body: "Pile logs, tolerances and as-built records.",
  },
];

interface SolutionCard {
  tag: string;
  title: string;
  body: string;
  linkText: string;
  href: string;
  icon: typeof Compass;
}

const solutionCards: SolutionCard[] = [
  {
    tag: "INNOVATION & SYSTEM DESIGN",
    title: "Engineering",
    body: "Feasibility, design and the engineering decisions that fix 80% of a project's cost and yield.",
    linkText: "EXPLORE ENGINEERING",
    href: "/solutions/engineering",
    icon: Compass,
  },
  {
    tag: "PROCUREMENT",
    title: "Supply Chain Management",
    body: "Tier-1 procurement, ALMM/DCR compliance and logistics that keep your site moving.",
    linkText: "EXPLORE SUPPLY CHAIN MANAGEMENT",
    href: "/solutions/supply-chain-management",
    icon: Truck,
  },
  {
    tag: "BUILD & COMMISSION",
    title: "Construction",
    body: "Civil, mechanical and electrical execution with safety and schedule discipline.",
    linkText: "EXPLORE CONSTRUCTION",
    href: "/solutions/construction",
    icon: HardHat,
  },
  {
    tag: "O&M",
    title: "Operation & Maintenance",
    body: "Monitoring, cleaning and preventive maintenance that protect generation for 25 years.",
    linkText: "EXPLORE OPERATION & MAINTENANCE",
    href: "/solutions/operation-and-maintenance",
    icon: Wrench,
  },
  {
    tag: "AUDIT & REVAMP",
    title: "Solar Plant Health Check-up",
    body: "A diagnostic audit for plants that are under-generating, ageing or changing hands.",
    linkText: "EXPLORE SOLAR PLANT HEALTH CHECK-UP",
    href: "/solutions/solar-plant-health-checkup",
    icon: Search,
  },
];

interface StateProjectSummary {
  state: string;
  code: string;
  title: string;
  capacityMW: string;
  projectsCount: number;
}

const stateSummaries: StateProjectSummary[] = [
  {
    state: "Rajasthan",
    code: "RJ",
    title: "Piling & Foundations in Rajasthan",
    capacityMW: "25.03 MW",
    projectsCount: 10,
  },
  {
    state: "Uttar Pradesh",
    code: "UP",
    title: "Piling & Foundations in Uttar Pradesh",
    capacityMW: "9.12 MW",
    projectsCount: 5,
  },
  {
    state: "Arunachal Pradesh",
    code: "AR",
    title: "Piling & Foundations in Arunachal Pradesh",
    capacityMW: "0.8 MW",
    projectsCount: 1,
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Which pile type is best for solar?",
    answer:
      "Driven ramming piles are fastest and most cost-effective for cohesive soils and dense sands. Bored cast-in-situ concrete piles are preferred in hard rock, boulder strata or when vibration must be avoided. Helical or screw piles are suited for soft soils, high water tables, and areas requiring rapid installation without concrete curing time.",
  },
  {
    question: "Why do pull-out tests matter?",
    answer:
      "In solar arrays, wind uplift is typically the governing load rather than downward compression. Pull-out (tension) load tests on preliminary trial piles prove the soil-pile skin friction under real site conditions, verifying that piles won't pull out during monsoon storms and preventing costly over-design or catastrophic structural failure.",
  },
  {
    question: "What if the soil varies across the site?",
    answer:
      "Large solar parks often span diverse geologies—from loose sand dunes to hard rocky patches or low-lying clay. We conduct systematic geotechnical borehole grids, electrical resistivity tests, and zone-based pile designs with variable depths and pile sections to optimize steel weight and avoid rejection during ramming.",
  },
  {
    question: "Do you do foundations for buildings too?",
    answer:
      "Yes. In addition to solar module piles, our civil engineering team constructs heavy equipment foundations for transformers, inverter stations, control rooms, switchyard gantry towers, transmission monopoles, and pre-engineered industrial buildings.",
  },
];

interface RelatedProduct {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

const relatedProducts: RelatedProduct[] = [
  {
    category: "INFRASTRUCTURE",
    title: "Substations / Switchyards",
    description:
      "From 11/33 kV bays for KUSUM plants to 400 kV pooling stations, built by our Transmission & Sub-Station Division.",
    image: "/images/substation-project.jpg",
    href: "/infrastructure/substations",
  },
  {
    category: "INFRASTRUCTURE",
    title: "Transmission Lines",
    description:
      "EHV evacuation corridors, tower spotting, RoW resolution, and turnkey line stringing up to 400 kV.",
    image: "/images/transmission-lines.jpg",
    href: "/infrastructure/transmission-lines",
  },
  {
    category: "GROUND-MOUNTED PV",
    title: "PM-KUSUM",
    description:
      "Turn farmland near a substation into a 25-year solar income, or solarise an agricultural feeder, with one EPC partner.",
    image: "/images/ground-mounted-hero.jpg",
    href: "/products/ground-mounted-pv",
  },
];

/* ---------- Main Component ---------- */

export default function PilingFoundationsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
    const {
    isPastHero,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  } = useHeroScroll();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const filteredProjects = selectedState
    ? PROJECT_ROWS.filter(
        (p) => p.state.toLowerCase() === selectedState.toLowerCase()
      )
    : [];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 / HERO SECTION (STICKY PARALLAX) */}
        <div
          className={`fixed inset-0 w-full h-screen z-0 overflow-hidden bg-slate-950 select-none will-change-transform ${
            isPastHero ? "invisible pointer-events-none" : "visible pointer-events-auto"
          }`}
          aria-hidden={isPastHero}
        >
          <section
            ref={heroRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none"
          >
            {/* Background Piling Image */}
            <motion.div style={{ scale: bgScale }}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <Image
                src="/images/piling-foundations.jpg"
                alt="Piling and foundations engineered for the ground you have — Sarhat Energy"
                fill
                priority
                sizes="100vw"
                quality={85}
                className="object-cover object-center"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black/60 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 via-45% to-black/40 pointer-events-none" />
            </motion.div>

            {/* Hero Main Content */}
            <motion.div
              style={{
                y: contentY,
                scale: contentScale,
                opacity: contentOpacity,
              }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 sm:pt-24 flex flex-col items-center text-center"
            >
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 leading-[1.08] drop-shadow-lg">
                    Piling and foundations, <br />
                    <span className="text-[#D4E012] italic font-normal">engineered for the ground you have</span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md mb-10">
                    Driven, bored and helical piles and open foundations for solar structures, towers, substations and buildings.
                  </p>

                  {/* Dual Action CTAs */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0d] text-slate-950 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>GET FOUNDATION QUOTE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <a
                      href="#what-is-piling"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full backdrop-blur-md hover:scale-105 transition-all"
                    >
                      <span>EXPLORE SERVICES</span>
                      <span className="text-base font-normal">↓</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <ScrollIndicator opacity={indicatorOpacity} />
            </div>
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />


        {/* WHITE SCROLL OVERLAY CONTAINER */}
        <div className="relative z-10 bg-[#F8FAF8] shadow-[0_-30px_60px_rgba(0,0,0,0.45)]">
          {/* SECTION 1: IN SIMPLE TERMS */}
          <section id="what-is-piling" className="py-24 sm:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Left Column: Descriptive Content */}
                <div className="lg:col-span-7">
                  <ScrollReveal>
                    <AnimatedPillBadge className="mb-4">
                      01 / IN SIMPLE TERMS
                    </AnimatedPillBadge>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-8">
                      What is{" "}
                      <span className="text-[#6DAD45] italic relative inline-block">
                        Piling &amp; Foundations?
                        <svg
                          className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                          viewBox="0 0 100 20"
                          preserveAspectRatio="none"
                          aria-hidden
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

                    <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                      <p>
                        Foundations decide whether a structure stands for 25 years. In solar plants, thousands of piles hold the module mounting structures; in substations and towers, foundations carry heavy loads and resist uplift. The right design depends on soil, water table, wind loads and cost.
                      </p>
                      <p>
                        Sarhat carries out geotechnical investigation, foundation design, pile installation and load testing.
                      </p>
                    </div>

                    {/* Best Suited For Checklist */}
                    <div className="mt-10 pt-10 border-t border-slate-200">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                        BEST SUITED FOR
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "Utility and KUSUM solar plants",
                          "Transmission towers and substations",
                          "Industrial and commercial buildings",
                          "Sites with difficult or variable soil",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span className="text-slate-800 text-sm sm:text-base font-medium">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Column: 4 Stat Cards */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      stat: "Driven",
                      sub: "BORED & HELICAL",
                      label: "Pile types",
                      delay: 0,
                    },
                    {
                      stat: "Pull-out",
                      sub: "LOAD TESTING",
                      label: "Design validation",
                      delay: 0.1,
                    },
                    {
                      stat: "Geotech",
                      sub: "SOIL INVESTIGATION",
                      label: "Before design",
                      delay: 0.2,
                    },
                    {
                      stat: "High output",
                      sub: "MECHANISED RIGS",
                      label: "For solar parks",
                      delay: 0.3,
                    },
                  ].map((card, idx) => (
                    <ScrollReveal key={idx} delay={card.delay}>
                      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#6DAD45]/40 transition-all duration-300 h-full flex flex-col justify-between group">
                        <div>
                          <div className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 group-hover:text-[#6DAD45] transition-colors leading-tight mb-2">
                            {card.stat}
                          </div>
                          <div className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">
                            {card.sub}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-600">
                          {card.label}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: WHAT WE DELIVER (6 STEP CARDS) */}
          <section id="what-we-deliver" className="py-24 sm:py-32 bg-slate-50/70 border-t border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="max-w-3xl mb-16">
                  <AnimatedPillBadge className="mb-4">
                    02 / WHAT WE DELIVER
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    Piling &amp; Foundations,{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      end to end.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden
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
                  <p className="text-slate-600 text-base sm:text-xl font-normal leading-relaxed">
                    One contract, one accountable team, from the first site visit to the last year of operation.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {deliverables.map((item, idx) => (
                  <ScrollReveal key={item.step} delay={idx * 0.08}>
                    <div className="group p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
                      <div>
                        <div className="font-mono text-sm font-bold text-[#6DAD45] tracking-widest uppercase mb-4">
                          {item.step}
                        </div>
                        <h3 className="font-serif-display font-bold text-slate-900 text-2xl mb-3 group-hover:text-[#6DAD45] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {item.body}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-900 uppercase tracking-wider group-hover:text-[#6DAD45] transition-colors">
                        <span>Sarhat Standard</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: SOLUTIONS (DARK NAVY SECTION) */}
          <section className="py-24 sm:py-32 bg-[#0B132B] text-white relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6DAD45]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal>
                <div className="max-w-3xl mb-16">
                  <AnimatedPillBadge className="mb-4">
                    03 / SOLUTIONS
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
                    Want to develop a project under Piling &amp; Foundations?{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Look at our solutions.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {solutionCards.map((sol, idx) => {
                  const Icon = sol.icon;
                  return (
                    <ScrollReveal key={sol.title} delay={idx * 0.08}>
                      <Link
                        href={sol.href}
                        className="group block p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#6DAD45]/50 hover:bg-white/[0.08] transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1.5"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6DAD45] mb-6 group-hover:scale-110 group-hover:bg-[#6DAD45] group-hover:text-slate-950 transition-all duration-300">
                            <Icon className="w-6 h-6" />
                          </div>

                          <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-2">
                            {sol.tag}
                          </div>

                          <h3 className="font-serif-display font-bold text-white text-2xl mb-3 group-hover:text-[#6DAD45] transition-colors">
                            {sol.title}
                          </h3>

                          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            {sol.body}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-[#6DAD45] uppercase tracking-wider group-hover:text-white transition-colors">
                          <span>{sol.linkText}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: PROJECTS BY STATE */}
          <section className="py-24 sm:py-32 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="max-w-3xl mb-12">
                  <AnimatedPillBadge className="mb-4">
                    04 / PROJECTS BY STATE
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    Piling &amp; Foundations across{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      key states.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden
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

              {/* State Summary Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
                {stateSummaries.map((st, idx) => (
                  <ScrollReveal key={st.code} delay={idx * 0.1}>
                    <Link
                      href={`/projects/${st.state.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group w-full text-left p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#6DAD45]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer block"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest">
                            {st.code} · PROJECTS
                          </span>
                          <span className="text-slate-400 group-hover:text-[#6DAD45] transition-colors">
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </span>
                        </div>
                        <h3 className="font-serif-display font-bold text-slate-900 text-2xl mb-4 group-hover:text-[#6DAD45] transition-colors">
                          {st.title}
                        </h3>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                        <span>{st.capacityMW}</span>
                        <span className="text-slate-500 font-normal">
                          {st.projectsCount} {st.projectsCount === 1 ? "project" : "projects"}
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {/* State Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {[
                  "Rajasthan",
                  "Uttar Pradesh",
                  "Arunachal Pradesh",
                  "Haryana",
                  "Madhya Pradesh",
                  "Bihar",
                ].map((st) => (
                  <Link
                    key={st}
                    href={`/projects/${st.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2 text-xs sm:text-sm font-mono font-medium text-slate-700 hover:text-slate-950 transition-colors shadow-sm cursor-pointer"
                  >
                    {st}
                  </Link>
                ))}
                <Link
                  href="/projects"
                  className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  View all 49.22 MW →
                </Link>
              </div>
            </div>
          </section>

          {/* PROJECT DRAWER MODAL */}
          <AnimatePresence>
            {selectedState && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
                onClick={() => setSelectedState(null)}
              >
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
                >
                  {/* Drawer Header */}
                  <div className="p-6 sm:p-8 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                    <div>
                      <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-1">
                        STATE FOOTPRINT
                      </div>
                      <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-slate-900">
                        {selectedState} Projects
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedState(null)}
                      className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      aria-label="Close drawer"
                    >
                      <Minus className="w-5 h-5 rotate-45" />
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                    {filteredProjects.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 font-mono text-sm">
                        No projects currently listed for {selectedState}.
                      </div>
                    ) : (
                      filteredProjects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#6DAD45]/50 transition-colors"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="font-serif-display font-bold text-lg text-slate-900">
                              {proj.location || proj.state}
                            </span>
                            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#6DAD45]/15 text-[#3a6821]">
                              {proj.capacityMW} MW
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-500 mb-2">
                            Scheme: {proj.scheme} · Status: {proj.status}
                          </div>
                          <div className="text-xs text-slate-600 line-clamp-2">
                            {proj.clientDetails}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500">
                      Total Capacity:{" "}
                      {filteredProjects
                        .reduce((acc, curr) => acc + curr.capacityMW, 0)
                        .toFixed(2)}{" "}
                      MW
                    </span>
                    <button
                      onClick={() => {
                        setSelectedState(null);
                        setQuoteModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 bg-[#6DAD45] hover:bg-[#5c993a] text-slate-950 font-mono font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>Inquire for {selectedState}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SECTION 5: FAQS ACCORDION */}
          <section id="faqs" className="py-24 sm:py-32 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <AnimatedPillBadge className="mb-4">
                    05 / FAQS
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    Piling &amp; Foundations{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      FAQs
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden
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

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <ScrollReveal key={idx} delay={idx * 0.05}>
                      <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm transition-all duration-300">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                        >
                          <span className="font-serif-display font-bold text-lg sm:text-2xl text-slate-900">
                            {faq.question}
                          </span>
                          <span className="p-2 rounded-full bg-slate-100 text-slate-600 shrink-0">
                            {isOpen ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Guide link under FAQs */}
              <div className="mt-12 text-center">
                <Link
                  href="/insights/piling-foundations-guide"
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-slate-900 hover:text-[#6DAD45] uppercase tracking-wider transition-colors"
                >
                  <span>MORE ANSWERS IN OUR PILING &amp; FOUNDATIONS GUIDE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 6: RELATED PRODUCTS */}
          <section className="py-24 sm:py-32 bg-slate-50/70 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-12">
                  <AnimatedPillBadge className="mb-4">RELATED PRODUCTS</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    Explore more in{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Clean Infrastructure.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {relatedProducts.map((prod, idx) => (
                  <ScrollReveal key={prod.title} delay={idx * 0.1}>
                    <Link
                      href={prod.href}
                      className="group block rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#6DAD45]/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                        <Image
                          src={prod.image}
                          alt={prod.title}
                          fill
                          sizes="(min-width: 1024px) 384px, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-2">
                            {prod.category}
                          </div>
                          <h3 className="font-serif-display font-bold text-slate-900 text-xl sm:text-2xl mb-3 group-hover:text-[#6DAD45] transition-colors">
                            {prod.title}
                          </h3>
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            {prod.description}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-900 uppercase tracking-wider group-hover:text-[#6DAD45] transition-colors">
                          <span>Explore Solution</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7: KNOWLEDGE HUB (ABOVE FOOTER, REPLACING FINAL CTA) */}
          <section className="py-12 sm:py-20 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="bg-[#0B132B] border border-slate-800 rounded-[32px] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
                  {/* Ambient Luminous Glow behind CTA Button */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-8 w-72 h-72 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
                    <div className="max-w-3xl">
                      {/* Top Pill Badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4E012]/10 border border-[#D4E012]/25 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4E012]" />
                        <span className="font-mono text-xs font-bold text-[#D4E012] tracking-[0.2em] uppercase">
                          KNOWLEDGE HUB
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-white tracking-tight leading-[1.15] mb-4">
                        Want to know more about <br />
                        <span className="text-[#D4E012] italic font-normal whitespace-nowrap">Piling &amp; Foundations?</span>
                      </h3>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal max-w-2xl">
                        Read our plain-language guide: soil investigation &amp; borehole profiling, driven vs bored cast-in-situ vs helical piles, pull-out load testing, corrosion allowances, and MMS anchoring.
                      </p>

                      {/* Guide Topic Pills */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        <Link
                          href="/insights/piling-foundations-guide#start-with-the-soil"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Start with the soil
                        </Link>
                        <Link
                          href="/insights/piling-foundations-guide#pile-types-for-solar"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Pile types for solar
                        </Link>
                        <Link
                          href="/insights/piling-foundations-guide#load-testing"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Load testing
                        </Link>
                        <Link
                          href="/insights/piling-foundations-guide#quality-control"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Quality control
                        </Link>
                      </div>

                      <div className="mt-2.5">
                        <Link
                          href="/about"
                          className="inline-block rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Why Sarhat
                        </Link>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="shrink-0 flex items-center">
                      <Link
                        href="/insights/piling-foundations-guide"
                        className="inline-flex items-center justify-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0d] text-slate-950 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span>READ THE FOUNDATIONS GUIDE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <Footer />
        </div>

        {/* Lead Generation Quote Modal */}
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          defaultProduct="Piling & Foundations"
        />
      </main>
    </SmoothScroll>
  );
}
