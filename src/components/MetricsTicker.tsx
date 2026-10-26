"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";

interface MetricItemProps {
  value: string;
  numSuffix?: string;
  unit?: string;
  label: string;
}

function AnimatedMetricItem({
  value,
  numSuffix = "",
  unit = "",
  label,
}: MetricItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const targetNum = parseFloat(value) || 0;
  const [displayNum, setDisplayNum] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, targetNum, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplayNum(Math.floor(latest).toString());
      },
    });

    return () => controls.stop();
  }, [isInView, targetNum]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center px-2 py-2 group">
      {/* Clean, Simple Modern Sans-Serif Numbers matching tech/renewable design */}
      <div className="flex items-baseline justify-center gap-0.5 tracking-tight text-slate-900 leading-none">
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-sans-inter font-bold tabular-nums">
          {displayNum}
          {numSuffix}
        </span>
        {unit && (
          <span className="text-base sm:text-lg lg:text-xl font-sans-inter font-extrabold text-[#707B00] ml-1.5 uppercase tracking-wide">
            {unit}
          </span>
        )}
      </div>

      {/* Clean Uppercase Tracked Subtitle Label */}
      <div className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] md:text-xs font-sans-inter font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-slate-500 leading-tight">
        {label}
      </div>
    </div>
  );
}

export default function MetricsTicker() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.4"],
  });

  // Precision Opacity: Starts with a gentle 20% translucent wash so solar panels show through crisply,
  // then smoothly transitions to 100% solid porcelain (#F8FAF8) as the user scrolls into the content.
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  // Content Motion: Smooth upward translation and opacity emergence matching Sunbuy EPC reference
  const contentY = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.25, 0.75, 1]);

  // SARHAT portfolio metrics matching the horizontal strip layout
  const metrics: MetricItemProps[] = [
    {
      value: "70",
      numSuffix: "+",
      label: "Ongoing Projects",
    },
    {
      value: "12",
      numSuffix: "+",
      unit: "Yrs",
      label: "Team Experience",
    },
    {
      value: "34",
      label: "FIELD TEAMS",
    },
    {
      value: "100",
      numSuffix: "*",
      label: "FIELD TEAMS",
    },
    {
      value: "7",
      numSuffix: "+",
      unit: "States",
      label: "Footprints",
    },
    {
      value: "4",
      label: "Business Segments",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative z-20 overflow-hidden select-none"
    >
      {/* Precision Translucent Background Wash (No heavy blur, allows sharp solar panels to show through) */}
      <motion.div
        className="absolute inset-0 bg-[#F8FAF8] pointer-events-none"
        style={{ opacity: bgOpacity }}
      />

      {/* Content Layer with upward glide and opacity emergence */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 will-change-transform"
      >
        {/* Horizontal Metric Strip Layout (No cards, pure typography) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-between">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="min-w-0"
            >
              <AnimatedMetricItem
                value={item.value}
                numSuffix={item.numSuffix}
                unit={item.unit}
                label={item.label}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
