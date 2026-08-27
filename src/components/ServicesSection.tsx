"use client";

import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";
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
    reverse: false,
  },
  {
    index: "02",
    name: "Lime Wash",
    title: "A finish that changes with the light.",
    body: "Cloudy, layered, alive — morning, afternoon and evening each read differently on a limewashed wall. Available in our Suede Limewash variant for a softer, more tactile hand.",
    quote: "“Cloudy hues, endless depth.”",
    video: "limewash-dining",
    reverse: true,
  },
  {
    index: "03",
    name: "Microcement",
    title: "Seamless, from wall to floor.",
    body: "Zero joints, zero grout lines — one continuous surface across walls, floors and even furniture. Sealed for wet areas, built for bathrooms that feel like boutique hotels.",
    quote: "“From sample to space, executed exactly as envisioned.”",
    video: "microcement-blue",
    reverse: false,
  },
] as const;

export default function ServicesSection() {
  const oroCtaRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section id="services" className={`${shared.wrap} ${styles.section}`}>
      <Reveal className={styles.intro}>
        <div className={shared.eyebrow}>What We Do</div>
        <h2 className={`serif ${shared.heading}`}>Four finishes. One language of texture.</h2>
        <p className={shared.lead}>
          Lime Plaster, Lime Wash, Microcement, and our signature Oro Texture — each applied by
          hand, each suited to a different mood.
        </p>
      </Reveal>

      {FINISHES.map((f) => (
        <Reveal key={f.name} className={styles.row}>
          <div className={`${styles.media} ${f.reverse ? styles.mediaReverse : ""}`}>
            <LazyVideo name={f.video} />
          </div>
          <div className={f.reverse ? styles.textReverse : undefined}>
            <div className={`serif ${styles.index}`}>{f.index} &mdash; {f.name}</div>
            <h3 className={`serif ${styles.title}`}>{f.title}</h3>
            <p className={styles.body}>{f.body}</p>
            <p className={`serif ${styles.quote}`}>{f.quote}</p>
          </div>
        </Reveal>
      ))}

      <Reveal className={styles.signature}>
        <div className={`serif ${styles.index}`}>04 &mdash; Signature</div>
        <div className={`serif ${styles.oroTitle}`}>Oro Texture</div>
        <p className={styles.signatureBody}>
          A single texture crafted in multiple moods — from soft pastels to warm luxury tones.
          Not a variation. A product of its own.
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
      </Reveal>
    </section>
  );
}
