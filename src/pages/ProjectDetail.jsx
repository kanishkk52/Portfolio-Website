
import { Link, useParams } from "react-router-dom";
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
    title: "Letterhead",
    image: "/images/branding/nja-letterhead.jpg",
  },
  {
    title: "Business card",
    image: "/images/branding/nja-business-card.jpg",
  },
  {
    title: "Envelope",
    image: "/images/branding/nja-envelope.jpg",
  },
  {
    title: "Document folder",
    image: "/images/branding/nja-document-folder.jpg",
  },
  {
    title: "Notebook",
    image: "/images/branding/nja-notebook.jpg",
  },
  {
    title: "Notepad",
    image: "/images/branding/nja-notepad.jpg",
  },
];

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

function NjaCaseStudy() {
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
          </p>
        </div>

        <div className="nja-stationery-collage">
          {stationeryItems.map((item, index) => (
            <div
              className={`nja-stationery-item nja-stationery-item-${index + 1}`}
              key={item.title}
              tabIndex={0}
              aria-label={`View ${item.title}`}
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
      </section>
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
        <Navbar
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

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

  // Show the additional case study sections only for NJA.
  const isNjaProject = String(project.id) === "01";

  return (
    <div className={`app-shell theme-${theme}`}>
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

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
              documentLabel={`${project.style.toUpperCase()} / EDITORIAL DESIGN`}
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

        {/* NJA case study sections */}

        {isNjaProject && <NjaCaseStudy />}

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
