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
    },
    {
      tag: "A BETTER STATE",
      title: "People are part of the project.",
      description:
        "Employees, site partners, vendors, communities and clients deserve respect, clarity, safety and reliable safety protocols.",
      icon: Heart,
    },
    {
      tag: "ALWAYS MOVING AHEAD",
      title: "Better every time.",
      description:
        "We encourage ideas from the people closest to the work, and turn lessons from the field into better engineering systems.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="people" className="py-28 bg-black relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#6DAD45] uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6DAD45] animate-ping"></span>
                PEOPLE FIRST & CULTURE
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-white tracking-tight leading-tight">
                When people rise, <br />
                <span className="text-[#6DAD45]">the company rises.</span>
              </h2>
            </div>
            <p className="text-zinc-400 font-light text-base max-w-md leading-relaxed">
              Our culture is built around ownership, responsibility, learning, care and the belief that great projects are built by people who feel trusted to do great work.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Editorial Cards Grid with Scroll Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                whileHover={{ y: -8 }}
                className="card-gradient rounded-3xl p-8 relative flex flex-col justify-between min-h-[280px] border border-white/15 hover:border-[#6DAD45]/50 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#6DAD45] uppercase">
                      {val.tag}
                    </span>
                    <IconComp className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="text-2xl font-serif-display font-medium text-white mb-3">
                    {val.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
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
