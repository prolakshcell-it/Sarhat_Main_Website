"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import FinalCTA from "@/components/FinalCTA";
import { CheckCircle2, ArrowRight, FileText } from "lucide-react";

/* ---------- Content ---------- */

const LIME = "#D4E012";
const GREEN = "#6DAD45";

const factors = [
  {
    tag: "RESOURCE ASSESSMENT",
    title: "How much sun and wind will the site really get?",
    body: "We study solar irradiance and wind speed data for the location, using sources such as NASA and Solargis, and look at how it changes through the seasons.",
    points: ["Long-term sun and wind data for your location", "Seasonal highs and lows understood", "Expected output checked against the data"],
  },
  {
    tag: "SITE SUITABILITY",
    title: "Is the land right for a plant?",
    body: "We look at the shape of the land, how it is classified and used, how easily crews and equipment can reach it, and what building there would mean for the environment.",
    points: ["Topography and land use classification", "Access for crews and equipment", "Environmental impact considered"],
  },
  {
    tag: "GRID CONNECTIVITY",
    title: "Can the power actually get out?",
    body: "A plant is only useful if it can connect. We check how close the nearest substations are and whether the grid has the capacity to take your power.",
    points: ["Distance to the nearest substations", "Grid capacity available", "Connection route understood early"],
  },
  {
    tag: "REGULATORY LANDSCAPE",
    title: "Know the rules before you commit",
    body: "Local, state and national policies, available incentives and land acquisition laws all shape a project. We map them out so there are no surprises later.",
    points: ["Local, state and national policies", "Incentives you can use", "Land acquisition laws"],
  },
  {
    tag: "STAKEHOLDER ENGAGEMENT",
    title: "Bring the right people in early",
    body: "Landowners, DISCOMs and nodal agencies all have a say in whether a project moves. We engage them from the start, so approvals are smoother.",
    points: ["Landowners", "DISCOMs", "Nodal agencies"],
  },
];

const rhythm = [
  {
    ring: "Daily",
    title: "Watch the plant every day",
    body: "The plant is monitored daily, so a drop in output is noticed within a day, not at the end of the month.",
    points: ["Output reviewed against what is expected", "Alerts handled quickly", "Cleaning scheduled around dust and weather"],
  },
  {
    ring: "Monthly",
    title: "Inspect and look after the equipment",
    body: "Regular site visits keep small problems small. We check the equipment, tighten what has loosened and clear what has grown.",
    points: ["Connections, inverters and structures checked", "Vegetation and drainage kept clear", "Repairs made before faults grow"],
  },
  {
    ring: "Yearly",
    title: "Step back and review performance",
    body: "Once a year we look at the whole picture, test the plant in more depth and report on how it is performing.",
    points: ["Detailed testing of the plant", "Performance report for the year", "A plan for the year ahead"],
  },
];

/* ---------- Pentagon of five triangles ---------- */

const CX = 200;
const CY = 200;
const R = 120;
const vertex = (k: number) => {
  const a = ((-90 + 72 * k) * Math.PI) / 180;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)] as const;
};
const nodeAt = (k: number) => {
  const a = ((-90 + 72 * k + 36) * Math.PI) / 180;
  return [CX + 158 * Math.cos(a), CY + 158 * Math.sin(a)] as const;
};

function FeasibilityShape({ sel, setSel }: { sel: number; setSel: (k: number) => void }) {
  const ref = useRef<SVGSVGElement>(null);
  const built = useInView(ref, { once: true, amount: 0.4 });
  const [touched, setTouched] = useState(false);

  return (
    <svg ref={ref} viewBox="0 0 400 400" role="img" aria-label="Five feasibility factors forming one project report" className="mx-auto block w-full max-w-[460px]">
      {/* outer ring draws in once */}
      <circle
        cx={CX} cy={CY} r="188" fill="none" stroke="#CBD5E1" strokeWidth="1.4" strokeDasharray="1" pathLength={1}
        className="transition-[stroke-dashoffset] duration-[1400ms] ease-out motion-reduce:transition-none"
        style={{ strokeDashoffset: built ? 0 : 1, transformOrigin: "center", transform: "rotate(-90deg)" }}
      />

      {/* five triangles make the pentagon */}
      {Array.from({ length: 5 }, (_, k) => {
        const [x1, y1] = vertex(k);
        const [x2, y2] = vertex((k + 1) % 5);
        const isSel = k === sel;
        return (
          <polygon
            key={k}
            points={`${CX},${CY} ${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`}
            fill={isSel ? LIME : GREEN}
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinejoin="round"
            className="cursor-pointer transition-[opacity,fill] duration-300 motion-reduce:transition-none"
            style={{
              opacity: !built ? 0 : isSel ? 0.95 : 0.3,
              transitionDelay: built && !touched ? `${k * 180}ms` : "0ms",
            }}
            onClick={() => {
              setTouched(true);
              setSel(k);
            }}
          />
        );
      })}

      {/* factor nodes */}
      {Array.from({ length: 5 }, (_, k) => {
        const [nx, ny] = nodeAt(k);
        const isSel = k === sel;
        return (
          <g
            key={k}
            className="cursor-pointer"
            onClick={() => {
              setTouched(true);
              setSel(k);
            }}
            role="button"
            aria-label={`Show ${factors[k].tag.toLowerCase()}`}
          >
            <circle
              cx={nx} cy={ny} r="19"
              fill={isSel ? "#0F172A" : "#fff"}
              stroke={isSel ? LIME : "#CBD5E1"} strokeWidth="2"
              className="transition-[fill,stroke] duration-300 motion-reduce:transition-none"
            />
            <text x={nx} y={ny + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="ui-monospace, monospace" fill={isSel ? LIME : "#475569"}>
              {k + 1}
            </text>
          </g>
        );
      })}

      {/* the report in the middle */}
      <circle cx={CX} cy={CY} r="38" fill="#0F172A" stroke={LIME} strokeWidth="2.5" />
      <text x={CX} y={CY + 5} textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="ui-monospace, monospace" fill={LIME}>
        DPR
      </text>
    </svg>
  );
}

/* ---------- Concentric rings ---------- */

const RING_R = [150, 105, 60]; // Yearly, Monthly, Daily

function RhythmShape({ sel, setSel }: { sel: number; setSel: (i: number) => void }) {
  // rhythm order is Daily, Monthly, Yearly -> radii inner to outer
  const radiusOf = (i: number) => RING_R[2 - i];
  const ref = useRef<SVGSVGElement>(null);
  const built = useInView(ref, { once: true, amount: 0.4 });

  return (
    <svg ref={ref} viewBox="0 0 400 400" role="img" aria-label="Daily, monthly and yearly maintenance as concentric rings around the plant" className="mx-auto block w-full max-w-[420px]">
      {rhythm.map((r, i) => {
        const radius = radiusOf(i);
        const isSel = i === sel;
        return (
          <g
            key={r.ring}
            className="cursor-pointer"
            onClick={() => setSel(i)}
            role="button"
            aria-label={`Show ${r.ring.toLowerCase()} maintenance`}
          >
            {/* wide invisible hit area */}
            <circle cx={CX} cy={CY} r={radius} fill="none" stroke="transparent" strokeWidth="30" />
            <circle
              cx={CX} cy={CY} r={radius} fill="none"
              stroke={isSel ? LIME : "#94A3B8"}
              strokeWidth={isSel ? 8 : 3}
              strokeLinecap="round"
              strokeDasharray="1" pathLength={1}
              className="transition-[stroke-dashoffset,stroke,stroke-width] duration-[1100ms] ease-out motion-reduce:transition-none"
              style={{
                strokeDashoffset: built ? 0 : 1,
                transitionDelay: built ? `${(2 - i) * 120}ms` : "0ms",
                transformOrigin: "center",
                transform: "rotate(-90deg)",
              }}
            />
            {/* triangle marker at the top of each ring, filled when selected */}
            <polygon
              points={`${CX},${CY - radius + 3} ${CX - 9},${CY - radius - 14} ${CX + 9},${CY - radius - 14}`}
              fill={isSel ? LIME : "#fff"}
              stroke="#0F172A" strokeWidth="2" strokeLinejoin="round"
              className="transition-[fill] duration-300 motion-reduce:transition-none"
              style={{ opacity: built ? 1 : 0 }}
            />
            <text
              x={CX} y={CY - radius + 24} textAnchor="middle" fontSize="11" fontWeight="700"
              fontFamily="ui-monospace, monospace" letterSpacing="1.5"
              fill={isSel ? "#0F172A" : "#64748B"}
              style={{ opacity: built ? 1 : 0 }}
            >
              {r.ring.toUpperCase()}
            </text>
          </g>
        );
      })}
      <circle cx={CX} cy={CY} r="24" fill="#0F172A" stroke={LIME} strokeWidth="2.5" />
      <text x={CX} y={CY + 4} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill={LIME}>
        PLANT
      </text>
    </svg>
  );
}

/* ---------- Detail card ---------- */

function Detail({ tag, title, body, points }: { tag: string; title: string; body: string; points: string[] }) {
  return (
    <motion.div
      key={tag}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">{tag}</div>
      <h3 className="mt-2 text-2xl sm:text-3xl font-serif-display font-medium text-slate-900 leading-tight">{title}</h3>
      <p className="mt-4 text-slate-600 leading-relaxed">{body}</p>
      <ul className="mt-5 space-y-2.5">
        {points.map((pt) => (
          <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6DAD45]" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ---------- Page ---------- */

export default function OperationMaintenancePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [factor, setFactor] = useState(0);
  const [ring, setRing] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Transform + opacity only, so scrolling stays on the compositor
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-48px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 / HERO */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section ref={heroRef} className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none">
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 h-full w-full will-change-transform">
              <Image
                src="/images/hero-solar.jpg"
                alt="Aerial view of a solar plant at sunset"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-24 flex flex-col items-center text-center will-change-transform"
            >
              <div className="max-w-4xl flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 leading-[1.08] drop-shadow-lg">
                  Plan it well, <br />
                  <span className="text-[#D4E012] italic font-normal">keep it running</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                  From the feasibility study that proves a site is right to the maintenance that keeps the plant performing for years.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Intro */}
          <section className="pt-16 sm:pt-24 pb-4 bg-[#F8FAF8]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto">
                  <AnimatedPillBadge className="mb-4">FEASIBILITY &amp; MAINTENANCE</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    From the first study to the long run
                  </h2>
                  <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                    At Sarhat Energy, we offer end-to-end feasibility study and maintenance services for solar projects, for better planning, smoother execution and long-term performance. Our Detailed Project Report (DPR) gives you a complete roadmap for the project to succeed.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Part 1: feasibility, five triangles make one report */}
          <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                  <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">PART 1 · FEASIBILITY STUDY</div>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 leading-tight">
                    Five questions, one report
                  </h2>
                  <p className="mt-3 text-slate-600">Select a triangle to see what we look at. Together they form your DPR.</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <FeasibilityShape sel={factor} setSel={setFactor} />
                <div className="min-h-[340px]">
                  <Detail {...factors[factor]} />
                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#6DAD45]" />
                    <span>
                      <span className="font-semibold text-slate-900">DPR preparation: </span>
                      all five come together in a Detailed Project Report you can plan, approve and build from.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part 2: maintenance, three rings around the plant */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                  <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">PART 2 · MAINTENANCE</div>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-serif-display font-medium text-slate-900 leading-tight">
                    Three rings of care around your plant
                  </h2>
                  <p className="mt-3 text-slate-600">Select a ring to see what happens at each rhythm.</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="lg:order-2">
                  <RhythmShape sel={ring} setSel={setRing} />
                </div>
                <div className="min-h-[300px] lg:order-1">
                  <Detail
                    tag={`${rhythm[ring].ring.toUpperCase()} CARE`}
                    title={rhythm[ring].title}
                    body={rhythm[ring].body}
                    points={rhythm[ring].points}
                  />
                  {ring === 2 && (
                    <Link href="/solutions/solar-plant-health-checkup" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                      See the plant health check-up
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
