import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";
import shared from "./shared.module.css";
import styles from "./SocialSection.module.css";

const POSTS = [
  { video: "microcement-blue", engagement: "4,431 engagement" },
  { video: "lime-plaster-clean", engagement: "2,923 engagement" },
  { video: "hero-oro-reveal", engagement: "2,343 engagement" },
  { video: "rammed-earth", engagement: "1,058 engagement" },
];

export default function SocialSection() {
  return (
    <Reveal as="section" className={`${shared.wrap} ${styles.section}`}>
      <div className={styles.header}>
        <div className={shared.eyebrow}>@texto_texture</div>
        <h2 className={`serif ${styles.heading}`}>26,604 followers. One craft.</h2>
      </div>
      <div className={styles.grid}>
        {POSTS.map((post) => (
          <div key={post.video} data-cursor-hover className={styles.cell}>
            <LazyVideo name={post.video} />
            <div className={styles.badge}>{post.engagement}</div>
          </div>
        ))}
        <a
          href="https://www.instagram.com/texto_texture/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className={styles.followCell}
        >
          <span className="serif">Follow the making of &#8599;</span>
        </a>
      </div>
    </Reveal>
  );
}
