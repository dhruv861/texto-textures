"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/**
 * Drives a scroll-scrubbed "pin and reveal" section. `wrapperRef` is a tall
 * (e.g. 240vh) element; as the user scrolls through it, `onProgress` is
 * called with how far through it they are, in [0, 1]. Scroll/resize events
 * only flag a re-check; the actual work happens at most once per animation
 * frame, so fast scrolling doesn't flood the callback.
 *
 * A no-op under prefers-reduced-motion — the section is left in whatever
 * static state its default CSS/markup renders (see Hero and
 * ServicesSection), so nothing here fights a screen full of motion.
 */
export function usePinnedScroll(
  wrapperRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void
) {
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let dirty = true;
    let raf = 0;

    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      onProgressRef.current(progress);
    };

    const loop = () => {
      if (dirty) {
        dirty = false;
        update();
      }
      raf = requestAnimationFrame(loop);
    };

    const markDirty = () => {
      dirty = true;
    };

    window.addEventListener("scroll", markDirty, { passive: true });
    window.addEventListener("resize", markDirty);
    loop();

    return () => {
      window.removeEventListener("scroll", markDirty);
      window.removeEventListener("resize", markDirty);
      cancelAnimationFrame(raf);
    };
  }, [wrapperRef]);
}
