
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, index = 0 }) {
  const hasImage =
    typeof project.image === "string" &&
    project.image.trim().length > 0;

  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const placeholder = project.placeholder || "default";
  const showImage = hasImage && !imageFailed;

  return (
    <article
      className={`project-card project-card-${project.layout || "wide"}`}
    >
      <Link
        to={`/work/${project.id}`}
        className="project-link"
        aria-label={`View project: ${project.title}`}
      >
        <div className={`project-art placeholder-${placeholder}`}>

          {/* Image skeleton */}
          {showImage && !imageLoaded && (
            <div
              className="project-image-skeleton"
              aria-hidden="true"
            />
          )}

          {/* Actual project image */}
          {showImage ? (
            <img
              className={`project-image ${
                imageLoaded ? "image-loaded" : "image-loading"
              }`}
              src={project.image}
              alt={`${project.title} - ${project.category}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageFailed(true);
                setImageLoaded(false);
              }}
              style={{
                objectPosition: project.imagePosition || "center",
              }}
            />
          ) : (
            /* Existing placeholder graphics */
            <div className="placeholder-graphic" aria-hidden="true">

              {placeholder === "identity" && (
                <div className="graphic-identity">
                  <span className="identity-symbol">K.</span>
                  <span className="identity-caption">
                    BRAND SYSTEM / 2026
                  </span>
                </div>
              )}

              {placeholder === "bauhaus" && (
                <div className="graphic-bauhaus">
                  <span className="bauhaus-circle" />
                  <span className="bauhaus-square" />
                  <span className="bauhaus-triangle">▲</span>
                  <span className="bauhaus-type">
                    FORM<br />FOLLOWS
                  </span>
                </div>
              )}

              {placeholder === "retro" && (
                <div className="graphic-retro">
                  <span className="retro-sun">✳</span>
                  <span className="retro-title">
                    GOOD<br />THINGS<br />INSIDE.
                  </span>
                  <span className="retro-caption">
                    MADE WITH FEELING
                  </span>
                </div>
              )}

              {placeholder === "digital" && (
                <div className="graphic-digital">
                  <span className="digital-orbit digital-orbit-one" />
                  <span className="digital-orbit digital-orbit-two" />
                  <span className="digital-core">D.</span>
                  <span className="digital-caption">
                    DIGITAL / HUMAN
                  </span>
                </div>
              )}

              {placeholder === "editorial" && (
                <div className="graphic-editorial">
                  <span className="editorial-small">THE COMPANY</span>
                  <span className="editorial-title">
                    EDIT<span>.</span>
                  </span>
                  <span className="editorial-bottom">
                    A NEW POINT OF VIEW
                  </span>
                </div>
              )}

              {placeholder === "stationery" && (
                <div className="graphic-stationery">
                  <div className="stationery-sheet stationery-sheet-back">
                    <span>KK</span>
                  </div>
                  <div className="stationery-sheet stationery-sheet-front">
                    <span>
                      THE DETAILS<br />MATTER.
                    </span>
                    <small>STUDIO / 001</small>
                  </div>
                </div>
              )}

              {![
                "identity",
                "bauhaus",
                "retro",
                "digital",
                "editorial",
                "stationery",
              ].includes(placeholder) && (
                <div className="graphic-default">
                  <span>SELECTED</span>
                  <strong>{project.title}</strong>
                  <span>VISUAL STUDY / {project.year}</span>
                </div>
              )}
            </div>
          )}

          {/* Existing project overlay */}
          <div className="project-overlay">
            <div className="art-topline">
              <span>SELECTED WORK</span>
              <span>/{project.id}</span>
            </div>

            <div className="art-center">
              <span className="art-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{project.title}</h3>

              <span className="art-category">
                {project.category}
              </span>
            </div>

            <span className="art-style">{project.style}</span>
          </div>

          <span className="project-arrow" aria-hidden="true">
            ↗
          </span>
        </div>

        {/* Existing project metadata */}
        <div className="project-meta">
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>

          <span className="project-year">{project.year}</span>
        </div>
      </Link>
    </article>
  );
}
