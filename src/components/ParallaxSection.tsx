"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // Y offset speed in pixels
  className?: string;
  bgImage?: string;
  bgOverlayClass?: string;
}

export default function ParallaxSection({
  children,
  speed = 40,
  className = "",
  bgImage,
  bgOverlayClass = "bg-slate-950/70",
}: ParallaxSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={targetRef} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full pointer-events-none"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div className={`absolute inset-0 ${bgOverlayClass}`} />
        </motion.div>
      )}

      <motion.div style={{ y: contentY }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  );
}
