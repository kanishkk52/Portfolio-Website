
import { useState, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./styles/page-skeleton.css";

// Lazy load only Work-related pages
const Work = lazy(() => import("./pages/Work"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

// Skeleton loading screen
function PageSkeleton({ theme }) {
  const location = useLocation();

  const isProjectDetail = /^\/work\/[^/]+/.test(location.pathname);
  const isDark = theme === "dark";

  return (
    <main
      className={`page-skeleton ${
        isDark ? "skeleton-dark" : "skeleton-light"
      }`}
      aria-label="Loading page"
      aria-busy="true"
    >
      {/* Skeleton Navbar */}
      <div className="skeleton-navbar">
        <div className="skeleton-block skeleton-logo" />

        <div className="skeleton-nav-links">
          <div className="skeleton-block skeleton-nav-link" />
          <div className="skeleton-block skeleton-nav-link" />
          <div className="skeleton-block skeleton-nav-link" />
          <div className="skeleton-block skeleton-nav-link" />
        </div>

        <div className="skeleton-block skeleton-theme-toggle" />
      </div>

      <div className="skeleton-content">

        {/* Back link for project detail */}
        {isProjectDetail && (
          <div className="skeleton-block skeleton-back-link" />
        )}

        {/* Page Heading */}
        <div className="skeleton-heading">
          <div className="skeleton-block skeleton-eyebrow" />
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-description" />
        </div>

        {isProjectDetail ? (
          <>
            {/* Project Detail Hero */}
            <div className="skeleton-block skeleton-project-hero" />

            {/* Project Information */}
            <div className="skeleton-project-info">
              <div className="skeleton-block skeleton-info-line" />
              <div className="skeleton-block skeleton-info-line short" />
              <div className="skeleton-block skeleton-info-line" />
            </div>

            {/* Project Gallery */}
            <div className="skeleton-gallery">
              <div className="skeleton-block skeleton-gallery-large" />
              <div className="skeleton-block skeleton-gallery-small" />
              <div className="skeleton-block skeleton-gallery-small" />
            </div>
          </>
        ) : (
          <>
            {/* Work Page Filters */}
            <div className="skeleton-filter-row">
              <div className="skeleton-block skeleton-filter" />
              <div className="skeleton-block skeleton-filter" />
              <div className="skeleton-block skeleton-filter" />
              <div className="skeleton-block skeleton-filter" />
            </div>

            {/* Work Page Project Grid */}
            <div className="skeleton-project-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="skeleton-project-card" key={index}>
                  <div className="skeleton-block skeleton-card-image" />
                  <div className="skeleton-block skeleton-card-title" />
                  <div className="skeleton-block skeleton-card-description" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "light";
    } catch {
      return "light";
    }
  });

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme =
        currentTheme === "light" ? "dark" : "light";

      try {
        localStorage.setItem("portfolio-theme", nextTheme);
      } catch {
        // Theme switching still works if storage is unavailable.
      }

      return nextTheme;
    });
  };

  return (
    <BrowserRouter>
      <SplashScreen theme={theme} />

      <ScrollToTop />

      {/* Fixed scroll indicator across all routes */}
      <ScrollProgress />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Home
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <About
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />

        {/* Work */}
        <Route
          path="/work"
          element={
            <Suspense fallback={<PageSkeleton theme={theme} />}>
              <Work
                theme={theme}
                onToggleTheme={toggleTheme}
              />
            </Suspense>
          }
        />

        {/* Project Detail */}
        <Route
          path="/work/:projectId"
          element={
            <Suspense fallback={<PageSkeleton theme={theme} />}>
              <ProjectDetail
                theme={theme}
                onToggleTheme={toggleTheme}
              />
            </Suspense>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <Contact
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
