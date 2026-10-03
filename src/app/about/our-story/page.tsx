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
import KeyMomentsChapters from "@/components/KeyMomentsChapters";
import FoundationPillars from "@/components/FoundationPillars";
import {
  Target,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  Calendar,
  Building2,
  TrendingUp,
  ArrowRight,
  Compass,
  Rocket,
  Layers,
  Cpu,
  Car,
  BatteryCharging,
} from "lucide-react";

export default function OurStoryPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("ALL");

  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Parallax & Scroll Fade-out Tracking for Hero
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

  const keyMoments = [
    {
      year: "2024",
      headline: "Sarhat Begins",
      tag: "FOUNDATION & OWNERSHIP",
      subtitle: "ESTABLISHED BY INDUSTRY ENGINEERS",
      description:
        "After more than a decade in the energy industry, two engineers and friends founded Sarhat with a shared belief: when people are trusted to grow and take ownership, they can build projects that make a lasting difference.",
      icon: Target,
      metrics: ["2 Founder Engineers", "Solar EPC Focus", "Zero Safety Incidents"],
      achievements: [
        "Founded with engineering discipline & execution-first culture",
        "Delivered initial commercial rooftop & ground-mount solar installations",
        "Established standardized site safety & quality assurance frameworks",
      ],
      badgeColor: "bg-[#6DAD45]/15 text-[#6DAD45] border-[#6DAD45]/30",
      image: "/images/timeline-2024.jpg",
      imageCaption: "Initial Rooftop Solar & Site Quality Standards",
    },
    {
      year: "2025",
      headline: "Solar & EV Infrastructure",
      tag: "EV MOBILITY & FAST CHARGING",
      subtitle: "SOLAR + EV CHARGING HUBS",
      description:
        "Pioneered integrated solar-assisted EV fast-charging stations and corporate fleet charging hubs, seamlessly connecting solar power generation with electric mobility infrastructure.",
      icon: Car,
      metrics: ["Solar EV Hubs", "DC Fast Chargers", "Smart Fleet Power"],
      achievements: [
        "Deployed solar-assisted EV fast-charging stations for industrial & commercial fleets",
        "Integrated smart load management & grid balancing for electric vehicle hubs",
        "Established automated remote telemetry & real-time charging network O&M",
      ],
      badgeColor: "bg-[#D4E012]/25 text-[#707B00] border-[#D4E012]/60",
      image: "/images/timeline-ev-charging.jpg",
      imageCaption: "Solar-Powered EV Fast Charging Infrastructure",
    },
    {
      year: "2025+",
      headline: "Our Footprint Grows",
      tag: "3 STATES DELIVERED",
      subtitle: "REGIONAL SCALE & MULTI-SITE EXECUTION",
      description:
        "Sarhat installed solar projects across three major industrial states, turning early vision into high-yielding operational clean energy assets on the ground.",
      icon: TrendingUp,
      metrics: ["3 States Active", "15+ Project Sites", "100% On-Time COD"],
      achievements: [
        "Executed commercial, industrial (C&I) & utility solar parks across 3 states",
        "Built dedicated in-house Operations & Maintenance (O&M) service capabilities",
        "Expanded site engineering, procurement & land clearance teams",
      ],
      badgeColor: "bg-[#6DAD45]/20 text-[#6DAD45] border-[#6DAD45]/40",
      image: "/images/timeline-2025.jpg",
      imageCaption: "Multi-State Commercial & Industrial Solar Parks",
    },
    {
      year: "2026",
      headline: "New Capabilities, Wider Reach",
      tag: "7 STATES & MULTI-INFRASTRUCTURE",
      subtitle: "GRID SUBSTATIONS & BESS INTEGRATION",
      description:
        "Sarhat expanded into battery storage (BESS), 33kV/132kV/220kV grid substations, and civil infrastructure, extending delivery across seven states.",
      icon: Globe,
      metrics: ["7 States Presence", "220kV Grid Substations", "Containerized BESS"],
      achievements: [
        "Constructed 33kV / 132kV / 220kV grid substations and SCADA systems",
        "Integrated utility-scale containerized BESS & solar-storage hybrids",
        "Delivered site access roads, piling foundations & drainage infrastructure",
      ],
      badgeColor: "bg-[#5EE72D]/20 text-[#16A34A] border-[#5EE72D]/50",
      image: "/images/timeline-2026.jpg",
      imageCaption: "220kV High-Voltage Substation & BESS Storage",
    },
    {
      year: "2027+",
      headline: "Next-Gen Energy & Global Horizon",
      tag: "FUTURE INFRASTRUCTURE",
      subtitle: "AGROVOLTAICS & GREEN HYDROGEN",
      description:
        "Pioneering agrovoltaics, green hydrogen infrastructure, and smart microgrids, carrying Sarhat's trusted execution model to national and global markets.",
      icon: Rocket,
      metrics: ["Agrovoltaics", "Green Hydrogen", "Global Expansion"],
      achievements: [
        "Developing dual-use agrovoltaic solar projects combining farming & power",
        "Pioneering green hydrogen generation & storage infrastructure",
        "Forging global strategic alliances for large-scale energy transition",
      ],
      badgeColor: "bg-[#707B00]/20 text-[#707B00] border-[#707B00]/40",
      image: "/images/timeline-2027.jpg",
      imageCaption: "Agrovoltaics & Green Hydrogen Infrastructure",
    },
  ];

  const pillars = [
    {
      icon: Target,
      title: "Rooted in India",
      description:
        "Deeply connected to India's clean energy goals, building local infrastructure resilience with world-class engineering standards.",
    },
    {
      icon: ShieldCheck,
      title: "Execution Discipline",
      description:
        "Hands-on delivery, zero-compromise safety protocols, and rigorous quality control from site survey to commissioning.",
    },
    {
      icon: Globe,
      title: "Global Ambition",
      description:
        "Earning trust globally through scalable renewable energy designs, storage integration, and sustainable infrastructure.",
    },
  ];

  const filteredMoments =
    selectedYearFilter === "ALL"
      ? keyMoments
      : keyMoments.filter((m) => m.year.includes(selectedYearFilter));

  const handleYearFilter = (year: string) => {
    setSelectedYearFilter(year);
    // Bring the (re)filtered chapters into view smoothly; the stage then transitions to the first match
    requestAnimationFrame(() => timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        {/* Floating Transparent Navbar */}
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION (Sticky Background Image Overlay Hero) */}
        {/* ------------------------------------------------------------- */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none"
          >
            {/* Background Image Layer */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
              <Image
                src="/images/about-hero-bg-bright.jpg"
                alt="Our Story — Sarhat Energy"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <motion.div style={{ opacity: bgDim }} className="absolute inset-0 bg-black pointer-events-none" />
              {/* Soft Dark Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/95 pointer-events-none"></div>
            </motion.div>

            <motion.div
              style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 flex flex-col items-center text-center will-change-transform"
            >
              <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl flex flex-col items-center text-center">

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 text-center leading-[1.08] drop-shadow-lg">
                    Rooted in India. <br />
                    <span className="text-[#D4E012] italic font-normal">Trusted Globally.</span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-200 max-w-5xl text-center leading-relaxed font-normal drop-shadow-md">
                    Sarhat is an execution-led energy and infrastructure company. Engineering discipline, hands-on delivery and continuous learning shape every project we deliver.
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <ScrollIndicator opacity={contentOpacity} filter={contentFilter} />
          </section>
        </div>

        {/* Main Content Sections (Slides UP over static Hero) */}
        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* ------------------------------------------------------------- */}
          {/* VISION STATEMENT SECTION (CENTERED) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="bg-[#F8FAF8] border-2 border-slate-200/90 rounded-3xl p-8 sm:p-14 shadow-2xl relative text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4E012]/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5EE72D]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Centered Yellow Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-8">
                    <Compass className="w-4 h-4 text-slate-950" />
                    <span>VISION STATEMENT</span>
                  </div>

                  {/* Main Vision Headline Paragraph */}
                  <h2 className="text-2xl sm:text-4xl md:text-4xl font-serif-display font-bold text-slate-900 leading-snug tracking-tight mb-8 max-w-4xl mx-auto">
                    &ldquo;Sarhat aspires to be an India-rooted energy and infrastructure company trusted globally for safe, reliable execution.&rdquo;
                  </h2>

                  {/* Vision Paragraphs */}
                  <div className="space-y-6 max-w-3xl mx-auto text-slate-700 font-normal text-base sm:text-lg leading-relaxed text-center">
                    <p>
                      Building on our solar EPC foundations, we will develop connected capabilities in renewable energy, storage, grid systems and civil infrastructure. We will invest in our people, strengthen our engineering and learn from every project we deliver.
                    </p>
                    <p className="font-medium text-slate-900">
                      We will measure our progress by the trust we earn, the capability we build and the lasting value our projects create for customers, partners, communities and the environment.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* KEY MOMENTS SECTION (HIGHLY ANIMATED PROFESSIONAL TIMELINE) */}
          {/* ------------------------------------------------------------- */}
          <section className="py-24 sm:py-32 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10 overflow-hidden">
            {/* Background Gradient Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-[#6DAD45]/10 via-[#D4E012]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#5EE72D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header */}
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6DAD45]/15 border border-[#6DAD45]/30 text-[#6DAD45] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                    <Calendar className="w-3.5 h-3.5 text-[#6DAD45]" />
                    <span>TIMELINE & MILESTONES</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Key <span className="bg-gradient-to-r from-[#6DAD45] via-[#707B00] to-[#16A34A] bg-clip-text text-transparent italic font-serif-display">Moments</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto">
                    The growth trajectory of Sarhat Energy & Infrastructure — from solar EPC and clean EV mobility to multi-state execution.
                  </p>
                </div>
              </ScrollReveal>

              {/* Interactive Year Filter Bar */}
              <ScrollReveal direction="up" distance={20} delay={0.1}>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
                  {["ALL", "2024", "2025", "2026", "2027+"].map((year) => {
                    const isActive = selectedYearFilter === year;
                    return (
                      <button
                        key={year}
                        onClick={() => handleYearFilter(year)}
                        className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 shadow-sm cursor-pointer ${isActive
                            ? "bg-slate-950 text-[#D4E012] border-2 border-[#6DAD45] scale-105 shadow-lg shadow-[#6DAD45]/20"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-[#6DAD45] hover:text-slate-900"
                          }`}
                      >
                        {year === "ALL" ? "All Milestones" : `Year ${year}`}
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* Achievement chapters: pinned on desktop, simple vertical journey on smaller screens */}
              <div ref={timelineRef} className="scroll-mt-28">
                <KeyMomentsChapters moments={filteredMoments} />
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* CORE PILLARS SECTION */}
          {/* ------------------------------------------------------------- */}
          <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" distance={30}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="inline-block px-5 py-2 rounded-full bg-[#D4E012] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-6">
                    What Guides Us
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight">
                    Our Foundation & <span className="text-[#707B00]">Pillars</span>
                  </h2>
                </div>
              </ScrollReveal>

              <FoundationPillars pillars={pillars} />
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>

        {/* Quote Modal */}
        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
