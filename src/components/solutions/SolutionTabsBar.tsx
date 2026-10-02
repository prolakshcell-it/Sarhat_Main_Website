"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { capabilities } from "./data";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/** Sticky in-page tab bar: highlights the solution section being read, click to jump. */
export default function SolutionTabsBar() {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const els = capabilities.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(capabilities.findIndex((c) => c.id === e.target.id));
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keep the active tab visible in the horizontally scrollable bar.
  useEffect(() => {
    const el = btnRefs.current[active];
    const bar = el?.parentElement;
    if (!el || !bar) return;
    bar.scrollTo({ left: el.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const jump = (i: number) => {
    const id = capabilities[i].id;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="sticky top-[100px] z-30 border-b border-slate-200/80 bg-[#F8FAF8]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <nav aria-label="Solution sections" className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {capabilities.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              type="button"
              onClick={() => jump(i)}
              aria-current={i === active ? "true" : undefined}
              className={`relative min-h-[48px] shrink-0 cursor-pointer whitespace-nowrap px-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors focus:outline-none focus-visible:text-[#707B00] sm:px-4 ${
                i === active ? "text-[#0F172A]" : "text-slate-500 hover:text-[#0F172A]"
              }`}
            >
              {c.title}
              <span
                aria-hidden
                className={`absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-full bg-[#6DAD45] transition-transform duration-300 sm:inset-x-4 ${
                  i === active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </nav>
        <span className="hidden shrink-0 font-mono text-xs text-slate-500 sm:block" aria-hidden>
          <span className="font-bold text-[#707B00]">{pad(active)}</span> / {pad(capabilities.length - 1)}
        </span>
      </div>
    </div>
  );
}
