"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { socialLinks, type EditorialContent, type NavItemLink } from "./config";
import { SocialIcon } from "./SocialIcons";

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4E012]";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-width About menu: a plain list of links aligned with the page gutter.
 * Items with sub-pages (or social links) show an arrow and reveal them in a
 * second column while hovered or focused.
 */
export default function EditorialMenu({
  editorial,
  items,
  reduce,
  onNavigate,
}: {
  editorial: EditorialContent;
  items: NavItemLink[];
  reduce: boolean;
  onNavigate: () => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((i) => i.id === activeId);
  // "Connect With Us" is shown as a social row at the bottom, not in the list.
  const links = items.filter((i) => !i.context?.social);
  const connect = items.find((i) => i.context?.social);

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
  };
  const row: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 4 },
    show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE } },
  };

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,360px)_1fr] gap-16 px-12 py-14 xl:px-24">
      <div className="flex flex-col justify-between gap-10">
        <nav aria-label={editorial.heading}>
          <motion.ul
            variants={list}
            initial="hidden"
            animate="show"
            className="space-y-1"
          >
            {links.map((item) => {
              const on = item.id === activeId;
              const activate = () => setActiveId(item.id);
              return (
                <motion.li key={item.id} variants={row}>
                  <Link
                    href={item.href}
                    data-menu-item
                    onClick={onNavigate}
                    onPointerEnter={activate}
                    onFocus={activate}
                    className={`group/link inline-flex items-center gap-4 rounded-sm py-2.5 text-[22px] font-normal leading-tight transition-colors duration-200 hover:text-[#D4E012] ${on ? "text-[#D4E012]" : "text-white"} ${FOCUS}`}
                  >
                    {item.title}
                    {item.children && (
                      <ArrowRight
                        aria-hidden
                        strokeWidth={1.5}
                        className="h-5 w-5 transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        {connect && (
          <div>
            <Link
              href={connect.href}
              onClick={onNavigate}
              className={`rounded-sm text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition-colors duration-200 hover:text-[#D4E012] ${FOCUS}`}
            >
              {connect.title}
            </Link>
            <ul className="mt-4 flex items-center gap-3">
              {socialLinks.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Sarhat on ${s.label}`}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-[#D4E012] hover:text-[#D4E012] ${FOCUS}`}
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Second column: sub-pages of the hovered item */}
      <div className="border-l border-white/15 pl-16">
        {active?.children && (
          <motion.div
            key={active.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <ul className="space-y-1">
              {active.children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className={`inline-block rounded-sm py-2.5 text-lg text-white/85 transition-colors duration-200 hover:text-[#D4E012] ${FOCUS}`}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
