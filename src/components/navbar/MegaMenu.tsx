"use client";

import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { FeaturedContent, MegaNavEntry, NavItemLink } from "./config";

const EYEBROW =
  "font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#D4E012]";
const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012]";

function MegaMenuItem({
  item,
  compact,
  onNavigate,
}: {
  item: NavItemLink;
  compact: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      data-menu-item
      onClick={onNavigate}
      className={`group flex items-start gap-3 rounded-xl border border-transparent bg-white/[0.02] p-3 transition-colors duration-150 hover:border-[#D4E012]/60 hover:bg-white/[0.06] ${FOCUS}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-150 group-hover:scale-105 group-hover:border-[#D4E012]/40 group-hover:text-[#D4E012] group-focus-visible:text-[#D4E012]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif-display text-[15px] font-bold leading-snug text-slate-200 transition-colors duration-150 group-hover:text-white">
          {item.title}
        </span>
        <span
          className={`mt-0.5 block text-[13px] leading-snug text-slate-400 transition-colors duration-150 group-hover:text-slate-300 ${
            compact ? "line-clamp-1" : ""
          }`}
        >
          {item.description}
        </span>
      </span>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 -translate-x-1 text-[#D4E012] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
    </Link>
  );
}

function FeaturedMenuCard({
  featured,
  stacked,
  onNavigate,
}: {
  featured: FeaturedContent;
  stacked: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`group/feat relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] ${stacked ? "" : "xl:flex-row"}`}
    >
      <div className="flex flex-1 flex-col justify-between gap-5 p-5">
        <div>
          <p className={`${EYEBROW} mb-3`}>{featured.eyebrow}</p>
          <p className="font-serif-display text-2xl font-bold leading-tight text-white">
            {featured.title}
          </p>
          {featured.lead && (
            <p className="mt-2 text-[15px] leading-snug text-slate-200">
              {featured.lead}
            </p>
          )}
          {featured.text && (
            <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
              {featured.text}
            </p>
          )}
        </div>
        <Link
          href={featured.href}
          onClick={onNavigate}
          className={`group/cta inline-flex w-fit items-center gap-2 rounded-sm text-xs font-bold uppercase tracking-[0.14em] text-[#D4E012] transition-colors hover:text-white ${FOCUS}`}
        >
          {featured.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover/cta:translate-x-[3px]" />
        </Link>
      </div>
      <div
        className={`relative overflow-hidden ${stacked ? "h-36 flex-1" : "h-28 xl:h-auto xl:w-[48%]"}`}
      >
        <Image
          src={featured.image}
          alt={featured.imageAlt}
          fill
          sizes="(min-width: 1280px) 340px, 460px"
          loading="lazy"
          className="object-cover transition-transform duration-500 ease-out group-hover/feat:scale-[1.03]"
        />
        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-t from-[#070B10]/70 via-[#0B120B]/30 to-[#6DAD45]/15 ${stacked ? "" : "xl:bg-gradient-to-r xl:from-[#070B10]/70 xl:via-transparent xl:to-[#6DAD45]/10"}`}
        />
      </div>
    </div>
  );
}

interface MegaMenuProps {
  menu: MegaNavEntry;
  id: string;
  reduce: boolean;
  onNavigate: () => void;
  onQuote: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(function MegaMenu(
  { menu, id, reduce, onNavigate, onQuote, onKeyDown },
  ref,
) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-full flex justify-center px-4 sm:px-6">
      <motion.div
        ref={ref}
        id={id}
        role="region"
        aria-label={`${menu.label} menu`}
        onKeyDown={onKeyDown}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          width: `min(${menu.width}px, calc(100vw - 48px))`,
          transformOrigin: "top center",
        }}
        data-lenis-prevent="true"
        data-lenis-prevent-scroll="true"
        className="pointer-events-auto relative max-h-[calc(100dvh-150px)] overflow-y-auto overscroll-contain rounded-[20px] border border-[#D4E012]/15 bg-[#070B10]/[0.98] p-5 text-white shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']"
      >
        <motion.div
          key={menu.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <p className={`${EYEBROW} mb-4 flex items-center gap-2`}>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[#D4E012]"
            />
            {menu.tag}
          </p>

          <div
            className={`grid gap-4 lg:grid-cols-2 ${menu.columns === 2 ? "xl:grid-cols-[1.25fr_0.75fr]" : "xl:grid-cols-[0.9fr_1.1fr]"}`}
          >
            <ul
              className={`grid content-start gap-1.5 ${menu.columns === 2 ? "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" : ""}`}
            >
              {menu.items.map((item) => (
                <li key={item.id}>
                  <MegaMenuItem
                    item={item}
                    compact={menu.columns === 2}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
            <FeaturedMenuCard
              featured={menu.featured!}
              stacked={menu.columns === 2}
              onNavigate={onNavigate}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-3.5">
            <Link
              href={menu.href}
              onClick={onNavigate}
              className={`group/all inline-flex min-h-[40px] items-center gap-2 rounded-sm text-xs font-bold uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-white ${FOCUS}`}
            >
              {menu.viewAllLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover/all:translate-x-[3px]" />
            </Link>
            <button
              type="button"
              onClick={() => {
                onNavigate();
                onQuote();
              }}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#D4E012] to-[#5EE72D] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-md shadow-[#D4E012]/20 transition-all duration-150 hover:-translate-y-px hover:shadow-lg ${FOCUS}`}
            >
              Discuss a project
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default MegaMenu;
