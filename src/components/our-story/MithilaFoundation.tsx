"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { EASE, borderBand } from "./motifs";
import mithilaConceptImg from "@/../public/images/mithila-concept-illustration.jpg";

const BAND_W = 1600;
const wideBand = borderBand(BAND_W);

export interface Pillar {
  title: string;
  description: string;
}

/**
 * 04 — Rooted in Mithila. Building for tomorrow.
 * Displays the Madhubani artwork tapestry and the 3 circular emblems:
 * Mithila Roots → Realistic India → Global Ambition.
 */
export default function MithilaFoundation({ pillars }: { pillars?: Pillar[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF6EF] py-16 sm:py-24">
      {/* Top decorative Madhubani border rule */}
      <svg
        viewBox="0 0 1600 32"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 top-0 h-6 w-full opacity-25"
        aria-hidden>
        {wideBand.rules.map((d) => (
          <path key={d} d={d} fill="none" stroke="#2B2118" strokeWidth={1} />
        ))}
        <path d={wideBand.zig} fill="none" stroke="#C85A32" strokeWidth={1.2} />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <AnimatedPillBadge className="mb-4">WHAT GUIDES US</AnimatedPillBadge>
          <h2 className="mb-4 font-serif-display text-3xl font-medium leading-tight tracking-tight text-[#1E1812] sm:text-4xl md:text-5xl [text-wrap:balance]">
            Rooted in Mithila.{" "}
            <span className="italic text-[#707B00] relative inline-block">
              Building for tomorrow.
              <svg
                className="absolute -bottom-2 left-0 w-full h-2.5 text-[#707B00]"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true">
                <path
                  d="M0 15 Q 50 0 100 15"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="transparent" />
              </svg>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#5B5146] sm:text-lg">
            Our roots in Mithila, Bihar, inspire this depiction of what we build.
          </p>
        </motion.div>

        {/* 1. Madhubani Artwork Tapestry Container */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative mx-auto mb-16 max-w-5xl overflow-hidden rounded-2xl border-2 border-[#D4C3A3]/70 bg-[#FAF6EF] p-2 sm:p-3 shadow-[0_20px_50px_-20px_rgba(43,33,24,0.25)]">
          <div className="relative aspect-[1024/580] w-full overflow-hidden rounded-xl border border-[#2B2118]/15 bg-[#F7F2EA]">
            <Image
              src={mithilaConceptImg}
              alt="Rooted in Mithila. Building for tomorrow. Madhubani art depicting solar, battery storage, civil infrastructure and hybrid energy."
              fill
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-contain object-center"
              priority
              unoptimized
            />
          </div>
        </motion.div>

        {/* 2. Three Circular Emblems Connected by Vines (Mithila Roots -> Realistic India -> Global) */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative mx-auto max-w-5xl rounded-3xl border border-[#2B2118]/10 bg-white/70 p-6 sm:p-10 shadow-sm backdrop-blur-sm">
          
          {/* Note badge at top right */}
          <div className="mb-6 flex justify-end">
            <span className="inline-flex items-center rounded-full border border-[#2B2118]/15 bg-[#FAF6EF] px-3.5 py-1 text-[11px] font-medium text-[#7A6A58] shadow-sm">
              From Mithila roots to India drawn in Madhubani style
            </span>
          </div>

          {/* Desktop & Tablet SVG Flow */}
          <div className="relative w-full overflow-x-auto pb-4">
            <svg
              viewBox="0 0 1000 240"
              className="mx-auto min-w-[760px] w-full max-w-[960px] select-none"
              fill="none"
              role="img"
              aria-label="Journey from Mithila Roots to India and Global Ambition">
              
              {/* Vine 1: Connecting Mithila Roots (x=160) to India (x=500) */}
              <g strokeLinecap="round">
                {/* Main curved vine */}
                <path
                  d="M 230 110 Q 365 170 430 110"
                  stroke="#4E7238"
                  strokeWidth="2.5"
                  fill="none"
                />
                {/* Secondary decorative double line in terracotta */}
                <path
                  d="M 232 114 Q 365 174 428 114"
                  stroke="#C85A32"
                  strokeWidth="1.2"
                  strokeDasharray="2 6"
                  fill="none"
                  opacity="0.8"
                />
                {/* Hanging leafy fronds along vine 1 */}
                {[
                  { cx: 270, cy: 122, angle: 25 },
                  { cx: 305, cy: 135, angle: 15 },
                  { cx: 340, cy: 142, angle: 0 },
                  { cx: 375, cy: 140, angle: -15 },
                  { cx: 405, cy: 128, angle: -25 },
                ].map((leaf, idx) => (
                  <g key={`v1-leaf-${idx}`} transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.angle})`}>
                    <path
                      d="M 0 0 C -4 8 -2 16 0 20 C 2 16 4 8 0 0 Z"
                      fill="#6DAD45"
                      fillOpacity="0.85"
                      stroke="#4E7238"
                      strokeWidth="1"
                    />
                    <line x1="0" y1="0" x2="0" y2="16" stroke="#4E7238" strokeWidth="0.8" />
                  </g>
                ))}
              </g>

              {/* Vine 2: Connecting India (x=500) to Global (x=840) */}
              <g strokeLinecap="round">
                <path
                  d="M 570 110 Q 705 170 770 110"
                  stroke="#4E7238"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M 572 114 Q 705 174 768 114"
                  stroke="#C85A32"
                  strokeWidth="1.2"
                  strokeDasharray="2 6"
                  fill="none"
                  opacity="0.8"
                />
                {/* Hanging leafy fronds along vine 2 */}
                {[
                  { cx: 610, cy: 122, angle: 25 },
                  { cx: 645, cy: 135, angle: 15 },
                  { cx: 680, cy: 142, angle: 0 },
                  { cx: 715, cy: 140, angle: -15 },
                  { cx: 745, cy: 128, angle: -25 },
                ].map((leaf, idx) => (
                  <g key={`v2-leaf-${idx}`} transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.angle})`}>
                    <path
                      d="M 0 0 C -4 8 -2 16 0 20 C 2 16 4 8 0 0 Z"
                      fill="#6DAD45"
                      fillOpacity="0.85"
                      stroke="#4E7238"
                      strokeWidth="1"
                    />
                    <line x1="0" y1="0" x2="0" y2="16" stroke="#4E7238" strokeWidth="0.8" />
                  </g>
                ))}
              </g>

              {/* ========================================================= */}
              {/* EMBLEM 1: MITHILA ROOTS (Origin)                          */}
              {/* User note: "In the mithila roots image trto avoid overlapping rest is ok" */}
              {/* ========================================================= */}
              <g transform="translate(160, 110)">
                {/* Outer ring with notches */}
                <circle cx="0" cy="0" r="66" fill="#FAF6EF" stroke="#C85A32" strokeWidth="2" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="#E9A844" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="54" fill="#FAF6EF" stroke="#2B2118" strokeWidth="1.2" />

                {/* Clean non-overlapping Madhubani Sun & Lotus center */}
                {/* Sun ring with 16 neat rays */}
                <circle cx="0" cy="0" r="34" fill="#F4ECE1" stroke="#C85A32" strokeWidth="1.5" />
                {[...Array(16)].map((_, i) => {
                  const deg = (i * 360) / 16;
                  const rad = (deg * Math.PI) / 180;
                  const x1 = Math.cos(rad) * 36;
                  const y1 = Math.sin(rad) * 36;
                  const x2 = Math.cos(rad) * 44;
                  const y2 = Math.sin(rad) * 44;
                  return (
                    <line
                      key={`ray-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#E9A844"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Inner central solar circle */}
                <circle cx="0" cy="0" r="20" fill="#E9C46A" fillOpacity="0.25" stroke="#C85A32" strokeWidth="1.8" />
                <circle cx="0" cy="0" r="10" fill="#E9A844" fillOpacity="0.4" stroke="#2B2118" strokeWidth="1" />
                <circle cx="0" cy="0" r="3" fill="#C85A32" />

                {/* Lotus base petals below central circle - clean & balanced */}
                <path
                  d="M -16 6 C -12 18 12 18 16 6 C 10 14 -10 14 -16 6 Z"
                  fill="#C85A32"
                  fillOpacity="0.75"
                  stroke="#2B2118"
                  strokeWidth="1"
                />
              </g>

              {/* Label for Emblem 1 */}
              <text x="160" y="200" textAnchor="middle" className="fill-[#2B2118] font-mono text-[12px] font-bold uppercase tracking-[0.2em]">
                MITHILA ROOTS
              </text>
              <text x="160" y="218" textAnchor="middle" className="fill-[#7A6A58] text-[11px] font-medium">
                Origin
              </text>

              {/* ========================================================= */}
              {/* EMBLEM 2: INDIA (Rooted in India)                         */}
              {/* User note: "Make india's map as much as realistic"        */}
              {/* ========================================================= */}
              <g transform="translate(500, 110)">
                {/* Outer ring */}
                <circle cx="0" cy="0" r="66" fill="#FAF6EF" stroke="#C85A32" strokeWidth="2" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="#E9A844" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="54" fill="#FAF6EF" stroke="#2B2118" strokeWidth="1.2" />

                {/* Clipped circular viewport for the realistic India map */}
                <clipPath id="india-circle-clip">
                  <circle cx="0" cy="0" r="51" />
                </clipPath>

                <g clipPath="url(#india-circle-clip)">
                  <circle cx="0" cy="0" r="51" fill="#FAF6EF" />
                  
                  {/* Embedded Authentic Realistic India Map SVG from @svg-maps/india */}
                  {/* Scaled and centered to fit within r=51 circle */}
                  <g transform="translate(-40, -46) scale(0.132)">
                    <image
                      href="/images/realistic-india-map.svg"
                      width="612"
                      height="696"
                    />
                  </g>
                </g>
              </g>

              {/* Label for Emblem 2 */}
              <text x="500" y="200" textAnchor="middle" className="fill-[#2B2118] font-mono text-[12px] font-bold uppercase tracking-[0.2em]">
                INDIA
              </text>
              <text x="500" y="218" textAnchor="middle" className="fill-[#7A6A58] text-[11px] font-medium">
                Rooted in India
              </text>

              {/* ========================================================= */}
              {/* EMBLEM 3: GLOBAL (Global Ambition)                        */}
              {/* ========================================================= */}
              <g transform="translate(840, 110)">
                {/* Outer ring */}
                <circle cx="0" cy="0" r="66" fill="#FAF6EF" stroke="#4E7238" strokeWidth="2" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="#6DAD45" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="54" fill="#FAF6EF" stroke="#2B2118" strokeWidth="1.2" />

                {/* Globe sphere */}
                <circle cx="0" cy="0" r="48" fill="#F4ECE1" stroke="#4E7238" strokeWidth="1.5" />
                
                {/* Latitude lines */}
                <ellipse cx="0" cy="0" rx="46" ry="14" fill="none" stroke="#6DAD45" strokeOpacity="0.4" strokeWidth="1" />
                <ellipse cx="0" cy="-18" rx="40" ry="10" fill="none" stroke="#6DAD45" strokeOpacity="0.3" strokeWidth="0.8" />
                <ellipse cx="0" cy="18" rx="40" ry="10" fill="none" stroke="#6DAD45" strokeOpacity="0.3" strokeWidth="0.8" />

                {/* Longitude lines */}
                <ellipse cx="0" cy="0" rx="16" ry="46" fill="none" stroke="#6DAD45" strokeOpacity="0.4" strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="32" ry="46" fill="none" stroke="#6DAD45" strokeOpacity="0.3" strokeWidth="0.8" />
                
                {/* Connected network mesh nodes on globe */}
                <line x1="-24" y1="-14" x2="-6" y2="4" stroke="#4E7238" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="-6" y1="4" x2="22" y2="-10" stroke="#4E7238" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="-6" y1="4" x2="14" y2="18" stroke="#4E7238" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="22" y1="-10" x2="30" y2="10" stroke="#4E7238" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="14" y1="18" x2="30" y2="10" stroke="#4E7238" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="-24" y1="-14" x2="-10" y2="-28" stroke="#4E7238" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="-10" y1="-28" x2="16" y2="-24" stroke="#4E7238" strokeWidth="1" strokeOpacity="0.6" />

                {/* Nodes */}
                {[
                  { cx: -24, cy: -14, r: 3.5, color: "#6DAD45" },
                  { cx: -6, cy: 4, r: 4, color: "#D4E012" },
                  { cx: 22, cy: -10, r: 3.5, color: "#E9C46A" },
                  { cx: 14, cy: 18, r: 3.5, color: "#6DAD45" },
                  { cx: 30, cy: 10, r: 3, color: "#D4E012" },
                  { cx: -10, cy: -28, r: 3, color: "#E07A4F" },
                  { cx: 16, cy: -24, r: 3.5, color: "#6DAD45" },
                ].map((node, i) => (
                  <circle
                    key={`globe-node-${i}`}
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill={node.color}
                    stroke="#2B2118"
                    strokeWidth="1"
                  />
                ))}
              </g>

              {/* Label for Emblem 3 */}
              <text x="840" y="200" textAnchor="middle" className="fill-[#2B2118] font-mono text-[12px] font-bold uppercase tracking-[0.2em]">
                GLOBAL
              </text>
              <text x="840" y="218" textAnchor="middle" className="fill-[#7A6A58] text-[11px] font-medium">
                Global Ambition
              </text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
