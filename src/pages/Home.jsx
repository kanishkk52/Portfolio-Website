
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { projects, categories } from "../data/projects";
import ContactCTA from "../components/ContactCTA";
import Constellation from "../components/Constellation";

export default function Home({ theme, onToggleTheme }) {
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [aboutIsActive, setAboutIsActive] = useState(false);

  // Activate the portrait while the About section is visible
  useEffect(() => {
    const aboutSection = document.getElementById("about");

    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setAboutIsActive(true);
          }, 350);
        } else {
          setAboutIsActive(false);
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(aboutSection);

    return () => observer.disconnect();
  }, []);

  const visibleProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All Work" ||
      project.category === activeCategory;

    return matchesCategory && project.featured;
  });

  return (
    <div className={`app-shell theme-${theme}`}>
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main>

        {/* ABOUT - FIRST SECTION */}
        <section id="about" className="about-section">
          <Constellation
            theme={theme}
            interactiveGlow
          />

          <div className="page-shell about-inner">
            <span className="section-kicker">
              01 / A LITTLE ABOUT ME
            </span>

            <div className="about-layout">
              <div className="about-content">
                <h2>
                  Curious by nature.
                  <br />
                  <span className="hero-highlight-word">
                    Intentional
                  </span>{" "}
                  by design.
                </h2>

                <div className="about-bottom home-intro">
  <p>
    I'm Kanishk Kukreja, an independent graphic designer creating
    visual identities, editorial design, and event experiences.
    I turn ideas into thoughtful design for brands, publications,
    and real-world spaces.
  </p>

  <div className="home-intro-actions">
    <Link
      to="/work"
      className="home-intro-button home-intro-primary"
    >
      <span>View Selected Work</span>
      <span aria-hidden="true">↗</span>
    </Link>

    <Link
      to="/contact"
      className="home-intro-button home-intro-secondary"
    >
      <span>Get in Touch</span>
      <span aria-hidden="true">↗</span>
    </Link>
    <Link
  to="/about"
  className="home-intro-button home-intro-secondary"
>
  <span>Learn More</span>
  <span aria-hidden="true">↗</span>
</Link>
  </div>
</div>
              </div>

              {/* PORTRAIT */}
              <div
                className={`about-portrait ${
                  aboutIsActive ? "portrait-active" : ""
                }`}
              >
                <img
                  src="/images/profile.png"
                  alt="Portrait of Kanishk Kukreja"
                  loading="lazy"
                />

                <div className="portrait-name-overlay">
                  <span className="portrait-name-label">
                    THE DESIGNER
                  </span>

                  <h3>
                    KANISHK
                    <br />
                    KUKREJA
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK - SECOND SECTION */}
        <section
          id="selected-work"
          className="selected-work-section page-shell"
        >
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                02 / THE ARCHIVE
              </span>

              <h2>
                A few dishes I've cooked<span className="period">.</span>
              </h2>
            </div>

            <span className="work-count">
              {String(visibleProjects.length).padStart(2, "0")} PROJECTS
            </span>
          </div>

          {/* CATEGORY FILTERS */}
          <div
            className="filter-list"
            aria-label="Filter projects"
          >
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
          <div className="project-grid reference-project-grid">
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

      </main>
      

      {/* CONTACT */}
      <div id="contact">
        <ContactCTA />
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
