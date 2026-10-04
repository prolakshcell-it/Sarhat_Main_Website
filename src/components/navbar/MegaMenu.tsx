"use client";

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isExternal, socialLinks, type MegaNavEntry, type NavItemLink } from "./config";
import { SocialIcon } from "./SocialIcons";
import styles from "./RadiantBorder.module.css";

interface MegaMenuProps {
  menu: MegaNavEntry;
  id: string;
  reduce: boolean;
  onNavigate: () => void;
  onQuote: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const ITEM =
  "group/item relative flex items-center justify-between gap-6 whitespace-nowrap rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#1E2A16] transition-colors duration-150 hover:bg-[#6AB144]/[0.09] hover:text-[#3C7322] focus:outline-none focus-visible:bg-[#6AB144]/[0.09] focus-visible:text-[#3C7322]";

const PANEL =
  "isolate rounded-[14px] p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.08)]";

/** Approximate panel widths, used to decide which side flyouts open on. */
const PANEL_W = 260;
const FLYOUT_W = 250;

/*
 * Per-depth Tailwind group names. Named groups match any hovered ancestor with
 * that name, so each nesting level needs its own name or a hover on the
 * top-level item would open every flyout beneath it.
 */
const LEVELS = [
  {
    li: "group/l0",
    open: "group-hover/l0:bg-[#6AB144]/[0.09] group-hover/l0:text-[#3C7322] group-focus-within/l0:bg-[#6AB144]/[0.09] group-focus-within/l0:text-[#3C7322]",
    show: "group-hover/l0:visible group-hover/l0:opacity-100 group-focus-within/l0:visible group-focus-within/l0:opacity-100",
  },
  {
    li: "group/l1",
    open: "group-hover/l1:bg-[#6AB144]/[0.09] group-hover/l1:text-[#3C7322] group-focus-within/l1:bg-[#6AB144]/[0.09] group-focus-within/l1:text-[#3C7322]",
    show: "group-hover/l1:visible group-hover/l1:opacity-100 group-focus-within/l1:visible group-focus-within/l1:opacity-100",
  },
  {
    li: "group/l2",
    open: "group-hover/l2:bg-[#6AB144]/[0.09] group-hover/l2:text-[#3C7322] group-focus-within/l2:bg-[#6AB144]/[0.09] group-focus-within/l2:text-[#3C7322]",
    show: "group-hover/l2:visible group-hover/l2:opacity-100 group-focus-within/l2:visible group-focus-within/l2:opacity-100",
  },
];

/** Gradient tick in the logo colours, shown beside the hovered item. */
const TICK = (
  <span
    aria-hidden
    className="absolute left-1.5 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#D2CB0A] to-[#6AB144] transition-all duration-200 group-hover/item:h-4 group-focus-visible/item:h-4"
  />
);

function ShimmerBorder() {
  return (
    <span aria-hidden className={styles.ring}>
      <span className={styles.spark} />
      <span className={styles.plate} />
    </span>
  );
}

const depthOf = (items: NavItemLink[]): number =>
  Math.max(0, ...items.map((i) => (i.children ? 1 + depthOf(i.children) : 0)));

function MenuItems({
  items,
  level,
  flip,
  onNavigate,
}: {
  items: NavItemLink[];
  level: number;
  flip: boolean;
  onNavigate: () => void;
}) {
  const lv = LEVELS[Math.min(level, LEVELS.length - 1)];
  const Arrow = flip ? ChevronLeft : ChevronRight;
  return (
    <ul>
      {items.map((item) => {
        const external = isExternal(item.href);
        return (
          <li key={item.id} className={`${lv.li} relative`}>
            <Link
              href={item.href}
              data-menu-item
              onClick={onNavigate}
              aria-haspopup={item.children ? "true" : undefined}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`${ITEM} ${item.children ? lv.open : ""}`}
            >
              {TICK}
              {item.title}
              {item.children && <Arrow aria-hidden className="h-4 w-4 text-[#6AB144]" />}
            </Link>
            {item.children && (
              <div
                className={`invisible absolute top-[-8px] opacity-0 transition-opacity duration-200 ${lv.show} ${
                  flip ? "right-full pr-3" : "left-full pl-3"
                }`}
              >
                <div className={`relative min-w-[210px] ${PANEL}`}>
                  <ShimmerBorder />
                  <MenuItems items={item.children} level={level + 1} flip={flip} onNavigate={onNavigate} />
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Simple dropdown in the Sarhat logo colours, aligned under its trigger, with nested flyouts. */
const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(function MegaMenu(
  { menu, id, reduce, onNavigate, onKeyDown },
  ref,
) {
  const panelRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => panelRef.current!, []);
  const [pos, setPos] = useState<{ left: number; flip: boolean } | null>(null);

  useLayoutEffect(() => {
    const trigger = document.getElementById(`nav-trigger-${menu.key}`);
    const parent = panelRef.current?.offsetParent;
    if (!trigger || !parent) return;
    const depth = depthOf(menu.items);
    const measure = () => {
      const t = trigger.getBoundingClientRect();
      // Line the item text up with the trigger label (panel 8px + item 16px padding).
      const left = t.left - parent.getBoundingClientRect().left - 24;
      // Open flyouts leftwards when they would run off the right edge.
      const flip = t.left - 24 + PANEL_W + depth * FLYOUT_W > window.innerWidth - 16;
      setPos({ left, flip });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [menu.key, menu.items]);

  return (
    <motion.div
      ref={panelRef}
      id={id}
      role="region"
      aria-label={`${menu.label} menu`}
      onKeyDown={onKeyDown}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ left: pos?.left ?? 0, visibility: pos ? undefined : "hidden" }}
      className={`absolute top-[calc(100%+10px)] min-w-[250px] ${PANEL} before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']`}
    >
      <ShimmerBorder />
      <p className="px-4 pb-2 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8F12]">
        {menu.tag}
      </p>
      <div aria-hidden className="mx-4 mb-1.5 h-px bg-gradient-to-r from-[#D2CB0A]/60 via-[#6AB144]/40 to-transparent" />
      <MenuItems items={menu.items} level={0} flip={pos?.flip ?? false} onNavigate={onNavigate} />
      {menu.social && (
        <div className="mx-2 mt-2 flex items-center justify-between gap-4 border-t border-[#6AB144]/20 px-2 pb-1 pt-3">
          <Link
            href="/about/connect"
            data-menu-item
            onClick={onNavigate}
            className="rounded-sm font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8F12] transition-colors hover:text-[#3C7322] focus:outline-none focus-visible:text-[#3C7322]"
          >
            Connect with us
          </Link>
          <ul className="flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-menu-item
                  aria-label={`Sarhat on ${s.label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6AB144]/30 text-[#3C7322] transition-all duration-200 hover:-translate-y-px hover:border-transparent hover:bg-gradient-to-br hover:from-[#D2CB0A] hover:to-[#6AB144] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6AB144]"
                >
                  <SocialIcon id={s.id} className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
});

export default MegaMenu;
