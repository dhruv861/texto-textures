"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#oro", label: "Oro", accent: true },
  { href: "#work", label: "Work" },
  { href: "#craft", label: "Craft" },
  { href: "#studio", label: "Studio" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const enquireRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#top" data-cursor-hover className={`serif ${styles.logo}`}>
          Texto <span className={styles.accentItalic}>Textures</span>
        </a>

        <nav className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              className={link.accent ? `serif ${styles.accentItalic}` : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-cursor-hover
            data-magnetic="true"
            ref={enquireRef}
            className={styles.enquire}
          >
            Enquire
          </a>
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          data-cursor-hover
          className={styles.menuToggle}
        >
          <svg width="20" height="14" viewBox="0 0 20 14">
            <line x1="0" y1="1" x2="20" y2="1" stroke="var(--ink)" strokeWidth="1.4" />
            <line x1="0" y1="7" x2="20" y2="7" stroke="var(--ink)" strokeWidth="1.4" />
            <line x1="0" y1="13" x2="20" y2="13" stroke="var(--ink)" strokeWidth="1.4" />
          </svg>
        </button>
      </header>

      <div className={styles.mobileMenu} data-open={menuOpen} inert={!menuOpen}>
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={styles.closeButton}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <line x1="1" y1="1" x2="19" y2="19" stroke="var(--ink)" strokeWidth="1.4" />
            <line x1="19" y1="1" x2="1" y2="19" stroke="var(--ink)" strokeWidth="1.4" />
          </svg>
        </button>
        {[...NAV_LINKS, { href: "#contact", label: "Contact" }].map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{ "--stagger-index": i } as CSSProperties}
            className={`serif ${styles.mobileLink} ${link.accent ? styles.accentItalic : ""}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
