"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

interface CultureCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const cultureCards: CultureCard[] = [
  {
    id: "purpose",
    title: "Purpose With Impact:",
    description:
      "Empowered teams building renewable energy infrastructure with ownership, integrity, and shared vision. Your contributions directly shape India's clean energy transition.",
    image: "/images/hero-solar.jpg",
    tag: "PURPOSE",
  },
  {
    id: "scale",
    title: "Scale That Matters:",
    description:
      "Our large-scale renewable portfolio across India delivers measurable CO₂ reduction at industrial scale. Your work translates into MW, GWh, and tonnes of emissions avoided — impact you can see, count, and celebrate.",
    image: "/images/about-hero-bg-bright.jpg",
    tag: "SCALE",
  },
  {
    id: "sustainable",
    title: "Sustainable by Design:",
    description:
      "We invest in communities through green infrastructure, climate-resilient projects, and training programs. Your contributions strengthen ecosystems and support inclusive, sustainable growth.",
    image: "/images/partner-hero-bg.jpg",
    tag: "SUSTAINABILITY",
  },
];

export default function InspiringCultureSection() {
  const [activeCardId, setActiveCardId] = useState<string>("scale");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto rotation every 4 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveCardId((prev) => {
        const currentIndex = cultureCards.findIndex((c) => c.id === prev);
        const nextIndex = (currentIndex + 1) % cultureCards.length;
        return cultureCards[nextIndex].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-[#FAFBF9] border-b border-slate-200/80 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Split Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <AnimatedPillBadge className="mb-4">
              Our Culture & Values
            </AnimatedPillBadge>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-medium text-[#112217] tracking-tight leading-[1.1]">
              A Culture That Inspires. <br />
              <span className="text-[#707B00] italic font-normal">A Team That Empowers.</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              A workplace where sustainability is not just a business model, it&apos;s a responsibility we live every day!
            </p>
          </div>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 min-h-[480px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {cultureCards.map((card) => {
            const isActive = activeCardId === card.id;

            return (
              <motion.div
                key={card.id}
                onClick={() => setActiveCardId(card.id)}
                onMouseEnter={() => setActiveCardId(card.id)}
                layout
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-between min-h-[440px] sm:min-h-[480px] shadow-lg ${
                  isActive
                    ? "bg-[#102016] text-white border-2 border-[#D4E012] shadow-2xl shadow-[#102016]/40 scale-[1.02] z-20"
                    : "bg-slate-900 border border-slate-200/60 hover:border-[#D4E012]/60 z-10"
                }`}
              >
                {isActive ? (
                  /* Active Expanded Dark Green Content Card */
                  <div className="p-8 sm:p-10 flex flex-col justify-between h-full relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4E012] shadow-[0_0_10px_#D4E012]" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4E012]">
                          {card.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white leading-snug">
                        {card.title}
                      </h3>

                      <p className="text-sm text-slate-300 font-normal leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#D4E012] font-mono font-medium">
                      <span>SARHAT CULTURE</span>
                      <span>0{cultureCards.findIndex((c) => c.id === card.id) + 1} / 03</span>
                    </div>
                  </div>
                ) : (
                  /* Inactive Image Card with Bottom Text Overlay */
                  <>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center filter brightness-90 contrast-105 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                    <div className="relative z-10 p-6 sm:p-8 mt-auto">
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white drop-shadow-md">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-normal mt-1 opacity-80">
                        Click or hover to explore
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
