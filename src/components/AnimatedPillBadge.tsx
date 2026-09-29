"use client";

import React from "react";

interface AnimatedPillBadgeProps {
  children: React.ReactNode;
  className?: string;
  darkBg?: boolean;
}

export default function AnimatedPillBadge({
  children,
  className = "",
  darkBg = false,
}: AnimatedPillBadgeProps) {
  return (
    <div className={`relative inline-flex items-center justify-center p-[1.5px] overflow-hidden rounded-full shadow-sm group ${className}`}>
      {/* Rotating Traveling Gradient Light Beam along boundary border (Sarhat Lime & Green Colors) */}
      <span className="absolute inset-[-200%] animate-border-spin bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,#D4E012_315deg,#5EE72D_360deg)] pointer-events-none" />

      {/* Inner Pill Content Box */}
      <div
        className={`relative z-10 inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-2.5 rounded-full font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors ${
          darkBg
            ? "bg-slate-900 text-[#D4E012]"
            : "bg-white text-[#707B00]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
