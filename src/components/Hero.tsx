"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import ScrollIndicator from "./ScrollIndicator";

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax & Scroll Fade-out Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background slow cinematic zoom, dynamic opacity fade & darkening scrim as user scrolls down
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const bgDim = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.85]);

  // Immediate scroll fade & smooth upward float for Hero Content
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-60px"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentFilter = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", "blur(10px)"]);

  // Ultra-Smooth & Soft Staggered Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.18,
      },
    },
  };

  const itemSoftVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[560px] sm:min-h-[680px] max-h-[1080px] w-full flex flex-col justify-between items-center overflow-hidden bg-slate-950 select-none"
    >
      {/* Cinematic Background Image Layer with Dynamic Zoom & Dynamic Opacity Fade */}
      <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/hero-solar.jpg"
          alt="SARHAT EPC Solar Power Plant"
          fill
          priority
          className="object-cover object-center opacity-90"
        />

        {/* Dynamic Darkening Scrim on Scroll */}
        <motion.div
          style={{ opacity: bgDim }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

        {/* High-Contrast Readability Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 via-50% to-black/90 pointer-events-none"></div>
      </motion.div>

      {/* Main Content Container (Immediate scroll-fade + motion blur + scale float on scroll down) */}
      <motion.div
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-32 sm:pt-36 pb-4 flex flex-col items-center text-center will-change-transform"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center text-center"
        >
          {/* Hero Headline */}
          <motion.h1
            variants={itemSoftVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.1] mb-6 [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)]"
          >
            We build the{" "}
            <span className="italic font-normal text-[#D4E012] relative inline-block drop-shadow-[0_0_35px_rgba(212,224,18,0.8)]">
              systems
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.8 }}
                className="absolute -bottom-1.5 left-0 w-full h-3 text-[#D4E012]"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 15 Q 50 0 100 15"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="transparent"
                />
              </motion.svg>
            </span>
            <br />
            that move India forward.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemSoftVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 font-normal max-w-2xl leading-relaxed mb-9 tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]"
          >
            Renewable energy, storage, substations and infrastructure, brought together by one execution mindset.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div variants={itemSoftVariants} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-[#D4E012] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-[1.04] active:scale-[0.98] shadow-2xl shadow-black/50 group cursor-pointer border border-white/20"
            >
              <span>Explore What We Do</span>
              <ArrowDown className="w-4 h-4 text-slate-950 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Floating Info Bar (Fades out seamlessly on scroll) */}
      <ScrollIndicator targetId="about" opacity={contentOpacity} filter={contentFilter} />
    </section>
  );
}
