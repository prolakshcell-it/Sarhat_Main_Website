"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isEntryActive, navigationConfig, utilityLinks } from "./navbar/config";
import NavItem from "./navbar/NavItem";
import MegaMenu from "./navbar/MegaMenu";
import MobileMenu from "./navbar/MobileMenu";

interface NavbarProps {
  onOpenQuote: () => void;
}

const ROTATING_WORDS = ["SOLAR", "INFRA", "BESS", "AGRI", "LEISURE"];
const HOVER_OPEN_DELAY = 140;
const HOVER_CLOSE_DELAY = 160;

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const pathname = usePathname();
  const reduce = !!useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // `open` is the visible menu; `locked` means it was opened by click/keyboard and won't close on mouse leave.
  const [open, setOpen] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    hoverTimer.current = leaveTimer.current = null;
  };

  const closeMenu = useCallback((restoreFocus = false) => {
    clearTimers();
    setOpen((cur) => {
      if (cur && restoreFocus) triggerRefs.current[cur]?.focus();
      return null;
    });
    setLocked(false);
  }, []);

  const focusFirstItem = () =>
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[data-menu-item]")?.focus());

  const openLocked = (key: string) => {
    clearTimers();
    setOpen(key);
    setLocked(true);
  };

  // --- scroll state ---
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- logo word ticker (unchanged behaviour) ---
  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 2200);
    return () => clearInterval(interval);
  }, []);

  // --- close on navigation ---
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(null);
    setLocked(false);
    setMobileOpen(false);
  }

  // --- Escape closes the desktop menu ---
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  useEffect(() => clearTimers, []);

  // --- trigger handlers ---
  const onTriggerEnter = (key: string, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (open) {
      setOpen(key);
      return;
    }
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(key), HOVER_OPEN_DELAY);
  };

  const onTriggerClick = (key: string, e: React.MouseEvent) => {
    if (open === key && locked) {
      closeMenu();
      return;
    }
    openLocked(key);
    if (e.detail === 0) focusFirstItem(); // keyboard activation (Enter / Space)
  };

  const onTriggerKeyDown = (key: string, e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openLocked(key);
      focusFirstItem();
    }
  };

  const onHeaderPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (open && !locked) leaveTimer.current = setTimeout(() => closeMenu(), HOVER_CLOSE_DELAY);
  };

  const onHeaderBlur = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (open && next && !headerRef.current?.contains(next)) closeMenu();
  };

  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []);
    if (!items.length) return;
    const idx = items.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    if (e.key === "ArrowDown") next = (idx + 1) % items.length;
    else if (e.key === "ArrowUp") next = (idx - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next >= 0) {
      e.preventDefault();
      items[next].focus();
    }
  };

  const activeMenu = navigationConfig.find((m) => m.key === open) ?? null;

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 font-sans-ui"
      onPointerEnter={() => leaveTimer.current && clearTimeout(leaveTimer.current)}
      onPointerLeave={onHeaderPointerLeave}
      onBlur={onHeaderBlur}
    >
      {/* Light focus backdrop: page stays visible */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden
            className="fixed inset-0 -z-10 hidden bg-black/[0.18] backdrop-blur-[2px] lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeMenu()}
          />
        )}
      </AnimatePresence>

      {/* Top Sub-Bar (Solid Black Utility Header) */}
      <div className="relative z-50 select-none bg-black py-1.5 text-slate-200">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 text-[10px] uppercase tracking-wider sm:px-8 sm:text-[11px] lg:px-12">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 sm:text-[11px]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#D4E012] shadow-[0_0_8px_#D4E012]"></span>
            <span>अक्षय ऊर्जा • सुदृढ़ आधारभूत संरचना</span>
          </div>
          <nav aria-label="Utility" className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-slate-200 sm:text-[11px]">
            {utilityLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`group relative py-0.5 uppercase transition-colors hover:text-[#D4E012] focus:outline-none focus-visible:text-[#D4E012] ${
                  pathname === l.href ? "text-[#D4E012]" : ""
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-[#D4E012] transition-transform duration-300 ${
                    pathname === l.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`relative z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-white/10 bg-[rgba(5,8,12,0.92)] backdrop-blur-[14px]"
            : "border-white/5 bg-black/40 backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto grid max-w-[1440px] grid-cols-2 items-center px-4 transition-[height] duration-300 sm:px-8 lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-12 ${
            scrolled ? "h-[72px]" : "h-[88px]"
          }`}
        >
          {/* Brand Logo with Dynamic Rotating Words (Left Aligned) */}
          <div className="flex items-center justify-start">
            <Link href="/" className="group flex shrink-0 select-none items-center">
              <div
                className={`flex origin-left items-center text-xl font-black leading-none tracking-tighter text-white transition-transform duration-300 sm:text-2xl ${
                  scrolled ? "scale-[0.88]" : "scale-100"
                }`}
              >
                <Image
                  src="/images/logo.png"
                  alt="SARHAT"
                  width={260}
                  height={88}
                  className="h-10 w-auto object-contain sm:h-12 md:h-14"
                  priority
                />
                <span className="mx-1.5 inline-block h-2 w-2 shrink-0 translate-y-1 self-center rounded-full bg-[#D4E012] shadow-[0_0_10px_#D4E012] transition-transform group-hover:scale-125 sm:translate-y-2"></span>

                <div className="relative ml-0.5 inline-flex h-5 min-w-[50px] translate-y-1 items-center overflow-hidden sm:min-w-[65px] sm:translate-y-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[wordIndex]}
                      initial={{ y: 12, opacity: 0, filter: "blur(3px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -12, opacity: 0, filter: "blur(3px)" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="block text-[10px] font-bold uppercase tracking-wider text-[#D4E012] sm:text-xs"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (Center Aligned) */}
          <nav aria-label="Primary" className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.12em] xl:gap-8 xl:tracking-[0.14em]">
              {navigationConfig.map((entry) => (
                <NavItem
                  key={entry.key}
                  ref={(el) => {
                    triggerRefs.current[entry.key] = el;
                  }}
                  entry={entry}
                  controlsId="mega-menu-panel"
                  isOpen={open === entry.key}
                  isActive={isEntryActive(entry, pathname)}
                  onPointerEnter={(e) => onTriggerEnter(entry.key, e)}
                  onPointerLeave={() => hoverTimer.current && clearTimeout(hoverTimer.current)}
                  onClick={(e) => onTriggerClick(entry.key, e)}
                  onKeyDown={(e) => onTriggerKeyDown(entry.key, e)}
                />
              ))}
            </ul>
          </nav>

          {/* CTA Button & Mobile Menu Toggle (Right Aligned) */}
          <div className="flex shrink-0 items-center justify-end gap-3">
            <button
              type="button"
              onClick={onOpenQuote}
              className="hidden cursor-pointer whitespace-nowrap rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-black shadow-md shadow-[#D4E012]/30 transition-all duration-300 hover:-translate-y-px hover:from-[#c2ce0d] hover:to-[#4ed423] active:scale-[0.98] sm:inline-block sm:text-xs"
            >
              DISCUSS A PROJECT
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-zinc-900/90 text-zinc-200 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012] lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Desktop mega menu, attached directly under the bar */}
        <AnimatePresence>
          {activeMenu && (
            <div className="hidden lg:block">
              <MegaMenu
                key="mega"
                ref={panelRef}
                id="mega-menu-panel"
                menu={activeMenu}
                reduce={reduce}
                onNavigate={() => closeMenu()}
                onQuote={onOpenQuote}
                onKeyDown={onPanelKeyDown}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      <MobileMenu
        open={mobileOpen}
        pathname={pathname}
        reduce={reduce}
        onClose={() => setMobileOpen(false)}
        onQuote={onOpenQuote}
      />
    </header>
  );
}
