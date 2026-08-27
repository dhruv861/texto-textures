"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import shared from "./shared.module.css";
import styles from "./FaqSection.module.css";

const FAQS = [
  {
    q: "Is it waterproof?",
    a: "Yes — with the right sealing system, our finishes are designed for bathrooms and other wet areas.",
  },
  {
    q: "Will it crack or stain?",
    a: "When applied correctly on a proper base, the finish remains durable and long-lasting.",
  },
  {
    q: "Can this be done over existing tiles?",
    a: "In many cases, yes — depending on the condition of the surface underneath.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <Reveal as="section" className={styles.section}>
      <div className={styles.header}>
        <div className={shared.eyebrow}>Good To Know</div>
        <h2 className={`serif ${styles.heading}`}>A few things architects ask.</h2>
      </div>
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q} className={styles.item}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className={`serif ${styles.question}`}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              <span className={styles.sign}>{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && <p className={styles.answer}>{faq.a}</p>}
          </div>
        );
      })}
    </Reveal>
  );
}
