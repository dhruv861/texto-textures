import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";
import shared from "./shared.module.css";
import styles from "./CraftSection.module.css";

const FIGURES = [
  { video: "craft-process", caption: "On site. This is where it all begins." },
  { video: "oro-refined", caption: "Hands, before the final shot." },
];

export default function CraftSection() {
  return (
    <Reveal as="section" id="craft" className={styles.section}>
      <div className={shared.wrap}>
        <div className={shared.eyebrowOnDark}>How It&rsquo;s Made</div>
        <h2 className={`serif ${styles.heading}`}>Texture, before it&rsquo;s finished.</h2>
        <p className={styles.lead}>
          Behind every finished wall, there&rsquo;s a lot of hands, effort, and detail. This is
          what we love doing at Texto.
        </p>
        <div className={styles.grid}>
          {FIGURES.map((f) => (
            <figure key={f.video} className={styles.figure}>
              <div className={styles.figureVideo}>
                <LazyVideo name={f.video} />
              </div>
              <figcaption className={styles.caption}>{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
