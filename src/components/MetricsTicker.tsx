"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Zap, MapPin, Calendar, Users, Cpu, ShieldCheck } from "lucide-react";

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
    <div ref={ref} className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-1.5 group-hover:text-[#707B00] transition-colors">
      {prefix}{displayNum}{suffix}
    </div>
  );
}

export default function MetricsTicker() {
  const metrics = [
    {
      value: "47.77 MW",
      label: "SERVED TO BUILD",
      subText: "Utility & C&I Solar Capacity",
      icon: Zap,
    },
    {
      value: "7+",
      label: "PORTFOLIO STATES",
      subText: "Pan-India Execution Footprint",
      icon: MapPin,
    },
    {
      value: "2024",
      label: "FOUNDATION YEAR",
      subText: "Founded by Industry Engineers",
      icon: Calendar,
    },
    {
      value: "35+",
      label: "ENGINEERING TEAM",
      subText: "Expert team members across India",
      icon: Users,
    },
    {
      value: "765 kV",
      label: "SUBSTATION CAPABILITY",
      subText: "Max. voltage class handled",
      icon: Cpu,
    },
    {
      value: "25-Yr",
      label: "PERFORMANCE WARRANTY",
      subText: "Long-term O&M & asset quality",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-[#FAFBF9] border-b border-slate-200/80 relative z-20 overflow-hidden font-sans-ui">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* 1-Line Card Grid Layout (Single horizontal line) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
          {metrics.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#707B00] shadow-sm hover:shadow-xl hover:shadow-[#D4E012]/15 relative group transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header Tag & Sleek Icon Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#707B00] uppercase truncate">
                    {item.label}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#D4E012]/20 border border-[#D4E012]/40 text-[#707B00] flex items-center justify-center shrink-0 group-hover:bg-[#D4E012] group-hover:text-slate-950 transition-colors">
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                </div>

                {/* Main Metric Value */}
                <AnimatedMetricValue value={item.value} />

                {/* Subtitle Description */}
                <div className="text-[11px] text-slate-500 font-normal leading-tight line-clamp-2">
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
