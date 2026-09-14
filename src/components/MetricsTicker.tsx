"use client";

import { motion } from "framer-motion";
import { Zap, Leaf, MapPin, Layers } from "lucide-react";

export default function MetricsTicker() {
  const metrics = [
    {
      value: "47 MW",
      label: "SERVED TO BUILD",
      subText: "Utility & C&I Renewable Solar Capacity",
      icon: Zap,
    },
    {
      value: "65,792",
      label: "TONNES CO2 SAVED",
      subText: "Cumulative Environmental Impact",
      icon: Leaf,
    },
    {
      value: "6",
      label: "PORTFOLIO STATES",
      subText: "Pan-India Execution Footprint",
      icon: MapPin,
    },
    {
      value: "24",
      label: "CURRENT PROJECT RECORDS",
      subText: "Turnkey EPC Operational Assets",
      icon: Layers,
    },
  ];

  const executionPillars = [
    { num: "01", text: "INTEGRATED EPC MINDSET" },
    { num: "06", text: "CORE SOLUTION VERTICALS" },
    { num: "06", text: "CURRENT OPERATING STATES" },
    { num: "01", text: "CONNECTED PROJECT JOURNEY" },
  ];

  return (
    <section className="bg-black border-y border-white/10 relative z-20 overflow-hidden">
      {/* Verticals Marquee Banner */}
      <div className="bg-[#050505] py-3 border-b border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-8 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-[#6DAD45] font-semibold">SOLAR EPC</span> • ROOFTOP • C&I • UTILITY SCALE
            <span className="text-[#6DAD45] font-semibold">BESS</span> • STORAGE • GRID SUPPORT
            <span className="text-[#6DAD45] font-semibold">PM-KUSUM</span> • AGRIVOLTAICS • POWER EVACUATION
            <span className="text-[#6DAD45] font-semibold">INFRASTRUCTURE</span> • ROADS • BRIDGES • BUILDINGS
          </div>
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-[#6DAD45] font-semibold">SOLAR EPC</span> • ROOFTOP • C&I • UTILITY SCALE
            <span className="text-[#6DAD45] font-semibold">BESS</span> • STORAGE • GRID SUPPORT
            <span className="text-[#6DAD45] font-semibold">PM-KUSUM</span> • AGRIVOLTAICS • POWER EVACUATION
            <span className="text-[#6DAD45] font-semibold">INFRASTRUCTURE</span> • ROADS • BRIDGES • BUILDINGS
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card-gradient rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:border-[#6DAD45]/40"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#6DAD45]/5 rounded-bl-full pointer-events-none group-hover:bg-[#6DAD45]/15 transition-all"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-semibold tracking-widest text-[#6DAD45] uppercase">
                    {item.label}
                  </span>
                  <IconComponent className="w-5 h-5 text-zinc-500 group-hover:text-[#6DAD45] transition-colors" />
                </div>
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2 group-hover:text-[#6DAD45] transition-colors">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-400 font-light">
                  {item.subText}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary Execution Bar */}
        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {executionPillars.map((pillar, i) => (
            <motion.div
              key={pillar.text}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <span className="font-serif-display text-3xl font-bold text-[#6DAD45]/80">
                {pillar.num}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 leading-tight">
                {pillar.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
