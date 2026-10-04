"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";

export interface KeyMoment {
  year: string;
  headline: string;
  tag: string;
  subtitle: string;
  description: string;
  metrics: string[];
  achievements: string[];
  image: string;
  imageCaption: string;
  /** Where this moment sits in the journey, e.g. "Foundation" or "What comes next". */
  stage?: string;
}

/** Scroll distance (in viewport heights) spent on each chapter after the first. */
const VH_PER_CHAPTER = 0.75;
const STAGE_TOP = "7.5rem"; // clears the fixed navbar
const EASE_CSS = "ease-[cubic-bezier(0.22,1,0.36,1)]";

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
const pad = (i: number) => String(i + 1).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Shared pieces                                                        */
/* ------------------------------------------------------------------ */

function Metrics({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {items.map((m) => (
        <li key={m} className="flex items-center gap-2 text-sm font-medium text-slate-800">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#6DAD45]" />
          {m}
        </li>
      ))}
    </ul>
  );
}

function Achievements({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 border-t border-slate-200 pt-5">
      {items.map((a) => (
        <li key={a} className="grid grid-cols-[1rem_1fr] gap-3 text-sm leading-relaxed text-slate-600">
          <span aria-hidden className="mt-[0.6rem] h-px w-full bg-[#707B00]" />
          {a}
        </li>
      ))}
    </ul>
  );
}

function Caption({ moment }: { moment: KeyMoment }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-5 pt-16 text-white sm:p-6 sm:pt-20">
      <span className="mb-2 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#D4E012] backdrop-blur-sm">
        {moment.tag}
      </span>
      <p className="font-serif-display text-lg leading-snug sm:text-xl">{moment.imageCaption}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned stage — rail · chapter text · image                  */
/* ------------------------------------------------------------------ */

function Rail({
  moments,
  index,
  progress,
  onSelect,
}: {
  moments: KeyMoment[];
  index: number;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const n = moments.length;
  // fills node-centre to node-centre, driven straight from scroll (no re-renders)
  const fill = useTransform(progress, (v) => (n < 2 ? 1 : clamp((v * n - 0.5) / (n - 1), 0, 1)));

  return (
    <nav aria-label="Key moments" className="relative">
      <div aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-slate-200">
        <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-gradient-to-b from-[#6DAD45] to-[#D4E012]" />
      </div>
      <ol className="space-y-1">
        {moments.map((m, i) => {
          const state = i < index ? "done" : i === index ? "active" : "todo";
          return (
            <li key={m.year}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={state === "active" ? "step" : undefined}
                className="group flex w-full cursor-pointer items-center gap-4 rounded-xl py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6DAD45]"
              >
                <span
                  className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                    state === "active"
                      ? "border-[#6DAD45] bg-slate-950"
                      : state === "done"
                        ? "border-[#6DAD45] bg-[#6DAD45]"
                        : "border-slate-300 bg-[#F8FAF8] group-hover:border-[#6DAD45]"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full transition-transform duration-500 ${state === "active" ? "scale-100 bg-[#D4E012]" : "scale-0"}`}
                  />
                </span>
                <span>
                  <span
                    className={`block font-serif-display text-2xl leading-none transition-colors duration-500 ${
                      state === "active" ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {m.year}
                  </span>
                  {m.stage && (
                    <span
                      className={`mt-1.5 block whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${
                        state === "active" ? "text-[#707B00]" : "text-slate-400"
                      }`}
                    >
                      {m.stage}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function PinnedChapters({ moments, reduce }: { moments: KeyMoment[]; reduce: boolean }) {
  const n = moments.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  // React bails out when the value is unchanged, so this only re-renders on a chapter change
  useMotionValueEvent(scrollYProgress, "change", (v) => setIndex(clamp(Math.floor(v * n), 0, n - 1)));

  const goTo = (i: number) => {
    const el = outerRef.current;
    if (!el || n < 2) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * range, behavior: reduce ? "auto" : "smooth" });
  };

  const fade = reduce ? "transition-opacity duration-200" : `transition-[opacity,transform] duration-700 ${EASE_CSS}`;

  return (
    <div ref={outerRef} style={{ height: `calc(100vh - ${STAGE_TOP} + ${(n - 1) * VH_PER_CHAPTER * 100}vh)` }} className="relative">
      <div style={{ top: STAGE_TOP, height: `calc(100vh - ${STAGE_TOP})` }} className="sticky flex items-center">
        <div className="grid w-full grid-cols-12 items-center gap-10 xl:gap-14">
          {/* Rail */}
          <div className="col-span-2">
            <p className="mb-6 font-mono text-[11px] font-bold tracking-[0.2em] text-slate-400">
              <span className="text-slate-900">{pad(index)}</span> / {pad(n - 1)}
            </p>
            <Rail moments={moments} index={index} progress={scrollYProgress} onSelect={goTo} />
          </div>

          {/* Chapter text: all chapters stay mounted and cross-fade (no remounts, no blank frames) */}
          <div className="relative col-span-5 grid">
            {moments.map((m, i) => {
              const active = i === index;
              const layer = (d: number) => ({
                className: `${fade} ${active ? "translate-y-0 opacity-100" : reduce ? "opacity-0" : "translate-y-3 opacity-0"}`,
                style: { transitionDelay: active && !reduce ? `${d}ms` : "0ms" },
              });
              return (
                <article
                  key={m.year}
                  aria-hidden={!active}
                  inert={!active}
                  className={`col-start-1 row-start-1 ${active ? "" : "pointer-events-none"}`}
                >
                  <div {...layer(0)}>
                    <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#707B00]">
                      {m.stage ? `${m.stage} · ` : ""}
                      {m.subtitle}
                    </p>
                  </div>
                  <div {...layer(80)}>
                    <h3 className="mb-5 font-serif-display text-3xl font-medium leading-[1.15] tracking-tight text-slate-900 xl:text-[2.6rem]">
                      <span className="text-[#6DAD45]">{m.year}</span> — {m.headline}
                    </h3>
                  </div>
                  <div {...layer(160)}>
                    <p className="mb-6 text-base leading-relaxed text-slate-600">{m.description}</p>
                  </div>
                  <div {...layer(240)}>
                    <div className="mb-6">
                      <Metrics items={m.metrics} />
                    </div>
                  </div>
                  <div {...layer(320)}>
                    <Achievements items={m.achievements} />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Image: the new chapter wipes up over the previous one */}
          <div className="relative col-span-5 h-[min(62vh,540px)] overflow-hidden rounded-3xl bg-slate-200 shadow-2xl shadow-slate-400/30">
            {moments.map((m, i) => {
              const active = i === index;
              return (
                <div
                  key={m.year}
                  aria-hidden={!active}
                  className={`absolute inset-0 ${
                    reduce
                      ? `transition-opacity duration-300 ${active ? "z-10 opacity-100" : "opacity-0"}`
                      : `transition-[clip-path] duration-[900ms] ${EASE_CSS} ${
                          active ? "z-10 [clip-path:inset(0_0_0_0)]" : "z-0 [clip-path:inset(100%_0_0_0)] delay-[900ms]"
                        }`
                  }`}
                >
                  <div
                    className={`absolute inset-0 ${reduce ? "" : `transition-transform duration-[1400ms] ${EASE_CSS}`} ${
                      active || reduce ? "scale-100" : "scale-[1.08]"
                    }`}
                  >
                    <Image src={m.image} alt={m.headline} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
                  </div>
                  <Caption moment={m} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tablet / mobile / short screens: a vertical journey                  */
/* ------------------------------------------------------------------ */

function JourneyList({ moments, reduce }: { moments: KeyMoment[]; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[11px] top-2 w-px bg-slate-200">
        <motion.div style={reduce ? undefined : { scaleY: scrollYProgress }} className="h-full w-full origin-top bg-gradient-to-b from-[#6DAD45] to-[#D4E012]" />
      </div>

      <ol className="space-y-14 sm:space-y-20">
        {moments.map((m) => (
          <motion.li
            key={m.year}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-10 sm:pl-14"
          >
            <span aria-hidden className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#6DAD45] bg-slate-950">
              <span className="h-2 w-2 rounded-full bg-[#D4E012]" />
            </span>

            <p className="mb-1 font-serif-display text-3xl leading-none text-slate-900">{m.year}</p>
            {m.stage && <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#707B00]">{m.stage}</p>}

            {/* observe the unclipped frame: a fully clipped element never reports as intersecting */}
            <motion.div
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
              className="relative mb-6 h-52 overflow-hidden rounded-2xl sm:h-72 md:h-80"
            >
              <motion.div
                variants={{
                  hidden: reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" },
                  shown: reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" },
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={m.image} alt={m.headline} fill sizes="100vw" className="object-cover" />
                <Caption moment={m} />
              </motion.div>
            </motion.div>

            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{m.subtitle}</p>
            <h3 className="mb-3 font-serif-display text-2xl font-medium leading-snug text-slate-900 sm:text-3xl">{m.headline}</h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-600 sm:text-base">{m.description}</p>
            <div className="mb-5">
              <Metrics items={m.metrics} />
            </div>
            <Achievements items={m.achievements} />
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function KeyMomentsChapters({ moments }: { moments: KeyMoment[] }) {
  const pinned = useMedia("(min-width: 1024px) and (min-height: 680px)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");

  return pinned ? <PinnedChapters moments={moments} reduce={reduce} /> : <JourneyList moments={moments} reduce={reduce} />;
}
