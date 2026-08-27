import LazyVideo from "./LazyVideo";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.videoWrap}>
        <LazyVideo name="hero-oro-reveal" priority />
      </div>
      <div className={styles.scrim} />
      <div className={styles.content}>
        <div className={styles.eyebrow}>Ahmedabad &middot; Since 1996</div>
        <h1 className={`serif ${styles.title}`}>
          Start with texture.
          <br />
          Start with Texto.
        </h1>
        <p className={styles.subtitle}>
          Lime Plaster &middot; Lime Wash &middot; Microcement &middot; Oro Texture &mdash;
          hand-finished surfaces for architects, designers, and the spaces they imagine.
        </p>
      </div>
      <a href="#services" data-cursor-hover className={styles.scrollCue}>
        <span>Scroll</span>
        <svg width="14" height="22" viewBox="0 0 14 22">
          <line x1="7" y1="0" x2="7" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <polyline points="2,15 7,20 12,15" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </a>
    </section>
  );
}
