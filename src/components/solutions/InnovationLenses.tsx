"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface LensBlock {
  step: string;
  tag: string;
  title: string;
  body: string;
  points: string[];
  link?: { href: string; label: string };
}

type Mode = "drone" | "terrain" | "vr" | "monitor";

/** Dummy imagery for now: swap `src` for real drone / VR / model captures later. */
const LENSES: { mode: Mode; src: string; alt: string; label: string; chips: string[] }[] = [
  { mode: "drone", src: "/images/timeline-2025.jpg", alt: "Aerial survey of a solar site", label: "Lens 01 · Drone", chips: ["Boundary", "Ground levels", "Obstacles"] },
  { mode: "terrain", src: "/images/hero-solar.jpg", alt: "Terrain contours over a solar site", label: "Lens 02 · Terrain", chips: ["Slopes", "Low spots", "Layout on the ground"] },
  { mode: "vr", src: "/images/agrivoltaics-project.jpg", alt: "Stereo VR view between solar structures", label: "Lens 03 · VR", chips: ["Access paths", "Clearances"] },
  { mode: "monitor", src: "/images/substation-project.jpg", alt: "Monitoring heat map over a substation", label: "Lens 04 · Monitoring", chips: ["Output vs expected", "One section flagged"] },
];

const corner = "absolute h-5 w-5 border-[#D4E012]";

/** Contour lines for the terrain lens, generated once. */
const CONTOURS = Array.from({ length: 9 }, (_, k) => {
  const pts: string[] = [];
  for (let x = 0; x <= 400; x += 10) {
      const y = 40 + k * 26 + Math.sin(x / 45 + k * 0.5) * 14 + Math.cos(x / 90 + k) * 8;
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return "M" + pts.join(" L");
});

function LensView({ index, active }: { index: number; active: boolean }) {
  const reduce = !!useReducedMotion();
  const L = LENSES[index];
  const t = (delay = 0, duration = 0.6) => (reduce ? { duration: 0 } : { duration, delay, ease: "easeOut" as const });

  return (
    <div className="absolute inset-0 bg-slate-950">
      {L.mode === "vr" ? (
        /* Stereo pair, like the two lenses inside a headset */
        <div className="absolute inset-0 flex items-center justify-center gap-[3%] px-[5%]">
          {[0, 1].map((eye) => (
            <motion.div
              key={eye}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={active ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
              transition={t(eye * 0.12)}
              className="relative aspect-square w-[46%] overflow-hidden rounded-full ring-2 ring-[#D4E012]/60"
            >
              <Image
                src={L.src}
                alt={eye === 0 ? L.alt : ""}
                aria-hidden={eye === 1}
                fill
                sizes="260px"
                className="object-cover"
                style={{ objectPosition: eye === 0 ? "46% 55%" : "54% 55%", transform: "scale(1.25)" }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.75)_100%)]" />
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          <Image
            src={L.src}
            alt={L.alt}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            quality={80}
            className="object-cover"
            style={{
              filter:
                L.mode === "terrain"
                  ? "grayscale(1) contrast(1.15) brightness(0.8)"
                  : L.mode === "monitor"
                  ? "grayscale(0.7) brightness(0.65)"
                  : undefined,
            }}
          />

          {L.mode === "drone" && (
            <>
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,224,18,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(212,224,18,0.18) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              {/* one scan sweep each time this lens becomes active */}
              <motion.div
                key={active ? "on" : "off"}
                initial={{ x: "-110%" }}
                animate={active ? { x: "110%" } : { x: "-110%" }}
                transition={reduce ? { duration: 0 } : { duration: 1.6, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#D4E012]/35 to-transparent will-change-transform"
              />
            </>
          )}

          {L.mode === "terrain" && (
            <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {CONTOURS.map((d, k) => (
                <motion.path
                  key={k}
                  d={d}
                  fill="none"
                  stroke={k % 3 === 0 ? "#D4E012" : "rgba(255,255,255,0.7)"}
                  strokeWidth={k % 3 === 0 ? 1.6 : 0.9}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={t(k * 0.1, 0.9)}
                />
              ))}
            </svg>
          )}

          {L.mode === "monitor" && (
            <>
              <div className="absolute inset-0 bg-[#0B2540]/55 mix-blend-multiply" />
              {[
                { x: "22%", y: "62%", c: "rgba(109,173,69,0.55)", s: 34 },
                { x: "48%", y: "50%", c: "rgba(109,173,69,0.45)", s: 30 },
                { x: "78%", y: "68%", c: "rgba(109,173,69,0.5)", s: 32 },
                { x: "36%", y: "70%", c: "rgba(245,158,11,0.75)", s: 22 },
              ].map((b, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={t(i * 0.15, 0.6)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
                  style={{ left: b.x, top: b.y, width: `${b.s}%`, aspectRatio: "1", background: b.c }}
                />
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={t(0.9, 0.4)}
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-400"
                style={{ left: "36%", top: "70%" }}
              />
            </>
          )}
        </>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <span className={`${corner} left-4 top-4 border-l-2 border-t-2 rounded-tl-lg`} />
      <span className={`${corner} right-4 top-4 border-r-2 border-t-2 rounded-tr-lg`} />
      <span className={`${corner} bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg`} />
      <span className={`${corner} bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg`} />

      <div className="absolute left-9 top-8 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#D4E012] backdrop-blur-sm">
        {L.label}
      </div>
      <div className="absolute inset-x-9 bottom-8 flex flex-wrap gap-2">
        {L.chips.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 6 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={t(0.5 + i * 0.12, 0.35)}
            className="rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[11px] text-white backdrop-blur-sm"
          >
            {c}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function Stage({ index }: { index: number }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200 bg-slate-950">
      {LENSES.map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          style={{ pointerEvents: i === index ? "auto" : "none" }}
        >
          <LensView index={i} active={i === index} />
        </motion.div>
      ))}
    </div>
  );
}

function StepText({ block, index, onActive }: { block: LensBlock; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // Triggers when the block crosses the middle band of the viewport
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[60vh] items-center py-8">
      <div>
        <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">
          {block.step} · {block.tag}
        </div>
        <h3 className="mt-2 text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 leading-tight">
          {block.title}
        </h3>
        <p className="mt-4 text-slate-600 leading-relaxed">{block.body}</p>
        <ul className="mt-5 space-y-2.5">
          {block.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6DAD45]" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        {block.link && (
          <Link href={block.link.href} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
            {block.link.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function InnovationLenses({ blocks }: { blocks: LensBlock[] }) {
  // Desktop uses one pinned stage; mobile shows each lens inline above its text.
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14">
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <Stage index={active} />
          <div className="mt-5 flex justify-center gap-2">
            {LENSES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#6DAD45]" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        {blocks.map((b, i) => (
          <div key={b.step}>
            <div className="lg:hidden mt-10">
              <MobileLens index={i} />
            </div>
            <StepText block={b} index={i} onActive={setActive} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileLens({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200 bg-slate-950">
      <LensView index={index} active={inView} />
    </div>
  );
}
