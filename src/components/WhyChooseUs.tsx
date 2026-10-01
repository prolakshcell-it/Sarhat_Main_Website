"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Award, Clock, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedPillBadge from "./AnimatedPillBadge";

export default function WhyChooseUs() {
  const reasons = [
    {
      num: "01",
      title: "Single-Source EPC Execution",
      badge: "100% Integrated",
      description:
        "We connect site topography, civil engineering, electrical SLDs, procurement, and 24/7 telemetry under one single project view — eliminating handoff delays and vendor blame games.",
      icon: Layers,
    },
    {
      num: "02",
      title: "Grid & DISCOM Clearance Mastery",
      badge: "Zero Bay Delays",
      description:
        "Deep statutory expertise in 33kV/132kV/220kV substation bay allocations, EHV transmission line corridors, and GETCO/UPPCL/KPTCL grid wheeling approvals across India.",
      icon: Zap,
    },
    {
      num: "03",
      title: "Bankable Tier-1 OEM Alliances",
      badge: "Tier-1 Quality",
      description:
        "Direct procurement partnerships with LONGi, Sungrow, ABB, Siemens, and Huawei. Zero-compromise quality for bifacial PV modules, N-type cells, and containerized BESS storage.",
      icon: Award,
    },
    {
      num: "04",
      title: "On-Time Commissioning Record",
      badge: "49.77+ MW Installed",
      description:
        "Proven track record of completing complex utility solar parks, PM-KUSUM feeders, and C&I captive projects weeks ahead of statutory schedules with zero safety compromises.",
      icon: Clock,
    },
  ];

  const summaryStats = [
    { label: "DISCOM Clearance Rate", value: "100%" },
    { label: "Turnkey Solar & BESS", value: "49.77+ MW" },
    { label: "Pan-India Core Footprint", value: "7+ States" },
    { label: "Operational Safety Score", value: "Zero Incidents" },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-28 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden">
      {/* Background Subtle Ambient Flares */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6DAD45]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedPillBadge className="mb-6">
              WHY CHOOSE US
            </AnimatedPillBadge>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
              The Sarhat Advantage. <br />
              <span className="text-[#6DAD45] italic relative inline-block">
                Built for Performance & Trust.
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
              Why DISCOMs, IPPs, C&I enterprises, and clean energy developers across India trust Sarhat for turnkey renewable energy & infrastructure execution.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Core Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <ScrollReveal key={item.num} direction="up" delay={idx * 0.1} distance={40}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xl shadow-slate-200/40 relative overflow-hidden group h-full flex flex-col justify-between hover:border-[#707B00] transition-colors"
                >
                  {/* Decorative Corner Glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4E012]/10 rounded-bl-full pointer-events-none group-hover:bg-[#D4E012]/25 transition-all"></div>

                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-black text-[#707B00] uppercase tracking-widest px-3 py-1 bg-[#F8FAF8] rounded-full border border-[#707B00]/20">
                        {item.num}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-[#F8FAF8] flex items-center justify-center border border-slate-200/80 group-hover:bg-[#D4E012] group-hover:border-[#D4E012] transition-colors shadow-sm">
                        <IconComp className="w-5 h-5 text-slate-700 group-hover:text-black transition-colors" />
                      </div>
                    </div>

                    {/* Title & Badge */}
                    <h3 className="text-xl font-serif-display font-bold text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-[#707B00] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Highlight Pill */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6DAD45] shrink-0" />
                    <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Section CTA Button */}
        <ScrollReveal direction="up" distance={30} delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
            >
              <span>Learn More About Sarhat</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
