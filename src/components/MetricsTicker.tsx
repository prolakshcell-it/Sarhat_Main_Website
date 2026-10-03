"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

function AnimatedMetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const prefix = value.startsWith("~") ? "~" : "";
  const cleanVal = value.replace(/^~/, "");
  const isDecimal = cleanVal.includes(".");
  const hasComma = cleanVal.includes(",");
  const suffix = cleanVal.replace(/[\d,.]/g, "");
  const rawNumStr = cleanVal.replace(/[^\d.]/g, "");
  const targetNum = parseFloat(rawNumStr) || 0;

  const [displayNum, setDisplayNum] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, targetNum, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        if (targetNum > 2000 && targetNum < 2030) {
          setDisplayNum(Math.floor(latest).toString());
        } else if (isDecimal) {
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
    <div ref={ref} className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-1.5 tabular-nums group-hover:text-[#707B00] transition-colors duration-200">
      {prefix}{displayNum}{suffix}
    </div>
  );
}

export default function MetricsTicker() {
  const metrics = [
    {
      value: "70+",
      label: "FY 2026",
      subText: "Ongoing Projects",
    },
    {
      value: "12+ Yrs",
      label: "FY 2026",
      subText: "Team Exp",
    },
    {
      value: "34",
      label: "FY 2026",
      subText: "Core Team",
    },
    {
      value: "100*",
      label: "FY 2026",
      subText: "Site Workers",
    },
    {
      value: "7+ States",
      label: "FY 2026",
      subText: "Footprints",
    },
    {
      value: "4",
      label: "FY 2026",
      subText: "Business Segments",
    },
  ];

  return (
    <section className="bg-[#FAFBF9] border-b border-slate-200/80 relative z-20 overflow-hidden font-sans-ui">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* 1-Line Card Grid Layout (Single horizontal line) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
          {metrics.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="min-w-0"
              >
                <div className="metric-card h-full min-h-[132px] bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#707B00] shadow-[0_4px_20px_rgba(15,23,42,0.06)] relative group flex flex-col justify-between">
                  {/* Header Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#707B00] uppercase truncate">
                      {item.label}
                    </span>
                  </div>

                  {/* Main Metric Value */}
                  <AnimatedMetricValue value={item.value} />

                  {/* Subtitle Description */}
                  <div className="text-[12px] text-slate-600 font-medium leading-tight truncate">
                    {item.subText}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

