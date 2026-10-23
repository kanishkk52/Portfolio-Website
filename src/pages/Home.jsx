
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { projects, categories } from "../data/projects";
import ContactCTA from "../components/ContactCTA";
import Constellation from "../components/Constellation";

export default function Home({ theme, onToggleTheme }) {
  const [activeCategory, setActiveCategory] = useState("All Work");

  const toggleTheme = () => {
    const changeTheme = () => {
      setTheme((current) =>
        current === "light" ? "dark" : "light"
      );
    };

    if (
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(changeTheme);
    } else {
      changeTheme();
    }
  };

  const visibleProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All Work" ||
      project.category === activeCategory;

    return matchesCategory && project.featured;
  });

  return (
    <div className={`app-shell theme-${theme}`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main>
        {/* HERO */}
        <section className="hero page-shell">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            INDEPENDENT DESIGNER · INDIA
          </div>

          <h1>
            I make things
            <br />
            <span className="hero-italic">mean</span> something.
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              Exploring the space between thoughtful strategy,
              visual identity, and expressive design. Creating
              work that looks different because it thinks
              differently.
            </p>

            <a className="text-link" href="#work">
              Explore selected work <span>↓</span>
            </a>
          </div>

          <div className="hero-index">
            <span>PORTFOLIO</span>
            <span>2023 — 2026</span>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="selected-work" className="selected-work-section page-shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                01 / THE ARCHIVE
              </span>

              <h2>
                Selected work<span className="period">.</span>
              </h2>
            </div>

            <span className="work-count">
              {String(visibleProjects.length).padStart(2, "0")} PROJECTS
            </span>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="filter-list" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PROJECT GALLERY */}
          <div className="project-grid">
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))
            ) : (
              <p className="empty-state">
                No featured projects in this category yet.
                More work is on its way.
              </p>
            )}
          </div>
        </section>

        
{/* ABOUT */}
<section id="about" className="about-section">
   <Constellation />
  <div className="page-shell about-inner">
    <span className="section-kicker">
      02 / A LITTLE ABOUT ME
    </span>

    <div className="about-layout">
      <div className="about-content">
        <h2>
          Curious by nature.
          <br />
          <span className="hero-highlight-word">Intentional</span> {" "} by design.
        </h2>

        <div className="about-bottom">
          <p>
            I'm an independent graphic designer interested in
            building visual identities, digital experiences,
            and tangible things. My approach moves between
            minimalism, experimentation, and whatever best
            serves the idea.
          </p>

          <a href="#contact" className="text-link">
            Let's connect <span>↗</span>
          </a>
        </div>
      </div>

      

<div className="about-portrait">
  <img
    src="/images/profile.png"
    alt="Portrait of Kanishk Kukreja"
    loading="lazy"
  />

  <div className="portrait-name-overlay">
    <span className="portrait-name-label" >THE DESIGNER</span>
    <h3>
      KANISHK<br></br>
      KUKREJA
    </h3>

  </div>
</div>

    </div>
  </div>
</section>


      </main>
      <ContactCTA />
      <Footer />
    </div>
  );
}
