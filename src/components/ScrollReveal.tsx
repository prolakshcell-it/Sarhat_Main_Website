"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
  /** Animate only the first time the element enters the viewport. */
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 50,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  // Keep reveals subtle: transform/opacity only, capped travel so nothing slides in from off-screen
  const d = Math.min(distance, 20);
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: d, x: 0 };
      case "down":
        return { y: -d, x: 0 };
      case "left":
        return { x: d, y: 0 };
      case "right":
        return { x: -d, y: 0 };
      default:
        return { y: d, x: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...(reduce ? {} : getInitialPosition()) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.2 : 0.6,
        delay: reduce ? 0 : Math.min(delay, 0.3),
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
