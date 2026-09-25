"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function ScrollFadeSection({
  children,
  className = "",
  id,
}: ScrollFadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smoothly fade out, subtly scale down, and drift upward as the section exits at the top
  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-50px"]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ opacity, scale, y }}
      className={`will-change-transform origin-top ${className}`}
    >
      {children}
    </motion.div>
  );
}
