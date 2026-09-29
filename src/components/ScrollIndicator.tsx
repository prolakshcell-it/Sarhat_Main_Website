"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  targetId?: string;
  onClick?: () => void;
  opacity?: MotionValue<number>;
  filter?: MotionValue<string>;
  className?: string;
}

export default function ScrollIndicator({
  targetId,
  onClick,
  opacity,
  filter,
  className = "",
}: ScrollIndicatorProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
      return;
    }
    if (targetId) {
      const cleanId = targetId.replace(/^#/, "");
      const el = document.getElementById(cleanId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Fallback: smooth scroll down 1 viewport height
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const indicatorContent = (
    <a
      href={targetId ? `#${targetId.replace(/^#/, "")}` : "#content"}
      onClick={handleClick}
      aria-label="Scroll down to view content"
      className="flex flex-col items-center gap-1 cursor-pointer group"
    >
      <div className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border-2 border-white/50 group-hover:border-[#D4E012] flex justify-center pt-1.5 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-colors">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-1.5 rounded-full bg-[#D4E012] shadow-[0_0_8px_#D4E012]"
        />
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-[#D4E012] animate-bounce -mt-0.5" />
    </a>
  );

  if (opacity !== undefined || filter !== undefined) {
    return (
      <motion.div
        style={{ opacity, filter }}
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 will-change-transform flex justify-center pointer-events-auto ${className}`}
      >
        {indicatorContent}
      </motion.div>
    );
  }

  return (
    <div className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex justify-center pointer-events-auto ${className}`}>
      {indicatorContent}
    </div>
  );
}
