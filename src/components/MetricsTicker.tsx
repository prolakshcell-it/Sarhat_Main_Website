"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Zap, Leaf, MapPin, Layers } from "lucide-react";

function AnimatedMetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const isDecimal = value.includes(".");
  const hasComma = value.includes(",");
  const suffix = value.replace(/[\d,.]/g, "");
  const rawNumStr = value.replace(/[^\d.]/g, "");
  const targetNum = parseFloat(rawNumStr) || 0;

  const [displayNum, setDisplayNum] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, targetNum, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        if (isDecimal) {
          setDisplayNum(latest.toFixed(2));
        } else if (hasComma) {
          setDisplayNum(Math.floor(latest).toLocaleString("en-US"));
        } else {
          setDisplayNum(Math.floor(latest).toString());
        }
      },
    });

    return () => controls.stop();
  }, [isInView, targetNum, isDecimal, hasComma]);

  return (
    <div ref={ref} className="font-serif-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-2 group-hover:text-[#707B00] transition-colors">
      {displayNum}
      {suffix}
    </div>
  );
}

export default function MetricsTicker() {
  const metrics = [
    {
      value: "47.77 MW",
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
      value: "7+",
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

  return (
    <section className="bg-[#F8FAF8] border-b border-slate-200/80 relative z-20 overflow-hidden font-sans-ui">
      {/* Main Metric Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
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
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xl shadow-slate-200/50 relative group overflow-hidden transition-all duration-300 hover:border-[#D4E012]"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4E012]/10 rounded-bl-full pointer-events-none group-hover:bg-[#D4E012]/25 transition-all"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#707B00] uppercase">
                    {item.label}
                  </span>
                  <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-[#16A34A] transition-colors" />
                </div>
                <AnimatedMetricValue value={item.value} />
                <div className="text-xs text-slate-600 font-medium">
                  {item.subText}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
