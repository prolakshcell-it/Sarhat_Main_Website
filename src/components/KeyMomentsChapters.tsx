"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Check, CheckCircle2, MapPin, Sparkles, type LucideIcon } from "lucide-react";

export interface KeyMoment {
  year: string;
  headline: string;
  tag: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  metrics: string[];
  achievements: string[];
  badgeColor: string;
  image: string;
  imageCaption: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
/** Scroll distance (in viewport heights) spent on each chapter after the first. */
const VH_PER_CHAPTER = 0.8;
const STAGE_TOP = "7.5rem"; // clears the fixed navbar

/** Media-query hook that is `false` on the server and first client render, so hydration always matches. */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ------------------------------------------------------------------ */
/* Shared chapter content (existing copy, unchanged)                   */
/* ------------------------------------------------------------------ */

function ChapterText({ moment, reduce }: { moment: KeyMoment; reduce: boolean }) {
  const Icon = moment.icon;
  // Layered but restrained: same tiny 12px rise for every layer, staggered 0 / 100 / 180 / 260ms
  const layer = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <div className="flex flex-col">
      <motion.div {...layer(0.1)} className="mb-4 flex items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-widest ${moment.badgeColor}`}
        >
          {moment.tag}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#6DAD45] shadow-sm">
          <Icon className="h-4 w-4" />
        </span>
      </motion.div>

      <motion.div {...layer(0.18)} className="mb-3">
        <span className="mb-1 block font-mono text-xs font-bold text-slate-600">{moment.subtitle}</span>
        <h3 className="font-serif-display text-2xl font-medium leading-snug text-[#0F172A] sm:text-3xl xl:text-4xl">
          {moment.year} — {moment.headline}
        </h3>
      </motion.div>

      <motion.p {...layer(0.26)} className="mb-5 max-w-xl text-sm leading-relaxed text-slate-600">
        {moment.description}
      </motion.p>

      <motion.div {...layer(0.34)} className="mb-5 flex flex-wrap gap-2">
        {moment.metrics.map((metric) => (
          <span
            key={metric}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-slate-800 shadow-2xs"
          >
            ✓ {metric}
          </span>
        ))}
      </motion.div>

      <motion.div {...layer(0.42)} className="max-w-xl space-y-2 border-t border-slate-200 pt-4">
        {moment.achievements.map((item) => (
          <div key={item} className="flex items-start gap-2 text-xs leading-normal text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6DAD45]" />
            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ChapterImage({
  moment,
  reduce,
  className,
  driftY,
}: {
  moment: KeyMoment;
  reduce: boolean;
  className: string;
  driftY?: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-slate-300/40 ${className}`}>
      {/* masked wipe + settle (1.06 → 1) */}
      <motion.div
        className="absolute inset-0"
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 1.06, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }
        }
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: 1, scale: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
        }
        transition={{ duration: reduce ? 0.25 : 0.8, delay: reduce ? 0 : 0.12, ease: EASE }}
      >
        <motion.div className="absolute -inset-3" style={reduce || !driftY ? undefined : { y: driftY }}>
          <Image
            src={moment.image}
            alt={moment.headline}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3.5 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#D4E012] shadow-md backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-[#5EE72D]" />
          <span>{moment.year} SHOWCASE</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-6">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-[#6DAD45]/50 bg-[#6DAD45]/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#D4E012] backdrop-blur-sm">
            <MapPin className="h-3 w-3" />
            <span>{moment.tag}</span>
          </div>
          <h4 className="font-serif-display text-lg font-medium leading-snug sm:text-xl">{moment.imageCaption}</h4>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress tracker: 2024 ━━ 2025 ━━ 2026 ━━ 2027+                      */
/* ------------------------------------------------------------------ */

function Tracker({
  moments,
  index,
  progress,
  reduce,
  onSelect,
}: {
  moments: KeyMoment[];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
  onSelect: (i: number) => void;
}) {
  const n = moments.length;
  const fill = useTransform(progress, (v) => (n < 2 ? 0 : clamp((v * n - 0.5) / (n - 1), 0, 1)));

  return (
    <nav aria-label="Key moments progress" className="mx-auto w-full max-w-3xl px-6">
      <div className="relative h-14">
        {/* rail + scroll-linked fill (runs node-centre to node-centre) */}
        <div className="absolute left-3.5 right-3.5 top-[13px] h-0.5 rounded-full bg-slate-200">
          <motion.div
            style={{ scaleX: fill }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-[#6DAD45] to-[#D4E012]"
          />
        </div>
        {moments.map((m, i) => {
          const status = i < index ? "done" : i === index ? "active" : "todo";
          const left = n < 2 ? 50 : (i / (n - 1)) * 100;
          return (
            <button
              key={m.year}
              type="button"
              onClick={() => onSelect(i)}
              aria-current={status === "active" ? "step" : undefined}
              aria-label={`${m.year} — ${m.headline}`}
              className="group absolute top-0 flex -translate-x-1/2 cursor-pointer flex-col items-center focus:outline-none"
              style={{ left: `calc(14px + (100% - 28px) * ${left / 100})` }}
            >
              <span className="relative flex h-7 w-7 items-center justify-center">
                {status === "active" && !reduce && (
                  /* the single achievement pulse: expands once, then is gone */
                  <motion.span
                    key={`pulse-${m.year}`}
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-[#6DAD45]"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 2.8, opacity: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                  />
                )}
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#6DAD45] ${
                    status === "done"
                      ? "border-[#6DAD45] bg-[#6DAD45] text-white"
                      : status === "active"
                        ? "border-[#6DAD45] bg-slate-950"
                        : "border-slate-300 bg-white"
                  }`}
                >
                  {status === "done" && (
                    <motion.span
                      key="check"
                      initial={reduce ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </motion.span>
                  )}
                  {status === "active" && <span className="h-2 w-2 rounded-full bg-[#D4E012]" />}
                </span>
              </span>
              <span
                className={`mt-2 font-mono text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                  status === "active" ? "text-slate-900" : status === "done" ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {m.year}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

/* ---------- Desktop: pinned achievement chapters ---------- */
function PinnedChapters({ moments, reduce }: { moments: KeyMoment[]; reduce: boolean }) {
  const n = moments.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const [rawIndex, setIndex] = useState(0);
  const index = clamp(rawIndex, 0, n - 1);
  const moment = moments[index];

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });

  // Re-renders only when the chapter actually changes, never per scroll frame
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(clamp(Math.floor(v * n), 0, n - 1));
  });

  // Very light 3-layer depth: giant year drifts slower than the image
  const yearDrift = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const imageDrift = useTransform(scrollYProgress, [0, 1], [10, -10]);

  const goTo = (i: number) => {
    const el = outerRef.current;
    if (!el || n < 2) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * range, behavior: "smooth" });
  };

  return (
    <div
      ref={outerRef}
      style={{ height: `calc(100vh - ${STAGE_TOP} + ${(n - 1) * VH_PER_CHAPTER * 100}vh)` }}
      className="relative"
    >
      <div
        style={{ top: STAGE_TOP, height: `calc(100vh - ${STAGE_TOP})` }}
        className="sticky flex flex-col justify-between overflow-hidden"
      >
        {/* Layer 1: giant year, low opacity, cropped by the stage */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <motion.div style={reduce ? undefined : { y: yearDrift }} className="absolute inset-x-0 top-[-6%] flex justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={moment.year}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.14, x: 40 }}
                animate={{ opacity: 0.07, scale: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, x: -60 }}
                transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
                className="block whitespace-nowrap font-serif-display text-[clamp(14rem,30vw,32rem)] font-bold leading-none tracking-tight text-slate-900"
              >
                {moment.year}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          {/* one soft light pulse when a chapter becomes active */}
          {!reduce && (
            <motion.div
              key={`bloom-${moment.year}`}
              className="absolute left-1/2 top-[38%] h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,224,18,0.35),transparent_65%)]"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.7, 1.15, 1.3] }}
              transition={{ duration: 1.3, ease: "easeOut" }}
            />
          )}
        </div>

        {/* Layers 2 + 3: image and text */}
        <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-12 items-center gap-8 px-6 xl:gap-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={moment.year}
              className="col-span-12 grid grid-cols-12 items-center gap-8 xl:gap-12"
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -14 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <div className="col-span-5">
                <ChapterText moment={moment} reduce={reduce} />
              </div>
              <div className="col-span-7">
                <ChapterImage moment={moment} reduce={reduce} className="h-[min(52vh,460px)]" driftY={imageDrift} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 pb-2 pt-3">
          <Tracker moments={moments} index={index} progress={scrollYProgress} reduce={reduce} onSelect={goTo} />
        </div>
      </div>
    </div>
  );
}

export default function KeyMomentsChapters({ moments }: { moments: KeyMoment[] }) {
  const pinned = useMedia("(min-width: 1024px) and (min-height: 680px)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");

  if (pinned) return <PinnedChapters moments={moments} reduce={reduce} />;

  /* ---------- Tablet / mobile / short screens: simple vertical journey ---------- */
  if (!pinned) {
    return (
      <div className="relative space-y-16">
        <div aria-hidden className="absolute bottom-0 left-[15px] top-2 w-0.5 rounded-full bg-gradient-to-b from-[#6DAD45]/60 via-[#D4E012]/50 to-transparent" />
        {moments.map((m) => (
          <motion.article
            key={m.year}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
            className="relative pl-12"
          >
            <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#6DAD45] bg-slate-950">
              <span className="h-2 w-2 rounded-full bg-[#D4E012]" />
            </span>
            <p className="mb-3 font-serif-display text-5xl font-medium leading-none text-slate-900/15 sm:text-6xl">{m.year}</p>
            <ChapterImage moment={m} reduce={reduce} className="mb-6 h-56 sm:h-72 md:h-80" />
            <ChapterText moment={m} reduce={reduce} />
          </motion.article>
        ))}
      </div>
    );
  }
}
