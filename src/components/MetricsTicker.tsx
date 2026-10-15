"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";

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
    <div
      ref={ref}
      className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1.5 tabular-nums text-slate-900 transition-colors duration-200"
    >
      {prefix}{displayNum}{suffix}
    </div>
  );
}

export default function MetricsTicker() {
  const { scrollY } = useScroll();

  // Smooth scroll-driven emergence from behind/underneath the background
  const sectionOpacity = useTransform(scrollY, [20, 240], [0.35, 1]);
  const sectionY = useTransform(scrollY, [20, 260], [35, 0]);
  const sectionScale = useTransform(scrollY, [20, 260], [0.97, 1]);

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
    <section className="bg-transparent border-b border-slate-200/80 relative z-20 overflow-hidden font-sans-ui select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* 1-Line Card Grid Layout (Single horizontal line with emergence transform) */}
        <motion.div
          style={{
            opacity: sectionOpacity,
            y: sectionY,
            scale: sectionScale,
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full will-change-transform"
        >
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="min-w-0"
            >
              <div
                className="metric-card h-full min-h-[132px] rounded-2xl p-5 relative flex flex-col justify-between bg-white border-2 border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:border-[#6DAD45] hover:shadow-[0_12px_28px_rgba(109,173,69,0.18)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out cursor-default"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase truncate text-[#6B7A40]">
                    {item.label}
                  </span>
                </div>

                {/* Main Metric Value (stays dark/black, only border changes) */}
                <AnimatedMetricValue value={item.value} />

                {/* Subtitle Description */}
                <div className="text-[12px] font-medium leading-tight truncate text-slate-600">
                  {item.subText}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
