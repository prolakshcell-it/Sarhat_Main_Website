"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedPillBadge from "./AnimatedPillBadge";

export default function PeopleFirst() {
  const values = [
    {
      tag: "IN THE RIGHT WAY",
      title: "Integrity before convenience.",
      description:
        "We choose transparent, clear, honest communication and responsible execution especially when the easier answer is not the right one.",
      icon: ShieldCheck,
      direction: "right", // Slide in from left (-x)
    },
    {
      tag: "A BETTER STATE",
      title: "People are part of the project.",
      description:
        "Employees, site partners, vendors, communities and clients deserve respect, clarity, safety and reliable safety protocols.",
      icon: Heart,
      direction: "up", // Slide up from bottom
    },
    {
      tag: "ALWAYS MOVING AHEAD",
      title: "Better every time.",
      description:
        "We encourage ideas from the people closest to the work, and turn lessons from the field into better engineering systems.",
      icon: TrendingUp,
      direction: "left", // Slide in from right (+x)
    },
  ];

  return (
    <section id="people" className="py-28 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedPillBadge className="mb-6">
              PEOPLE FIRST & CULTURE
            </AnimatedPillBadge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
              When people rise, <br />
              <span className="text-[#6DAD45] italic relative inline-block">
                the company rises.
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
              Our culture is built around ownership, responsibility, learning, care and the belief that great projects are built by people who feel trusted to do great work.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Editorial Cards Grid with Side Slide Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const IconComp = val.icon;
            const xOffset = val.direction === "right" ? -80 : val.direction === "left" ? 80 : 0;
            const yOffset = val.direction === "up" ? 50 : 0;

            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, x: xOffset, y: yOffset }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 relative flex flex-col justify-between min-h-[280px] border border-slate-200/90 hover:border-[#D4E012] transition-all shadow-xl shadow-slate-200/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#707B00] uppercase">
                      {val.tag}
                    </span>
                    <IconComp className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-serif-display font-bold text-slate-900 mb-3">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section CTA Button */}
        <ScrollReveal direction="up" distance={30} delay={0.25}>
          <div className="mt-14 text-center">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
            >
              <span>Explore Career Opportunities</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
