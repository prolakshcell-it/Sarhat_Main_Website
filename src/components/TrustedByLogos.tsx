"use client";

import { motion } from "framer-motion";
import { Building2, Cpu, Zap, Landmark, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function TrustedByLogos() {
  const brands = [
    {
      name: "LONGi Solar",
      category: "Bifacial PV Modules",
      icon: Cpu,
    },
    {
      name: "Sungrow Power",
      category: "Inverters & BESS Containers",
      icon: Zap,
    },
    {
      name: "ABB / Hitachi",
      category: "GIS Switchgear & Automation",
      icon: Building2,
    },
    {
      name: "Siemens Energy",
      category: "EHV Transformers & Breakers",
      icon: Cpu,
    },
    {
      name: "Trina Solar",
      category: "N-Type High Efficiency PV",
      icon: Zap,
    },
    {
      name: "Schneider Electric",
      category: "SCADA & Relay Protection",
      icon: Building2,
    },
    {
      name: "UPPCL / KPTCL",
      category: "Substation Bay Evacuation",
      icon: Landmark,
    },
    {
      name: "GETCO / MSEDCL",
      category: "State Transmission Wheeling",
      icon: ShieldCheck,
    },
    {
      name: "SECI / NTPC",
      category: "Utility Scale Solar & ISTS",
      icon: CheckCircle2,
    },
    {
      name: "IREDA / PFC",
      category: "Clean Energy Infrastructure Debt",
      icon: Landmark,
    },
  ];

  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...brands, ...brands];

  return (
    <section id="trusted-by" className="py-20 sm:py-24 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden select-none">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D4E012]/10 via-[#6DAD45]/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-2.5 rounded-full bg-white border border-[#707B00]/40 text-[#707B00] font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-sm mb-6">
              TRUSTED BY INDUSTRY LEADERS
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-4">
              Empowering India&apos;s Top Utilities & Enterprises. <br />
              <span className="text-[#6DAD45] italic relative inline-block">
                Backed by Leading Brands & DISCOMs.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2.5 text-[#6DAD45]"
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
              Trusted by state transmission utilities, renewable power producers, C&I manufacturing leaders, and global clean energy OEMs across India.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Marquee Container with Left & Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden mt-2">
        {/* Gradient Side Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#F8FAF8] via-[#F8FAF8]/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#F8FAF8] via-[#F8FAF8]/90 to-transparent z-20 pointer-events-none"></div>

        {/* Moving Marquee Track (Right to Left) */}
        <div className="flex whitespace-nowrap animate-marquee gap-6 py-4">
          {marqueeItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={`${item.name}-${idx}`}
                className="bg-white rounded-2xl px-6 py-4 border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-center gap-4 shrink-0 hover:border-[#707B00] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8FAF8] flex items-center justify-center border border-slate-200 group-hover:bg-[#D4E012] group-hover:border-[#D4E012] transition-colors">
                  <IconComponent className="w-5 h-5 text-slate-700 group-hover:text-black transition-colors" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif-display font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-[#707B00] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section CTA Button */}
      <ScrollReveal direction="up" distance={30} delay={0.2}>
        <div className="mt-12 text-center relative z-20">
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
          >
            <span>View Our Ecosystem & Partners</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
