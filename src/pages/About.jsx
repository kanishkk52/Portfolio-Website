
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactCTA from "../components/ContactCTA";
import Constellation from "../components/Constellation";
const achievements = [
  {
    number: "01",
    title: "Academic Excellence",
    description: "Academic topper — add your preferred year or semester.",
    tag: "ACADEMICS",
  },
  {
    number: "02",
    title: "Creative Leadership",
    description: "Experience collaborating, organizing, and leading creative work.",
    tag: "LEADERSHIP",
  },
  {
    number: "03",
    title: "Learning by Building",
    description: "Exploring design, technology, and new ways to solve problems.",
    tag: "PERSONAL GROWTH",
  },
];

const skills = [
  {
    title: "Visual Design",
    items: ["Visual Identity", "Typography", "Layout Design", "Art Direction"],
  },
  {
    title: "Digital Design",
    items: ["UI Design", "Web Design", "Design Systems", "Prototyping"],
  },
  {
    title: "Softwares",
    items: ["Adobe Illustrator", "Adobe Photoshop", "Figma" , "Premiere Pro" , "Autodesk Fusion 360 "],
  },
  {
    title: "Creative Practice",
    items: ["Professional Photography", "Videography", "Drone" ,"Event Management"],
  },
  {
    title: "Technology",
    items: ["HTML & CSS", "JavaScript", "React", "Python"],
  },
  {
    title: "Languages I Speak",
    items: ["English", "Hindi", "Japanese"]
  },
  {
    title: "Other Skills",
    items: ["3D Printing", "3D Slicer"]
  },
];

const certifications = [
  {
    title: "Azure AI Fundamentals",
    issuer: "Microsoft",
    detail: "Certified in AI-900 : AI Fundamentals course.",
    url: "https://drive.google.com/file/d/1GulcO_96p8EMJecuaiUv4yxF1lMAD8i3/view?usp=sharing",
  },
  {
    title: "Database Management System",
    issuer: "NPTEL",
    detail: "Elite Certification in NPTEL 12-Week course on Database Management System.",
    url: "https://drive.google.com/file/d/1AUMsM2DwN4bQ5_v-LwHVo0Akx62Mok4f/view?usp=sharing",
  },
  {
    title: "Japani Bhasha",
    issuer: "NPTEL",
    detail: "Top Silver Elite Certificate holder in NPTEL 12-Week course on the Japanese Language.",
    url: "https://drive.google.com/file/d/1AUMsM2DwN4bQ5_v-LwHVo0Akx62Mok4f/view?usp=sharing",
  },
];

const explorations = [
  {
    title: "Photography",
    category: "VISUAL STORIES",
    image: "/images/about/photography-01.jpg",
    className: "exploration-tall",
  },
  {
    title: "Experiments",
    category: "PERSONAL WORK",
    image: "/images/about/experiments-01.jpg",
    className: "",
  },
  {
    title: "Frames & Places",
    category: "OBSERVATIONS",
    image: "/images/about/photography-02.jpg",
    className: "",
  },
];

export default function About({ theme, onToggleTheme }) {
  return (
    <div className={`app-shell theme-${theme}`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="about-page page-shell">
        <Link to="/" className="text-link about-back-link">
          ← Back to home
        </Link>

        {/* INTRODUCTION */}
        <section className="about-page-hero">
            {theme === "dark" && (
  <Constellation
    theme={theme}
    interactiveGlow
  />
)}
          <span className="section-kicker">
            A LITTLE MORE ABOUT ME
          </span>

          <h1>
            Curiosity is my
            <br />
            creative <span>process.</span>
          </h1>

          <div className="about-intro-grid">
            <div className="about-page-portrait"
            data-cursor-label="KANISHK KUKREJA"
            >
              <img
                src="/images/profile.png"
                alt="Portrait"
                className="about-page-portrait-image"
              />
              <span>DESIGNER · EXPLORER · CREATIVE</span>
            </div>

            <div className="about-intro-copy">
              <span className="section-kicker">
                THE PERSON BEHIND THE WORK
              </span>

              <h2>
                I like making things that have a point of view.
              </h2>

              <p>
                I'm interested in how ideas become visual
                experiences — through identity, typography,
                digital design, photography, and experimentation.
              </p>

              <p>
                I'm always learning, looking at things differently,
                and finding new ways to bring creativity and
                technology together.
              </p>

              <div className="about-quick-facts">
                <div>
                  <span>BASED IN</span>
                  <strong>India</strong>
                </div>

                <div>
                  <span>INTERESTED IN</span>
                  <strong>Design & Technology</strong>
                </div>

                <div>
                  <span>ALWAYS</span>
                  <strong>Learning something new</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        
{/* ACHIEVEMENTS */}
<section className="about-module">
  <div className="about-module-heading milestones-heading-row">
    <div>
      <span className="section-kicker">01 / MILESTONES</span>

      <h2>
        Things I've <span>achieved.</span>
      </h2>
    </div>

    <a
      href="https://drive.google.com/drive/folders/19yNcajupTizw22h52Am7EogrLsiswc5R?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="extra-certificates-button"
    >
      <span>EXTRA-CURRICULAR CERTIFICATES</span>
      <span className="extra-certificates-arrow">↗</span>
    </a>
  </div>

  <div className="achievement-grid">
    {achievements.map((item) => (
      <article className="achievement-card" key={item.number}>
        <div className="achievement-card-top">
          <span>{item.number}</span>
          <span>{item.tag}</span>
        </div>

        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className="achievement-arrow">↗</span>
      </article>
    ))}
  </div>
</section>


        {/* SKILLS */}
        <section className="about-module">
          <div className="about-module-heading">
            <span className="section-kicker">02 / MY TOOLKIT</span>
            <h2>
              Different skills.
              <br />
              <span>One perspective.</span>
            </h2>
          </div>

          <div className="skills-grid">
            {skills.map((group, index) => (
              <article className="skill-card" key={group.title}>
                <span className="skill-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{group.title}</h3>

                <div className="skill-tags">
                  {group.items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="about-module">
          <div className="about-module-heading">
            <span className="section-kicker">03 / CONTINUOUS LEARNING</span>
            <h2>
              Knowledge, <span>verified.</span>
            </h2>
          </div>

          <div className="certification-list">
            {certifications.map((certification, index) => (
              <article
                className="certification-card"
                key={certification.title}
              >
                <span className="certification-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{certification.title}</h3>
                  <p>{certification.issuer} · {certification.detail}</p>
                </div>

                {certification.url ? (
                  <a
                    href={certification.url}
                    target="_blank"
                    rel="noreferrer"
                    className="certification-link"
                  >
                    Verify ↗
                  </a>
                ) : (
                  <span className="certification-pending">
                    CREDENTIAL
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* PERSONAL WORK */}
        <section className="about-module">
          <div className="about-module-heading">
            <span className="section-kicker">04 / OUTSIDE THE FRAME</span>
            <h2>
              Beyond the <span>portfolio.</span>
            </h2>
            <p>
              Not everything needs to become a project.
              Some things are made simply to explore.
            </p>
          </div>

          <div className="exploration-grid">
            {explorations.map((item) => (
              <article
                className={`exploration-card ${item.className}`}
                key={item.title}
              >
                <div className="exploration-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <span>↗</span>
                </div>

                <div className="exploration-meta">
                  <div>
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="about-page-closing">
          <span className="section-kicker">05 / WHAT'S NEXT</span>

          <h2>
            Still exploring.
            <br />
            <span>Always creating.</span>
          </h2>

          <div className="about-closing-bottom">
            <p>
              I'm interested in new perspectives, meaningful
              collaborations, and opportunities to make something
              worth remembering.
            </p>

            {/* <Link to="/#contact" className="text-link">
              Let's talk <span>↗</span>
            </Link> */}
          </div>

          <Link to="/work" className="text-link">
            Explore selected work <span>↗</span>
          </Link>
        </section>
      </main>

      <ContactCTA />
      <Footer />
    </div>
  );
}
