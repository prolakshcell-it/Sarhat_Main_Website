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
            {/* the pill is the heading; the statement below carries the section */}
            <h2 className="sr-only">Who We Are</h2>
            <AnimatedPillBadge className="mb-8">WHO WE ARE</AnimatedPillBadge>
            <p className="mx-auto max-w-4xl font-serif-display text-2xl font-medium leading-snug tracking-tight text-[#0F172A] sm:text-4xl md:text-[2.75rem] md:leading-[1.25]">
              We built around one strength:{" "}
              <span className="italic text-[#6DAD45]">execution.</span> We turn
              clean-energy ambition into projects delivered with engineering
              discipline, ownership and care.{" "}
              <span className="italic text-[#707B00]">
                Discover what makes us different.
              </span>
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          ref={frameRef}
          style={reduce ? { borderRadius: 24 } : { clipPath }}
          className="group relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl"
        >
          <video
            ref={videoRef}
            poster="/images/about-hero-bg-bright.jpg"
            src="/generate_professional_and_attr.mp4"
            controls
            playsInline
            preload="metadata"
            className="h-[340px] w-full object-cover sm:h-[480px] md:h-[600px]"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {!isPlaying && (
            <button
              type="button"
              onClick={() => videoRef.current?.play()}
              aria-label="Play corporate film"
              className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-slate-950/35 transition-colors duration-300 hover:bg-slate-950/20"
            >
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
