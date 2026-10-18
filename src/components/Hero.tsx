"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import ScrollIndicator from "./ScrollIndicator";

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  // Window scroll tracking for the fixed Hero
  const { scrollY } = useScroll();

  // Background slow cinematic zoom & subtle darkening scrim as user scrolls down
  const bgScale = useTransform(scrollY, [0, 900], [1.02, 1.08]);
  const bgDim = useTransform(scrollY, [0, 800], [0.15, 0.55]);

  // Subtle upward parallax float for Hero Content while keeping it crisp and visible
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const contentScale = useTransform(scrollY, [0, 800], [1, 0.96]);
  const contentOpacity = useTransform(scrollY, [0, 650], [1, 0.65]);

  // Scroll indicator fades out early as soon as the user starts scrolling down
  const indicatorOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  // Ultra-Smooth & Soft Staggered Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemSoftVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className="relative h-full min-h-[560px] sm:min-h-[680px] w-full flex flex-col justify-between items-center overflow-hidden bg-slate-950 select-none"
    >
      {/* Cinematic Background Image Layer with Dynamic Zoom & Scrim */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
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

        {/* High-Contrast Readability Gradient Scrim with Soft Lower Third */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 via-45% to-black/40 pointer-events-none"></div>
      </motion.div>

      {/* Main Content Container (Immediate scroll-fade + motion blur + scale float on scroll down) */}
      <motion.div
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
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
            className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 font-normal max-w-2xl leading-relaxed tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]"
          >
            Renewable energy, storage, substations and infrastructure, brought together by one execution mindset.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Bottom Floating Info Bar (Fades out seamlessly on scroll) */}
      <ScrollIndicator targetId="content" opacity={indicatorOpacity} />
    </section>
  );
}
