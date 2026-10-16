"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { ArrowUpRight } from "lucide-react";

export interface RelatedSolutionItem {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const ALL_SOLUTIONS: RelatedSolutionItem[] = [
  {
    category: "SYSTEM DESIGN & INNOVATION",
    title: "Engineering",
    description: "High-yield electrical and structural engineering, yield simulations, topography modeling, and full drawing packages.",
    image: "/images/stage-02-plant-design.jpg",
    href: "/solutions/engineering",
  },
  {
    category: "TIER-1 PROCUREMENT",
    title: "Supply Chain Management",
    description: "Strategic procurement of Tier-1 solar modules, inverters, structures, and BoS components delivered on-schedule to site.",
    image: "/images/partner-hero-bg.jpg",
    href: "/solutions/supply-chain-management",
  },
  {
    category: "CIVIL & ELECTRICAL EPC",
    title: "Construction",
    description: "End-to-end site execution from piling, module mounting structure erection, cable laying to substation and grid synchronization.",
    image: "/images/stage-04-plant-build.jpg",
    href: "/solutions/construction",
  },
  {
    category: "LIFECYCLE ASSET CARE",
    title: "Operation & Maintenance",
    description: "Preventive servicing, module cleaning schedules, string monitoring, and rapid fault resolution to maximize generation.",
    image: "/images/hero-solar.jpg",
    href: "/solutions/operation-and-maintenance",
  },
  {
    category: "AUDIT & REVITALIZATION",
    title: "Solar Plant Health Check-up",
    description: "Comprehensive drone thermography, IV curve tracing, degradation audits, and actionable repowering roadmaps.",
    image: "/images/stage-03-grid-approvals.jpg",
    href: "/solutions/solar-plant-health-checkup",
  },
];

interface RelatedSolutionsSectionProps {
  currentHref?: string;
  customSolutions?: RelatedSolutionItem[];
}

export default function RelatedSolutionsSection({
  currentHref,
  customSolutions,
}: RelatedSolutionsSectionProps) {
  const displaySolutions =
    customSolutions ||
    ALL_SOLUTIONS.filter((sol) => sol.href !== currentHref).slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAF8] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <AnimatedPillBadge className="mb-4">RELATED SOLUTIONS</AnimatedPillBadge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
              Explore more in{" "}
              <span className="text-[#6DAD45] italic relative inline-block">
                Our Solutions.
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
          {displaySolutions.map((sol, idx) => (
            <ScrollReveal key={sol.title} delay={idx * 0.1}>
              <Link
                href={sol.href}
                className="group block rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#6DAD45]/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
              >
                {/* Image Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={sol.image}
                    alt={sol.title}
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
                      {sol.category}
                    </div>
                    <h3 className="font-serif-display font-bold text-slate-900 text-xl sm:text-2xl mb-3 group-hover:text-[#6DAD45] transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {sol.description}
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
  );
}
