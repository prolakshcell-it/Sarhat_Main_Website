"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SUN } from "@/components/our-story/motifs";
import styles from "./PowerChain.module.css";

/*
  Plant → storage → substation → transmission → city, drawn as one line illustration.
  Geometry lives in a 1600 × 240 box with the ground at y = 210.
*/
const W = 1600;
const H = 240;
const GROUND = 210;

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/* --- Solar plant ---------------------------------------------------- */
// a tilted module seen from the front: frame, cell grid, two legs
const PANEL = "M0 0 L64 0 L76 -26 L12 -26 Z M16 0 L28 -26 M32 0 L44 -26 M48 0 L60 -26 M6 -13 H70 M10 0 V14 M66 0 V14";
const PANELS = [
  ...[84, 168, 252, 336].map((x) => ({ x, y: 160, s: 0.8 })),
  ...[60, 150, 240, 330].map((x) => ({ x, y: 196, s: 1 })),
];
const PANEL_FACE = "M0 0 L64 0 L76 -26 L12 -26 Z";

// sunlight: a beam from the tips of the sun's rays to the middle of every module
const SUN_C = { x: 110, y: 56 };
const BEAMS = PANELS.map(({ x, y, s }) => {
  const tx = x + 38 * s;
  const ty = y - 13 * s;
  const a = Math.atan2(ty - SUN_C.y, tx - SUN_C.x);
  return `M${(SUN_C.x + Math.cos(a) * 50).toFixed(1)} ${(SUN_C.y + Math.sin(a) * 50).toFixed(1)} L${tx} ${ty}`;
});

/* --- Battery storage -------------------------------------------------- */
const BESS =
  "M440 210 V172 H536 V210 Z M436 172 H540 " +
  Array.from({ length: 7 }, (_, i) => `M${452 + i * 12} 180 V204`).join(" ");

/* --- Substation ------------------------------------------------------ */
const lattice = (x: number, top: number) => {
  let d = `M${x - 8} ${GROUND} V${top} M${x + 8} ${GROUND} V${top}`;
  for (let y = GROUND; y > top; y -= 14) d += ` M${x - 8} ${y} L${x + 8} ${Math.max(y - 14, top)}`;
  return d;
};
const GANTRIES = `${lattice(640, 112)} ${lattice(860, 112)} M624 112 H876 M632 126 H868`;
const BUSHINGS = [722, 745, 768];
const TRANSFORMER =
  "M700 210 V172 H790 V210 Z M694 172 H796 " +
  [706, 714, 776, 784].map((x) => `M${x} 178 V204`).join(" ") +
  " " +
  BUSHINGS.map((x, i) => {
    const top = i === 1 ? 138 : 142;
    return `M${x} 172 V${top} M${x} 126 V${top} ` + [150, 157, 164].map((y) => `M${x - 4} ${y} H${x + 4}`).join(" ");
  }).join(" ");
const FENCE =
  "M590 194 H910 " + Array.from({ length: 11 }, (_, i) => `M${590 + i * 32} ${GROUND} V190`).join(" ");

/* --- Transmission ---------------------------------------------------- */
const TOWER_TOP = 62;
const TOWERS = [1010, 1210, 1410];
// lattice tower, local origin at the peak; cross-arms at 22 / 48 / 74 with insulators hanging 8 below
const ARMS = [
  { y: 22, w: 34 },
  { y: 48, w: 30 },
  { y: 74, w: 26 },
];
const hw = (y: number) => (4 + (22 * y) / 148).toFixed(1);
const LEVELS = [22, 48, 74, 110, 148];
const TOWER =
  "M-4 0 L-26 148 M4 0 L26 148 " +
  ARMS.map(({ y, w }) => `M-${w} ${y} H${w} M-${w} ${y} V${y + 8} M${w} ${y} V${y + 8}`).join(" ") +
  " " +
  LEVELS.slice(1)
    .map((n, i) => {
      const y = LEVELS[i];
      return `M-${hw(y)} ${y} L${hw(n)} ${n} M${hw(y)} ${y} L-${hw(n)} ${n}`;
    })
    .join(" ");

// gantry outlets → three towers → city terminal pole; one continuous path per phase
const SAG = 24;
const OUTLETS = [116, 128, 140];
const TERMINAL = [126, 136, 146];
const PHASES = ARMS.map(({ y, w }, i) => {
  const ay = TOWER_TOP + y + 8;
  let d = `M876 ${OUTLETS[i]}`;
  let px = 876;
  let py = OUTLETS[i];
  for (const tx of TOWERS) {
    const x0 = tx - w;
    d += ` Q${(px + x0) / 2} ${(py + ay) / 2 + SAG} ${x0} ${ay} L${tx + w} ${ay}`;
    px = tx + w;
    py = ay;
  }
  const end = TERMINAL[i];
  return `${d} Q${(px + 1456) / 2} ${(py + end) / 2 + SAG * 0.6} 1456 ${end}`;
});

/* --- City ------------------------------------------------------------ */
const POLE = "M1456 210 V118 M1446 122 H1466";
const CITY = "M1476 210 V170 H1498 V210 M1502 210 V146 H1526 V210 M1530 210 V180 H1550 V210 M1554 210 V158 H1584 V210";
const WINDOWS = [
  [1481, 178], [1489, 178], [1481, 190], [1507, 154], [1516, 154], [1507, 166],
  [1516, 178], [1507, 190], [1535, 188], [1559, 166], [1568, 166], [1576, 178], [1559, 190], [1568, 190],
];

// underground collector cable: solar field → BESS → transformer
const CABLE = "M96 210 V224 H745 V210";
const BESS_TAP = "M488 224 V210";

// timeline (s): structures draw in order, then current flows down the chain
// sunlight hits the modules, they glow, current leaves through the collector cable
const PULSE_START = 3.4;
const PANEL_GLOW = PULSE_START + 0.9;
const CABLE_PULSE = PULSE_START + 1.3;
const LINE_PULSE = CABLE_PULSE + 3;
const CITY_LIGHT = LINE_PULSE + 3;

export default function PowerChain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.on = "";
          el.dataset.live = "";
        } else {
          delete el.dataset.live;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.root} relative ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        className="block h-[140px] w-full sm:h-auto sm:aspect-[1600/240]"
        role="img"
        aria-label="Power flowing from a solar plant through battery storage and a substation onto transmission lines that light a city"
      >
        <defs>
          <linearGradient id="pc-line" x1="876" x2="1456" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6DAD45" stopOpacity="0.55" />
            <stop offset="1" stopColor="#D4E012" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="pc-ground" x1="0" x2="1">
            <stop offset="0" stopColor="#6DAD45" stopOpacity="0" />
            <stop offset="0.15" stopColor="#6DAD45" stopOpacity="0.35" />
            <stop offset="0.85" stopColor="#6DAD45" stopOpacity="0.35" />
            <stop offset="1" stopColor="#6DAD45" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M0 ${GROUND} H${W}`} stroke="url(#pc-ground)" strokeWidth={1} />

          {/* sun + solar field */}
          <g transform="translate(110 56)" strokeWidth={1.4}>
            <path pathLength={1} className={styles.draw} style={delay(0)} d={SUN.rings[0]} stroke="#E9C46A" strokeWidth={1.8} />
            <path pathLength={1} className={styles.draw} style={delay(0.1)} d={SUN.rings[1]} stroke="#E9C46A" strokeWidth={1.1} />
            <path className={`${styles.fade} ${styles.sun}`} style={delay(0.4)} d={SUN.rays} stroke="#E07A4F" />
          </g>
          <g stroke="#6DAD45" strokeOpacity={0.75} strokeWidth={1.1}>
            {PANELS.map(({ x, y, s }, i) => (
              <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
                <path d={PANEL_FACE} fill="#D4E012" stroke="none" className={styles.glow} style={delay(PANEL_GLOW + (i % 4) * 0.06)} />
                <path pathLength={1} className={styles.draw} style={delay(0.1 + i * 0.06)} d={PANEL} />
              </g>
            ))}
          </g>

          {/* collector cable */}
          <path d={`${CABLE} ${BESS_TAP}`} className={styles.fade} style={delay(0.6)} stroke="#6DAD45" strokeOpacity={0.35} strokeWidth={1} strokeDasharray="4 5" />

          {/* battery storage */}
          <g stroke="#6DAD45" strokeOpacity={0.75} strokeWidth={1.1}>
            <path d={BESS} pathLength={1} className={styles.draw} style={delay(0.7)} />
          </g>
          <circle cx={526} cy={182} r={2.2} fill="#D4E012" className={`${styles.fade} ${styles.blink}`} style={delay(1.4)} />

          {/* substation */}
          <path d={FENCE} pathLength={1} className={styles.draw} style={delay(0.9)} stroke="#ffffff" strokeOpacity={0.12} strokeWidth={1} />
          <g stroke="#6DAD45" strokeOpacity={0.75} strokeWidth={1.1}>
            <path d={GANTRIES} pathLength={1} className={styles.draw} style={delay(1)} />
            <path d={TRANSFORMER} pathLength={1} className={styles.draw} style={delay(1.2)} />
          </g>

          {/* towers */}
          <g stroke="#6DAD45" strokeOpacity={0.6} strokeWidth={1.1}>
            {TOWERS.map((x, i) => (
              <path key={x} transform={`translate(${x} ${TOWER_TOP})`} pathLength={1} className={styles.draw} style={delay(1.5 + i * 0.15)} d={TOWER} />
            ))}
          </g>

          {/* conductors */}
          {PHASES.map((d, i) => (
            <path key={d} d={d} pathLength={1} className={styles.draw} style={delay(2 + i * 0.12)} stroke="url(#pc-line)" strokeWidth={1.3} />
          ))}

          {/* city */}
          <g stroke="#ffffff" strokeOpacity={0.35} strokeWidth={1.1}>
            <path d={POLE} pathLength={1} className={styles.draw} style={delay(2.4)} />
            <path d={CITY} pathLength={1} className={styles.draw} style={delay(2.6)} />
          </g>
        </g>

        {/* sunlight onto the modules */}
        <g fill="none" stroke="#D4E012" strokeWidth={1.4} strokeLinecap="round">
          {BEAMS.map((d, i) => (
            <path key={d} d={d} pathLength={1} className={styles.ray} style={delay(PULSE_START + (i % 4) * 0.08)} />
          ))}
        </g>

        {/* current: field → transformer, then up the lines into the city */}
        <g fill="none" stroke="#D4E012" strokeWidth={2.2} strokeLinecap="round">
          <path d={CABLE} pathLength={1} className={styles.pulse} style={delay(CABLE_PULSE)} />
          {PHASES.map((d, i) => (
            <path key={d} d={d} pathLength={1} className={styles.pulse} style={delay(LINE_PULSE + i * 0.18)} />
          ))}
        </g>
        <g fill="#D4E012">
          {WINDOWS.map(([x, y], i) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={4} height={5} className={styles.window} style={delay(CITY_LIGHT + (i % 5) * 0.08)} />
          ))}
        </g>
      </svg>

    </div>
  );
}
