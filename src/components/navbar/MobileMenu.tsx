"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Minus, Plus, X } from "lucide-react";
import {
  isEntryActive,
  isExternal,
  navigationConfig,
  type MegaNavEntry,
  socialLinks,
  type NavItemLink,
} from "./config";
import { SocialIcon } from "./SocialIcons";

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE72D]";
const ROW =
  "flex min-h-[60px] w-full items-center justify-between gap-3 border-b border-white/10 px-1 text-left text-lg font-bold uppercase tracking-[0.1em] transition-colors active:bg-white/5";

/** One link in an open accordion; items with children expand in place. */
function MobileItem({
  item,
  depth,
  reduce,
  onNavigate,
}: {
  item: NavItemLink;
  depth: number;
  reduce: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const external = isExternal(item.href);
  return (
    <li>
      <div className="flex items-center">
        <Link
          href={item.href}
          onClick={onNavigate}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={`flex min-h-[44px] flex-1 items-center transition-colors hover:text-[#5EE72D] ${
            depth === 0 ? "text-[15px] font-semibold text-slate-100" : "text-sm text-slate-300"
          } ${FOCUS}`}
        >
          {item.title}
        </Link>
        {item.children && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={`${open ? "Hide" : "Show"} ${item.title} pages`}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-slate-400 hover:text-white ${FOCUS}`}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {item.children && open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
            className="ml-1 overflow-hidden border-l border-[#5EE72D]/60 pl-4"
          >
            {item.children.map((child) => (
              <MobileItem key={child.id} item={child} depth={depth + 1} reduce={reduce} onNavigate={onNavigate} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileAccordion({
  index,
  entry,
  open,
  active,
  reduce,
  onToggle,
  onNavigate,
}: {
  index: number;
  entry: MegaNavEntry;
  open: boolean;
  active: boolean;
  reduce: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = `mobile-acc-${entry.key}`;
  const item = {
    initial: reduce ? false : { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: reduce ? 0 : 0.08 + index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  };
  if (entry.linkOnly) {
    return (
      <motion.li {...item}>
        <Link
          href={entry.href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={`${ROW} ${FOCUS} ${active ? "text-[#5EE72D]" : "text-white"}`}
        >
          <span>{entry.label}</span>
          <ArrowUpRight className="h-5 w-5 text-slate-400" />
        </Link>
      </motion.li>
    );
  }
  return (
    <motion.li {...item}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`${ROW} ${FOCUS} ${open || active ? "text-[#5EE72D]" : "text-white"}`}
      >
        <span>{entry.label}</span>
        {open ? (
          <Minus className="h-5 w-5" />
        ) : (
            <Plus className="h-5 w-5 text-slate-400" />
          )}
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
              <ul className="px-3 pb-3 pt-1">
                {entry.items.map((item) => (
                  <MobileItem key={item.id} item={item} depth={0} reduce={reduce} onNavigate={onNavigate} />
                ))}
              </ul>
              {entry.social && (
                <div className="flex items-center justify-between gap-4 border-t border-white/10 px-3 pb-4 pt-3">
                  <Link
                    href="/about/connect"
                    onClick={onNavigate}
                    className={`text-xs font-bold uppercase tracking-[0.14em] text-slate-400 hover:text-[#5EE72D] ${FOCUS}`}
                  >
                    Connect with us
                  </Link>
                  <ul className="flex items-center gap-2">
                    {socialLinks.map((s) => (
                      <li key={s.id}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Sarhat on ${s.label}`}
                          className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-slate-200 transition-colors hover:border-[#5EE72D] hover:text-[#5EE72D] ${FOCUS}`}
                        >
                          <SocialIcon id={s.id} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
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
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
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
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 36px) 40px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 36px) 40px)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 36px) 40px)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex h-dvh w-full flex-col overflow-hidden bg-[#05080C] font-sans-ui text-white lg:hidden"
          >
            {/* tech grid + glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(94,231,45,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(94,231,45,0.07)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#5EE72D]/15 blur-3xl"
            />
            {/* one-shot scan line */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#5EE72D] to-transparent shadow-[0_0_14px_2px_rgba(94,231,45,0.7)]"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: "100dvh", opacity: [1, 1, 0] }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeInOut" }}
              />
            )}
            <div className="relative flex shrink-0 items-center justify-between border-b border-[#5EE72D]/30 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
              <Link
                href="/"
                onClick={onClose}
                aria-label="Sarhat home"
                className={`rounded-md ${FOCUS}`}
              >
                <Image
                  src="/images/logo.png"
                  alt="SARHAT"
                  width={260}
                  height={88}
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#5EE72D]/60 bg-white/5 text-white transition-colors hover:bg-white/10 ${FOCUS}`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2"
              data-lenis-prevent="true"
              data-lenis-prevent-scroll="true"
            >
              <ul className="pt-2">
                {navigationConfig.map((entry, i) => (
                  <MobileAccordion
                    key={entry.key}
                    index={i}
                    entry={entry}
                    open={expanded === entry.key}
                    active={isEntryActive(entry, pathname)}
                    reduce={reduce}
                    onToggle={() =>
                      setExpanded((cur) =>
                        cur === entry.key ? null : entry.key,
                      )
                    }
                    onNavigate={onClose}
                  />
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
