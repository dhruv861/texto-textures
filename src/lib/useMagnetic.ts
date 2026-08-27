"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle pointer-follow effect for CTA buttons/links. Attaches native
 * listeners in an effect (rather than exposing ref-closing JSX handler
 * props) so it plays nicely with the react-hooks/refs rule and never reads
 * `ref.current` during render.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      el.style.transition = "transform 0.12s linear";
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    };

    const onMouseLeave = () => {
      el.style.transition = "transform 0.6s cubic-bezier(.16,.8,.24,1)";
      el.style.transform = "translate(0,0)";
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return ref;
}
