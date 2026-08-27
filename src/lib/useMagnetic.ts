"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle pointer-follow effect for CTA buttons/links, plus a tactile
 * press-down scale on click. Both write the same inline `transform`, so
 * they're composed together here rather than as a separate CSS `:active`
 * rule — a stylesheet `:active` would just lose to whichever inline value
 * the pointer-follow set last.
 *
 * The follow itself is decorative mouse-tracking: skipped entirely under
 * prefers-reduced-motion and on coarse/no-hover pointers (a touch tap can
 * synthesize a single `mousemove` before `click`, and with no matching
 * `mouseleave` to reset it, that would leave the button nudged off-center).
 * Press feedback stays everywhere — it's short and confirms the tap
 * registered, not decorative movement.
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

    const canFollow =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let followX = 0;
    let followY = 0;
    let pressed = false;
    let pendingEvent: MouseEvent | null = null;
    let raf = 0;

    const apply = (transition: string) => {
      el.style.transition = transition;
      const scale = pressed ? " scale(0.96)" : "";
      el.style.transform = `translate(${followX}px, ${followY}px)${scale}`;
    };

    const onPointerDown = () => {
      pressed = true;
      apply("transform 0.1s var(--ease-out)");
    };

    const onPointerUp = () => {
      pressed = false;
      apply("transform 0.3s cubic-bezier(.16,.8,.24,1)");
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    if (!canFollow) {
      return () => {
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("pointercancel", onPointerUp);
      };
    }

    const tick = () => {
      raf = 0;
      const e = pendingEvent;
      if (!e) return;
      pendingEvent = null;
      const r = el.getBoundingClientRect();
      followX = (e.clientX - (r.left + r.width / 2)) * 0.25;
      followY = (e.clientY - (r.top + r.height / 2)) * 0.35;
      apply("transform 0.12s linear");
    };

    const onMouseMove = (e: MouseEvent) => {
      pendingEvent = e;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMouseLeave = () => {
      pendingEvent = null;
      followX = 0;
      followY = 0;
      pressed = false;
      apply("transform 0.3s cubic-bezier(.16,.8,.24,1)");
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
