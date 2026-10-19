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
    title: "Resource & Profile Sizing",
    body: "Solar and wind resource assessment, dispatch profile modelling, and BESS capacity sizing.",
  },
  {
    step: "02",
    title: "Hybrid Architecture",
    body: "AC vs DC coupling design, shared or dedicated inverters, and switchyard integration.",
  },
  {
    step: "03",
    title: "EMS & Plant Controller",
    body: "Unified Energy Management System for millisecond co-optimization of generation and storage.",
  },
  {
    step: "04",
    title: "Grid & RTC Compliance",
    body: "Interconnection approvals, peak-hour compliance, and CEA technical standard alignment.",
  },
  {
    step: "05",
    title: "Procurement & Construction",
    body: "Tier-1 solar PV modules, wind turbines, LFP battery containers, and substation build.",
  },
  {
    step: "06",
    title: "Integrated O&M",
    body: "Predictive asset health monitoring, battery augmentation scheduling, and SCADA telemetry.",
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
    title: "Hybrid Solar-Wind-BESS in Rajasthan",
    capacityMW: "50.0 MW",
    projectsCount: 4,
  },
  {
    state: "Madhya Pradesh",
    code: "MP",
    title: "Hybrid Solar-Wind-BESS in Madhya Pradesh",
    capacityMW: "15.0 MW",
    projectsCount: 2,
  },
  {
    state: "Haryana",
    code: "HR",
    title: "Hybrid Solar-Wind-BESS in Haryana",
    capacityMW: "10.0 MW",
    projectsCount: 1,
  },
  {
    state: "Arunachal Pradesh",
    code: "AR",
    title: "Hybrid Microgrid & BESS in Arunachal Pradesh",
    capacityMW: "2.5 MW",
    projectsCount: 1,
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the difference between AC-coupled and DC-coupled hybrid systems?",
    answer:
      "In a DC-coupled system, the battery connects directly to the DC bus sharing inverters with the solar array, capturing clipped energy and saving on PCS costs (ideal for greenfield builds). In an AC-coupled system, the BESS has its own dedicated bi-directional inverter, making it easier to retrofit to existing operational solar or wind farms.",
  },
  {
    question: "How do hybrid plants qualify for Round-The-Clock (RTC) and FDRE tenders?",
    answer:
      "Tenders by SECI and NTPC for RTC and Firm and Dispatchable Renewable Energy (FDRE) require a committed generation profile during peak morning and evening hours. By pairing solar with wind (which often peaks during evenings and monsoon) and sizing battery storage to bridge gaps, hybrids meet 80-90%+ availability commitments without penalties.",
  },
  {
    question: "Can an existing solar or wind plant be retrofitted with BESS?",
    answer:
      "Yes. AC-coupled storage can be integrated into the existing evacuation switchyard, subject to grid connectivity clearances and transformer capacity. This allows developers to monetize curtailed energy and access lucrative peak evening power markets.",
  },
  {
    question: "What battery chemistry is used in hybrid plants?",
    answer:
      "Lithium Iron Phosphate (LFP) is the industry standard due to its high thermal stability, non-combustible cathode, long cycle life (6,000–8,000+ cycles), and superior safety compliance under NFPA 855 and UL 9540A.",
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
    category: "BESS & HYBRID",
    title: "Standalone BESS",
    description:
      "Utility-scale grid-connected battery storage for frequency regulation, VGF tenders, peak shaving and DISCOM support.",
    image: "/images/bess-substation.jpg",
    href: "/products/bess-hybrid/standalone-bess",
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
    category: "GROUND-MOUNTED PV",
    title: "PM-KUSUM",
    description:
      "Turn farmland near a substation into a 25-year solar income, or solarise an agricultural feeder, with one EPC partner.",
    image: "/images/ground-mounted-hero.jpg",
    href: "/products/ground-mounted-pv",
  },
];

/* ---------- Main Component ---------- */

export default function BessMeetsPvWindPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.02, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.25]);
  const bgDim = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.85]);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-slate-900 selection:bg-[#D4E012] selection:text-black font-sans-ui">
        {/* Floating Scroll Indicator */}
        <ScrollIndicator />

        {/* Global Navigation */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* SECTION 1: HERO                                               */}
        {/* ------------------------------------------------------------- */}
        <section
          ref={heroRef}
          className="relative min-h-[92vh] flex items-end pb-16 sm:pb-24 pt-32 sm:pt-40 bg-[#070D1E] overflow-hidden text-white"
        >
          {/* Luminous Glow Behind Subject */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Background image with parallax scale & fade */}
          <motion.div
            style={{ scale: bgScale, opacity: bgOpacity }}
            className="absolute inset-0 z-0 origin-center"
          >
            <Image
              src="/images/bess-substation.jpg"
              alt="BESS meets PV and Wind Hybrid Plant"
              fill
              priority
              quality={90}
              className="object-cover object-center"
            />
          </motion.div>

          {/* Cinematic dark gradients */}
          <motion.div
            style={{ opacity: bgDim }}
            className="absolute inset-0 z-[1] bg-[#070D1E]/40"
          />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#070D1E] via-[#070D1E]/60 to-transparent" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#070D1E]/80 via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
            <div className="max-w-4xl flex flex-col items-center text-center">
              {/* Animated Pill Badge */}
              <AnimatedPillBadge darkBg className="mb-6">
                HYBRID SOLAR • WIND • STORAGE EPC
              </AnimatedPillBadge>

              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 font-mono text-xs text-slate-300 mb-6">
                <Link href="/" className="hover:text-[#D4E012] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/products" className="hover:text-[#D4E012] transition-colors">
                  Products
                </Link>
                <span>/</span>
                <span className="text-[#D4E012]" aria-current="page">
                  BESS meets PV / Wind
                </span>
              </nav>

              {/* Title with Signature Underline Accent */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-display font-medium text-white tracking-tight leading-[1.08] mb-6">
                BESS meets{" "}
                <span className="text-[#D4E012] italic relative inline-block font-normal">
                  PV / Wind.
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#D4E012]"
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
              </h1>

              {/* Sub-headline */}
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed mb-8 max-w-2xl mx-auto text-center">
                Turn intermittent renewable generation into dispatchable, firm power. Complete turnkey EPC for solar-wind-storage hybrids, RTC/FDRE contracts and storage retrofits.
              </p>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0d] text-slate-950 font-mono font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                >
                  <span>REQUEST HYBRID FEASIBILITY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <Link
                  href="/insights/bess-pv-wind"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full backdrop-blur-sm transition-all cursor-pointer"
                >
                  <span>READ HYBRID PLANTS GUIDE</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-20 bg-white">
          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: WHAT SARHAT DELIVERS (6 STEP CARDS)                */}
          {/* ------------------------------------------------------------- */}
          <section className="py-20 sm:py-28 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                  <AnimatedPillBadge className="mb-6">
                    EPC SCOPE
                  </AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    What Sarhat{" "}
                    <span className="text-[#6DAD45] italic relative inline-block">
                      delivers.
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
                {deliverables.map((item, idx) => (
                  <ScrollReveal key={item.step} delay={idx * 0.08}>
                    <div className="h-full rounded-2xl bg-white border border-slate-200/80 p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-sm font-bold text-[#6DAD45] mb-4">
                          {item.step}
                        </div>
                        <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-3">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 7: KNOWLEDGE HUB (CTA LINKING TO THE GUIDE)           */}
          {/* ------------------------------------------------------------- */}
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
                        <span className="text-[#D4E012] italic font-normal whitespace-nowrap">Hybrid Renewable Plants?</span>
                      </h3>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal max-w-2xl">
                        Read our plain-language guide: how hybrid solar-wind-storage plants work in India, RTC &amp; FDRE tender structures, AC vs DC coupling, sizing, retrofits and project execution.
                      </p>

                      {/* Guide Topic Pills */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        <Link
                          href="/insights/bess-pv-wind#the-problem-hybrids-solve"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          The problem hybrids solve
                        </Link>
                        <Link
                          href="/insights/bess-pv-wind#types-of-hybrid-plants"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Types of hybrid plants
                        </Link>
                        <Link
                          href="/insights/bess-pv-wind#ac-vs-dc-coupling"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          AC vs DC coupling
                        </Link>
                        <Link
                          href="/insights/bess-pv-wind#sizing-a-hybrid"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Sizing a hybrid
                        </Link>
                        <Link
                          href="/insights/bess-pv-wind#retrofitting-storage-to-existing-plants"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Retrofitting storage
                        </Link>
                        <Link
                          href="/insights/bess-pv-wind#project-steps"
                          className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-slate-300 font-normal transition-colors"
                        >
                          Project steps
                        </Link>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="shrink-0 flex items-center">
                      <Link
                        href="/insights/bess-pv-wind"
                        className="inline-flex items-center justify-center gap-2 bg-[#D4E012] hover:bg-[#c2ce0d] text-slate-950 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span>READ THE HYBRID PLANTS GUIDE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>

        {/* Lead Generation Quote Modal */}
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          defaultProduct="BESS meets PV / Wind"
        />
      </main>
    </SmoothScroll>
  );
}
