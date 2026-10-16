"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const LIME = "#D4E012";
export const GREEN = "#6DAD45";
export const INK = "#0F172A";

interface PhotoCardProps {
  imageSrc: string;
  alt: string;
  tags: string[];
  statusText: string;
  statusBadge: string;
  badgeTone?: "green" | "lime";
  Icon: LucideIcon;
}

function PhotoStageCard({
  imageSrc,
  alt,
  tags,
  statusText,
  statusBadge,
  badgeTone = "green",
  Icon,
}: PhotoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = !!useReducedMotion();
  const on = inView || reduce;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={on ? { opacity: 1, y: 0 } : {}}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-950 shadow-2xl shadow-slate-950/30 transition-all duration-500 hover:border-[#6DAD45]/70 hover:shadow-[0_20px_50px_rgba(109,173,69,0.15)]"
    >
      {/* Real High-Resolution Industrial Photography */}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={90}
        className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Atmospheric Overlays for Contrast and Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(109,173,69,0.22),transparent_65%)] pointer-events-none" />

      {/* Top Floating Glassmorphic Tags */}
      <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 right-3.5 sm:right-4 flex flex-wrap gap-2 z-10 pointer-events-none">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: -6 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={reduce ? { duration: 0 } : { duration: 0.35, delay: 0.15 + i * 0.1 }}
            className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-mono font-medium text-slate-100 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4E012] mr-1.5" />
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Bottom Telemetry & Status Bar */}
      <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.35 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-xs font-medium text-white shadow-lg max-w-[70%]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4E012] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6DAD45]" />
          </span>
          <span className="truncate text-slate-200">{statusText}</span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={on ? { opacity: 1, scale: 1 } : {}}
          transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.45 }}
          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-mono font-semibold shadow-md ${
            badgeTone === "lime"
              ? "bg-[#D4E012]/15 border-[#D4E012]/40 text-[#D4E012]"
              : "bg-[#6DAD45]/20 border-[#6DAD45]/45 text-[#D4E012]"
          }`}
        >
          <Icon className="h-3.5 w-3.5 text-[#D4E012]" />
          <span>{statusBadge}</span>
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ---------- 01 / Site Survey, Soil Testing & Grid Point ---------- */
export function SiteScene() {
  return (
    <PhotoStageCard
      imageSrc="/images/stage-01-site-survey.jpg"
      alt="Sarhat solar engineers conducting site survey and boundary mapping with total station"
      tags={["Boundary walked", "Soil tested", "Grid point found"]}
      statusText="Verified site report & topographic map"
      statusBadge="STAGE 01"
      Icon={MapPin}
    />
  );
}

/* ---------- 02 / Plant Design, 3D Layout & Grid Sizing ---------- */
export function DesignScene() {
  return (
    <PhotoStageCard
      imageSrc="/images/stage-02-plant-design.jpg"
      alt="Solar plant electrical layout and structural engineering design team"
      tags={["Layout fits the plot", "Electrical + structure together", "Maintenance paths clear"]}
      statusText="3D CAD & electrical SLD sync"
      statusBadge="STAGE 02"
      Icon={Sparkles}
    />
  );
}

/* ---------- 03 / Approvals, Scheme Norms & DISCOM Clearances ---------- */
export function ApprovalScene() {
  return (
    <PhotoStageCard
      imageSrc="/images/stage-03-grid-approvals.jpg"
      alt="Substation engineers and DISCOM statutory clearance inspection"
      tags={["Scheme norms", "DISCOM requirements", "Statutory inspection"]}
      statusText="Inspection-ready documentation"
      statusBadge="CLEARED"
      badgeTone="lime"
      Icon={CheckCircle2}
    />
  );
}

/* ---------- 04 / Construction, On-site Support & Energisation ---------- */
export function BuildScene() {
  return (
    <PhotoStageCard
      imageSrc="/images/stage-04-plant-build.jpg"
      alt="Solar plant on-site construction commissioning and energisation"
      tags={["Built to the drawings", "Field changes solved", "Energised, as-built recorded"]}
      statusText="Grid synchronised & live plant records"
      statusBadge="ENERGISED"
      badgeTone="lime"
      Icon={Zap}
    />
  );
}

export const stageScenes = [SiteScene, DesignScene, ApprovalScene, BuildScene];
