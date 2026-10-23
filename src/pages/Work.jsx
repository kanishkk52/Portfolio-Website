
import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { projects, categories } from "../data/projects";
import ContactCTA from "../components/ContactCTA";

export default function Work({ theme, onToggleTheme }) {
  const [activeCategory, setActiveCategory] = useState("All Work");

  const visibleProjects = projects.filter((project) => {
    if (activeCategory === "All Work") {
      return true;
    }

    return project.category === activeCategory;
  });

  return (
    <div className={`app-shell theme-${theme}`}>
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main className="work-section page-shell work-page">
        <div className="work-heading">
  <div className="section-kicker">
    <span className="kicker-line" />
    THE PORTFOLIO
  </div>

  <div className="work-heading-row">
    <div className="work-heading-copy">
      <h1 className="section-title">
        All work<span className="title-period">.</span>
      </h1>

      <p className="work-intro">
        A collection of identities, visuals, and digital
        experiences crafted with intention.
      </p>
    </div>

    <div className="work-count-block">
      <span className="work-count-number">
        {String(visibleProjects.length).padStart(2, "0")}
      </span>
      <span className="work-count-label">PROJECTS</span>
    </div>
  </div>
</div>

        <div
          className="work-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {visibleProjects.length > 0 ? (
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="work-empty">
            <h2>No projects in this category yet.</h2>
            <p>Try another category to explore the portfolio.</p>

            <button
              type="button"
              className="filter-button active"
              onClick={() => setActiveCategory("All Work")}
            >
              View all work
            </button>
          </div>
        )}

        

  <span className="work-cta-index" aria-hidden="true">
    KK® — 2026
  </span>

      </main>

<ContactCTA />


      <Footer />
    </div>
  );
}
