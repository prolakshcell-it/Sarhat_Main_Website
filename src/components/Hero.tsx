"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

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

  // Background parallax movement
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  // Immediate scroll fade & upward float for Hero Content as soon as user scrolls down
  const contentY = useTransform(scrollYProgress, [0, 0.45], ["0px", "-80px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const contentFilter = useTransform(scrollYProgress, [0, 0.32], ["blur(0px)", "blur(10px)"]);

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
      className="relative h-screen min-h-[680px] max-h-[1080px] w-full flex flex-col justify-between items-center overflow-hidden bg-slate-950 select-none"
    >
      {/* Parallax Background Image Layer */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <Image
          src="/images/hero-solar.jpg"
          alt="SARHAT EPC Solar Power Plant"
          fill
          priority
          className="object-cover object-center opacity-90"
        />

        {/* Dark Scrim for High-Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 pointer-events-none"></div>

        {/* Dark Feathered Bottom Boundary Gradient Fade */}
        <div className="absolute bottom-0 inset-x-0 h-56 sm:h-80 bg-gradient-to-t from-black via-black/85 via-50% to-transparent pointer-events-none z-10"></div>
      </motion.div>

      {/* Main Content Container (Immediate scroll-fade + motion blur + float on scroll down) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, filter: contentFilter }}
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
        </motion.div>
      </motion.div>

      {/* Bottom Floating Info Bar (Fades out seamlessly on scroll) */}
      <motion.div
        style={{ opacity: contentOpacity, filter: contentFilter }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/20 pt-4 flex flex-col md:flex-row md:items-center justify-center text-center gap-4"
        >
          <a
            href="#about"
            className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-slate-200 hover:text-[#D4E012] transition-colors [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)] font-medium"
          >
            <ChevronDown className="w-4 h-4 text-[#D4E012] animate-bounce" />
            <span>Scroll to discover execution methodology</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
