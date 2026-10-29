
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import BrandGuidelineViewer from "../components/BrandGuidelineViewer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import ContactCTA from "../components/ContactCTA";

const njaSections = [
  {
    number: "01",
    label: "WEB DESIGN",
    title: "Website hero section.",
    description:
      "The NJA website's visual direction, including its layout, typography, and brand elements.",
    image: "/images/branding/nja-website-hero.jpg",
    alt: "NJA website hero section",
    type: "website",
  },
  {
    number: "02",
    label: "SOCIAL MEDIA",
    title: "LinkedIn banner.",
    description:
      "The NJA visual identity adapted for its LinkedIn presence.",
    image: "/images/branding/nja-linkedin-banner.jpg",
    alt: "NJA LinkedIn banner design",
    type: "linkedin",
  },
  {
    number: "03",
    label: "EMAIL DESIGN",
    title: "Email newsletter.",
    description:
      "A branded newsletter designed to keep communication clear and consistent.",
    image: "/images/branding/nja-email-newsletter.jpg",
    alt: "NJA email newsletter design",
    type: "newsletter",
  },
  {
    number: "04",
    label: "EMAIL DESIGN",
    title: "Email signature.",
    description:
      "A professional signature that carries the NJA identity into everyday communication.",
    image: "/images/branding/nja-email-signature.jpg",
    alt: "NJA email signature design",
    type: "signature",
  },
];

const stationeryItems = [
  {
    title: "Desk Flag",
    image: "/images/branding/nja-desk-flag.png",
  },
  {
    title: "Paper Bag",
    image: "/images/branding/nja-gift-bag.png",
  },
  {
    title: "Pen",
    image: "/images/branding/nja-pen.png",
  },
  {
    title: "Business Cards",
    image: "/images/branding/nja-business-cards.png",
  },
  {
    title: "Presentation Folder",
    image: "/images/branding/nja-presentation-folder.png",
  },
  {
    title: "Signage",
    image: "/images/branding/nja-signage.png",
  },
  {
    title: "Envelope",
    image: "/images/branding/nja-envelope.png",
  },
];

/* NJA case study images */
function NjaCaseStudyImage({ section }) {
  if (section.type === "newsletter") {
    return (
      <div className="nja-newsletter-frame">
        <div
          className="nja-newsletter-scroll"
          tabIndex={0}
          aria-label="Scrollable email newsletter preview"
        >
          <img
            src={section.image}
            alt={section.alt}
            className="nja-newsletter-image"
            loading="lazy"
          />
        </div>

        <span className="nja-scroll-hint">
          SCROLL TO READ THE NEWSLETTER ↓
        </span>
      </div>
    );
  }

  return (
    <img
      src={section.image}
      alt={section.alt}
      className={`nja-feature-image nja-image-${section.type}`}
      loading="lazy"
    />
  );
}

/* Reusable enlarged image overlay */
function StationeryLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="nja-lightbox"
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        className="nja-lightbox-close"
        onClick={onClose}
        aria-label="Close enlarged image"
      >
        ×
      </button>

      <div
        className="nja-lightbox-content"
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={item.image} alt={item.title} />
        <p>{item.title}</p>
      </div>
    </div>
  );
}

/* Existing NJA case study */
function NjaCaseStudy() {
  const [selectedStationery, setSelectedStationery] = useState(null);

  const closeLightbox = useCallback(() => {
    setSelectedStationery(null);
  }, []);

  const handleStationeryKeyDown = (event, item) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedStationery(item);
    }
  };

  return (
    <div className="nja-case-study">
      {njaSections.map((section) => (
        <section
          className={`nja-work-section nja-work-${section.type}`}
          key={section.number}
        >
          <div className="nja-work-heading">
            <div>
              <span className="section-kicker">
                {section.number} / {section.label}
              </span>
              <h2>{section.title}</h2>
            </div>

            <p>{section.description}</p>
          </div>

          <NjaCaseStudyImage section={section} />
        </section>
      ))}

      <section className="nja-work-section nja-work-stationery">
        <div className="nja-work-heading">
          <div>
            <span className="section-kicker">
              05 / PRINT AND STATIONERY
            </span>
            <h2>Brand identity in print.</h2>
          </div>

          <p>
            A closer look at the stationery and print materials
            created for NJA. Hover over an item to explore it.
            Click an item to view it in detail.
          </p>
        </div>

        <div className="nja-stationery-collage">
          {stationeryItems.map((item, index) => (
            <div
              className={`nja-stationery-item nja-stationery-item-${index + 1}`}
              key={item.title}
              tabIndex={0}
              role="button"
              aria-label={`Enlarge ${item.title}`}
              onClick={() => setSelectedStationery(item)}
              onKeyDown={(event) =>
                handleStationeryKeyDown(event, item)
              }
            >
              <img
                src={item.image}
                alt={`NJA ${item.title} mockup`}
                loading="lazy"
              />

              <span className="nja-stationery-label">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <p className="nja-collage-caption">
          STATIONERY COLLECTION / HOVER TO EXPLORE
        </p>

        <StationeryLightbox
          item={selectedStationery}
          onClose={closeLightbox}
        />
      </section>
    </div>
  );
}

/* New event print design case study */

function EventPrintCaseStudy({ project }) {
  const sections = project.eventPrintSections || [];
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const closeLightbox = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const handleArtworkKeyDown = (event, section) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedArtwork({
        title: section.title,
        image: section.image,
      });
    }
  };

  return (
    <div className="event-print-case-study">
      <header className="event-print-intro">
        <span className="section-kicker">
          EVENT PRODUCTION / PRINT DESIGN
        </span>

        <h2>
          Made to be <span>experienced.</span>
        </h2>

        <p>
          From a life-sized board game to interactive event
          installations, these designs were created to move
          beyond the screen and become part of the experience.
        </p>
      </header>

      <div className="event-print-sections">
        {sections.map((section, index) => {
          const isWheel = section.type === "spin-wheel";

          return (
            <section
              key={section.number || section.type}
              className={`event-print-section event-print-${section.type}`}
            >
              <div className="event-print-copy">
                <span className="section-kicker">
                  {section.number || String(index + 1).padStart(2, "0")}{" "}
                  / {section.label}
                </span>

                <h2>{section.title}</h2>

                <p className="event-print-dimensions">
                  {section.dimensions}
                </p>

                <p className="event-print-description">
                  {section.description}
                </p>
              </div>

              <div
                className={`event-print-artwork ${
                  isWheel ? "event-print-wheel-artwork" : ""
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Enlarge ${section.title}`}
                onClick={() =>
                  setSelectedArtwork({
                    title: section.title,
                    image: section.image,
                  })
                }
                onKeyDown={(event) =>
                  handleArtworkKeyDown(event, section)
                }
              >
                <img
                  src={section.image}
                  alt={`${section.title} print design`}
                  loading="lazy"
                  className={
                    isWheel
                      ? "event-print-wheel-image"
                      : "event-print-image"
                  }
                />

                <span className="event-print-enlarge-hint">
                  CLICK TO ENLARGE ↗
                </span>

                {isWheel && (
                  <span className="event-print-hover-hint">
                    HOVER TO SPIN
                  </span>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <div className="event-print-outro">
        <span className="section-kicker">
          CONCEPT / DESIGN / PRODUCTION
        </span>

        <p>
          Designed for real spaces, real interactions, and
          shared experiences.
        </p>
      </div>

      <StationeryLightbox
        item={selectedArtwork}
        onClose={closeLightbox}
      />
    </div>
  );
}


export default function ProjectDetail({ theme, onToggleTheme }) {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => String(item.id) === String(projectId)
  );

  if (!project) {
    return (
      <div className={`app-shell theme-${theme}`}>
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />

        <main className="page-shell project-not-found">
          <span className="section-kicker">404 / NOT FOUND</span>
          <h1>Project not found.</h1>
          <p>This project may have moved or doesn't exist yet.</p>

          <Link to="/work" className="text-link">
            ← Explore all work
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  const projectIndex = projects.findIndex(
    (item) => String(item.id) === String(project.id)
  );

  const previousProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];

  const relatedProjects = projects
    .filter((item) => String(item.id) !== String(project.id))
    .slice(0, 2);

  const isNjaProject = String(project.id) === "01";
  const isEventPrintProject = String(project.id) === "09";

  return (
    <div className={`app-shell theme-${theme}`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="project-detail page-shell">
        <Link to="/work" className="text-link back-link">
          ← All projects
        </Link>

        <section className="project-detail-hero">
          <span className="section-kicker">
            PROJECT / {String(project.id).padStart(2, "0")}
          </span>

          <h1>
            {project.title}
            <span className="period">.</span>
          </h1>

          <p className="project-detail-intro">
            {project.description}
          </p>

          <div className="project-facts">
            <div>
              <span>DISCIPLINE</span>
              <p>{project.category}</p>
            </div>

            <div>
              <span>ART DIRECTION</span>
              <p>{project.style}</p>
            </div>

            <div>
              <span>YEAR</span>
              <p>{project.year}</p>
            </div>
          </div>
        </section>

        {/* Existing project visual and PDF viewer */}
        <section className="project-detail-visual">
          {project.pdfUrl ? (
            <BrandGuidelineViewer
              pdfUrl={project.pdfUrl}
              title={project.viewerTitle || project.title}
              eyebrow={project.viewerEyebrow || "PROJECT DOCUMENT"}
              description={
                project.viewerDescription || project.description
              }
              documentLabel={
                project.documentLabel ||
                `${project.style.toUpperCase()} / EDITORIAL DESIGN`
              }
            />
          ) : project.image?.trim() ? (
            <img
              src={project.image}
              alt={project.title}
              className="project-detail-image"
            />
          ) : (
            <div
              className={`project-detail-placeholder placeholder-${
                project.placeholder || "default"
              }`}
            >
              <span>PROJECT / {project.id}</span>
              <h2>{project.title}</h2>
              <p>
                {project.category} · {project.style}
              </p>
            </div>
          )}
        </section>

        {/* Existing project story */}
        {project.story && (
          <section className="project-story">
            <div>
              <span className="section-kicker">
                {project.story.label || "THE PROJECT"}
              </span>

              <h2>
                {project.story.heading || "About the work."}
              </h2>
            </div>

            <div>
              {project.story.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {/* Project-specific case studies */}
        {isNjaProject && <NjaCaseStudy />}

        {isEventPrintProject && (
          <EventPrintCaseStudy project={project} />
        )}

        {/* Previous and next projects */}
        <section className="project-navigation">
          {previousProject ? (
            <Link to={`/work/${previousProject.id}`}>
              <span>← PREVIOUS PROJECT</span>
              <strong>{previousProject.title}</strong>
            </Link>
          ) : (
            <span />
          )}

          {nextProject ? (
            <Link
              to={`/work/${nextProject.id}`}
              className="next-project"
            >
              <span>NEXT PROJECT →</span>
              <strong>{nextProject.title}</strong>
            </Link>
          ) : (
            <Link to="/work" className="next-project">
              <span>EXPLORE</span>
              <strong>All work ↗</strong>
            </Link>
          )}
        </section>

        {/* Related projects */}
        <section className="related-projects">
          <span className="section-kicker">KEEP EXPLORING</span>

          <h2>
            More work<span className="period">.</span>
          </h2>

          <div className="project-grid">
            {relatedProjects.map((item) => (
              <ProjectCard
                key={item.id}
                project={item}
                index={projects.findIndex(
                  (entry) => entry.id === item.id
                )}
              />
            ))}
          </div>
        </section>
      </main>

      <ContactCTA />
      <Footer />
    </div>
  );
}
