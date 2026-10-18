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
  Waves,
  Sun,
  Droplets,
  Anchor,
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
    title: "Water-body survey",
    body: "Bathymetry, water-level variation, wind and wave study.",
  },
  {
    step: "02",
    title: "Float & anchoring design",
    body: "Float layout, mooring and anchoring for local conditions.",
  },
  {
    step: "03",
    title: "Electrical design",
    body: "Floating DC system, inverters on shore or on platform, marine-grade cabling.",
  },
  {
    step: "04",
    title: "Procurement",
    body: "UV-stable HDPE floats, corrosion-resistant hardware and modules.",
  },
  {
    step: "05",
    title: "Assembly & launch",
    body: "Shore assembly, sectional launch and mooring.",
  },
  {
    step: "06",
    title: "O&M",
    body: "Anchor tension checks, float inspection, cleaning and monitoring.",
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
    state: "Madhya Pradesh",
    code: "MP",
    title: "Surya Sarovar in Madhya Pradesh",
    capacityMW: "1.2 MW",
    projectsCount: 1,
  },
  {
    state: "Rajasthan",
    code: "RJ",
    title: "Surya Sarovar in Rajasthan",
    capacityMW: "25.03 MW",
    projectsCount: 10,
  },
  {
    state: "Uttar Pradesh",
    code: "UP",
    title: "Surya Sarovar in Uttar Pradesh",
    capacityMW: "9.12 MW",
    projectsCount: 5,
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Does floating solar affect water quality?",
    answer:
      "Studies and operational floating solar plants indicate that covering a portion of a water body blocks excessive sunlight, substantially inhibiting toxic algae blooms while preserving aquatic ecosystem health. Furthermore, the modular HDPE floats used are 100% food-grade certified, UV-stabilized, and non-toxic, ensuring zero leaching into potable reservoirs or drinking water supplies.",
  },
  {
    question: "What happens when the water level drops?",
    answer:
      "Our engineering team designs flexible mooring and tethering tension systems using self-adjusting anchors and spreader bars. These accommodate multi-meter seasonal depth variations, monsoon flooding, and drought drawdowns. In reservoirs that dry up completely, bottom-landing floats with elastomeric shock dampening safely rest on the dry bed without damaging the module frames.",
  },
  {
    question: "Is floating solar more expensive than ground-mounted?",
    answer:
      "The initial CAPEX for floating solar is marginally higher (typically 10–15%) due to marine-grade float structures and anchoring systems. However, this is largely offset by zero land acquisition costs, negligible civil grading work, and a 5–12% higher annual energy yield resulting from natural water cooling keeping panel temperatures lower.",
  },
  {
    question: "What size can a Surya Sarovar plant be?",
    answer:
      "Surya Sarovar plants scale from small captive industrial pond systems of 500 kW up to utility-scale multi-hundred megawatt arrays on irrigation reservoirs, hydroelectric dams, and thermal power plant cooling ponds.",
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
    category: "GROUND-MOUNTED PV",
    title: "PM-KUSUM",
    description:
      "Turn farmland near a substation into a 25-year solar income, or solarise an agricultural feeder, with one EPC partner.",
    image: "/images/ground-mounted-hero.jpg",
    href: "/products/ground-mounted-pv",
  },
  {
    category: "GROUND-MOUNTED PV",
    title: "Open Access Solar",
    description:
      "Build a solar plant away from your factory and wheel the power through the grid, cutting your power bill for 25 years.",
    image: "/images/open-access-solar.jpg",
    href: "/products/ground-mounted-pv/open-access",
  },
  {
    category: "FLOATING PV",
    title: "Canal-Top Solar",
    description:
      "Solar panels built over irrigation canals: no new land, less evaporation, and power right next to the pumping load.",
    image: "/images/canal-top-solar.jpg",
    href: "/products/floating-pv/canal-top",
  },
];

/* ---------- Main Surya Sarovar Component ---------- */

export default function SuryaSarovarPage() {
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
            {/* Background Floating Solar Aerial Image */}
            <motion.div style={{ scale: bgScale }}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <Image
                src="/images/surya-sarovar.jpg"
                alt="Surya Sarovar: solar that floats on water — Sarhat Energy"
                fill
                priority
                sizes="100vw"
                quality={85}
                className="object-cover object-center"
              />
              <motion.div
                style={{ opacity: bgDim }}
                className="absolute inset-0 bg-black/55 pointer-events-none"
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
                    Surya Sarovar: solar <br />
                    <span className="text-[#D4E012] italic font-normal">that floats on water</span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                    Floating solar on reservoirs, lakes, industrial ponds and mine pits, generating power without using an acre of land.
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Scroll Indicator */}
            <ScrollIndicator opacity={indicatorOpacity} />
          </section>
        </div>

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />


        {/* 02 / CONTENT OVERLAY SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* SECTION 1: IN SIMPLE TERMS */}
          <section id="what-is-surya-sarovar" className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[#F8FAF8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-4">
                  <AnimatedPillBadge className="mb-4">IN SIMPLE TERMS</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    What is{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Surya Sarovar?
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-10">
                {/* Left Description & Suited For */}
                <div className="lg:col-span-7 space-y-6">
                  <ScrollReveal delay={0.08}>
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                      Surya Sarovar is Sarhat&apos;s floating solar offering. Solar modules sit on
                      high-density polyethylene (HDPE) floats anchored to the bed or banks of a water
                      body, and the power is carried ashore by cable. Because the water cools the panels,
                      they often generate slightly more than land-based plants, and the shading reduces
                      evaporation from the reservoir.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.12}>
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                      We assess the water body, design the float layout and anchoring for water-level
                      variation and wind, and build the full plant.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.16}>
                    <div className="pt-4">
                      <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4">
                        Best suited for
                      </h3>
                      <ul className="space-y-3.5">
                        {[
                          "Irrigation and water-resource departments with reservoirs",
                          "Water utilities with treatment ponds and storage tanks",
                          "Industries with large raw-water or effluent ponds",
                          "Mining companies with abandoned, water-filled pits",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                            <CheckCircle2 className="w-5 h-5 text-[#6DAD45] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right 2x2 Metric Cards */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {[
                    {
                      value: "0 acres",
                      label: "LAND REQUIRED",
                      note: "Plant sits on water",
                    },
                    {
                      value: "Cooler",
                      label: "MODULE TEMPERATURE",
                      note: "Supports yield",
                    },
                    {
                      value: "Less",
                      label: "EVAPORATION LOSS",
                      note: "Shading of water surface",
                    },
                    {
                      value: "25 yrs",
                      label: "DESIGN LIFE",
                      note: "With anchoring O&M",
                    },
                  ].map((stat, i) => (
                    <ScrollReveal key={stat.label} delay={0.1 + i * 0.05}>
                      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#6DAD45]/40 group">
                        {/* Soft Corner Accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FCFDEB] via-[#F4F9E4] to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                        <div className="relative z-10">
                          <div className="text-3xl sm:text-4xl lg:text-[40px] font-serif-display font-medium text-slate-900 tracking-tight leading-none mb-3">
                            {stat.value}
                          </div>
                          <div className="font-mono text-[11px] sm:text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-1.5">
                            {stat.label}
                          </div>
                          <div className="text-xs sm:text-sm text-slate-500 font-normal">
                            {stat.note}
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: WHAT WE DELIVER (SURYA SAROVAR, END TO END) */}
          <section id="what-we-deliver" className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-4">
                  <AnimatedPillBadge className="mb-4">WHAT WE DELIVER</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    Surya Sarovar,{" "}
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
                  <p className="mt-3 text-slate-600 text-base sm:text-lg">
                    One contract, one accountable team, from the first site visit to the last year of operation.
                  </p>
                </div>
              </ScrollReveal>

              {/* 6 Cards in 3x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
                {deliverables.map((item, idx) => (
                  <ScrollReveal key={item.step} delay={idx * 0.08}>
                    <div className="relative rounded-2xl sm:rounded-3xl bg-[#F8FAF8] border border-slate-200/90 p-8 sm:p-9 shadow-sm hover:shadow-xl hover:border-[#6DAD45]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full group">
                      {/* Top-Right Soft Glow */}
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#EBF7D4] to-transparent rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10">
                        {/* Number Badge */}
                        <div className="inline-flex items-center justify-center font-mono font-bold text-xs text-[#528731] bg-white border border-[#6DAD45]/30 rounded-full px-3 py-1 shadow-xs mb-6">
                          {item.step}
                        </div>

                        <h3 className="font-serif-display font-bold text-slate-900 text-xl sm:text-2xl mb-3 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: SOLUTIONS (DARK THEMED) */}
          <section className="py-20 sm:py-28 bg-[#0B132B] text-white relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#6DAD45]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal>
                <div className="mb-4">
                  <AnimatedPillBadge darkBg className="mb-4">
                    SOLUTIONS
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
                    Want to develop a project under <br className="hidden sm:inline" />
                    Surya Sarovar? <br className="hidden sm:inline" />
                    <span className="text-[#D4E012] italic relative inline-block">
                      Look at our solutions.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#D4E012]"
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
                  <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl">
                    Each stage of your Surya Sarovar project is handled by a dedicated Sarhat solution
                    team, and they all work from one project plan.
                  </p>
                </div>
              </ScrollReveal>

              {/* 5 Cards Grid: 3 on top row, 2 centered below */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-12 sm:mt-14">
                {solutionCards.slice(0, 3).map((sol, idx) => {
                  const Icon = sol.icon;
                  return (
                    <ScrollReveal key={sol.title} delay={idx * 0.08}>
                      <div className="relative rounded-2xl sm:rounded-3xl bg-white text-slate-900 p-7 sm:p-8 shadow-xl flex flex-col justify-between h-full border border-white/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#D4E012] group">
                        {/* Soft Corner Accent */}
                        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#FCFDEB] to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:bg-[#6DAD45]/15 group-hover:text-[#6DAD45] transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="font-mono text-[11px] font-bold text-[#6DAD45] uppercase tracking-wider mb-2">
                            {sol.tag}
                          </div>

                          <h3 className="font-serif-display font-bold text-slate-900 text-xl sm:text-2xl mb-3">
                            {sol.title}
                          </h3>

                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                            {sol.body}
                          </p>
                        </div>

                        <div className="relative z-10 pt-4 border-t border-slate-100">
                          <Link
                            href={sol.href}
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900 hover:text-[#6DAD45] uppercase tracking-wider transition-colors group/link"
                          >
                            <span>{sol.linkText}</span>
                            <span className="text-base group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                              ↗
                            </span>
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Bottom Row: 2 Cards Centered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 mt-6 sm:mt-7 max-w-4xl mx-auto">
                {solutionCards.slice(3, 5).map((sol, idx) => {
                  const Icon = sol.icon;
                  return (
                    <ScrollReveal key={sol.title} delay={0.25 + idx * 0.08}>
                      <div className="relative rounded-2xl sm:rounded-3xl bg-white text-slate-900 p-7 sm:p-8 shadow-xl flex flex-col justify-between h-full border border-white/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#D4E012] group">
                        {/* Soft Corner Accent */}
                        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#FCFDEB] to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:bg-[#6DAD45]/15 group-hover:text-[#6DAD45] transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="font-mono text-[11px] font-bold text-[#6DAD45] uppercase tracking-wider mb-2">
                            {sol.tag}
                          </div>

                          <h3 className="font-serif-display font-bold text-slate-900 text-xl sm:text-2xl mb-3">
                            {sol.title}
                          </h3>

                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                            {sol.body}
                          </p>
                        </div>

                        <div className="relative z-10 pt-4 border-t border-slate-100">
                          <Link
                            href={sol.href}
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900 hover:text-[#6DAD45] uppercase tracking-wider transition-colors group/link"
                          >
                            <span>{sol.linkText}</span>
                            <span className="text-base group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                              ↗
                            </span>
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: PROJECTS BY STATE */}
          <section className="py-20 sm:py-28 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-4">
                  <AnimatedPillBadge className="mb-4">PROJECTS BY STATE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    Want to explore Surya Sarovar{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      projects in your state?
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
                  <p className="mt-3 text-slate-600 text-base sm:text-lg">
                    See what Sarhat has built and is building, state by state, with capacities, schemes
                    and status.
                  </p>
                </div>
              </ScrollReveal>

              {/* State Cards Grid (3 cards in row matching image) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12">
                {stateSummaries.map((st, idx) => (
                  <ScrollReveal key={st.code} delay={idx * 0.08}>
                    <Link
                      href={`/projects/${st.state.toLowerCase().replace(/\s+/g, "-")}`}
                      className="w-full text-left rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 hover:border-[#6DAD45]/50 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex items-center justify-between group block"
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-[#6DAD45] tracking-widest uppercase mb-1.5">
                          {st.code} • PROJECTS
                        </div>
                        <h3 className="font-serif-display font-bold text-slate-900 text-lg sm:text-xl mb-1.5 group-hover:text-[#6DAD45] transition-colors">
                          {st.title}
                        </h3>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">
                          {st.capacityMW} • {st.projectsCount} projects
                        </div>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#6DAD45] group-hover:text-white transition-colors shrink-0 ml-4">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {/* State Quick Explorer Filter Pills */}
              <ScrollReveal delay={0.35}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-10 sm:mt-12">
                  {[
                    "Madhya Pradesh",
                    "Rajasthan",
                    "Uttar Pradesh",
                    "Haryana",
                    "Bihar",
                    "Arunachal Pradesh",
                  ].map((stName) => {
                    return (
                      <Link
                        key={stName}
                        href={`/projects/${stName.toLowerCase().replace(/\s+/g, "-")}`}
                        className="rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 bg-white text-slate-700 hover:border-[#6DAD45] hover:text-[#6DAD45] transition-all cursor-pointer"
                      >
                        Explore projects in {stName}
                      </Link>
                    );
                  })}

                  <Link
                    href="/projects"
                    className="rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#D4E012] text-slate-950 border border-[#D4E012] hover:bg-[#c2ce0d] transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>View all 49.22 MW of projects</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Interactive State Project Drawer */}
              <AnimatePresence>
                {selectedState && filteredProjects.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="mt-8 overflow-hidden"
                  >
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#6DAD45]/40 shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div>
                          <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider">
                            ACTIVE FILTER
                          </div>
                          <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900">
                            {selectedState} Solar Park Sites ({filteredProjects.length})
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedState(null)}
                          className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900 uppercase cursor-pointer"
                        >
                          ✕ Close View
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {filteredProjects.map((p, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-xs font-mono font-bold text-slate-500">
                                  {p.location || selectedState}
                                </span>
                                <span
                                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                    p.status === "Commissioned"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : p.status === "Ongoing"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-slate-200 text-slate-700"
                                  }`}
                                >
                                  {p.status}
                                </span>
                              </div>
                              <div className="text-lg font-serif-display font-bold text-slate-900 mb-1">
                                {p.capacityMW} MW
                              </div>
                              <div className="text-xs text-[#6DAD45] font-semibold mb-2">
                                {p.scheme}
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2">
                                {p.clientDetails}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* SECTION 5: FAQS (SURYA SAROVAR QUESTIONS, ANSWERED) */}
          <section id="faqs" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-12">
                  <AnimatedPillBadge className="mb-4">FAQS</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    Surya Sarovar{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      questions, answered.
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
                    <ScrollReveal key={idx} delay={idx * 0.06}>
                      <div className="rounded-2xl border border-slate-200 bg-[#F8FAF8] overflow-hidden transition-all duration-200 hover:border-slate-300">
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full px-6 py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                        >
                          <span className="font-serif-display font-medium text-slate-900 text-lg sm:text-xl leading-snug">
                            {faq.question}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#6DAD45] shrink-0 font-bold">
                            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
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

              {/* More Answers Link */}
              <ScrollReveal delay={0.3}>
                <div className="mt-8 pt-4">
                  <Link
                    href="/insights"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#528731] hover:text-[#3d6823] tracking-widest uppercase transition-colors"
                  >
                    <span>MORE ANSWERS IN THE SURYA SAROVAR GUIDE</span>
                    <span className="text-base font-bold">↗</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION 6: RELATED PRODUCTS (EXPLORE MORE IN SOLAR ENERGY) */}
          <section className="py-20 sm:py-28 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-12">
                  <AnimatedPillBadge className="mb-4">RELATED PRODUCTS</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                    Explore more in{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      Solar Energy.
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

          {/* SECTION 7: KNOWLEDGE HUB (ABOVE FOOTER) */}
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
                        <span className="text-[#D4E012] italic font-normal whitespace-nowrap">Surya Sarovar Floating Solar?</span>
                      </h3>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal max-w-2xl">
                        Read our plain-language guide: how it works, HDPE floats, mooring anchors, the
                        numbers that matter and the mistakes to avoid.
                      </p>

                      {/* Guide Topic Pills */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        <Link
                          href="/insights/surya-sarovar#what-is-floating-solar"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          What is floating solar?
                        </Link>
                        <Link
                          href="/insights/surya-sarovar#why-build-on-water"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Why build on water
                        </Link>
                        <Link
                          href="/insights/surya-sarovar#main-components"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Main components
                        </Link>
                        <Link
                          href="/insights/surya-sarovar#is-water-body-suitable"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Site suitability
                        </Link>
                        <Link
                          href="/insights/surya-sarovar#economics"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Economics
                        </Link>
                        <Link
                          href="/insights/surya-sarovar#project-steps"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Project steps
                        </Link>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="shrink-0 flex items-center">
                      <Link
                        href="/insights/surya-sarovar"
                        className="inline-flex items-center justify-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0d] text-slate-950 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span>READ THE SURYA SAROVAR GUIDE</span>
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
          defaultProduct="Surya Sarovar"
        />
      </main>
    </SmoothScroll>
  );
}
