"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import { useMedia } from "./KeyMomentsChapters";

export interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const START_DELAY = 400;
const STEP_DELAY = 480;

/**
 * Pillars activate one after another (01 → 02 → 03). On desktop they are all in view at once, so the
 * sequence plays automatically; on mobile each one activates as it scrolls into view.
 * Every animation runs once and settles — nothing loops.
 */
export default function FoundationPillars({ pillars }: { pillars: Pillar[] }) {
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const n = pillars.length;

  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineDrawn, setLineDrawn] = useState(false);
  const [target, setTarget] = useState(-1); // furthest pillar scrolled into view
  const [active, setActive] = useState(-1); // furthest pillar activated so far (animates toward target)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target === gridRef.current) {
            setLineDrawn(true);
            return;
          }
          const i = itemRefs.current.indexOf(e.target as HTMLDivElement);
          if (i >= 0) setTarget((t) => Math.max(t, i));
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.1 },
    );
    if (gridRef.current) io.observe(gridRef.current);
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active >= target) return;
    const wait = reduce ? 0 : active < 0 ? START_DELAY : STEP_DELAY;
    const t = setTimeout(() => setActive((a) => a + 1), wait);
    return () => clearTimeout(t);
  }, [active, target, reduce]);

  return (
    <div ref={gridRef} className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Foundation line: draws across once (desktop) */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-[13px] hidden h-px origin-left bg-slate-300 md:block"
        initial={{ scaleX: reduce ? 1 : 0, opacity: reduce ? 0 : 1 }}
        animate={lineDrawn ? { scaleX: 1, opacity: 1 } : undefined}
        transition={{ duration: reduce ? 0.3 : 0.9, ease: EASE }}
      />

      {pillars.map((p, i) => {
        const Icon = p.icon;
        const isActivated = i <= active;
        const isCurrent = i === active;
        const isDone = i < active;
        const layer = (delay: number) => ({
          initial: false as const,
          animate: { opacity: isActivated ? 1 : 0, y: isActivated ? 0 : reduce ? 0 : 10 },
          transition: { duration: reduce ? 0.2 : 0.5, delay: isActivated && !reduce ? delay : 0, ease: EASE },
        });

        return (
          <div
            key={p.title}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative pl-12 md:pl-0"
          >
            {/* Node on the foundation line: ○ upcoming · ● active · ✓ completed */}
            <div className="absolute left-0 top-0 z-10 flex h-7 items-center md:static md:justify-center">
              <span className="relative flex h-7 w-7 items-center justify-center">
                {isCurrent && !reduce && (
                  <motion.span
                    key={`pulse-${i}`}
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-[#6DAD45]"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 2.6, opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                )}
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold transition-colors duration-300 ${
                    isDone
                      ? "border-[#6DAD45] bg-[#6DAD45] text-white"
                      : isCurrent
                        ? "border-[#6DAD45] bg-slate-950 text-[#D4E012]"
                        : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
                </span>
              </span>
            </div>

            {/* Progress segment to the next node: fills once the next pillar is reached */}
            {i < n - 1 && (
              <>
                <span aria-hidden className="absolute left-[13px] top-7 -bottom-8 w-px bg-slate-200 md:hidden">
                  <motion.span
                    className="block h-full w-full origin-top bg-[#6DAD45]"
                    initial={false}
                    animate={{ scaleY: isDone ? 1 : 0 }}
                    transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE }}
                  />
                </span>
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[13px] hidden h-px w-[calc(100%+2rem)] bg-transparent md:block"
                >
                  <motion.span
                    className="block h-full w-full origin-left bg-[#6DAD45]"
                    initial={false}
                    animate={{ scaleX: isDone ? 1 : 0 }}
                    transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE }}
                  />
                </span>
              </>
            )}

            {/* Connector: the pillar rises from the foundation line */}
            <div aria-hidden className="mx-auto hidden h-6 w-px bg-slate-200 md:block">
              <motion.span
                className="block h-full w-full origin-top bg-[#6DAD45]"
                initial={false}
                animate={{ scaleY: isActivated ? 1 : 0 }}
                transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE }}
              />
            </div>

            <motion.div
              initial={false}
              animate={{
                opacity: isActivated ? 1 : 0.55,
                y: isActivated || reduce ? 0 : 15,
                scale: isActivated || reduce ? 1 : 0.98,
              }}
              whileHover={isActivated && !reduce ? { y: -4 } : undefined}
              transition={{ duration: reduce ? 0.2 : 0.55, ease: EASE }}
              className={`group relative mt-0 flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-[border-color,box-shadow,background-color] duration-500 md:mt-0 ${
                isActivated
                  ? "border-[#6DAD45]/50 bg-white shadow-xl shadow-slate-300/40 hover:border-[#D4E012] hover:shadow-2xl"
                  : "border-slate-200/90 bg-[#F8FAF8] shadow-md shadow-slate-200/40"
              }`}
            >
              {/* One-time accent sweep along the top edge, then it fades; nothing loops */}
              {isCurrent && !reduce && (
                <motion.span
                  key={`sweep-${i}`}
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-[#D4E012] via-[#6DAD45] to-transparent"
                  initial={{ scaleX: 0, opacity: 1 }}
                  animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                  transition={{ duration: 1, ease: EASE, opacity: { duration: 1.2, times: [0, 0.6, 1] } }}
                />
              )}

              <div>
                <motion.div
                  {...layer(0)}
                  className="relative mb-6 h-14 w-14"
                >
                  {isCurrent && !reduce && (
                    <motion.span
                      key={`ring-${i}`}
                      aria-hidden
                      className="absolute inset-0 rounded-2xl border-2 border-[#6DAD45]"
                      initial={{ scale: 0.95, opacity: 0.8 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                  )}
                  <motion.div
                    initial={false}
                    animate={{ scale: isActivated || reduce ? 1 : 0.92 }}
                    transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4E012]/50 bg-[#D4E012]/20 text-[#707B00] transition-colors group-hover:bg-[#D4E012] group-hover:text-slate-950"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                </motion.div>
                <motion.h3 {...layer(0.08)} className="mb-3 font-serif-display text-2xl font-bold text-slate-900">
                  {p.title}
                </motion.h3>
                <motion.p {...layer(0.15)} className="text-xs font-normal leading-relaxed text-slate-600 sm:text-sm">
                  {p.description}
                </motion.p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
