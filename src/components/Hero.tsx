"use client";

import { useRef } from "react";
import LazyVideo from "./LazyVideo";
import { usePinnedScroll } from "@/lib/usePinnedScroll";
import styles from "./Hero.module.css";

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}

function applyReveal(el: HTMLElement | null, p: number, start: number, end: number) {
  if (!el) return;
  const t = clamp((p - start) / (end - start), 0, 1);
  el.style.opacity = String(t);
  el.style.transform = `translateY(${(1 - t) * 26}px)`;
}

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  usePinnedScroll(wrapperRef, (p) => {
    applyReveal(eyebrowRef.current, p, 0, 0.28);
    applyReveal(line1Ref.current, p, 0.12, 0.4);
    applyReveal(line2Ref.current, p, 0.42, 0.68);
    applyReveal(subRef.current, p, 0.52, 0.8);
    if (cueRef.current) {
      const cueT = clamp((p - 0.6) / 0.3, 0, 1);
      cueRef.current.style.opacity = String(1 - cueT);
    }
  });

  return (
    <section id="top" className={styles.hero}>
      <div ref={wrapperRef} className={styles.pinWrapper}>
        <div className={styles.sticky}>
          <div className={styles.videoWrap}>
            <LazyVideo name="hero-oro-reveal" priority />
          </div>
          <div className={styles.scrim} />
          <div className={styles.content}>
            <div ref={eyebrowRef} className={styles.eyebrow}>
              Ahmedabad &middot; Since 1996
            </div>
            <h1 className={`serif ${styles.title}`}>
              <span ref={line1Ref} className={styles.titleLine}>
                Start with texture.
              </span>
              <span ref={line2Ref} className={styles.titleLine}>
                Start with Texto.
              </span>
            </h1>
            <p ref={subRef} className={styles.subtitle}>
              Lime Plaster &middot; Lime Wash &middot; Microcement &middot; Oro Texture &mdash;
              hand-finished surfaces for architects, designers, and the spaces they imagine.
            </p>
          </div>
          <a ref={cueRef} href="#services" data-cursor-hover className={styles.scrollCue}>
            <span>Scroll</span>
            <svg width="14" height="22" viewBox="0 0 14 22">
              <line x1="7" y1="0" x2="7" y2="20" stroke="currentColor" strokeWidth="1.2" />
              <polyline points="2,15 7,20 12,15" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
