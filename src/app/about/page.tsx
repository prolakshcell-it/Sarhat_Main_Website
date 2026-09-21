"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  Compass,
  CheckCircle2,
  Lock,
  ArrowDownRight,
  Leaf,
  Layers,
  Activity,
  Heart,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeFlightNode, setActiveFlightNode] = useState<string>("land");

  const flightNodes = [
    { id: "land", title: "LAND / SITE", sub: "Control", x: "18%", y: "30%" },
    { id: "approvals", title: "APPROVALS", sub: "Readiness", x: "42%", y: "25%" },
    { id: "schedule", title: "SCHEDULE", sub: "COD", x: "78%", y: "32%" },
    { id: "grid", title: "GRID", sub: "Evacuation", x: "28%", y: "70%" },
    { id: "design", title: "DESIGN", sub: "Maturity", x: "55%", y: "72%" },
    { id: "supply", title: "SUPPLY", sub: "Procurement", x: "82%", y: "76%" },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#6DAD45] selection:text-black relative overflow-x-hidden font-sans-ui">
      {/* Floating Transparent Navbar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* ------------------------------------------------------------- */}
      {/* 01 / ABOUT SARHAT - HERO SECTION (IMAGE 1 TOP) */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-36 pb-20 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={30}>
            {/* Breadcrumb */}
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-6">
              HOME / ABOUT US
            </div>

            {/* Tag & Editorial Title */}
            <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
              ABOUT SARHAT
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] mb-6 max-w-5xl">
              People at the centre. <br />
              <span className="text-[#6DAD45] italic">Progress in every project.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-3xl leading-relaxed mb-16">
              We bring people, engineering and execution together to turn clean–energy and infrastructure ideas into practical projects that create value for businesses, communities and India.
            </p>
          </ScrollReveal>

          {/* Stats Bar (47 MW | 65,792 | 6 | 2024) */}
          <ScrollReveal direction="up" distance={40} delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-white/10 py-10 my-8">
              <div className="border-r border-white/10 pr-6">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#6DAD45] tracking-tight mb-2">
                  47 MW
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                  SERVED TO BUILD
                </div>
              </div>

              <div className="border-r border-white/10 pr-6 pl-2 sm:pl-4">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#6DAD45] tracking-tight mb-2">
                  65,792
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                  TONNES CO2 SAVED
                </div>
              </div>

              <div className="border-r border-white/10 pr-6 pl-2 sm:pl-4">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#6DAD45] tracking-tight mb-2">
                  6
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                  PORTFOLIO STATES
                </div>
              </div>

              <div className="pl-2 sm:pl-4">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#6DAD45] tracking-tight mb-2">
                  2024
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                  SARHAT FOUNDED
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* OUR VISION Section (Image 1 Bottom) */}
          <div className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal direction="left" distance={40}>
                <div className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest mb-3">
                  OUR VISION
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight">
                  Build a cleaner, stronger India by making complex energy and infrastructure projects easier to trust.
                </h2>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal direction="right" distance={40}>
                <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
                  Our roots are in solar EPC, where we have built our approach around feasibility, engineering, procurement, construction, commissioning and long-term support. We are now expanding that capability into wind, BESS, agrivoltaics, substations and civil infrastructure.
                </p>
                <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                  The ambition is not to become everything to everyone. It is to become a better connected partner for the projects that matter: generation, storage, grid and the physical infrastructure around them.
                </p>
              </ScrollReveal>

              {/* 4 Cards Grid (Vision, Mission, Objective, Ethics) */}
              <ScrollReveal direction="up" distance={40} delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      VISION
                    </span>
                    <h3 className="text-lg font-serif-display font-medium text-white mb-2">
                      Clean energy. Strong infrastructure.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Build assets that create value for clients, communities and future generations.
                    </p>
                  </div>

                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      MISSION
                    </span>
                    <h3 className="text-lg font-serif-display font-medium text-white mb-2">
                      Engineer. Execute. Care.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Deliver with technical discipline, clear communication and responsibility at every stage.
                    </p>
                  </div>

                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      OBJECTIVE
                    </span>
                    <h3 className="text-lg font-serif-display font-medium text-white mb-2">
                      Reduce complexity and risk.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Connect people, engineering, procurement and execution into one accountable journey.
                    </p>
                  </div>

                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      ETHICS
                    </span>
                    <h3 className="text-lg font-serif-display font-medium text-white mb-2">
                      Do the right thing.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Integrity, transparency, safety and respect are not optional project features.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 02 / THE SARHAT EFFECT (IMAGE 2 TOP) - RISK VS VALUE GRAPH */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                  THE SARHAT EFFECT
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
                  As project risk falls, <br />
                  <span className="text-[#6DAD45]">Sarhat value rises.</span>
                </h2>
              </div>
              <p className="text-zinc-400 font-light text-base max-w-md leading-relaxed">
                One continuous visual story: uncertainty moves down while confidence, control and execution value move up.
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Graph Box (Image 2) */}
          <ScrollReveal direction="up" distance={50} delay={0.15}>
            <div className="card-gradient rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden mb-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <ArrowDownRight className="w-4 h-4 text-white" />
                  <span className="uppercase tracking-widest text-zinc-300">PROJECT RISK</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#6DAD45]">
                  <span className="uppercase tracking-widest font-bold">SARHAT VALUE</span>
                  <ArrowUpRight className="w-4 h-4 text-[#6DAD45]" />
                </div>
              </div>

              {/* Graph SVG canvas */}
              <div className="relative w-full h-[220px] sm:h-[260px] my-6">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  {/* Sloping Down White Line (Project Risk) */}
                  <line
                    x1="5"
                    y1="10"
                    x2="95"
                    y2="42"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  {/* Sloping Up Green Line (Sarhat Value) */}
                  <line
                    x1="5"
                    y1="42"
                    x2="95"
                    y2="10"
                    stroke="#6DAD45"
                    strokeWidth="2.5"
                    className="path-pulse"
                  />
                </svg>
              </div>

              {/* Graph X-Axis Labels */}
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest pt-4 border-t border-white/10">
                <span>START / FEASIBILITY</span>
                <span>ENGINEERING</span>
                <span>PROCUREMENT</span>
                <span>EXECUTION</span>
                <span>DELIVERY / TRUST</span>
              </div>
            </div>
          </ScrollReveal>

          {/* 2 Bottom Cards (We Reduce / We Raise) */}
          <ScrollReveal direction="up" distance={40} delay={0.25}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#0B0F0B] border border-white/15 rounded-2xl p-8 hover:border-white/30 transition-colors">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                  WE REDUCE
                </span>
                <h3 className="text-2xl font-serif-display font-medium text-white mb-3">
                  Risk
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Technical gaps, coordination gaps, avoidable delays, quality surprises and unclear ownership.
                </p>
              </div>

              <div className="bg-[#0B0F0B] border border-[#6DAD45]/40 rounded-2xl p-8 hover:border-[#6DAD45] transition-colors">
                <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                  WE RAISE
                </span>
                <h3 className="text-2xl font-serif-display font-medium text-white mb-3">
                  Confidence
                </h3>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  Clarity, accountability, execution visibility, safety and long-term asset confidence.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 03 / OUR CULTURE & PEOPLE FIRST (IMAGE 2 BOTTOM) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Dual Image Stack (Image 2) */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal direction="left" distance={40}>
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                  <Image
                    src="/images/hero-solar.jpg"
                    alt="SARHAT Solar Plant"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>

                {/* Overlapping Badge Pill */}
                <div className="absolute -bottom-6 -right-4 sm:right-4 bg-[#6DAD45] text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-2xl border-2 border-black flex items-center gap-2">
                  <span>People + Engineering + Execution</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Culture Info & 4 Cards */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="right" distance={40}>
                <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6DAD45]"></span>
                  OUR CULTURE & PEOPLE FIRST
                </div>

                <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6">
                  A people-first company in an execution-heavy industry.
                </h2>

                <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed mb-10">
                  We believe people do their best work when they have context, ownership and respect. That means listening to site teams, supporting learning, giving clients honest answers and treating partners as part of the delivery chain.
                </p>
              </ScrollReveal>

              {/* 4 Culture Pillars */}
              <ScrollReveal direction="up" distance={40} delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      CARE
                    </span>
                    <h3 className="text-base font-serif-display font-medium text-white mb-2">
                      Safety is personal.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Every site decision should protect people before schedule.
                    </p>
                  </div>

                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      OWNERSHIP
                    </span>
                    <h3 className="text-base font-serif-display font-medium text-white mb-2">
                      Take responsibility.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Problems are surfaced early and solved together.
                    </p>
                  </div>

                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      KNOWLEDGE
                    </span>
                    <h3 className="text-base font-serif-display font-medium text-white mb-2">
                      Stay curious.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      We turn field experience into repeatable knowledge.
                    </p>
                  </div>

                  <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 hover:border-[#6DAD45]/50 transition-colors">
                    <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-2">
                      TRUST
                    </span>
                    <h3 className="text-base font-serif-display font-medium text-white mb-2">
                      Say what is true.
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Clear communication builds stronger relationships.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 03 / SARHAT EXECUTION FLIGHT (IMAGE 3) - RADAR CANVAS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3">
              WHAT SARHAT STANDS FOR
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6 max-w-4xl">
              Energy that works for people.
            </h2>
            <p className="text-zinc-300 font-light text-base sm:text-lg max-w-2xl leading-relaxed mb-16">
              From a rooftop that helps a family manage electricity costs to a utility-scale project that supports a larger power system, we believe good infrastructure should make everyday progress easier, cleaner and more dependable.
            </p>
          </ScrollReveal>

          {/* Section 03 / SARHAT EXECUTION FLIGHT */}
          <ScrollReveal direction="up" distance={40} delay={0.15}>
            <div className="mb-12">
              <div className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest mb-3">
                SARHAT EXECUTION RADAR
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight mb-4">
                Challenges move. <br />
                <span className="text-[#6DAD45]">We keep the project moving.</span>
              </h2>
              <p className="text-zinc-400 font-light text-sm max-w-xl">
                Every project has obstacles. Our job is to identify them early, navigate them deliberately and keep the project on course.
              </p>
            </div>
          </ScrollReveal>

          {/* Radar Flight Path Canvas (Image 3) */}
          <ScrollReveal direction="up" distance={50} delay={0.25}>
            <div className="card-gradient rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden min-h-[380px] shadow-2xl">
              {/* Radar Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6DAD45]/10 via-transparent to-transparent"></div>
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>

              <div className="relative w-full h-[320px] sm:h-[360px] border border-white/10 rounded-2xl bg-black/60 p-6 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                  <span>RISK FIELD</span>
                  <span className="text-[#6DAD45] font-bold">ENGINEERED PATH</span>
                  <span>DELIVERY</span>
                </div>

                {/* Radar Floating Nodes */}
                {flightNodes.map((node) => {
                  const isActive = activeFlightNode === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveFlightNode(node.id)}
                      style={{ top: node.y, left: node.x }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                    >
                      <div
                        className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                          isActive
                            ? "bg-[#6DAD45] text-black font-bold border-white scale-110 shadow-lg shadow-[#6DAD45]/40"
                            : "bg-zinc-900/90 text-zinc-300 border-white/20 hover:border-[#6DAD45]"
                        }`}
                      >
                        <span>{node.title}</span>
                        <span className="opacity-75 font-normal">({node.sub})</span>
                      </div>
                    </button>
                  );
                })}

                {/* Center Rocket Cursor Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold px-4 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 shadow-2xl border-2 border-[#6DAD45]">
                  <span>SARHAT</span>
                  <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 04 / CLIMATE IMPACT (IMAGE 4 TOP) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-28 border-b border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                  CLIMATE IMPACT & SUSTAINABILITY
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
                  Measure the impact. <br />
                  <span className="text-zinc-400 font-normal">Do not just describe it.</span>
                </h2>
              </div>
              <p className="text-zinc-400 font-light text-base max-w-md leading-relaxed">
                We will publish verified Sarhat portfolio numbers as our internal impact data is consolidated and audited.
              </p>
            </div>
          </ScrollReveal>

          {/* 2 Impact Cards (Image 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal direction="left" distance={40}>
              <div className="card-gradient rounded-3xl p-8 sm:p-10 border border-white/15 flex flex-col justify-between min-h-[320px]">
                <div>
                  <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-4">
                    CO2 AVOIDED
                  </span>
                  <div className="font-serif-display text-6xl sm:text-7xl font-bold text-[#6DAD45] mb-2">
                    0
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mb-6">
                    tonnes of CO2 avoided through verified Sarhat projects
                  </div>

                  <div className="flex gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#6DAD45]/15 border border-[#6DAD45]/40 text-[#6DAD45] text-xs font-mono rounded-lg">
                      Verified data (Portfolio based)
                    </span>
                    <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-mono rounded-lg">
                      Annual (Impact reporting)
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 font-light leading-relaxed border-t border-white/10 pt-4">
                  The live number should be replaced with Sarhat&apos;s verified cumulative calculation before launch. We have intentionally not invented a company-wide figure.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" distance={40}>
              <div className="card-gradient rounded-3xl p-8 sm:p-10 border border-white/15 flex flex-col justify-between min-h-[320px]">
                <div>
                  <span className="text-[10px] font-mono text-[#6DAD45] uppercase tracking-widest block mb-4">
                    HOW WE WILL CALCULATE
                  </span>
                  <h3 className="text-2xl font-serif-display font-medium text-white mb-4">
                    Generation × approved emissions factor.
                  </h3>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                    For each project, record verified renewable generation and the applicable grid or displaced-emission factor. Aggregate the result by project and reporting year.
                  </p>
                </div>

                <p className="text-xs text-zinc-400 font-light leading-relaxed border-t border-white/10 pt-4">
                  This is more credible than using generic tree-equivalent claims. Sarhat&apos;s existing solar calculator currently uses an example of 5.2 tonnes of CO2 avoided per year for a 5 kW system, but that is a customer estimate.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 05 / THE ROAD AHEAD (IMAGE 4 BOTTOM) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-black relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={40}>
            <div className="card-gradient rounded-3xl p-10 sm:p-14 border border-[#6DAD45]/40 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#6DAD45]/15 rounded-full blur-3xl pointer-events-none"></div>

              <span className="text-xs font-mono text-[#6DAD45] uppercase tracking-widest block mb-4">
                THE ROAD AHEAD
              </span>

              <h2 className="text-4xl sm:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight mb-6 max-w-3xl">
                Energy today. <br />
                <span className="text-[#6DAD45]">More possibilities tomorrow.</span>
              </h2>

              <p className="text-zinc-300 font-light text-base sm:text-lg max-w-xl leading-relaxed">
                Hospitality is planned as a future vertical and will be developed separately under its own brand and website.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </main>
  );
}
