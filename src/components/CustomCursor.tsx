"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

/**
 * Renders the ring + dot and drives them with rAF-smoothed mouse tracking.
 * Hidden entirely on touch/coarse-pointer devices via CSS (see module.css),
 * so this never has to guess "is this mobile" from viewport width.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`;
      }
    };

    const tick = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hover]") && ringRef.current) {
        ringRef.current.classList.add(styles.hover);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hover]") && ringRef.current) {
        ringRef.current.classList.remove(styles.hover);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ringPos} aria-hidden="true">
        <div className={styles.ringShape} />
      </div>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
