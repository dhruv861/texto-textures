"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle pointer-follow effect for CTA buttons/links, plus a tactile
 * press-down scale on click. Both write the same inline `transform`, so
 * they're composed together here rather than as a separate CSS `:active`
 * rule — a stylesheet `:active` would just lose to whichever inline value
 * the pointer-follow set last.
 *
 * Attaches native listeners in an effect (rather than exposing ref-closing
 * JSX handler props) so it plays nicely with the react-hooks/refs rule and
 * never reads `ref.current` during render.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let followX = 0;
    let followY = 0;
    let pressed = false;

    const apply = (transition: string) => {
      el.style.transition = transition;
      const scale = pressed ? " scale(0.96)" : "";
      el.style.transform = `translate(${followX}px, ${followY}px)${scale}`;
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      followX = (e.clientX - (r.left + r.width / 2)) * 0.25;
      followY = (e.clientY - (r.top + r.height / 2)) * 0.35;
      apply("transform 0.12s linear");
    };

    const onMouseLeave = () => {
      followX = 0;
      followY = 0;
      pressed = false;
      apply("transform 0.6s cubic-bezier(.16,.8,.24,1)");
    };

    const onPointerDown = () => {
      pressed = true;
      apply("transform 0.1s ease");
    };

    const onPointerUp = () => {
      pressed = false;
      apply("transform 0.3s cubic-bezier(.16,.8,.24,1)");
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return ref;
}
