"use client";

import { useRef, useState } from "react";
import LazyVideo from "./LazyVideo";
import { usePinnedScroll } from "@/lib/usePinnedScroll";
import { useMagnetic } from "@/lib/useMagnetic";
import shared from "./shared.module.css";
import styles from "./ServicesSection.module.css";

const FINISHES = [
  {
    index: "01",
    name: "Lime Plaster",
    title: "Walls that breathe.",
    body: "A breathable, mineral finish with soft, cloud-like depth. Hand-troweled, never sprayed — built to outlast paint, one room at a time.",
    quote: "“POV: you chose lime plaster instead of paint.”",
    video: "lime-plaster-clean",
  },
  {
    index: "02",
    name: "Lime Wash",
    title: "A finish that changes with the light.",
    body: "Cloudy, layered, alive — morning, afternoon and evening each read differently on a limewashed wall. Available in our Suede Limewash variant for a softer, more tactile hand.",
    quote: "“Cloudy hues, endless depth.”",
    video: "limewash-dining",
  },
  {
    index: "03",
    name: "Microcement",
    title: "Seamless, from wall to floor.",
    body: "Zero joints, zero grout lines — one continuous surface across walls, floors and even furniture. Sealed for wet areas, built for bathrooms that feel like boutique hotels.",
    quote: "“From sample to space, executed exactly as envisioned.”",
    video: "microcement-blue",
  },
] as const;

const STEPS = FINISHES.length + 1;

export default function ServicesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const oroCtaRef = useMagnetic<HTMLAnchorElement>();

  usePinnedScroll(wrapperRef, (p) => {
    const step = Math.min(Math.floor(p * STEPS), STEPS - 1);
    setActive((prev) => (prev === step ? prev : step));
  });

  return (
    <section id="services" className={styles.section}>
      <div ref={wrapperRef} className={styles.pinWrapper}>
        <div className={`${shared.wrap} ${styles.sticky}`}>
          <div className={styles.intro}>
            <div className={shared.eyebrow}>What We Do</div>
            <h2 className={`serif ${styles.heading}`}>Four finishes. One language of texture.</h2>
            <p className={`${shared.lead} ${styles.desktopOnly}`}>
              Lime Plaster, Lime Wash, Microcement, and our signature Oro Texture — each applied
              by hand, each suited to a different mood.
            </p>
          </div>

          <div className={styles.panelStage}>
            {FINISHES.map((f, i) => (
              <div
                key={f.name}
                className={`${styles.panel} ${i === active ? styles.panelActive : ""}`}
              >
                <div className={styles.panelMedia}>
                  <LazyVideo name={f.video} />
                </div>
                <div className={styles.panelText}>
                  <div className={`serif ${styles.index}`}>
                    {f.index} &mdash; {f.name}
                  </div>
                  <h3 className={`serif ${styles.title}`}>{f.title}</h3>
                  <p className={`${styles.body} ${styles.desktopOnly}`}>{f.body}</p>
                  <p className={`serif ${styles.quote} ${styles.desktopOnly}`}>{f.quote}</p>
                </div>
              </div>
            ))}

            <div
              className={`${styles.panel} ${active === FINISHES.length ? styles.panelActive : ""}`}
            >
              <div className={styles.panelMedia}>
                <LazyVideo name="oro-shades-reveal" />
              </div>
              <div className={styles.panelText}>
                <div className={`serif ${styles.index}`}>04 &mdash; Signature</div>
                <h3 className={`serif ${styles.oroTitle}`}>Oro Texture</h3>
                <p className={`${styles.body} ${styles.desktopOnly}`}>
                  A single texture crafted in multiple moods — from soft pastels to warm luxury
                  tones. Not a variation. A product of its own.
                </p>
                <a
                  href="#oro"
                  data-cursor-hover
                  data-magnetic="true"
                  ref={oroCtaRef}
                  className={styles.oroCta}
                >
                  See Shades of Oro &darr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
