"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Reveal from "./Reveal";
import { useMagnetic } from "@/lib/useMagnetic";
import shared from "./shared.module.css";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const submitRef = useMagnetic<HTMLButtonElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Reveal as="section" id="contact" className={styles.section}>
      <div className={styles.header}>
        <div className={shared.eyebrow}>Start A Project</div>
        <h2 className={`serif ${styles.heading}`}>Let&rsquo;s texture your next space.</h2>
        <p className={styles.body}>
          Tell us about the project — we&rsquo;ll follow up quietly, no hard sell.
        </p>
      </div>

      {submitted ? (
        <div className={styles.confirmation}>
          <p className={`serif ${styles.confirmationText}`}>
            Noted, quietly. We&rsquo;ll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Name
              <input type="text" name="name" required className={styles.input} />
            </label>
            <label className={styles.label}>
              Email
              <input type="email" name="email" required className={styles.input} />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>
              I am a&hellip;
              <select name="role" className={styles.input}>
                <option>Architect / Interior Designer</option>
                <option>Homeowner</option>
                <option>Other</option>
              </select>
            </label>
            <label className={styles.label}>
              Project interest
              <select name="interest" className={styles.input}>
                <option>Lime Plaster</option>
                <option>Lime Wash</option>
                <option>Microcement</option>
                <option>Oro Texture</option>
                <option>Not sure yet</option>
              </select>
            </label>
          </div>
          <label className={styles.label}>
            Tell us about the space
            <textarea name="message" rows={3} className={styles.textarea} />
          </label>
          <button
            type="submit"
            data-cursor-hover
            data-magnetic="true"
            ref={submitRef}
            className={styles.submit}
          >
            Send enquiry
          </button>
        </form>
      )}
    </Reveal>
  );
}
