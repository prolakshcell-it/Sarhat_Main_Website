"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedPillBadge from "./AnimatedPillBadge";

interface PartnerBrand {
  id: string;
  name: string;
  category: string;
  sector: "UTILITIES" | "SUPPLIERS" | "PV MODULES" | "SWITCHGEARS";
  badgeColor: string;
  logo: React.ReactNode;
  logoSrc?: string;
  darkTile?: boolean;
}

function BrandCard({ item, isMatch }: { item: PartnerBrand; isMatch: boolean }) {
  return (
    <div
      tabIndex={0}
      title={item.name}
      aria-label={`${item.name} - ${item.sector}`}
      style={{ "--brand": item.badgeColor } as React.CSSProperties}
      className={`group relative overflow-hidden bg-white rounded-2xl p-3 border flex flex-col items-center gap-2.5 shrink-0 w-[190px] cursor-pointer outline-none transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--brand)]/25 hover:border-[var(--brand)] focus-visible:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40 ${
        isMatch
          ? "opacity-100 border-slate-200/90 scale-100 shadow-md shadow-slate-200/60"
          : "opacity-25 grayscale border-slate-100 scale-90 blur-[1px]"
      }`}
    >
      {/* Shine sweep on hover */}
      <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-700 group-hover:left-[150%] z-10" />
      {/* Brand colour glow on hover */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-[var(--brand)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

      {/* Brand Logo Tile */}
      <div
        className={`h-20 w-full rounded-xl flex items-center justify-center px-4 border transition-transform duration-500 group-hover:scale-105 ${
          item.darkTile ? "bg-slate-800 border-slate-700" : "bg-[#F8FAF8] border-slate-100"
        }`}
      >
        {item.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logoSrc}
            alt={`${item.name} logo`}
            className="max-h-14 max-w-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center gap-2">
            {item.logo}
            <span className="text-xs font-extrabold leading-tight text-slate-700 whitespace-normal max-w-[90px]">
              {item.name}
            </span>
          </div>
        )}
      </div>

      {/* Sector label only */}
      <span
        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors duration-300"
        style={{ backgroundColor: `${item.badgeColor}15`, color: item.badgeColor }}
      >
        {item.sector}
      </span>
    </div>
  );
}

export default function TrustedByLogos() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  // Row 1: Utilities (9) + Switchgears (3) = 12 Brands
  const row1Brands: PartnerBrand[] = [
    {
      id: "bspgcl",
      name: "BSPGCL",
      category: "Bihar State Power Generation",
      sector: "UTILITIES",
      badgeColor: "#B45309",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="#B45309" strokeWidth="2.5" fill="none" />
          <path d="M17 7l-5 9h5l-2 9 8-11h-5l3-7z" fill="#F59E0B" />
        </svg>
      ),
    },
    {
      id: "nbpdcl",
      logoSrc: "/images/partners/nbpdcl.jpg",
      name: "NBPDCL",
      category: "North Bihar Power Distribution",
      sector: "UTILITIES",
      badgeColor: "#0369A1",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="11" stroke="#0369A1" strokeWidth="2.5" fill="none" />
          <path d="M16 6v20M6 16h20" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M14 9l-4 7h6l-2 7 7-9h-5l3-5z" fill="#0284C7" />
        </svg>
      ),
    },
    {
      id: "sbpdcl",
      logoSrc: "/images/partners/sbpdcl.jpg",
      name: "SBPDCL",
      category: "South Bihar Power Distribution",
      sector: "UTILITIES",
      badgeColor: "#047857",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <path d="M6 26h20M16 6v20M11 12l5-6 5 6M9 18l7-6 7 6" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="16" cy="6" r="2" fill="#10B981" />
        </svg>
      ),
    },
    {
      id: "jvvnl",
      name: "JVVNL",
      category: "Jaipur Vidyut Vitran Nigam",
      sector: "UTILITIES",
      badgeColor: "#1D4ED8",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <rect x="4" y="4" width="24" height="24" rx="12" stroke="#1D4ED8" strokeWidth="2.5" fill="none" />
          <path d="M17 7l-5 9h5l-2 9 8-11h-5l3-7z" fill="#1D4ED8" />
        </svg>
      ),
    },
    {
      id: "jdvvnl",
      name: "JDVVNL",
      category: "Jodhpur Vidyut Vitran Nigam",
      sector: "UTILITIES",
      badgeColor: "#D97706",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="11" stroke="#D97706" strokeWidth="2.5" fill="none" />
          <path d="M16 7a9 9 0 019 9" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M15 10l-3 6h4l-2 6 6-7h-4l3-5z" fill="#D97706" />
        </svg>
      ),
    },
    {
      id: "upneda",
      logoSrc: "/images/partners/upneda.png",
      name: "UPNEDA",
      category: "UP New & Renewable Energy Agency",
      sector: "UTILITIES",
      badgeColor: "#15803D",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="13" r="5" fill="#EAB308" />
          <path d="M7 23c4-4 14-4 18 0M10 26c3-2 9-2 12 0" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "mpurja",
      name: "MP Urja",
      category: "M.P. Urja Vikas Nigam Ltd",
      sector: "UTILITIES",
      badgeColor: "#16A34A",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="11" stroke="#16A34A" strokeWidth="2.5" fill="none" />
          <path d="M16 6a10 10 0 010 20c-5 0-8-5-8-10 0-4 4-10 8-10z" fill="#22C55E" opacity="0.8" />
        </svg>
      ),
    },
    {
      id: "updiscoms",
      logoSrc: "/images/partners/updiscoms.png",
      name: "UP DISCOMs",
      category: "PVVNL • DVVNL • MVVNL • PuVVNL",
      sector: "UTILITIES",
      badgeColor: "#0F766E",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <path d="M8 25l8-18 8 18M11 19h10M16 7v18" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M5 25h22" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "haryanadiscoms",
      logoSrc: "/images/partners/haryanadiscoms.png",
      name: "Haryana DISCOMs",
      category: "DHBVN • UHBVN Power Utilities",
      sector: "UTILITIES",
      badgeColor: "#4D7C0F",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="10" stroke="#4D7C0F" strokeWidth="2.5" strokeDasharray="6 3" fill="none" />
          <path d="M17 8l-5 8h5l-2 8 8-10h-5l3-6z" fill="#84CC16" />
        </svg>
      ),
    },
    {
      id: "lauritz",
      logoSrc: "/images/partners/lauritz.png",
      name: "Lauritz Knudsen",
      category: "EHV Switchgear & Protection",
      sector: "SWITCHGEARS",
      badgeColor: "#003366",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <rect x="4" y="4" width="24" height="24" rx="6" stroke="#003366" strokeWidth="2.5" fill="none" />
          <text x="8" y="21" fill="#003366" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="13">LK</text>
          <circle cx="22" cy="10" r="2.5" fill="#D4E012" />
        </svg>
      ),
    },
    {
      id: "schneider",
      logoSrc: "/images/partners/schneider.png",
      name: "Schneider Electric",
      category: "SCADA & Relay Protection",
      sector: "SWITCHGEARS",
      badgeColor: "#3DCD58",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="12" stroke="#3DCD58" strokeWidth="2.5" fill="none" />
          <path d="M13 10v12l8-6-8-6z" fill="#3DCD58" />
        </svg>
      ),
    },
    {
      id: "abb",
      logoSrc: "/images/partners/abb.png",
      name: "ABB India",
      category: "GIS Switchgear & Substation",
      sector: "SWITCHGEARS",
      badgeColor: "#FF000F",
      logo: (
        <svg viewBox="0 0 38 24" className="w-7 h-5">
          <text x="0" y="19" fill="#FF000F" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="21" letterSpacing="0.5">ABB</text>
        </svg>
      ),
    },
  ];

  // Row 2: Suppliers/Inverters (4) + PV Modules (8) = 12 Brands
  const row2Brands: PartnerBrand[] = [
    {
      id: "sungrow",
      logoSrc: "/images/partners/sungrow.png",
      name: "Sungrow",
      category: "Inverters & BESS Containers",
      sector: "SUPPLIERS",
      badgeColor: "#F39800",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="6" fill="#F39800" />
          <path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8" stroke="#F39800" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "wattpower",
      logoSrc: "/images/partners/wattpower.png",
      name: "WattPower",
      category: "Utility String Inverters",
      sector: "SUPPLIERS",
      badgeColor: "#0066CC",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <path d="M4 9l4 14 4-10 4 10 4-14" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M22 6l5 10-3 1 4 9" stroke="#00C2DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      id: "hitachi",
      logoSrc: "/images/partners/hitachi.png",
      name: "Hitachi Energy",
      category: "Grid Automation & Power Systems",
      sector: "SUPPLIERS",
      badgeColor: "#E60012",
      logo: (
        <svg viewBox="0 0 36 22" className="w-7 h-5">
          <rect x="1" y="3" width="6" height="16" fill="#E60012" rx="1" />
          <rect x="10" y="3" width="6" height="16" fill="#E60012" rx="1" />
          <path d="M19 3h6l-4 8 4 8h-6l-4-8 4-8z" fill="#E60012" />
        </svg>
      ),
    },
    {
      id: "solplanet",
      logoSrc: "/images/partners/solplanet.png",
      name: "Solplanet",
      category: "Smart Commercial Inverters",
      sector: "SUPPLIERS",
      badgeColor: "#00A0E9",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="11" stroke="#00A0E9" strokeWidth="2.5" fill="none" />
          <circle cx="16" cy="16" r="6" fill="#F97316" />
          <ellipse cx="16" cy="16" rx="14" ry="4" stroke="#00A0E9" strokeWidth="1.5" fill="none" transform="rotate(-25 16 16)" />
        </svg>
      ),
    },
    {
      id: "rayzon",
      logoSrc: "/images/partners/rayzon.png",
      name: "Rayzon Solar",
      category: "Tier-1 PV Modules",
      sector: "PV MODULES",
      badgeColor: "#0284C7",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="7" fill="#F59E0B" />
          <path d="M16 2v5M16 25v5M2 16h5M25 16h5M6 6l4 4M22 22l4 4M6 26l4-4M22 10l4-4" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "vikram",
      logoSrc: "/images/partners/vikram.png",
      name: "Vikram Solar",
      category: "High-Efficiency Solar Modules",
      sector: "PV MODULES",
      badgeColor: "#EA580C",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <polygon points="16,3 19,12 28,12 21,18 24,27 16,21 8,27 11,18 4,12 13,12" fill="#EA580C" />
          <circle cx="16" cy="16" r="4" fill="#FBBF24" />
        </svg>
      ),
    },
    {
      id: "waaree",
      name: "Waaree Energies",
      category: "Tier-1 Solar PV Modules",
      sector: "PV MODULES",
      badgeColor: "#E05A10",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <path d="M4 22h24" stroke="#E05A10" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M8 20a8 8 0 0116 0" fill="#E05A10" opacity="0.85" />
          <path d="M16 6v4M7 9l3 3M25 9l-3 3" stroke="#E05A10" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "adani",
      logoSrc: "/images/partners/adani.png",
      name: "Adani Solar",
      category: "Bifacial PV & N-Type Cells",
      sector: "PV MODULES",
      badgeColor: "#1E3A8A",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <path d="M6 24V8l10 8 10-8v16" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="16" cy="16" r="3" fill="#0284C7" />
        </svg>
      ),
    },
    {
      id: "avaada",
      logoSrc: "/images/partners/avaada.png",
      darkTile: true,
      name: "Avaada Energy",
      category: "Utility Clean Energy",
      sector: "PV MODULES",
      badgeColor: "#10B981",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="10" stroke="#10B981" strokeWidth="3" strokeDasharray="18 4" fill="none" />
          <path d="M11 20l5-10 5 10M13 16h6" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      id: "renew",
      logoSrc: "/images/partners/renew.svg",
      name: "ReNew",
      category: "Renewable Power IPP",
      sector: "PV MODULES",
      badgeColor: "#84CC16",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <path d="M16 4c-5 0-9 4-9 9 0 7 9 15 9 15s9-8 9-15c0-5-4-9-9-9z" fill="#84CC16" />
          <circle cx="16" cy="13" r="4" fill="#F97316" />
        </svg>
      ),
    },
    {
      id: "renewsys",
      name: "RenewSys",
      category: "Encapsulants & PV Modules",
      sector: "PV MODULES",
      badgeColor: "#059669",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <polygon points="16,3 27,9 27,23 16,29 5,23 5,9" stroke="#059669" strokeWidth="2.5" fill="none" />
          <circle cx="16" cy="16" r="5" fill="#10B981" />
        </svg>
      ),
    },
    {
      id: "gautam",
      logoSrc: "/images/partners/gautam.png",
      name: "Gautam Solar",
      category: "High-Yield Solar PV",
      sector: "PV MODULES",
      badgeColor: "#DC2626",
      logo: (
        <svg viewBox="0 0 32 32" className="w-6 h-6">
          <circle cx="16" cy="16" r="6" fill="#DC2626" />
          <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2.2 2.2M22.3 22.3l2.2 2.2M7.5 24.5l2.2-2.2M22.3 9.7l2.2-2.2" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Infinite Marquee Doubled Arrays
  const row1Items = [...row1Brands, ...row1Brands];
  const row2Items = [...row2Brands, ...row2Brands];

  const filterTabs = [
    { label: "ALL", key: "ALL" },
    { label: "UTILITIES", key: "UTILITIES" },
    { label: "SUPPLIERS", key: "SUPPLIERS" },
    { label: "PV MODULES", key: "PV MODULES" },
    { label: "SWITCHGEARS", key: "SWITCHGEARS" },
  ];

  return (
    <section id="trusted-by" className="py-10 sm:py-12 lg:py-16 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden select-none">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#D4E012]/10 via-[#6DAD45]/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <AnimatedPillBadge className="mb-6">
              TRUSTED BY INDUSTRY LEADERS
            </AnimatedPillBadge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-medium text-slate-900 tracking-tight leading-snug mb-4">
              Strong relationships coordinated delivery<br />
              <span className="text-[#6DAD45] italic relative inline-block">
                Working with Leading Brands & Utilities.
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
              A trusted supplier network, reliable technology & coordinated expertise-supporting your project at every stage.
            </p>
          </div>
        </ScrollReveal>

        {/* Sector Filter Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {filterTabs.map((tab, i) => (
            <motion.button
              key={tab.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(tab.key)}
              className={`relative text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer border transition-colors ${
                activeFilter === tab.key
                  ? "text-[#D4E012] border-slate-900"
                  : "bg-white text-slate-600 border-slate-200/90 hover:border-[#6DAD45] hover:text-slate-900"
              }`}
            >
              {activeFilter === tab.key && (
                <motion.span
                  layoutId="trusted-active-chip"
                  className="absolute inset-0 rounded-full bg-slate-900 shadow-lg shadow-slate-900/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Marquee Container with Left & Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden space-y-4">
        {/* Gradient Side Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#F8FAF8] via-[#F8FAF8]/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#F8FAF8] via-[#F8FAF8]/90 to-transparent z-20 pointer-events-none"></div>

        {/* ROW 1: Utilities & Switchgears (Scrolls Left) */}
        <div className="flex whitespace-nowrap animate-marquee gap-4 sm:gap-5 py-3 motion-reduce:animate-none">
          {row1Items.map((item, idx) => (
            <BrandCard
              key={`r1-${item.id}-${idx}`}
              item={item}
              isMatch={activeFilter === "ALL" || activeFilter === item.sector}
            />
          ))}
        </div>

        {/* ROW 2: Suppliers & PV Modules (Scrolls Right) */}
        <div className="flex whitespace-nowrap animate-marquee-reverse gap-4 sm:gap-5 py-3 motion-reduce:animate-none">
          {row2Items.map((item, idx) => (
            <BrandCard
              key={`r2-${item.id}-${idx}`}
              item={item}
              isMatch={activeFilter === "ALL" || activeFilter === item.sector}
            />
          ))}
        </div>
      </div>

      {/* Section CTA Button */}
      <ScrollReveal direction="up" distance={30} delay={0.2}>
        <div className="mt-10 sm:mt-12 text-center relative z-20">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
          >
            <span>Become a Partner</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
