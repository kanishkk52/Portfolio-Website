
import { Link, useParams } from "react-router-dom";
import BrandGuidelineViewer from "../components/BrandGuidelineViewer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import ContactCTA from "../components/ContactCTA";

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

  // Identify the project that should display the brand guideline PDF.
  // Change this condition if your project uses a different ID.
  const isBrandGuidelineProject =
  project.type === "brand-guideline";

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

        {/* PROJECT VISUAL / BRAND GUIDELINE PDF */}
        
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
