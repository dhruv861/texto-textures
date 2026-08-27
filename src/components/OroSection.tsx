import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";
import shared from "./shared.module.css";
import styles from "./OroSection.module.css";

export default function OroSection() {
  return (
    <Reveal as="section" id="oro" className={styles.section}>
      <div className={shared.wrap}>
        <div className={shared.eyebrowOnDark}>Signature Finish</div>
        <h2 className={`serif ${styles.heading}`}>
          Shades of <span className={styles.accentItalic}>Oro.</span>
        </h2>
        <p className={styles.lead}>
          A single texture, crafted in multiple moods — from soft pastels to warm luxury tones.
          Details done quietly. Impact felt instantly.
        </p>
        <div className={styles.mainVideo}>
          <LazyVideo name="oro-shades-reveal" />
        </div>
        <div className={styles.figureWrap}>
          <figure className={styles.figure}>
            <div className={styles.figureVideo}>
              <LazyVideo name="oro-architect-office" />
            </div>
            <figcaption className={styles.caption}>
              Inside an architect&rsquo;s office — one tone, one mood, pure quiet luxury.
            </figcaption>
          </figure>
        </div>
      </div>
    </Reveal>
  );
}
