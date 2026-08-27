import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";
import shared from "./shared.module.css";
import styles from "./StudioSection.module.css";

const STATS = [
  { value: "26,604", label: "Followers" },
  { value: "Verified", label: "Instagram Studio" },
  { value: "328", label: "Projects Shared" },
  { value: "1996", label: "Est. In Ahmedabad" },
];

const PARTNERS = [
  "@workshop.inc",
  "@studio_in_dtale",
  "@studioknest",
  "Spacestry",
  "@terrafirma.architects",
  "@cuberdesign",
  "@projectsthreefourteen",
];

export default function StudioSection() {
  return (
    <section id="studio" className={`${shared.wrap} ${styles.section}`}>
      <Reveal className={styles.intro}>
        <div>
          <div className={shared.eyebrow}>Since 1996</div>
          <h2 className={`serif ${styles.heading}`}>
            Thirty years of texture, one wall at a time.
          </h2>
          <p className={styles.body}>
            From our very first project, to homes, hotels and spaces we once only dreamed of —
            every step forward was possible because of the architects who trusted our craft, the
            designers who believed in our vision, and the clients who welcomed Texto into their
            spaces.
          </p>
        </div>
        <div className={styles.heroVideo}>
          <LazyVideo name="milestone-20k" loop={false} />
        </div>
      </Reveal>

      <Reveal className={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label}>
            <div className={`serif ${styles.statValue}`}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </Reveal>

      <Reveal className={styles.partners}>
        <div className={styles.partnersLabel}>Trusted By Architects &amp; Designers</div>
        <div className={styles.partnersList}>
          {PARTNERS.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
