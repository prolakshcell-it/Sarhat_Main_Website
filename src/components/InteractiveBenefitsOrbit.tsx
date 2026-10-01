"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import {
  Wallet,
  GraduationCap,
  Heart,
  Coffee,
  TrendingUp,
  Sun,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

export interface BenefitItem {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  icon: LucideIcon;
  image: string;
  details: string[];
}

const benefitsData: BenefitItem[] = [
  {
    id: "salary",
    title: "Competitive Salary",
    subtitle: "Market-aligned compensation with performance increments.",
    highlight: "Market-Leading Pay",
    icon: Wallet,
    image: "/images/hero-solar.jpg",
    details: [
      "Annual performance increments & milestone bonuses",
      "Comprehensive transparent salary structures",
      "Project execution performance incentives",
    ],
  },
  {
    id: "learning",
    title: "Learning & Development",
    subtitle: "In-house technical training, certifications & site exposure.",
    highlight: "Continuous Upskilling",
    icon: GraduationCap,
    image: "/images/hero-solar.jpg",
    details: [
      "PVsyst, AutoCAD & ETAP software exposure",
      "Hands-on utility-scale substation site training",
      "Mentorship from veteran solar EPC engineers",
    ],
  },
  {
    id: "health",
    title: "Health & Wellness",
    subtitle: "Medical insurance coverage for you and your family.",
    highlight: "Comprehensive Care",
    icon: Heart,
    image: "/images/hero-solar.jpg",
    details: [
      "Group mediclaim insurance for self and family",
      "On-site safety equipment & health checkup camps",
      "Paid sick leave & emergency support policy",
    ],
  },
  {
    id: "flexibility",
    title: "Flexible Environment",
    subtitle: "Collaborative workspace with a healthy work-life balance.",
    highlight: "Healthy Work Life",
    icon: Coffee,
    image: "/images/hero-solar.jpg",
    details: [
      "Transparent, no-bureaucracy communication",
      "Hybrid & field flexibility for project teams",
      "Regular team celebrations & site retreats",
    ],
  },
  {
    id: "progression",
    title: "Career Progression",
    subtitle: "Clear growth paths with regular reviews & promotions.",
    highlight: "Fast-Track Growth",
    icon: TrendingUp,
    image: "/images/hero-solar.jpg",
    details: [
      "Bi-annual capability & leadership reviews",
      "Direct pathway from Site Engineer to Project Lead",
      "Cross-departmental internal job movements",
    ],
  },
  {
    id: "mission",
    title: "Green Mission",
    subtitle: "Be part of India's most impactful clean energy mission.",
    highlight: "National Energy Impact",
    icon: Sun,
    image: "/images/hero-solar.jpg",
    details: [
      "Directly contribute to national solar targets",
      "Work on next-gen BESS storage & green grids",
      "Build sustainable infrastructure that lasts decades",
    ],
  },
];

// Exact mathematical 6-node positions on a circle (Radius R = 35.83%, Center = 50%, 50%)
const nodePositions = [
  {
    top: "14.17%",
    left: "50%",
    labelClass: "absolute bottom-full mb-3 left-1/2 -translate-x-1/2 text-center w-48 sm:w-56 pointer-events-none",
  }, // 1. Top (01) - Text points UP
  {
    top: "32.08%",
    left: "81.03%",
    labelClass: "absolute left-full ml-4 top-1/2 -translate-y-1/2 text-left w-44 lg:w-52 pointer-events-none",
  }, // 2. Top Right (02) - Text points RIGHT
  {
    top: "67.92%",
    left: "81.03%",
    labelClass: "absolute left-full ml-4 top-1/2 -translate-y-1/2 text-left w-44 lg:w-52 pointer-events-none",
  }, // 3. Bottom Right (03) - Text points RIGHT
  {
    top: "85.83%",
    left: "50%",
    labelClass: "absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center w-48 sm:w-56 pointer-events-none",
  }, // 4. Bottom (04) - Text points DOWN
  {
    top: "67.92%",
    left: "18.97%",
    labelClass: "absolute right-full mr-4 top-1/2 -translate-y-1/2 text-right w-44 lg:w-52 pointer-events-none",
  }, // 5. Bottom Left (05) - Text points LEFT
  {
    top: "32.08%",
    left: "18.97%",
    labelClass: "absolute right-full mr-4 top-1/2 -translate-y-1/2 text-right w-44 lg:w-52 pointer-events-none",
  }, // 6. Top Left (06) - Text points LEFT
];

export default function InteractiveBenefitsOrbit() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Automatic Rotation effect (resets timer smoothly on manual selection)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefitsData.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  const activeBenefit = benefitsData[activeIndex];
  const ActiveIcon = activeBenefit.icon;

  // Variants for staggered entrance animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const centerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-white border-b border-slate-200/80 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#D4E012]/10 via-[#5EE72D]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <AnimatedPillBadge className="mb-4">
            Employee Benefits
          </AnimatedPillBadge>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-slate-900 tracking-tight leading-tight mb-5">
            What We <span className="text-[#707B00]">Offer You</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            We believe great work deserves great support. Explore each perk below to see what you get when you join Sarhat Energy & Infrastructure.
          </p>
        </div>

        {/* DESKTOP ORBITAL INTERACTIVE VIEW */}
        <div className="hidden md:flex justify-center items-center pt-14 pb-16 my-4 relative max-w-6xl mx-auto">
          <motion.div
            className="relative w-[540px] lg:w-[580px] aspect-square mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated SVG Dotted Orbital Line (Passes precisely through R=35.83% = 215/600) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
              <circle
                cx="300"
                cy="300"
                r="215"
                fill="none"
                stroke="#D4E012"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="opacity-60"
              />
              {/* Rotating Gradient Indicator Ring */}
              <circle
                cx="300"
                cy="300"
                r="215"
                fill="none"
                stroke="url(#orbitGradient)"
                strokeWidth="3"
                strokeDasharray="85 305"
                className="animate-spin-slow origin-center"
              />
              <defs>
                <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4E012" stopOpacity="1" />
                  <stop offset="50%" stopColor="#5EE72D" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#707B00" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* DYNAMIC CENTER SPOTLIGHT CARD */}
            <motion.div
              variants={centerVariants}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-64 h-64 lg:w-72 lg:h-72 rounded-full p-2 bg-gradient-to-tr from-[#D4E012] via-[#5EE72D] to-[#707B00] shadow-2xl overflow-hidden flex items-center justify-center group"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white border-4 border-white shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-slate-950 pointer-events-none z-10" />

                <Image
                  src={activeBenefit.image}
                  alt={activeBenefit.title}
                  fill
                  className="object-cover opacity-35 scale-105 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dynamic Content inside Center Ring */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBenefit.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-20 flex flex-col items-center text-center px-3"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#D4E012] text-slate-950 flex items-center justify-center mb-2 font-bold shadow-lg shadow-[#D4E012]/40">
                      <ActiveIcon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4E012] font-semibold mb-1 bg-black/40 px-2.5 py-0.5 rounded-full border border-[#D4E012]/30">
                      {activeBenefit.highlight}
                    </span>

                    <h3 className="font-serif-display font-bold text-base lg:text-lg text-white mb-1 leading-snug drop-shadow-md">
                      {activeBenefit.title}
                    </h3>

                    <p className="text-[10px] lg:text-[11px] text-slate-300 font-normal leading-relaxed max-w-[180px] line-clamp-3">
                      {activeBenefit.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 6 ORBIT BENEFIT NODES */}
            {benefitsData.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const isActive = activeIndex === index;
              const pos = nodePositions[index];

              return (
                <div
                  key={benefit.id}
                  style={{
                    position: "absolute",
                    top: pos.top,
                    left: pos.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="z-30 cursor-pointer group"
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div variants={nodeVariants}>
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing halo ring if active */}
                      {isActive && (
                        <span className="absolute -inset-2 rounded-full bg-[#D4E012]/40 animate-ping opacity-75 pointer-events-none" />
                      )}

                      {/* Button circle */}
                      <button
                        className={`w-12 h-12 lg:w-13 lg:h-13 rounded-full border-2 flex items-center justify-center shadow-xl transition-all duration-300 relative z-10 ${
                          isActive
                            ? "bg-[#D4E012] border-[#707B00] text-slate-950 scale-125 shadow-lg shadow-[#D4E012]/50"
                            : "bg-white border-[#D4E012]/70 text-[#707B00] hover:border-[#707B00] hover:scale-110 hover:shadow-md"
                        }`}
                      >
                        <IconComponent className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>

                      {/* Number badge */}
                      <span
                        className={`absolute -top-1 -right-1 text-[9px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border shadow-sm z-20 ${
                          isActive
                            ? "bg-slate-900 text-[#D4E012] border-[#D4E012]"
                            : "bg-slate-100 text-slate-600 border-slate-300"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      {/* Text block positioned relative to button */}
                      <div className={pos.labelClass}>
                        <h4
                          className={`text-xs font-serif-display font-bold transition-colors duration-200 mb-0.5 whitespace-nowrap ${
                            isActive ? "text-[#707B00] text-xs sm:text-sm font-extrabold" : "text-slate-900 group-hover:text-[#707B00]"
                          }`}
                        >
                          {benefit.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-normal leading-tight line-clamp-2">
                          {benefit.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* DETAILED ACTIVE BENEFIT HIGHLIGHT STRIP */}
        <div className="max-w-4xl mx-auto mt-14">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeBenefit.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#F8FAF8] to-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4E012]/20 border border-[#D4E012] flex items-center justify-center text-[#707B00] shrink-0 shadow-inner">
                  <ActiveIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#707B00] uppercase tracking-wider bg-[#D4E012]/20 px-2 py-0.5 rounded">
                      Perk 0{activeIndex + 1} of 06
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600">{activeBenefit.highlight}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif-display font-bold text-slate-900">
                    {activeBenefit.title}
                  </h4>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col gap-2 border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 md:pl-6">
                {activeBenefit.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#707B00] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE STAGGERED GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefitsData.map((b, idx) => {
            const IconComp = b.icon;
            const isSelected = activeIndex === idx;
            return (
              <motion.div
                key={b.id}
                variants={nodeVariants}
                onClick={() => setActiveIndex(idx)}
                className={`border rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#707B00] shadow-md ring-2 ring-[#D4E012]"
                    : "bg-[#F8FAF8] border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#D4E012] border-[#707B00] text-slate-950"
                      : "bg-[#D4E012]/20 border-[#D4E012] text-[#707B00]"
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-serif-display font-bold text-slate-900">{b.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">{b.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
