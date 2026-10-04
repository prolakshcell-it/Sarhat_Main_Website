"use client";

import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Draw, EASE, SUN, borderBand, useDrawOnView } from "./motifs";

const BAND_W = 1600;
const band = borderBand(BAND_W);

/**
 * 01 — Rooted in India. Existing heading + description; the Indian roots come through a hand-drawn
 * Mithila sun and border band that draw themselves over the landscape, not through stock imagery.
 */
export default function StoryHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Opacity + translate only: the panel below slides over this sticky hero
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const draw = useDrawOnView(ref, { duration: 2.2, delay: 0.3, amount: 0.1 });

  return (
    <div className="sticky top-0 z-0 h-screen w-full">
      <section
        ref={ref}
        className="relative flex h-full w-full select-none flex-col items-center justify-center overflow-hidden bg-[#140E09] text-white"
      >
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
          <Image
            src="/images/about-hero-bg-bright.jpg"
            alt="Our Story — Sarhat Energy"
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* warm earth grade: the land first, the technology second */}
          <div className="absolute inset-0 bg-[#2A1A0E]/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#140E09]/85 via-[#140E09]/45 to-[#140E09]/95" />
        </motion.div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-16 text-center sm:px-6"
        >
          {/* Mithila sun: the first mark on the page */}
          <svg
            viewBox="-50 -50 100 100"
            className="mb-6 h-14 w-14 sm:h-16 sm:w-16"
            aria-hidden
          >
            <g strokeLinecap="round" strokeLinejoin="round">
              <Draw
                progress={draw}
                range={[0, 0.5]}
                d={SUN.rings[0]}
                stroke="#E9C46A"
                strokeWidth={2}
              />
              <Draw
                progress={draw}
                range={[0.1, 0.55]}
                d={SUN.rings[1]}
                stroke="#E9C46A"
                strokeWidth={1.2}
              />
              <Draw
                progress={draw}
                range={[0.3, 0.9]}
                d={SUN.rays}
                stroke="#E07A4F"
                strokeWidth={1.6}
              />
            </g>
          </svg>

          {/* <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mb-6"
          >
            <AnimatedPillBadge darkBg>Our Story</AnimatedPillBadge>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="mb-6 font-serif-display text-4xl font-medium leading-[1.08] tracking-tight drop-shadow-lg sm:text-6xl md:text-7xl"
          >
            Rooted in India. <br />
            <span className="font-normal italic text-[#D4E012]">
              Trusted Globally.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="max-w-3xl text-base leading-relaxed text-slate-200 drop-shadow-md sm:text-xl"
          >
           Sarhat is an execution led energy and infrastructure company rooted in India, with the ambition to earn trust globally. Engineering discipline, hands-on delivery and continuous learning shape our work. Safety, unity and ownership guide every project.
          </motion.p>
        </motion.div>

        {/* Madhubani border band drawn across the ground line */}
        {/* <motion.div
          style={{ opacity: contentOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-20 sm:bottom-24"
          aria-hidden
        >
          <svg
            viewBox={`0 0 ${BAND_W} 32`}
            preserveAspectRatio="xMidYMid slice"
            className="h-5 w-full opacity-60 sm:h-6"
          >
            {band.rules.map((d) => (
              <Draw
                key={d}
                progress={draw}
                range={[0.1, 1]}
                d={d}
                stroke="#E9C46A"
                strokeWidth={1}
              />
            ))}
            <Draw
              progress={draw}
              range={[0.2, 1]}
              d={band.zig}
              stroke="#E07A4F"
              strokeWidth={1.2}
              strokeLinejoin="round"
            />
          </svg>
        </motion.div> */}

        <ScrollIndicator opacity={contentOpacity} />
      </section>
    </div>
  );
}
