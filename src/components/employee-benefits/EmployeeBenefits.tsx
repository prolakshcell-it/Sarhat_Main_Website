"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import { BENEFITS, STAGES, STAGE_OF_STEP, type Benefit } from "./data";

const LAST = BENEFITS.length - 1;
const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n + 1).padStart(2, "0");
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* ---------- desktop ladder geometry (card positions in %, vertical in px) ---------- */
const CARD_W = 30;
const CARD_H = 92;
const ROW = 100;
const LEFT0 = 2;
const DX = 13.2;
const LADDER_H = LAST * ROW + CARD_H;
const cardLeft = (i: number) => LEFT0 + i * DX;
const cardTop = (i: number) => (LAST - i) * ROW;
const nodeX = (i: number) => (cardLeft(i) - 1.6) * 10; // viewBox is 1000 wide
const nodeY = (i: number) => cardTop(i) + CARD_H / 2;

const LADDER_PATH = (() => {
  let d = `M ${nodeX(0)} ${nodeY(0)}`;
  for (let i = 0; i < LAST; i++) {
    d += ` C ${nodeX(i)} ${nodeY(i) - 60}, ${nodeX(i + 1) - 70} ${nodeY(i + 1)}, ${nodeX(i + 1)} ${nodeY(i + 1)}`;
  }
  return d;
})();

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                        */
/* ------------------------------------------------------------------ */

function StepIcon({ benefit, active, reduce }: { benefit: Benefit; active: boolean; reduce: boolean }) {
  const Icon = benefit.icon;
  return (
    <span
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105 ${
        active
          ? "border-[#D4E012] bg-[#D4E012] text-slate-900 shadow-[0_0_22px_rgba(212,224,18,0.55)]"
          : "border-slate-200 bg-slate-50 text-[#707B00]"
      }`}
    >
      {active && !reduce && (
        <motion.span
          key="pulse"
          aria-hidden
          className="absolute inset-0 rounded-xl border border-[#D4E012]"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", repeat: 1 }}
        />
      )}
      <Icon
        className={`h-5 w-5 transition-all duration-300 ${active ? "scale-110 -rotate-6" : ""}`}
        strokeWidth={active ? 2.2 : 1.6}
      />
    </span>
  );
}

function StepBody({ benefit, index, active, reached }: { benefit: Benefit; index: number; active: boolean; reached: boolean }) {
  return (
    <span className="min-w-0 flex-1">
      <span className="flex items-baseline justify-between gap-2">
        <span className="block truncate text-[15px] font-bold leading-5 text-slate-900 font-serif-display">
          {benefit.title}
        </span>
        <span
          className={`font-mono text-xs font-bold tracking-wider transition-colors duration-300 ${
            active || reached ? "text-[#707B00]" : "text-slate-400"
          }`}
        >
          {pad(index)}
        </span>
      </span>
      <span className="mt-1 block text-[13px] leading-[18px] text-slate-600">{benefit.description}</span>
    </span>
  );
}

function ProgressMeter({
  active,
  progress,
  onGo,
}: {
  active: number;
  progress: MotionValue<number>;
  onGo: (i: number) => void;
}) {
  const btn =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#D4E012] hover:text-[#707B00] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#707B00]";
  return (
    <div className="flex items-center justify-center gap-3">
      <button type="button" className={btn} onClick={() => onGo(active - 1)} disabled={active === 0} aria-label="Previous step">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="font-mono text-sm font-bold text-[#707B00]">{pad(active)}</span>
      <div className="h-1 w-28 overflow-hidden rounded-full bg-slate-200 sm:w-44">
        <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-[#707B00] to-[#D4E012]" style={{ scaleX: progress }} />
      </div>
      <span className="font-mono text-sm text-slate-400">{pad(LAST)}</span>
      <button type="button" className={btn} onClick={() => onGo(active + 1)} disabled={active === LAST} aria-label="Next step">
        <ChevronRight className="h-5 w-5" />
      </button>
      <span className="sr-only" aria-live="polite">
        Step {active + 1} of {BENEFITS.length}: {BENEFITS[active].title}
      </span>
    </div>
  );
}

/** "Your growth journey": JOIN → LEARN → GROW → LEAD → IMPACT, lit up as the user climbs. */
function JourneyPanel({ active, className = "" }: { active: number; className?: string }) {
  const stage = STAGE_OF_STEP[active];
  return (
    <div className={className}>
      <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Your growth journey</p>
      <ol className="relative flex items-start justify-between">
        <span aria-hidden className="absolute left-3 right-3 top-[11px] h-px bg-slate-200" />
        <span
          aria-hidden
          className="absolute left-3 top-[11px] h-px bg-[#707B00] transition-[width] duration-700 ease-out"
          style={{ width: `calc((100% - 1.5rem) * ${stage / (STAGES.length - 1)})` }}
        />
        {STAGES.map((s, i) => (
          <li key={s.label} className="relative z-10 flex w-14 flex-col items-center gap-2" aria-current={i === stage ? "step" : undefined}>
            <span
              className={`h-[22px] w-[22px] rounded-full border-2 transition-all duration-500 ${
                i < stage
                  ? "border-[#707B00] bg-[#707B00]"
                  : i === stage
                    ? "border-[#D4E012] bg-[#D4E012] shadow-[0_0_16px_rgba(212,224,18,0.7)]"
                    : "border-slate-300 bg-white"
              }`}
            />
            <span
              className={`font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                i === stage ? "text-slate-900" : i < stage ? "text-[#707B00]" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-serif-display text-2xl font-bold text-slate-900 sm:text-3xl" aria-hidden>
        {STAGES[stage].line}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: ascending ladder, scroll-driven                             */
/* ------------------------------------------------------------------ */

function LadderDesktop() {
  const reduce = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const progress = reduce ? scrollYProgress : smooth;
  const [active, setActive] = useState(0);
  const dotLeft = useMotionValue("0%");
  const dotTop = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.round(clamp01(v) * LAST)));

  const placeDot = useCallback(
    (v: number) => {
      const p = pathRef.current;
      if (!p) return;
      const pt = p.getPointAtLength(clamp01(v) * p.getTotalLength());
      dotLeft.set(`${pt.x / 10}%`);
      dotTop.set(pt.y);
    },
    [dotLeft, dotTop],
  );
  useMotionValueEvent(progress, "change", placeDot);
  useEffect(() => placeDot(progress.get()), [placeDot, progress]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.min(LAST, Math.max(0, i));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (idx / LAST) * range, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={trackRef} className="h-[280vh]">
      <div className="sticky top-32">
        <div className="mb-6">
          <ProgressMeter active={active} progress={progress} onGo={goTo} />
        </div>

        <motion.div
          className="relative"
          style={{ height: LADDER_H }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.2 } } }}
        >
          {/* glow that follows the active step */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,224,18,0.22) 0%, rgba(109,173,69,0.08) 45%, transparent 70%)" }}
            animate={{ left: `${cardLeft(active) + CARD_W / 2}%`, top: cardTop(active) + CARD_H / 2 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 18 }}
          />

          <JourneyPanel active={active} className="absolute left-0 top-0 w-[38%]" />

          {/* path */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 1000 ${LADDER_H}`} preserveAspectRatio="none" aria-hidden>
            <motion.path
              ref={pathRef}
              d={LADDER_PATH}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: reduce ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <motion.path
              d={LADDER_PATH}
              fill="none"
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="2 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.8 } } }}
            />
            <motion.path
              d={LADDER_PATH}
              fill="none"
              stroke="#8FA600"
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: progress, filter: "drop-shadow(0 0 6px rgba(212,224,18,0.8))" }}
            />
          </svg>

          {/* nodes */}
          {BENEFITS.map((_, i) => (
            <span
              key={i}
              aria-hidden
              className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300 ${
                i <= active ? "border-[#707B00] bg-[#D4E012]" : "border-slate-300 bg-white"
              }`}
              style={{ left: `${nodeX(i) / 10}%`, top: nodeY(i) }}
            />
          ))}

          {/* travelling progress point */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute z-30 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4E012] shadow-[0_0_0_6px_rgba(212,224,18,0.25),0_0_24px_rgba(212,224,18,0.9)]"
            style={{ left: dotLeft, top: dotTop }}
          />

          {/* steps */}
          <ol className="contents">
            {BENEFITS.map((b, i) => {
              const isActive = i === active;
              const reached = i < active;
              return (
                <motion.li
                  key={b.id}
                  className="absolute list-none"
                  style={{ left: `${cardLeft(i)}%`, top: cardTop(i), width: `${CARD_W}%`, height: CARD_H, zIndex: isActive ? 20 : 10 }}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0 : 0.6, ease: EASE } },
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive ? "step" : undefined}
                    animate={{ y: isActive ? -4 : 0, scale: isActive ? 1.03 : 1 }}
                    whileHover={reduce ? undefined : { y: isActive ? -8 : -6 }}
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
                    className={`group relative flex h-full w-full cursor-pointer items-start gap-3 overflow-hidden rounded-2xl border bg-white p-3.5 text-left transition-[border-color,box-shadow,opacity] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#707B00] focus-visible:ring-offset-2 ${
                      isActive
                        ? "border-[#D4E012] opacity-100 shadow-[0_22px_44px_-14px_rgba(112,123,0,0.4)]"
                        : "border-slate-200 shadow-sm hover:border-[#D4E012] hover:shadow-[0_14px_32px_-12px_rgba(112,123,0,0.3)] " +
                          (reached ? "opacity-90" : "opacity-70 hover:opacity-100")
                    }`}
                  >
                    <StepIcon benefit={b} active={isActive} reduce={reduce} />
                    <StepBody benefit={b} index={i} active={isActive} reached={reached} />
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-[#707B00] to-[#D4E012] transition-transform duration-700 ${
                        isActive || reached ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </motion.button>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tablet / mobile: vertical journey (zig-zag from md up)               */
/* ------------------------------------------------------------------ */

function JourneyVertical() {
  const reduce = !!useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const fill = reduce ? scrollYProgress : smooth;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-40% 0px -45% 0px" },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const idx = Math.min(LAST, Math.max(0, i));
    setActive(idx);
    itemRefs.current[idx]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div>
      <div className="sticky top-28 z-30 -mx-4 mb-8 bg-white/90 px-4 py-2 sm:mx-0 sm:rounded-full sm:border sm:border-slate-200/70">
        <ProgressMeter active={active} progress={fill} onGo={goTo} />
      </div>

      <JourneyPanel active={active} className="mx-auto mb-10 max-w-md" />

      <ol ref={listRef} className="relative">
        <span aria-hidden className="absolute bottom-5 left-[22px] top-5 border-l-2 border-dotted border-slate-300 md:left-1/2 md:-translate-x-1/2" />
        <motion.span
          aria-hidden
          className="absolute bottom-5 left-[21px] top-5 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#707B00] to-[#D4E012] shadow-[0_0_10px_rgba(212,224,18,0.8)] md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: fill }}
        />
        {BENEFITS.map((b, i) => {
          const isActive = i === active;
          const reached = i < active;
          return (
            <motion.li
              key={b.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className={`relative pb-6 pl-16 last:pb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            >
              <span
                aria-hidden
                className={`absolute left-0 top-3 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white font-mono text-xs font-bold transition-all duration-300 ${
                  i % 2 ? "md:-left-[22px]" : "md:left-auto md:-right-[22px]"
                } ${
                  isActive
                    ? "border-[#D4E012] bg-[#D4E012] text-slate-900 shadow-[0_0_20px_rgba(212,224,18,0.7)]"
                    : reached
                      ? "border-[#707B00] text-[#707B00]"
                      : "border-slate-300 text-slate-400"
                }`}
              >
                {pad(i)}
              </span>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={isActive ? "step" : undefined}
                className={`group relative flex min-h-[88px] w-full cursor-pointer items-start gap-3 overflow-hidden rounded-2xl border bg-white p-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#707B00] focus-visible:ring-offset-2 ${
                  isActive
                    ? "scale-[1.02] border-[#D4E012] opacity-100 shadow-[0_18px_36px_-14px_rgba(112,123,0,0.4)]"
                    : "border-slate-200 shadow-sm hover:border-[#D4E012] " + (reached ? "opacity-90" : "opacity-75")
                }`}
              >
                <StepIcon benefit={b} active={isActive} reduce={reduce} />
                <StepBody benefit={b} index={i} active={isActive} reached={reached} />
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-[#707B00] to-[#D4E012] transition-transform duration-700 ${
                    isActive || reached ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header + CTA + section                                               */
/* ------------------------------------------------------------------ */

function BenefitsHeader() {
  const reduce = !!useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });
  return (
    <div className="mx-auto mb-10 max-w-4xl text-center lg:mb-14">
      <motion.div {...fade(0)}>
        <AnimatedPillBadge className="mb-5">Employee Benefits</AnimatedPillBadge>
      </motion.div>
      <motion.h2
        {...fade(0.08)}
        className="mb-5 font-serif-display text-[clamp(2.5rem,6.2vw,5rem)] font-bold leading-[1.05] tracking-tight text-slate-900"
      >
        What We <span className="text-[#707B00]">Offer You</span>
      </motion.h2>
      <motion.p {...fade(0.16)} className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        We believe great work deserves great support. Explore the opportunities, benefits and experiences that help you grow with us.
      </motion.p>
    </div>
  );
}

function CareersCTA() {
  const reduce = !!useReducedMotion();
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
    >
      <span aria-hidden className="mb-6 h-14 w-px bg-gradient-to-b from-[#D4E012] to-transparent shadow-[0_0_12px_rgba(212,224,18,0.8)]" />
      <p className="mb-5 font-serif-display text-2xl font-bold text-slate-900 sm:text-3xl">Your next step starts here.</p>
      <a
        href="#current-openings"
        className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-slate-900 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_0_4px_rgba(212,224,18,0.25),0_16px_36px_-12px_rgba(112,123,0,0.6)] transition-all hover:bg-[#D4E012] hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#707B00] focus-visible:ring-offset-2"
      >
        Explore Open Roles
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

export default function EmployeeBenefits() {
  // Full ladder only where it fits; shorter or narrower screens get the vertical journey.
  const wide = useMediaQuery("(min-width: 1280px) and (min-height: 830px)");

  return (
    <section
      id="employee-benefits"
      className="relative z-10 overflow-x-clip border-b border-slate-200/80 bg-gradient-to-b from-white via-[#F8FAF8] to-white pb-20 pt-20 sm:pt-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BenefitsHeader />
        <div className={wide ? "" : "mx-auto max-w-3xl"}>{wide ? <LadderDesktop /> : <JourneyVertical />}</div>
        <div className="mt-12">
          <CareersCTA />
        </div>
      </div>
    </section>
  );
}
