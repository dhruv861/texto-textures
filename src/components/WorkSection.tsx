import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";
import shared from "./shared.module.css";
import styles from "./WorkSection.module.css";

const CASE_STUDIES = [
  {
    title: "The Earthy नेस्ट",
    tag: "Case Study — 01 · Residential",
    kind: "quote" as const,
    quotes: [
      "“Luxury isn’t always marble, chandeliers, or grand gestures. Sometimes it’s the quiet comfort of a warm palette, the richness of natural wood, the softness of textured walls.”",
      "“The best views in a home aren’t always out the window — they’re the ones intentionally framed within it.”",
    ],
    body: "Across the living room, dining corner and bar, one material story: warm palettes, natural wood, and hand-finished walls that let a space speak without saying a word.",
    credits: [
      ["Design", "Studio Knest (@kunal423, @b_nidhi22, @studioknest)"],
      ["Photography", "@evolve.studio_"],
      ["Furniture", "@malan.furniture, @orangetreehomes"],
      ["Lighting", "@esqrolightingco"],
      ["Wall Art", "@bestofbharat"],
      ["Texture", "Texto Textures"],
    ],
  },
  {
    title: "GULRANG",
    tag: "Case Study — 02 · by Spacestry",
    kind: "video" as const,
    video: "gulrang-bungalow",
    body: "No noise. No pretence. Just a long, quiet exhale. A bungalow reimagined — its footprint preserved, yet its boundaries softened. Walls now give way to air, to light, to effortless connection.",
    credits: [
      ["Design", "Studio Spacestry"],
      ["Photography", "@onthemoveisland"],
      ["Styling", "@shimonee_"],
      ["Furniture", "@comforto_furniture_"],
      ["Wall Texture", "Texto Textures"],
    ],
  },
  {
    title: "Foodaholics × Garba",
    tag: "Case Study — 03 · Experiential",
    kind: "video" as const,
    video: "garba-wall",
    loop: false,
    body: "Walls that speak the language of design. For Foodaholics’ Navratri Garba, we crafted a texture wall that wasn’t decor — it was an experience, built to set the backdrop for celebration and culture.",
    credits: [
      ["Client", "@foodaholics.og"],
      ["Event", "Navratri Garba"],
      ["Texture", "Texto Textures"],
    ],
  },
];

const APPLICATIONS = [
  { label: "Residential", video: "suede-limewash-kids" },
  { label: "Hospitality & Retail", video: "jewelry-showroom" },
  { label: "Wet Areas & Bathrooms", video: "bathroom-boutique" },
];

export default function WorkSection() {
  return (
    <section id="work" className={`${shared.wrap} ${styles.section}`}>
      <Reveal className={styles.intro}>
        <div className={shared.eyebrow}>Selected Work</div>
        <h2 className={`serif ${shared.heading}`} style={{ margin: 0 }}>
          Spaces we&rsquo;ve shaped.
        </h2>
      </Reveal>

      {CASE_STUDIES.map((cs) => (
        <Reveal key={cs.title} className={styles.caseStudy}>
          <div className={styles.caseHeader}>
            <div className={`serif ${styles.caseTitle}`}>{cs.title}</div>
            <div className={styles.caseTag}>{cs.tag}</div>
          </div>

          {cs.kind === "quote" ? (
            <div className={styles.quoteBlock}>
              <p className={`serif ${styles.quotePrimary}`}>{cs.quotes[0]}</p>
              <p className={`serif ${styles.quoteSecondary}`}>{cs.quotes[1]}</p>
            </div>
          ) : (
            <div className={styles.caseMedia}>
              <LazyVideo name={cs.video} loop={cs.loop ?? true} />
            </div>
          )}

          <div className={styles.caseBody}>
            <p className={styles.caseText}>{cs.body}</p>
            <div className={styles.credits}>
              {cs.credits.map(([label, value]) => (
                <div key={label}>
                  <span className={styles.creditLabel}>{label}</span> &mdash; {value}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal className={styles.applications}>
        <div className={styles.applicationsHeader}>
          <h3 className={`serif ${styles.applicationsTitle}`}>
            Residential. Hospitality. Wet areas. Furniture.
          </h3>
          <div className={styles.applicationsTag}>Where It Lives</div>
        </div>
        <div className={styles.grid}>
          {APPLICATIONS.map((app) => (
            <div key={app.label} className={styles.gridCell}>
              <LazyVideo name={app.video} />
              <div className={styles.gridLabel}>{app.label}</div>
            </div>
          ))}
          <div className={styles.furnitureCell}>
            <div className={styles.gridLabel}>Furniture</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
