"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import ScrollReveal from "@/components/ScrollReveal";
import { capabilities, type Capability } from "./data";

const pad = (n: number) => String(n + 1).padStart(2, "0");
const FOCUS = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#707B00]";

/** Smooth-scrolls to the in-page section for a solution (existing #id anchors). */
function goToSection(id: string, reduce: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function SpecPills({ specs }: { specs: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {specs.map((spec) => (
        <li
          key={spec}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs text-slate-700 transition-colors duration-200 hover:border-[#6DAD45] hover:bg-[#6DAD45]/10"
        >
          <Check className="h-3.5 w-3.5 text-[#6DAD45]" strokeWidth={2.5} />
          {spec}
        </li>
      ))}
    </ul>
  );
}

function ExploreLink({ id, reduce }: { id: string; reduce: boolean }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        goToSection(id, reduce);
      }}
      className={`group/link inline-flex min-h-[44px] items-center gap-2 rounded-sm font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#707B00] transition-colors hover:text-[#0F172A] ${FOCUS}`}
    >
      <span className="relative">
        Explore this section
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover/link:w-full" />
      </span>
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-[3px]" />
    </a>
  );
}

/** Content that swaps when the selected solution changes. */
function PanelContent({ cap, reduce, showImage = true }: { cap: Capability; reduce: boolean; showImage?: boolean }) {
  const Icon = cap.icon;
  return (
    <div className="flex flex-col gap-6">
      {showImage && cap.image && (
        <div className="group/img relative h-44 overflow-hidden rounded-[22px] border border-slate-200 shadow-md sm:h-52 lg:h-56">
          <Image
            src={cap.image}
            alt={cap.title}
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-[#6DAD45]/10" />
          <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4E012]">
            {cap.tag}
          </span>
        </div>
      )}
      <div>
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4E012] bg-[#D4E012]/25 text-[#707B00]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-serif-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight text-[#0F172A]">{cap.headline}</h3>
        <p className="mt-3 max-w-2xl text-[clamp(15px,1.2vw,17px)] font-light leading-relaxed text-slate-600">{cap.fullDetails}</p>
      </div>
      <SpecPills specs={cap.specs} />
      <div className="border-t border-slate-200 pt-2">
        <ExploreLink id={cap.id} reduce={reduce} />
      </div>
    </div>
  );
}

export default function SolutionNavigator() {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const indexFromHash = useCallback(() => {
    const id = window.location.hash.replace("#", "");
    return capabilities.findIndex((c) => c.id === id);
  }, []);

  // Honour existing #anchor links (e.g. /solutions#bess-storage) and keep in sync with hash changes.
  useEffect(() => {
    const sync = () => {
      const i = indexFromHash();
      if (i >= 0) {
        setActive(i);
        setOpenMobile(i);
      }
    };
    sync();
    // Smooth-scroll/Lenis can reset the browser's own hash jump, so land on the section explicitly.
    const id = window.location.hash.replace("#", "");
    const t = id ? setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 400) : undefined;
    window.addEventListener("hashchange", sync);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener("hashchange", sync);
    };
  }, [indexFromHash]);

  const select = (i: number, writeHash = false) => {
    setActive(i);
    if (writeHash) window.history.replaceState(null, "", `#${capabilities[i].id}`);
  };

  const onTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % capabilities.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + capabilities.length) % capabilities.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = capabilities.length - 1;
    else return;
    e.preventDefault();
    select(next, true);
    tabRefs.current[next]?.focus();
  };

  const activeCap = capabilities[active];
  const swap = reduce ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } } : { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -6 } };

  return (
    <section
      id="solution-navigator"
      className="relative overflow-hidden border-b border-slate-200/80 bg-white py-[clamp(60px,9vw,120px)] text-[#0F172A]"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#D4E012]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal once distance={24}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 lg:mb-14">
            <div>
              <AnimatedPillBadge className="mb-4">
                Services &amp; Capabilities
              </AnimatedPillBadge>
            </div>
            <div className="flex items-center gap-3 font-mono text-sm text-slate-500" aria-hidden>
              <span className="relative inline-flex h-5 w-6 overflow-hidden font-bold text-[#707B00]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={reduce ? { opacity: 0 } : { y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: -14, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {pad(active)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="flex gap-1">
                {capabilities.map((c, i) => (
                  <span key={c.id} className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#6DAD45]" : "w-3 bg-slate-300"}`} />
                ))}
              </span>
              <span>{pad(capabilities.length - 1)}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Tablet / desktop: tabs + panel */}
        <ScrollReveal once distance={24} delay={0.1} className="hidden md:block">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-10">
            <div
              role="tablist"
              aria-label="Solutions"
              aria-orientation="vertical"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {capabilities.map((c, i) => {
                const Icon = c.icon;
                const isActive = i === active;
                return (
                  <button
                    key={c.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`sol-tab-${c.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls="sol-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(i, true)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
                    className={`group relative flex shrink-0 cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-200 lg:px-5 lg:py-4 ${FOCUS} ${
                      isActive
                        ? "border-[#6DAD45] bg-[#6DAD45]/[0.08] shadow-sm"
                        : "border-slate-200 bg-[#F8FAF8] hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <span className={`font-mono text-xs font-bold ${isActive ? "text-[#707B00]" : "text-slate-400"}`}>{pad(i)}</span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 group-hover:scale-[1.03] ${
                        isActive ? "border-[#D4E012] bg-[#D4E012] text-black" : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block whitespace-nowrap font-serif-display text-base font-bold lg:whitespace-normal lg:text-lg ${isActive ? "text-[#0F172A]" : "text-slate-700"}`}>
                        {c.title}
                      </span>
                      <span className="mt-0.5 hidden text-[13px] leading-snug text-slate-500 lg:block">{c.description}</span>
                    </span>
                    <span className="relative hidden h-2.5 w-2.5 shrink-0 lg:block" aria-hidden>
                      {isActive && (
                        <>
                          <span className="absolute inset-0 rounded-full bg-[#6DAD45]" />
                          {!reduce && (
                            <motion.span
                              className="absolute inset-0 rounded-full bg-[#6DAD45]"
                              initial={{ scale: 1, opacity: 0.6 }}
                              animate={{ scale: 2.6, opacity: 0 }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          )}
                        </>
                      )}
                    </span>
                    <ArrowRight className={`hidden h-4 w-4 shrink-0 transition-all duration-200 lg:block ${isActive ? "translate-x-0 text-[#707B00] opacity-100" : "-translate-x-1 opacity-0"}`} />
                  </button>
                );
              })}
            </div>

            <div
              id="sol-panel"
              role="tabpanel"
              aria-labelledby={`sol-tab-${activeCap.id}`}
              className="rounded-[26px] border border-slate-200 bg-[#F8FAF8] p-5 sm:p-7 lg:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeCap.id} {...swap} transition={{ duration: 0.3, ease: "easeOut" }}>
                  <PanelContent cap={activeCap} reduce={reduce} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile: accordion */}
        <ScrollReveal once distance={24} delay={0.1} className="md:hidden">
          <ul className="border-t border-slate-200">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              const isOpen = openMobile === i;
              return (
                <li key={c.id} className="border-b border-slate-200">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`sol-acc-${c.id}`}
                    onClick={() => {
                      setOpenMobile(isOpen ? null : i);
                      if (!isOpen) select(i, true);
                    }}
                    className={`flex min-h-[64px] w-full cursor-pointer items-center gap-4 py-3 text-left ${FOCUS}`}
                  >
                    <span className={`font-mono text-xs font-bold ${isOpen ? "text-[#707B00]" : "text-slate-400"}`}>{pad(i)}</span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${isOpen ? "border-[#D4E012] bg-[#D4E012] text-black" : "border-slate-200 bg-white text-slate-500"}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className={`flex-1 font-serif-display text-lg font-bold ${isOpen ? "text-[#0F172A]" : "text-slate-700"}`}>{c.title}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#707B00]" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`sol-acc-${c.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pt-1">
                          <PanelContent cap={c} reduce={reduce} showImage={false} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
