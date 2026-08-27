import Reveal from "./Reveal";
import styles from "./IntroQuote.module.css";

export default function IntroQuote() {
  return (
    <Reveal as="section" className={styles.section}>
      <p className={`serif ${styles.quote}`}>
        Organic. Matte.
        <br />
        Quietly luxurious.
      </p>
      <p className={styles.body}>
        Every wall tells a story. This one speaks in texture &mdash; hand-applied by a studio
        working exclusively in surface finishing since 1996.
      </p>
    </Reveal>
  );
}
