"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Safely resolves target elements by hash ID with backward-compatible aliases.
 */
export const resolveTarget = (hash: string): HTMLElement | null => {
  if (!hash || !hash.startsWith("#")) return null;
  const clean = hash.trim();
  let el = document.querySelector(clean) as HTMLElement | null;
  if (el) return el;

  // Semantic Aliases Mapping
  const aliases: Record<string, string> = {
    "#renewable-energy": "#solar-energy",
    "#solar": "#solar-energy",
    "#bess-storage": "#bess-hybrid",
    "#bess": "#bess-hybrid",
    "#storage": "#bess-hybrid",
    "#energy-infrastructure": "#infrastructure",
    "#civil-infrastructure": "#infrastructure",
    "#infra": "#infrastructure",
    "#project-overview": "#overview",
    "#project-highlights": "#highlights",
    "#explore-projects": "#explore",
    "#footprints": "#footprint",
    "#openings": "#current-openings",
    "#jobs": "#current-openings",
    "#application": "#apply",
    "#partner-form": "#apply",
    "#principles": "#delivery-principles",
    "#workflow": "#lifecycle",
  };

  const aliasTarget = aliases[clean];
  if (aliasTarget) {
    el = document.querySelector(aliasTarget) as HTMLElement | null;
  }
  return el;
};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable native browser scroll restoration to prevent landing at arbitrary scroll offsets on navigation
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Scroll to section with retry mechanism to accommodate async DOM mounting
    const scrollToHashWithRetry = (hash: string) => {
      if (!hash) return;
      let attempts = 0;
      const maxAttempts = 20;

        const performScroll = () => {
          attempts++;
          const targetElement = resolveTarget(hash);
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -90,
              duration: 1.0,
            });

            // Second pass after layout settles to guarantee pixel-perfect alignment below navbar
            setTimeout(() => {
              const finalEl = resolveTarget(hash);
              if (finalEl) {
                lenis.scrollTo(finalEl, {
                  offset: -90,
                  duration: 0.4,
                });
              }
            }, 400);
          } else if (attempts < maxAttempts) {
            setTimeout(performScroll, 80);
          }
        };

        performScroll();
      };

          // On initial mount:
          if (typeof window !== "undefined") {
            const hash = window.location.hash;
            if (hash) {
              scrollToHashWithRetry(hash);
            } else {
              // Guarantee page begins at the very top (Hero Section)
              window.scrollTo(0, 0);
              lenis.scrollTo(0, { immediate: true });
            }
          }

            // Handle hash change events (e.g. browser back/forward or hash change)
            const handleHashOrPopState = () => {
              const hash = window.location.hash;
              if (hash) {
                scrollToHashWithRetry(hash);
              } else {
                lenis.scrollTo(0, { duration: 0.8 });
              }
            };
            window.addEventListener("hashchange", handleHashOrPopState);
            window.addEventListener("popstate", handleHashOrPopState);

            // Handle anchor link clicks smoothly across same-page and sub-tab targets
            const handleAnchorClick = (e: MouseEvent) => {
              const target = e.target as HTMLElement;
              const anchor = target.closest("a");
                  if (!anchor || !anchor.href) return;

                  try {
                    const url = new URL(anchor.href, window.location.href);
                    // Only handle internal links within the same origin
                    if (url.origin !== window.location.origin) return;

                    const isSamePage = url.pathname === window.location.pathname;

                    if (isSamePage) {
                      if (!url.hash || url.hash === "#" || url.hash === "#top") {
                        // User clicked the link to the CURRENT page (e.g. navbar tab or footer link)
                        e.preventDefault();
                        lenis.scrollTo(0, { duration: 1.0 });
                        window.history.pushState(null, "", url.pathname);
                      } else {
                        // User clicked a section hash on the CURRENT page (e.g. /solutions#solar-energy)
                        const targetElement = resolveTarget(url.hash);
                        if (targetElement) {
                          e.preventDefault();
                          lenis.scrollTo(targetElement, {
                            offset: -90,
                            duration: 1.0,
                          });
                          window.history.pushState(null, "", url.hash);
                        }
                      }
                    }
                } catch {
                  // Ignore invalid URLs
                }
              };

              document.addEventListener("click", handleAnchorClick, { capture: true });

  return () => {
    document.removeEventListener("click", handleAnchorClick, { capture: true });
    window.removeEventListener("hashchange", handleHashOrPopState);
    window.removeEventListener("popstate", handleHashOrPopState);
    cancelAnimationFrame(rafId);
    lenis.destroy();
    lenisRef.current = null;
    if (window.__lenis === lenis) {
      window.__lenis = undefined;
    }
  };
}, []);

// Whenever the route pathname changes, reset to Hero Section (top: 0) if no hash, or scroll to section if hash
useEffect(() => {
  if (!lenisRef.current) return;

  if (typeof window !== "undefined") {
    const hash = window.location.hash;
    if (hash) {
      let attempts = 0;
      const maxAttempts = 20;
      const tryScroll = () => {
        attempts++;
        const targetEl = resolveTarget(hash);
        if (targetEl && lenisRef.current) {
          lenisRef.current.scrollTo(targetEl, {
            offset: -90,
            duration: 1.0,
          });
        } else if (attempts < maxAttempts) {
          setTimeout(tryScroll, 80);
        }
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }
}, [pathname]);

return <>{children}</>;
}
