"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Minus, Plus, X } from "lucide-react";
import { isEntryActive, navigationConfig, utilityLinks, type MegaNavEntry } from "./config";

const FOCUS = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012]";
const ROW =
  "flex min-h-[56px] w-full items-center justify-between gap-3 border-b border-white/10 px-1 text-left text-base font-bold uppercase tracking-[0.12em] transition-colors";

function MobileAccordion({
  entry,
  open,
  active,
  reduce,
  onToggle,
  onNavigate,
}: {
  entry: MegaNavEntry;
  open: boolean;
  active: boolean;
  reduce: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = `mobile-acc-${entry.key}`;
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`${ROW} ${FOCUS} ${open || active ? "text-[#D4E012]" : "text-white"}`}
      >
        <span>{entry.label}</span>
        {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5 text-slate-400" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-1 py-3">
              {entry.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2 text-slate-200 transition-colors hover:bg-white/5 hover:text-white ${FOCUS}`}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-[#D4E012]" strokeWidth={1.75} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold">{item.title}</span>
                        <span className="block text-[13px] leading-snug text-slate-400">{item.description}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={entry.href}
                  onClick={onNavigate}
                  className={`flex min-h-[44px] items-center gap-2 px-3 text-xs font-bold uppercase tracking-[0.14em] text-[#D4E012] ${FOCUS}`}
                >
                  {entry.viewAllLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function MobileMenu({
  open,
  pathname,
  reduce,
  onClose,
  onQuote,
}: {
  open: boolean;
  pathname: string;
  reduce: boolean;
  onClose: () => void;
  onQuote: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mobile-backdrop"
            aria-hidden
            className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="mobile-panel"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-full max-w-md flex-col border-l border-white/10 bg-[#05080C] font-sans-ui text-white lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
              <Link href="/" onClick={onClose} aria-label="Sarhat home" className={`rounded-md ${FOCUS}`}>
                <Image src="/images/logo.png" alt="SARHAT" width={260} height={88} className="h-11 w-auto object-contain" />
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 ${FOCUS}`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2"
              data-lenis-prevent="true"
              data-lenis-prevent-scroll="true"
            >
              <ul>
                {navigationConfig.map((entry) => (
                  <MobileAccordion
                    key={entry.key}
                    entry={entry}
                    open={expanded === entry.key}
                    active={isEntryActive(entry, pathname)}
                    reduce={reduce}
                    onToggle={() => setExpanded((cur) => (cur === entry.key ? null : entry.key))}
                    onNavigate={onClose}
                  />
                ))}
                {utilityLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className={`${ROW} ${FOCUS} ${pathname === l.href ? "text-[#D4E012]" : "text-white"}`}
                    >
                      <span>{l.label}</span>
                      <ArrowUpRight className="h-5 w-5 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-white/10 bg-[#05080C] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onQuote();
                }}
                className={`flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] text-sm font-extrabold uppercase tracking-widest text-black shadow-lg shadow-[#D4E012]/20 ${FOCUS}`}
              >
                Discuss a project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
