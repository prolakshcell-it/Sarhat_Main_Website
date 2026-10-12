"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Four small illustrated scenes, one per engineering stage.
 * Each plays once when scrolled into view. Only transform, opacity and
 * stroke-dashoffset (pathLength) are animated, so nothing triggers layout.
 */

export const LIME = "#D4E012";
export const GREEN = "#6DAD45";
export const INK = "#0F172A";

export function useScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = !!useReducedMotion();
  // `on` is true once visible (or immediately for reduced motion, which skips delays)
  const on = inView || reduce;
  const tr = (delay: number, duration = 0.5) =>
    reduce ? { duration: 0 } : { duration, delay, ease: "easeOut" as const };
  return { ref, on, reduce, tr };
}

export function Frame({
  children,
  sceneRef,
  label,
}: {
  children: React.ReactNode;
  sceneRef: React.RefObject<HTMLDivElement | null>;
  label: string;
}) {
  return (
    <div
      ref={sceneRef}
      className="relative w-full overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-800"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(109,173,69,0.18),transparent_55%)]" />
      <svg viewBox="0 0 400 240" role="img" aria-label={label} className="relative block w-full h-auto">
        {children}
      </svg>
    </div>
  );
}

/** Small caption chip that fades in at a given time. */
export function Tag({ x, y, text, show, delay, tr }: { x: number; y: number; text: string; show: boolean; delay: number; tr: ReturnType<typeof useScene>["tr"] }) {
  const w = text.length * 5.6 + 14;
  return (
    <motion.g initial={{ opacity: 0, y: 4 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={tr(delay, 0.35)}>
      <rect x={x} y={y} width={w} height={17} rx={8.5} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
      <text x={x + w / 2} y={y + 11.5} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#E2E8F0">
        {text}
      </text>
    </motion.g>
  );
}

/* ---------- 01 / Engineer walks the land, tests soil, finds the grid point ---------- */
export function SiteScene() {
  const { ref, on, reduce, tr } = useScene();
  return (
    <Frame sceneRef={ref} label="An engineer walks the plot boundary, tests the soil and locates the grid connection point">
      {/* ground + distant hill */}
      <path d="M0 190 Q90 168 190 184 T400 176 V240 H0Z" fill="#1E293B" />
      <path d="M0 196 H400" stroke="#334155" strokeWidth="1" />

      {/* plot boundary draws itself */}
      <motion.path
        d="M52 196 L52 150 L250 150 L250 196"
        fill="none"
        stroke={LIME}
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={on ? { pathLength: 1 } : {}}
        transition={tr(0.3, 1.8)}
      />

      {/* corner survey pegs */}
      {[52, 250].map((x, i) => (
        <motion.g key={x} initial={{ opacity: 0, y: -6 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={tr(0.4 + i * 1.4, 0.3)}>
          <line x1={x} y1={146} x2={x} y2={158} stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={x} cy={144} r="3" fill={LIME} />
        </motion.g>
      ))}

      {/* soil probe goes down at the far corner */}
      <motion.g initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={tr(2.1, 0.2)}>
        <motion.line
          x1="212" y1="150" x2="212" y2="190"
          stroke="#94A3B8" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : {}}
          transition={tr(2.1, 0.5)}
        />
        <motion.ellipse
          cx="212" cy="192" rx="9" ry="2.5" fill="none" stroke={LIME} strokeWidth="1.2"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={on ? { opacity: [0, 1, 0], scaleX: [0.4, 1.6, 2] } : {}}
          transition={reduce ? { duration: 0 } : { duration: 1, delay: 2.6, repeat: 1 }}
          style={{ transformOrigin: "212px 192px", transformBox: "fill-box" }}
        />
      </motion.g>

      {/* grid connection: pole, line, lamp */}
      <g>
        <line x1="340" y1="196" x2="340" y2="120" stroke="#64748B" strokeWidth="3" />
        <line x1="326" y1="130" x2="354" y2="130" stroke="#64748B" strokeWidth="3" />
        <motion.path
          d="M250 172 L340 130"
          fill="none" stroke={GREEN} strokeWidth="1.6" strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : {}}
          transition={tr(3.1, 0.7)}
        />
        <motion.circle
          cx="340" cy="116" r="5" fill={LIME}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={on ? { opacity: 1, scale: 1 } : {}}
          transition={tr(3.8, 0.4)}
          style={{ transformOrigin: "340px 116px", transformBox: "fill-box" }}
        />
      </g>

      {/* the engineer walks the boundary */}
      <motion.g
        initial={{ x: 40 }}
        animate={on ? { x: 205 } : {}}
        transition={reduce ? { duration: 0 } : { duration: 2, delay: 0.3, ease: "easeInOut" }}
      >
        <motion.g
          animate={on && !reduce ? { y: [0, -2, 0, -2, 0, -2, 0, -2, 0] } : {}}
          transition={{ duration: 2, delay: 0.3, ease: "linear" }}
        >
          <line x1="0" y1="168" x2="-5" y2="190" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="168" x2="6" y2="190" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          <rect x="-7" y="148" width="14" height="22" rx="5" fill={GREEN} />
          <rect x="6" y="156" width="9" height="12" rx="1.5" fill="#F8FAFC" />
          <circle cx="0" cy="141" r="6" fill="#FCD9B6" />
          <path d="M-7.5 140 A7.5 7 0 0 1 7.5 140 Z" fill={LIME} />
          <line x1="-8.5" y1="140" x2="8.5" y2="140" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </motion.g>

      <Tag x={22} y={20} text="Boundary walked" show={on} delay={1.4} tr={tr} />
      <Tag x={150} y={20} text="Soil tested" show={on} delay={2.6} tr={tr} />
      <Tag x={248} y={20} text="Grid point found" show={on} delay={3.8} tr={tr} />
    </Frame>
  );
}

/* ---------- 02 / Layout drawn on the real plot, connected to the grid ---------- */
export function DesignScene() {
  const { ref, on, tr } = useScene();
  const cols = 6;
  const rows = 3;
  return (
    <Frame sceneRef={ref} label="A solar array layout and its electrical connection drawn on a blueprint grid">
      {/* blueprint grid */}
      <g stroke="rgba(148,163,184,0.12)" strokeWidth="1">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="240" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
        ))}
      </g>

      {/* panel table layout builds row by row */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => (
          <motion.rect
            key={`${r}-${c}`}
            x={40 + c * 38}
            y={64 + r * 34}
            width={32}
            height={24}
            rx={3}
            fill="rgba(109,173,69,0.22)"
            stroke={GREEN}
            strokeWidth="1.2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={on ? { opacity: 1, scale: 1 } : {}}
            transition={tr(0.2 + r * 0.35 + c * 0.06, 0.3)}
            style={{ transformOrigin: `${56 + c * 38}px ${76 + r * 34}px`, transformBox: "fill-box" }}
          />
        ))
      )}

      {/* inverter + cable run + grid pole */}
      <motion.rect x="286" y="96" width="34" height="30" rx="4" fill={INK} stroke={LIME} strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={tr(2, 0.4)} />
      <text x="303" y="115" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill={LIME}>INV</text>
      <motion.path d="M262 111 H286" stroke={LIME} strokeWidth="1.6" fill="none"
        initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={tr(1.9, 0.3)} />
      <motion.path d="M320 111 H370" stroke={LIME} strokeWidth="1.6" fill="none"
        initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={tr(2.4, 0.5)} />
      <motion.g initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={tr(2.9, 0.4)}>
        <line x1="370" y1="92" x2="370" y2="132" stroke="#94A3B8" strokeWidth="3" />
        <line x1="360" y1="98" x2="380" y2="98" stroke="#94A3B8" strokeWidth="3" />
      </motion.g>

      {/* dimension line that measures the array */}
      <motion.g initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={tr(1.5, 0.4)}>
        <line x1="40" y1="176" x2="262" y2="176" stroke="#94A3B8" strokeWidth="1" />
        <line x1="40" y1="171" x2="40" y2="181" stroke="#94A3B8" strokeWidth="1" />
        <line x1="262" y1="171" x2="262" y2="181" stroke="#94A3B8" strokeWidth="1" />
      </motion.g>

      <Tag x={22} y={20} text="Layout fits the plot" show={on} delay={1.2} tr={tr} />
      <Tag x={168} y={20} text="Electrical + structure together" show={on} delay={2.2} tr={tr} />
      <Tag x={22} y={198} text="Maintenance paths kept clear" show={on} delay={3.1} tr={tr} />
    </Frame>
  );
}

/* ---------- 03 / Checklist ticks off, approval stamp lands ---------- */
export function ApprovalScene() {
  const { ref, on, tr } = useScene();
  const items = ["Scheme norms", "DISCOM requirements", "Statutory inspection"];
  return (
    <Frame sceneRef={ref} label="A checklist of scheme, DISCOM and inspection requirements being ticked off, followed by an approved stamp">
      <motion.g initial={{ opacity: 0, y: 10 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={tr(0.1, 0.5)}>
        <rect x="90" y="26" width="220" height="190" rx="10" fill="#F8FAFC" />
        <rect x="108" y="44" width="90" height="8" rx="4" fill="#CBD5E1" />
      </motion.g>

      {items.map((label, i) => (
        <g key={label}>
          <motion.rect
            x="108" y={76 + i * 40} width="18" height="18" rx="4" fill="none" stroke="#94A3B8" strokeWidth="1.6"
            initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={tr(0.4 + i * 0.1, 0.3)}
          />
          <motion.path
            d={`M112 ${85 + i * 40} L117 ${90 + i * 40} L124 ${79 + i * 40}`}
            fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={tr(0.9 + i * 0.7, 0.4)}
          />
          <motion.text
            x="136" y={90 + i * 40} fontSize="12" fontFamily="ui-sans-serif, system-ui" fill={INK}
            initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={tr(0.5 + i * 0.1, 0.3)}
          >
            {label}
          </motion.text>
        </g>
      ))}

      {/* stamp */}
      <motion.g
        initial={{ opacity: 0, scale: 1.8, rotate: -18 }}
        animate={on ? { opacity: 1, scale: 1, rotate: -12 } : {}}
        transition={tr(3.1, 0.35)}
        style={{ transformOrigin: "250px 176px", transformBox: "fill-box" }}
      >
        <rect x="200" y="158" width="94" height="34" rx="6" fill="none" stroke={GREEN} strokeWidth="3" />
        <text x="247" y="181" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="ui-monospace, monospace" fill={GREEN}>
          CLEARED
        </text>
      </motion.g>

      <Tag x={22} y={198} text="Planned in, not fixed later" show={on} delay={3.6} tr={tr} />
    </Frame>
  );
}

/* ---------- 04 / Crew builds, field change handled, plant energises ---------- */
export function BuildScene() {
  const { ref, on, reduce, tr } = useScene();
  const bays = 4;
  return (
    <Frame sceneRef={ref} label="Structures rise, panels are fitted by the crew and the plant is energised and connected to the grid">
      <path d="M0 190 H400 V240 H0Z" fill="#1E293B" />

      {/* structures rise, then panels tilt on */}
      {Array.from({ length: bays }).map((_, i) => {
        const x = 50 + i * 62;
        return (
          <g key={i}>
            <motion.line
              x1={x} y1={190} x2={x} y2={146} stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={tr(0.2 + i * 0.35, 0.4)}
            />
            <motion.rect
              x={x - 26} y={134} width={52} height={14} rx={2} fill="rgba(109,173,69,0.28)" stroke={GREEN} strokeWidth="1.4"
              initial={{ opacity: 0, rotate: -35 }}
              animate={on ? { opacity: 1, rotate: -14 } : {}}
              transition={tr(0.8 + i * 0.35, 0.45)}
              style={{ transformOrigin: `${x}px 141px`, transformBox: "fill-box" }}
            />
          </g>
        );
      })}

      {/* crew member fits the last panel */}
      <motion.g initial={{ opacity: 0, x: 14 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={tr(1.9, 0.5)}>
        <line x1="296" y1="190" x2="291" y2="172" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <line x1="296" y1="190" x2="303" y2="172" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <rect x="290" y="152" width="14" height="22" rx="5" fill={GREEN} />
        <circle cx="297" cy="145" r="6" fill="#FCD9B6" />
        <path d="M289.5 144 A7.5 7 0 0 1 304.5 144 Z" fill={LIME} />
        <line x1="288.5" y1="144" x2="305.5" y2="144" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* line to the grid */}
      <motion.path d="M236 150 L350 108" fill="none" stroke={LIME} strokeWidth="1.6"
        initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={tr(2.6, 0.6)} />
      <line x1="350" y1="190" x2="350" y2="96" stroke="#64748B" strokeWidth="3" />
      <line x1="336" y1="106" x2="364" y2="106" stroke="#64748B" strokeWidth="3" />

      {/* energised glow */}
      <motion.circle
        cx="350" cy="92" r="6" fill={LIME}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={on ? { opacity: 1, scale: 1 } : {}}
        transition={tr(3.3, 0.4)}
        style={{ transformOrigin: "350px 92px", transformBox: "fill-box" }}
      />
      {!reduce && (
        <motion.circle
          cx="350" cy="92" r="6" fill="none" stroke={LIME} strokeWidth="1.5"
          initial={{ opacity: 0, scale: 1 }}
          animate={on ? { opacity: [0.8, 0], scale: [1, 3.2] } : {}}
          transition={{ duration: 1.6, delay: 3.4, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "350px 92px", transformBox: "fill-box" }}
        />
      )}

      <Tag x={22} y={20} text="Built to the drawings" show={on} delay={1.2} tr={tr} />
      <Tag x={168} y={20} text="Field changes solved on site" show={on} delay={2.2} tr={tr} />
      <Tag x={22} y={204} text="Energised, as-built recorded" show={on} delay={3.6} tr={tr} />
    </Frame>
  );
}

export const stageScenes = [SiteScene, DesignScene, ApprovalScene, BuildScene];
