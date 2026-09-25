"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

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
        <ScrollReveal direction="right" distance={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-xs font-mono font-extrabold tracking-widest text-[#707B00] uppercase mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8A9600] animate-ping"></span>
                PEOPLE FIRST & CULTURE
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                When people rise, <br />
                <span className="text-[#6DAD45]">the company rises.</span>
              </h2>
            </div>
            <p className="text-slate-600 font-normal text-base max-w-md leading-relaxed">
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
      </div>
    </section>
  );
}
