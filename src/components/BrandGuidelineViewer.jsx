
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  ExternalLink,
  Scan,
} from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function BrandGuidelineViewer({
  pdfUrl = "/documents/brand-guidelines.pdf",
  title = "Guidelines",
  eyebrow = "THE BRAND BOOK",
  description = "Explore the complete visual identity system.",
  documentLabel = "VISUAL IDENTITY SYSTEM",
}) {

  const viewerRef = useRef(null);
  const canvasRef = useRef(null);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [fitMode, setFitMode] = useState("page");
  const [error, setError] = useState(false);

  const [availableSize, setAvailableSize] = useState({
    width: 900,
    height: 600,
  });

  const [pageDimensions, setPageDimensions] = useState(null);

  // Measure the actual available viewer area.
  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setAvailableSize({
        width: Math.max(1, entry.contentRect.width - 32),
        height: Math.max(1, entry.contentRect.height - 32),
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Calculate the scale needed to fit the whole page.
  const baseScale = pageDimensions
  ? pageDimensions.width > availableSize.width
    ? availableSize.width / pageDimensions.width
    : 1
  : 1;

const actualScale = baseScale * zoom;

const pageWidth = pageDimensions
  ? Math.floor(pageDimensions.width * actualScale)
  : undefined;

  const previousPage = () => {
    setPageNumber((page) => Math.max(1, page - 1));
  };

  const nextPage = () => {
    setPageNumber((page) => Math.min(numPages, page + 1));
  };

  const zoomIn = () => {
    setFitMode("page");
    setZoom((value) => Math.min(2.5, +(value + 0.15).toFixed(2)));
  };

  const zoomOut = () => {
    setFitMode("page");
    setZoom((value) => Math.max(0.5, +(value - 0.15).toFixed(2)));
  };

  const fitPage = () => {
    setZoom(1);
    setFitMode("page");
  };

  const openFullscreen = async () => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    try {
      if (!document.fullscreenElement) {
        await viewer.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch (err) {
      console.error("Unable to toggle fullscreen:", err);
    }
  };

  return (
    <section className="brand-pdf-section">
      {/* Heading */}
      <div className="brand-pdf-heading">
  <div className="brand-pdf-heading-copy">
    <span className="brand-pdf-eyebrow">{eyebrow}</span>

    <h2>
      {title}<span>.</span>
    </h2>

    <p>{description}</p>
  </div>

  <a
    className="brand-pdf-open"
    href={pdfUrl}
    target="_blank"
    rel="noreferrer"
  >
    Open PDF <ExternalLink size={15} />
  </a>
</div>

      {/* PDF Viewer */}
      <div
        className="brand-pdf-viewer"
        id="brand-pdf-viewer"
        ref={viewerRef}
      >
        {/* Toolbar */}
        <div className="brand-pdf-toolbar">
          <div className="brand-pdf-tools">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut size={17} />
            </button>

            <span>
              {pageDimensions
                ? `${Math.round(actualScale * 100)}%`
                : "—"}
            </span>

            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= 2.5}
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn size={17} />
            </button>

            <button
              type="button"
              onClick={fitPage}
              aria-label="Fit page"
              title="Fit entire page"
            >
              <Scan size={16} />
            </button>
          </div>

          <div className="brand-pdf-pagination">
            <button
              type="button"
              onClick={previousPage}
              disabled={pageNumber <= 1}
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft size={21} />
            </button>

            <span>
              <strong>{pageNumber}</strong>
              {" / "}
              {numPages || "—"}
            </span>

            <button
              type="button"
              onClick={nextPage}
              disabled={!numPages || pageNumber >= numPages}
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight size={21} />
            </button>
          </div>

          <div className="brand-pdf-tools">
            <button
              type="button"
              onClick={openFullscreen}
              aria-label="Toggle fullscreen"
              title="Fullscreen"
            >
              <Maximize size={17} />
            </button>

            <a
              href={pdfUrl}
              download="brand-guidelines.pdf"
              aria-label="Download brand guidelines"
              title="Download PDF"
            >
              <Download size={17} />
            </a>
          </div>
        </div>

        {/* Document information */}
        <div className="brand-pdf-topbar">
          <span>VISUAL IDENTITY SYSTEM</span>

          <span>
            PAGE {String(pageNumber).padStart(2, "0")}
            {numPages
              ? ` / ${String(numPages).padStart(2, "0")}`
              : ""}
          </span>
        </div>

        {/* PDF Page */}
        <div className="brand-pdf-canvas" ref={canvasRef}>
          {error ? (
            <p className="brand-pdf-error">
              Unable to load the PDF. Please check the file path.
            </p>
          ) : (
            <Document
              file={pdfUrl}
              onLoadSuccess={async (pdf) => {
                try {
                  const firstPage = await pdf.getPage(1);
                  const viewport = firstPage.getViewport({ scale: 1 });

                  setNumPages(pdf.numPages);
                  setPageNumber(1);
                  setPageDimensions({
                    width: viewport.width,
                    height: viewport.height,
                  });
                  setZoom(1);
                  setError(false);
                } catch {
                  setError(true);
                }
              }}
              onLoadError={() => setError(true)}
              loading={
                <p className="brand-pdf-status">
                  Loading brand guidelines...
                </p>
              }
              error={
                <p className="brand-pdf-error">
                  Unable to display this PDF.
                </p>
              }
            >
              {pageDimensions && (
                <Page
                  key={pageNumber}
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderTextLayer
                  renderAnnotationLayer
                />
              )}
            </Document>
          )}
        </div>
      </div>
    </section>
  );
}
