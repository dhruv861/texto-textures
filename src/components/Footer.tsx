import shared from "./shared.module.css";
import styles from "./Footer.module.css";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#craft", label: "Craft" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${shared.wrap} ${styles.inner}`}>
        <div className={`serif ${styles.logo}`}>
          Texto <span className={styles.accentItalic}>Textures</span>
        </div>
        <nav className={styles.nav}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} data-cursor-hover>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.copy}>
          &copy; 2026 Texto Textures &middot; Ahmedabad, India &middot;{" "}
          <a
            href="https://www.instagram.com/texto_texture/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className={styles.instaLink}
          >
            Instagram &#8599;
          </a>
        </div>
      </div>
    </footer>
  );
}
