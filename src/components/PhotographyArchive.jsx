
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/photography-archive.css";

const photographs = Array.from({ length: 18 }, (_, index) => {
  const number = index + 1;
  const extension = number <= 5 ? "png" : "JPG";

  return {
    number,
    src: `/images/about/photography/${number}.${extension}`,
    alt: `Photography by Kanishk Kukreja, frame ${String(number).padStart(2, "0")}`,
  };
});

export default function PhotographyArchive() {
  const [activeIndex, setActiveIndex] = useState(null);

  const closeViewer = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? photographs.length - 1 : current - 1;
    });
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === photographs.length - 1 ? 0 : current + 1;
    });
  }, []);

  const openViewer = (index) => {
    setActiveIndex(index);
  };

  // Lock background scrolling and handle keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeViewer, showPrevious, showNext]);

  return (
    <>
      <section
        className="photo-archive"
        aria-label="Photography archive"
      >
        <div className="photo-archive-noise" aria-hidden="true" />

        {/* CINEMATIC INTRO */}
        <div className="photo-archive-header">
          <div className="photo-archive-kicker">
            <span>04 / OUTSIDE THE FRAME</span>
            <span>PERSONAL PHOTOGRAPHY ARCHIVE</span>
          </div>

          <div className="photo-archive-heading">
            <div>
              <span className="photo-archive-eyebrow">
                A COLLECTION OF MOMENTS
              </span>

              <h2>
                Life, in <span>frames.</span>
              </h2>
            </div>

            <div className="photo-archive-description">
              <p>
                People, places, fleeting moments and stories
                that deserve to be remembered.
              </p>

              <span>
                18 PHOTOGRAPHS · AN ONGOING COLLECTION
              </span>
            </div>
          </div>
        </div>

        {/* FEATURED FRAME */}
        <div className="photo-feature">
          <button
            type="button"
            className="photo-feature-image"
            onClick={() => openViewer(0)}
            aria-label="Open photograph 01"
            data-cursor-label="VIEW FRAME"
          >
            <img
              src={photographs[0].src}
              alt={photographs[0].alt}
              loading="lazy"
              decoding="async"
            />

            <span className="photo-feature-overlay" />

            <span className="photo-feature-index">
              FRAME 01 / 18
            </span>

            <span className="photo-feature-open">
              <span>OPEN FRAME</span>
              <span>↗</span>
            </span>
          </button>

          <div className="photo-feature-caption">
            <span>01 — SELECTED FRAME</span>
            <span>CAPTURING MOMENTS, NOT JUST IMAGES.</span>
          </div>
        </div>

        {/* PHOTOGRAPHY GALLERY */}
        <div className="photo-gallery-heading">
          <div>
            <span className="photo-archive-eyebrow">
              THE COLLECTION
            </span>

            <h3>Every frame has a story.</h3>
          </div>

          <span className="photo-gallery-count">
            02 — 18
          </span>
        </div>

        <div className="photo-masonry">
          {photographs.slice(1).map((photo, index) => {
            const actualIndex = index + 1;

            return (
              <button
                type="button"
                className="photo-masonry-item"
                key={photo.number}
                onClick={() => openViewer(actualIndex)}
                aria-label={`Open photograph ${String(photo.number).padStart(2, "0")}`}
                data-cursor-label="VIEW FRAME"
                style={{ "--photo-index": index }}
              >
                <div className="photo-masonry-image">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="photo-masonry-zoom">
                    ↗
                  </span>
                </div>

                <div className="photo-masonry-caption">
                  <span>
                    FRAME {String(photo.number).padStart(2, "0")}
                  </span>

                  <span>VIEW IMAGE ↗</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ARCHIVE ENDING */}
        <div className="photo-archive-footer">
          <span>END OF CURRENT COLLECTION</span>
          <span>MORE MOMENTS TO COME — KK®</span>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX - RENDERED OUTSIDE THE ARCHIVE */}
      {activeIndex !== null &&
        createPortal(
          <div
            className="photo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Photography viewer"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeViewer();
              }
            }}
          >
            {/* TOP BAR */}
            <div className="photo-lightbox-top">
              <span>KK® — PHOTOGRAPHY ARCHIVE</span>

              <span>
                {String(activeIndex + 1).padStart(2, "0")}
                {" / "}
                {String(photographs.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={closeViewer}
                className="photo-lightbox-close"
                aria-label="Close image viewer"
              >
                CLOSE <span>×</span>
              </button>
            </div>

            {/* PREVIOUS */}
            <button
              type="button"
              className="photo-lightbox-nav photo-lightbox-prev"
              onClick={showPrevious}
              aria-label="Previous photograph"
            >
              ←
            </button>

            {/* ACTIVE IMAGE */}
            <div className="photo-lightbox-content">
              <img
                key={photographs[activeIndex].src}
                src={photographs[activeIndex].src}
                alt={photographs[activeIndex].alt}
              />
            </div>

            {/* NEXT */}
            <button
              type="button"
              className="photo-lightbox-nav photo-lightbox-next"
              onClick={showNext}
              aria-label="Next photograph"
            >
              →
            </button>

            {/* BOTTOM BAR */}
            <div className="photo-lightbox-bottom">
              <span>
                FRAME {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <span>
                USE ← → TO NAVIGATE · ESC TO CLOSE
              </span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
