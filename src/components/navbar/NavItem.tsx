"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { MegaNavEntry } from "./config";

interface NavItemProps {
  entry: MegaNavEntry;
  controlsId: string;
  isOpen: boolean;
  isActive: boolean;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(function NavItem(
  { entry, controlsId, isOpen, isActive, onPointerEnter, onPointerLeave, onClick, onKeyDown },
  ref,
) {
  if (entry.linkOnly) {
    return (
      <li className="relative" onPointerEnter={onPointerEnter}>
        <Link
          href={entry.href}
          aria-current={isActive ? "page" : undefined}
          className={`group relative flex items-center whitespace-nowrap py-3 normal-case transition-colors duration-200 focus:outline-none focus-visible:text-[#D4E012] ${
            isActive ? "text-[#D4E012]" : "text-slate-100 hover:text-[#D4E012]"
          }`}
        >
          <span>{entry.label}</span>
          <span
            aria-hidden
            className={`absolute inset-x-0 bottom-1 h-[2px] origin-center rounded-full bg-[#D4E012] transition-all duration-300 ${
              isActive ? "scale-x-100 opacity-70" : "scale-x-0 opacity-100 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            }`}
          />
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <button
        ref={ref}
        id={`nav-trigger-${entry.key}`}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={isOpen ? controlsId : undefined}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={`group relative flex cursor-pointer items-center gap-1.5 whitespace-nowrap py-3 transition-colors duration-200 focus:outline-none focus-visible:text-[#D4E012] ${
          isOpen || isActive ? "text-[#D4E012]" : "text-slate-100 hover:text-[#D4E012]"
        }`}
      >
        <span>{entry.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-1 h-[2px] origin-center rounded-full bg-[#D4E012] transition-all duration-300 ${
            isOpen
              ? "scale-x-100 opacity-100 shadow-[0_0_8px_rgba(212,224,18,0.7)]"
              : isActive
                ? "scale-x-100 opacity-70"
                : "scale-x-0 opacity-100 group-hover:scale-x-100 group-focus-visible:scale-x-100"
          }`}
        />
      </button>
    </li>
  );
});

export default NavItem;
