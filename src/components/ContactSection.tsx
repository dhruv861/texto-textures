"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Reveal from "./Reveal";
import { useMagnetic } from "@/lib/useMagnetic";
import shared from "./shared.module.css";
import styles from "./ContactSection.module.css";

type Errors = { name?: string; email?: string };

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const submitRef = useMagnetic<HTMLButtonElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Let us know who to ask for.";
    if (!email) nextErrors.email = "We'll need an email to follow up.";
    else if (!validateEmail(email)) nextErrors.email = "That email doesn't look complete.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
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
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Name
              <input
                type="text"
                name="name"
                aria-invalid={Boolean(errors.name)}
                onChange={() => errors.name && setErrors((e) => ({ ...e, name: undefined }))}
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </label>
            <label className={styles.label}>
              Email
              <input
                type="email"
                name="email"
                aria-invalid={Boolean(errors.email)}
                onChange={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
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
