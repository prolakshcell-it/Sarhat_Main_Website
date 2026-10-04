"use client";

import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { EASE } from "./motifs";

export interface StoryValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Distance between neighbouring circle centres, as a fraction of the diameter (< 1 → they overlap). */
const SPREAD = 0.84;

/** The centre circle is always in front and filled; side circles stay outlined and brighten on hover. */
function ValueCircle({ value, front }: { value: StoryValue; front: boolean }) {
  const Icon = value.icon;
  return (
    <div
      className={`flex aspect-square w-full flex-col items-center justify-center rounded-full border px-10 text-center transition-colors duration-500 sm:px-12 ${
        front ? "border-white/90 bg-[#18221B]" : "border-white/25 hover:border-white/60"
      }`}
    >
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4E012] text-[#18221B]">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h3 className="mb-4 font-serif-display text-2xl font-normal text-white">{value.title}</h3>
      <p className="max-w-[16rem] text-sm leading-relaxed text-slate-400">{value.description}</p>
    </div>
  );
}

/* ---------- Desktop: circles start stacked and spread apart as the section scrolls in ---------- */
function SpreadingCircles({ values, progress }: { values: StoryValue[]; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const mid = (values.length - 1) / 2;

  const left = useTransform(progress, [0, 1], ["0%", `${-SPREAD * 100}%`]);
  const right = useTransform(progress, [0, 1], ["0%", `${SPREAD * 100}%`]);
  const sideOpacity = useTransform(progress, [0.35, 1], [0, 1]);

  return (
    <div className="relative mx-auto aspect-square w-[min(25rem,31vw)]">
      {values.map((v, i) => {
        const side = i < mid ? left : i > mid ? right : null;
        return (
          <motion.div
            key={v.title}
            className="absolute inset-0"
            style={{
              x: reduce || !side ? (side ? `${Math.sign(i - mid) * SPREAD * 100}%` : 0) : side,
              opacity: reduce || !side ? 1 : sideOpacity,
              zIndex: side ? 0 : 10,
            }}
          >
            <ValueCircle value={v} front={!side} />
          </motion.div>
        );
      })}
    </div>
  );
}

/** 04 — Our Values: overlapping value circles, with the focused value drawn in front. */
export default function StoryValues({ values }: { values: StoryValue[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center 55%"] });

  return (
    <section className="relative overflow-hidden bg-[#18221B] py-16 text-white sm:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
            <AnimatedPillBadge darkBg className="mb-6">Our Values</AnimatedPillBadge>
            <h2 className="font-serif-display text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
              Engineering Excellence for the <br className="hidden sm:block" />
              Net-Zero Era
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              Our foundational execution principles driving engineering quality, site safety, and sustainable impact across India.
            </p>
          </div>
        </ScrollReveal>

        <div ref={ref} className="hidden lg:block">
          <SpreadingCircles values={values} progress={scrollYProgress} />
        </div>

        {/* Mobile / tablet: the same circles, overlapping vertically */}
        <div className="mx-auto flex w-full max-w-[20rem] flex-col items-center sm:max-w-[22rem] lg:hidden">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE }}
              className={`relative w-full ${i > 0 ? "-mt-12" : ""}`}
              style={{ zIndex: i === 1 ? 10 : 0 }}
            >
              <ValueCircle value={v} front={i === 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
