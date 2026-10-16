"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue } from "framer-motion";
import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import FinalCTA from "@/components/FinalCTA";
import RelatedSolutionsSection from "@/components/solutions/RelatedSolutionsSection";
import {
  Activity,
  Thermometer,
  ScanLine,
  ShieldCheck,
  Camera,
  LineChart,
  FlaskConical,
  Gauge,
  HeartPulse,
  ClipboardList,
  Stethoscope,
  FileSearch,
  Pill,
  ChevronsLeftRight,
  type LucideIcon,
} from "lucide-react";

/* ---------- Content ---------- */

const vitals: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Activity,
    title: "Output",
    body: "Is the plant producing what it should for the sunshine it received? A steady dip is the first symptom.",
  },
  {
    icon: Thermometer,
    title: "Temperature",
    body: "Hot spots on modules and connections are a fever. Heat shows trouble before it becomes a failure.",
  },
  {
    icon: ScanLine,
    title: "Cell condition",
    body: "Tiny cracks inside cells cannot be seen from outside, but they quietly steal output.",
  },
  {
    icon: ShieldCheck,
    title: "Electrical safety",
    body: "Insulation, earthing and transformer oil tell us whether the plant is safe as well as productive.",
  },
];

const exams: { icon: LucideIcon; like: string; title: string; body: string }[] = [
  {
    icon: Camera,
    like: "Like a thermal scan",
    title: "Drone thermal imaging",
    body: "A drone with a thermal camera flies the plant and finds hot modules, faulty diodes and dirty patches far faster than walking the rows.",
  },
  {
    icon: LineChart,
    like: "Like an ECG stress test",
    title: "String curve testing",
    body: "We measure how each string of modules behaves under load and compare it with what it should deliver.",
  },
  {
    icon: ScanLine,
    like: "Like an X-ray",
    title: "Cell imaging",
    body: "Special imaging at night shows cracks and dead areas inside the cells, invisible to the naked eye.",
  },
  {
    icon: FlaskConical,
    like: "Like a blood test",
    title: "Transformer oil analysis",
    body: "A small oil sample reveals early signs of internal heating or arcing, long before a breakdown.",
  },
  {
    icon: Gauge,
    like: "Like a reflex test",
    title: "Insulation and earthing tests",
    body: "We check that electrical insulation and earth connections still do the job they were built for.",
  },
  {
    icon: Pill,
    like: "Like a treatment",
    title: "Output recovery",
    body: "Where modules have lost output to voltage stress (PID), recovery treatment can win part of it back.",
  },
];

const journey: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ClipboardList,
    title: "Check-in",
    body: "We read the plant's history and compare its output with the sunshine it actually received, to see where performance slipped.",
  },
  {
    icon: Stethoscope,
    title: "Examination",
    body: "We run the scans and tests above, starting with the areas that look weakest.",
  },
  {
    icon: FileSearch,
    title: "Diagnosis",
    body: "We match symptoms to causes, and log every fault with its exact location in the plant.",
  },
  {
    icon: Pill,
    title: "Treatment plan",
    body: "You get a plain report: faults ranked by what they cost you, evidence for warranty claims and clear next steps.",
  },
];

type Status = "Healthy" | "Keep an eye" | "Needs attention";
const report: { part: string; status: Status; note: string }[] = [
  { part: "Modules", status: "Keep an eye", note: "A few hot modules found" },
  { part: "Strings", status: "Healthy", note: "Behaving as expected" },
  { part: "Inverters", status: "Healthy", note: "No issues found" },
  { part: "Transformer", status: "Healthy", note: "Oil within limits" },
  { part: "Earthing", status: "Needs attention", note: "One connection to repair" },
];
const statusStyle: Record<Status, string> = {
  Healthy: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Keep an eye": "bg-amber-100 text-amber-800 border-amber-200",
  "Needs attention": "bg-rose-100 text-rose-800 border-rose-200",
};

/* ---------- Compare slider: normal view vs thermal view ---------- */

const findings = [
  { x: "28%", y: "74%" },
  { x: "58%", y: "60%" },
  { x: "80%", y: "72%" },
];

function ThermalCompare() {
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (v) => `inset(0 0 0 ${v}%)`);
  const handle = useTransform(pos, (v) => `${v}%`);

  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl select-none overflow-hidden rounded-3xl bg-slate-900 shadow-xl ring-1 ring-slate-200">
      {/* normal view */}
      <Image src="/images/hero-solar.jpg" alt="Solar plant, normal view" fill sizes="(min-width: 1024px) 896px, 100vw" quality={80} className="object-cover" />

      {/* thermal view, revealed from the right */}
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 will-change-[clip-path]">
        <Image
          src="/images/hero-solar.jpg"
          alt="Solar plant, thermal view"
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          quality={80}
          className="object-cover"
          style={{ filter: "grayscale(1) contrast(1.35) brightness(0.8)" }}
        />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ background: "linear-gradient(135deg, #3b0a6b 0%, #b0235a 40%, #f08a1c 75%, #fde047 100%)" }}
        />
        {findings.map((f, i) => (
          <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: f.x, top: f.y }}>
            <span className="block h-9 w-9 rounded-full border-2 border-white/90 bg-white/10" />
            <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 border-x-[5px] border-b-[8px] border-x-transparent border-b-white/90" />
          </span>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
        Normal view
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#D4E012] backdrop-blur-sm">
        Thermal view
      </div>
      <div className="pointer-events-none absolute bottom-3 left-4 rounded-full bg-black/50 px-3 py-1 text-[10px] text-white/80 backdrop-blur-sm">
        Illustrative image
      </div>

      {/* divider + handle */}
      <motion.div style={{ left: handle }} className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white">
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" />
        </span>
      </motion.div>

      {/* native range input handles mouse, touch and keyboard */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        defaultValue={50}
        aria-label="Drag to compare normal and thermal view"
        onChange={(e) => pos.set(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/* ---------- Patient journey with heartbeat line ---------- */

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative">
      {/* heartbeat line behind the four stops (desktop) */}
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute left-0 top-[18px] hidden h-10 w-full lg:block" aria-hidden>
        <motion.path
          d="M125 20 H 235 L 245 20 L 252 4 L 262 36 L 270 20 H 485 L 495 20 L 502 4 L 512 36 L 520 20 H 735 L 745 20 L 752 4 L 762 36 L 770 20 H 875"
          fill="none"
          stroke="#6DAD45"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={seen ? { pathLength: 1 } : {}}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </svg>

      <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
        {journey.map((j, i) => {
          const Icon = j.icon;
          return (
            <li key={j.title} className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={seen ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.5 }}
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[#D4E012] ring-4 ring-white"
              >
                <Icon className="h-5 w-5" />
              </motion.span>
              <div>
                <div className="font-mono text-[11px] font-bold tracking-widest text-[#6DAD45]">STEP {i + 1}</div>
                <h3 className="font-serif-display text-xl font-medium text-slate-900">{j.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{j.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- Page ---------- */

export default function HealthCheckupPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
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
                src="/images/timeline-2025.jpg"
                alt="Aerial view of a solar plant"
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
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#D4E012] backdrop-blur-sm">
                  <HeartPulse className="h-4 w-4" /> Plant health check-up
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 leading-[1.08] drop-shadow-lg">
                  A check-up for <br />
                  <span className="text-[#D4E012] italic font-normal">your solar plant</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                  Drones, imaging and electrical tests that examine your plant the way a doctor examines a patient, finding problems early and telling you plainly what to do.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Intro */}
          <section className="pt-16 sm:pt-24 pb-6 bg-[#F8FAF8]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
                  <AnimatedPillBadge className="mb-6">PLANT HEALTH CHECK-UP</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Diagnostic Intelligence.</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      How healthy is your plant today?
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                      </svg>
                    </span>
                  </h2>
                  <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                    Once a plant is designed, built and running, the next question is simple. With modern tools like drones and thermal and cell imaging, we can look inside a plant much as a doctor looks inside a patient, with as little downtime as possible.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Vital signs */}
          <section className="py-12 sm:py-16 bg-[#F8FAF8]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-10 flex flex-col items-center gap-3 text-center">
                  <div className="font-mono text-xs font-bold tracking-widest text-[#6DAD45]">VITAL SIGNS</div>
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-900">Four things we read first</h2>
                  {/* pulse line: drawn once, no loop */}
                  <svg viewBox="0 0 300 40" className="h-8 w-56" aria-hidden>
                    <motion.path
                      d="M0 20 H110 L120 20 L128 4 L140 36 L148 20 H170 L178 12 L186 24 L194 20 H300"
                      fill="none" stroke="#6DAD45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {vitals.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <ScrollReveal key={v.title} delay={i * 0.06}>
                      <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[#D4E012]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 font-serif-display text-lg font-medium text-slate-900">{v.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{v.body}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Compare slider */}
          <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                  <AnimatedPillBadge className="mb-3">THE SCAN</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    See what the eye cannot
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">
                    Drag across the plant to switch from a normal view to a thermal view. The circles mark where a scan would flag a problem.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <ThermalCompare />
              </ScrollReveal>
            </div>
          </section>

          {/* Examination */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-3">THE EXAMINATION</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Six tests, each with a familiar cousin
                  </h2>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {exams.map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <ScrollReveal key={e.title} delay={(i % 3) * 0.06}>
                      <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#6DAD45]/50 hover:shadow-lg">
                        <div className="flex items-center justify-between">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-[#D4E012]">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="rounded-full border border-[#6DAD45]/30 bg-[#6DAD45]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#4f8a2e]">
                            {e.like}
                          </span>
                        </div>
                        <h3 className="mt-4 font-serif-display text-xl font-medium text-slate-900">{e.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{e.body}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Patient journey */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
                  <AnimatedPillBadge className="mb-3">THE VISIT</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    From check-in to treatment plan
                  </h2>
                </div>
              </ScrollReveal>
              <Journey />
            </div>
          </section>

          {/* Sample report */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center mb-10">
                  <AnimatedPillBadge className="mb-3">YOUR REPORT</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-slate-900 leading-tight">
                    Results in plain language
                  </h2>
                  <p className="mt-4 text-slate-600 text-base sm:text-lg">No jargon to decode. Each part of the plant gets a clear status.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D4E012]">
                      <HeartPulse className="h-4 w-4" /> Plant health report
                    </div>
                    <span className="text-[11px] text-slate-400">Sample layout</span>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {report.map((r) => (
                      <li key={r.part} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                        <div>
                          <div className="font-medium text-slate-900">{r.part}</div>
                          <div className="text-xs text-slate-500">{r.note}</div>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[r.status]}`}>{r.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* RELATED SOLUTIONS */}
          <RelatedSolutionsSection currentHref="/solutions/solar-plant-health-checkup" />

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}
