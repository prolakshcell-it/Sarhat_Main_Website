"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Compass, ShieldCheck, Play, Activity } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  // Ultra-Smooth & Soft Staggered Left-Slide Animation Variants
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

  // Soft, floating slide out from left (-50px -> 0px) with motion blur
  const itemSoftLeftVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1], // Ultra-soft luxury easing curve
      },
    },
  };

  return (
    <section className="relative h-screen min-h-[680px] max-h-[1080px] w-full flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-solar.jpg"
          suppressHydrationWarning
          className="w-full h-full object-cover opacity-100 scale-105 transition-opacity duration-1000 pointer-events-none"
        >
          <source src="/generate_in_k_hd.mp4" type="video/mp4" />
          {/* Fallback image */}
          <Image
            src="/images/hero-solar.jpg"
            alt="SARHAT EPC Solar Power Plant"
            fill
            priority
            className="object-cover object-center opacity-100"
          />
        </video>

        {/* Minimal Light Vignette for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Container (Centered in Viewport) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-32 sm:pt-36 pb-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Hero Headline - Soft left blur slide */}
          <motion.h1
            variants={itemSoftLeftVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[2.5rem] font-serif-display font-medium tracking-tight text-white leading-[1.1] mb-5 [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)]"
          >
            We build the{" "}
            <span className="italic font-normal text-[#5EE72D] relative inline-block drop-shadow-[0_0_30px_rgba(94,231,45,0.7)]">
              systems
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.8 }}
                className="absolute -bottom-1.5 left-0 w-full h-3 text-[#5EE72D]"
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
            </span>{" "}
            that move India forward.
          </motion.h1>

          {/* Subheading - Soft left blur slide */}
          <motion.p
            variants={itemSoftLeftVariants}
            className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal max-w-xl leading-relaxed mb-8 tracking-wide drop-shadow-md"
          >
            Renewable energy, storage, substations and infrastructure, brought together by one execution mindset.
          </motion.p>

          {/* Animated CTA Buttons - Soft left blur slide */}
          <motion.div variants={itemSoftLeftVariants} className="flex flex-wrap items-center gap-4 sm:gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenQuote}
              className="bg-[#5EE72D] hover:bg-[#4ed423] text-black font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-[#5EE72D]/25 hover:shadow-[#5EE72D]/40 flex items-center gap-2.5 group relative overflow-hidden"
            >
              <span className="relative z-10">EXPLORE OUR SOLUTIONS</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#footprint"
              className="glass-panel hover:bg-white/15 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 border border-white/20 flex items-center gap-2 shadow-2xl backdrop-blur-md"
            >
              <span>SEE OUR FOOTPRINT</span>
              <Compass className="w-4 h-4 text-zinc-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Floating Info Bar - Soft Left Blur Slide */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6">
        <motion.div
          initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/15 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <a
            href="#about"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-[#5EE72D] transition-colors [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)] font-medium"
          >
            <ChevronDown className="w-4 h-4 text-[#5EE72D] animate-bounce" />
            <span>Scroll to discover execution methodology</span>
          </a>

          {/* Floating Pill Feature Card */}
          <div className="glass-panel px-4 sm:px-5 py-2.5 rounded-2xl border border-white/20 flex items-center gap-3 max-w-sm shadow-2xl backdrop-blur-xl">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#5EE72D]/20 border border-[#5EE72D]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#5EE72D]" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold text-[#5EE72D] tracking-wider uppercase font-sans-ui flex items-center gap-1.5">
                <Play className="w-3 h-3 fill-current text-[#5EE72D]" /> ENERGY + INFRASTRUCTURE
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-300 font-light">
                Designed. Built. Operated.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



