"use client";

import { ReactNode } from "react";

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
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
