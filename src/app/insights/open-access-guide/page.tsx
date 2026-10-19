"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Clock,
  Calendar,
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollIndicator from "@/components/ScrollIndicator";

const TOC_ITEMS = [
  { id: "what-open-access-means", label: "What open access means" },
  { id: "three-ways-to-structure-it", label: "Three ways to structure it" },
  { id: "charges-that-decide-savings", label: "The charges that decide your savings" },
  { id: "project-steps", label: "Project steps" },
  { id: "why-sarhat", label: "Why Sarhat" },
];

export default function OpenAccessGuidePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("what-open-access-means");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-slate-900 selection:bg-[#D4E012] selection:text-black font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* 01 / HERO SECTION (Matching Cinematic Text-Only Format)       */}
        {/* ------------------------------------------------------------- */}
        <section className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none pt-28 pb-8 text-white">
          {/* Background image & dark scrim overlay */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <Image
              src="/images/open-access-solar.jpg"
              alt="Solar Open Access Project"
              fill
              priority
              quality={95}
              className="object-cover object-center opacity-80"
            />
            {/* Soft Dark Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div /> {/* Spacer for top alignment under navbar */}

          {/* Main Centered Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center my-auto py-12">
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
              {/* Serif H1 Heading matching format */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" },
                  },
                }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 text-center max-w-4xl drop-shadow-lg"
              >
                Solar open access, <br />
                <span className="italic font-normal text-white">
                  powering <span className="text-[#D4E012]">Indian industry.</span>
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
                className="text-base sm:text-lg text-slate-100 font-normal max-w-3xl text-center leading-relaxed drop-shadow-md mx-auto"
              >
                How green energy open access works for C&amp;I consumers in India: eligibility, captive vs group captive vs third-party, charges, banking, approvals and project steps.
              </motion.p>
            </motion.div>
          </div>

          {/* Animated Mouse Scroll Indicator at Bottom */}
          <div className="relative z-10 pb-4 sm:pb-8 flex justify-center">
            <ScrollIndicator targetId="content" />
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 02 / MAIN ARTICLE LAYOUT WITH STICKY TOC                       */}
        {/* ------------------------------------------------------------- */}
        <section id="content" className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-8">
                  <div>
                    <h2 className="font-mono text-xs font-bold text-[#6DAD45] tracking-[0.2em] uppercase mb-4">
                      ON THIS PAGE
                    </h2>
                    <ul className="border-l-2 border-slate-200 space-y-1">
                      {TOC_ITEMS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => scrollTo(item.id)}
                              className={`block text-left text-xs leading-relaxed py-2 pl-4 -ml-[2px] border-l-2 transition-all cursor-pointer ${
                                isActive
                                  ? "border-[#6DAD45] font-bold text-slate-900 bg-[#6DAD45]/5 rounded-r-md"
                                  : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-400"
                              }`}
                            >
                              {item.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Sidebar CTA Card */}
                  <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 shadow-sm">
                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-2">
                      READY TO BUILD?
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Talk to a Sarhat project lead about your Open Access project.
                    </p>
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0B132B] hover:bg-slate-900 text-white font-mono font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full transition-all shadow cursor-pointer"
                    >
                      <span>Discuss</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </aside>

              {/* Article Content */}
              <article className="prose-content max-w-3xl text-slate-800">
                {/* Article Header Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest pb-6 mb-10 border-b border-slate-200">
                  <span>BY SARHAT ENGINEERING TEAM</span>
                  <span>•</span>
                  <span>3 MIN READ</span>
                  <span>•</span>
                  <span>SOLAR ENERGY</span>
                </div>

                {/* Section 1: What open access means */}
                <section id="what-open-access-means" className="scroll-mt-28 mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    What open access means
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
                    Normally a business must buy power from its local distribution company (DISCOM). Open access breaks that link: it allows a consumer to buy power from another generator and pay the grid operators to carry it. For solar, this means a large ground-mounted plant can be built on cheaper land in a sunny location, and the energy delivered to your factory or campus through the transmission and distribution network.
                  </p>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                    In 2022 the Ministry of Power notified the Electricity (Promoting Renewable Energy through Green Energy Open Access) Rules, which lowered the eligibility threshold for green power to 100 kW, required approvals to be processed within a fixed time, and introduced standard banking provisions. A 2023 amendment allowed consumers to aggregate loads at different connections within the same electricity division.
                  </p>

                  {/* 4 Stat Metric Cards (2x2 Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    <div className="bg-[#F8FAF8] border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                      <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-1.5">
                        ELIGIBILITY
                      </div>
                      <div className="text-slate-900 font-semibold text-sm sm:text-base">
                        Contracted demand of 100 kW or more
                      </div>
                    </div>
                    <div className="bg-[#F8FAF8] border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                      <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-1.5">
                        APPROVAL TIMELINE
                      </div>
                      <div className="text-slate-900 font-semibold text-sm sm:text-base">
                        Application to be processed within 15 days
                      </div>
                    </div>
                    <div className="bg-[#F8FAF8] border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                      <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-1.5">
                        BANKING
                      </div>
                      <div className="text-slate-900 font-semibold text-sm sm:text-base">
                        Surplus energy can be banked with the DISCOM, subject to state rules
                      </div>
                    </div>
                    <div className="bg-[#F8FAF8] border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                      <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider mb-1.5">
                        TYPICAL PLANT
                      </div>
                      <div className="text-slate-900 font-semibold text-sm sm:text-base">
                        1–50 MW ground-mounted solar
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2: Three ways to structure it */}
                <section id="three-ways-to-structure-it" className="scroll-mt-28 mb-16 pt-6 border-t border-slate-200/80">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Three ways to structure it
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                        1. Captive
                      </h3>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                        You own the plant and use its power. Capital cost sits on your balance sheet, and savings are highest because there is no developer margin. Captive consumption is usually exempt from cross-subsidy surcharge.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                        2. Group captive
                      </h3>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                        A developer sets up a special purpose vehicle (SPV). You and other consumers buy at least 26% of its equity and together consume at least 51% of its generation. You get captive-like charges with a small equity investment, and a long-term PPA at a fixed tariff.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-slate-900 mb-2">
                        3. Third-party PPA
                      </h3>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                        A developer owns the plant outright and sells power to you under a PPA. No equity is required, but surcharges apply, so savings are lower than captive models. This suits companies that want zero capital outlay.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3: The charges that decide your savings */}
                <section id="charges-that-decide-savings" className="scroll-mt-28 mb-16 pt-6 border-t border-slate-200/80">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    The charges that decide your savings
                  </h2>

                  <ul className="space-y-3 mb-8">
                    {[
                      { title: "Transmission and wheeling charges", desc: "for using the grid" },
                      { title: "Cross-subsidy surcharge", desc: "(usually waived for captive and valid group-captive users)" },
                      { title: "Additional surcharge,", desc: "where applicable" },
                      { title: "Banking charges", desc: "for storing surplus units" },
                      { title: "Scheduling and deviation charges", desc: "under the state's grid code" },
                    ].map((charge, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 text-base leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-[#6DAD45] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 font-bold">{charge.title} </strong>
                          <span>{charge.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Callout box - Sarhat Tip */}
                  <div className="border-l-4 border-[#6DAD45] bg-[#F8FAF8] border-y border-r border-slate-200/80 rounded-r-2xl p-6 my-8 shadow-xs">
                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-2">
                      SARHAT TIP
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      Charges change every year through state tariff orders. Our feasibility models use the latest order for your state and show savings with and without each surcharge, so you see the risk clearly.
                    </p>
                  </div>
                </section>

                {/* Section 4: Project steps */}
                <section id="project-steps" className="scroll-mt-28 mb-16 pt-6 border-t border-slate-200/80">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Project steps
                  </h2>
                  <ol className="space-y-4">
                    {[
                      "Load study and landed-cost comparison",
                      "Choice of model (captive, group captive, third party)",
                      "Land selection near a substation with spare capacity",
                      "Connectivity and open-access applications",
                      "EPC: engineering, procurement and construction",
                      "Metering, scheduling setup and commissioning",
                      "Long-term O&M and monthly energy accounting",
                    ].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-slate-700 text-base leading-relaxed">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6DAD45]/10 text-[#6DAD45] font-mono text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-slate-900 font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                {/* Section 5: Why Sarhat */}
                <section id="why-sarhat" className="scroll-mt-28 mb-16 pt-6 border-t border-slate-200/80">
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 tracking-tight mb-6">
                    Why Sarhat
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                    We combine EPC with the regulatory groundwork: connectivity, metering and the documentation DISCOMs and transmission utilities ask for. Our substation division can build the evacuation bay and line itself, which removes one of the most common sources of delay in open-access projects.
                  </p>

                  {/* Sources & Further Reading */}
                  <div className="pt-6 border-t border-dashed border-slate-300 text-xs text-slate-500 space-y-3">
                    <strong className="block font-mono uppercase tracking-wider text-slate-700">
                      Sources &amp; further reading:
                    </strong>
                    <ul className="space-y-1.5 list-disc pl-5">
                      <li>
                        <a
                          href="https://www.mercomindia.com/100-kw-avail-green-energy-open-access"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6DAD45] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Consumers with aggregate demand of 100 kW can avail green energy open access (Mercom)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.indiaenvironmentportal.org.in/reports-and-documents/electricity-promoting-renewable-energy-through-green-energy-open-access-second-amendment-rules-2023"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6DAD45] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Green Energy Open Access (Second Amendment) Rules, 2023</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                    </ul>
                    <p className="pt-2 text-slate-400 italic">
                      This guide is for general information. Scheme rules, subsidies and charges are set by central and state authorities and change from time to time; always confirm the latest notification before making investment decisions.
                    </p>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 03 / NEXT STEPS: FROM READING TO BUILDING                     */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 sm:py-28 bg-[#0B132B] text-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4E012]" />
                  <span className="font-mono text-xs font-bold text-[#D4E012] tracking-wider uppercase">
                    NEXT STEPS
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight">
                  From reading to{" "}
                  <span className="text-[#D4E012] italic relative inline-block font-normal">
                    building.
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
              </div>
            </ScrollReveal>

            {/* 4 Flow Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <Link
                href="/products/ground-mounted-pv/open-access"
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4E012]/50 hover:bg-white/[0.08] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#D4E012] transition-colors">
                    01 · PRODUCT
                  </div>
                  <h3 className="text-xl font-serif-display font-bold text-white mb-2">
                    Open Access Solar
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    What Sarhat delivers, in short.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4E012]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/solutions/engineering"
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4E012]/50 hover:bg-white/[0.08] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#D4E012] transition-colors">
                    02 · SOLUTIONS
                  </div>
                  <h3 className="text-xl font-serif-display font-bold text-white mb-2">
                    Engineering → O&amp;M
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    How we develop your project.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4E012]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/projects/rajasthan"
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4E012]/50 hover:bg-white/[0.08] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#D4E012] transition-colors">
                    03 · PROJECTS
                  </div>
                  <h3 className="text-xl font-serif-display font-bold text-white mb-2">
                    Projects in Rajasthan
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    See our work state by state.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4E012]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4E012]/50 hover:bg-white/[0.08] transition-all flex flex-col justify-between text-left cursor-pointer"
              >
                <div>
                  <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#D4E012] transition-colors">
                    04 · DISCUSS
                  </div>
                  <h3 className="text-xl font-serif-display font-bold text-white mb-2">
                    Let&apos;s discuss a project
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Talk to a project lead.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4E012]">
                  <span>Contact</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* State Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { name: "Open Access projects in Rajasthan", href: "/projects/rajasthan" },
                { name: "Open Access projects in Uttar Pradesh", href: "/projects/uttar-pradesh" },
                { name: "Open Access projects in Haryana", href: "/projects/haryana" },
                { name: "Open Access projects in Madhya Pradesh", href: "/projects/madhya-pradesh" },
              ].map((st, idx) => (
                <Link
                  key={idx}
                  href={st.href}
                  className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4E012]/30 px-4 py-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {st.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 04 / KEEP READING: MORE GUIDES (Icon Cards matching screenshot) */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 sm:py-28 bg-[#F8FAF8] border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                <AnimatedPillBadge className="mb-6">KEEP READING</AnimatedPillBadge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                  More{" "}
                  <span className="text-[#6DAD45] italic relative inline-block">
                    guides.
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
              {/* Guide Card 1 */}
              <ScrollReveal delay={0.1}>
                <Link
                  href="/insights/kusum-guide"
                  className="group block rounded-[26px] bg-white border border-slate-200/90 hover:border-[#6DAD45] p-7 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col justify-between"
                >
                  {/* Pale corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF087]/25 rounded-bl-[56px] pointer-events-none transition-all group-hover:bg-[#EAF087]/45" />

                  <div>
                    {/* Top Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAF8] border border-slate-200/90 flex items-center justify-center mb-6 transition-all group-hover:bg-[#D4E012] group-hover:border-[#D4E012] shadow-xs">
                      <BookOpen className="w-5 h-5 text-slate-700 group-hover:text-black transition-colors" />
                    </div>

                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-3">
                      GUIDE
                    </div>
                    <h3 className="font-serif-display font-bold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-[#6DAD45] transition-colors">
                      PM-KUSUM explained: Components A and C, eligibility, economics and timelines
                    </h3>
                  </div>

                  <div className="pt-6 mt-8 flex items-center gap-1.5 font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>READ GUIDE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>

              {/* Guide Card 2 */}
              <ScrollReveal delay={0.2}>
                <Link
                  href="/insights/surya-sarovar"
                  className="group block rounded-[26px] bg-white border border-[#6DAD45] p-7 sm:p-8 relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col justify-between"
                >
                  {/* Pale corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF087]/35 rounded-bl-[56px] pointer-events-none transition-all group-hover:bg-[#EAF087]/50" />

                  <div>
                    {/* Top Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#D4E012] border border-[#D4E012] flex items-center justify-center mb-6 transition-all shadow-xs">
                      <BookOpen className="w-5 h-5 text-black" />
                    </div>

                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-3">
                      GUIDE
                    </div>
                    <h3 className="font-serif-display font-bold text-[#6DAD45] text-lg sm:text-xl leading-snug transition-colors">
                      Floating solar (Surya Sarovar): how it works, where it fits and what it costs
                    </h3>
                  </div>

                  <div className="pt-6 mt-8 flex items-center gap-1.5 font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>READ GUIDE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>

              {/* Guide Card 3 */}
              <ScrollReveal delay={0.3}>
                <Link
                  href="/insights/canal-top-guide"
                  className="group block rounded-[26px] bg-white border border-slate-200/90 hover:border-[#6DAD45] p-7 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col justify-between"
                >
                  {/* Pale corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF087]/25 rounded-bl-[56px] pointer-events-none transition-all group-hover:bg-[#EAF087]/45" />

                  <div>
                    {/* Top Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAF8] border border-slate-200/90 flex items-center justify-center mb-6 transition-all group-hover:bg-[#D4E012] group-hover:border-[#D4E012] shadow-xs">
                      <BookOpen className="w-5 h-5 text-slate-700 group-hover:text-black transition-colors" />
                    </div>

                    <div className="font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-widest mb-3">
                      GUIDE
                    </div>
                    <h3 className="font-serif-display font-bold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-[#6DAD45] transition-colors">
                      Canal-top and canal-bank solar: a guide for irrigation departments and utilities
                    </h3>
                  </div>

                  <div className="pt-6 mt-8 flex items-center gap-1.5 font-mono text-xs font-bold text-[#6DAD45] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>READ GUIDE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 05 / DEDICATED OPEN ACCESS PROJECT CTA SECTION                */}
        {/* ------------------------------------------------------------- */}
        <section id="discuss" className="py-14 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="bg-[#0B132B] text-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
                {/* Ambient glow behind right buttons */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
                  <div>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-white tracking-tight leading-[1.12] mb-4">
                      Ready to build your <br />
                      <span className="text-[#D4E012] italic relative inline-block font-normal">
                        Open Access project?
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
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6 sm:mb-8 font-light">
                      Bring your site, roof, load or tender details. We&apos;ll review feasibility and share a clear execution path.
                    </p>

                    {/* Contact details row */}
                    <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm text-slate-300">
                      <a
                        href="mailto:info@sarhatenergy.com"
                        className="flex items-center gap-2 hover:text-[#D4E012] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#D4E012]" />
                        <span>info@sarhatenergy.com</span>
                      </a>
                      <a
                        href="tel:+919266711125"
                        className="flex items-center gap-2 hover:text-[#D4E012] transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#D4E012]" />
                        <span>+91 9266 7111 25</span>
                      </a>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D4E012]" />
                        <span>Ghaziabad, U.P., India</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons on the right */}
                  <div className="flex flex-col gap-3.5 sm:min-w-[250px]">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-mono font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#D4E012]/20 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>LET&apos;S DISCUSS A PROJECT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <Link
                      href="/contact?product=Open+Access+Solar#inquiry"
                      className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all cursor-pointer whitespace-nowrap hover:border-white/40"
                    >
                      <span>OPEN ENQUIRY PAGE</span>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
        <Footer />

        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          defaultProduct="Open Access Solar"
        />
      </main>
    </SmoothScroll>
  );
}
