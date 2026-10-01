"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check, Sun } from "lucide-react";

export type LifecycleStep = { step: string; title: string; desc: string };

const ROW = 240; // desktop/tablet row height (px)
const OFF = 24; // horizontal zig-zag offset of nodes from centre (px)
const GREEN = "#6DAD45";
const LIME = "#D4E012";
const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;

export default function TurnkeyLifecycle({ steps }: { steps: LifecycleStep[] }) {
  const n = steps.length;
  const reduced = useReducedMotion();
  const journeyRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const prevActive = useRef(-1);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(-1);

  // Measure container so the SVG path is drawn in real pixels (no stretching).
  useEffect(() => {
    const el = journeyRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // A step becomes active when its row crosses a line ~60% down the viewport.
  useEffect(() => {
    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
          else if (i === 0 && entry.boundingClientRect.top > window.innerHeight * 0.6)
            setActive(-1);
        },
        { rootMargin: "-58% 0px -38% 0px", threshold: 0 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [n]);

  // Continuous path draw, driven by scroll.
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start 60%", "end 60%"],
  });
  const lastY = (n - 0.5) * ROW;
  const frac = (i: number) => ((i + 0.5) * ROW) / lastY;
  const drawn = useTransform(scrollYProgress, (p) =>
    Math.min(1, Math.max(0, (p * n * ROW) / lastY))
  );
  const dashOffset = useTransform(drawn, (d) => 1 - d);

  // Subtle pulse travelling along the path to the newly active step.
  useEffect(() => {
    const from = prevActive.current;
    prevActive.current = active;
    const path = pathRef.current;
    const dot = pulseRef.current;
    if (reduced || !path || !dot || active <= from || active < 0 || !width) return;
    const total = path.getTotalLength();
    const a = from < 0 ? 0 : frac(from);
    const b = frac(active);
    const controls = animate(0, 1, {
      duration: 0.6,
      ease: "easeInOut",
      onUpdate: (v) => {
        const pt = path.getPointAtLength((a + (b - a) * v) * total);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.setAttribute("opacity", String(Math.sin(v * Math.PI) * 0.9));
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced, width]);

  // Path geometry
  const cx = width / 2;
  const nodeX = (i: number) => (i % 2 === 0 ? cx - OFF : cx + OFF);
  const nodeY = (i: number) => (i + 0.5) * ROW;
  let d = `M ${nodeX(0)} 0 L ${nodeX(0)} ${nodeY(0)}`;
  for (let i = 1; i < n; i++) {
    const y0 = nodeY(i - 1);
    const y1 = nodeY(i);
    const mid = ROW / 2;
    d += ` C ${nodeX(i - 1)} ${y0 + mid} ${nodeX(i)} ${y1 - mid} ${nodeX(i)} ${y1}`;
  }

  const ringPct = n ? (active + 1) / n : 0;
  const t = reduced ? "" : "transition-all duration-[350ms] ease-out";

  return (
    <div>
      {/* Core: turnkey execution ring, fills as the lifecycle progresses */}
      <div className="flex justify-center mb-6 md:mb-4" aria-hidden="true">
        <div className="relative w-[84px] h-[84px]">
          <svg viewBox="0 0 84 84" className="absolute inset-0 -rotate-90">
            <circle cx="42" cy="42" r={RING_R} fill="none" stroke="#E2E8F0" strokeWidth="2" />
            <circle
              cx="42"
              cy="42"
              r={RING_R}
              fill="none"
              stroke={GREEN}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - ringPct)}
              style={{ transition: reduced ? "none" : "stroke-dashoffset 400ms ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sun
              className={`w-7 h-7 ${t}`}
              style={{ color: ringPct > 0 ? GREEN : "#94A3B8", opacity: ringPct > 0 ? 1 : 0.7 }}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      <div ref={journeyRef} className="relative max-w-5xl mx-auto">
        {/* Desktop / tablet curved path */}
        {width > 0 && (
          <svg
            className="hidden md:block absolute inset-0 pointer-events-none overflow-visible"
            width={width}
            height={n * ROW}
            aria-hidden="true"
          >
            <path d={d} fill="none" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            <motion.path
              ref={pathRef}
              d={d}
              fill="none"
              stroke={GREEN}
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              style={{ strokeDashoffset: reduced ? 1 - ringPct : dashOffset }}
            />
            <circle ref={pulseRef} r="4" fill={LIME} opacity="0" />
          </svg>
        )}

        <ol className="relative list-none m-0 p-0">
          {steps.map((item, i) => {
            const isActive = i === active;
            const done = i < active;
            const left = i % 2 === 1; // odd rows place content on the left
            return (
              <li
                key={item.step}
                ref={(el) => {
                  rowRefs.current[i] = el as HTMLDivElement | null;
                }}
                className="relative py-6 md:py-0 md:h-[240px] md:flex md:items-center pl-12 md:pl-0"
                aria-current={isActive ? "step" : undefined}
              >
                {/* Mobile vertical segment to next step */}
                {i < n - 1 && (
                  <>
                    <span className="md:hidden absolute left-[14px] top-[39px] h-full w-0.5 bg-slate-200" />
                    <span
                      className={`md:hidden absolute left-[14px] top-[39px] h-full w-0.5 origin-top ${
                        reduced ? "" : "transition-transform duration-[400ms] ease-out"
                      }`}
                      style={{ background: GREEN, transform: `scaleY(${done ? 1 : 0})` }}
                    />
                  </>
                )}

                {/* Node */}
                <span
                  className={`absolute z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center border-2 left-0 top-6 md:top-1/2 md:-mt-[15px] ${
                    i % 2 === 0
                      ? "md:left-[calc(50%-39px)]"
                      : "md:left-[calc(50%+9px)]"
                  } ${t}`}
                  style={{
                    background: done ? GREEN : isActive ? LIME : "#fff",
                    borderColor: done || isActive ? GREEN : "#CBD5E1",
                    boxShadow: isActive ? `0 0 0 6px ${LIME}33, 0 0 18px ${LIME}88` : "none",
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                  }}
                  aria-hidden="true"
                >
                  {done ? (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  ) : (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: isActive ? "#0F172A" : "#CBD5E1" }}
                    />
                  )}
                </span>

                {/* Editorial content block */}
                <div
                  className={`w-full md:w-[42%] ${left ? "md:mr-auto" : "md:ml-auto"} ${t} rounded-xl px-5 py-4 border`}
                  style={{
                    background: isActive ? "rgba(248,250,248,0.9)" : "transparent",
                    borderColor: isActive ? `${GREEN}66` : "transparent",
                    boxShadow: isActive ? "0 10px 30px -12px rgba(15,23,42,0.18)" : "none",
                    transform: isActive && !reduced ? "scale(1.03)" : "scale(1)",
                    opacity: isActive || done ? 1 : 0.6,
                  }}
                >
                  <div
                    className={`font-mono font-extrabold text-2xl mb-1 origin-left ${t}`}
                    style={{
                      color: isActive || done ? GREEN : "#94A3B8",
                      transform: isActive && !reduced ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 ${t}`}
                    style={{ color: isActive ? "#0F172A" : done ? "#334155" : "#64748B" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed font-normal ${t}`}
                    style={{
                      color: "#475569",
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    {item.desc}
                  </p>
                  <span
                    className={`block h-px mt-4 origin-left ${reduced ? "" : "transition-transform duration-[400ms] ease-out"}`}
                    style={{
                      background: GREEN,
                      transform: `scaleX(${isActive || done ? 1 : 0.15})`,
                      opacity: isActive ? 1 : 0.5,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
