"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";

/** 02 — Who We Are, followed by 03 — the corporate film (same treatment as the About page). */
export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // The film opens out of a mask as it scrolls into view, then stays still
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "start 35%"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const clipPath = useTransform(
    inset,
    (v) => `inset(${v}% ${v * 0.8}% round 24px)`,
  );

  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
            <AnimatedPillBadge className="mb-6">WHO WE ARE</AnimatedPillBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6 [text-wrap:balance]">
              We built around one strength:{" "}
              <span className="text-[#6DAD45] italic relative inline-block">
                execution.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none">
                  <path
                    d="M0 15 Q 50 0 100 15"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="transparent" />
                </svg>
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-normal text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed mb-4 [text-wrap:balance]">
              We turn clean-energy ambition into projects delivered with engineering discipline, ownership and care.
            </p>
            <p className="text-sm sm:text-base font-serif-display italic text-[#6DAD45] font-semibold tracking-wide">
              Discover what makes us different.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          ref={frameRef}
          style={reduce ? { borderRadius: 24 } : { clipPath }}
          className="group relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl">
          <video
            ref={videoRef}
            poster="/images/about-hero-bg-bright.jpg"
            src="/videos/about-us.mp4"
            controls
            playsInline
            preload="metadata"
            className="h-[340px] w-full object-cover sm:h-[480px] md:h-[600px]"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)} />

          {!isPlaying && (
            <button
              type="button"
              onClick={() => videoRef.current?.play()}
              aria-label="Play corporate film"
              className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-slate-950/35 transition-colors duration-300 hover:bg-slate-950/20">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white pl-1 text-slate-900 shadow-2xl transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
                <Play className="h-9 w-9 fill-slate-900" />
              </span>
              {/* <span className="mt-5 rounded-full border border-white/20 bg-slate-900/80 px-5 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                Watch Corporate Film
              </span> */}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
